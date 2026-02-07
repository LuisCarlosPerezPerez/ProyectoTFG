import React from 'react';

export const navStyles = {
    nav: {
        backgroundColor: '#3e2723', // Marrón chocolate oscuro
        height: '70px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        borderBottom: '4px solid #bc6c25', // Borde dorado
        position: 'sticky' as 'sticky',
        top: 0,
        zIndex: 1000,
        boxSizing: 'border-box' as 'border-box'
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#f2e8cf',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    menuGroup: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    },
    link: {
        color: '#f2e8cf',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: '500',
        transition: '0.3s',
        padding: '8px 12px',
        borderRadius: '4px'
    },
    // Estilo para el link activo (donde estás parado)
    activeLink: {
        color: '#ffb703',
        fontWeight: 'bold'
    },
    // Botón especial para el Admin
    adminBadge: {
        color: '#ffb703',
        border: '1px solid #ffb703',
        padding: '5px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        textTransform: 'uppercase' as 'uppercase',
        fontWeight: 'bold'
    },
    // Botón de Login / Registro
    authBtn: {
        backgroundColor: '#bc6c25',
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        textDecoration: 'none',
        transition: 'background 0.3s'
    },
    // Botón de Salir (Rojo)
    logoutBtn: {
        backgroundColor: '#d62828',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    userTag: {
        color: '#f2e8cf',
        fontSize: '13px',
        fontStyle: 'italic',
        opacity: 0.9
    }
};