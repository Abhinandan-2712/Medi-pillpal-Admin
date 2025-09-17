


"use client";

import { Home, Users, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ current path hook
import { MdOutlineNotificationsActive } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";

export default function Sidebar() {
  const pathname = usePathname(); // ✅ current URL path

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/users", label: "User Management", icon: Users },
    { href: "/notification", label: "Notification", icon: MdOutlineNotificationsActive },
    // { href: "/transaction", label: "Transaction", icon: TbTransactionDollar },
    // { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-300 to-blue-600 text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-4 text-center border-b border-blue-500">
<Image
  src="/Logo.png"           // ✅ absolute path from the public folder
  alt="Medi Admin Logo"
  width={200}             
  height={80}
  className="h-20 p-1 mx-auto"
/>      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href; // ✅ check active route
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-3 rounded-4xl transition 
                ${active ? "bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 text-white font-semibold " : "hover:bg-blue-700"}`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-500">
        <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-blue-700 transition">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
