import Image from "next/image";
import Lead from "./components/lead";

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center p-40 pt-5 bg-grid-white/[0.1] bg-black text-white">
      <h1 className="text-3xl sm:text-7xl tracking-tighter font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-8">
        Leads Scraper
      </h1>
      <section className="flex gap-2">
        <div className="flex gap-5">
          <input type="text" className="w-72 h-10 utline-none focus:outline-none rounded-md p-2 bg-neutral-200 text-black" placeholder="Enter Business Type e.g Roofers"/>
          <input type="text"  className="w-72 h-10 utline-none focus:outline-none rounded-md p-2 bg-neutral-200 text-black" placeholder="Enter Location"  />
        </div> 
        <div>
          <button className="bg-neutral-950 hover:ring-1 flex items-center justify-center hover:ring-neutral-900   text-center p-4 px-5 text-white w-max rounded-md h-10 hover:scale-[1px] transition ">Search</button>
        </div>
      </section> 
      <section className="grid grid-flow-row gap-4 grid-cols-1 mt-5">
        <Lead name="BuzCorp" emails={['hello','hi','bye']} phone="12345" website="http://localhost:3000"/>
        <Lead name="BuzCorp" emails={['hello','hi','bye']} phone="12345" website="http://localhost:3000"/>
      </section>
    </main>
  );
}
