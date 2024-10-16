import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";
import { useApi } from "../api/useApi";
export default function Usuario({ visible, setVisible, user, isEdit, onUser }) {
  const { role, getUser, createUser, updateUser } = useApi();
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [username, setUsername] = useState("")
  const [roles, setRoles] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const toast = useRef(null);
  useEffect(() => {
    if (isEdit && user) {
      setNombre(user.name);
      setApellido(user.lName);
      setUsername(user.username);
      setRoles(user.roleId);
      setEmail(user.email);
      setPassword(user.password);
    } else {
      setNombre("");
      setApellido("");
      setUsername("");
      setRoles("");
      setEmail("");
      setPassword("");
    }
    getUser()
  }, [isEdit, user]);
  const handle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const usuario = Object.fromEntries(formData);
    console.log(usuario)
    usuario.roleId = roles;
    try {
      let rs;
      if (isEdit) {
        rs = await updateUser(user.userId, usuario);
      } else {
        rs = await createUser(usuario);
      }
      setVisible(false);
      await onUser()
      if (rs && rs.success) {
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: isEdit ? "datos actualizados" : "usuario creado",
          life: 3000,
        });
        setVisible(false);
      }
    } catch (error) {
      let errorMessage = "Intente de nuevo";
      if (error.response?.data?.message)
        errorMessage = error.response.data.message;
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
        life: 3000,
      });
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={isEdit ? "editar usuario" : "agregar usuario"}
        visible={visible}
        modal={false}
        style={{ width: "500px", height: "80%" }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handle} className="grid gap-3">
          <InputText
            name="name"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="nombre"
            className="h-12 pl-3 border border-b-2"
            required
          />
          <InputText
            name="lName"
            type="text"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            placeholder="apellido"
            className="h-12 pl-3 border border-b-2"
            required
          />
          <InputText
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="usuario"
            className="h-12 pl-3 border border-b-2"
            required
          />
          <Dropdown
            name="roleId"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            options={role}
            optionLabel="name"
            optionValue="roleId"
            placeholder="seleccionar un rol"
            required
          />
          <InputText
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="correo"
            className="h-12 pl-3 border border-b-2"
            required
          />
          {!isEdit && (
            <InputText
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              className="h-12 pl-3 border border-b-2"
              required
            />
          )}
          <Button
            type="submit"
            label={isEdit ? "Actualizar Usuario" : "Agregar Usuario"}
            className="bg-blue-700 text-white w-96 h-12"
          />
        </form>
      </Dialog>
    </>
  );
}
