"use client"
import BlogCard from '@/components/BlogCard'
import BlogModel from '@/components/BlogModel'
import { BASE_URL } from '@/helper/route';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Blog() {
    const [visible, setVisible] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [blogs, setBlogs] = useState([]);
    const handleAddModel = () => {
        setVisible(true)
    }
    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/blog/all`);
                // console.log(response)
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchAllBlogs()
    }, [refresh])
    return (
        <>
            <BlogModel visible={visible} setVisible={setVisible} refresh={refresh} setRefresh={setRefresh} />
            <div className="flex flex-col gap-4 w-[90%] md:w-[70%] my-4 md:my-12 mx-auto">
                <div className="w-full">
                    <button onClick={handleAddModel} className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                        Add New Blog
                    </button>
                </div>
                {
                    blogs.length == 0 ?

                        <>
                            <div className="py-3 text-center bg-red-100">
                                <p>No blog post avilbale in database please add</p>
                            </div>
                        </>
                        :

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                            {
                                blogs && blogs?.map((item) => {
                                    return (
                                        <BlogCard key={item.id} id={item.id} title={item.title} subTitle={item.subtitle} creator={item.creator.name} email={item.creator.email} image={item.image} />
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </>
    )
}