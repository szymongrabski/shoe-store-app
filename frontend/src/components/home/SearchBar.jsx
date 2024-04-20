import React, { useContext, useEffect, useState } from "react";
import { fetchCategory } from "../../utils/api";
import SearchCategory from "./SearchCategory";
import { ProductsContext } from "../../contexts/ProductsContext";
import PriceSlider from "./PriceSlider";
import SortItem from "./SortItem";

const SearchBar = () => {
    const { state, dispatch } = useContext(ProductsContext);
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sexes, setSexes] = useState([]);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        getAll();
    }, [state.products]);

    const getAll = async () => {
        try {
            const colorsData = await fetchCategory('color');
            setColors(colorsData);

            const brandsData = await fetchCategory('brand');
            setBrands(brandsData);

            const sexesData = await fetchCategory('sex');
            setSexes(sexesData);

            const pricesData = await fetchCategory('price');
            const intPrices = pricesData.map(price => parseFloat(price))
            setPrices(intPrices);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    return (
        <div className="bg-secondary fixed w-[100%] z-10">
            <div className="">
                <div className="flex items-center gap-2 p-3">
                    <div className="w-[100%]">
                        <button 
                            className="w-[100%] p-2 rounded-full bg-btn-col text-white rounded-full shadow-md p-3 transition duration-300 ease-in-out hover:bg-btn-hover" 
                            onClick={() => dispatch({type: "CLEAR_FILTER"})}>
                                Show all
                            </button>
                    </div>
                    <SearchCategory category="color" categoryArray={colors} />

                    <SearchCategory category="brand" categoryArray={brands}/>

                    <SearchCategory category="sex" categoryArray={sexes}/>
                    
                    <SortItem />

                    <PriceSlider/>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
