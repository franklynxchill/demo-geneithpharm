"use client";
import React, { useState } from "react";
import { FaRegEnvelope, FaPhone } from "react-icons/fa";
import { FiLock, FiMapPin } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    allowMarketing: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [message, setMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false); // ✅ popup state
  const [activeTab, setActiveTab] = useState("register");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("⚠️ Passwords do not match.");
      return;
    }

    if (!form.acceptTerms) {
      setMessage("⚠️ You must agree to Terms & Conditions.");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setPopupVisible(true); // ✅ show popup
        setTimeout(() => {
          setPopupVisible(false);
          router.push("/login");
        }, 2000); // ✅ hide after 2s and redirect
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="bg-black flex items-center justify-center h-[190vh]">
        <div className="rounded-3xl shadow">
          <div className="bg-secondary p-9 text-white rounded-t-3xl">
            <h2>Register</h2>
            <p>Create your account to start shopping securely</p>
          </div>

          <div className="bg-white px-6 pb-8 pt-12 rounded-b-3xl">

            <form onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <div className="flex flex-col mt-4">
                <label htmlFor="fullName">Full Name *</label>
                <div className="flex flex-row items-center gap-3 bg-light-gray text-sm py-3 px-4 rounded-3xl">
                  <FaRegEnvelope />
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-transparent outline-none w-full"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex flex-col mt-4">
                <label htmlFor="email">Email Address *</label>
                <div className="flex flex-row items-center gap-3 bg-light-gray text-sm py-3 px-4 rounded-2xl">
                  <FaRegEnvelope />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-transparent outline-none w-full"
                    required
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="flex flex-col mt-4">
                <label htmlFor="phone">Phone *</label>
                <div className="flex flex-row items-center gap-3 bg-light-gray text-sm py-3 px-4 rounded-3xl">
                  <FaPhone />
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 xxx xxx xxxx"
                    className="bg-transparent outline-none w-full"
                    required
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex flex-col mt-4">
                <label htmlFor="address">Address *</label>
                <div className="flex flex-row items-center gap-3 bg-light-gray text-sm py-3 px-4 rounded-3xl">
                  <FiMapPin />
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your delivery address"
                    className="bg-transparent outline-none w-full"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col mt-4">
                <label htmlFor="password">Password *</label>
                <div className="flex flex-row items-center justify-between bg-light-gray text-sm py-3 px-4 rounded-3xl">
                  <div className="flex flex-row items-center gap-3 w-full">
                    <FiLock />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="bg-transparent outline-none w-full"
                      required
                    />
                  </div>

                  <span
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col mt-4">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="flex flex-row items-center justify-between bg-light-gray text-sm py-3 px-4 rounded-3xl">
                  <div className="flex flex-row items-center gap-3 w-full">
                    <FiLock />
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="bg-transparent outline-none w-full"
                      required
                    />
                  </div>

                  <span
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
              </div>

              {/* TERMS CHECKBOX */}
              <div className="flex flex-col mt-4 space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={form.acceptTerms}
                    onChange={handleChange}
                    required
                  />
                  I agree to the Terms and Conditions and Privacy Policy
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="allowMarketing"
                    checked={form.allowMarketing}
                    onChange={handleChange}
                  />
                  I would like to receive promotional emails and health tips
                </label>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn-two shadow my-8 w-full cursor-pointer"
              >
                Create an Account
              </button>
            </form>

            {/* INLINE SUCCESS POPUP */}
            {popupVisible && (
              <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
                ✅ Account created successfully!
              </div>
            )}

            {message && !popupVisible && (
              <p className="text-center text-sm text-gray-600">{message}</p>
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
