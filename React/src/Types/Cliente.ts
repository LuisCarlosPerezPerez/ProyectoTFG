import type { Pedido } from './Pedido';
export type Cliente = {
    id_cliente?: number;
    usuario: string;
    contraseña: string;
    email?: string;
    pedido?: Pedido;
};