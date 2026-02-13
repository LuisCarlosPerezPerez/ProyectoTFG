import React from 'react';
import { Link } from 'react-router-dom';
import { styles as s } from '../styles/PaginaInicio';

const Inicio = () => {
    return (
        <main style={s.container} aria-labelledby="main-title">
            <header style={s.hero} role="banner">
                <div style={s.heroOverlay}>
                    <h1 id="main-title" style={s.title}>Pastelería Lama</h1>
                    <div style={s.divider} aria-hidden="true"></div>
                    <p style={s.subtitle}>
                        Postres de autor y pastelería creativa. <br />
                        Endulzamos tus momentos más especiales con un toque moderno.
                    </p>
                    <nav style={s.buttonGroup} aria-label="Navegación principal">
                        <Link to="/productos" style={s.ctaPrimary} aria-label="Ver productos">
                            Ver Productos 🍰
                        </Link>
                        <Link to="/sobre-nosotros" style={s.ctaSecondary} aria-label="Sobre nosotros">
                            Nuestra Historia
                        </Link>
                    </nav>
                </div>
            </header>

            <section style={s.features} aria-label="Nuestros valores">
                <article style={s.card}>
                    <span style={s.cardIcon} aria-hidden="true">💖</span>
                    <h2 style={s.cardTitle}>Hecho con Amor</h2>
                    <p style={s.cardText}>Elaboramos cada pieza de forma artesanal cuidando cada detalle visual.</p>
                </article>
                <article style={s.card}>
                    <span style={s.cardIcon} aria-hidden="true">🍓</span>
                    <h2 style={s.cardTitle}>Sabor Natural</h2>
                    <p style={s.cardText}>Frutas frescas y materias primas de proximidad para un sabor explosivo.</p>
                </article>
                <article style={s.card}>
                    <span style={s.cardIcon} aria-hidden="true">🚀</span>
                    <h2 style={s.cardTitle}>Diseño Moderno</h2>
                    <p style={s.cardText}>Reinterpretamos los clásicos con una estética vanguardista y única.</p>
                </article>
            </section>
        </main>
    );
};

export default Inicio;