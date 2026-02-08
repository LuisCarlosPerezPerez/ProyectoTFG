export interface Producto {
    id_producto?: number;
    nombre: string;
    stock: number;
    receta: string;
    precio: number;
    // Cambiamos id_empleado por un objeto que coincida con Java
    empleado?: {
        id_empleado: number;
    };
    ingredientes: number[];
    pedidos?: any[];
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