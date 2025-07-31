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

const sampleData: { date: string; Loans: number; Contributions: number, Deductions: number, GrossPay:number}[] = [];

for (let year = 2015; year <= 2025; year++) {
  for (let month = 1; month <= 12; month++) {
    const date = `${year}-${month.toString().padStart(2, "0")}-01`;

    // Optional: simulate trends over time
    const trendFactor = (year - 2010) / (2025 - 2010); // 0 to 1
    const desktopBase = 5000 - trendFactor * 2000; // decrease over time
    const mobileBase = 100 + trendFactor * 300;    // increase over time
    const Deductions = 3100 + trendFactor * 300;    // increase over time
    const GrossPay = 1500 + trendFactor * 300;    // increase over time

    const Loans = Math.floor(desktopBase + Math.random() * 500); // variability
    const Contributions = Math.floor(mobileBase + Math.random() * 100);

    sampleData.push({ date, Loans, Contributions,Deductions,GrossPay });
  }
}




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
                    <div className="space-y-5">
                        <div className="flex w-full gap-4 flex-wrap">
                        <ChartAreaDefault data={chartData} percentChange={percentChange}/>
                    </div>  
                    <div className="flex w-full gap-4 flex-wrap">
                        <ChartAreaInteractive data={sampleData} />
                    </div>
                    </div>
                    
                </AdminLayout>
            </div>
            </>

    );
}
