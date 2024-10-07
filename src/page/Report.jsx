import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button"
import { useState } from "react"
export default function Report() {
    const [value, setValue] = useState({
        type: '',
        description: '',
        image: null
    });
    const handleChange = (e) => {
        const { name, value: newValue } = e.target;
        setValue((prevValue) => ({ ...prevValue, [name]: newValue }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setValue((prevValue) => ({ ...prevValue, image: imageUrl }));
            }
        }
    };
    const footer = (<Button label="REPORTAR" className="p-button-raised h-10 w-full" />);
    return (
        <div className="flex justify-center">
            <Card title={'Reportar incidencias'} footer={footer}>
                <div className="grid gap-3">
                    <InputText className="h-10 rounded-lg text-lg pl-2" type="text" name="type" placeholder="problema" value={value.type} onChange={handleChange} required />
                    <InputTextarea className="rounded-lg text-lg pl-2" type='text' name="description" placeholder="descripcion" value={value.description} rows={5} cols={30} onChange={handleChange} required />
                    <InputText className="rounded-lg p-2" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="w-[100%] h-[100%] flex justify-center items-center overflow-hidden">
                    {value.image && <img src={value.image} alt="Vista previa" className="max-w-[150px] max-h-[200px] object-cover" />}
                </div>
            </Card>
        </div>
    );
}
