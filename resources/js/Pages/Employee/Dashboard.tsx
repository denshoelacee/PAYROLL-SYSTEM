import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types'
import Sidebar from '@/Components/Sidebar'
import AdminLayout from '@/Layouts/AdminLayout'
import { ChartAreaInteractive } from '@/Components/ChatLineInteractive';
import CardWrapper from '@/Components/CardWrapper';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { TbTax } from 'react-icons/tb';

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

type taxesandloans = {
  tax:number
  due_tax:number
  loan: number
}
type totalContribution ={
  total_contributions:number
}
export default function Dashboard({ auth}: PageProps) {
  const { yearReports, availableYears, selectedYear, contributions, taxAndLoans } =
      usePage<PageProps<{
        yearReports: ChartDatum[]
        availableYears: number[]
        selectedYear: string
        taxAndLoans: taxesandloans
        contributions: totalContribution
      }>>().props

    console.log("🚀 ~ file: Dashboard.tsx:35 ~ Dashboard ~ contributions:", taxAndLoans)
  const sampleData: DataPoint[] = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1
    const found = yearReports.find((item) => item.month === month)

    return {
      date: `${selectedYear}-${String(month).padStart(2, '0')}-01`,
      NetPay: found ? found?.net_pay : 0,
      GrossPay: found ? found?.total_gross : 0,
      Deductions: found ? found?.total_deduction : 0,
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
    
       <Sidebar auth={auth}/> 
             <div className="font-Inter">
      <AdminLayout  title="Dashboard">
        <Head title = "Dashboard" />
        <div className="space-y-4 pb-10">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <CardWrapper
              fontsize='text-sm'
              label={"Total Contribution this month"}
              data={formatCurrency(contributions?.total_contributions)}
              icon={
                <div className='rounded-full border-white bg-amber-200 border h-14 w-14 place-items-center justify-center flex'>
                  <TbTax className='text-4xl text-yellow-400' />
                </div>
              }
              className='w-full h-40 p-5'
            />

            <CardWrapper
              fontsize='text-sm'
              label={"Total Tax This Month"}
              data={formatCurrency(taxAndLoans?.tax)}
              icon={
                <div className='rounded-full border-white bg-amber-200 border h-14 w-14 place-items-center justify-center flex'>
                  <TbTax className='text-4xl text-yellow-400' />
                </div>
              }
              className='w-full h-40 p-5'
            />
          
            <CardWrapper
              fontsize='text-sm'
              label={"Total Due Tax This Month"}
              data={formatCurrency(taxAndLoans?.due_tax)}
              icon={
                <div className='rounded-full border-white bg-rose-400 border h-14 w-14 place-items-center justify-center flex'>
                  <TbTax className='text-4xl text-white' />
                </div>
              }
              className='w-full h-40 p-5'
            />
          
            <CardWrapper
              fontsize='text-sm'
              label={"Total Loans This Month"}
              data={formatCurrency(taxAndLoans?.loan)}
              icon={
                <div className='rounded-full border-white bg-emerald-800 border h-14 w-14 place-items-center justify-center flex'>
                  <HiOutlineBanknotes className='text-5xl text-white' />
                </div>
              }
              className='w-full h-40 p-5'
            />
          </div>

          <div className="flex w-full overflow-x-auto">
            <div className="w-full min-w-[1230px] max-w-[122rem]"> {/* adjust width as needed */}
              <ChartAreaInteractive
                data={sampleData}
                selectedYear={selectedYear}
                availableYears={availableYears}
              />
            </div>
          </div>
        </div>
        
     </AdminLayout>
     </div>
    </>
  )
}

