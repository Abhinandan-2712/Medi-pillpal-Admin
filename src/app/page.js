
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to My App 🚀</h1>
      <p className="text-lg text-gray-600 mb-8">
        Please login to continue or explore the dashboard.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </a>
        <a
          href="/dashboard"
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
        >
          Dashboard
        </a>
      </div>
    </main>
  );
}
