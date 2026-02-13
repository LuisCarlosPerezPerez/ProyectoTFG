import React from 'react';
import { Link } from 'react-router-dom';

const NavbarAnonimo = () => {
    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>🥐 Pasteleria Lama</Link>
            
            <div style={linksWrapperStyle}>
                <Link to="/productos" style={navBtnStyle}>Vitrina</Link>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Lógica para Clientes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <Link to="/IniciarSesionCliente" style={loginBtnStyle}>Entrar Cliente</Link>
                    <Link to="/RegistrarCliente" style={{ fontSize: '11px', textAlign: 'center', color: '#bc6c25', textDecoration: 'none' }}>Crear Cuenta</Link>
                </div>

                <div style={{ width: '1px', height: '30px', backgroundColor: '#ddd' }}></div>

                {/* Lógica para Empleados */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <Link to="/IniciarSesionEmpleado" style={{ ...loginBtnStyle, backgroundColor: '#5d4037', color: 'white' }}>
                        Staff Login
                    </Link>
                    <Link to="/RegistrarEmpleado" style={{ fontSize: '11px', textAlign: 'center', color: '#5d4037', fontWeight: 'bold', textDecoration: 'none' }}>
                        Nuevo Empleado
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const navStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', height: '70px', backgroundColor: '#fff', borderBottom: '2px solid #f2e8cf', position: 'fixed', top: 0, width: '100%', zIndex: 9999, boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', color: '#5d4037', textDecoration: 'none' };
const linksWrapperStyle: React.CSSProperties = { display: 'flex', gap: '20px' };
const navBtnStyle: React.CSSProperties = { textDecoration: 'none', color: '#5d4037', fontWeight: 600 };
const loginBtnStyle: React.CSSProperties = { textDecoration: 'none', color: '#5d4037', border: '1px solid #5d4037', padding: '4px 10px', borderRadius: '5px', fontSize: '13px', textAlign: 'center' };

export default NavbarAnonimo;