import type { Producto } from '../../Types/producto';

interface ProductoProps {
    producto: Producto;
    // Aquí el tipo coincide con lo que definimos en la página
    onEliminar?: (id: number | undefined) => void;
    onEditar?: (p: Producto) => void;
}

const ProductoItem = ({ producto, onEliminar, onEditar }: ProductoProps) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h4>{producto.nombre}</h4>
            <p>Precio: {producto.precio}€ | Stock: {producto.stock}</p>
            <div style={{ display: 'flex', gap: '5px' }}>
                {onEditar && <button onClick={() => onEditar(producto)}>Editar</button>}
                {onEliminar && <button onClick={() => onEliminar(producto.id_producto)} style={{ color: 'red' }}>Eliminar</button>}
            </div>
        </div>
    );
};

export default ProductoItem;