"use client"
import { MdSupervisorAccount, MdMenu } from "react-icons/md";
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function Header() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    const isActive = (href) => {
        return router.pathname === href ? 'active text-white' : 'text-gray-800 dark:text-white';
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const logoutHandle = () => {
        localStorage.removeItem("token");
        router.push('/login')
    };


    return (
        <div>
            <nav className="px-4 py-4 bg-red-400 lg:px-6 dark:bg-gray-800">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
                    <Link href="/profile" className={`flex items-center ${isActive('/profile')}`}>
                        <span className="px-2 text-3xl">
                            <MdSupervisorAccount />
                        </span>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap hover:text-white dark:text-white">Profile</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {/* Hamburger menu button */}
                        <button className="px-2 py-1 mr-2 text-lg font-medium text-gray-800 rounded-lg lg:hidden dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={toggleMenu}>
                            <MdMenu size={24} />
                        </button>
                        {
                            token ?
                                <div onClick={logoutHandle} className="flex items-center gap-2 text-gray-800 hover:cursor-pointer">
                                    <span className="hidden lg:block">
                                        Sign Out
                                    </span>
                                    <span className="text-2xl">
                                        <RiLogoutCircleRLine />
                                    </span>
                                </div>
                                :
                                <>
                                    <Link href="/login" className="hidden lg:block text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Sign In</Link>
                                    <Link href="/registration" className="hidden lg:block text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Sign Up</Link>
                                </>
                        }



                    </div>
                    <div className={`lg:hidden items-center justify-between w-full ${menuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li className={isActive('/')}>
                                <Link href="/" className="block py-2 pl-3 pr-4 text-lg rounded hover:text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                            </li>
                            <li className={isActive('/blog')}>
                                <Link href="/blog" className="block py-2 pl-3 pr-4 text-lg rounded hover:text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Blog</Link>
                            </li>
                            {
                                token ?
                                    <li className={isActive('/login')}>
                                        <button onClick={logoutHandle} className="block py-2 pl-3 pr-4 text-lg rounded hover:text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Sign Out</button>
                                    </li>
                                    :
                                    <>
                                        <li className={isActive('/login')}>
                                            <Link href="/login" className="block py-2 pl-3 pr-4 text-lg rounded hover:text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Sign In</Link>
                                        </li>
                                        <li className={isActive('/registration')}>
                                            <Link href="/registration" className="block py-2 pl-3 pr-4 text-lg rounded hover:text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Sign Up</Link>
                                        </li>
                                    </>
                            }

                        </ul>
                    </div>
                    <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="desktop-menu">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li className={isActive('/')}>
                                <Link href="/" className="py-2 pl-3 pr-4 text-lg rounded hover:text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                            </li>
                            <li className={isActive('/blog')}>
                                <Link href="/blog" className="py-2 pl-3 pr-4 text-lg rounded hover:text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Blog</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
