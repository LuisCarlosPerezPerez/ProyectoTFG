import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';

const Footer = () => {
    return (
        <footer style={f.container}>
            <div style={f.content}>
                

                <div style={f.column}>
                    <h3 style={f.logoText}>🥐 Pastelería Lama</h3>
                    <div style={f.socialGroup}>
                        <a href="https://www.instagram.com/pastelerialama/" style={f.socialIcon} target="_blank" rel="noreferrer">IG</a>
                        <a href="https://www.facebook.com/Lama-Pasteler%C3%ADa-panader%C3%ADa-y-bolleria-100054487568378/" style={f.socialIcon} target="_blank" rel="noreferrer">FB</a>
                    </div>
                </div>


                <div style={f.column}>
                    <h4 style={f.colTitle}>Explora</h4>
                    <Link to="/productos" style={f.link}>La Vitrina</Link>
                    <Link to="/nosotros" style={f.link}>Nuestra Historia</Link>
                </div>


                <div style={f.column}>
                    <h4 style={f.colTitle}>Contacto</h4>
                    <p style={f.infoItem}>📍 Carretera de Urda 1<br/>
                        Villarrubia de los Ojos<br/>
                        13670 (Ciudad Real)
                    </p>
                    <p style={f.infoItem}>📞 926 89 67 74</p>
                    <p style={f.infoItem}>✉️ info@pastelerialama.es</p>
                </div>

                <div style={f.column}>
                    <h4 style={f.colTitle}>Horario</h4>
                    <p style={f.infoItem}>Lun - Vie: <br/> 10:00 a 14:30 | 17:00 a 20:00</p>
                    <p style={f.infoItem}>Sábados: <br/> 10:00 a 14:30</p>
                </div>

            </div>

            <div style={f.bottomBar}>
                <div style={f.legalLinks}>
                    <Link to="/aviso-legal" style={f.legalItem}>Aviso Legal</Link>
                    <span style={f.separator}>|</span>
                    <Link to="/politica-privacidad" style={f.legalItem}>Política de Privacidad</Link>
                    <span style={f.separator}>|</span>
                    <Link to="/cookies" style={f.legalItem}>Política de Cookies</Link>
                </div>
                
                <p style={f.copyText}>
                    © {new Date().getFullYear()} Pastelería Lama - Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

const f: Record<string, CSSProperties> = {
    container: {
        backgroundColor: '#2d1b18',
        color: '#f2e8cf',
        padding: '60px 40px 20px',
        marginTop: 'auto',
        fontFamily: "'Quicksand', sans-serif",
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        paddingBottom: '40px',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    logoText: {
        color: '#d81b60',
        fontSize: '1.5rem',
        margin: '0 0 10px 0',
        fontWeight: '900',
    },
    colTitle: {
        color: '#bc6c25',
        textTransform: 'uppercase',
        fontSize: '0.85rem',
        letterSpacing: '1.5px',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    link: {
        color: '#f2e8cf',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.3s',
    },
    infoItem: {
        fontSize: '0.9rem',
        margin: 0,
        color: '#d7ccc8',
        lineHeight: '1.5',
    },
    socialGroup: {
        display: 'flex',
        gap: '15px',
        marginTop: '15px',
    },
    socialIcon: {
        color: '#fff',
        backgroundColor: '#ad1457',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '0.7rem',
        fontWeight: 'bold',
    },
    bottomBar: {
        borderTop: '1px solid #5d4037',
        paddingTop: '20px',
        textAlign: 'center',
    },
    legalLinks: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
    },
    legalItem: {
        color: '#8d6e63',
        textDecoration: 'none',
        fontSize: '0.75rem',
        fontWeight: '600',
    },
    separator: {
        color: '#5d4037',
        fontSize: '0.75rem',
    },
    copyText: {
        fontSize: '0.8rem',
        color: '#8d6e63',
        margin: 0,
    }
};

export default Footer;