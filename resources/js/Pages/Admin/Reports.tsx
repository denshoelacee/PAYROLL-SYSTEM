import React from 'react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Sidebar from '@/Components/Sidebar'
import AdminLayout from '@/Layouts/AdminLayout'
import ReportsPartial from './partial/Reports'

type MonthlySummaryRow = {
    month: number;
    month_name: string;
    total_gross: number;
    total_deduction: number;
    net_pay: number;
};
type Props = PageProps<{
    selectedYear : string
    monthlySummary: MonthlySummaryRow[]
    availableYears: number[]
}>
export default function Reports({auth,selectedYear,monthlySummary,availableYears} :Props) {

  return (
    <>
        <AuthenticatedLayout user={auth.user}>
            <Head title="Reports" />
            <Sidebar auth={auth} />
            <AdminLayout title="Reports">
                   <ReportsPartial 
                   selectedYear={selectedYear} 
                   monthlySummary={monthlySummary}
                   availableYears={availableYears}/>
            </AdminLayout>
        </AuthenticatedLayout>
    </>
  )
}

