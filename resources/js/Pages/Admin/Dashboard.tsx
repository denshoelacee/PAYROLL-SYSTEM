import { Head, usePage } from '@inertiajs/react'
import Sidebar from '@/Components/Sidebar'
import AdminLayout from '@/Layouts/AdminLayout'
import { ChartAreaInteractive } from '@/Components/ChatLineInteractive';
import { PageProps } from '@/types'

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

export default function Dashboard({ auth }: PageProps) {
  const {
    yearlyReports,
    availableYears,
    selectedYear,
  } = usePage<PageProps<{
    yearlyReports: ChartDatum[]
    availableYears: number[]
    selectedYear: string
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

  return (
    <>
      <Head title="Dashboard" />
      <div className="">
        <Sidebar auth={auth} />
        <AdminLayout title="Dashboard">
          <div className="space-y-5">
            <div className="flex w-full gap-4 flex-wrap">
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
