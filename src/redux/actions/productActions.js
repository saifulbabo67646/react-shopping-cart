import { FETCH_PRODUCTS } from "../actionTypes"
import axios from 'axios'

export const fetchProducts = () => async (dispatch) => {
    const response = await axios.get('http://localhost:5000/api/products')
    const data = await response.data
    console.log(data);
    dispatch({
        type: FETCH_PRODUCTS,
        payload:  data
    })
}