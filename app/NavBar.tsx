'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classnames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    console.log('currentPath: ', currentPath);

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ]
    return (
        <nav className='flex border-b space-x-6 mb-5 px-5 h-14 items-center'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {/* il y a une facon tres propre avec classnames */}
                {/* {links.map(link => <Link key={link.href} className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'}  hover:text-zinc-800 transition-colors`} href={link.href}>{link.label}</Link>)} */}
                {links.map(link => <Link key={link.href} className={classnames({
                    'text-zinc-900': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true,
                })} href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    )
}

export default NavBar