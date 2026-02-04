export interface Producto {
    id_producto?: number;
    nombre: string;
    stock: number;
    receta: string;
    precio: number;
    ingredientes?: number[];
}

export interface NuevoProductoDTO  {
    nombre: string;
    stock: number;
    receta: string;
    precio: number;
}

export interface VerProductosDTO {
    nombre: string;
    stock: number;
    receta: string;
    precio: number;
    ingredientes: number[];
}