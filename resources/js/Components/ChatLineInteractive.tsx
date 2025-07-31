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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

type DataPoint = {
  date: string
  Loans: number
  Contributions: number
  GrossPay: number
  Deductions: number
}

type ChartAreaInteractiveProps = {
  data: DataPoint[]
}

const chartConfig = {
  Loans: {
    label: "Loans",
    color: "#ff7300",
  },
  Contributions: {
    label: "Contributions",
    color: "#1e90ff",
  },
  GrossPay: {
    label: "Gross Pay",
    color: "violet",
  },
  Deductions: {
    label: "Deductions",
    color: "green",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const uniqueYears = Array.from(
    new Set(data.map((item) => new Date(item.date).getFullYear()))
  ).sort((a, b) => b - a)

  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear().toString()
  )

  const filteredData = data.filter((item) => {
    const year = new Date(item.date).getFullYear().toString()
    return year === selectedYear
  })

  return (
    <Card className="pt-0 bg-[#16423C] border border-white">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-white">Area Chart - Interactive</CardTitle>
          <CardDescription className="text-white">
            Showing total data for the selected year
          </CardDescription>
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="text-white hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-[#1B4D4E] text-white">
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart width={1150} height={300} data={filteredData}>
            <defs>
              <linearGradient id="fillLoans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e90ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1e90ff" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillGrossPay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="violet" stopOpacity={0.8} />
                <stop offset="95%" stopColor="violet" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillDeductions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                <stop offset="95%" stopColor="green" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <YAxis tick={{ fill: "#ffffff" }} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
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
              dataKey="Loans"
              type="monotone"
              fill="url(#fillLoans)"
              stroke="#ff7300"
              stackId="a"
            />
            <Area
              dataKey="Contributions"
              type="monotone"
              fill="url(#fillContributions)"
              stroke="#1e90ff"
              stackId="a"
            />
            <Area
              dataKey="GrossPay"
              type="monotone"
              fill="url(#fillGrossPay)"
              stroke="violet"
              stackId="a"
            />
            <Area
              dataKey="Deductions"
              type="monotone"
              fill="url(#fillDeductions)"
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
