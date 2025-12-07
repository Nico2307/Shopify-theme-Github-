/**
 * TRIDOT CUSTOM ENHANCEMENTS
 * Scripts para mejoras visuales
 */

(function() {
  'use strict';

  // Agregar los tres puntos animados al logo
  function addTriDotLogo() {
    const logoElements = document.querySelectorAll('.header__logo, header-logo, .header__logo-link, .header__heading, .header__heading-link');
    
    logoElements.forEach(logo => {
      if (!logo.querySelector('.tridot-dots') && !logo.hasAttribute('data-tridot-added')) {
        logo.setAttribute('data-tridot-added', 'true');
        
        const dotsContainer = document.createElement('span');
        dotsContainer.className = 'tridot-dots';
        dotsContainer.style.cssText = `
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-right: 10px;
          vertical-align: middle;
        `;
        
        // Crear los tres puntos
        for (let i = 1; i <= 3; i++) {
          const dot = document.createElement('span');
          dot.className = `tridot-dot tridot-dot-${i}`;
          dot.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
            display: inline-block;
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
            animation: tridotPulse${i} ${1.5 + i * 0.2}s ease-in-out infinite;
          `;
          dotsContainer.appendChild(dot);
        }
        
        // Insertar al principio del logo
        if (logo.firstChild) {
          logo.insertBefore(dotsContainer, logo.firstChild);
        } else {
          logo.appendChild(dotsContainer);
        }
      }
    });
  }

  // Efecto de scroll reveal
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-scroll-reveal', 'true');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos
    document.querySelectorAll('.product-card, .card-wrapper, .card, .collection-card, section, .hero').forEach(el => {
      observer.observe(el);
    });
  }

  // Agregar efecto de hover 3D a las cards
  function init3DCardEffect() {
    const cards = document.querySelectorAll('.product-card, .card-wrapper, .card, .collection-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // Agregar animaciones CSS dinámicamente
  function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes tridotPulse1 {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
      }
      @keyframes tridotPulse2 {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
      }
      @keyframes tridotPulse3 {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
      }
      .tridot-dot-1 { animation-delay: 0s !important; }
      .tridot-dot-2 { animation-delay: 0.2s !important; }
      .tridot-dot-3 { animation-delay: 0.4s !important; }
    `;
    document.head.appendChild(style);
  }

  // Inicializar todo cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectAnimationStyles();
    addTriDotLogo();
    initScrollReveal();
    init3DCardEffect();

    // Re-aplicar el logo después de navegación AJAX
    const observer = new MutationObserver(() => {
      addTriDotLogo();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Exportar para uso externo si es necesario
  window.TriDot = {
    init,
    addTriDotLogo,
    initScrollReveal,
    init3DCardEffect
  };

})();
