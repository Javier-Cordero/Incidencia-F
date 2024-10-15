import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useApi } from "../api/useApi";
export default function Usuario({ visible, setVisible, user, isEdit }) {
  const [selected, setSelected] = useState(user?.roleId);
  const toast = useRef(null)
  const { role, createUser, updateUser } = useApi();
  const handle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const usuario = Object.fromEntries(formData)
    usuario.roleId = selected
    try {
      let rs
      if (isEdit) rs = await updateUser(usuario)
      else rs = await createUser(usuario)
      if (rs && rs.success) {
        toast.current.show({ severity: 'success', summary: 'Exito', detail: isEdit ? "datos actualizados" : "usuario creado", life: 3000 });
        setVisible(false);
      }
    } catch (error) {
      let errorMessage = 'Intente de nuevo'
      if (error.response?.data?.message) errorMessage = error.response.data.message
      toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
    }
  }
  return (
    <>
      <Toast ref={toast} />
      <Dialog header={isEdit ? "editar usuario" : "agregar usuario"} visible={visible} modal={false} style={{ width: "500px", height: "80%" }} onHide={() => setVisible(false)}>
        <form onSubmit={handle} className="grid gap-3">
          <InputText name="name" type="text" value={user?.name} placeholder="nombre" className="h-12 pl-3 border border-b-2" required />
          <InputText name="lName" type="text" value={user?.lName} placeholder="apellido" className="h-12 pl-3 border border-b-2" required />
          <InputText name="username" type="text" value={user?.username} placeholder="usuario" className="h-12 pl-3 border border-b-2" required />
          <Dropdown name="roleId" value={selected} onChange={(e) => setSelected(e.value)} options={role} optionLabel="name" placeholder="seleccionar un rol" required />
          <InputText name="email" type="email" value={user?.email} placeholder="correo" className="h-12 pl-3 border border-b-2" required />
          <InputText name="password" type="password" value={user?.password} placeholder="password" className="h-12 pl-3 border border-b-2" required />
          <Button type="submit" label={isEdit ? "Actualizar Usuario" : "Agregar Usuario"} className="bg-blue-700 text-white w-96 h-12" />
        </form>
      </Dialog>
    </>
  );
}
