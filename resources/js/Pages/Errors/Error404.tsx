import {CtuLogo} from '@/Components/CtuLogo'
export default function Error404() {
    return (
        <div className="flex items-center h-full dark:bg-gray-50 dark:text-gray-800">
            <div className="flex items-center justify-between  ">
                <div className="w-full text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
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
                       className=" py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
                    >
                        Go back
                    </button>
                </div>
                <div className="hidden md:flex w-full h-full">
                    <CtuLogo className='contain w-auto h-screen'/>
                </div>
            </div>
        </div>
    );
}