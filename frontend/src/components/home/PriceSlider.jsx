import React, { useContext, useEffect, useState } from "react";
import { Slider, Typography } from "@mui/material";
import { ProductsContext } from "../../contexts/ProductsContext";
import { fetchData } from "../../utils/api";

const PriceSlider = () => {
  const { dispatch } = useContext(ProductsContext);
  const [value, setValue] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  async function getMinMax() {
    const result = await fetchData('products/prices/minMax')
    setMinPrice(result['minPrice'])
    setMaxPrice(result['maxPrice'])
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
        <div className="slider">
            <Slider
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
                step={20}
            />
        </div>
      );
  }
};

export default PriceSlider;
