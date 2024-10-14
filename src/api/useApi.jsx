import axios from "axios";
import { useEffect, useState } from "react";
export const useApi = () => {
    const [detail, setDetail] = useState([])
    const [report, setReport] = useState([])
    const [role, setRole] = useState([])
    const [state, setState] = useState([])
    const [user, setUser] = useState([])
    const getDetail = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/details')
            setDetail(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getReport = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/reports')
            setReport(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getRole = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/roles')
            setRole(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getState = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/states')
            setState(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getUser = async () => {
        try {
            const rs = await axios.get('http://localhost:3000/api/users')
            setUser(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    useEffect(() => { getDetail() }, [])
    useEffect(() => { getReport() }, [])
    useEffect(() => { getRole() }, [])
    useEffect(() => { getState() }, [])
    useEffect(() => { getUser() }, [])
    return { detail, setDetail, report, setReport, role, setRole, state, setState, user, setUser }
}
