import {useState} from 'react'

import {Box} from "@mui/material";
import Navigation from "./componate/global/navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Contact from "./pages/contact/contact.jsx";
import InquiryForm from "./pages/Inquiry_form/Inquiry-form.jsx";

import Product from "./pages/product.jsx";

function App() {

    return (
        <>
            <Navigation/>
            <Product/>
            <Routes>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/inquiryForm" element={<InquiryForm/>}/>

            </Routes>
        </>
    )
}

export default App
