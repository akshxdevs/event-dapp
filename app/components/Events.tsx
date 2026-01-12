"use client"

import { useState } from "react"
import { Footer } from "./Footer"

export const Events = () => {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

    return <div className="px-75 mt-16">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl">Events</h1>
            </div>
            <div className="w-52 relative inline-flex items-center bg-zinc-900 rounded-xl p-1">
                <div
                    className={`absolute h-8 rounded-lg bg-zinc-800 transition-transform duration-500 ease-in-out ${
                        activeTab === "upcoming" ? "translate-x-0" : "translate-x-full"
                    }`}
                    style={{ 
                        width: '101px',
                        left: '0.2rem'
                    }}
                />
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`relative z-10 flex-1 px-5 py-1 text-sm font-medium rounded-lg transition-colors duration-300 ease-in-out ${
                        activeTab === "upcoming" ? "text-white" : "text-gray-400 hover:text-gray-300"}`}>
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab("past")}
                    className={`relative z-10 flex-1 px-5 py-1 text-sm font-medium rounded-lg transition-colors duration-300 ease-in-out ${
                        activeTab === "past" ? "text-white" : "text-gray-400 hover:text-gray-300"}`}>
                    Past
                </button>
            </div>
        </div>
        <div className="border-b border-zinc-800">
            <div className="flex justify-center items-center min-h-[60vh]">
                <h1 className="text-gray-400">No Events</h1>
            </div>
        </div>
        <Footer/>        
    </div>
}