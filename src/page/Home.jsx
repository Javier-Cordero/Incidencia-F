import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../layout/Layout";
export default function Home({ children }) {
  const { user } = useContext(AuthContext);
  const useData = user ? user[0] : null;
  const renderRol = () => {
    if (!useData) return <p>No estás autenticado</p>;
    switch (useData[0].role) {
      case "administrador":
        return <p>Administrador</p>;
      case "concerje":
        return <p>Concerje</p>;
      default:
        return <p>Usuario</p>;
    }
  };
  return (
      <div>
        <section>{renderRol()}</section>
      </div>
  );
}
