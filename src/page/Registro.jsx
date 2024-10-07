
import { useState } from "react";
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
export default function Registro() {
    const [value, setValue] = useState({
        name: '',
        l_name: '',
        username: '',
        rol: '',
        email: '',
        password: '',
        image: null
    });
    const roles = ['administrador', 'concerje', 'usuario']
    const footer = (<Button label="REGISTRAR" className="p-button-raised h-10 w-full" />)
    const handleChange=(e) =>{
        const {name,value:newValue} = e.target
        setValue((prevValue) => ({ ...prevValue, [name]: newValue }));
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setValue((prevValue) => ({...prevValue, image: imageUrl }));
        }
    };
    return (
        <div className="card flex justify-center">
            <Card title={'Registrar usuario'} footer={footer} >
                <div className="grid gap-3">
                    <InputText className="h-10 rounded-lg text-lg pl-2" type="text" name="name" placeholder="nombre" value={value.name} onChange={handleChange} required />
                    <InputText className="h-10 rounded-lg text-lg pl-2" type="text" name="l_name" placeholder="apellido" value={value.l_name} onChange={handleChange} required />
                    <InputText className="h-10 rounded-lg text-lg pl-2" type="text" name="username" placeholder="usuario" value={value.username} onChange={handleChange} required />
                    <Dropdown className="h-10 rounded-lg text-lg flex items-center" value={value.rol} options={roles.map(role => ({ label: role, value: role }))} onChange={(e) => setValue((prevValue) => ({ ...prevValue, rol: e.value }))} placeholder="rol" required />
                    <InputText className="h-10 rounded-lg text-lg pl-2" type="text" name="email" placeholder="correo" value={value.email} onChange={handleChange} required />
                    <InputText className="h-10 rounded-lg text-lg pl-2" type="password" name="password" placeholder="password" value={value.password} onChange={handleChange} required />
                    <InputText className="rounded-lg p-2" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="w-[100%] h-[100%] flex justify-center items-center overflow-hidden">
                    {value.image && <img src={value.image} alt="Vista previa" className="max-w-[100px] max-h-[100px] object-cover" />}
                </div>
            </Card>
        </div>
    )
}
