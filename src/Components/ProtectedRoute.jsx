import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../Context/AuthContext"; 
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Input } from "@/Components/ui/input";

const LoginForm = () => {
  const { login } = useAuth();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      await login(inputValue.email, inputValue.password);
    } catch {
      setError("Invalid credentials");
    }
  };
return (
    <form
        onSubmit={handleSubmit}
    className="min-h-screen flex items-center justify-center px-4"
    >
        <div className="w-full max-w-md py-10">
            <Card className="w-full mx-auto py-10">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">
                        Admin
                    </CardTitle>
                </CardHeader>
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
                <CardContent className="flex flex-col gap-4">
                    <Input
                        placeholder="Enter your email"
                        name="email"
                        id="Email"
                        onChange={handleInputChange}
                        value={inputValue.email}
                    />
                    <Input
                        placeholder="Enter your password"
                        name="password"
                        id="Password"
                        onChange={handleInputChange}
                        value={inputValue.password}
                    />
                </CardContent>
                <CardFooter className="flex justify-center items-center gap-2">
                    <button
                        className="bg-black text-white text-sm px-10 py-4 cursor-pointer"
                        type="submit"
                    >
                        Submit
                    </button>
                </CardFooter>
            </Card>
        </div>
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

ProtectedRoute.propTypes = {
  children: PropTypes.node
};

export default ProtectedRoute;