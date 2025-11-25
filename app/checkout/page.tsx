"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { FaLongArrowAltLeft } from "react-icons/fa";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

// List of Nigerian states
const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers",
  "Sokoto","Taraba","Yobe","Zamfara","FCT"
];

export default function Page() {
  const { cart, clearCart } = useCart();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
  });

  const [discount, setDiscount] = useState(0); // Discount in Naira

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = totalAmount - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePaystack = () => {
    if (!user.email || !user.firstName || !user.phone) {
      alert("Please complete your contact information");
      return;
    }

    if (!window.PaystackPop) {
      alert("Paystack not loaded");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email: user.email,
      amount: finalTotal * 100, // Convert to kobo
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: `${user.firstName} ${user.lastName}`,
            variable_name: "customer_name",
            value: user.phone,
          },
        ],
      },
      callback: function (response: any) {
        alert("✅ Payment successful! Reference: " + response.reference);
        clearCart();
        localStorage.removeItem("cart");
        window.location.href = "/success";
      },
      onClose: function () {
        alert("Payment window closed.");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Link href="/cart" className="flex gap-x-3 items-center text-primary">
        <FaLongArrowAltLeft className="text-primary" />
        Back to Cart
      </Link>

      <h1 className="mb-6">Checkout</h1>

      <div className="flex flex-col md:flex-row items-start gap-7">
        {/* Customer Info Form */}
        <div className="border rounded-xl p-6 bg-card md:w-[67%]">
          <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
          <div className="grid grid-cols-1 gap-4">
            {/* First + Last Name */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={user.firstName}
                  onChange={handleChange}
                  className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                />
              </div>

              <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={user.lastName}
                  onChange={handleChange}
                  className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                />
              </div>

              <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="+234 XXX XXX XXXX"
                  value={user.phone}
                  onChange={handleChange}
                  className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col mt-5">
              <label htmlFor="address">Address *</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter your address"
                value={user.address}
                onChange={handleChange}
                className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
              />
            </div>

            {/* City + State */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={user.city}
                  onChange={handleChange}
                  className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                />
              </div>

              <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={user.state}
                  onChange={handleChange}
                  className="px-3 py-3 bg-light-gray border-2 border-light-gray rounded-2xl text-base"
                >
                  <option value="">Select your state</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePaystack}
              disabled={cart.length === 0}
              className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              Pay with Paystack
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-xl p-6 md:w-[30%]">
          <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
          {cart.length > 0 ? (
            <ul className="divide-y">
              {cart.map((item, i) => (
                <li key={i} className="py-2 flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart.</p>
          )}
          <div className="flex justify-between font-semibold mt-4">
            <span>Subtotal:</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold mt-2 text-lg">
            <span>Total:</span>
            <span>₦{finalTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
