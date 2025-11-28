"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export default function Page() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.discount ?? item.price) * item.quantity,
    0
  );

  return (
    <main className="max-w-6xl mx-auto mt-24 px-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link href="/products" className="text-primary underline mt-3 inline-block">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 border-b py-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-500">{item.category}</p>
                <p className="font-bold">
                  ₦{(item.discount ?? item.price).toLocaleString()}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="border p-2 rounded"
                >
                  <FiMinus />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="border p-2 rounded"
                >
                  <FiPlus />
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center mt-8">
            <h3 className="text-xl font-bold">
              Total: ₦{total.toLocaleString()}
            </h3>

            <Link
              href="/checkout"
              className="px-6 py-3 bg-primary text-white rounded-lg"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
