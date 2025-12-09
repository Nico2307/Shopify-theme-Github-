// test-responsive.js - Script para probar el sistema responsive
console.log('=== SISTEMA RESPONSIVE TEST ===');

// Verificar clases del body
setTimeout(() => {
    const bodyClasses = document.body.classList;
    console.log('Body classes:', Array.from(bodyClasses));

    // Verificar dispositivo detectado
    const deviceType = bodyClasses.contains('device-mobile') ? 'Mobile' :
                      bodyClasses.contains('device-tablet') ? 'Tablet' :
                      bodyClasses.contains('device-desktop') ? 'Desktop' : 'Unknown';

    console.log('📱 Device detected:', deviceType);
    console.log('👆 Input type:', bodyClasses.contains('touch-device') ? 'Touch' : 'Mouse');

    // Verificar elementos responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    console.log('📲 Menu toggle visible:', menuToggle ? getComputedStyle(menuToggle).display !== 'none' : false);
    console.log('📋 Menu classes:', menu ? Array.from(menu.classList) : 'Not found');

    // Verificar media queries aplicadas
    const testElement = document.createElement('div');
    testElement.style.cssText = 'width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; background: rgba(0,255,0,0.1);';
    testElement.textContent = `${deviceType} - ${window.innerWidth}x${window.innerHeight}`;
    document.body.appendChild(testElement);

    // Remover después de 3 segundos
    setTimeout(() => {
        document.body.removeChild(testElement);
    }, 3000);

    console.log('✅ Responsive system test completed');
    console.log('💡 Tip: Resize the window or rotate device to test different breakpoints');
}, 1000);

// Función para probar gestos táctiles (solo en móviles)
if ('ontouchstart' in window) {
    console.log('👆 Touch gestures enabled');

    // Agregar indicador visual para swipe
    document.addEventListener('touchstart', () => {
        console.log('👆 Touch started');
    });

    document.addEventListener('touchend', () => {
        console.log('👆 Touch ended');
    });
}

// Hacer la función global para testing manual
window.testResponsive = function() {
    console.log('=== MANUAL RESPONSIVE TEST ===');
    console.log('Window size:', window.innerWidth, 'x', window.innerHeight);
    console.log('Device pixel ratio:', window.devicePixelRatio);
    console.log('User agent:', navigator.userAgent);
    console.log('Touch points:', navigator.maxTouchPoints);

    // Forzar recarga del sistema responsive
    if (window.reloadResponsive) {
        window.reloadResponsive();
    }
};

console.log('🔧 Run testResponsive() in console for manual testing');