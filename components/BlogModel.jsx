"use client"
import { ErrorModel, SuccessModel } from '@/helper/models';
import { BASE_URL } from '@/helper/route';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const BlogModel = ({ visible, setVisible, refresh, setRefresh, blog_id }) => {
    const router = useRouter()
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [subtitle, setSubTitle] = useState('')
    const [desc, setDesc] = useState('')

    const handleSubmit = async (e) => {
        if (blog_id) {
            e.preventDefault();
            try {
                const jwtToken = localStorage.getItem("token")
                const formData = new FormData();
                formData.append("title", title)
                formData.append("subtitle", subtitle)
                formData.append("desc", desc)
                formData.append("image", file)

                console.log(title, desc, subtitle, file)
                const response = await axios.put(
                    `${BASE_URL}/blog/${blog_id}/update`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`,
                            // 'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                setRefresh(!refresh)
                setVisible(false)
                SuccessModel("Success", response.data.message)
                router.push(`/blog/detail/${blog_id}`)
            } catch (error) {
                ErrorModel("Error", error.response.data.detail)
                setVisible(false)
                if (error.response.data.detail == "Not Authenticated") {
                    router.push('/login')
                }
                console.log(error)
            }
        }

        else {
            e.preventDefault();
            try {
                const jwtToken = localStorage.getItem("token")
                const formData = new FormData();
                formData.append("title", title)
                formData.append("subtitle", subtitle)
                formData.append("desc", desc)
                formData.append("image", file)
                const response = await axios.post(
                    `${BASE_URL}/blog`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    }
                );
                setRefresh(!refresh)
                SuccessModel("Success", response.data.message)
                router.push('/blog')
                setTitle('');
                setSubTitle('');
                setDesc('');
                setFile(null);
                setVisible(false)
            } catch (error) {
                ErrorModel("Error", error.response.data.detail)
                if (error.response.data.detail == "Not Authenticated") {
                    router.push('/login')
                }
                setTitle('');
                setSubTitle('');
                setDesc('');
                setFile(null);
                setVisible(false)
                console.log(error)
            }
        }

    };
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/blog/${blog_id}`);
                if (response.data) {
                    const data = response.data
                    console.log(data)
                    setTitle(data?.title)
                    setSubTitle(data?.subtitle)
                    setDesc(data?.desc)
                    setFile(data?.image)
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        if (blog_id) {
            fetchBlog();
        }
    }, [blog_id]);
    return (
        <div className={`${visible ? 'block' : 'hidden'}`}>
            <div id="default-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
                <div className="w-[90%] h-[90%] bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">New Blog</h3>
                        <button onClick={() => setVisible(false)} type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span onClick={() => setVisible(false)} className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <form onSubmit={handleSubmit} >
                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Title</label>
                                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subtitle" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Subtitle</label>
                                <input type="text" id="subtitle" name="subtitle" value={subtitle} onChange={(e) => setSubTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="desc" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Desc</label>
                                <textarea id="desc" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full h-[300px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Image</label>
                                <input type="file" id="image" accept="image/*" name="image" onChange={(e) => setFile(e.target.files[0])} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setVisible(false)} className="px-4 py-2 mr-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md dark:text-gray-100 dark:bg-gray-700">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                                    {
                                        blog_id ? "Save" : "Submit"
                                    }

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogModel;
