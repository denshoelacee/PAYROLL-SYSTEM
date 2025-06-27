import logo from '../../../images/asdd.png';
import { FaArrowLeft } from "react-icons/fa6";

export default function Error404() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen dark:bg-gray-50 dark:text-gray-800">
            <div className="w-full md:w-1/2 text-center flex flex-col items-center justify-center p-6">
                <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400 text-yellow-500">
                    <span className="sr-only">Error</span>404
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">
                    Sorry, we couldn't find this page.
                </p>
                <p className="mt-4 mb-8 dark:text-gray-600">
                    But don’t worry, you can find plenty of other things on our homepage.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="py-3 px-6 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
                >
                   <div className=' flex items-center text-yellow-500'> 
                    <FaArrowLeft className='mx-1'/>
                    <h5 className='text-xl md:text-lg'>Go back</h5>
                   </div>
                </button>
            </div>

            <div className="hidden md:flex w-1/2 h-full">
                <img src={logo} className="w-full h-full object-cover" />
            </div>
        </div>
    );
}
