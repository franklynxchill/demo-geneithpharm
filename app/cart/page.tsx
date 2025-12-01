"use client";
import { useCart, CartItem } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";

export default function Page() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // ✅ Total and items count
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Total discount
  const totalDiscount = cart.reduce(
    (sum, item) => sum + ((item.discount ?? 0) * item.quantity),
    0
  );

  // ✅ Final total after discount
  const finalTotal = total - totalDiscount;

  return (
    <div className="container mx-auto py-10">
      {cart.length === 0 ? (
        <div className="bg-light-gray shadow max-w-3xl mx-auto rounded-2xl flex flex-col items-center justify-center h-[60vh]">
          <div className="bg-secondary rounded-lg w-24 h-24 flex justify-center items-center">
            <LuShoppingBag className="text-white text-5xl" />
          </div>
          <h2 className="capitalize mt-6">Your cart is empty.</h2>
          <p className="mt-4 mb-6 text-center mx-auto max-w-lg">
            Looks like you haven't added any products to your cart yet. Start shopping to find great deals on quality medicines.
          </p>
          <div className="mt-5">
            <Link
              href="/shop"
              className="btn-two rounded-2xl flex items-center gap-4 font-medium"
            >
              Continue Shopping
              <FaArrowRight className="text-lg text-white" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 px-7 md:px-0">
            Your Shopping Cart ({totalItems} items)
          </h2>

          <div className="flex flex-col md:flex-row md:items-start gap-9 px-4">
            {/* Products List */}
            <div className="flex flex-col gap-4 md:w-[67%]">
              {cart.map((item: CartItem) => (
                <div
                  key={item._id}
                  className="flex flex-row justify-between items-center border border-gray-200 rounded-2xl p-4 shadow-sm"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image ?? "/placeholder.png"}
                      alt={item.name ?? "Product Image"}
                      width={140}
                      height={140}
                      className="rounded-lg"
                    />
                    <div>
                      <span className="font-semibold">{item.name ?? "Unnamed Product"}</span>
                      <p>In Stock</p>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center gap-x-2 md:gap-x-4 pr-2 justify-end">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-3 md:mt-0">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, Math.max(item.quantity - 1, 1))
                        }
                        className="border p-2 rounded-lg cursor-pointer"
                      >
                        <FaMinus className="text-black text-lg" />
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="border p-2 rounded-lg cursor-pointer"
                      >
                        <FaPlus className="text-black text-lg" />
                      </button>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col items-center gap-4 mt-3 md:mt-0">
                      <p className="font-semibold text-primary">
                        ₦{((item.discount ?? item.price) * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="flex items-center cursor-pointer text-primary hover:text-red-600"
                      >
                        <FaRegTrashAlt className="text-lg mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm md:w-[30%]">
              <h3 className="text-xl font-semibold mb-2">Order Summary</h3>

              {/* Subtotal */}
              <div className="flex items-center justify-between mt-6 pb-4">
                <span>Subtotal ({totalItems} items):</span>
                <span>
                  <strong>₦{total.toLocaleString()}</strong>
                </span>
              </div>

              {/* Total Discount */}
              <div className="flex items-center justify-between pb-4">
                <span>Total Discount:</span>
                <span className="text-green-600">-₦{totalDiscount.toLocaleString()}</span>
              </div>

              {/* Final Total */}
              <div className="flex items-center justify-between border-t pt-6">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold text-primary">
                  ₦{finalTotal.toLocaleString()}
                </span>
              </div>

              {/* Buttons */}
              <Link
                href="/checkout"
                className="bg-primary text-white w-full px-6 py-3 rounded-2xl inline-block text-center hover:bg-primary/80 mt-6"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="border border-light-gray text-foreground w-full px-6 py-3 rounded-2xl inline-block text-center hover:border-secondary/80 mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
