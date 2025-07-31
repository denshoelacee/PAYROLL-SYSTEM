import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import CardWrapper from '@/Components/CardWrapper';
import { TrendingUp } from "lucide-react"
import { ChartAreaDefault } from "@/Components/ChartAreaDefault"
import { usePage } from "@inertiajs/react"
import { useEffect } from 'react';
import { ChartAreaInteractive } from '@/Components/ChatLineInteractive';


type ChartDatum = {
  month: string
  Employees: number
}

 const chartDatas = [
    { date: "2025-07-01", desktop: 20, mobile: 80 },
    { date: "2025-07-02", desktop: 150, mobile: 110 },
    { date: "2025-07-03", desktop: 180, mobile: 130 },
    { date: "2025-07-04", desktop: 200, mobile: 170 },
    { date: "2025-07-05", desktop: 220, mobile: 180 },
    { date: "2025-07-06", desktop: 210, mobile: 160 },
    { date: "2025-07-07", desktop: 250, mobile: 200 },
    { date: "2025-06-30", desktop: 260, mobile: 210 },
    { date: "2025-06-29", desktop: 230, mobile: 190 },
    { date: "2025-06-28", desktop: 190, mobile: 140 },
    { date: "2025-06-27", desktop: 300, mobile: 250 },
    { date: "2025-06-26", desktop: 310, mobile: 240 },
  ];

export default function Dashboard({ auth}: PageProps) {
    const {chartData, percentChange } = usePage<PageProps<{chartData: ChartDatum[],percentChange: number}>>().props
    
    return (
          
            <>
            
            <Head title="Dashboard" />
            <div className="">
                    <Sidebar auth={auth}/>  
                <AdminLayout
                    title="Dashboard">
                    {/* <div className="mb-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color">
                        <div className="py-2 px-4 text-white space-y-1">
                            <p>Good to see you, {auth.user.last_name} </p>
                            <p className="text-sm text-gray-300">Role MotherFucker!</p>
                        </div>
                    </div>
                    */}
                    <div className="flex w-full gap-4 flex-wrap">
                        <ChartAreaDefault data={chartData} percentChange={percentChange}/>
                    </div>  
                    <div>
                        <ChartAreaInteractive data={chartDatas} />
                    </div>
                    
                </AdminLayout>
            </div>
            </>

    );
}
