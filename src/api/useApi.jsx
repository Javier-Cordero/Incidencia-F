import axios from "axios";
import { useEffect, useState } from "react";
export const useApi = () => {
  const [detail, setDetail] = useState([]);
  const [report, setReport] = useState([]);
  const [role, setRole] = useState([]);
  const [state, setState] = useState([]);
  const [user, setUser] = useState([]);
  const url = "http://localhost:3000/api";
  const getDetail = async () => {
    try {
      const rs = await axios.get(`${url}/details`);
      setDetail(rs.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const createDetail = async (newDetail) => {
    try {
      const rs = await axios.post(`${url}/details`, newDetail);
      setDetail((prev) => [...prev, rs.data.data]);
      return { success: true, data: rs.data.data };
    } catch (error) {
      console.error("error al crear la incidencia" + error.message);
      return (
        { success: false, message: error.response?.data?.message } ||
        "error desconocido"
      );
    }
  };
  const getReport = async () => {
    try {
      const rs = await axios.get(`${url}/reports`);
      setReport(rs.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const updateDetail = async (id) => {
    try {
      const rs = await axios.put(`${url}/details/${id}`);
      setDetail((prev) =>
        prev.map((detail) => (detail.id === id ? rs.data.data : detail))
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteDetail = async (id) => {
    try {
      await axios.delete(`${url}/details/${id}`);
      setDetail((prev) => prev.filter((detail) => detail.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  const createReport = async (newReport) => {
    try {
      const token = localStorage.getItem("authToken");
      const rs = await axios.post(`${url}/reports`, newReport, {
        headers: { Authorization: token },
      });
      setReport((prev) => [...prev, rs.data.data]);
      return { success: true, data: rs.data.data };
    } catch (error) {
      console.error("error al crear el reporte" + error.message);
      return (
        { success: false, message: error.response?.data?.message } ||
        "error desconocido"
      );
    }
  };
  const updateReport = async (id) => {
    try {
      const rs = await axios.patch(`${url}/reports/${id}`);
      setReport((prev) =>
        prev.map((report) => (report.id === id ? rs.data.data : report))
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteReport = async (id) => {
    try {
      await axios.delete(`${url}/reports/${id}`);
      setReport((prev) => prev.filter((report) => report.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  const getRole = async () => {
    try {
      const rs = await axios.get(`${url}/roles`);
      setRole(rs.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getState = async () => {
    try {
      const rs = await axios.get(`${url}/states`);
      setState(rs.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getUser = async () => {
    try {
      const rs = await axios.get(`${url}/users`);
      setUser(rs.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const createUser = async (newUser) => {
    try {
      const rs = await axios.post(`${url}/users`, newUser);
      setUser((prev) => [...prev, rs.data.data]);
      return { success: true, data: rs.data.data };
    } catch (error) {
      console.error("error al crear el usuario " + error.message);
      return (
        { success: false, message: error.response?.data?.message } ||
        "error desconocido"
      );
    }
  };
  const updateUser = async (updatedUser) => {
    try {
      const rs = await axios.put(`${url}/users/${updatedUser.id}`, updatedUser);
      setUser((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? rs.data.data : user))
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${url}/users/${id}`);
      setUser((prev) => prev.filter((user) => user.id !== id));
      return { success: true };
    } catch (error) {
      console.error("error al eliminar usuario " + error.message);
      return {
        success: false,
        message: error.response?.data?.message || "error desconocido",
      };
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  useEffect(() => {
    getReport();
  }, []);
  useEffect(() => {
    getRole();
  }, []);
  useEffect(() => {
    getState();
  }, []);
  useEffect(() => {
    getUser();
  }, []);
  return {
    detail,
    createDetail,
    updateDetail,
    deleteDetail,
    report,
    createReport,
    updateReport,
    deleteReport,
    role,
    state,
    user,
    createUser,
    updateUser,
    deleteUser,
  };
};
