import type { CSSProperties } from 'react';

interface EstilosPasteleria {
    container: CSSProperties;
    hero: CSSProperties;
    heroOverlay: CSSProperties;
    title: CSSProperties;
    divider: CSSProperties;
    subtitle: CSSProperties;
    buttonGroup: CSSProperties;
    ctaPrimary: CSSProperties;
    ctaSecondary: CSSProperties;
    features: CSSProperties;
    card: CSSProperties;
    cardIcon: CSSProperties;
    cardTitle: CSSProperties;
    cardText: CSSProperties;
}

export const styles: EstilosPasteleria = {
    container: {
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        padding: '20px',
        color: '#333',
        marginTop: '60px',
        fontFamily: "'Inter', sans-serif", 
    },
    hero: {
        position: 'relative',
        padding: '100px 20px',
        borderRadius: '30px', 
        backgroundImage: 'url("https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1500&auto=format&fit=crop")', // Tarta moderna
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heroOverlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        padding: '50px 30px',
        borderRadius: '25px',
        maxWidth: '650px',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 15px 35px rgba(233, 30, 99, 0.1)', 
    },
    title: {
        fontSize: '3rem',
        margin: '0',
        color: '#d81b60', 
        fontWeight: '800',
        letterSpacing: '-1px',
    },
    divider: {
        width: '80px',
        height: '4px',
        backgroundColor: '#fce4ec', 
        margin: '20px auto',
        borderRadius: '2px',
    },
    subtitle: {
        fontSize: '1.2rem',
        marginBottom: '35px',
        color: '#555',
        lineHeight: '1.5',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        flexWrap: 'wrap',
    },
    ctaPrimary: {
        backgroundColor: '#d81b60', 
        color: '#ffffff',
        padding: '16px 32px',
        textDecoration: 'none',
        fontWeight: 'bold',
        borderRadius: '50px',
        display: 'inline-block',
        transition: '0.3s',
    },
    ctaSecondary: {
        backgroundColor: '#ffffff',
        color: '#d81b60',
        padding: '16px 32px',
        textDecoration: 'none',
        fontWeight: 'bold',
        borderRadius: '50px',
        border: '2px solid #d81b60',
        display: 'inline-block',
    },
    features: {
        display: 'flex',
        justifyContent: 'center',
        gap: '25px',
        marginTop: '60px',
        flexWrap: 'wrap',
    },
    card: {
        padding: '30px',
        border: 'none',
        borderRadius: '20px',
        flex: '1',
        minWidth: '260px',
        maxWidth: '340px',
        backgroundColor: '#fff0f5', 
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    cardIcon: {
        fontSize: '2.5rem',
        marginBottom: '15px',
        display: 'block',
    },
    cardTitle: {
        fontSize: '1.4rem',
        color: '#880e4f', 
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: '1rem',
        color: '#616161',
        lineHeight: '1.6',
    },
};