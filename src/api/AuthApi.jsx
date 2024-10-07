import axios from "axios";
export const login = async ({ username, password }) => {
    try {
        const rs = await axios.post('http://localhost:3000/api/auth/login', { username, password })
        return rs.data;
    } catch (error) { console.error(error.message) }
}
export const getMe = async (token) => {
    try {
        const rs = await axios.get('http://localhost:3000/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        return rs.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.response?.data?.message || "Error al obtener los datos del usuario"); // Lanza un error con un mensaje más específico
    }
};