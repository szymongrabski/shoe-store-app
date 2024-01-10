import axios from "axios";

const apiUrl = `http://localhost:8000/api`;

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${apiUrl}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas pobierania danych (${endpoint}):`, error);
        return null;
    }
};