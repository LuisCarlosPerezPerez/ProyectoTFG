import React from 'react';
import type { CSSProperties } from 'react';
const AvisoLegalPage = () => {
    return (
        <div style={s.container}>
            <header style={s.hero}>
                <h1 style={s.titulo}>Aviso Legal</h1>
                <p style={s.subtitulo}>LSSICE - Información Obligatoria</p>
            </header>

            <section style={s.contentSection}>
                <div style={s.textBlock}>
                    <p style={s.parrafo}>
                        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE) a continuación se detallan los datos identificativos de la entidad:
                    </p>
                    
                    <div style={s.dataBox}>
                        <h3 style={{ ...s.h3, marginTop: 0 }}>PASTELERÍA Y PANADERÍA LAMA</h3>
                        <p style={s.parrafo}><b>Razón social:</b> Débora Carreño Alises</p>
                        <p style={s.parrafo}><b>Nº de Identificación Fiscal:</b> [Completar con el NIF]</p>
                        <p style={s.parrafo}><b>Dirección:</b> Carretera de Urda 1, 13670 Villarrubia de los Ojos, Ciudad Real</p>
                        <p style={s.parrafo}><b>Teléfono:</b> 926 89 67 74</p>
                        <p style={s.parrafo}><b>Email:</b> info@pastelerialama.es</p>
                    </div>
                </div>

                <div style={s.warningBlock}>
                    <p style={s.parrafoChico}>
                        Este comerciante se compromete a no permitir ninguna transacción que sea ilegal, o se considere por las marcas de tarjetas de crédito o el banco adquiriente, que pueda o tenga el potencial de dañar la buena voluntad de los mismos o influir de manera negativa en ellos. Las siguientes actividades están prohibidas en virtud de los programas de las marcas de tarjetas: la venta u oferta de un producto o servicio que no sea de plena conformidad con todas las leyes aplicables al Comprador, Banco Emisor, Comerciante, Titular de la tarjeta, o tarjetas.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>FINALIDAD DE LA PÁGINA WEB</h2>
                    <p style={s.parrafo}>
                        Promocionar los productos ofrecidos por PASTELERÍA Y PANADERÍA LAMA además de establecer vías de comunicación para obtener información adicional sobre ellos.
                    </p>
                    <p style={s.parrafo}>
                        El presente aviso legal (en adelante, el «Aviso Legal») regula el uso del sitio web.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>LEGISLACIÓN</h2>
                    <p style={s.parrafo}>
                        Con carácter general las relaciones entre PASTELERÍA Y PANADERÍA LAMA y los Usuarios de sus servicios telemáticos, presentes en este sitio web, se encuentran sometidas a la legislación y jurisdicción españolas.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>USO Y ACCESO DE USUARIOS</h2>
                    <p style={s.parrafo}>
                        El Usuario queda informado, y acepta, que el acceso a la presente web no supone, en modo alguno, el inicio de una relación comercial con PASTELERÍA Y PANADERÍA LAMA o cualquiera de sus delegaciones.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>PROPIEDAD INTELECTUAL E INDUSTRIAL</h2>
                    <p style={s.parrafo}>
                        Los derechos de propiedad intelectual del contenido de las páginas web, su diseño gráfico y códigos son titularidad de PASTELERÍA Y PANADERÍA LAMA y, por tanto, queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otra actividad que se pueda realizar con los contenidos de sus páginas web ni aun citando las fuentes, salvo consentimiento por escrito de PASTELERÍA Y PANADERÍA LAMA.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>CONTENIDO DE LA WEB Y ENLACES (LINKS)</h2>
                    <p style={s.parrafo}>
                        PASTELERÍA Y PANADERÍA LAMA se reserva el derecho a actualizar, modificar o eliminar la información contenida en sus páginas web pudiendo incluso limitar o no permitir el acceso a dicha información a ciertos usuarios.
                    </p>
                    <p style={s.parrafo}>
                        PASTELERÍA Y PANADERÍA LAMA no asume responsabilidad alguna por la información contenida en páginas web de terceros a las que se pueda acceder por «links» o enlaces desde cualquier página web propiedad de PASTELERÍA Y PANADERÍA LAMA. La presencia de «links» o enlaces en las páginas web de PASTELERÍA Y PANADERÍA LAMA tiene finalidad meramente informativa y en ningún caso supone sugerencia, invitación o recomendación sobre los mismos.
                    </p>
                </div>
            </section>
        </div>
    );
};

// --- ESTILOS EN EL MISMO ARCHIVO ---
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
        marginBottom: '35px',
    },
    warningBlock: {
        padding: '20px',
        borderLeft: '4px solid #ad1457',
        backgroundColor: 'rgba(173, 20, 87, 0.05)',
        marginBottom: '35px',
        borderRadius: '0 15px 15px 0',
    },
    dataBox: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '15px',
        border: '1px solid #f2e8cf',
        marginTop: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
    },
    h2: {
        color: '#ad1457',
        fontSize: '1.2rem',
        fontWeight: '800',
        marginBottom: '15px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    h3: {
        color: '#5d4037',
        fontSize: '1.1rem',
        fontWeight: '700',
    },
    parrafo: {
        color: '#444',
        fontSize: '1rem',
        lineHeight: '1.7',
        margin: '0 0 12px 0',
        textAlign: 'justify' as const,
    },
    parrafoChico: {
        color: '#666',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        margin: 0,
        fontStyle: 'italic',
    }
};

export default AvisoLegalPage;