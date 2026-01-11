"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsKeyboard, BsPeople } from "react-icons/bs";
import { MdEvent } from "react-icons/md";
import { BACKEND_URL } from "../config";
import { AppBar } from "../components/AppBar";
import { Footer } from "../components/Footer";

export default function () {
  const [events, setEvent] = useState<any[]>([]);
  async function getAllEvents() {
    const res = await axios.get(`${BACKEND_URL}/all`);
    if (res.data && res.data.events) {
      console.log(res.data);
      setEvent(res.data.events || [])
    }
  }

  useEffect(() => {
    getAllEvents()
  }, []);

  return (
    <div className="h-screen bg-[#131517]">
      <AppBar />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center gap-4 border-b pb-5 border-zinc-800">
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
            <img src="./pic1.png" alt="img" />
          </div>
        </div>
        <div className="flex justify-between items-center gap-10 py-10">
          <div className="max-w-[70%] w-full">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">All Events</h1>
              </div>
              <div>
                <button><BiSearch size={25} /></button>
              </div>
            </div>
            <div className="mt-5 p-5 bg-zinc-800 rounded-lg border border-transparent hover:border-zinc-400 transition-colors duration-300 ease-out">
              {events.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex justify-between items-center gap-4">

                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-zinc-400">
                          {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : event.CreatedAt ? new Date(event.CreatedAt).toLocaleDateString() : 'N/A'}
                        </p>

                        <h1 className="font-semibold">{event.eventName}</h1>
                        <h2 className="text-zinc-300">{event.eventHostedBy}</h2>

                        {event.eventLocation && Array.isArray(event.eventLocation) && event.eventLocation.length > 0 && (
                          <h3 className="text-zinc-400">
                            Location: {event.eventLocation[0].lat}, {event.eventLocation[0].long}
                          </h3>
                        )}

                        <div className="flex gap-4 text-sm">
                          {event.eventStatus === "Closed" && (
                            <span className="text-red-400">Sold Out</span>
                          )}
                          {event.eventStatus === "Active" && (
                            <span className="text-green-400">Active</span>
                          )}
                          {event.eventStatus === "Open" && (
                            <span className="text-blue-400">Open</span>
                          )}
                          <span>{event.userEnrolled?.length ?? 0} enrolled</span>

                        </div>
                      </div>
                      <div>
                        <img src={event.eventImg} alt="" className="h-32 w-62 rounded-lg " />
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400">No Events</p>
              )}
            </div>
          </div>
          <div className="max-w-[30%] w-full flex flex-col gap-2">
            <button><BsKeyboard size={45} className="bg-yellow-500 p-1 rounded-full" /></button>
            <h3>Events</h3>
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
      <Footer/>
    </div>
  );
}
