import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { ProductsContext } from "../../contexts/ProductsContext";
import { fetchData } from "../../utils/api";
import { FaDollarSign } from 'react-icons/fa';

const PriceSlider = () => {
  const { dispatch } = useContext(ProductsContext);
  const [value, setValue] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  async function getMinMax() {
    const result = await fetchData('products/prices/minMax')
    setMinPrice(result['minPrice'])
    setMaxPrice(result['maxPrice'])
    setValue([result['minPrice'], result['maxPrice']])
  }

  useEffect(() => {
    getMinMax()
  }, [])

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    dispatch({
        type: "FILTER_PRODUCTS_BY_PRICE",
        payload: { price: newValue },
      });
  };

  if (minPrice && maxPrice) {
    return (
      <div className="flex items-center px-2 pr-4 gap-x-3  w-3/4 bg-[#2b2d42]">
        <FaDollarSign className="mb-1" size={22} color="white"/>
        <div className="w-[100%]">
            <Slider
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
                step={20}
            />
        </div>
      </div>
      );
  }
};

export default PriceSlider;
