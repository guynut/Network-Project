import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) return;

    setError(null);

    try {
      const response = await axios.post<LoginResponse>("http://localhost:4000/login", formData, {
        headers: { "Content-Type": "application/json" },
      });


      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigate("/userprofile");
      }
    } catch (error: any) {
      // navigate("/userprofile");
      console.error("Error during login:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const isFormValid =
    formData.username.trim() !== "" && formData.password.trim() !== "";

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-gradient-to-tr from-blue-900 via-blue-500 to-blue-600">
      <h1 className="text-6xl text-white"> AI PDF Summarizer </h1>
      <div className="w-[30vw] h-auto backdrop-blur-sm bg-white bg-opacity-90 rounded-xl flex flex-col gap-2 items-center justify-self-start border border-neutral-100 p-4">
        <h2 className="text-4xl">Login</h2>
        <form className="w-full flex flex-col gap-2 justify-center items-center">
          <label htmlFor="" className="w-full">
            <p className="text-neutral-700">username</p>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="p-2 rounded-lg w-full border border-blue-400"
            />
          </label>
          <label htmlFor="" className="w-full">
            <p className="text-neutral-700">password</p>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-2 rounded-lg w-full border border-blue-400"
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <button
          className={`p-2 px-6 rounded-full text-white ${
            isFormValid
              ? "bg-blue-800 hover:scale-105 active:scale-95"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={isFormValid ? handleSubmit : undefined}
          disabled={!isFormValid} // Disables the button when the form is invalid
        >
          Login
        </button>
      </div>
    </div>
  );
}
