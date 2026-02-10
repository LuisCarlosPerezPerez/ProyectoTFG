package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class ProductosDTO {
    
    private int id_producto;
    private String nombre;
    private int stock;
    private String receta;
    private int precio;
    private int id_empleado;
    private List<Integer> ingredientes = new ArrayList<>();
    private List<Integer> pedidos = new ArrayList<>(); // Corregido a minúscula
    
    public ProductosDTO(int id_producto, String nombre, int stock, String receta, int precio, int id_empleado,
            List<Integer> ingredientes, List<Integer> pedidos) {
        super();
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.stock = stock;
        this.receta = receta;
        this.precio = precio;
        this.id_empleado = id_empleado;
        this.ingredientes = ingredientes;
        this.pedidos = pedidos;
    }
    
    // GETTERS Y SETTERS CORREGIDOS (Todos en minúsculas)
    public int getId_producto() {
        return id_producto;
    }
    public void setId_producto(int id_producto) {
        this.id_producto = id_producto;
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
    public String getReceta() {
        return receta;
    }
    public void setReceta(String receta) {
        this.receta = receta;
    }
    public int getPrecio() {
        return precio;
    }
    public void setPrecio(int precio) {
        this.precio = precio;
    }
    public int getId_empleado() {
        return id_empleado;
    }
    public void setId_empleado(int id_empleado) {
        this.id_empleado = id_empleado;
    }
    public List<Integer> getIngredientes() {
        return ingredientes;
    }
    public void setIngredientes(List<Integer> ingredientes) {
        this.ingredientes = ingredientes;
    }
    public List<Integer> getPedidos() {
        return pedidos;
    }
    public void setPedidos(List<Integer> pedidos) {
        this.pedidos = pedidos;
    }
}