import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md py-10">
        <Card className="w-full mx-auto py-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Admin
            </CardTitle>
          </CardHeader>
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
              onClick={() => navigate("/dashboard")}
            >
              Submit
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
