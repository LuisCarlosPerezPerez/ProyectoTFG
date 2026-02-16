package com.example.demo.dto.IngredientesDTO;

public class IngredienteCrearDTO {
    private String nombre;
    private int stock;
    private String proveedor;

    public IngredienteCrearDTO(String nombre, int stock, String proveedor) {
        this.nombre = nombre;
        this.stock = stock;
        this.proveedor = proveedor;
    }

    public IngredienteCrearDTO() {

    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public int getStock() {
        return stock;
    }
    public void setStock(int stock) {
        this.stock = stock;
    }
    public String getProveedor() {
        return proveedor;
    }
    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }
}
