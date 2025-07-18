import React from "react";
import { router } from "@inertiajs/react";

type Payslip = {
  pay_date: string;
  employee_id: string;
  name: string;
  basic_salary: string;
  total_deduction: string;
  net_pay: string;
};

type MonthOption = {
  number: string;
  name: string;
};

type Props = {
  payslips: Payslip[];
  availableYears: number[];
  availableMonths: MonthOption[];
  selectedYear: string;
  selectedMonth: string;
};

const PayslipIndex = ({
  payslips,
  availableYears,
  availableMonths,
  selectedYear,
  selectedMonth,
}: Props) => {
  const handleChange = (year: string, month: string) => {
    router.get(route("payslip.index"), { year, month }, { preserveState: true });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payslip List</h1>

      {/* Filter: Year and Month dropdown */}
      <div className="flex gap-4 mb-6">
        <select
          className="border rounded px-4 py-2"
          value={selectedYear}
          onChange={(e) => handleChange(e.target.value, selectedMonth)}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          className="border rounded px-4 py-2"
          value={selectedMonth}
          onChange={(e) => handleChange(selectedYear, e.target.value)}
        >
          {availableMonths.map((m) => (
            <option key={m.number} value={m.number}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Payslip Table */}
      <div className="overflow-auto rounded shadow border">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Employee ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Pay Date</th>
              <th className="border p-2">Basic Salary</th>
              <th className="border p-2">Total Deduction</th>
              <th className="border p-2">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {payslips.length > 0 ? (
              payslips.map((payslip, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border p-2">{payslip.employee_id}</td>
                  <td className="border p-2">{payslip.name}</td>
                  <td className="border p-2">
                    {new Date(payslip.pay_date).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="border p-2">
                    ₱ {parseFloat(payslip.basic_salary).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    ₱ {parseFloat(payslip.total_deduction).toLocaleString()}
                  </td>
                  <td className="border p-2 font-semibold text-green-600">
                    ₱ {parseFloat(payslip.net_pay).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center border p-4 text-gray-500">
                  No payslips found for this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipIndex;