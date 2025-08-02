import { Head, usePage } from '@inertiajs/react'
import Sidebar from '@/Components/Sidebar'
import AdminLayout from '@/Layouts/AdminLayout'
import { ChartAreaInteractive } from '@/Components/ChatLineInteractive';
import { PageProps } from '@/types'
import CardWrapper from '@/Components/CardWrapper';
import { RiMoneyCnyBoxLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { TbTax } from "react-icons/tb";
import { HiOutlineBanknotes } from "react-icons/hi2";

type ChartDatum = {
  month: number
  month_name: string
  total_gross: number
  total_deduction: number
  net_pay: number
}

type DataPoint = {
  date: string
  NetPay: number
  GrossPay: number
  Deductions: number
}

type SummaryTotal = {
    total_users:number
    tax :number
    due_tax:number
    total_loan:number
}

export default function Dashboard({ auth }: PageProps) {
  const { yearlyReports, availableYears, selectedYear, summaryTotal } =
    usePage<PageProps<{
      yearlyReports: ChartDatum[]
      availableYears: number[]
      selectedYear: string
      summaryTotal: SummaryTotal
    }>>().props


  const sampleData: DataPoint[] = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1
    const found = yearlyReports.find((item) => item.month === month)

    return {
      date: `${selectedYear}-${String(month).padStart(2, '0')}-01`,
      NetPay: found ? found.net_pay : 0,
      GrossPay: found ? found.total_gross : 0,
      Deductions: found ? found.total_deduction : 0,
    }
  })

  function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(amount);
}
  return (
    <>
      <Head title="Dashboard" />
      <div className="font-Inter">
        <Sidebar auth={auth} />
        <AdminLayout title="Dashboard">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardWrapper 
                    label={"Total Employees"} 
                    data={summaryTotal.total_users}
                    icon={
                    <div className='rounded-full border-white bg-emerald-600 border h-14 w-14 place-items-center justify-center flex'>
                        <FiUsers className='text-3xl text-white' />
                    </div>
                    }
                    className='w-full h-40'
                />

                <CardWrapper 
                    fontsize='text-sm'
                    label={"Total Tax This Month"} 
                    data={formatCurrency(summaryTotal.tax)}
                    icon={
                    <div className='rounded-full border-white bg-amber-200 border h-14 w-14 place-items-center justify-center flex'>
                        <TbTax className='text-4xl text-yellow-400' />
                    </div>
                    }
                    className='w-full h-40'
                />

                <CardWrapper 
                    fontsize='text-sm'
                    label={"Total Due Tax This Month"} 
                    data={formatCurrency(summaryTotal.due_tax)}
                    icon={
                    <div className='rounded-full border-white bg-rose-400 border h-14 w-14 place-items-center justify-center flex'>
                        <TbTax className='text-4xl text-white' />
                    </div>
                    }
                    className='w-full h-40'
                />

                <CardWrapper 
                    fontsize='text-sm'
                    label={"Total Loans This Month"} 
                    data={formatCurrency(summaryTotal.total_loan)}
                    icon={
                    <div className='rounded-full border-white bg-emerald-800 border h-14 w-14 place-items-center justify-center flex'>
                        <HiOutlineBanknotes className='text-5xl text-white' />
                    </div>
                    }
                    className='w-full h-40'
                />
                </div>
            <div className="flex w-full  flex-wrap">
              <ChartAreaInteractive
                data={sampleData}
                selectedYear={selectedYear}
                availableYears={availableYears}
              />
            </div>
          </div>
        </AdminLayout>
      </div>
    </>
  )
}
