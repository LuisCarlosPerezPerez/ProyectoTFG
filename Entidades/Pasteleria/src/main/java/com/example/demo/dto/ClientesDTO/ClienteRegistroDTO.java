//-------------------------Objeto Para Registro (Peticion)-------------------------
package com.example.demo.dto.ClientesDTO;

public class ClienteRegistroDTO {
    private String usuario;
    private String contraseña;
    private String email;


    public ClienteRegistroDTO(String usuario, String contraseña, String email) {
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.email = email;
    }


    public ClienteRegistroDTO() {

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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}