// ============================================
// SISTEMA DE AUTENTICACIÓN
// ============================================

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Verificar si hay una sesión activa
        const savedUser = localStorage.getItem('yunguen_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }
    }

    // Obtener todos los usuarios
    getUsers() {
        return JSON.parse(localStorage.getItem('yunguen_users') || '[]');
    }

    // Guardar usuarios
    saveUsers(users) {
        localStorage.setItem('yunguen_users', JSON.stringify(users));
    }

    // Registrar nuevo usuario
    register(userData) {
        const users = this.getUsers();
        
        // Validar que el email no exista
        if (users.some(u => u.email === userData.email)) {
            throw new Error('Este correo electrónico ya está registrado');
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // En producción, esto debería estar hasheado
            phone: userData.phone || '',
            address: userData.address || '',
            createdAt: new Date().toISOString(),
            orders: [],
            isActive: true
        };

        users.push(newUser);
        this.saveUsers(users);

        // Auto-login después del registro
        this.login(userData.email, userData.password);

        return newUser;
    }

    // Iniciar sesión
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }

        if (!user.isActive) {
            throw new Error('Esta cuenta ha sido desactivada');
        }

        // Guardar sesión (sin la contraseña)
        const userSession = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        };

        this.currentUser = userSession;
        localStorage.setItem('yunguen_current_user', JSON.stringify(userSession));

        // Actualizar última conexión
        user.lastLogin = new Date().toISOString();
        this.saveUsers(users);

        this.updateUIForLoggedInUser();

        return userSession;
    }

    // Cerrar sesión
    logout() {
        this.currentUser = null;
        localStorage.removeItem('yunguen_current_user');
        this.updateUIForLoggedOutUser();
        
        // Redirigir a home
        if (window.location.pathname.includes('checkout')) {
            window.location.href = 'index.html';
        }
    }

    // Verificar si está autenticado
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Obtener usuario actual
    getCurrentUser() {
        return this.currentUser;
    }

    // Actualizar perfil de usuario
    updateProfile(updates) {
        if (!this.isAuthenticated()) {
            throw new Error('Debes iniciar sesión');
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            throw new Error('Usuario no encontrado');
        }

        // Actualizar datos
        users[userIndex] = { ...users[userIndex], ...updates };
        this.saveUsers(users);

        // Actualizar sesión
        this.currentUser = {
            id: users[userIndex].id,
            name: users[userIndex].name,
            email: users[userIndex].email,
            phone: users[userIndex].phone,
            address: users[userIndex].address
        };

        localStorage.setItem('yunguen_current_user', JSON.stringify(this.currentUser));
        this.updateUIForLoggedInUser();

        return this.currentUser;
    }

    // Actualizar UI cuando el usuario está logueado
    updateUIForLoggedInUser() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (authButtons && userMenu && userName) {
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            userName.textContent = this.currentUser.name;
        }
    }

    // Actualizar UI cuando el usuario cierra sesión
    updateUIForLoggedOutUser() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');

        if (authButtons && userMenu) {
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }

    // Agregar orden al historial del usuario
    addOrderToUser(orderId, orderData) {
        if (!this.isAuthenticated()) {
            return;
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            if (!users[userIndex].orders) {
                users[userIndex].orders = [];
            }

            users[userIndex].orders.push({
                orderId: orderId,
                date: new Date().toISOString(),
                total: orderData.total,
                status: 'pending'
            });

            this.saveUsers(users);
        }
    }

    // Obtener órdenes del usuario
    getUserOrders() {
        if (!this.isAuthenticated()) {
            return [];
        }

        const users = this.getUsers();
        const user = users.find(u => u.id === this.currentUser.id);

        return user && user.orders ? user.orders : [];
    }
}

// Crear instancia global
window.authSystem = new AuthSystem();

// Inicializar UI cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.authSystem.isAuthenticated()) {
            window.authSystem.updateUIForLoggedInUser();
        } else {
            window.authSystem.updateUIForLoggedOutUser();
        }
    });
} else {
    // DOM ya está listo
    if (window.authSystem.isAuthenticated()) {
        window.authSystem.updateUIForLoggedInUser();
    } else {
        window.authSystem.updateUIForLoggedOutUser();
    }
}
