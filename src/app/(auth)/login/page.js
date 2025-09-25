// "use client";
// import { useState } from "react";
// import axios from "axios";

// export default function LoginPage() {
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // 🔑 page reload stop kare
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/login`,
//         { email, password } // <-- yeh values form ke state se aa rahi hain
//       );

//       console.log("Login success:", res.data);
//       localStorage.setItem("token", res.data.token);
//       window.location.href = "/dashboard";
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Login failed");
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
//           Welcome Back 👋
//         </h1>
//         <p className="text-sm text-gray-500 text-center">
//           Please login to your account
//         </p>

//         <div className="space-y-4">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div className="flex justify-between items-center text-sm">
//           <a href="/forgot-password" className="text-blue-600 hover:underline">
//             Forgot password?
//           </a>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // npm install react-hot-toast
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🔑 toggle
  const router = useRouter();

  const validateEmail = (email) => {
    // simple regex for email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Client-side validation
    if (!email || !password) {
      toast.error("Please fill in all fields",{id:"all_field"});
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email",{id:"email"});
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admins/login`,
        { email, password }
      );
      // console.log(res);
      if (res?.data?.success) {
        localStorage.setItem("token", res?.data?.result?.token);
        toast.success("Login successful!",{id:"success"});
        // window.location.href = "/dashboard";
        router.replace("/dashboard");
      } else if (!res?.data?.success) {
        if (res.data.message === "Password mismatch",{id:"wrong_pass"}) {
          toast.error("Something went wrong..",{id:"error"});
        }
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed",{id:"error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Please login to your account for test 
        </p>

        <div className="space-y-4 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 🔑 toggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
