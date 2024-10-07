import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";
import { useRef, useContext } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Avatar } from 'primereact/avatar';
import { AuthContext } from '../context/AuthContext';
export default function Layout() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const op = useRef(null);
    const userData = user && user.length > 0 ? user[0] : null;
    const getMenuItems = () => {
        if (!userData) return [];
        switch (userData[0].role) {
            case 'administrador':
                return [
                    {
                        label: 'Usuario',
                        icon: 'pi pi-user',
                        command: () => navigate("/usuario"),
                    },
                    {
                        label: 'Reporte',
                        icon: 'pi pi-cog',
                        command: () => navigate("/report"),
                    },
                    {
                        label: 'Detalle',
                        icon: 'pi pi-video',
                        command: () => navigate("/detail"),
                    }
                ];
            case 'concerje':
                return [
                    {
                        label: 'Reportes',
                        icon: 'pi pi-file',
                        command: () => navigate("/report"),
                    },
                    {
                        label: 'Detalles de Reportes',
                        icon: 'pi pi-video',
                        command: () => navigate("/detail"),
                    },
                ];
            case 'usuario':
                return [
                    {
                        label: 'Reporte',
                        icon: 'pi pi-file',
                        command: () => navigate("/report"),
                    },
                ];
            default:
                return [];
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        console.clear();
        navigate('/');
    };
    const items = getMenuItems();
    const startContent = userData ? (
        <div className='flex items-center justify-around w-60 h-16'>
            <label className='text-[20px] font-bold'>{userData[0].name} {userData[0].lName}</label>
            <Avatar className='size-14' image={userData[0].image} shape="circle" onClick={(e) => op.current.toggle(e)} alt="User Avatar" />
            <OverlayPanel ref={op}>
                <div><i className='pi pi-user'></i> My profile</div>
                <div onClick={handleLogout}><i className='pi pi-sign-out'></i> Logout</div>
            </OverlayPanel>
        </div>
    ) : (<span>Loading...</span>);
    return (
        <main>
            <aside>
                <Menubar model={items} end={startContent} />
            </aside>
            <div>
                <Outlet />
            </div>
        </main>
    );
}
Layout.propTypes = {}; // Ya no es necesario
