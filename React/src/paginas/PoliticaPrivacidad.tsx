import React from 'react';
import type { CSSProperties } from 'react';

const PoliticaPrivacidadPage = () => {
    return (
        <div style={s.container}>
            <header style={s.hero}>
                <h1 style={s.titulo}>Política de Privacidad</h1>
                <p style={s.subtitulo}>PASTELERÍA Y PANADERÍA LAMA</p>
            </header>

            <section style={s.contentSection}>
                <div style={s.textBlock}>
                    <p style={s.parrafo}>
                        Le damos la bienvenida a <b>PASTELERÍA Y PANADERÍA LAMA</b>, invitándole a conocer la presente Política de Privacidad con el fin de informarle de las modalidades de tratamiento de sus datos personales y de sus derechos.
                    </p>
                    <p style={s.parrafo}>
                        PASTELERÍA Y PANADERÍA LAMA concede una gran importancia al respeto de la vida privada y toma todas las medidas necesarias para garantizar la confidencialidad y la seguridad de los datos personales de los Usuarios.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>INFORMACIÓN ADICIONAL SOBRE PROTECCIÓN DE DATOS (RGPD|LOPD-gdd)</h2>
                    <p style={s.parrafo}>
                        <b>Regulaciones legales a las que se acoge la web:</b> PASTELERÍA Y PANADERÍA LAMA ha adecuado esta web a las exigencias de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-gdd). Cumple también con el Reglamento (UE) 2016/679 (RGPD), así como con la Ley 34/2002 (LSSICE).
                    </p>
                </div>

                <div style={s.dataBox}>
                    <h2 style={s.h2}>1. RESPONSABLE DEL TRATAMIENTO</h2>
                    <p style={s.parrafo}><b>Identidad del Responsable:</b> Débora Carreño Alises</p>
                    <p style={s.parrafo}><b>Dirección postal:</b> Carretera de Urda 1, 13670 Villarrubia de los Ojos, Ciudad Real</p>
                    <p style={s.parrafo}><b>Dirección electrónica:</b> info@pastelerialama.es</p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>2. FINALIDAD DEL TRATAMIENTO Y LEGITIMACIÓN</h2>
                    <h3 style={s.h3}>2.1. ¿Con qué finalidad trataremos sus datos?</h3>
                    <p style={s.parrafo}>Tratamos los datos recabados para:</p>
                    <ul style={s.lista}>
                        <li style={s.parrafo}>Gestión y resolución de consultas.</li>
                        <li style={s.parrafo}>Recepción, gestión y preparación de pedidos.</li>
                        <li style={s.parrafo}>Gestión del proceso de compra y pago.</li>
                    </ul>
                    
                    <h3 style={s.h3}>2.2. ¿Cuál es la base que nos legitima?</h3>
                    <p style={s.parrafo}>La base legal es el <b>consentimiento expreso</b> que otorga al marcar la casilla de aceptación en nuestros formularios.</p>

                    <h3 style={s.h3}>2.5. ¿Durante cuánto tiempo?</h3>
                    <p style={s.parrafo}>Los datos se conservarán mientras no se solicite su supresión por el Usuario.</p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>3. DESTINATARIOS DE CESIONES</h2>
                    <p style={s.parrafo}>
                        No cederemos a ningún tercero tus datos, excepto en los casos legalmente previstos o para la correcta prestación de servicios (alojamiento, soporte, etc.) por encargados del tratamiento bajo contrato de confidencialidad.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>5. DERECHOS DEL INTERESADO</h2>
                    <p style={s.parrafo}>Usted tiene derecho a:</p>
                    <ul style={s.lista}>
                        <li style={s.parrafo}><b>Acceder</b> a sus datos personales.</li>
                        <li style={s.parrafo}>Solicitar la <b>rectificación</b> o <b>supresión</b>.</li>
                        <li style={s.parrafo}>Solicitar la <b>limitación</b> u <b>oposición</b> al tratamiento.</li>
                        <li style={s.parrafo}>Derecho a la <b>portabilidad</b>.</li>
                    </ul>
                    <p style={s.parrafo}>Puede ejercer estos derechos enviando un correo a <b>info@pastelerialama.es</b>.</p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>ACEPTACIÓN Y CONSENTIMIENTO</h2>
                    <p style={s.parrafo}>
                        Usted declara haber sido informado de las condiciones sobre protección de datos personales, aceptando y consintiendo el tratamiento por parte de PASTELERÍA Y PANADERÍA LAMA.
                    </p>
                </div>

                <footer style={s.infoExtra}>
                    <p style={s.parrafo}><i>La política de privacidad ha sido actualizada por última vez el 21 de Marzo de 2025.</i></p>
                </footer>
            </section>
        </div>
    );
};

// --- ESTILOS ---
const s: Record<string, CSSProperties> = {
    container: {
        paddingTop: '120px',
        minHeight: '100vh',
        backgroundColor: '#fffcf9',
        fontFamily: "'Quicksand', sans-serif",
    },
    hero: {
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#f2e8cf', 
        marginBottom: '40px',
    },
    titulo: {
        fontSize: '2.5rem',
        color: '#5d4037',
        fontWeight: '900',
        margin: 0,
    },
    subtitulo: {
        fontSize: '1rem',
        color: '#bc6c25',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    contentSection: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 20px 80px',
    },
    textBlock: {
        marginBottom: '30px',
    },
    dataBox: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '15px',
        border: '1px solid #f2e8cf',
        marginBottom: '30px',
    },
    h2: {
        color: '#ad1457',
        fontSize: '1.3rem',
        fontWeight: '800',
        marginBottom: '15px',
        lineHeight: '1.4',
    },
    h3: {
        color: '#5d4037',
        fontSize: '1.1rem',
        fontWeight: '700',
        marginTop: '20px',
    },
    parrafo: {
        color: '#444',
        fontSize: '0.95rem',
        lineHeight: '1.6',
        margin: '0 0 12px 0',
        textAlign: 'justify' as const,
    },
    lista: {
        paddingLeft: '20px',
        marginBottom: '15px',
    },
    infoExtra: {
        marginTop: '50px',
        paddingTop: '20px',
        borderTop: '1px solid #f2e8cf',
        textAlign: 'center',
    }
};

export default PoliticaPrivacidadPage;