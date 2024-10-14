import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
export default function Detalle({ visible, setVisible, detail, isEdit }) {
    return (
        <Dialog header={isEdit ? "editar usuario" : "agregar usuario"} visible={visible} modal={false} style={{ width: '500px', height: '80%' }} onHide={() => setVisible(false)}>
            <div className='grid gap-3'>
                <InputText value={detail?.type} placeholder='problema' className='h-12 pl-3 border border-b-2' />
                <InputTextarea value={detail?.description} placeholder='descripcion' rows={5} cols={30} className='pl-3 border border-b-2' />
                <InputText value={detail?.image} placeholder='imagen' className='h-12 pl-3 border border-b-2' />
                <InputText value={detail?.fecha} placeholder='fecha' className='h-12 pl-3 border border-b-2' />
            </div>
            <div className='grid place-content-center h-32'>
                <Button label='Agregar Usuario' className='bg-blue-700 w-96 h-12' />
            </div>
        </Dialog>
    )
}
