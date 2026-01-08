"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BiCalendarHeart, BiSearch, BiSolidBell, BiUserCircle } from 'react-icons/bi'
import { BsArrow90DegRight} from 'react-icons/bs';
import { LuTicket } from 'react-icons/lu';
import { MdEvent, MdExplore } from 'react-icons/md';

export const AppBar = () => {
    const session = true;
    const router = useRouter();
    function formatTimeWithGMT(date = new Date()) {
        const hours = date.getHours(); 
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const offsetMinutes = -date.getTimezoneOffset();
        const sign = offsetMinutes >= 0 ? "+" : "-";
        const absOffset = Math.abs(offsetMinutes);
        const offsetHours = Math.floor(absOffset / 60);
        const offsetMins = absOffset % 60;

        return `${hours}:${minutes} GMT${sign}${offsetHours}:${offsetMins
            .toString()
            .padStart(2, "0")}`;
    }

    return <div className='py-2 px-1 md:px-5'>
        <div className="flex justify-between text-md">
            <div className='max-w-[10%] w-full flex items-center'>
                <button onClick={()=>router.push("/login")}>
                    <MdEvent size={30}/>
                </button>
            </div>
            {session &&(
            <div className='max-w-[45%] w-full flex items-center gap-1 md:gap-10'>
                <button onClick={()=>router.push("/events")} className='flex items-center gap-1 cursor-pointer'>
                    <LuTicket size={20} />
                    <h3 className='hidden md:block'>Events</h3>
                </button>
                <button onClick={()=>router.push("/calender")} className='flex items-center gap-1 cursor-pointer'>
                    <BiCalendarHeart size={20}/>
                    <h3  className='hidden md:block text-white/50'>Calenders</h3>
                </button>
                <button onClick={()=>router.push("/discover")} className='flex items-center gap-1 cursor-pointer'>
                    <MdExplore size={20}/>
                    <h3 className='hidden md:block text-white/50'>Discover</h3>
                </button>
            </div>
            )}
            <div className='w-fit flex items-center gap-2 md:gap-4'>
                {session ?(
                    <div className='flex items-center gap-4'>
                        <h3 className='hidden md:block text-white/50'>{formatTimeWithGMT()}</h3>
                        <button>
                            <h3>Create Event</h3>
                        </button>
                    </div>
                ):(
                    <div className='flex items-center gap-4'>
                        <h3 className='hidden md:block text-white/50'>{formatTimeWithGMT()}</h3>
                        <button onClick={()=>router.push("/discover")} className='flex items-center gap-1 cursor-pointer'>
                            <h3>Explore Event</h3>
                            <BsArrow90DegRight className='mt-3'/>
                        </button>
                    </div>
                )}
                <div className='flex items-center gap-1 md:gap-2'>
                    {session &&(
                    <button className='text-white/50'>
                        <BiSearch size={20}/>
                    </button>
                    )}
                    {session && (
                    <button className='text-white/50'>
                        <BiSolidBell size={20}/>
                    </button>
                    )}
                    {session ? (
                        <button>
                            <BiUserCircle size={24}/>
                        </button>
                    ):(
                        <button onClick={()=>router.push("/login")} className='px-3 py-1 bg-zinc-800 rounded-full hover:bg-zinc-600'>signin</button>
                    )}
                </div>
            </div>
        </div>
    </div>
}