"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import Dropdown from "@/Components/Dropdown"
import SecondaryButton from "@/Components/SecondaryButton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { router } from "@inertiajs/react"
import { RiArrowDropDownLine } from "react-icons/ri"

type DataPoint = {
  date: string
  NetPay: number
  GrossPay: number
  Deductions: number
}

type ChartAreaInteractiveProps = {
  data: DataPoint[]
  selectedYear: string
  availableYears: number[]
}

const chartConfig: ChartConfig = {
  NetPay: {
    label: "NetPay",
    color: "#1e90ff",
  },
  Deductions: {
    label: "Deductions",
    color: "violet",
  },
  GrossPay: {
    label: "GrossPay",
    color: "green",
  },
}

export function ChartAreaInteractive({
  data,
  selectedYear,
  availableYears,
}: ChartAreaInteractiveProps) {
  const [year, setYear] = React.useState<string>(selectedYear)

  const handleChange = (selectedYear: number) => {
    setYear(selectedYear.toString())
    router.get(route("admin.dashboard"), { year: selectedYear }, { preserveState: true })
  }

  return (
    <Card className="pt-0 bg-[#16423C] border border-white">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-white">Area Chart - Interactive</CardTitle>
          <CardDescription className="text-white">
            Showing total data for {year}
          </CardDescription>
        </div>
        <Dropdown>
          <Dropdown.Trigger>
            <SecondaryButton className="flex w-full justify-between items-center md:w-[200px] border">
              <p className="text-sm">{year}</p>
              <RiArrowDropDownLine className="text-2xl" />
            </SecondaryButton>
          </Dropdown.Trigger>
          <Dropdown.Content contentClasses="w-[200px] bg-[#1B4D4D]" align="left">
            {availableYears.map((y) => (
              <button
                key={y}
                onClick={() => handleChange(y)}
                className="block w-full text-left px-4 py-1 hover:bg-mainColor"
              >
                {y}
              </button>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart width={1150} height={300} data={data}>
            <defs>
              <linearGradient id="fillNetPay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e90ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1e90ff" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillDeductions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="violet" stopOpacity={0.8} />
                <stop offset="95%" stopColor="violet" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillGrossPay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                <stop offset="95%" stopColor="green" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <YAxis tick={{ fill: "#ffffff" }} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#ffffff" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <Tooltip
              content={({ label, payload }) => (
                <ChartTooltipContent
                  label={label}
                  payload={payload}
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(value as string).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
              )}
            />
            <Area
              dataKey="NetPay"
              type="monotone"
              fill="url(#fillNetPay)"
              stroke="#1e90ff"
              stackId="a"
            />
            <Area
              dataKey="Deductions"
              type="monotone"
              fill="url(#fillDeductions)"
              stroke="violet"
              stackId="a"
            />
            <Area
              dataKey="GrossPay"
              type="monotone"
              fill="url(#fillGrossPay)"
              stroke="green"
              stackId="a"
            />
            <Legend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
