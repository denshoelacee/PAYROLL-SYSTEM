"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartConfig = {
  [key: string]: {
    label: string
    color?: string
  }
}

export function ChartContainer({
  config,
  className,
  children,
}: {
  config?: ChartConfig
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      data-chart
      data-config={JSON.stringify(config)}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {children}
    </div>
  )
}

export function ChartLegend({
  content,
}: {
  content: React.ReactNode | ((props: any) => React.ReactNode)
}) {
  return content
}

export function ChartLegendContent({
  payload = [],
}: {
  payload?: any[]
}) {
  if (!payload.length) return null

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground text-white">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export function ChartTooltip({
  cursor,
  content,
}: {
  cursor?: boolean | object
  content?: React.ReactNode | ((props: any) => React.ReactNode)
}) {
  return <>{content && React.cloneElement(content as any)}</>
}

export function ChartTooltipContent({
  label,
  payload = [],
  labelFormatter,
  indicator = "square",
}: {
  label?: string | number
  payload?: any[]
  labelFormatter?: (label: string | number) => string
  indicator?: "dot" | "square"
}) {
  if (!payload.length) return null

  return (
    <div className="rounded-md border bg-background p-2 shadow-sm">
      <div className="mb-2 text-[0.7rem] font-medium text-muted-foreground">
        {labelFormatter ? labelFormatter(label ?? "") : label}
      </div>
      <div className="grid gap-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2",
                  indicator === "dot" ? "rounded-full" : "rounded-sm"
                )}
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">{entry.name}</span>
            </div>
            <span className="text-xs font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

