// BarChart.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

type DepartmentsGross = {
  department: string;
  total_gross: number;
}[];

type Props = {
  departmentsGross: DepartmentsGross;
};

export default function BarChart({ departmentsGross }: Props) {
    if (!departmentsGross || departmentsGross.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-white text-lg">
        No data available
      </div>
    );
  }
  const option = {
    dataset: [
      {
        dimensions: ['department', 'total_gross'],
        source: departmentsGross,
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'total_gross', order: 'desc' },
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: 'black',
      },
      formatter: (params: any) => {
        const data = params.data;
        return `
          <strong>${data.department}</strong><br/>
          Total Gross: ₱${new Intl.NumberFormat('en-PH').format(data.total_gross)}
        `;
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30, color: '#fff' }, // white text on x-axis
    },
    yAxis: {
      axisLabel: {
        color: '#fff', // white text on y-axis
        formatter: (value: number) => {
          if (value >= 1_000_000) return `${value / 1_000_000}M`;
          if (value >= 100_000) return `${value / 1_000}k`;
          return value;
        },
      },
    },
    series: {
    type: 'bar',
    encode: { x: 'department', y: 'total_gross' },
    datasetIndex: 1,
    itemStyle: {
        color: 'rgba(30, 144, 255, 0.4)', // Blue with 40% opacity
        borderColor: 'rgba(30, 144, 255, 1)',               // Red border
        borderWidth: 1,                   // Thickness of border
    },
    },

  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
