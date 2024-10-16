import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { useApi } from '../api/useApi'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useEffect, useState } from 'react';
import Reporte from '../components/Reporte';
export default function Report() {
    const { report, getReport, deleteReport } = useApi()
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [isEdit, setIsEdit] = useState(null)
    const handleDelete = async (row) => {
        await deleteReport(row.reportId)
        await getReport()
    }
    useEffect(() => { getReport() }, [])
    const handleReport = async () => {
        await getReport();
      };
    const header = (
        <div className='flex justify-around w-full h-12'>
            <IconField iconPosition="left" className='w-[80%]'>
                <InputIcon className="pi pi-search" />
                <InputText type="search" placeholder="Search" className='w-[30%] h-full pl-10' />
            </IconField>
            <Button label="Agregar reportar" onClick={() => { setSelected(null), setIsEdit(false), setVisible(true) }} className='w-[10%]' />
        </div>
    )
    const action = (row) => (
        <div className='grid place-content-baseline gap-2'>
            <Button label="Editar" icon="pi pi-pencil" className='p-button-text' onClick={() => { setSelected(row), setIsEdit(true), setVisible(true) }} />
            <Button label="Eliminar" icon="pi pi-trash" className='p-button-text' onClick={() => handleDelete(row)} />
        </div>
    )
    // const imageBody = (rowData) => { return <img src={rowData.image} alt="problema" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> };
    return (
        <div>
            <DataTable value={report} paginator rows={10} header={header}>
                <Column field='reportId' header="id" ></Column>
                <Column field='username' header="usuario" ></Column>
                <Column field='type' header="problema" ></Column>
                <Column field='description' header="descripcion" ></Column>
                {/* <Column field={imageBody} header="imagen" ></Column> */}
                <Column field='fecha' header="fecha" ></Column>
                <Column body={action} header="acciones" />
            </DataTable>
            <Reporte visible={visible} setVisible={setVisible} report={selected} isEdit={isEdit} onReport={handleReport} />
        </div>
    )
}
