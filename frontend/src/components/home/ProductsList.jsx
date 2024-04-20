import React, { useContext, useState } from "react";
import Product from './Product';
import { ProductsContext } from "../../contexts/ProductsContext";
import ReactPaginate from 'react-paginate';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ProductsList = () => {
    const { state } = useContext(ProductsContext);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const productsToDisplay = state.filteredProducts && state.filteredProducts.length > 0
        ? state.filteredProducts
        : state.products;

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productsToDisplay.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="flex flex-col justify-between h-[100%]">
            <div className="flex justify-center w-[100%] mt-20 mr-3">
                <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 m-4">
                    {currentItems.map(product => (
                        <li key={product.id}>
                            <Product product={product}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ReactPaginate
                    previousLabel={<AiOutlineLeft/>}
                    nextLabel={<AiOutlineRight/>}
                    breakLabel={"..."}
                    pageCount={Math.ceil(productsToDisplay.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    className="font-bold text-primary flex justify-center items-center m-3 gap-2"
                />
            </div>
        </div>
    );
}

export default ProductsList;

