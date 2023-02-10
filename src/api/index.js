import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1'

export const fetchItems = async () => {
    return axios.get(`${API_URL}/items`)
}

export const fetchDeliveryDates = async () => {
    return axios.get(`${API_URL}/items/delivery-dates`);
};
