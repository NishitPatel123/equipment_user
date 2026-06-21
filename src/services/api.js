import axios from "axios"
import { getHeaders } from "../auth/authService"
const BASE = "https://equipment-backend-eklj.onrender.com"
export const login = (d) => axios.post(`${BASE}/login`, d)
export const signup = (d) => axios.post(`${BASE}/signup`, d)
export const changePassword = (d) => axios.post(`${BASE}/changePassword`, d)
export const getCategories = () => axios.get(`${BASE}/categories`)
export const getEquipment = (params) => axios.get(`${BASE}/equipment`, { params })
export const getEquipmentDetails = (id) => axios.get(`${BASE}/equipment/${id}`)
export const getFeedbacks = () => axios.get(`${BASE}/feedbacks`)
export const getProfile = () => axios.get(`${BASE}/user/profile`, { headers: getHeaders() })
export const updateProfile = (d) => axios.post(`${BASE}/user/updateProfile`, d, { headers: getHeaders() })
export const placeBooking = (d) => axios.post(`${BASE}/user/placeBooking`, d, { headers: getHeaders() })
export const myBookings = () => axios.get(`${BASE}/user/myBookings`, { headers: getHeaders() })
export const cancelBooking = (d) => axios.post(`${BASE}/user/cancelBooking`, d, { headers: getHeaders() })
export const genOrderId = (d) => axios.post(`${BASE}/user/genOrderId`, d, { headers: getHeaders() })
export const verifyPayment = (d) => axios.post(`${BASE}/user/verifyPayment`, d, { headers: getHeaders() })
export const addFeedback = (d) => axios.post(`${BASE}/user/addFeedback`, d, { headers: getHeaders() })
