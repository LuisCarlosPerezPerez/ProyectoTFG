import type { Pedido } from './Pedido';
export interface Cliente {
    id_cliente?: number;
    usuario: string;
    contraseña: string;
    email?: string;
    pedido?: Pedido;
};