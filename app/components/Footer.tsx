"use client";
import { useRouter } from "next/navigation";
import { BsArrowUpRight, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaAppStore } from "react-icons/fa";
import { MdEmail, MdEvent } from "react-icons/md"

export const Footer = () => {
  const router = useRouter();

  return (
    <footer className="fixed bottom-0 left-0 px-2 md:px-32 w-full border-t border-zinc-800">
      <div className="flex justify-between items-center text-sm mt-5">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/login")}>
            <MdEvent size={25} />
          </button>
          <button>Discover</button>
          <button>Pricing</button>
          <button>Help</button>
        </div>
        <div className="flex items-center gap-4">
          <MdEmail />
          <FaAppStore />
          <BsTwitter />
          <BsInstagram />
        </div>
      </div>
      <div className="flex md:justify-center items-center gap-1 my-2">
        <h1 className=""></h1>
        <h1 className="bg-linear-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent">
          Host your event here
        </h1>
        <BsArrowUpRight className="text-yellow-700" size={11}/>
      </div>
    </footer>
  );
};
