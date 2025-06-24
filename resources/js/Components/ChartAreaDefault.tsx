"use client"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { TrendingUp } from "lucide-react"

type ChartDatum = {
  month: string
  Users: number
}

type Props = {
  data: ChartDatum[]
  percentChange: number
}

export function ChartAreaDefault({ data, percentChange }: Props) {
  const isUp = percentChange >= 0
  const trendText = isUp
    ? `Employee's up by ${percentChange}%`
    : `Down ${Math.abs(percentChange)}%`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => String(v).slice(0, 3)}
            />
            <Tooltip />
            <Area
              dataKey="Users"
              type="monotone"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {trendText} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              January – {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
