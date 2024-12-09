export interface Producto {
    id: string | number;
    nombre: string;
    precio: number;
    imagen: string;
    stock: number;
    categoria: string;
    codigoBarras: string;
    fechaCaducidad: string;
}
