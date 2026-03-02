'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const navItems = [
    {href: '/', label: 'Liberary'},
    {href: '/books/new', label: 'Add new'}
]

const Navbar = () => {

    const pathName = usePathname();

  return (
    <header className='w-full fixed z-50 bg-("--bg-primary")'>
        <div className='wrapper navbar-height py-4 flex justify-between items-center'>
            <Link href='/' className='flex gap-0.5'>
                <Image src='/assets/logo.png' alt='bookify' width={42} height={26}/>
                <span className='logo-text'>Bookify</span>
            </Link>
            <nav className='w-fit flex gap-7.5'>
                {navItems.map(({href, label}) => {
                    const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                    return (
                        <Link className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')} 
                                href={href} key={label}>
                            {label}
                        </Link>
                    )
                })}

                
                    <SignedOut>
                        <SignInButton mode='modal'/>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
               
            </nav>
        </div>
    </header>
  )
}

export default Navbar