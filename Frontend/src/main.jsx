import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { DataProvider } from "./components/global/DataContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },

    {
        path: "/signIn",
        element: <SignIn />,
    },

    {
        path: "/signUp",
        element: <SignUp />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <DataProvider>
        <RouterProvider router={router} />
    </DataProvider>,
    // </React.StrictMode>
);
