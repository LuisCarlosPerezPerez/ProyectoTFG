import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModificarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    stock: 0
  });

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const respuesta = await fetch(`http://localhost:9090/api/productos/${id}`);
        const datos = await respuesta.json();
        setProducto(datos);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };
    cargarProducto();
  }, [id]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const guardarCambios = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const respuesta = await fetch(`http://localhost:9090/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(producto)
      });

      if (respuesta.ok) {
        alert("Producto actualizado con éxito");
        navigate('/productos');
      } else {
        alert("Error al actualizar");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <main style={Estilos.pantallaCompleta}>
      <section style={Estilos.tarjeta} aria-labelledby="form-title">
        {/* Barra de acento superior */}
        <div style={Estilos.barraRosa} aria-hidden="true"></div>

        <header style={Estilos.header}>
          <span style={Estilos.marcaSuperior} aria-hidden="true">ADMINISTRACIÓN LAMA</span>
          <h1 id="form-title" style={Estilos.titulo}>
            MODIFICAR <span style={{ color: '#E91E63' }}>PRODUCTO</span>
          </h1>
          <div style={Estilos.divisor} aria-hidden="true"></div>
          <p style={Estilos.subtitulo}>Panel de Gestión: Edición de artículo #{id}</p>
        </header>

        <form onSubmit={guardarCambios} style={Estilos.formulario} aria-label="Formulario de edición de producto">
          <div style={Estilos.campo}>
            <label htmlFor="nombre" style={Estilos.etiqueta}>NOMBRE DEL ARTÍCULO</label>
            <input 
              id="nombre"
              name="nombre" 
              type="text"
              style={Estilos.input} 
              value={producto.nombre} 
              onChange={manejarCambio} 
              required
              placeholder="Ej: Tarta de Almendras"
            />
          </div>

          <div style={Estilos.dataGroup}>
            <div style={{ ...Estilos.campo, flex: 1 }}>
              <label htmlFor="precio" style={Estilos.etiqueta}>PRECIO (€)</label>
              <input 
                id="precio"
                type="number" 
                step="0.01"
                name="precio" 
                style={Estilos.input} 
                value={producto.precio} 
                onChange={manejarCambio} 
                required
              />
            </div>
            <div style={{ ...Estilos.campo, flex: 1 }}>
              <label htmlFor="stock" style={Estilos.etiqueta}>STOCK (Uds)</label>
              <input 
                id="stock"
                type="number" 
                name="stock" 
                style={Estilos.input} 
                value={producto.stock} 
                onChange={manejarCambio} 
                required
              />
            </div>
          </div>

          <div style={Estilos.campo}>
            <label htmlFor="descripcion" style={Estilos.etiqueta}>DESCRIPCIÓN DEL PRODUCTO</label>
            <textarea 
              id="descripcion"
              name="descripcion" 
              style={Estilos.textarea} 
              value={producto.descripcion} 
              onChange={manejarCambio} 
              required
              placeholder="Detalla los ingredientes o alérgenos..."
            />
          </div>

          <div style={Estilos.buttonContainer}>
            <button 
              type="button" 
              onClick={() => navigate('/productos')} 
              style={Estilos.botonCancelar}
              aria-label="Cancelar cambios y volver a productos"
            >
              CANCELAR
            </button>
            <button 
              type="submit" 
              style={Estilos.botonGuardar}
              aria-label="Guardar cambios permanentemente"
            >
              CONFIRMAR CAMBIOS
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

const Estilos: { [key: string]: React.CSSProperties } = {
  pantallaCompleta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    backgroundImage: 'radial-gradient(circle, #ffffff 0%, #fff5f8 100%)',
    padding: '20px',
    fontFamily: "'Montserrat', sans-serif"
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '550px',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(233, 30, 99, 0.08)',
    border: '1px solid #fce4ec',
    overflow: 'hidden',
    textAlign: 'center'
  },
  barraRosa: {
    height: '10px',
    backgroundColor: '#E91E63',
    width: '100%'
  },
  header: {
    padding: '40px 40px 10px 40px'
  },
  marcaSuperior: {
    display: 'block',
    letterSpacing: '3px',
    fontSize: '0.75rem',
    color: '#E91E63',
    fontWeight: '700',
    marginBottom: '10px'
  },
  titulo: {
    color: '#333',
    fontSize: '1.8rem',
    margin: '0',
    fontWeight: '800',
    letterSpacing: '-1px'
  },
  divisor: {
    width: '40px',
    height: '4px',
    backgroundColor: '#E91E63',
    margin: '15px auto',
    borderRadius: '2px'
  },
  subtitulo: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '30px'
  },
  formulario: {
    padding: '0 40px 40px 40px'
  },
  campo: {
    textAlign: 'left',
    marginBottom: '20px'
  },
  dataGroup: {
    display: 'flex',
    gap: '20px'
  },
  etiqueta: {
    color: '#333',
    fontWeight: '700',
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.75rem',
    letterSpacing: '0.5px'
  },
  input: {
    width: '100%',
    padding: '14px',
    border: '2px solid #f0f0f0',
    fontSize: '1rem',
    boxSizing: 'border-box',
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    color: '#333',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  textarea: {
    width: '100%',
    padding: '14px',
    border: '2px solid #f0f0f0',
    fontSize: '1rem',
    minHeight: '100px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    borderRadius: '12px',
    resize: 'vertical',
    backgroundColor: '#fafafa',
    color: '#333',
    outline: 'none'
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px'
  },
  botonGuardar: {
    flex: 2,
    padding: '18px',
    backgroundColor: '#E91E63',
    color: '#FFFFFF',
    border: 'none',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '14px',
    fontSize: '0.9rem',
    letterSpacing: '0.5px',
    boxShadow: '0 8px 20px rgba(233, 30, 99, 0.2)',
    transition: 'all 0.3s ease'
  },
  botonCancelar: {
    flex: 1,
    padding: '18px',
    backgroundColor: '#FFFFFF',
    color: '#666',
    border: '2px solid #f0f0f0',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '14px',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  }
};

export default ModificarProducto;