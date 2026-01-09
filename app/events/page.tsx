"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsKeyboard, BsPeople } from "react-icons/bs";
import { MdEvent } from "react-icons/md";

export default function () {
    const [events,setEvent] = useState<any[]>([]);
    async function getAllEvents(){
        const res = await axios.get(`${BACKEND_URL}/all`);
        if (res.data) {
            console.log(res.data);
            setEvent(res.data.events)
        }
    }
    useEffect(()=>{
        getAllEvents()
    },[])
    return (
    <div className="h-screen bg-[#131517]">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex justify-between items-center gap-4 border-b pb-10 border-zinc-800">
          <div className="flex flex-col">
            <div>
              <h1 className="text-2xl">Events</h1>
              <div className="flex justify-between gap-8 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <MdEvent />
                  {"2K"}
                  <p>Events</p>
                </div>
                <div className="flex items-center gap-2">
                  <BsPeople />
                  {"17K"}
                  <p>Subscribers</p>
                </div>
              </div>
            </div>
            <div className="w-96 py-5">
              <h3>
                Join a hackathon, jam on product design, and meet fellow
                tinkerers in the industry of tomorrow.
              </h3>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <input
                type="text"
                placeholder="me@gmail.com"
                className="w-full border rounded-3xl px-2 py-1"
              />
              <button className="bg-white text-black py-1 px-4 rounded-3xl">
                subscribe
              </button>
            </div>
          </div>
          <div>
            <img src="../../public/pic1.png" alt="img" className="h-72 w-72" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-72">
        <div className="flex justify-between items-center gap-10">
            <div className="max-w-[70%] w-full">
                <div className="flex justify-between items-center">
                    <div>
                        <h1>All Events</h1>
                    </div>
                    <div>
                        <button><BiSearch/></button>
                    </div>
                </div>
                <div className="mt-5 p-5 bg-zinc-800 rounded-lg border border-transparent hover:border-zinc-400 transition-colors duration-300 ease-out">
                    {events.length > 0 ? (
                        <p>No Events</p>
                    ):(
                        <div>
                            {events.map((event)=>(
                                <div key={event.id}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <p>{event.createdAt}</p>
                                            <h1>{event.eventName}</h1>
                                            <h2>{event.eventHostedBy}</h2>
                                            <h3>{event.eventLocation}</h3>
                                            <div className="flex gap-4">
                                              <p>{event.eventStatus === "Closed" ? <p>sold</p> : ""}</p>
                                              <p>{event.userEnrolled}</p>
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="max-w-[30%] w-full flex flex-col gap-2">
                <button><BsKeyboard/></button>
                <h3>Tech</h3>
                <p>Subscribe to stay up-to-date with the latest events, calendars and other updates.</p>
                <div className="flex flex-col gap-4 pt-2">
                    <input
                        type="text"
                        placeholder="me@gmail.com"
                        className="w-full border rounded-3xl px-2 py-1"
                    />
                    <button className="bg-white text-black py-1 px-4 rounded-3xl">
                        subscribe
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
