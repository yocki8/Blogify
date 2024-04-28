import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [darkMode,setDarkMode] = useState(1);

    const handlePage = (num) => {
        setPage(num);
    };

    const toggleDarkMode = () =>{
        setDarkMode(!darkMode);
    }

    return (
        <DataContext.Provider
            value={{
                page,
                handlePage,
                darkMode,
                toggleDarkMode
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
