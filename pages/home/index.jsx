"use client"
import BlogCard from '@/components/BlogCard'
import { BASE_URL } from '@/helper/route';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Homepage() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/blog/all`);
                console.log(blogs)
                setBlogs(response.data.slice(-4).reverse());
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchAllBlogs()
    }, [])
    return (
        <>
            <div className="flex flex-col gap-4">

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {
                        blogs && blogs?.map((item) => {
                            return (
                                <BlogCard key={item.id} id={item.id} title={item.title} subTitle={item.subtitle} creator={item.creator.name} email={item.creator.email} image={item.image} />
                            )
                        })
                    }
                </div>
                <div className="flex items-center justify-end w-full my-8">
                    <Link href="/blog" className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                        View All
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    )
}
