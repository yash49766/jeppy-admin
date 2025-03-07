import React from 'react';
import {Route, Routes} from "react-router-dom";
import Allproducts from "../componate/contact/allproducts.jsx";
import Addproducts from "../componate/contact/addproducts.jsx";

function Product() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Allproducts />} />
                <Route path="/addproducts" element={<Addproducts/>} />
                <Route path="/addproducts/:id" element={<Addproducts/>} />
            </Routes>
        </>
    );
}

export default Product;