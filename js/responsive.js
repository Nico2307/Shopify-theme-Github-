// responsive.js - Utilidades para mejorar la experiencia responsive

document.addEventListener('DOMContentLoaded', function() {
    console.log('Responsive utilities loaded');

    // Detectar dispositivo y agregar clases al body
    detectDevice();

    // Configurar gestos táctiles para móviles
    setupTouchGestures();

    // Optimizar carga de imágenes por dispositivo
    optimizeImagesForDevice();

    // Configurar navegación responsive
    setupResponsiveNavigation();

    // Mejorar formularios para móviles
    enhanceMobileForms();

    // Configurar efectos hover solo para desktop
    setupDesktopHoverEffects();
});

// Detectar tipo de dispositivo
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent) || (window.innerWidth >= 768 && window.innerWidth <= 1024);
    const isDesktop = window.innerWidth >= 1025;

    // Agregar clases al body
    document.body.classList.add(
        isMobile ? 'device-mobile' :
        isTablet ? 'device-tablet' :
        isDesktop ? 'device-desktop' : 'device-unknown'
    );

    // Agregar clase para touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('mouse-device');
    }

    console.log('Device detected:', {
        mobile: isMobile,
        tablet: isTablet,
        desktop: isDesktop,
        touch: 'ontouchstart' in window
    });
}

// Gestos táctiles para móviles
function setupTouchGestures() {
    if (!document.body.classList.contains('device-mobile')) return;

    // Swipe para navegación de productos
    const productGrid = document.querySelector('.products-grid');
    if (productGrid) {
        let startX, startY, endX, endY;

        productGrid.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        productGrid.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            // Swipe horizontal para navegación
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    navigateProducts('next');
                } else {
                    navigateProducts('prev');
                }
            }
        }, { passive: true });
    }
}

// Navegación de productos con swipe
function navigateProducts(direction) {
    const products = document.querySelectorAll('.product-card');
    const visibleProducts = Array.from(products).filter(p => {
        const rect = p.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });

    if (visibleProducts.length > 0) {
        const currentIndex = Array.from(products).indexOf(visibleProducts[0]);
        let targetIndex;

        if (direction === 'next' && currentIndex < products.length - 1) {
            targetIndex = currentIndex + 1;
        } else if (direction === 'prev' && currentIndex > 0) {
            targetIndex = currentIndex - 1;
        }

        if (targetIndex !== undefined) {
            products[targetIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// Optimización de imágenes por dispositivo
function optimizeImagesForDevice() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
        // Lazy loading con Intersection Observer
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;

                    // Agregar clase loaded para animaciones
                    img.addEventListener('load', function() {
                        this.classList.add('loaded');
                    });

                    imageObserver.unobserve(img);
                }
            });
        });

        imageObserver.observe(img);
    });
}

// Navegación responsive
function setupResponsiveNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            // Cambiar icono del menú
            const icon = this.querySelector('i') || this;
            if (menu.classList.contains('active')) {
                icon.textContent = '✕';
            } else {
                icon.textContent = '☰';
            }
        });

        // Cerrar menú al hacer tap/click fuera
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i') || menuToggle;
                icon.textContent = '☰';
            }
        });

        // Cerrar menú al hacer scroll (móvil)
        if (document.body.classList.contains('device-mobile')) {
            let scrollTimeout;
            window.addEventListener('scroll', function() {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    menu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    const icon = menuToggle.querySelector('i') || menuToggle;
                    icon.textContent = '☰';
                }, 150);
            });
        }
    }

    // Smooth scroll para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = document.body.classList.contains('device-mobile') ? 80 : 100;
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Cerrar menú móvil después de navegar
                    if (document.body.classList.contains('device-mobile')) {
                        menu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                        const icon = menuToggle.querySelector('i') || menuToggle;
                        icon.textContent = '☰';
                    }
                }
            }
        });
    });
}

// Mejorar formularios para móviles
function enhanceMobileForms() {
    if (!document.body.classList.contains('device-mobile')) return;

    // Prevenir zoom en iOS cuando se enfocan inputs
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Auto-focus y scroll para inputs
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', function() {
            // Scroll suave hacia el campo
            setTimeout(() => {
                const rect = this.getBoundingClientRect();
                const offset = window.innerHeight / 2 - rect.height / 2;

                if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
                    window.scrollTo({
                        top: window.pageYOffset + rect.top - offset,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    });

    // Validación visual mejorada
    document.querySelectorAll('input[required], textarea[required]').forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            if (this.classList.contains('field-invalid')) {
                validateField(this);
            }
        });
    });
}

// Validación de campos
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    // Validaciones específicas
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = !value || emailRegex.test(value);
            message = isValid ? '' : 'Email inválido';
            break;
        case 'tel':
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            isValid = !value || phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
            message = isValid ? '' : 'Teléfono inválido';
            break;
        default:
            if (field.hasAttribute('required')) {
                isValid = value.length > 0;
                message = isValid ? '' : 'Campo requerido';
            }
    }

    // Actualizar UI
    field.classList.toggle('field-valid', isValid && value.length > 0);
    field.classList.toggle('field-invalid', !isValid);

    // Mostrar/ocultar mensaje de error
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement && message) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ff4444;
            font-size: 14px;
            margin-top: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        field.parentNode.appendChild(errorElement);
    }

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.opacity = message ? '1' : '0';
    }
}

// Efectos hover solo para desktop
function setupDesktopHoverEffects() {
    if (!document.body.classList.contains('device-desktop')) return;

    // Efectos hover en tarjetas de producto
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-16px) scale(1.02)';
            this.style.boxShadow = '0 24px 48px rgba(255, 255, 255, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        });
    });

    // Efectos hover en botones
    document.querySelectorAll('.btn-primary, .button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.3)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
    });
}

// Función para recargar estilos responsive (útil para testing)
window.reloadResponsive = function() {
    // Remover clases anteriores
    document.body.classList.remove('device-mobile', 'device-tablet', 'device-desktop', 'device-unknown', 'touch-device', 'mouse-device');

    // Detectar nuevamente
    detectDevice();

    console.log('Responsive styles reloaded');
};

// Escuchar cambios de orientación/orientation
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        window.reloadResponsive();
    }, 500);
});

// Escuchar cambios de tamaño de ventana
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        window.reloadResponsive();
    }, 250);
});