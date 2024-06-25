import React, {useContext, useState} from "react";
import { useKeycloak } from "@react-keycloak/web";

import ModerateReviews from "./ModerateReviews";
import { ProductsContext } from "../../contexts/ProductsContext";
import { deleteData } from "../../utils/api";

const AdminProduct = ({ product }) => {
    const [showReviews, setShowReviews] = useState(false);
    const { getProducts } = useContext(ProductsContext);
    const { keycloak } = useKeycloak();

    const handleDeleteProduct = async () => {
        try {
            const response = await deleteData(`/products/${product.id}`, keycloak.token)
            if (response.status === 200) {
                getProducts();
            }
        } catch (error) {
            console.error('Błąd podczas usuwania produktu', error);
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <h2 className="product-title">{product.properties.title}</h2>
                <p className="product-id">id: {product.id}</p>
                <button className="btn del-btn" onClick={handleDeleteProduct}>Usuń</button>
                <button className="btn add-btn" onClick={() => setShowReviews(prevValue => !prevValue)}>Edytuj Recenzje</button>
                {showReviews && <ModerateReviews productId={product.id}/>}
            </div>
        </div>
    );
}

export default AdminProduct;