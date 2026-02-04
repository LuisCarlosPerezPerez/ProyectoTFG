export type Pedido = {
    id: number;
    entrega: string;
    telefono: number;
    estado: 'pendiente';
    productos: Array<{
        id_producto: number;
        ingredientes: Array<{
            id_ingrediente: number;
        }>;
        pedidos: Array<{
            id_pedido: number;
        }>;
    }>;
};