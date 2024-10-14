import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
export default function Reporte({ visible, setVisible, report, isEdit }) {
    return (
        <Dialog header={isEdit ? "editar reporte":"reportar" } visible={visible} modal={false} style={{ width: '500px', height: '80%' }} onHide={() => setVisible(false)}>
            <div className='grid gap-3'>
                <InputText value={report?.type} placeholder='problema' className='h-12 pl-3 border border-b-2' />
                <InputTextarea value={report?.description} placeholder='descripcion' rows={5} cols={30} className='pl-3 border border-b-2' />
                <InputText value={report?.image} placeholder='imagen' className='h-12 pl-3 border border-b-2' />
                <InputText value={report?.fecha} placeholder='fecha' className='h-12 pl-3 border border-b-2' />
            </div>
            <div className='grid place-content-center h-32'>
                <Button label='Reportar' className='bg-blue-700 text-white w-96 h-12' />
            </div>
        </Dialog>
    )
}
