"use client"
import BlogModel from '@/components/BlogModel';
import { DeleteModal, ErrorModel, SuccessModel } from '@/helper/models';
import { BASE_URL } from '@/helper/route';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

export default function BlogDetail() {
    const router = useRouter();
    const [visible, setVisible] = useState(false)
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [text, setText] = useState('');
    const id = router.query.index;

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/blog/${id}`);
                if (response.data) {
                    setBlog(response.data);
                    // console.log(blog)
                    setComments(response?.data?.comments);
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        if (id) {
            fetchBlog();
        }
    }, [id, refresh]);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jwtToken = localStorage.getItem("token");
            await axios.post(`${BASE_URL}/blog/${id}/comment`, { text }, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setRefresh(!refresh);
            setText('');
            router.push(`/blog/detail/${id}`);
        } catch (error) {
            console.log(error);
            setText('');
            ErrorModel("Error", error?.response?.data?.detail);
            if (error.response.data.detail === "Not Authenticated") {
                router.push('/login');
            }
        }
    };

    const handleBlogDelete = async (c_id) => {
        try {
            await DeleteModal();
            const jwtToken = localStorage.getItem("token");
            await axios.delete(`${BASE_URL}/blog/${id}/delete`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            router.push(`/blog`);
            SuccessModel("success", "Deleted Successfully");
        } catch (error) {
            console.log(error);
            ErrorModel('Error', error?.response?.data?.detail);
        }
    };

    const handleCommentDelete = async (c_id) => {
        try {
            await DeleteModal();
            const jwtToken = localStorage.getItem("token");
            await axios.delete(`${BASE_URL}/blog/${c_id}/comment/delete`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setRefresh(!refresh);
            router.push(`/blog/detail/${id}`);
            SuccessModel("success", "Deleted Successfully");
        } catch (error) {
            console.log(error);
            ErrorModel('Error', error?.response?.data?.detail);
        }
    };
    return (
        <>
            <BlogModel blog_id={id} visible={visible} setVisible={setVisible} refresh={refresh} setRefresh={setRefresh} />
            <div className="w-[90%] md:w-[70%] my-4 md:my-12 mx-auto flex flex-col gap-5">
                <div className="flex justify-end gap-5">
                    <button onClick={() => { setVisible(true) }} className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-white bg-red-400 rounded-lg hover:cursor-pointertext-center hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                        <span>
                            Update
                        </span>
                        <span className="text-2xl cursor-pointer hover:text-red-400">
                            <CiEdit />
                        </span>
                    </button>

                    <button onClick={() => handleBlogDelete(id)} className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                        <span>
                            Delete
                        </span>
                        <span className="text-2xl cursor-pointer hover:text-red-400">
                            <AiOutlineDelete />
                        </span>
                    </button>
                </div>
                <span>
                    <img src={blog?.image} className='w-full h-[400px] md:h-[550px]' alt="pic" />
                </span>
                <div className="flex flex-col gap-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <h1 className="bg-red-300">Title : </h1>
                    <span className="text-gray-700 ">
                        {blog?.title}
                    </span>
                </div>
                {/* <div className="flex flex-col gap-3 font-bold tracking-tight text-gray-900 text-md dark:text-white">
                <h1 className="bg-red-300">Sub Title : </h1>
                <span className="tracking-wider text-gray-700">
                    {blog?.subtitle}
                </span>
            </div> */}
                <div className="flex flex-col gap-3 font-normal text-gray-700 dark:text-gray-400">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 bg-red-300">Description : </h1>
                    <span className="tracking-wider">
                        {blog?.desc}
                    </span>
                </div>
                <div className="flex flex-col gap-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <h1 className="bg-red-300">Comments :  </h1>
                    {
                        comments && comments.map((item) => {
                            return (
                                <div key={item.id} className="items-center justify-between gap-10 px-4 py-4 text-xl font-normal border border-red-300 fle-col">
                                    <span>
                                        {item.text}
                                    </span>
                                    <div className="flex items-center gap-4 py-4">
                                        <span className="text-gray-700 text-[15px]">
                                            {item.creator.name}
                                        </span>
                                        <span onClick={() => handleCommentDelete(item.id)} className="text-2xl cursor-pointer hover:text-red-400">
                                            <AiOutlineDelete />
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex flex-col gap-5 p-4 border border-red-300">
                    <p className="font-bold text-red-400">Add Comments</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={text}
                            onChange={handleChange}
                            placeholder="Enter your comment..."
                            className="w-full px-2 py-2 border border-red-200 rounded-md outline-red-400"
                        />
                        <button type="submit" className="px-4 py-2 mt-3 text-white bg-red-400 rounded-md hover:bg-red-800">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
