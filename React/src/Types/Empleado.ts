export type Empleado = {
    id_empleado?: number;
    usuario: string;
    contraseña: string;
    email?: string;
    administrador?: number;
    registros?: Array<{
        id_registro: number;
        entrada: Date;
        salida: Date;
    }>;
    productos?: Array<{
        id_producto: number;
        nombre: string;
    }>;
};