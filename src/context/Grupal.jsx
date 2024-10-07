import { useMutation } from "@tanstack/react-query";
import { Children, createContext } from "react";
import { createReport } from "../api/ReportApi"
export const Contenido = createContext();
export const ContenidoProvider = ({children})=>{
    const crearReporte = useMutation({
        mutationKey:['crearReporte'],
        mutationFn: createReport,
        onError: (error) => console.error(error.message),
        onSuccess: () => console.log('Reporte creado exitosamente')
    })
    return (
        <Contenido.Provider value={{crearReporte}}>
            {children}
        </Contenido.Provider>
    )
}