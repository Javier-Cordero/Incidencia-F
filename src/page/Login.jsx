import { Card } from "primereact/card";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loginMutation } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginMutation.mutate({ username, password, });
    } catch (error) { console.error(error.message) }
  };
  const header = <img src="incidencias.png" alt="logo" />;
  return (
    <form onSubmit={handleLogin} className="flex justify-center items-center h-screen">
      <Card title={"iniciar secion"} header={header} className="w-96 grid gap-3">
        <div className="grid gap-3">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-user"> </InputIcon>
            <InputText placeholder="usuario" type="text" name="username" onChange={e => setUsername(e.target.value)} className="pl-10" />
          </IconField>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-lock"> </InputIcon>
            <InputText placeholder="contraseña" type="password" name="password" onChange={e => setPassword(e.target.value)} className="pl-10" />
          </IconField>
        </div>
        <Button label="Acceder" type="submit" className="p-button-raised h-10 w-full mt-5" />
      </Card>
    </form>
  );
}
