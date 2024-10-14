import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { useApi } from '../api/useApi'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useState } from 'react';
import Detalle from '../components/Detalle'
export default function Detail() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [isEdit, setIsEdit] = useState(null)
    const { detail } = useApi()
    const header = (
        <div className='flex justify-around w-full h-12'>
            <IconField iconPosition="left" className='w-[80%]'>
                <InputIcon className="pi pi-search" />
                <InputText type="search" placeholder="Search" className='w-[30%] h-full pl-10' />
            </IconField>
            <Button label="Detalle" onClick={() => { setSelected(null), setIsEdit(false), setVisible(true) }} className='w-[10%]' />
        </div>
    )
    const action = (row) => (
        <div className='grid place-content-baseline gap-2'>
            <Button label="Editar" icon="pi pi-pencil" className='p-button-text' onClick={() => {setSelected(row),setIsEdit(true),setVisible(true)}} />
            <Button label="Eliminar" icon="pi pi-trash" className='p-button-text' onClick={() => eliminar(row.id)} />
        </div>
    )
    const eliminar = (id) => { console.log('eliminar detalle') }
    return (
        <div>
            <DataTable value={detail} paginator rows={10} header={header}>
                <Column field='detailsId' header='id' ></Column>
                <Column field='username' header="usuario" ></Column>
                <Column field='reportId' header="problema" ></Column>
                <Column field='stateId' header='estado' ></Column>
                <Column field='description' header="descripcion" ></Column>
                <Column body='fecha' header="fecha" ></Column>
                <Column body={action} header="acciones" />
            </DataTable>
            <Detalle visible={visible} setVisible={setVisible} detail={selected} isEdit={isEdit} />
        </div>
    )
}
