import { BsPeople } from "react-icons/bs";
import { MdEvent } from "react-icons/md";

export default function() {
    return (
        <div className="h-screen bg-[#131517]">
            <div className="flex justify-center items-center min-h-[80vh] ">
                <div className="flex justify-between items-center gap-4 border-b pb-10 border-zinc-800">
                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-2xl">Events</h1>
                            <div className="flex justify-between gap-8 py-4 border-b border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <MdEvent/>
                                    {"2K"}
                                    <p>Events</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BsPeople/>
                                    {"17K"}
                                    <p>Subscribers</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-96 py-5">
                            <h3>Join a hackathon, jam on product design, and meet fellow tinkerers in the industry of tomorrow.</h3>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            <input type="text" placeholder="me@gmail.com" className="w-full border rounded-3xl px-2 py-1"/>
                            <button className="bg-white text-black py-1 px-4 rounded-3xl">subscribe</button>
                        </div>
                    </div>
                    <div>
                        <img src="./public/pic1.png" alt="img" className="h-72 w-72" />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}