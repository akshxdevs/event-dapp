import { Footer } from "./Footer"

export const Events = () => {
    return <div className="px-48 py-16">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl">Events</h1>
            </div>
            <div className="max-w-50 w-full flex items-center justify-between text-sm">
                <button className="relative w-[50%] left-3 border border-gray-900 rounded-xl p-2 bg-zinc-800 focus:bg-zinc-600 transition-all duration-300 ease-in-out focus:scale-105">Upcoming</button>
                <button className="w-[50%] border-y border-r border-gray-900 rounded-xl p-2 bg-zinc-800 focus:bg-zinc-600 transition-all duration-300 ease-in-out focus:scale-105">Past</button>
            </div>
        </div>
        <div className="my-5">
            <div className="flex justify-center items-center h-200">
                <h1>No Events</h1>
            </div>
        </div>
        <Footer/>        
    </div>
}