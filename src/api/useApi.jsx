import axios from "axios";
import { useEffect, useState } from "react";
export const useApi = () => {
    const [detail, setDetail] = useState([])
    const [report, setReport] = useState([])
    const [role, setRole] = useState([])
    const [state, setState] = useState([])
    const [user, setUser] = useState([])
    const url = 'http://localhost:3000/api'
    const getDetail = async () => {
        try {
            const rs = await axios.get(`${url}/details`)
            setDetail(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getReport = async () => {
        try {
            const rs = await axios.get(`${url}/reports`)
            setReport(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getRole = async () => {
        try {
            const rs = await axios.get(`${url}/roles`)
            setRole(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getState = async () => {
        try {
            const rs = await axios.get(`${url}/states`)
            setState(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const getUser = async () => {
        try {
            const rs = await axios.get(`${url}/users`)
            setUser(rs.data.data)
        } catch (error) { console.error(error.message) }
    }
    const createUser = async (newUser) => {
        try {
            const rs = await axios.post(`${url}/users`, newUser)
            setUser(prev => [...prev, rs.data.data])
            return { success: true, data: rs.data.data }
        } catch (error) {
            console.error('error al crear el usuario ' + error.message)
            return { success: false, message: error.response?.data?.message } || 'error desconocido'
        }
    }
    const updateUser = async (updatedUser) => {
        try {
            const rs = await axios.put(`${url}/users/${updatedUser.id}`, updatedUser);
            setUser((prev) => prev.map(user => user.id === updatedUser.id ? rs.data.data : user));
        } catch (error) { console.error(error.message); }
    };
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${url}/users/${id}`);
            setUser((prev) => prev.filter(user => user.id !== id));
            return { success: true }
        } catch (error) {
            console.error('error al eliminar usuario ' + error.message)
            return { success: false, message: error.response?.data?.message || 'error desconocido' }
        }
    }
    useEffect(() => { getDetail() }, [])
    useEffect(() => { getReport() }, [])
    useEffect(() => { getRole() }, [])
    useEffect(() => { getState() }, [])
    useEffect(() => { getUser() }, [])
    return { detail, report, role, state, user, createUser, updateUser, deleteUser }
}
