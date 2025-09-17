// export default function Button({ children }) {
//   return (
//     <button
//       className="
//         px-5 py-2 rounded-full
//         bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600
//         text-white font-semibold
//         shadow-md
//         hover:from-blue-400 hover:via-blue-600 hover:to-blue-800
//         hover:shadow-lg
//         transform hover:scale-105
//         transition-all duration-300 ease-out
//       "
//     >
//       {children}
//     </button>
//   );
// }

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        px-5 py-2 rounded-full
        bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800
        text-white font-semibold
        shadow-md hover:from-blue-500 hover:via-blue-700 hover:to-blue-900
        hover:shadow-lg transform hover:scale-105
        transition-all duration-300 ease-out
      "
    >
      {children}
    </button>
  );
}
