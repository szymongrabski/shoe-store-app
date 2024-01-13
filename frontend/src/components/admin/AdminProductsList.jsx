import React, { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../contexts/ProductsContext"
import AdminProduct from "./AdminProduct"
import AddProduct from "./AddProduct"


const AdminProductsList = () => {
    const { state, getProducts } = useContext(ProductsContext)
    const [showProducts, setShowProducts] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <div className="card-items">
            <div className="admin-buttons">
                <button className="btn add-btn" onClick={() => setShowAddForm(prevValue => !prevValue)}>{showAddForm ? "Anuluj dodawanie produktu":"Dodaj Produkt"}</button>
                <button className="btn add-btn" onClick={() => setShowProducts(prevValue => !prevValue)}>{showProducts ? "Ukryj produkty":"Pokaż produkty"}</button>
            </div>
            {showProducts && <div className="card-list-container">
                <ul className="card-list">
                    {state.products.map(product => (
                        <li key={`admin-${product.id}`}>
                            <AdminProduct product={product}/>
                        </li>
                    ))}
                </ul>
            </div>}
            {showAddForm && <AddProduct/>}
        </div>
    );
}

export default AdminProductsList;
