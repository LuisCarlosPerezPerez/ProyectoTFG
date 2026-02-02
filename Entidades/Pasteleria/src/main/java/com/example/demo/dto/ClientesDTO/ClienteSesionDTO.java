//-------------------------Objeto Para IniciarSesion (Respuesta)-------------------------
package com.example.demo.dto.ClientesDTO;

public class ClienteSesionDTO {
    private String usuario;
    private String contraseña;

    // Constructor completo
    public ClienteSesionDTO(String usuario, String contraseña) {
        this.usuario = usuario;
        this.contraseña = contraseña;
    }

    // Constructor vacio
    public ClienteSesionDTO() {

    }

    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getContraseña() {
        return contraseña;
    }
    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
}
