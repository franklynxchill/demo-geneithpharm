"use client";
import React, { useState, useEffect } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Load remembered email on page load
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login Successful!");

        // Store email if user checked Remember Me
        if (rememberMe) {
          localStorage.setItem("rememberEmail", form.email);
        } else {
          localStorage.removeItem("rememberEmail");
        }

        router.push("/checkout");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="bg-black flex items-center justify-center h-[130vh]">
        <div className="rounded-3xl shadow">
          <div className="bg-secondary p-9 text-white rounded-t-3xl">
            <h2>Login</h2>
            <p>Access your account to shop securely</p>
          </div>

          <div className="bg-white px-6 pb-8 pt-12 rounded-b-3xl">
            {/* Tabs Header */}
            <div className="mb-5 bg-light-gray flex flex-row items-center py-1.5 px-1 rounded-2xl">
              {/* Login Tab */}
              <button
                onClick={() => setActiveTab("login")}
                className={`w-[50%] cursor-pointer ${
                  activeTab === "login" ? "btn-two" : ""
                }`}
              >
                Login
              </button>

              {/* Register Tab */}
              <button
                onClick={() => router.push("/signup")}
                className={`w-[50%] cursor-pointer ${
                  activeTab === "register" ? "btn-two" : ""
                }`}
              >
                Register
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "login" && (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="email">Email Address</label>
                  <div className="flex flex-row items-center gap-3 bg-light-gray text-sm py-3 px-4 rounded-3xl">
                    <FaRegEnvelope />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      placeholder="your.email@example.com"
                      onChange={handleChange}
                      className="bg-transparent outline-0 w-full"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-col">
                  <label htmlFor="password">Password</label>
                  <div className="flex flex-row items-center justify-between bg-light-gray text-sm py-2 px-4 rounded-3xl">
                    <div className="flex flex-row items-center gap-3 py-2">
                      <FiLock />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={form.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        className="bg-transparent outline-0 w-full"
                        required
                      />
                    </div>

                    {/* Show / Hide Password */}
                    <span
                      className="cursor-pointer text-xl"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-row gap-x-2 items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="text-2xl bg-lightGray text-lightGray"
                    />
                    <label>Remember me</label>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-primary font-bold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button className="btn-two shadow my-8 w-full cursor-pointer">
                  Sign In
                </button>

                {message && (
                  <p className="text-center text-sm text-gray-600">{message}</p>
                )}
              </form>
            )}

            <span className="text-center md:w-[30rem] mx-auto block">
              By continuing, you agree to our secure payment processing and data
              protection policies.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
