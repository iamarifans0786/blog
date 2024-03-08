"use client"
import Link from 'next/link'
import React from 'react'

export default function BlogCard({ image, id, title, subTitle, creator, email }) {
    return (
        <div>
            <div className="max-w-full p-6 bg-white border border-red-200 rounded-lg shadow xl:max-w-xl lg:min-h-[630px] dark:bg-gray-800 dark:border-gray-700">
                <div className="">
                    <div className=''>
                        <span>
                            <img src={image} className='w-full h-[300px]' alt='img' />
                        </span>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{subTitle}</p>
                        <span className="flex items-center gap-5 mb-2 font-semibold text-gray-700 dark:text-gray-400">
                            <span>Creator : </span>
                            <span>{creator}</span>
                            <span>{email}</span>
                        </span>
                    </div>
                    <div className="">
                        <Link href={`/blog/detail/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    )
}
