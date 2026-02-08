import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const paginaInicio = () => {
    const usuario = authService.getUsuario();

    return (
        <div style={containerStyle}>
            <div style={heroStyle}>
                <h1 style={titleStyle}>🌙 La Dulce Noche 🌙</h1>
                <p style={subtitleStyle}>Donde los sueños se vuelven azúcar.</p>
                
                {/* Mensaje personalizado según el rol */}
                <div style={infoCardStyle}>
                    {!usuario ? (
                        <>
                            <p>Bienvenido, visitante. Explora nuestra vitrina y endúlzate el día.</p>
                            <Link to="/productos" style={btnStyle}>Ver Vitrina</Link>
                        </>
                    ) : usuario.rol === 'admin' || usuario.rol === 'empleado' ? (
                        <>
                            <p>Hola, <strong>{usuario.nombre}</strong>. Tienes turno en el obrador.</p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <Link to="/relacion-pro-ing" style={btnStyle}>Gestionar Recetas</Link>
                                <Link to="/ingredientes" style={{ ...btnStyle, backgroundColor: '#5d4037' }}>Ver Stock</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>¡Qué alegría verte de nuevo, {usuario.nombre}!</p>
                            <Link to="/productos" style={btnStyle}>Hacer un Pedido</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Estilos rápidos para la Home
const containerStyle: React.CSSProperties = {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1326&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    color: 'white'
};

const heroStyle = {
    padding: '40px',
    borderRadius: '15px',
    backgroundColor: 'rgba(62, 39, 35, 0.85)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    border: '1px solid #bc6c25'
};

const titleStyle = { fontSize: '3rem', marginBottom: '10px', color: '#ffb703' };
const subtitleStyle = { fontSize: '1.2rem', marginBottom: '30px', fontStyle: 'italic' };
const infoCardStyle = { fontSize: '1.1rem', lineHeight: '1.6' };
const btnStyle = {
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 25px',
    backgroundColor: '#bc6c25',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: '0.3s'
};

export default paginaInicio;