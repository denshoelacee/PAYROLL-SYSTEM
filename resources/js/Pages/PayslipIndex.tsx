import React from "react";
import { router } from "@inertiajs/react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from "react-icons/hi";
import SecondaryButton  from "@/Components/SecondaryButton"
import {Employee,UserPayroll} from "@/types";

type Payslip = {
  employee_id: string;
  first_name: string;
  last_name: string;
  designation: string;
  department: string;
  employment_type: string;
  publish_status: string;
};

type MonthOption = {
  number: string;
  name: string;
};

type Props = {
  payslips: Employee[];
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
  const flattenedRows = payslips.map((row, ids) => ({
    id: ids,
    employee_id: row.employee_id || '',
    first_name: row?.first_name || '',
    last_name: row?.last_name || '',
    designation: row?.designation || '',
    department: row?.department || '',
    employment_type: row?.employment_type || '',
    publish_status: row?.latest_payroll?.publish_status || '',
  }));

  const handleChange = (year: string, month: string) => {
    router.get(route("payslip.index"), { year, month }, { preserveState: true });
  };

  const handleOpenPopover = (e: React.MouseEvent, row: any) => {
    // Your custom logic to open popover
    console.log("Open popover for:", row);
  };

  const columns: GridColDef[] = [
    {
      field: "employee_id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "first_name",
      headerName: "First name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "last_name",
      headerName: "Last name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "employment_type",
      headerName: "Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "publish_status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params?.row.publish_status === "none" ? (
          ""
        ) : (
          <span
            className={`text-center p-2 rounded-full ${
              params.row.publish_status === "publish"
                ? "text-green-500 border border-emerald-500"
                : "text-yellow-500 border border-yellow-500"
            }`}
          >
            {params.row.publish_status === "publish" ? "Published" : "Partial"}
          </span>
        ),
    },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (data: any) => (
        <div className="flex justify-center place-items-center gap-2 pt-2">
          <SecondaryButton
            className="text-sm border-none"
            onClick={(e) => handleOpenPopover(e, data.row)}
          >
            <HiOutlineDotsVertical size={25} />
          </SecondaryButton>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payslip List</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border rounded px-4 py-2"
          value={selectedYear}
          onChange={(e) => handleChange(e.target.value, selectedMonth)}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-4 py-2"
          value={selectedMonth}
          onChange={(e) => handleChange(selectedYear, e.target.value)}
        >
          {availableMonths.map((m) => (
            <option key={m.number} value={m.number}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* DataGrid */}
      <div style={{ height: 600, width: "100%" }} className="rounded border shadow">
        <DataGrid
          rows={flattenedRows}
          columns={columns}
        />

      </div>
    </div>
  );
};

export default PayslipIndex;
