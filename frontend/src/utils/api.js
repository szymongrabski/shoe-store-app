import axios from "axios";


export const fetchData = async (endpoint, accessToken) => {
    try {
        const response = await axios.get(`/api/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas pobierania danych (${endpoint}):`, error);
        return null;
    }
};

export const fetchCategory = async (endpoint, accessToken) => {
    try {
        const response = await axios.get(`/api/products/category/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.categoryValues;
    } catch (error) {
        console.error(`Błąd podczas pobierania kategorii`, error);
        return null;
    }
};

export const deleteData = async (endpoint, accessToken) => {
    try {
        const response = await axios.delete(`/api/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    } catch (error) {
        console.error(`Błąd podczas usuwania danych (${endpoint}):`, error);
        return null;
    }
};

export const postData = async (endpoint, data, accessToken) => {
    try {
        const response = await axios.post(`/api/${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    } catch (error) {
        console.error(`Błąd podczas wysyłania danych (${endpoint}):`, error);
        return null;
    }
};
