import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
export default function Usuario({ visible, setVisible, user, isEdit }) {
    return (
        <Dialog header={isEdit ? "editar usuario":"agregar usuario" } visible={visible} modal={false} style={{ width: '500px', height: '80%' }} onHide={() => setVisible(false)}>
            <div className='grid gap-3'>
                <h3>Nuevo Usuario</h3>
                <InputText value={user?.name} placeholder='nombre' className='h-12 pl-3 border border-b-2' />
                <InputText value={user?.lName} placeholder='apellido' className='h-12 pl-3 border border-b-2' />
                <InputText value={user?.username} placeholder='usuario' className='h-12 pl-3 border border-b-2' />
                <InputText value={user?.role} placeholder='rol' className='h-12 pl-3 border border-b-2' />
                <InputText value={user?.email} placeholder='correo' className='h-12 pl-3 border border-b-2' />
                <InputText value={user?.password} placeholder='password' className='h-12 pl-3 border border-b-2' />
            </div>
            <div className='grid place-content-center'>
                <Button label='Agregar Usuario' className='bg-blue-700 w-96 h-12' />
            </div>
        </Dialog>
    )
}
