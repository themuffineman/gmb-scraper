import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React from 'react'

interface LeadProps {
    name: string,
    phone: string,
    emails?: string[],
    website: string
}

const Lead: React.FC<LeadProps> = ({name, phone, emails, website}) => {
  return (
    <div className="flex gap-4 items-center justify-between p-5 w-[45rem] bg-neutral-950 rounded-md hover:ring-neutral-900 hover:ring-1">
        <div className="text-white rounded-md hover:bg-neutral-900 p-2 cursor-pointer w-[15rem] truncate">
            {name}
        </div>
        <div className='hidden p-2 gap-2 items-center justify-center hover:bg-neutral-900 rounded-md cursor-pointer'>
            <p>{phone}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path></svg>
        </div>
        <Popover>
            <PopoverTrigger className='hover:bg-neutral-900 p-2 rounded-md text-white'>Emails</PopoverTrigger>
            <PopoverContent className='bg-neutral-950 p-1 border-neutral-900 w-max'>
                {emails?.map((email)=>(
                    <p className='p-3 text-white hover:bg-neutral-900 rounded-md w-full h-max cursor-pointer'>{email}</p>
                ))}
                {emails?.length === 0 && <p className="p-3 text-white hover:bg-neutral-900 rounded-md w-max h-max cursor-pointer">No emails found</p>}
            </PopoverContent>
        </Popover>
        <a href={website} target='_blank' className="w-max h-max p-2 hover:bg-neutral-900 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
        </a>
    </div>
  )
}

export default Lead