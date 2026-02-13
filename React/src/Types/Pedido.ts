export interface Pedido {
    id: number;
    entrega: string;
    telefono: number;
    estado: 'Comprando...' | 'Realizando...' | 'Terminado' 
    productos: Array<{ id_producto: number }>;
    id_cliente?: number;
    preciototal?: number;
}