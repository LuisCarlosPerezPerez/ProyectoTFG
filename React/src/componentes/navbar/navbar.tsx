import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import NavbarEmpleado from '../navbars/NavbarEmpleado';
import NavbarCliente from '../navbars/NavbarCliente';
import NavbarAnonimo from '../navbars/NavbarAnonimo';

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