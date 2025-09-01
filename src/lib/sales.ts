import { Sale } from "@/components/SalesTable";

export function getTotalRevenue(sales: Sale[]): number {
  return sales.reduce((total, sale) => total + sale.totalPrice, 0);
}

export function getTotalSales(sales: Sale[]): number {
  return sales.reduce((total, sale) => total + sale.quantity, 0);
}
export function getAverageOrderValue(sales: Sale[]): number {
  const totalRevenue = getTotalRevenue(sales);
  const totalSales = getTotalSales(sales);
  return totalSales > 0 ? totalRevenue / totalSales : 0;
}
