import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const IniciarSesionEmpleado = () => {
    const navegar = useNavigate();
    const [credenciales, setCredenciales] = useState({ usuario: '', contraseña: '' });

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    const loginEmpleado = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const respuesta = await fetch('/api/Empleado/IniciarSesionEmpleado', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credenciales),
            });

            if (respuesta.ok) {
                const data = await respuesta.json();
                const esAdmin = data.admininistrador == 1;

                const usuarioLogueado = {
                    ...data,
                    rol: esAdmin ? 'admin' : 'empleado',
                    admininistrador: esAdmin ? 1 : 0 
                };

                authService.login(usuarioLogueado);
                alert(esAdmin ? "Acceso concedido: Panel de Administrador" : "Bienvenido al equipo, " + data.usuario);
                
                navegar('/productos');
                window.location.reload();
            } else {
                alert("Credenciales de staff incorrectas o usuario no encontrado.");
            }
        } catch (error) {
            console.error("Error en el login de empleado:", error);
            alert("Error de conexión con el servidor de Pastelería Lama.");
        }
    };

    return (
        <main style={Estilos.contenedor}>
            <section style={Estilos.tarjeta} aria-labelledby="staff-title">

                <div style={Estilos.barraSuperior} aria-hidden="true"></div>
                
                <div style={Estilos.iconoContenedor} aria-hidden="true">
                    <span>👩‍🍳</span>
                </div>
                
                <header style={Estilos.header}>
                    <h1 id="staff-title" style={Estilos.titulo}>
                        Pastelería <span style={{ color: '#E91E63' }}>Lama</span>
                    </h1>
                    <p style={Estilos.subtitulo}>PANEL DE GESTIÓN & STAFF</p>
                    <div style={Estilos.lineaDecorativa} aria-hidden="true"></div>
                </header>
                
                <form onSubmit={loginEmpleado} style={Estilos.formulario} aria-label="Acceso restringido para personal">
                    <div style={Estilos.campo}>
                        <label htmlFor="usuario-staff" style={Estilos.etiqueta}>USUARIO DEL OBRADOR</label>
                        <input 
                            id="usuario-staff"
                            type="text" 
                            name="usuario" 
                            placeholder="Nombre de usuario" 
                            onChange={manejarCambio} 
                            style={Estilos.input}
                            required
                        />
                    </div>
                    
                    <div style={Estilos.campo}>
                        <label htmlFor="clave-staff" style={Estilos.etiqueta}>CONTRASEÑA INTERNA</label>
                        <input 
                            id="clave-staff"
                            type="password" 
                            name="contraseña" 
                            placeholder="••••••••" 
                            onChange={manejarCambio} 
                            style={Estilos.input}
                            required
                        />
                    </div>

                    <button type="submit" style={Estilos.botonAcceso}>
                        ENTRAR AL PANEL INTERNO
                    </button>
                </form>
                
                <nav aria-label="Navegación de retorno" style={Estilos.footerNav}>
                    <button 
                        onClick={() => navegar('/')} 
                        style={Estilos.botonLink}
                    >
                        ← Volver a la vitrina pública
                    </button>
                </nav>
            </section>
        </main>
    );
};

const Estilos: { [key: string]: React.CSSProperties } = {
    contenedor: { 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#FFFFFF',
        backgroundImage: 'linear-gradient(135deg, #fff5f8 0%, #ffffff 100%)',
        fontFamily: "'Montserrat', sans-serif",
        padding: '20px'
    },
    tarjeta: { 
        backgroundColor: '#ffffff', 
        borderRadius: '24px', 
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)', 
        width: '100%',
        maxWidth: '400px', 
        textAlign: 'center',
        border: '1px solid #fce4ec',
        overflow: 'hidden',
        position: 'relative'
    },
    barraSuperior: {
        height: '8px',
        backgroundColor: '#E91E63',
        width: '100%'
    },
    iconoContenedor: {
        marginTop: '30px',
        marginBottom: '10px',
        fontSize: '3.5rem',
        filter: 'drop-shadow(0 5px 10px rgba(233, 30, 99, 0.2))'
    },
    header: {
        padding: '0 40px',
        marginBottom: '30px'
    },
    titulo: { 
        color: '#333', 
        margin: '0', 
        fontSize: '2rem', 
        fontWeight: '800',
        letterSpacing: '-1px'
    },
    subtitulo: { 
        color: '#E91E63', 
        fontSize: '0.75rem', 
        margin: '8px 0 0 0',
        fontWeight: '700',
        letterSpacing: '2px'
    },
    lineaDecorativa: {
        width: '30px',
        height: '4px',
        backgroundColor: '#fce4ec',
        margin: '15px auto 0',
        borderRadius: '10px'
    },
    formulario: { 
        padding: '0 40px',
        textAlign: 'left' 
    },
    campo: { 
        marginBottom: '20px' 
    },
    etiqueta: { 
        display: 'block', 
        color: '#333', 
        fontWeight: '700', 
        marginBottom: '8px', 
        fontSize: '0.75rem',
        letterSpacing: '0.5px'
    },
    input: { 
        width: '100%', 
        padding: '14px 16px', 
        borderRadius: '12px', 
        border: '2px solid #f0f0f0', 
        boxSizing: 'border-box', 
        fontSize: '1rem',
        backgroundColor: '#fafafa',
        color: '#333',
        outline: 'none',
        transition: 'all 0.3s ease'
    },
    botonAcceso: { 
        width: '100%', 
        padding: '18px', 
        backgroundColor: '#333', 
        color: '#ffffff', 
        border: 'none', 
        borderRadius: '14px', 
        cursor: 'pointer', 
        fontWeight: '700', 
        fontSize: '0.95rem',
        marginTop: '10px',
        letterSpacing: '1px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.2s ease'
    },
    footerNav: {
        backgroundColor: '#fff9fa',
        marginTop: '35px',
        padding: '20px 40px',
        borderTop: '1px solid #fce4ec'
    },
    botonLink: { 
        background: 'none', 
        border: 'none', 
        color: '#666', 
        cursor: 'pointer', 
        textDecoration: 'none', 
        fontSize: '0.85rem',
        fontWeight: '600'
    }
};

export default IniciarSesionEmpleado;