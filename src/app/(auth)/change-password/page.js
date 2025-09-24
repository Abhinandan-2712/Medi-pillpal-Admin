

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function ForgotPasswordPage() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [securityToken, setSecurityToken] = useState("");

//   useEffect(() => {
//     setEmail(sessionStorage.getItem("forgotPasswordEmail") || "");
//     setSecurityToken(sessionStorage.getItem("securityToken") || "");
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !securityToken) {
//       toast.error(
//         "Session expired. Please start the forgot password process again."
//       );
//       return;
//     }

//     if (!newPassword || !confirmPassword) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("email", email);
//       formData.append("securityToken", securityToken);
//       formData.append("newPassword", newPassword);
//       formData.append("confirmPassword", confirmPassword);
      

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/change-forgot-password`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//         // optional
//       );

//       console.log(res);

//       if (res?.data?.success) {
//         toast.success(res.data.message || "Password reset successful!");
//         router.replace("/login");
//       } else {
//         toast.error(res?.data?.message || "Failed to reset password");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.error || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
//       >
//         <h1 className="text-3xl font-extrabold text-gray-800 text-center">
//           Change Password 🔑
//         </h1>
//         <p className="text-sm text-gray-500 text-center">
//           Enter your new password and confirm it
//         </p>

//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
//         >
//           {loading ? "Processing..." : "Reset Password"}
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           Remembered your password?{" "}
//           <a
//             href="/login"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Back to Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [securityToken, setSecurityToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    setEmail(sessionStorage.getItem("forgotPasswordEmail") || "");
    setSecurityToken(sessionStorage.getItem("securityToken") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !securityToken) {
      toast.error("Session expired. Please start the forgot password process again.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("securityToken", securityToken);
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/change-forgot-password`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res?.data?.success) {
        toast.success(res.data.message || "Password reset successful!");
        router.replace("/login");
      } else {
        toast.error(res?.data?.message || "Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Change Password 🔑
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Enter your new password and confirm it
        </p>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
}

