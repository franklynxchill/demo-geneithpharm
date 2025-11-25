"use client";
import { useState } from "react";

export default function DistributorPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // ✅ FIXED TYPES
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED TYPES
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/distributors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Thank you! We’ll contact you shortly.");
        setForm({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } else {
        setStatus(data.error || "❌ Submission failed, please try again.");
      }
    } catch (err) {
      setStatus("❌ Network error, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1>
          Become a Geneith Distributor
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Partner with Geneith Pharmaceuticals to distribute high-quality
          healthcare products across Nigeria. Join our trusted network of
          distributors and make a lasting impact in your region.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="mb-2">
            Quality & Trust
          </h3>
          <p className="text-gray-600 text-sm">
            Distribute certified pharmaceutical products trusted by healthcare
            professionals nationwide.
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="mb-2">
            Business Support
          </h3>
          <p className="text-gray-600 text-sm">
            Enjoy consistent support, marketing materials, and dedicated
            partnership management.
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="mb-2">
            Nationwide Reach
          </h3>
          <p className="text-gray-600 text-sm">
            Become part of our fast-growing network that ensures timely product
            delivery and brand visibility.
          </p>
        </div>
      </div>

      {/* Distributor Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="mb-4">
          Distributor Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="contactPerson"
            placeholder="Contact Person"
            value={form.contactPerson}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="address"
            placeholder="Business Address"
            value={form.address}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <textarea
            name="message"
            placeholder="Tell us about your distribution goals..."
            value={form.message}
            onChange={handleChange}
            className="border p-2 w-full rounded h-28"
          ></textarea>

          <button
            type="submit"
            className="bg-[#B02025] text-white py-2 px-4 rounded w-full hover:bg-red-700 transition"
          >
            Submit Application
          </button>
        </form>

        {status && <p className="text-center mt-3 text-sm">{status}</p>}
      </div>
    </div>
  );
}
