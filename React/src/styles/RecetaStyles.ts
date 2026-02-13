import type{ CSSProperties } from 'react';

// Tipado para que TypeScript reconozca las propiedades de CSS
interface PasteleriaStyles {
    [key: string]: CSSProperties;
}

export const sLama: PasteleriaStyles = {
    // --- ESTILOS GENERALES Y CONTENEDORES ---
    container: {
        padding: '120px 40px 60px',
        maxWidth: '1600px',
        margin: '0 auto',
        minHeight: '100vh',
        boxSizing: 'border-box',
        fontFamily: "'Quicksand', sans-serif",
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '60px',
    },
    tituloSeccion: {
        fontSize: '3.5rem',
        color: '#d81b60',
        fontWeight: '900',
        margin: 0,
        letterSpacing: '-1px',
    },
    subtitulo: {
        fontSize: '1.2rem',
        color: '#666',
        marginTop: '10px',
    },

    // --- GRID Y TARJETAS (PRODUCTOS) ---
    grid4: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px',
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '35px',
        padding: '35px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
        border: '1px solid #fce4ec',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center' as const,
        transition: 'transform 0.3s ease',
    },
    nombreTxt: {
        fontSize: '1.8rem',
        fontWeight: '800',
        color: '#ad1457',
        margin: '0 0 10px 0',
    },
    precioTag: {
        display: 'inline-block',
        backgroundColor: '#fce4ec',
        color: '#d81b60',
        padding: '6px 20px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginBottom: '20px',
    },

    // --- GESTIÓN DE RECETAS (TABLAS Y FORMULARIOS) ---
    cardAdmin: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '30px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
        border: '1px solid #fce4ec',
        marginBottom: '50px',
    },
    formRow: {
        display: 'flex',
        gap: '20px',
        marginBottom: '25px',
    },
    select: {
        width: '100%',
        padding: '15px',
        borderRadius: '15px',
        border: '2px solid #f2e8cf',
        fontSize: '1rem',
        outline: 'none',
        backgroundColor: '#fdfaf5',
        fontFamily: 'inherit',
    },
    tablaWrapper: {
        background: 'white',
        borderRadius: '25px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        border: '1px solid #eee',
    },
    thead: {
        backgroundColor: '#f2e8cf',
    },
    th: {
        padding: '18px',
        textAlign: 'left' as const,
        color: '#5d4037',
        fontWeight: '800',
        textTransform: 'uppercase',
        fontSize: '0.85rem',
    },
    td: {
        padding: '18px',
        borderBottom: '1px solid #f9f9f9',
        color: '#444',
    },

    // --- BOTONES ---
    btnPrincipal: {
        padding: '15px 35px',
        backgroundColor: '#d81b60',
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: '0.3s',
    },
    btnSecundario: {
        padding: '15px 35px',
        backgroundColor: '#bc6c25', // Marrón artesanal
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    btnBorrar: {
        color: '#c2185b',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: '#fff9fb',
        padding: '6px 12px',
        borderRadius: '10px',
        border: '1px solid #fce4ec',
        color: '#d81b60',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    }
};