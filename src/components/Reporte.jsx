import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useApi } from "../api/useApi";
export default function Reporte({ visible, setVisible, report, isEdit }) {
  const { createReport, updateReport } = useApi();
  const [tipo, setTipo]=useState("")
  const [descripcion, setDescripcion] = useState("");
  const [date, setDate] = useState("");
  const toast = useRef(null);
  useEffect(() => {
    if (isEdit && report) {
      setTipo(report.type);
      setDescripcion(report.description);
      if(report.fecha){
        const formatoFecha = new Date(report.fecha).toISOString().split("T")[0]
        setDate(formatoFecha)
      } else{console.log("vacio")}
      setDate(report.fecha);
    } else {
      setTipo("");
      setDescripcion("");
      setDate("");
    }
  }, [isEdit, report]);
  const handle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reporte = Object.fromEntries(formData);
    const formatedData = new Date(reporte.fecha).toISOString().split("T")[0];
    reporte.fecha = formatedData || new Date().toISOString().split("T")[0];
    try {
      let rs;
      if (isEdit) {
        rs = await updateReport(report.reportId, reporte);
      } else {
        rs = await createReport(reporte);
      }

      if (rs && rs.success) {
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: isEdit ? "datos actualizados" : "reporte creado",
          life: 3000,
        });
        setVisible(false);
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
        header={isEdit ? "editar reporte" : "reportar"}
        visible={visible}
        modal={false}
        style={{ width: "500px", height: "80%" }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handle} className="grid gap-3">
          <InputText
            name="type"
            type="text"
            value={tipo}
            onChange={e=> setTipo(e.target.value)}
            placeholder="problema"
            required
            className="h-12 pl-3 border-2"
          />
          <InputTextarea
            name="description"
            type="text"
            value={descripcion}
            onChange={e=> setDescripcion(e.target.value)}
            placeholder="descripcion"
            rows={5}
            cols={30}
            required
            className="pl-3 border-2"
          />
          <InputText
            name="fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="h-12 pl-3 border-2"
          />
          <Button
            label="Reportar"
            className="bg-blue-700 text-white w-96 h-12"
          />
        </form>
      </Dialog>
    </>
  );
}
