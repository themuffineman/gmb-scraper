"use client"
import Image from "next/image";
import Lead from "./components/lead";
import { useState } from "react";


export default function Home() {
  interface Leads{
    name: string,
    emails: string[]
    url: string
  }
  interface Message{
    type: "status" | "lead",
    data: string | Leads
  }
  const [status, setStatus] = useState<boolean>(false)
  const [statusUpdate, setStatusUpdate] = useState<string>('Loading...')
  const [leadsData, setLeadsData] = useState<Leads[]>([])
  const [pageCount, setPagesCount] = useState<number>(0)
  const [service, setService] = useState<string | undefined>()
  const [location, setLocation] = useState<string | undefined>()
  const [loadMore, setLoadMore]= useState<boolean>(false)

  async function fetchLeads(){
    try {
      setStatus(true)
      const socket = new WebSocket('https://gmb-scraper-server.onrender.com');  

      socket.addEventListener('open', () => {
        setStatusUpdate('Connection to scraper established');
      });

      socket.addEventListener('error', (error) => {
        console.error('Connection error:', error);
        setStatusUpdate(`Failed to connect to Scraper`);
        setTimeout(()=>{
          setStatus(false)
          setLoadMore(true)
        },3000)
        socket.close()
      });

      socket.addEventListener('close', ()=>{
        setStatusUpdate('Conncetion to scraper closed')
        setStatus(false)
      })

      socket.addEventListener('message', event => {
        try {
          const message = JSON.parse(event.data);
          handleMessage(message);
      } catch (err) {
          console.error('Error parsing WebSocket message:', err);
      }
      });

      await fetch(`https://gmb-scraper-server.onrender.com/scrape?service=${service}&location=${location}&pageNumber=${pageCount}`)
      setStatus(false)
      setLoadMore(true)
    }catch (error) {
      console.error(error)
    }
  }
  function handleMessage(message: Message){
    if(message.type === 'status'){
      setStatusUpdate(message.data as string)
    }else if (message.type === 'lead'){
      setLeadsData((prev) => [...(prev || []), message.data as Leads]);
    }else{
      setStatusUpdate('Error parsing message')
    }
  }

  function cancelRequest(){
    fetch('https://gmb-scraper-server.onrender.com/cancel-process')
  }

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center p-40 pt-5 bg-grid-neutral-100/[0.1] bg-black text-white">
      <h1 className="text-3xl sm:text-7xl tracking-tighter font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-8">
        Leads Scraper
      </h1>
      <section className="flex gap-2">
        <form className="w-max h-max flex gap-2" onSubmit={ (e)=> {
          e.preventDefault()
          setPagesCount(0)
          fetchLeads()
        }}>
          <div className="flex gap-5">
            <input required={true} type="text" className="w-72 h-10 utline-none focus:outline-none rounded-md p-2 bg-neutral-200 text-black" placeholder="Enter Business Type e.g Roofers" value={service} onChange={(e)=> setService(e.target.value) }/>
            <input required={true} type="text"  className="w-72 h-10 utline-none focus:outline-none rounded-md p-2 bg-neutral-200 text-black" placeholder="Enter Location"  value={location} onChange={(e)=> setLocation(e.target.value) }/>
          </div> 
          <div>
            <button className={`bg-neutral-950 hover:ring-1 flex items-center justify-center hover:ring-neutral-900   text-center p-4 px-5 text-white w-max rounded-md h-10 hover:scale-[1px] transition`} type="submit" >Search</button>
          </div>
        </form>
      </section> 
      <section className="grid grid-flow-row gap-4 grid-cols-1 mt-5">
        {leadsData?.map((lead)=>(
          <Lead key={lead.name} name={lead.name} emails={lead.emails} website={lead.url} phone="######"/>
        ))}
        <button className={` ${loadMore? "flex" : "hidden"} rounded-md p-3 bg-neutral-950 ring-1 ring-neutral-900 hover:scale-[1px] transition hover:bg-neutral-900 hover:scale text-white`} onClick={()=>{
          setPagesCount((prev)=> prev+1)
          fetchLeads()
        }}>Load More</button>
      </section>
      <section className={` ${status? 'flex' : 'hidden'} gap-5 items-center rounded-md bg-neutral-950 p-4 ring-1 ring-neutral-900 fixed bottom-3 left-1/2 -translate-x-1/2`}>
        <div className="size-5 rounded-full border-2 border-neutral-700 border-t-neutral-400 animate-spin"/>
        <p className="text-white flex items-center justify-center">
          {statusUpdate}
        </p>
        <button onClick={ ()=> cancelRequest() } className=" rounded-md p-3 bg-neutral-950 ring-1 ring-neutral-900 hover:scale-[1px] transition hover:bg-red-600 text-white ">Cancel</button>
      </section>
    </main>
  );
}
