
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";

export default function Card({
  title = "Total Guardians",
  amount = 0,
  percentage = 0,
  isIncrease = true,
  para = "Parents Who Have Visited So Far",
  isCurrency = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick} 
      className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-800">
              {isCurrency
                ? `$${Number(amount).toLocaleString()}`
                : Number(amount).toLocaleString()}
            </h1>
          </div>

          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm
              ${isIncrease ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
            `}
          >
            {isIncrease ? <IoIosTrendingUp /> : <IoIosTrendingDown />}
            {percentage}%
          </div>
        </div>

        <div className="my-4 h-px w-full bg-gray-100" />

        <p className="text-sm font-medium text-gray-500">{para}</p>
      </div>
    </div>
  );
}
