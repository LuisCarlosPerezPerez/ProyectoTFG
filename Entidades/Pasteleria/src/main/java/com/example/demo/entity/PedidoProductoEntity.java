package com.example.demo.entity;

import java.io.Serializable;
import jakarta.persistence.*;

@Entity
@Table(name="PEDIDO_PRODUCTO")
public class PedidoProductoEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_PEDIDO_PRODUCTO")
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "ID_PEDIDO", nullable = false)
	private PedidoEntity pedido;   
	
	@ManyToOne
	@JoinColumn(name = "ID_PRODUCTO", nullable = false)
	private ProductosEntity producto;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public PedidoEntity getPedido() {
		return pedido;
	}

	public void setPedido(PedidoEntity pedido) {
		this.pedido = pedido;
	}

	public ProductosEntity getProducto() {
		return producto;
	}

	public void setProducto(ProductosEntity producto) {
		this.producto = producto;
	}  
	
	
	
	
}
