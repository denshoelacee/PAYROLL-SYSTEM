import React from 'react'
import {CtuLogo} from '@/Components/CtuLogo'
import { Link } from '@inertiajs/react'
import NavLink from '@/Components/NavLink'
import { FiGrid } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { BiCoinStack } from "react-icons/bi";
import { PageProps } from '@/types';
import { RiFolderSettingsLine } from "react-icons/ri"
import { TbReportSearch } from "react-icons/tb";
import { User } from '@/types';
import { PropsWithChildren, ReactNode } from 'react';

export default function Sidebar({auth }: PageProps) {
  return (
    <div className="hidden md:block">
        <div className='fixed top-0 left-2 rounded-2xl w-[5em] max-h-screen h-[93%] mx-5 my-6 bg-green-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 flex flex-col justify-between '>
            {auth.user.role === 'Admin' ? (
                <div className="p-2">
                    <Link href='/' className='flex items-center justify-center'>
                        <CtuLogo className='p-1 w-20 h-15'/>
                    </Link>

                    <div className="flex flex-col items-center  justify-center gap-5 h-[500px]">
                        <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                            <FiGrid className='text-2xl text-white'/>
                        </NavLink>
                        <NavLink href={route('admin.employee')} active={route().current('admin.employee')} className='text-[#67CFD5] text-lg'>
                            <GoPeople className='font-black text-2xl text-white'/>
                        </NavLink>
                        <NavLink href={route('admin.payroll')} active={route().current('admin.payroll')} className='text-[#67CFD5] text-lg'>
                            <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEdElEQVR4nO2be6gVRRzHP95bFlZWUNGDHkSplRKVRS9MwYgS0goKepAhZEFEYSFIcaEiTmB/FVjcKCEI7EFQGHKT8kKhlH+IZkJ4sizt9qRSb2rpiR98L8wdds+55+7s2d3jfOHH2TMzOzP7mZ3fzM7OQlRUVFTUEa+LgeeAQWAn8DuwDVgDPA6c04lKnApcA8wt0G4GPgAajv0H/OGFHQRWAKflAeIqtcRhr9AirQ4sAaYAvarnROAy4BngV6X7AbgiJIz5wP4mFbOWeA14NWfb6twNy3Txrs70/p+o8+ycvcDlIWCcAewZQ2tZS+WpaarHv8CtCfFXKu6EhLgnVUfzM6dkrcizY7x9h4Ae8tM6lfOYF25lLgTWKv5jYDkw00vXr/iXslZksI0+fQn5aJby3+RBnwC879Vhv3M3uDpJo9AB4KwslfmqDSCzE84/Gzi/DTs9IY8Vyv9eL/wGhX8I3Klj6+IzUhrneaV5JAuQrW0AmZPSd9sxG8UWePnU5R+slV0t0jmPqjEamhY0GylHABYC5FrgI/Xrsdpq4EInjx7B+C6hbhcB/8g+UR3ObXItk5Rmc1FAQuhk5b0xJd4maTucOpiPeA+4ICX9Xg0AlQXSqzuk3iLNw85kbcSpGkxXx6pLfltlIKbv1fLHkS7XhyzX8e1emksVPkAGrc0A5LYWM9xmNgzMUz6vK+wOL397Rrlbk60RIDZKvaljG65dPaXwp7MAuScDkFm6w+rjsC3OBc1T/p95+S9R+CHgZx3/pd9PvTmLOdRdSmvPPpm0ENjQpPJ/59xlbAL2pcq4zwmfqAZ7C/hG8Z8DS4FjvDxqin+XDqg/ZyCm6/QQOazlBxKG+MMJcxUEzeL+7NQaSX8HgOCMJAblft057khjEy9XRwN96iYHHZ9UGJA5wNfj9CGuvePk+ZAuzspbD9wFTE5wtg863WhPyhNyx4HMB/aNc5RxbaPnIK+WTxuJN0A/6uFvt+4I93x/dOqaLuPKustNWgDa7gzv+zRCvahHAQu7kSMASJKOT3lKLhWQyVrPzNOmpyxOlQ7IFOC3AD5kLLYmAUrpgPS1uAh7h/J2ANup/GzdtdRAXmgBxGaPIbRK+fmvGiIQRisCYbQiECoOZFtgp1p5II3AVnkgKwNNzAa6BUgtUPld40NqgcqPQLoVyCttvvdNs9XdAqQRRxlG2Y423/um2VC3AKkFKr9rfEgtUPkRiKcIpKpA+loA2RRou2a9KitmU7XRrRND7kAV1lTRu9bZOW/1nunsZC49kCIVgVQNyFHAYuCNQCtlrWy76jXohK3SftWpRQOZoC2ajZLYcOgvJNoFcn0JIPhm2zcLA/JACQD4tqVIIItKAMA32xCYqze/pUmaxSUAkDRTzkXLVID9punlEgDwzb7by0UztMtvKOWLpWny6o2SmXXj3LTSeRs3V3tIe7W9encJLt63zQnf7AXVJG+ecUCfbTRKaNZo59EB9WiTrO2P/0nf0ZbFfgG+AJ5Q40VFRUVF0SH9DxhHHSakLcUoAAAAAElFTkSuQmCC" alt="external-Payroll-budget-smashingstocks-mixed-smashing-stocks" // your full base64 here
                            style={{ filter: 'invert(1) brightness(2)' }}
                            className="w-6 h-6"
                            />
                        </NavLink>
                        <NavLink href={route('admin.payroll.summary')} active={route().current('admin.payroll.summary')} className='text-[#67CFD5] text-lg'>
                            <img 
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ceagVdRTHxy2xQn3tlq1aEGTweiYuZdlCKlFJGVZUGFEuBOlrF1tosYUCW15FWUhqZBvVH21WSIVWUlEQSRupyCPNbIGyl33ivHsGTj/mN829d+bemel+4Qfvnvnd38z5vJnfcs5vbhC0lEzAQOB04B5gGbCyQOVpYDFwATAkDRjnAxsph34GrgP61QrjbsqpV4BdqoUxl3Lr0Wpg7K23V9k1PimQa/l/aFlSIG/FNLIN6AQuBNbF1PsDeA94M4PyDrA9BSBbkgL5KqaRc029PYBfPPXGBRkKGAZsTQHK7klO1h3TwEin7mcRdX7NEoY59+oUgAyrF8hCU68d+NNT7xpg14xA9AfOjDl3Q4GIXgeekjuB4isVIGVSC4ijFhBHLSD1ALkKuKykZXstQPYNSipgcwuIUQuIoxaQIgAB+gEnALcAT2gM9AFgnrtmKjUQYAAwx1yUTxI+mFBqIFSW7WupTotrDgznGQiwP/C9x2lZud4fA2U50Kc0QKjkdj6McXgDMEIjcj4tKBOQeR4nJcA00f73gf2Amz1hyUMLD4TK3bElwkG5G/YBTgSe0zvkEx1xnvQAXFIGIFM9zkmasa/GZX8EjvTUcyEOKDqQ+zzOvaTH360CiGhs0YE8q+39DdwAPGxGlt7+AzgeGA585zj/m85ZXo6K/BcVyCptb7M6L5nBUD26o2CqqX8ssEaPv602ARfq8qIDWWGceVFnoK7kkRmpd9NYYCjwE7ATWAp8YeqeVXQgt0UAiAIS9iEb9HuSoYvSqKIDGedxrFvTpj0OkC4dfdz+pBdWGjPWZgPpC6yPcG6lJp3agDHAbgpF6t/qgXh7WWaq53gc3KrzEcn07QksAj6PqTtU2zsKeEjTmetqKGHW7yM9/xmNBtJHF2g+yeTsmJjjMmRPM9u80khjunos8nHMcLU7SIbRmAvqiYHRqW0cDPyu9iXAKUBHHWWC7juT+Y7o4oYBMcGhLnUyiWToPdt8XyZ2oueNbYj2Q7WU3jgLcKm2uzpoRggRGK2b33Z4QPwA3Cv9ivM9ua1Fs/SzdMz1SHZYDgYO0s+bmgIklF7MFE0eXQ1cpBOzyAiZroRFM/Xzf4Uhk+ho8VX/7i5U1J0WkJIAofIozMwgJ/t+UYEsJFuFQHyTuKSSxeOBjQAyAnhQdgynXL50gBymQ2atd9xEbaccfUhaKhUQKhO98HWQTpMDWmHsU9R+svPqyCGpA6GyTmlrUFkeAeQv0yd8oDYJSVrdpXY3vTE5CyCP03jlGsj1mnfZ1oCyIwLIx8A3WpaqTeIqXxv7HLVfYmxyvD0JkPV68IggZ2pWp/qaHpwRFKNTPQmYrqXdZAunGfsBZvfBZA0bSBmUBMgVNgVQACA2jrJWbcc5fcWdar/RsZ+WBMhgk4udHeQfSLadqlaYoUGcnUp1YJBfIDacuEZt4x3HF3mWFKcmAmK2MAgQ0SbgEbU1c8PtvxZ3ep0dpk84XG39dVdBaN9L7W3GNil8OzMRENNhfUr+1LhRxjMT7QCu1Ex+2gu2mhd3en3fmnnKC2obpWmL0D5f7bONTZJjY6oGkic1rVPNq1pAHOljI5prbHeYR2qWcbDL2CeZ+Ulok30qw01cRbQxKJKA+Xrhq1LepimvwojeCIokKpv0wnddXtW47fQ6ynm6nTyc7fpzvHmVTKYy+G0CmYTeFBRVVBZpCzRgVM8PrjyjPxQzutk+BXnXP3jaN7yxnA3mAAAAAElFTkSuQmCC" alt="external-Payroll-audit-smashingstocks-mixed-smashing-stocks"
                            className='w-6 h-6'
                            />
                        </NavLink>
                        <NavLink href={route('admin.department')} active={route().current('admin.department')} className='text-[#67CFD5] text-lg'>
                            <img 
                            className="w-6 h-6 "
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACyElEQVR4nO2YO2hUQRSGRyFoCoOKpEkEDYrgC7GKtQ/YjUK0EoyldgpCJE2QGEwaSSGIVQot1Eob4xNjoYWNWGih8VH6wMJH4gvFfDLuuXAye3fu5u7u3VnZHy67zP3/c+bMzD1zZoxp4j8FsAZ4AcwAk0CPaSQA/RRj2DTYDEzFBJE3gXe63/6qtg5gQgVw14QKCmveYsppX6kC+GJCBTCtOtrZiAFMqo7aZdMpz/W6LSFgG3BT0qGLH8CI4vaQjJzij4oNF3YmbwDdlXZ+H/AroUMzjmbYwz2peAtKDIqG9b03beeXAZ8SHMyZAaXN26UiIzkt/3MxvJESM6DxEViaJoCDysgT/VHWGhS+m6fK/4E0RgaVgaJRrjUozE6EwTQGhpSBoTL4uyULffUsh7LrIubpvyIDwCnmD29dlFkAMvJpkQ8hgHvO5tWR8HHa/J64qZFhALHlg4dfVllBhgG8V7y+MuxuVfwPIQQwrnizUnb0ARuAthh+TvHHQwigHXiGvxw4q/gLgePAad8Om3UaXQFcBP6UCOI30FIr/1UzAKwDTkhmegf8lFpnLAv/1TVQIahCAAPKwEBNellL/0AX8EqeLpMxqLP/MACsAjYCSxpKD/QCL9UatNnkArA8eD2wX3bUODwGFgerB1okf0ewZ+LnjsEjoeqNrLcIb6KtXrb+CFc8elv/RHibtd4AuxTxlmrvVu0PPfqdinc7a70BViviNzFoDyGXVPv5hKwR4XvW+n8AHuHHHhOw3gCbnEOKxjmvOAC9kdL4aozYXpf0Bq0H1jppLA5jQeqBVuC1Is7KSeu+PXw7Rg6HpjfAMUX4DOxQ79qAy+q9HaXWkPQGeKAIh2ICXOSM0PaQ9EausaOpay+aogLnjDJwNCS9Aa7JiztxYuFskYssW6Osd95N1FNvpJDanHR7IFM5d/0FoG+iCZMOfwHdI6EQg62yLQAAAABJRU5ErkJggg==" alt="organization-chart-people"
                            />
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className="p-2 ">
                <Link href='/' className='flex items-center justify-center'>
                    <CtuLogo className='p-1 w-20 h-15'/>
                </Link>
                
                <div className="flex flex-col items-center  justify-center gap-5 h-[500px]">
                        <NavLink href={route('employee.dashboard')} active={route().current('employee.dashboard')}>
                            <FiGrid className='text-2xl text-white'/>
                        </NavLink>
                        <NavLink href={route('employee.payslip.summary')} active={route().current('employee.payslip.summary')} className='text-[#67CFD5] text-lg'>
                            <BiCoinStack className='font-black text-2xl text-white'/>
                        </NavLink>
                </div>
            </div>
            )}
            
        </div>
    </div>
  )
}
