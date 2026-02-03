package com.example.demo.dto.PedidoProductoDTO;
import com.example.demo.dto.producto.*;

import com.example.demo.dto.PedidosDTO.PedidoFullDTO;

public class PedidoProductoDTO {

	private int id;
	private PedidoFullDTO pedido; 
	private ProductosDTO producto;
	
	public PedidoProductoDTO(int id, PedidoFullDTO pedido, ProductosDTO producto) {
		
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

	public PedidoFullDTO getPedido() {
		return pedido;
	}

	public void setPedido(PedidoFullDTO pedido) {
		this.pedido = pedido;
	}

	public ProductosDTO getProducto() {
		return producto;
	}

	public void setProducto(ProductosDTO producto) {
		this.producto = producto;
	}
	
	
}
