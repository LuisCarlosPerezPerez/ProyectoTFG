//-------------------------Objeto Mostrar Productos (Respuesta)-------------------------
package com.example.demo.dto.PedidosDTO;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PedidoVistaDTO {
    private int id;
    private String estado;
    private Set<Integer>productos;
    private Date entrega;
    private int id_cliente;

    public PedidoVistaDTO(int id, String estado, Set<Integer> productos, Date entrega, int id_cliente) {
        this.id = id;
        this.estado = estado;
        this.productos = productos != null ? new HashSet<>(productos) : new HashSet<>();
        this.entrega = entrega;
        this.id_cliente = id_cliente;
    }
    public PedidoVistaDTO() {
    }

    public int getId_cliente() {
        return id_cliente;
    }
    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<Integer> getProductos() {
        return productos;
    }

    public void setProductos(Set<Integer> productos) {
        this.productos = productos;
    }

    public java.sql.Date getEntrega() {
        return entrega;
    }

    public void setEntrega(java.sql.Date entrega) {
        this.entrega = entrega;
    }
}