import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";
import Dropdown from '@/Components/Dropdown';
import SecondaryButton from '@/Components/SecondaryButton';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { router } from "@inertiajs/react";
import { AiOutlineFundView } from "react-icons/ai";
import { useMemo, useState } from "react";
import '../../../../styles/style.css';

type MonthlySummaryRow = {
    month: number;
    month_name: string;
    total_gross: number;
    total_deduction: number;
    net_pay: number;
};

type Props = {
    selectedYear: string;
    monthlySummary: MonthlySummaryRow[];
    availableYears: number[];
    
};

export default function ReportsPartial({ selectedYear, availableYears, monthlySummary }: Props) {
    const TABS = ["Regular", "Part-Time", "Job Order"];
    const [activeTab, setActiveTab] = useState("Regular");

    const reloadReports = (year: string | number, tab: string) => {
        router.get(route("admin.payroll.summary"),{ year, payrollType: tab },{ preserveState: true });
    };
    console.log("REPORTS",monthlySummary)
    const handleChangeYear = (year: number) => {
        reloadReports(year, activeTab);
    };

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab);
        reloadReports(selectedYear, tab);
    };

    const handleView = (data: MonthlySummaryRow) => {
        router.visit(`payroll/${selectedYear}/${data.month}/view/summary?payrollType=${activeTab}`);
    };
    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: "month_name",
                headerName: "Month",
                flex: 1,
                align: "center",
                headerAlign: "center",
                sortable: false,
            },
            {
                field: "total_gross",
                headerName: "Total Gross",
                flex: 1,
                align: "center",
                headerAlign: "center",
                sortable: false,
                renderCell: (params) => (
                    <span>
                        ₱ {Number(params.value).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </span>
                ),
            },
            {
                field: "total_deduction",
                headerName: "Total Deduction",
                flex: 1,
                align: "center",
                headerAlign: "center",
                sortable: false,
                renderCell: (params) => (
                    <span>
                        ₱ {Number(params.value).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </span>
                ),
            },
            {
                field: "net_pay",
                headerName: "Total Net Pay",
                flex: 1,
                align: "center",
                headerAlign: "center",
                sortable: false,
                renderCell: (params) => (
                    <span>
                        ₱ {Number(params.value).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </span>
                ),
            },
            {
                field: "actions",
                headerName: "Actions",
                flex: 1,
                headerAlign: "center",
                sortable: false,
                renderCell: (data: any) => (
                    <div className="flex gap-2 pt-1 items-center justify-center">
                        <div
                            onClick={() => handleView(data.row)}
                            className="bg-transparent group h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:blue-green-500"
                        >
                            <AiOutlineFundView className="mb-[5px] w-6 h-6 text-blue-500 transition-all duration-300 group-hover:text-blue-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                            <p className="absolute text-[13px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        [handleView]
    );

    return (
        <>
            <div className="w-full">
                {/* Dropdown Year Selector */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <SecondaryButton className="flex w-full md:w-[14rem] justify-between items-center border">
                            <p className="text-sm">{selectedYear || "Select Year"}</p>
                            <RiArrowDropDownLine className="text-2xl transition-transform duration-500 ease-in-out" />
                        </SecondaryButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content contentClasses="w-full md:w-[14rem] bg-[#1B4D4D]" align="left">
                        {availableYears.map((year) => (
                            <button
                                key={year}
                                onClick={() => handleChangeYear(year)}
                                className="block w-full text-left px-4 py-1 hover:bg-mainColor hover:text-white"
                            >
                                {year}
                            </button>
                        ))}
                    </Dropdown.Content>
                </Dropdown>

                {/* Tabs */}
                <div className="gap-5 flex py-7 w-full">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`custom-hover text-white ${
                                activeTab === tab ? "border-b-2 border-yellow-500" : ""
                            }`}
                            onClick={() => handleChangeTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Contents */}
            {TABS.map((tab) => (
                <div
                    key={tab}
                    className={`${
                        activeTab === tab ? "block" : "hidden"
                    } bg-[#16423C] border border-button-border-color rounded-lg`}
                >
                    <h2 className="text-lg font-semibold my-3 mx-5 text-white">
                        Reports for {tab}
                    </h2>
                    <div className="h-auto max-h-[530px] w-full overflow-x-auto overflow-y-auto scrollbar-hidden">
                        <div className="min-w-[900px]">
                            <Table
                                rows={monthlySummary}
                                columns={columns}
                                hideFooter={true}
                                pageSize={12}
                                getRowId={(row) => row.month}
                                className="employee-table"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
