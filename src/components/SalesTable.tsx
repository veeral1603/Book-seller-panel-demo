import React from "react";

export type Sale = {
  id: string;
  book: {
    title: string;
  };
  quantity: number;
  totalPrice: number;
  createdAt: string;
};

type SalesTableProps = {
  sales: Sale[];
};

export default function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="bg-white  shadow-lg rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 ">Sales Records</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 ">
          <thead className="bg-gray-100  text-gray-600  uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Book Title</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale, index) => (
                <tr
                  key={sale.id}
                  className="border-b border-gray-200  hover:bg-gray-50  transition"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3 font-medium">{sale.book.title}</td>
                  <td className="px-6 py-3">{sale.quantity}</td>
                  <td className="px-6 py-3">₹{sale.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-3">
                    {new Date(sale.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                  No sales found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
