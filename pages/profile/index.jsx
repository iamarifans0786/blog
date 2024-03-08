"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/helper/route';
import { ErrorModel, SuccessModel } from '@/helper/models';

export default function Profile() {
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState({
        id: '',
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.put(`${BASE_URL}/user/update`, data, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setRefresh(!refresh)
            SuccessModel("Success", response.data.message)
        } catch (error) {
            ErrorModel("Error", error.response.data.detail);
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const jwtToken = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, [refresh]);

    return (
        <div className="">
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div>
                                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    User Id
                                </label>
                                <input
                                    disabled
                                    type="number"
                                    name="id"
                                    id="item-weight"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={data.id}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email Id
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    disabled
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                type="submit"
                                className="text-white bg-primary-700 hover:bg-primary-800  focus:outline-none focus:ring-primary-300 font-medium rounded-lg bg-red-400 hover:bg-red-800 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
