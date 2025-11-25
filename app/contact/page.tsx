"use client";

import { useState } from "react";
import MapLocation from "@/components/MapLocation";
import { FaRegClock } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { TbMessageCircle } from "react-icons/tb";
import { TfiLocationPin } from "react-icons/tfi";

export default function Page() {
  // ✅ STATES MUST BE INSIDE COMPONENT
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ✅ handleChange must also be inside
  function handleChange(e: any) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <main className="mt-16">
      {/* 🏢 Header Section */}
      <section className="container mx-auto pb-12 md:pb-28 text-center px-7 md:px-0">
        <h1>Contact Geneith Pharmaceuticals</h1>
        <p className="mt-3 max-w-2xl mx-auto text-gray-700">
          We're here to help with any questions about our products, services, or partnership opportunities. Our dedicated team is ready to assist you with professional healthcare solutions.
        </p>
      </section>

      {/* 🧩 Contact Info Cards */}
      <section className="container mx-auto pt-20 pb-28 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 px-7 md:px-0">
        {/* Address */}
        <div className="bg-card flex flex-col items-center rounded-2xl px-5 py-7 shadow-2xl text-center">
          <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
            <TfiLocationPin className="text-white text-2xl" />
          </div>
          <h3 className="my-6">Our Address</h3>
          <p className="mb-8 text-gray-600 leading-relaxed">
            12, Adewale Crescent<br />
            Off Ewenla Crescent, Oshodi<br />
            Lagos, Nigeria
          </p>
          <a href="#" className="btn-one w-full">Get Directions</a>
        </div>

        {/* Phone */}
        <div className="bg-card flex flex-col items-center rounded-2xl px-5 py-7 shadow-2xl text-center">
          <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
            <FiPhone className="text-white text-2xl" />
          </div>
          <h3 className="my-6">Phone Numbers</h3>
          <p>Sales: +2348129008569</p>
          <p className="mb-8">Services: +2349029371941</p>
          <a href="tel:+2349029371941" className="btn-one w-full">Call Us</a>
        </div>

        {/* Email */}
        <div className="bg-card flex flex-col items-center rounded-2xl px-5 py-7 shadow-2xl text-center">
          <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
            <HiOutlineMail className="text-white text-2xl" />
          </div>
          <h3 className="my-6">Email Address</h3>
          <p>info@geneithpharm.com</p>
          <p className="mb-8 text-gray-600">For all inquiries & support</p>
          <a href="mailto:info@geneithpharm.com" className="btn-one w-full">Send Email</a>
        </div>

        {/* Hours */}
        <div className="bg-card flex flex-col items-center rounded-2xl px-5 py-7 shadow-2xl text-center">
          <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
            <FaRegClock className="text-white text-2xl" />
          </div>
          <h3 className="my-6">Business Hours</h3>
          <p>Mon - Fri: 8:30am – 5:00pm</p>
          <p>Saturday: Closed</p>
          <p>Sunday: Closed</p>
        </div>
      </section>

      {/* 📬 Contact Form */}
      <section className="bg-light-gray py-20 md:py-24 mb-20 px-7 md:px-7">
        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className="lg:w-[70%]">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours during business days.</p>

            {/* FORM */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");
                setSuccess("");

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  });

                  if (res.ok) {
                    setSuccess("Your message has been sent successfully!");
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  } else {
                    setError("Failed to send message. Please try again.");
                  }
                } catch (err) {
                  setError("Something went wrong.");
                }

                setLoading(false);
              }}
              className="bg-card rounded-2xl shadow my-8 p-6 md:p-12"
            >
              {success && (
                <p className="mb-4 text-green-600 font-medium bg-green-100 p-3 rounded-lg">
                  {success}
                </p>
              )}

              {error && (
                <p className="mb-4 text-red-600 font-medium bg-red-100 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {/* Full Name + Email */}
              <div className="flex flex-col md:flex-row items-center gap-5">
                <div className="flex flex-col w-full gap-y-2">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-2">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="flex flex-col md:flex-row items-center gap-5 mt-7">
                <div className="flex flex-col w-full gap-y-2">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="+234 XXX XXX XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-y-2">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Brief subject of your message"
                    value={formData.subject}
                    onChange={handleChange}
                    className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-y-2 my-7">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  placeholder="Please provide details about your inquiry."
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-none px-3 py-3 bg-light-gray rounded-2xl h-32 text-base"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-two w-full flex items-center justify-center gap-x-3"
              >
                {loading ? "Sending..." : <><LuSend className="text-white" /> Send Message</>}
              </button>
            </form>
          </div>

          {/* SIDEBAR... unchanged */}
          {/* Sidebar Column */}
          <div className="lg:w-[30%] flex flex-col md:flex-row lg:flex-col gap-x-4 gap-y-8 md:gap-y-7">
            {/* Quick Contact */}
            <div className="bg-card py-12 px-9 rounded-2xl shadow">
              <div className="flex items-center gap-x-3 mb-5">
                <div className="bg-secondary rounded-xl p-3">
                  <FiPhone className="text-white text-3xl" />
                </div>
                <h3>Quick Contact</h3>
              </div>

              <div className="flex flex-col pb-6">
                <h4>Sales Team</h4>
                <a href="tel:+2348129008569" className="flex font-medium items-center gap-x-3 text-secondary">
                  <FiPhone className="text-primary text-xl" /> +2348129008569
                </a>
                <a href="mailto:sales@geneithpharm.com" className="flex items-center gap-x-3 text-secondary font-medium">
                  <HiOutlineMail className="text-primary text-xl" /> sales@geneithpharm.com
                </a>
                <span className="text-[13px] mt-1">Product inquiries, orders, and pricing</span>
              </div>

              <div className="border-t border-lightGray pt-6">
                <h4>Services Team</h4>
                <a href="tel:+2349029371941" className="flex items-center gap-x-3 font-medium text-secondary">
                  <FiPhone className="text-primary text-xl" /> +2349029371941
                </a>
                <a href="mailto:services@geneithpharm.com" className="flex items-center gap-x-3 text-secondary font-medium">
                  <HiOutlineMail className="text-primary text-xl" /> services@geneithpharm.com
                </a>
                <span className="text-[13px] mt-2">Support, complaints, and general assistance</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-secondary text-white py-12 px-9 rounded-2xl shadow">
              <div className="flex items-center gap-x-3 mb-5">
                <div className="bg-white rounded-xl p-3">
                  <FaRegClock className="text-secondary text-3xl" />
                </div>
                <h4>Business Hours</h4>
              </div>

              <div className="pb-16">
                <div className="flex items-center justify-between mb-3">
                  <span>Monday - Friday</span>
                  <span>8:30am - 5:00pm</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span>Saturday</span>
                  <span>Closed</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>

              <div className="border-t border-lightGray pt-6 text-sm">
                <strong>Response Time:</strong> We typically respond to all inquiries within 24 hours during business days.
              </div>
            </div>

            {/* Visit Office */}
            <div className="bg-card py-12 px-9 rounded-2xl shadow">
              <div className="flex items-center gap-x-3 mb-5">
                <div className="p-3 bg-primary rounded-xl">
                  <PiBuildingOfficeBold className="text-white text-3xl" />
                </div>
                <h4>Visit Our Office</h4>
              </div>

              <div className="flex gap-x-3 mb-5">
                <TfiLocationPin className="text-primary text-4xl" />
                <p>
                  Head Office: 12, Adewale Crescent, Off Ewenla Crescent, Oshodi, Lagos, Nigeria
                </p>
              </div>

              <a href="#" className="btn-three flex items-center justify-center gap-x-3">
                <TfiLocationPin className="text-primary text-2xl" /> Get Directions
              </a>
            </div>
          </div>
        </div>
        <MapLocation />
      </section>


      {/* Immediate Assistance */}
      <section className="px-7">
        <div className="max-w-3xl mx-auto text-center pt-14 pb-18 px-3 my-16 rounded-2xl bg-light-gray">
          <TbMessageCircle className="text-7xl text-primary mx-auto" />
          <h2 className="my-6">Need Immediate Assistance?</h2>
          <p className="max-w-2xl mx-auto">
            For urgent inquiries during business hours, call our direct lines. Our experienced team is ready to provide professional consultation and support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
            <a href="tel:+2348129008569" className="btn-two flex items-center gap-x-3">
              <FiPhone className="text-white" /> Sales: +2348129008569
            </a>

            <a href="tel:+2349029371941" className="btn-one flex items-center gap-x-3">
              <FiPhone className="text-secondary" /> Services: +2349029371941
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
