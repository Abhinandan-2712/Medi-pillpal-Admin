
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="ml-64">
        {/* Navbar */}
        <div className="fixed top-0 left-64 right-0 h-16  z-10 p-4">
          <Navbar />
        </div>

        {/* Scrollable content */}
        <main className="pt-16 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

