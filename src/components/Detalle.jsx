import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useApi } from "../api/useApi";
import { useState, useEffect, useRef } from "react";
export default function Detalle({ visible, setVisible, detail, isEdit }) {
  const { report, createDetail, updateDetail, getDetail } = useApi();
  const [reported, setReported] = useState("");
  const [estado, setEstado] = useState("");
  const [encargado, setEncargado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [date, setDate] = useState("");
  const toast = useRef(null);
  useEffect(() => {
    if (isEdit && detail) {
      setReported(detail.reportId);
      setEstado(detail.stateId);
      setEncargado(detail.userId);
      setDescripcion(detail.description);
      setDate(detail.fecha);
    } else {
      setReported("");
      setEstado("");
      setEncargado("");
      setDescripcion("");
      setDate("");
    }
    getDetail();
  }, [isEdit, detail]);
  const handle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const detalle = Object.fromEntries(formData);
    const formatedData = new Date(detalle.fecha).toISOString().split("T")[0];
    detalle.fecha = formatedData || new Date().toISOString().split("T")[0];
    try {
      let rs;
      if (isEdit) {
        rs = await updateDetail(detail.detailsId, detalle);
      } else {
        rs = await createDetail(detalle);
      }
      setVisible(false);
      await getDetail();
      if (rs && rs.success) {
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: isEdit ? "datos actualizados" : "detalle creado",
          life: 3000,
        });
      }
    } catch (error) {
      let errorMessage = "Intente de nuevo";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
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
        header={isEdit ? "editar detalle" : "agregar detalle"}
        visible={visible}
        modal={false}
        style={{ width: "500px", height: "80%" }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handle} className="grid gap-3">
          {/* <InputText
            type="text"
            name="reportId"
            value={reported}
            onChange={(e) => setReported(e.target.value)}
            placeholder="problema"
            className="h-12 pl-3 border border-b-2"
          /> */}
          <Dropdown
          name="reportId"
          value={reported}
          onChange={e=>setReported(e.target.value)}
          options={report}
          optionLabel="type"
          optionValue="reportId"
          placeholder="problema"
          />
          <InputText
            type="text"
            name="userId"
            value={encargado}
            onChange={(e) => setEncargado(e.target.value)}
            placeholder="encargado"
            className="h-12 pl-3 border border-b-2"
          />
          <InputTextarea
            type="text"
            name="description"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="descripcion"
            rows={5}
            cols={30}
            className="pl-3 border border-b-2"
          />
          <InputText
            type="date"
            name="fecha"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="fecha"
            className="h-12 pl-3 border border-b-2"
          />
          <Button label="Agregar Detalle" className="bg-blue-700 w-96 h-12" />
        </form>
      </Dialog>
    </>
  );
}
