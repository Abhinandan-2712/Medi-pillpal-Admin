// "use client";

// import { useState, useEffect } from "react";
// import OtpInput from "react-otp-input";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function OtpPage() {
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     const storedEmail = sessionStorage.getItem("forgotPasswordEmail");
//     // console.log(storedEmail)
//     if (storedEmail) setEmail(storedEmail);
//     else {
//       toast.error("No email found. Please try again.");
//       router.push("/forgot-password");
//     }
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData from the form
//     const formData = new FormData(e.target);
//     const emailFromForm = formData.get("email"); // get email from hidden input
//     const otpFromForm = otp; // your OTP state

//     if (otpFromForm.length !== 4) {
//       toast.error("Please enter a valid 4-digit OTP!", { id: "valid" });
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/verify-otp`,
//         { email: emailFromForm, otp: otpFromForm } // send email from form
//       );
//       // console.log(res);

//       if (res?.data?.success) {
//         toast.success(res.data.message || "OTP verified successfully!", {
//           id: "success",
//         });
//         const securityToken = res?.data?.result.securityToken;
//         sessionStorage.setItem("securityToken", securityToken);
//         router.push("/change-password"); // redirect
//       } else {
//         toast.error(res?.data?.message || "Invalid OTP", { id: "invalid-otp" });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.error || "Something went wrong!", {
//         id: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!email) {
//       toast.error("Email not found to resend OTP");
//       return;
//     }
//     try {
//       setResendLoading(true);
//       const formData = new FormData();
//       formData.append("email", email);

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/resend-otp`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (res?.data?.success) {
//         toast.success(res.data.message || "OTP resent successfully!");
//       } else {
//         toast.error(res?.data?.message || "Failed to resend OTP");
//       }
//     } catch (err) {
//       toast.error(
//         err.response?.data?.error || "Something went wrong while resending!"
//       );
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center  ">
//       <form
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-3xl font-extrabold text-gray-800 text-center">
//           Enter Your OTP 🕐
//         </h1>
//         <p className="text-sm text-gray-500 text-center">
//           Enter your otp and we’ll send you email
//         </p>

//         {/* Hidden input to hold email */}
//         <input type="hidden" name="email" value={email} />

//         <div className="flex justify-center">
//           <OtpInput
//             value={otp}
//             onChange={(val) => setOtp(val.replace(/\D/g, ""))}
//             numInputs={4}
//             pattern="[0-9]*"
//             shouldAutoFocus
//             containerStyle={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "16px",
//               marginTop: "1.5rem",
//             }}
//             renderInput={(props) => (
//               <input
//                 {...props}
//                 type="tel"
//                 className="!w-14 h-14 border border-gray-300 rounded-md bg-gray-50 text-2xl font-bold text-center outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//               />
//             )}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
//         >
//           Verify OTP
//         </button>
//         <p className="text-center text-sm text-gray-600">
//           Didn’t receive your OTP?{" "}
//           <button
//             type="button"
//             onClick={handleResendOtp}
//             disabled={resendLoading}
//             className="text-blue-600 hover:underline font-medium"
//           >
//             {resendLoading ? "Resending..." : "Resend OTP"}
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("forgotPasswordEmail");
    if (storedEmail) setEmail(storedEmail);
    else {
      toast.error("No email found. Please try again.");
      router.push("/forgot-password");
    }
  }, [router]);

  // ===== Verify OTP Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // will contain hidden email
    formData.append("otp", otp);

    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP!", { id: "valid" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/verify-otp`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res?.data?.success) {
        toast.success(res.data.message || "OTP verified successfully!", {
          id: "success",
        });
        sessionStorage.setItem("securityToken", res.data.result.securityToken);
        router.push("/change-password");
      } else {
        toast.error(res?.data?.message || "Invalid OTP", { id: "invalid-otp" });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong!",
        { id: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  // ===== Resend OTP =====
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found to resend OTP");
      return;
    }
    try {
      setResendLoading(true);
      const formData = new FormData();
      formData.append("email", email);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/resend-otp`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(res)

      if (res?.data?.success) {
        toast.success(res.data.message || "OTP resent successfully!");
      } else {
        toast.error(res?.data?.message || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Something went wrong while resending!"
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Enter Your OTP 🕐
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Enter your OTP to verify your email
        </p>

        {/* hidden email field so FormData gets it */}
        <input type="hidden" name="email" value={email} />

        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={(val) => setOtp(val.replace(/\D/g, ""))}
            numInputs={4}
            pattern="[0-9]*"
            shouldAutoFocus
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "1.5rem",
            }}
            renderInput={(props) => (
              <input
                {...props}
                type="tel"
                className="!w-14 h-14 border border-gray-300 rounded-md bg-gray-50 text-2xl font-bold text-center outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              />
            )}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Didn’t receive your OTP?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="text-blue-600 hover:underline font-medium"
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </button>
        </p>
      </form>
    </div>
  );
}
