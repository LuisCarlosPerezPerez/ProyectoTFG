import type { CSSProperties } from 'react';

const PoliticaCookiesPage = () => {
    return (
        <div style={s.container}>
            <header style={s.hero}>
                <h1 style={s.titulo}>Política de Cookies</h1>
                <p style={s.subtitulo}>Información sobre el uso de ficheros de texto</p>
            </header>

            <section style={s.contentSection}>
                <div style={s.textBlock}>
                    <p style={s.parrafo}>
                        Una <b>cookie</b> es un pequeño fichero de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.
                    </p>
                    <p style={s.parrafo}>
                        Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc. El objetivo de la cookie es adaptar el contenido de la web a su perfil y necesidades.
                    </p>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>Cookies utilizadas en este sitio web</h2>
                    <p style={s.parrafo}>
                        Siguiendo las directrices de la Agencia Española de Protección de Datos procedemos a detallar el uso de cookies que hace esta web:
                    </p>
                    
                    <h3 style={s.h3}>Cookies Propias:</h3>
                    <ul style={s.lista}>
                        <li style={s.parrafo}>
                            <b>Cookies de sesión:</b> Para garantizar que los usuarios que escriben comentarios en el blog sean humanos y no aplicaciones automatizadas. De esta forma se combate el spam.
                        </li>
                    </ul>

                    <h3 style={s.h3}>Cookies de Terceros:</h3>
                    <ul style={s.lista}>
                        <li style={s.parrafo}>
                            <b>Google Analytics:</b> Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de esta web. Al utilizar este sitio web está consintiendo el tratamiento de información acerca de usted por Google.
                        </li>
                        <li style={s.parrafo}>
                            <b>Redes sociales:</b> Cada red social utiliza sus propias cookies para que usted pueda pinchar en botones del tipo <i>Me gusta</i> o <i>Compartir</i>.
                        </li>
                    </ul>
                </div>

                <div style={s.textBlock}>
                    <h2 style={s.h2}>Desactivación o eliminación de cookies</h2>
                    <p style={s.parrafo}>
                        En cualquier momento podrá ejercer su derecho de desactivación o eliminación de cookies de este sitio web. Estas acciones se realizan de forma diferente en función del navegador que esté usando (Chrome, Firefox, Safari, Edge, etc.).
                    </p>
                </div>

                <div style={s.noteBox}>
                    <h2 style={{ ...s.h2, color: '#bc6c25' }}>Notas adicionales</h2>
                    <ul style={s.lista}>
                        <li style={s.parrafoChico}>Ni esta web ni sus representantes legales se hacen responsables del contenido o veracidad de las políticas de privacidad de terceros.</li>
                        <li style={s.parrafoChico}>Los navegadores web son las herramientas encargadas de almacenar las cookies; desde allí debe efectuar su derecho a eliminación.</li>
                        <li style={s.parrafoChico}>En el caso de Google Analytics, esta empresa almacena las cookies en servidores ubicados en Estados Unidos y se compromete a no compartirla con terceros, excepto cuando la ley obligue.</li>
                    </ul>
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <p style={s.parrafo}>
                        Para cualquier duda, no dude en comunicarse con nosotros a través de <b>info@pastelerialama.es</b>
                    </p>
                </div>
            </section>
        </div>
    );
};

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
        backgroundColor: '#fce4ec', 
        marginBottom: '40px',
    },
    titulo: {
        fontSize: '2.5rem',
        color: '#d81b60',
        fontWeight: '900',
        margin: 0,
    },
    subtitulo: {
        fontSize: '1rem',
        color: '#ad1457',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    contentSection: {
        maxWidth: '850px',
        margin: '0 auto',
        padding: '0 20px 80px',
    },
    textBlock: {
        marginBottom: '35px',
    },
    h2: {
        color: '#5d4037',
        fontSize: '1.4rem',
        fontWeight: '800',
        marginBottom: '15px',
        borderBottom: '2px solid #f2e8cf',
        paddingBottom: '5px',
        display: 'inline-block',
    },
    h3: {
        color: '#bc6c25',
        fontSize: '1.1rem',
        fontWeight: '700',
        marginTop: '20px',
    },
    parrafo: {
        color: '#444',
        fontSize: '1rem',
        lineHeight: '1.7',
        margin: '0 0 15px 0',
    },
    lista: {
        paddingLeft: '20px',
        marginBottom: '20px',
    },
    noteBox: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '20px',
        border: '1px solid #f2e8cf',
        marginTop: '40px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.03)',
    },
    parrafoChico: {
        color: '#666',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '10px',
    }
};

export default PoliticaCookiesPage;