export default function LoginPage() {
  return (
    <div >
      <form className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Please login to your account
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            {/* <input type="checkbox" className="accent-blue-600" />
            Remember me */}
          </label>
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Login
        </button>

        {/* <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </a>
        </p> */}
      </form>
    </div>
  );
}
