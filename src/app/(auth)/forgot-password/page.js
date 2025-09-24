"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Rss } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter()

  const handleSubmit = async (e) => {
  
    e.preventDefault(); // Prevent page reload
    if (!email) {
      toast.error("Please enter your email!",{id:"email"});
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/forgot-password`,
        { email }
      );
      // console.log(res);
      if (res?.data?.success) {
        toast.success(res.data.message || "OTP sent successfully!",{id:"success"});
        setEmail("");
        sessionStorage.setItem("forgotPasswordEmail", email);
         router.replace("/otp");
      }
      else if(!res?.data?.success){
        if(res?.data?.message=== "Admin not found"){
           toast.error("Your are not a Admin, please check mail ",{id:"not_admin"});
        }
      }
    } catch (error) {
      console.error(
        "Forgot password error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || "Something went wrong!",{id:"error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Forgot Password 🔑
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Enter your email address and we’ll send you reset instructions
        </p>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
}
