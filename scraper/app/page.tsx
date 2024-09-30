"use client"
import Image from "next/image";
import Lead from "./components/lead";
import { useState } from "react";


export default function Home() {
  interface Leads{
    name: string,
    emails?: string[]
    url?: string
    phone?: string
    performance?: {speed:string, tti: string, diagnostics: any}
    ads?: string[]
    techStack?: string[]
    socials?: {twitter?: string, instagram?: string, facebook?: string, linkedin?: string, youtube?: string}
  }
  interface Message{
    type: "status" | "lead" | "id",
    data: string | Leads
  }
  const [status, setStatus] = useState<boolean>(false)
  const [statusUpdate, setStatusUpdate] = useState<string>('Loading...')
  const [leadsData, setLeadsData] = useState<Leads[]>([])
  const [pageCount, setPagesCount] = useState<number>(0)
  const [service, setService] = useState<string | undefined>()
  const [location, setLocation] = useState<string | undefined>()
  const [loadMore, setLoadMore]= useState<boolean>(false)
  const [wsId, setWsId] = useState<string>('')
  const [isWaitlistHidden, setWaitlistHidden] = useState<boolean>(false)

  async function fetchLeads(){
    try {
      setStatus(true)
      const socket = new WebSocket('wss://gmb-scraper-server.onrender.com/scrape');
      
      socket.addEventListener('open', () => {
        setStatusUpdate('Connection to scraper established');
      });
      
      socket.addEventListener('message', event => {
        try {
          const message = JSON.parse(event.data);
          handleMessage(message);
      } catch (err) {
          console.error('Error parsing WebSocket message:', err);
      }
      });

      socket.addEventListener('error', (error) => {
        console.error('Connection error:', error);
        setStatusUpdate(`Failed to connect to Scraper`);
        setTimeout(()=>{
          setStatus(false)
          setLoadMore(false)
        },3000)
        socket.close()
      });

      socket.addEventListener('close', ()=>{
        setStatusUpdate('Connection to scraper closed')
        setStatus(false)
        setLoadMore(false)
      })
      
    }catch (error) {
      console.error(error)
      setLoadMore(false)
    }
  }
  async function handleMessage(message: Message){
    if(message.type === 'status'){
      setStatusUpdate(message.data as string)
    }else if (message.type === 'lead'){
      setLeadsData((prev)=> {
        const copyPrev = prev? JSON.parse(JSON.stringify(prev)) : []
        const lead = JSON.parse(message.data as string)
        copyPrev.push(lead)
        return copyPrev
      })
      console.log('Received a lead', message.data)
    }else if(message.type === 'id'){
      setWsId(message.data as string)
      await fetch(`https://gmb-scraper-server.onrender.com/scrape?service=${service}&location=${location}&pageNumber=${pageCount}&clientId=${message.data as string}`)
      setStatus(false)
      setLoadMore(true)
    }else{
      setStatusUpdate('Error parsing message')
    }
  }

  function cancelRequest(){
    fetch(`https://gmb-scraper-server.onrender.com/cancel-process?clientId=${wsId}`)
  }

  function convertToCSV(data: any) {
    const headers = [
        "name", "emails", "url", "phone", 
        "performance.speed", "performance.tti", "performance.diagnostics",
        "ads", "techStack", 
        "socials.twitter", "socials.instagram", "socials.facebook", "socials.linkedin", "socials.youtube"
    ];

    const csvRows = [];
    // Add headers row
    csvRows.push(headers.join(','));

    // Loop through each lead object and convert to CSV row
    for (const lead of data) {
        const row = [];
        row.push(lead.name || "");
        row.push(lead.emails ? lead.emails.join(';') : "");
        row.push(lead.url || "");
        row.push(lead.phone || "");
        row.push(lead.performance?.speed || "");
        row.push(lead.performance?.tti || "");
        row.push(JSON.stringify(lead.performance?.diagnostics) || "");
        row.push(lead.ads ? lead.ads.join(';') : "");
        row.push(lead.techStack ? lead.techStack.join(';') : "");
        row.push(lead.socials?.twitter || "");
        row.push(lead.socials?.instagram || "");
        row.push(lead.socials?.facebook || "");
        row.push(lead.socials?.linkedin || "");
        row.push(lead.socials?.youtube || "");
        csvRows.push(row.join(','));
    }

    return csvRows.join('\n');
  }

  function downloadCSV() {
    const csv = convertToCSV(leadsData);
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'leadsbypendora.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-2 pt-5 bg-grid-neutral-100/[0.1] bg-black text-white">
      <div className="flex flex-col gap-3 items-center  pb-8 w-full">
        <h1 className="text-5xl sm:text-7xl tracking-tighter font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Pendora
        </h1>
        <span className="text-base w-full min-w-[280px] text-white font-light text-center">Lead gen for freelance web developers. <br/>Filter out all the noise and find your ideal client</span>
      </div>
      <section className="flex gap-2 flex-col lg:flex-row">
        <form className="w-full h-max flex lg:flex-row flex-col gap-2" onSubmit={ (e)=> {
          e.preventDefault()
          setPagesCount(0)
          fetchLeads()
        }}>
          <div className="flex lg:flex-row flex-col gap-5 ">
            <input required={true} type="text" className="w-72 h-10 utline-none focus:outline-none rounded-md p-2 bg-neutral-200 text-black" placeholder="Enter Business Type e.g Roofers" value={service} onChange={(e)=> setService(e.target.value) }/>
            <input required={true} type="text"  className="w-72 h-10 utline-none focus:outline-none rounded-md p-2 bg-neutral-200 text-black" placeholder="Enter Location"  value={location} onChange={(e)=> setLocation(e.target.value) }/>
          </div> 
          <div>
            <button className={`bg-neutral-950 hover:ring-1 flex items-center justify-center hover:ring-neutral-900   text-center p-4 px-5 text-white w-max rounded-md h-10 hover:scale-[1px] transition`} type="submit" >Search</button>
          </div>
        </form>
        <div onClick={()=> { downloadCSV() }} className={`${leadsData.length > 0 ? 'flex' : 'hidden'} cursor-pointer gap-2 bg-neutral-950 hover:ring-1 items-center justify-center hover:ring-neutral-900   text-center p-4 px-5 text-white w-max rounded-md h-10 hover:scale-[1px] transition`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"></path></svg>
          <span className="w-max">Export to CSV</span>
        </div>
      </section> 
      <section className="grid grid-flow-row gap-4 grid-cols-1  mt-5">
        {leadsData?.map((lead)=>(
          <Lead key={lead.name} name={lead.name} emails={lead.emails} url={lead.url} phone={lead.phone} socials={lead.socials} performance={lead.performance} ads={lead.ads} techStack={lead.techStack}/>
        ))}
        <button className={` ${loadMore? "flex" : "hidden"} w-max rounded-md p-3 bg-neutral-950 ring-1 ring-neutral-900 hover:scale-[1px] transition hover:bg-neutral-900 hover:scale text-white`} onClick={()=>{
          setPagesCount((prev)=> prev+1)
          fetchLeads()
        }}>Load More</button>
      </section>
      <section className={` ${status? 'flex' : 'hidden'} flex-col lg:flex-row z-50 gap-2 items-center rounded-md bg-neutral-950 p-2 ring-1 ring-neutral-900 fixed bottom-3 left-1/2 -translate-x-1/2 w-[19rem] truncate lg:w-max`}>
        <div className="size-5 rounded-full border-2 border-neutral-700 border-t-neutral-400 animate-spin"/>
        <p className="text-white flex items-center justify-center truncate overflow-x-auto text-xs lg:text-base">
          {statusUpdate}
        </p>
        <button onClick={ ()=> cancelRequest() } className=" rounded-md p-3 bg-neutral-950 ring-1 ring-neutral-900 hover:scale-[1px] transition hover:bg-red-600 text-white ">Cancel</button>
      </section>
      <form action="https://submit-form.com/vm5aKio40" className={`fixed ${isWaitlistHidden ? '-bottom-40 lg:right-2 left-1/2 -translate-x-1/2 lg:translate-x-0  ' : 'bottom-2 lg:bottom-5 lg:right-10 left-1/2 -translate-x-1/2 lg:translate-x-0'} transition-all duration-300 flex flex-col gap-2 items-center  w-[15rem] md:w-[20rem] rounded-md bg-neutral-950 p-3 ring-1 ring-neutral-900 hover:scale-[1px] hover:scale`}>
        <div className="w-full flex items-center justify-start " onClick={()=> {setWaitlistHidden(prev => !prev)}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" className="cursor-pointer hover:bg-neutral-800 rounded-full" height="28" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-109.66a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L128,140.69l34.34-34.35A8,8,0,0,1,173.66,106.34Z"></path></svg>
        </div>
        <div className="text-base font-light text-white text-center">Get 30 days for free when we launch the full version.</div>
        <input className="w-full h-10 outline-none focus:outline-none rounded-md p-2 bg-neutral-200 text-black" type="email" id="email" name="email" placeholder="Email" required={true} />
        <button type="submit" className="w-full rounded-md p-3 bg-yellow-200 ring-1 ring-neutral-900 hover:scale-[1px] transition hover:bg-yellow-300 hover:scale text-black">Get on waitlist</button>
      </form>
    </main>
  );
}
