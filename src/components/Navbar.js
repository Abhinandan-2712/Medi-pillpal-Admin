// import Button from "@/components/Button";

// export default function Navbar() {
//   return (
//     <header className="w-full bg-white shadow p-4 sticky top-0 z-10">
//       <nav className="flex justify-between items-center">
//         <div className="text-2xl font-bold">Welcome back Admin 👋</div>
//         <div className="flex items-center gap-4">
//           {/* Example user area, replace with dropdown/profile as needed */}
//           {/* <span className="font-medium">photo admin</span> */}
//           <div >
//             <Button > 
//                 Logout
//             </Button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

"use client";
import { useState } from "react";
import Button from "@/components/Button";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    // 👉 Yahan actual logout logic add karein (API call, token remove, etc.)
    console.log("User logged out");
    setIsModalOpen(false);
  };

  return (
    <header className="w-full bg-white border border-gray-300 shadow p-4 rounded-sm sticky top-0 z-10">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">Welcome Admin 👋</div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Logout</Button>
        </div>
      </nav>

      {/* ✅ Full-Screen Blur Modal */}
      {isModalOpen && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/30 backdrop-blur-sm
          "
        >
          <div className="bg-white rounded-xl p-6 w-80 text-center shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleLogout}
                // className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes, Logout
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                // className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
