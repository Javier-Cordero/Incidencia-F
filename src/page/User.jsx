import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { useApi } from '../api/useApi'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useState } from 'react';
import Usuario from '../components/Usuario';
export default function User() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [isEdit, setIsEdit] = useState(null)
    const { user } = useApi()
    const header = (
        <div className='flex justify-around w-full h-12'>
            <IconField iconPosition="left" className='w-[90%]'>
                <InputIcon className="pi pi-search" />
                <InputText type="search" placeholder="Search" className='w-[30%] h-full pl-10' />
            </IconField>
            <Button label="Agregar usuario" onClick={() => { setSelected(null), setIsEdit(false), setVisible(true) }} />
        </div>
    )
    const action = (row) => (
        <div className='grid place-content-baseline gap-2'>
            <Button label="Editar" icon="pi pi-pencil" className='p-button-text' onClick={() => {setSelected(row),setIsEdit(true),setVisible(true)}} />
            <Button label="Eliminar" icon="pi pi-trash" className='p-button-text' onClick={() => eliminarUser(row.id)} />
        </div>
    )
    const imageBody = (rowData) => { return <img src={rowData.image} alt="Perfil" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> };
    const eliminarUser = (id) => { console.log('usuario eliminada') }
    return (
        <div>
            <DataTable value={user} paginator rows={10} header={header}>
                <Column field='userId' header="id" ></Column>
                <Column field='name' header="nombre" ></Column>
                <Column field='lName' header="apellido" ></Column>
                <Column field='username' header="usuario" ></Column>
                <Column field='role' header="rol" ></Column>
                <Column field='email' header="correo" ></Column>
                <Column body={imageBody} header="perfil" ></Column>
                <Column body={action} header="acciones" />
            </DataTable>
            <Usuario visible={visible} setVisible={setVisible} user={selected} isEdit={isEdit} />
        </div>
    )
}
