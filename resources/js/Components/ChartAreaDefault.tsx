import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

type ChartDatum = {
  month: string
  Employees: number
}

type Props = {
  data: ChartDatum[]
  percentChange: number
}

export function ChartAreaDefault({ data, percentChange }: Props) {
  const latestEmployeeCount = data.length ? data[data.length - 1].Employees : 0;
  const isUp = percentChange >= 0
  const trendText = isUp
    ? `Employee's up by ${percentChange}%`
    : `Down ${Math.abs(percentChange)}%`

  return (
    <Card className="bg-[#16423C] border-button-border-color max-w-xs w-full h-[280px]">
      <CardHeader>
        <CardTitle className="text-white">Area Chart</CardTitle>
        <CardDescription className=" flex text-white text-[12px] gap-2">
          {trendText}  
          {isUp ? 
          <TrendingUp className="h-4 w-4 text-green-500" /> 
          : 
          <TrendingDown className="h-4 w-4 text-red-500" />}
          <p>{latestEmployeeCount}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={130} >
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => String(v).slice(0, 3)}
              stroke="white"
            />
            <Tooltip />
            <Area
              dataKey="Employees"
              type="monotone"
              fill="oklch(87.1%.15 154.449"
              fillOpacity={0.4}
              stroke="green"
              
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm ">
          <div className="grid gap-2">
            <div className="text-muted-foreground text-white">
              January – {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
