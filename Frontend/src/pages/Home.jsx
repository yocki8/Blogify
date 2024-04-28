import React from "react";
import Nav from "../components/global/Nav";
import { useData } from "../components/global/DataContext";

export default function Home({ page }) {
    const { darkMode } = useData();
    return (
        <div
            className={`min-h-dvh ${darkMode ? "dark" : ""} bg-white dark:bg-black`}
        >
            <Nav />
            <div className="mt-4">
                <h1 className="text-4xl  font-semibold">Hello there!</h1>
            </div>
        </div>
    );
}
