export interface Producto {
    id_producto?: number;
    nombre: string;
    stock: number;
    receta: string;
    precio: number;
    empleado?: {
        id_empleado: number;
    };
    ingredientes: number[];
    pedidos?: any[];
    cantidad: number;
}

export interface NuevoProductoDTO  {
    nombre: string;
    stock: number;
    receta: string;
    precio: number;
}

export interface VerProductosDTO {
    id_producto: number;
    nombre: string;
    stock: number;
    receta: string;
    precio: number;
    ingredientes: number[];
}