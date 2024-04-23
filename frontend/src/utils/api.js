import axios from "axios";

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`/api/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas pobierania danych (${endpoint}):`, error);
        return null;
    }
};

export const fetchCategory = async (endpoint) => {
    try {
        const response = await axios.get(`/api/products/category/${endpoint}`);
        return response.data.categoryValues;
    } catch (error) {
        console.error(`Błąd podczas pobierania kategori`)
        return null;
    }
}
