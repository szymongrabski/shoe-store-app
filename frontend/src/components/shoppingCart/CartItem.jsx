import { useEffect, useState, useContext } from "react";
import { fetchData } from "../../utils/api";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export function CartItem({ id, order }) {
    const { increaseProductQuantity, decreaseProductQuantity, removeFromCart } = useContext(ShoppingCartContext)
    const [product, setProduct] = useState(null);
    const [productAmount, setProductAmount] = useState(0);
    const { size, amount } = order;

    useEffect(() => {
        getProduct()
        getProductAmount()
    }, [])

    const getProduct = async () => {
        const product = await fetchData(`/products/${id}`);
        setProduct(product);
    }

    const getProductAmount = async () => {
        const sizesData = await fetchData(`/products/${id}/sizes/available`);
        const amount = sizesData.find(data => data.properties.size == size)?.properties.amount || 0;
        setProductAmount(amount)
    }

    if (product) {
        return (
            <div className="flex bg-white shadow-md justify-between">
                <div className= "h-[200px] mb-4 overflow-hidden" >
                    <img className="w-full h-full object-cover" src={product.properties.image}/>  
                </div>
                <div className="bg-gray-300 flex flex-col justify-between p-3 w-[300px]">
                    <h3 className="font-bold text-lg">{product.properties.title}</h3>
                    <div>
                        <span>Price: </span><span className="font-bold">{product.properties.price}</span>
                        <p>Size: {size}</p>
                        <p>Amount: {amount}</p>
                    </div>
                    <div className="flex justify-center gap-x-2">
                        <div>
                            {amount < productAmount ? 
                                <button className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() =>increaseProductQuantity(product.id, size)}>
                                    <AiOutlinePlus size={22}/>
                                </button> : null 
                            }
                        </div>
                        <div>
                            <button className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => decreaseProductQuantity(product.id, size)}><AiOutlineMinus size={22}/></button>
                        </div>
                        <div>
                            <button className="btn bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => removeFromCart(product.id, size)}><AiOutlineClose size={22}/></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="error">Loading...</div>
        )
    }

}
