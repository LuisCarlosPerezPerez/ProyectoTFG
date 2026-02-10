export interface Pedido {
    id: number;
    entrega: string;
    telefono: number;
    estado: 'pendiente' | 'Terminado';
    productos: Array<{
        id_producto: number;
    }>;
    id_cliente?: number;
};