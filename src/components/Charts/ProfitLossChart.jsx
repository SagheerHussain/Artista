import React, { useEffect, useState } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import { Listbox } from "@headlessui/react";
import { getMonthlySalaryData, getMonthlySalesData } from "../../../services/analyticsService";

const MonthlyExpenseData = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 0 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 0 },
  { name: "May", value: 0 },
  { name: "Jun", value: 0 },
  { name: "Jul", value: 0 },
  { name: "Aug", value: 0 },
  { name: "Sep", value: 0 },
  { name: "Oct", value: 0 },
  { name: "Nov", value: 0 },
  { name: "Dec", value: 0 },
];

// Yearly Aggregated Data Placeholder
const YearlyOptions = ["2025"];

const ProfitLossChart = () => {
  const [viewType, setViewType] = useState("Yearly View");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [monthlySalaryData, setMonthlySalaryData] = useState([]);

  // Get Monthly Sales Data
  const fetchingData = async () => {
    try {
      const monthlySales = await getMonthlySalesData();
      const monthlySalaries = await getMonthlySalaryData();
      console.log(monthlySalaries.data);
      setMonthlySalesData(monthlySales.data);
      setMonthlySalaryData(monthlySalaries.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // Monthly Data Calculation (Revenue, Expense, Profit)
  const getMonthlyData = () => {
    return monthlySalesData.map((item, index) => {
      const salary = monthlySalaryData[index].totalSalaries / 280;
      const expense = MonthlyExpenseData[index].value;
      const totalExpense = salary + expense;
      const profit = item.totalSales - totalExpense;

      return {
        name: item.month,
        revenue: item.totalSales,
        expense: totalExpense,
        profit,
      };
    });
  };

  // Yearly Data Calculation
  const getYearlyData = () => {
    const totalRevenue = monthlySalesData.reduce(
      (sum, item) => sum + item.totalSales,
      0
    );
    const totalSalary = monthlySalaryData.reduce(
      (sum, item) => sum + item.totalSalaries / 280,
      0
    );
    const totalExpenseOther = MonthlyExpenseData.reduce(
      (sum, item) => sum + item.value,
      0
    );
    const totalExpense = totalSalary + totalExpenseOther;
    const totalProfit = totalRevenue - totalExpense;

    return [
      {
        name: selectedYear,
        revenue: totalRevenue,
        expense: totalExpense,
        profit: totalProfit,
      },
    ];
  };

  return (
    <div className="w-full rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Profit & Loss Overview</h2>

        <div className="flex gap-4">
          <Listbox value={viewType} onChange={setViewType}>
            <div className="relative">
              <Listbox.Button className="bg-zinc-900 px-4 py-2 rounded-lg shadow">
                {viewType}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-2 bg-zinc-900 shadow rounded-lg z-10">
                <Listbox.Option
                  value="Yearly View"
                  className="cursor-pointer px-4 py-2 hover:bg-zinc-700"
                >
                  Yearly View
                </Listbox.Option>
                <Listbox.Option
                  value="Monthly View"
                  className="cursor-pointer px-4 py-2 hover:bg-zinc-700"
                >
                  Monthly View
                </Listbox.Option>
              </Listbox.Options>
            </div>
          </Listbox>

          {viewType === "Monthly View" && (
            <Listbox value={selectedYear} onChange={setSelectedYear}>
              <div className="relative">
                <Listbox.Button className="bg-zinc-900 px-4 py-2 rounded-lg shadow">
                  {selectedYear}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-2 bg-zinc-900 shadow rounded-lg z-10">
                  {YearlyOptions.map((year) => (
                    <Listbox.Option
                      key={year}
                      value={year}
                      className="cursor-pointer px-4 py-2 hover:bg-zinc-700"
                    >
                      {year}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          )}
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={
              viewType === "Yearly View" ? getYearlyData() : getMonthlyData()
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
              }}
              itemStyle={{ color: "#4FA0FF" }} // Tooltip values white
              labelStyle={{ color: "#C96FFE " }} // Tooltip label white
              cursor={{ fill: "#212121" }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#C96FFE" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill="#4FA0FF" radius={[8, 8, 0, 0]} />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#F59E0B"
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitLossChart;
