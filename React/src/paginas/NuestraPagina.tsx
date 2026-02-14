import type { CSSProperties } from 'react';

const NosotrosPage = () => {
    return (
        <div style={s.container}>
            {/* SECCIÓN HERO */}
            <header style={s.hero}>
                <h1 style={s.titulo}>Nuestra Historia</h1>
                <p style={s.subtitulo}>Desde el corazón del obrador a vuestra mesa</p>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <section style={s.contentSection}>
                <div style={s.textBlock}>
                    <h2 style={s.h2}>Tradición Artesanal</h2>
                    <p style={s.parrafo}>
                        En <b>Pastelería Lama</b>, cada dulce cuenta una historia. Lo que comenzó como un pequeño 
                        sueño familiar entre harinas y aromas de canela, se ha convertido hoy en un referente de la 
                        repostería fina.
                    </p>
                    <p style={s.parrafo}>
                        Nuestra filosofía es simple: <b>respeto por la materia prima</b>. No utilizamos procesos industriales; 
                        cada croissant, cada tarta y cada bombón es elaborado a mano diariamente por nuestros maestros 
                        pasteleros, siguiendo las recetas que han pasado de generación en generación.
                    </p>
                </div>

                {/* DECORACIÓN VISUAL */}
                <div style={s.statsGrid}>
                    <div style={s.statCard}>
                        <span style={s.statNum}>1994</span>
                        <span style={s.statDesc}>Fundación</span>
                    </div>
                    <div style={s.statCard}>
                        <span style={s.statNum}>100%</span>
                        <span style={s.statDesc}>Ingredientes Naturales</span>
                    </div>
                    <div style={s.statCard}>
                        <span style={s.statNum}>+50</span>
                        <span style={s.statDesc}>Recetas Únicas</span>
                    </div>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>El Secreto de Lama</h2>
                    <p style={s.parrafo}>
                        No es solo azúcar y mantequilla. El secreto reside en la <b>paciencia</b>. Dejamos que nuestras 
                        masas fermenten el tiempo necesario, que los chocolates se templen con mimo y que cada detalle 
                        visual sea perfecto. Porque sabemos que la primera impresión entra por los ojos, pero la 
                        felicidad llega con el primer bocado.
                    </p>
                </div>
            </section>

            <footer style={s.footer}>
                <p>🧁 Gracias por formar parte de nuestra dulce familia.</p>
            </footer>
        </div>
    );
};

// --- ESTILOS EN EL MISMO ARCHIVO ---
const s: Record<string, CSSProperties> = {
    container: {
        paddingTop: '120px', // Espacio para el Navbar fijo
        minHeight: '100vh',
        backgroundColor: '#fffcf9', // Color crema muy suave
        fontFamily: "'Quicksand', sans-serif",
    },
    hero: {
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: '#fce4ec', // Rosa suave corporativo
        marginBottom: '50px',
    },
    titulo: {
        fontSize: '3.5rem',
        color: '#d81b60',
        fontWeight: '900',
        margin: 0,
    },
    subtitulo: {
        fontSize: '1.3rem',
        color: '#ad1457',
        fontWeight: '500',
        fontStyle: 'italic',
    },
    contentSection: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 20px 80px',
    },
    textBlock: {
        marginBottom: '40px',
        lineHeight: '1.8',
    },
    h2: {
        color: '#5d4037',
        fontSize: '2rem',
        borderBottom: '2px solid #bc6c25',
        display: 'inline-block',
        marginBottom: '20px',
    },
    parrafo: {
        color: '#444',
        fontSize: '1.1rem',
        marginBottom: '20px',
        textAlign: 'justify',
    },
    statsGrid: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '20px',
        margin: '60px 0',
        flexWrap: 'wrap',
    },
    statCard: {
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '25px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #f2e8cf',
        width: '200px',
    },
    statNum: {
        display: 'block',
        fontSize: '2rem',
        fontWeight: '900',
        color: '#bc6c25',
    },
    statDesc: {
        fontSize: '0.9rem',
        color: '#8d6e63',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    footer: {
        textAlign: 'center',
        padding: '40px',
        borderTop: '1px solid #f2e8cf',
        color: '#8d6e63',
        fontStyle: 'italic',
    }
};

export default NosotrosPage;