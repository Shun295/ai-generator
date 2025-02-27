"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'


function SideNav() {

    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        
        {
            name: 'Setting',
            icon: Settings,
            path: '/dashboard/settings'
        },
    ]

    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [path]) // Add `path` as a dependency to run on path change.

    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
                <Image src={'/logo.svg'} alt='logo' width={90} height={90} />
            </div>
            <hr className='my-2 border' />

            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <div 
                        key={index} 
                        className={`flex gap-2 mb-2 p-3 
                        hover:bg-primary hover:text-white rounded-lg 
                        cursor-pointer items-center
                        ${path === menu.path ? 'bg-primary text-white' : ''}`}
                    >
                        <menu.icon className='h-6 w-6'/>
                        <h2 className='text-md'>{menu.name}</h2>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default SideNav;
