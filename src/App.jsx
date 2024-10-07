import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Detail from "./page/Detail";
import Login from "./page/Login";
import Registro from "./page/Registro";
import Report from "./page/Report";
import User from "./page/User";
import ProtectedRoute from "./routes/Protected";
import Layout from "./layout/Layout"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="usuario" element={<User />} />
          <Route path="report" element={<Report />} />
          <Route path="detail" element={<Detail />} />
          <Route path="register" element={<Registro />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
