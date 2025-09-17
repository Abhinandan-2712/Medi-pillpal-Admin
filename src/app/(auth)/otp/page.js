"use client";

import { useState } from "react";
import OtpInput from "react-otp-input";

export default function ForgotPasswordPage() {
  const [otp, setOtp] = useState("");
  const handleChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
  };
  return (
    <div>
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Enter Your Otp 🕐
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Enter your otp and we’ll send you email
        </p>

        <div className="flex justify-center">
          {/* <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            pattern="[0-9]*"
            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                                                        // className="w-[60px]  h-[60px] border border-[#e5e7eb]  rounded-sm bg-gray-100 text-xl font-bold text-black  text-center  focus:ring-2 focus:ring-red-500 my-6"

            renderInput={(props) => (
              <input
                {...props}
                type="tel"
                            className="  border border-[#e5e7eb]  rounded-sm bg-gray-100 text-xl font-bold text-black  text-center  focus:ring-2 focus:ring-red-500  p-1"
              />
            )}
            renderSeparator={<span> </span>}
            shouldAutoFocus
                                containerStyle={{ justifyContent: 'space-between', gap: '12px' }}

          /> */}
          <OtpInput
            value={otp}
            onChange={(val)=>setOtp(val.replace(/\D/g,""))}
            numInputs={4}
            pattern="[0-9]*"
            shouldAutoFocus
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              gap: "16px", // uniform gap
              marginTop: "1.5rem",
            }}
            renderInput={(props) => (
              <input
                {...props}
                type="tel"
                className="
        !w-14 h-14
        border border-gray-300
        rounded-md
        bg-gray-50
        text-2xl font-bold text-gray-900 text-center
        outline-none
        transition
        focus:ring-2 focus:ring-blue-400 focus:border-blue-400
        shadow-sm
      "
              />
            )}
            renderSeparator={<span />}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Send Otp
        </button>

        <p className="text-center text-sm text-gray-600">
          Didn’t receive your OTP?{" "}
          <button
            
            className="text-blue-600 hover:underline font-medium"
          >
           Resend OTP
          </button>
        </p>
      </form>
    </div>
  );
}
