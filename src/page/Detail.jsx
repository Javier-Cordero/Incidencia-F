import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { useApi } from '../api/useApi'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useState, useEffect } from 'react';
import Detalle from '../components/Detalle'
export default function Detail() {
    const { detail, getDetail, deleteDetail } = useApi()
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [isEdit, setIsEdit] = useState(null)
    const handleDelete = async (row) => {
        await deleteDetail(row.detailsId)
        await getDetail()
    }
    useEffect(() => { getDetail() }, [])
    const handleDetail = async () => {
        await getDetail();
      };
    const header = (
        <div className='flex justify-around w-full h-12'>
            <IconField iconPosition="left" className='w-[80%]'>
                <InputIcon className="pi pi-search" />
                <InputText type="search" placeholder="Search" className='w-[30%] h-full pl-10' />
            </IconField>
        </div>
    )
    const action = (row) => (
        <div className='grid place-content-baseline gap-2'>
            <Button label="Editar" icon="pi pi-pencil" className='p-button-text' onClick={() => {setSelected(row),setIsEdit(true),setVisible(true)}} />
            <Button label="Eliminar" icon="pi pi-trash" className='p-button-text' onClick={() => handleDelete(row.id)} />
        </div>
    )
    return (
        <div>
            <DataTable value={detail} paginator rows={10} header={header}>
                <Column field='detailId' header='id' ></Column>
                <Column field='problema' header="problema" ></Column>
                <Column field='estado' header="estado" ></Column>
                <Column field='encargado' header='encargado' ></Column>
                <Column field='description' header="descripcion" ></Column>
                <Column body='fecha' header="fecha" ></Column>
                <Column body={action} header="acciones" />
            </DataTable>
            <Detalle visible={visible} setVisible={setVisible} detail={selected} isEdit={isEdit} onDetail={handleDetail} />
        </div>
    )
}
