// export default function AuthLayout({ children }) {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full bg-white shadow-lg rounded-xl">
//         {children}
//       </div>
//     </div>
//   );
// }
export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side (logo / image) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-l from-blue-200 via-blue-300 to-blue-400
 items-center justify-center p-8">
        <div className="text-center text-white">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto w-auto h-48 mb-6 drop-shadow-lg"
          />
          {/* <h2 className="text-3xl font-extrabold">Medi-Pillpal</h2>
          <p className="mt-2 text-lg">Welcome to our platform 🚀</p> */}
        </div>
      </div>

      {/* Right side (auth pages like login, signup, forgot-password) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
