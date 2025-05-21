import React from "react"
import ReactDOM from "react-dom/client";
import PlansPage from "./pages/PlansPage";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar"
import ServicesPage from "./pages/ServicePage";
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import './index.css';

const AppLayout=()=>{
    return (
        <div className="app">
            <Navbar/>
            <Outlet/>
        </div>
    )
}

const appRouter=createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Hero/>
            },
            {
                path: "/plans",
                element: <PlansPage/>,
            },
            {
                path: "/services",
                element: <ServicesPage/>
            }
        ]
    },
]);

const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);