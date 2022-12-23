import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component }  from 'react';
import Home from "./Home"
import TiketParkingGenerator from "./ParkingMachineGenerator";
import Layout from "./Layout";
import DashboardManagement from "./DashboardManagement";
import NoPage from "./NoPage";

export default function Main(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="machine" element={<TiketParkingGenerator/>}/>

                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="payment" element={<DashboardManagement/>}/>
                    <Route path="*" element={NoPage}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
