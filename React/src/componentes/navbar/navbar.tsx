import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import NavbarEmpleado from '../navbars/NavbarEmpleado';
import NavbarCliente from '../navbars/NavbarCliente';
import NavbarAnonimo from '../navbars/NavbarAnonimo';
/*import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import RegistroModal from '../registro/registroComponente';

const Navbar = () => {
    // Estado para guardar al usuario actual
    const [usuario, setUsuario] = useState<any>(null);

    useEffect(() => {
        // 1. Al cargar la web, miramos el LocalStorage
        const userStored = authService.getUsuario();
        setUsuario(userStored);
    }, []);

    // 2. Lógica de selección de Navbar
    if (!usuario) {
        return <NavbarAnonimo />;
    }

    if (usuario.rol === 'admin' || usuario.rol === 'empleado') {
        return <NavbarEmpleado usuario={usuario} />;
    }

    if (usuario.rol === 'cliente') {
        return <NavbarCliente usuario={usuario} />;
    }

    // Por defecto, si algo falla, anónimo
    return <NavbarAnonimo />;
};

export default Navbar;
// Estilos del Navbar
const navStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', height: '70px', backgroundColor: '#fff', borderBottom: '2px solid #f2e8cf', position: 'fixed', top: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', color: '#5d4037', textDecoration: 'none' };
const linksWrapperStyle: React.CSSProperties = { display: 'flex', gap: '20px' };
const navBtnStyle: React.CSSProperties = { textDecoration: 'none', color: '#5d4037', fontWeight: 600 };
const btnFicharStyle = { padding: '8px 16px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' };
const userBadgeStyle = { backgroundColor: '#fdfaf5', padding: '6px 14px', borderRadius: '20px', color: '#bc6c25', border: '1px solid #bc6c25' };
const loginBtnStyle = { textDecoration: 'none', color: '#5d4037', border: '1px solid #5d4037', padding: '5px 15px', borderRadius: '5px' };

export default Navbar;*/
