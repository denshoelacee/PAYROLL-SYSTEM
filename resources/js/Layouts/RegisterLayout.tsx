import { Link,usePage} from '@inertiajs/react';
import { PropsWithChildren,useState,useEffect} from 'react';
import {CtuLogo} from '@/Components/CtuLogo';
import { InfoMessage } from '@/Components/Alert';

export default function LoginLayout({ children }: PropsWithChildren) {
    const {message}:any = usePage().props;
        
            const [dismissed, setDismissed] = useState(true);
        
            useEffect(()=>{
                setDismissed(true);
            },[message])
        
            const hasMessages = message?.information || message?.error || message?.success
    return (

        <>
        {hasMessages && dismissed &&
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
                    {message.information && (
                        <InfoMessage title="Your Account is Almost Ready!" severity="info" info={message.information} onClose={() => {
                            setDismissed(false)
                        }}/>
                    )}
                    {message.error && (
                        <InfoMessage title="Error mani bords"  severity="error" info={message.error} onClose={() => {
                            setDismissed(false)
                        }}/>
                    )}
                    {message.success && (
                        <InfoMessage title="Sumakses!"  severity="success" info={message.success} onClose={() => {
                            setDismissed(false)
                        }}/>
                    )}
                </div>
            }
            <div className="h-screen flex justify-center  bg-mainColor">
            <div className='px-5 w-full my-auto lg:my-5 sm:flex justify-evenly items-center '>
                <div className="hidden sm:hidden md:hidden lg:flex">
                    <Link href="/">
                        <CtuLogo className='w-[25em] h-[25em]'/>
                        <p className='text-center text-5xl text-white pt-6 tracking-widest font-black'>CTU Payroll</p>
                    </Link>
                </div>

                <div style={{
                background: `linear-gradient(
                105.8deg,
                rgba(200, 237, 217, 0.22) 3.42%,
                rgba(177, 198, 186, 0.0484) 101.99%,
                rgba(115, 210, 159, 0) 134.85%
                )`, }}
                className="w-full h-auto sm:px-8 sm:w-[70%]  md:px-10 md:w-[70%] lg:max-w-md lg:px-8 lg:py-10 mt-6 px-6 py-10 rounded-4xl border-2 border-emerald-200 shadow-md
                rounded-custom-radius">
                    {children}
                </div>
            </div>
            
        </div>
        </>
        
    );
}
