"use client"
import React from 'react'

export const Footer = () => {
    return (
        <div className="">
            <footer className="m-4 bg-red-400 rounded-lg shadow dark:bg-gray-800">
                <div className="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
                    <span className="text-xl text-black sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Blogging™</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-lg font-medium text-gray-800 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="/" className="hover:underline hover:text-white me-4 md:me-6">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline hover:text-white me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline hover:text-white me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="/blog" className="hover:underline hover:text-white">Blog</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
