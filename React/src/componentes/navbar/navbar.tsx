import React from 'react';
import NavbarAnonimo from '../navbars/NavbarAnonimo';
<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import RegistroModal from '../registro/registroComponente';
=======
import NavbarCliente from '../navbars/NavbarCliente';
import NavbarEmpleado from '../navbars/NavbarEmpleado';
import { authService } from '../../services/authService';
>>>>>>> 2fb7aa14c121eb3353df187bb3a8a8b763a8a460

const Navbar = () => {
    const usuario = authService.getUsuario();
    const estaLogueado = authService.isLogged();
    const esStaff = authService.esStaff();

    if (!estaLogueado) {
        return <NavbarAnonimo />;
    }

    if (esStaff) {
        return <NavbarEmpleado usuario={usuario} />;
    }

    return <NavbarCliente usuario={usuario} />;
};

<<<<<<< HEAD
export default Navbar;
// Estilos del Navbar
const navStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', height: '70px', backgroundColor: '#fff', borderBottom: '2px solid #f2e8cf', position: 'fixed', top: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', color: '#5d4037', textDecoration: 'none' };
const linksWrapperStyle: React.CSSProperties = { display: 'flex', gap: '20px' };
const navBtnStyle: React.CSSProperties = { textDecoration: 'none', color: '#5d4037', fontWeight: 600 };
const btnFicharStyle = { padding: '8px 16px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' };
const userBadgeStyle = { backgroundColor: '#fdfaf5', padding: '6px 14px', borderRadius: '20px', color: '#bc6c25', border: '1px solid #bc6c25' };
const loginBtnStyle = { textDecoration: 'none', color: '#5d4037', border: '1px solid #5d4037', padding: '5px 15px', borderRadius: '5px' };

=======
export default Navbar;
>>>>>>> 2fb7aa14c121eb3353df187bb3a8a8b763a8a460
