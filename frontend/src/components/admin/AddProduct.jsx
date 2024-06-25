import React, { useState } from "react";

import ProductInfoForm from "./ProductInfoForm";
import SizeInfoForm from "./SizeInfoForm";



const AddProduct = () => {
    const [sizes, setSizes] = useState([]);

    return (
        <div className="admin-form-container">
            <div className="form-card">
                <div className="admin-form-content">
                    <ProductInfoForm sizes={sizes}/>
                    <SizeInfoForm setSizes={setSizes}/>
                </div>
            </div>
        </div>
    );
}
export default AddProduct;