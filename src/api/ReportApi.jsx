import axios from "axios";
export const createReport = async ({ type, description, image, fecha }) => {
    const rs = await axios.post('http://localhost:3000/api/reports', { type, description, image, fecha })
    return rs
}