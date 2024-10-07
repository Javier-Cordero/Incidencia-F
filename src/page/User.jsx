import { TreeTable } from 'primereact/treetable'
import { Column } from 'primereact/column'
import { useState } from 'react'
import { useApi } from '../api/useApi'
export default function User() {
    const {user}=useApi()
    console.log(user)
    const [global, setGlobal] = useState('')
    const [mode, setMode] = useState('')
    const [options, setOptions] = useState('')
    return (
        <div>
            <TreeTable value={user}>
                <Column field='id' ></Column>
                <Column field='nombre' ></Column>
                <Column field='apellido' ></Column>
                <Column field='usuario' ></Column>
                <Column field='rol' ></Column>
                <Column field='correo' ></Column>
                <Column field='image' ></Column>
            </TreeTable>
        </div>
    )
}
