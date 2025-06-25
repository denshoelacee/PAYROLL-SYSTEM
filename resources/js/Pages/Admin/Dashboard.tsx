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


type ChartDatum = {
  month: string
  Employees: number
}

export default function Dashboard({ auth}: PageProps) {
    const {dataCount,chartData, percentChange } = usePage<PageProps<{chartData: ChartDatum[],percentChange: number}>>().props
    useEffect(()=> {
        console.log(chartData);
    })
    return (
        
        <AuthenticatedLayout user={auth.user}>
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
                    
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
