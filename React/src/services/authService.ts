const AUTH_KEY = 'usuario_sesion';

export const authService = {
    login: (usuario: any) => {
        // Guardamos el objeto completo (id, nombre, rol) convertido a texto
        localStorage.setItem(AUTH_KEY, JSON.stringify(usuario));
    },
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },
    getUsuario: () => {
        const data = localStorage.getItem(AUTH_KEY);
        return data ? JSON.parse(data) : null;
    },
    isLogged: () => {
        return localStorage.getItem(AUTH_KEY) !== null;
    }
};