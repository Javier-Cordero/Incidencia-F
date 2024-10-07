import axios from "axios";
import { useEffect, useState } from "react";
export const useApi = () => {
    const [user, setUser] = useState([])
    const [report, setReport] = useState([])
    const [detail, setDetail] = useState([])
    const getUser = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/users')
            setUser(rs.data)
        } catch (error) { console.error(error.message) }
    }
    const getReport = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/reports')
            setReport(rs.data)
        } catch (error) { console.error(error.message) }
    }
    const getDetail = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/details')
            setDetail(rs.data)
        } catch (error) { console.error(error.message) }
    }
    useEffect(() => { getUser() }, [])
    useEffect(() => { getReport() }, [])
    useEffect(() => { getDetail() }, [])
    return { user, report, detail }
}
