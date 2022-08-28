import axios from "axios"

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://react-expenses-tkassabian.glitch.me/"

const axiosInstance = axios.create({ baseURL: BASE_URL, withCredentials: true })

export const get = async (url: string) => {
	const { data } = await axiosInstance.get(url)
	return data
}
