import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext"; // Adjust path as needed

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials");
    }
  };

return (
    <form
        onSubmit={handleSubmit}
        style={{
            maxWidth: 380,
            margin: "4rem auto",
            padding: "2.5rem 2rem",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            fontFamily: "Segoe UI, Arial, sans-serif"
        }}
    >
        <h2 style={{ textAlign: "center", margin: 0, color: "#222" }}>Hats Off Admin Login</h2>
        {error && (
            <div
                style={{
                    color: "#d32f2f",
                    background: "#ffebee",
                    border: "1px solid #ffcdd2",
                    borderRadius: 6,
                    padding: "0.75rem",
                    textAlign: "center"
                }}
            >
                {error}
            </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="admin-email" style={{ fontWeight: 500, color: "#444" }}>
                Email
            </label>
            <input
                id="admin-email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                    padding: "0.75rem",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 16,
                    outline: "none",
                    transition: "border 0.2s",
                }}
                onFocus={e => (e.target.style.border = "1.5px solid #1976d2")}
                onBlur={e => (e.target.style.border = "1px solid #ccc")}
            />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="admin-password" style={{ fontWeight: 500, color: "#444" }}>
                Password
            </label>
            <input
                id="admin-password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                    padding: "0.75rem",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 16,
                    outline: "none",
                    transition: "border 0.2s",
                }}
                onFocus={e => (e.target.style.border = "1.5px solid #1976d2")}
                onBlur={e => (e.target.style.border = "1px solid #ccc")}
            />
        </div>
        <button
            type="submit"
            style={{
                padding: "0.85rem",
                borderRadius: 6,
                border: "none",
                background: "linear-gradient(90deg, #1976d2 60%, #1565c0 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 17,
                cursor: "pointer",
                letterSpacing: 1,
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                transition: "background 0.2s"
            }}
        >
            Login
        </button>
    </form>
);
};

const ProtectedRoute = ({ children }) => {
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const lastLogin = parseInt(localStorage.getItem("lastLogin"), 10);
    if (!lastLogin) {
        logout()
    }
  }, []);

  if (currentUser === undefined) return <div>Loading...</div>;

  const lastLogin = parseInt(localStorage.getItem("lastLogin"), 10);
  if (!currentUser || !lastLogin) return <LoginForm />;

  return children;
};
export default ProtectedRoute;
