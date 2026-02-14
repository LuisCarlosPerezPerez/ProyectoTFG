import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';

const NavbarAnonimo = () => {
    return (
        <nav style={s.nav}>
            {/* LOGO */}
            <Link to="/" style={s.logo}>
                <span style={{ fontSize: '28px' }}>🥐</span> 
                <div style={{ lineHeight: '1.1' }}>
                    <span style={{ display: 'block', fontSize: '20px' }}>Pastelería</span>
                    <span style={{ color: '#ad1457', fontSize: '16px', letterSpacing: '1px' }}>LAMA</span>
                </div>
            </Link>
            
            {/* LINKS CENTRALES */}
            <div style={s.navLinks}>
                <Link to="/productos" style={s.navItem}>Vitrina</Link>
                <Link to="/nosotros" style={s.navItem}>Nuestra Historia</Link>
            </div>

            {/* ACCESOS (DERECHA) */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                
                {/* ÁREA CLIENTES */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <Link to="/IniciarSesionCliente" style={s.btnCliente}>
                        Entrar Cliente
                    </Link>
                    <Link to="/RegistrarCliente" style={s.linkPeque}>
                        Crear Cuenta
                    </Link>
                </div>

                {/* SEPARADOR VIRTUAL */}
                <div style={{ width: '1px', height: '35px', backgroundColor: '#f2e8cf' }}></div>

                {/* ÁREA STAFF */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <Link to="/IniciarSesionEmpleado" style={s.btnStaff}>
                        Staff Login
                    </Link>
                    <Link to="/RegistrarEmpleado" style={{ ...s.linkPeque, color: '#5d4037', fontWeight: 'bold' }}>
                        Nuevo Empleado
                    </Link>
                </div>

            </div>
        </nav>
    );
};

// --- ESTILOS EN EL MISMO ARCHIVO (TIPADOS PARA TS) ---
const s: Record<string, CSSProperties> = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 50px',
        height: '85px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #fce4ec',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10000,
        boxSizing: 'border-box',
        fontFamily: "'Quicksand', sans-serif",
    },
    logo: {
        textDecoration: 'none',
        color: '#5d4037',
        fontWeight: '900',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    navLinks: {
        display: 'flex',
        gap: '35px',
        alignItems: 'center',
    },
    navItem: {
        textDecoration: 'none',
        color: '#5d4037',
        fontWeight: '700',
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    btnCliente: {
        textDecoration: 'none',
        backgroundColor: '#d81b60',
        color: '#fff',
        padding: '8px 20px',
        borderRadius: '50px',
        fontSize: '12.5px',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(216, 27, 96, 0.2)',
    },
    btnStaff: {
        textDecoration: 'none',
        backgroundColor: '#5d4037',
        color: '#fff',
        padding: '8px 20px',
        borderRadius: '50px',
        fontSize: '12.5px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    linkPeque: {
        fontSize: '11px',
        textAlign: 'center',
        color: '#bc6c25',
        textDecoration: 'none',
        marginTop: '2px',
    }
};

export default NavbarAnonimo;