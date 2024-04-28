import { useEffect } from "react";

import React from "react";
import Nav from "../components/global/Nav";
import { useData } from "../components/global/DataContext";

export default function SignIn() {
    useEffect(() => {
        fetch("http://localhost:3000/api")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    });

    const { darkMode } = useData();
    
    return (
        <div
            className={`min-h-dvh ${darkMode ? "dark" : ""} bg-white dark:bg-black`}
        >
            <Nav />
            <div className="mt-36 grid w-full place-items-center">
                <form
                    method="post"
                    action="http://localhost:3000/signin"
                    className="mx-auto w-96"
                >
                    <div className="mb-5">
                        <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your name
                        </label>
                        <input
                            type="fullName"
                            id="fullName"
                            name="fullName"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
