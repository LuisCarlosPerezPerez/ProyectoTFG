import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <div style={s.container}>
            <header style={s.hero}>
                <h1 style={s.title}>¡Bienvenidos a Pastelería Lama!</h1>
                <p style={s.subtitle}>Artesanos del dulce desde 2026. Los mejores sabores recién horneados.</p>
                <div style={s.buttonGroup}>
                    <Link to="/productos" style={s.ctaPrimary}>Explorar Vitrina 🥐</Link>
                    <Link to="/sobre-nosotros" style={s.ctaSecondary}>Nuestra Historia</Link>
                </div>
            </header>
            
            <section style={s.features}>
                <div style={s.card}>✨ Ingredientes seleccionados</div>
                <div style={s.card}>🕒 Siempre fresco</div>
                <div style={s.card}>📦 Pedidos online</div>
            </section>
        </div>
    );
};

const s = {
    container: { padding: '40px', textAlign: 'center' as const, color: '#5d4037', marginTop: '60px' },
    hero: { backgroundColor: '#fff', padding: '60px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(93, 64, 55, 0.05)', border: '1px solid #efebe9' },
    title: { fontSize: '3rem', margin: '0 0 10px 0', fontWeight: 'bold' as const },
    subtitle: { fontSize: '1.2rem', marginBottom: '30px', color: '#8d6e63' },
    buttonGroup: { display: 'flex', justifyContent: 'center', gap: '15px' },
    ctaPrimary: { backgroundColor: '#bc6c25', color: 'white', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' as const },
    ctaSecondary: { backgroundColor: 'transparent', color: '#bc6c25', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' as const, border: '2px solid #bc6c25' },
    features: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' },
    card: { padding: '20px', border: '1px solid #d7ccc8', borderRadius: '15px', flex: 1, maxWidth: '200px', backgroundColor: '#fff' }
};

export default Inicio;