import type { CSSProperties } from 'react';

// Tipado para garantizar que TypeScript acepte las propiedades de CSS
interface PasteleriaStyles {
    [key: string]: CSSProperties;
}

export const sLama: PasteleriaStyles = {
    // --- CONTENEDOR PRINCIPAL ---
    container: {
        padding: '120px 40px 60px',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh',
        boxSizing: 'border-box',
        fontFamily: "'Quicksand', sans-serif",
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '50px',
    },
    tituloSeccion: {
        fontSize: '3rem',
        color: '#d81b60',
        fontWeight: '900',
        margin: 0,
        letterSpacing: '-1px',
    },
    subtitulo: {
        fontSize: '1.1rem',
        color: '#8d6e63',
        marginTop: '10px',
    },

    // --- ELEMENTOS DE FORMULARIO Y BÚSQUEDA ---
    cardAdmin: {
        backgroundColor: '#fff',
        padding: '35px',
        borderRadius: '30px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
        border: '1px solid #fce4ec',
        marginBottom: '40px',
    },
    searchContainer: {
        backgroundColor: '#fff',
        padding: '20px 30px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #fce4ec',
    },
    formRow: {
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
    },
    label: {
        fontWeight: 'bold',
        color: '#ad1457',
        fontSize: '0.9rem',
        display: 'block',
        marginBottom: '8px',
        paddingLeft: '5px',
    },
    inputSearch: {
        padding: '12px 20px',
        width: '300px',
        borderRadius: '50px',
        border: '2px solid #f2e8cf',
        fontSize: '0.95rem',
        outline: 'none',
        fontFamily: 'inherit',
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

    // --- TABLAS ESTILO PREMIUM ---
    tablaWrapper: {
        background: 'white',
        borderRadius: '25px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        border: '1px solid #eee',
    },
    tabla: {
        width: '100%',
        borderCollapse: 'collapse',
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
        fontSize: '0.8rem',
        letterSpacing: '0.5px',
    },
    td: {
        padding: '18px',
        borderBottom: '1px solid #fdf5f7',
        color: '#444',
        fontSize: '0.95rem',
    },

    // --- BOTONES Y BADGES ---
    btnPrincipal: {
        padding: '15px 35px',
        backgroundColor: '#d81b60',
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
    },
    btnSecundario: {
        padding: '16px',
        backgroundColor: '#bc6c25',
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1.1rem',
        width: '100%',
    },
    btnBorrar: {
        color: '#c2185b',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        padding: '8px',
    },
    badge: {
        backgroundColor: '#fff9fb',
        padding: '6px 12px',
        borderRadius: '10px',
        border: '1px solid #fce4ec',
        color: '#d81b60',
        fontSize: '0.85rem',
        fontWeight: 'bold',
    },
    badgeHoras: {
        backgroundColor: '#fdfaf5',
        padding: '5px 12px',
        borderRadius: '8px',
        border: '1px solid #bc6c25',
        color: '#bc6c25',
        fontWeight: 'bold',
        fontSize: '0.9rem',
    },
    statusEnCurso: {
        color: '#d32f2f',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },

    // --- GRID PRODUCTOS ---
    grid4: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px',
        width: '100%',
    }
};