import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React from 'react'

interface LeadProps{
    name: string,
    emails?: string[]
    url?: string
    phone?: string
    performance?: {speed:string, tti: string, diagnostics: any}
    ads?: string[]
    techStack?: string[]
    socials?: {twitter?: string, instagram?: string, facebook?: string, linkedin?: string, youtube?:string}
  }

const Lead: React.FC<LeadProps> = ({name, phone, emails, url, performance, socials, ads, techStack}) => {
  return (
    <div className="flex mx-auto gap-2 items-center p-4 py-3 w-max bg-neutral-950 rounded-md hover:ring-neutral-900 hover:ring-1">
        <div className="text-white text-sm rounded-md hover:bg-neutral-800 p-2 cursor-pointer w-[13rem] truncate">
            {name}
        </div>
        <Popover>
            <PopoverTrigger className='hover:bg-neutral-800 p-2 w-max rounded-md text-white flex gap-1 items-center'>
                <p className='text-sm'>Phone</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path></svg>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max'>
                <p className='text-sm'>{phone}</p>            
            </PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger className='hover:bg-neutral-800 p-2 w-max rounded-md text-white flex gap-1 items-center'>
                <span className='text-sm'>Emails</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path></svg>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max'>
                {emails?.map((email)=>(
                    <p className='p-3 text-white hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>{email}</p>
                ))}
                {emails?.length === 0 && <p className="p-3 text-white hover:bg-neutral-800 text-sm rounded-md w-max h-max cursor-pointer">No emails found</p>}
            </PopoverContent>
        </Popover>
        <a href={url} target='_blank' className="flex text-sm items-center gap-1 w-max h-max p-2 text-white hover:bg-neutral-800 rounded-md">
            Website
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
        </a>
        <Popover>
            <PopoverTrigger className='flex  gap-1 items-center hover:bg-neutral-800 p-2 rounded-md text-white'>
                <span className='text-sm'>Socials</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z"></path></svg>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max flex flex-col'>
                {socials?.twitter && (<a href={socials?.twitter} className='p-3 text-white hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>Twitter</a>)}
                {socials?.facebook && (<a href={socials?.facebook} className='p-3 text-white hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>Facebook</a>)}
                {socials?.instagram && (<a href={socials?.instagram} className='p-3 text-white hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>Instagram</a>)}
                {socials?.linkedin && (<a href={socials?.linkedin} className='p-3 text-white hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>LinkedIn</a>)}
                {socials?.youtube && (<a href={socials?.youtube} className='p-3 text-white hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>Youtube</a>)}
                {!socials && <p className="p-3 text-white hover:bg-neutral-800 rounded-md w-max h-max cursor-pointer">No socials found</p>}
            </PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger className='flex gap-1 items-center hover:bg-neutral-800 p-2 rounded-md text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M114.34,154.34l96-96a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32ZM128,88a63.9,63.9,0,0,1,20.44,3.33,8,8,0,1,0,5.11-15.16A80,80,0,0,0,48.49,160.88,8,8,0,0,0,56.43,168c.29,0,.59,0,.89-.05a8,8,0,0,0,7.07-8.83A64.92,64.92,0,0,1,64,152,64.07,64.07,0,0,1,128,88Zm99.74,13a8,8,0,0,0-14.24,7.3,96.27,96.27,0,0,1,5,75.71l-181.1-.07A96.24,96.24,0,0,1,128,56h.88a95,95,0,0,1,42.82,10.5A8,8,0,1,0,179,52.27a112,112,0,0,0-156.66,137A16.07,16.07,0,0,0,37.46,200H218.53a16,16,0,0,0,15.11-10.71,112.35,112.35,0,0,0-5.9-88.3Z"></path></svg>
                <p className='text-sm'>Page Speed</p>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max'>
                <p className='text-sm'>{performance?.speed}</p>
            </PopoverContent>
        </Popover>
        
        <Popover>
            <PopoverTrigger className='flex gap-1 items-center hover:bg-neutral-800 p-2 rounded-md text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M196,88a27.86,27.86,0,0,0-13.35,3.39A28,28,0,0,0,144,74.7V44a28,28,0,0,0-56,0v80l-3.82-6.13A28,28,0,0,0,35.73,146l4.67,8.23C74.81,214.89,89.05,240,136,240a88.1,88.1,0,0,0,88-88V116A28,28,0,0,0,196,88Zm12,64a72.08,72.08,0,0,1-72,72c-37.63,0-47.84-18-81.68-77.68l-4.69-8.27,0-.05A12,12,0,0,1,54,121.61a11.88,11.88,0,0,1,6-1.6,12,12,0,0,1,10.41,6,1.76,1.76,0,0,0,.14.23l18.67,30A8,8,0,0,0,104,152V44a12,12,0,0,1,24,0v68a8,8,0,0,0,16,0V100a12,12,0,0,1,24,0v20a8,8,0,0,0,16,0v-4a12,12,0,0,1,24,0Z"></path></svg>
                <p className='text-sm'>TTI</p>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max'>
                <p className='text-sm'>{performance?.tti}</p>
            </PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger className='flex gap-1 items-center hover:bg-neutral-800 p-2 rounded-md text-white'>
            <span className='text-sm'>Ad platforms</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max'>
                {ads?.map((ad)=>(
                    <p className='p-3 text-white hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>{ad}</p>
                ))}
                {ads?.length === 0 && <p className="p-3 text-white hover:bg-neutral-800 rounded-md w-max h-max cursor-pointer">No ad platforms found</p>}
            </PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger className='text-sm flex gap-1 items-center hover:bg-neutral-800 p-2 rounded-md text-white'>
                <span>Tech stack</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max'>
                {techStack?.map((stack)=>(
                    <p className='p-3 text-white text-sm hover:bg-neutral-800 rounded-md w-full h-max cursor-pointer'>{stack}</p>
                ))}
                {techStack?.length === 0 && <p className="p-3 text-white hover:bg-neutral-800 rounded-md w-max h-max cursor-pointer">Couldn't determine stack</p>}
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default Lead