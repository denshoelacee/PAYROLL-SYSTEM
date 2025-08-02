import React from 'react';
import ReactECharts from 'echarts-for-react';
type ContributionBreakdown = {
    gsis:number
    pagibig:number
    philhealth:number
}

type Props = {
    contributionBreakdown: ContributionBreakdown
}
export default function PieChart({contributionBreakdown}:Props) {
  
    const data = [
        {name:'GSIS',        value: contributionBreakdown.gsis},
        {name:'Philhealth',  value: contributionBreakdown.philhealth},
        {name:'Pag-IBIG',    value: contributionBreakdown.pagibig}
    ];

  const option = {
    title: {
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      padding: 10,
      itemGap: 10,
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data,
        label: {
          color: 'white', // ensures the label text is white
        },
        itemStyle: {
          opacity: 0.5, // low fill opacity
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.9)', // white outline
        },
        emphasis: {
          label: {
            color: 'white', // also make label white on hover
          },
          itemStyle: {
            opacity: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
