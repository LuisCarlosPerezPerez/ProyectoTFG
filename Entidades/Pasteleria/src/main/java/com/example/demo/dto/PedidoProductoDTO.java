package com.example.demo.dto;


public class PedidoProductoDTO {

	private int id;
	private PedidoDTO pedido; 
	private ProductosDTO producto;
	
	public PedidoProductoDTO(int id, PedidoDTO pedido, ProductosDTO producto) {
		
		this.id = id;
		this.pedido = pedido;
		this.producto = producto;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public PedidoDTO getPedido() {
		return pedido;
	}

	public void setPedido(PedidoDTO pedido) {
		this.pedido = pedido;
	}

	public ProductosDTO getProducto() {
		return producto;
	}

	public void setProducto(ProductosDTO producto) {
		this.producto = producto;
	}
	
	
}
