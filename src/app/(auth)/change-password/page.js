export default function ForgotPasswordPage() {
  return (
    <div>
      <form className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Change Password 🔑
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Enter your password and confirm password and we’ll send you reset instructions
        </p>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="newPassword"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="confirmPassword"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Send Otp
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
