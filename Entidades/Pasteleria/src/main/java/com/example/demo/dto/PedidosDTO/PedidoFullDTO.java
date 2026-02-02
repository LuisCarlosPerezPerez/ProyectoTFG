//-------------------------Objeto Full (Peticion)-------------------------
package com.example.demo.dto.PedidosDTO;
import com.example.demo.dto.ProductosDTO;
import com.example.demo.dto.ClientesDTO.ClienteFullDTO;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

public class PedidoFullDTO {
	
	private int id;
	private Date entrega;
	private int telefono;
	private String estado;
	private Set<ProductosDTO>productos = new HashSet<ProductosDTO>();
	private ClienteFullDTO cliente;
	
	public PedidoFullDTO(int id, Date entrega, int telefono,ClienteFullDTO cliente) {
		this.id = id;
		this.entrega = entrega;
		this.telefono = telefono;
		this.estado = "Pendiente";
		this.productos = new HashSet<ProductosDTO>();
		this.cliente = cliente;
	}

	public Set<ProductosDTO> getProductos() {
		return productos;
	}

	public void setProductos(Set<ProductosDTO> productos) {
		this.productos = productos;
	}

	public PedidoFullDTO() {
		
	}

	public ClienteFullDTO getCliente() {
		return cliente;
	}


	public void setCliente(ClienteFullDTO cliente) {
		this.cliente = cliente;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getEntrega() {
		return entrega;
	}

	public void setEntrega(Date entrega) {
		this.entrega = entrega;
	}

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
	
	
}
