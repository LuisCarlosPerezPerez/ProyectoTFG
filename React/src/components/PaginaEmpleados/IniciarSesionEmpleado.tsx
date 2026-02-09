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
                
                // --- LÓGICA DE ROLES SEGÚN TU BASE DE DATOS ---
                // Importante: Usamos 'admininistrador' con la errata exacta de tu DB
                const esAdmin = data.admininistrador == 1;

                const usuarioLogueado = {
                    ...data,
                    // Normalizamos un poco los datos para que el resto de la app sea más fácil de leer
                    rol: esAdmin ? 'admin' : 'empleado',
                    admininistrador: esAdmin ? 1 : 0 
                };

                // Guardamos en el localStorage a través del servicio
                authService.login(usuarioLogueado);

                alert(esAdmin ? "Acceso concedido: Panel de Administrador" : "Bienvenido al equipo, " + data.usuario);
                
                // Redirigimos a la vitrina
                navegar('/productos');
                
                // Forzamos recarga para que el Navbar detecte al nuevo usuario logueado
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
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.logoCircle}>👨‍🍳</div>
                <h2 style={styles.titulo}>Pastelería Lama</h2>
                <p style={styles.subtitulo}>Panel de Gestión Staff</p>
                
                <form onSubmit={loginEmpleado} style={styles.form}>
                    <div style={styles.group}>
                        <label style={styles.label}>Nombre de Usuario</label>
                        <input 
                            type="text" 
                            name="usuario" 
                            placeholder="Tu usuario" 
                            onChange={manejarCambio} 
                            style={styles.input}
                            required
                        />
                    </div>
                    
                    <div style={styles.group}>
                        <label style={styles.label}>Contraseña Secreta</label>
                        <input 
                            type="password" 
                            name="contraseña" 
                            placeholder="••••••••" 
                            onChange={manejarCambio} 
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.button}>Acceder al Obrador</button>
                </form>
                
                <button onClick={() => navegar('/')} style={styles.btnVolver}>
                    ← Volver a la vitrina pública
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#fdfaf5' 
    },
    card: { 
        padding: '40px', 
        backgroundColor: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 10px 30px rgba(93, 64, 55, 0.15)', 
        width: '350px', 
        textAlign: 'center' as const,
        border: '1px solid #f2e8cf'
    },
    logoCircle: { fontSize: '3.5rem', marginBottom: '10px' },
    titulo: { color: '#3e2723', margin: '0', fontSize: '1.8rem', fontWeight: 'bold' as const },
    subtitulo: { color: '#bc6c25', marginBottom: '30px', fontSize: '0.9rem', fontWeight: 600 },
    form: { textAlign: 'left' as const },
    group: { marginBottom: '20px' },
    label: { 
        display: 'block', 
        color: '#5d4037', 
        fontWeight: 'bold' as const, 
        marginBottom: '8px', 
        fontSize: '0.85rem' 
    },
    input: { 
        width: '100%', 
        padding: '12px', 
        borderRadius: '8px', 
        border: '1px solid #d7ccc8', 
        boxSizing: 'border-box' as const, 
        fontSize: '1rem',
        outlineColor: '#bc6c25'
    },
    button: { 
        width: '100%', 
        padding: '14px', 
        backgroundColor: '#3e2723', 
        color: '#f2e8cf', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        fontWeight: 'bold' as const, 
        marginTop: '10px', 
        fontSize: '1rem',
        transition: 'background 0.3s'
    },
    btnVolver: { 
        marginTop: '25px', 
        background: 'none', 
        border: 'none', 
        color: '#8d6e63', 
        cursor: 'pointer', 
        textDecoration: 'underline', 
        fontSize: '0.85rem' 
    }
};

export default IniciarSesionEmpleado;