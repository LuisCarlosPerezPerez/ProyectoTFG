import type { CSSProperties } from 'react';

interface EstilosFichaje {
    container: CSSProperties;
    titulo: CSSProperties;
    infoSesion: CSSProperties;
    panelCentral: CSSProperties;
    estadoTexto: CSSProperties;
    estadoBadge: CSSProperties;
    botonFichar: (enTurno: boolean, cargando: boolean) => CSSProperties;
    tablaContenedor: CSSProperties;
    tablaTitulo: CSSProperties;
    tabla: CSSProperties;
    tablaCabecera: CSSProperties;
    tablaFila: CSSProperties;
    tablaCelda: CSSProperties;
    badgeEnCurso: CSSProperties;
}

export const s: EstilosFichaje = {
    container: {
        padding: '120px 20px 60px', 
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        minHeight: '100vh',
    },
    titulo: {
        color: '#d81b60',
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '10px',
    },
    infoSesion: {
        color: '#666',
        fontSize: '1.1rem',
        marginBottom: '30px',
    },
    panelCentral: {
        margin: '20px auto',
        padding: '40px',
        backgroundColor: '#fff0f5', 
        borderRadius: '30px',
        boxShadow: '0 10px 30px rgba(216, 27, 96, 0.08)',
        display: 'inline-block',
        minWidth: '320px',
        border: '1px solid #fce4ec',
    },
    estadoTexto: {
        marginBottom: '25px',
        fontSize: '1.2rem',
        color: '#333',
    },
    estadoBadge: {
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        marginLeft: '8px',
    },
    botonFichar: (enTurno, cargando) => ({
        padding: '18px 50px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        cursor: cargando ? 'not-allowed' : 'pointer',
        backgroundColor: enTurno ? '#ad1457' : '#d81b60', 
        color: 'white',
        border: 'none',
        borderRadius: '50px', 
        boxShadow: '0 4px 15px rgba(216, 27, 96, 0.3)',
        transition: 'all 0.3s ease',
        opacity: cargando ? 0.7 : 1,
    }),
    tablaContenedor: {
        marginTop: '60px',
        overflowX: 'auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '20px',
    },
    tablaTitulo: {
        color: '#880e4f',
        fontSize: '1.8rem',
        marginBottom: '20px',
        textAlign: 'left',
    },
    tabla: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px', 
    },
    tablaCabecera: {
        backgroundColor: '#fce4ec',
        color: '#d81b60',
        textAlign: 'left',
    },
    tablaFila: {
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
    },
    tablaCelda: {
        padding: '15px',
        borderBottom: '1px solid #fce4ec',
    },
    badgeEnCurso: {
        color: '#e6a756', 
        fontWeight: 'bold',
        backgroundColor: '#fff9eb',
        padding: '4px 10px',
        borderRadius: '10px',
    }
};