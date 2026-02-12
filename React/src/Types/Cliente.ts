export interface Cliente {
    id_cliente?: number;
    usuario?: string;
    contraseña?: string;
    email?: string;
    pedidos?: Array<{
        id_pedidos?:number;
    }>;
};