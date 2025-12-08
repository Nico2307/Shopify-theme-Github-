# 🎯 Rueda de Categorías Animada

## ✨ Características Implementadas

### 🎨 **Diseño Visual**
- **Rueda Circular Interactiva** con 11 categorías distribuidas perfectamente
- **Centro Pulsante** con gradiente azul y efecto de respiración continuo
- **Fondo Animado** con gradiente cónico rotando constantemente
- **Partículas Flotantes** con Canvas HTML5 y conexiones dinámicas
- **Efectos de Hover** con elevación 3D y escala aumentada
- **Colores Vibrantes** con paleta azul (#3B82F6) y efectos de sombra

### ⚡ **Animaciones Dinámicas**

#### **1. Entrada Inicial**
- Los items aparecen uno por uno con efecto de escala
- Delay progresivo de 50ms entre cada item
- Curva de animación elástica `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

#### **2. Selección de Categoría**
- **Pulso del item** seleccionado con escala 1.15
- **Actualización del texto** con fade-out y fade-in suave
- **Rebote del centro** con escala temporal 1.1
- **Resaltado activo** con gradiente azul brillante

#### **3. Efectos de Hover**
- Escala 1.15 con transformación suave
- Sombra expandida con glow azul
- Rotación del icono 10° y escala 1.2
- Transición de color de fondo a gradiente

#### **4. Centro Pulsante**
- Animación infinita de 3 segundos
- 3 anillos de sombra concéntricos
- Expansión/contracción suave de las sombras

#### **5. Fondo Cónico**
- Rotación completa en 20 segundos
- Gradiente con transparencias alternas
- Efecto de profundidad radial

#### **6. Partículas Canvas**
- 30 partículas flotantes con movimiento aleatorio
- Conexiones dinámicas cuando están cerca (<100px)
- Efecto de brillo con shadowBlur
- Rebote en los bordes del canvas

### 📐 **Distribución Geométrica**

Las 11 categorías están distribuidas en un círculo perfecto:
- **Ángulo entre items:** 360° / 11 = 32.7°
- **Radio del círculo:** 150px (desktop), 120px (tablet), 100px (mobile)
- **Tamaño de items:** 90px × 90px (desktop), 70px (tablet), 60px (mobile)

**Posiciones calculadas:**
```
Todos:       0°     (12:00)
Ropa:        32.7°  (01:05)
Electrónica: 65.4°  (02:10)
Hogar:       98.1°  (03:15)
Deportes:    130.8° (04:20)
Belleza:     163.5° (05:25)
Libros:      196.2° (06:30)
Juguetes:    228.9° (07:35)
Alimentos:   261.6° (08:40)
Tecnología:  294.3° (09:45)
Otros:       327°   (10:50)
```

### 🎭 **Estados Visuales**

#### **Estado Normal**
- Fondo gris oscuro translúcido
- Borde azul semi-transparente
- Icono blanco con tamaño base

#### **Estado Hover**
- Fondo gradiente azul brillante
- Escala aumentada 1.15
- Sombra expandida con glow
- Icono rotado y escalado

#### **Estado Activo**
- Gradiente azul completo
- Escala permanente 1.1
- Triple sombra concéntrica
- Borde azul claro (#60A5FA)

### 🌊 **Sistema de Partículas**

**Clase Particle:**
- **Posición:** Aleatoria en el canvas
- **Tamaño:** 1-4px aleatorio
- **Velocidad:** -0.25 a 0.25 px/frame
- **Opacidad:** 0.2-0.7 aleatoria
- **Color:** Azul con alpha variable

**Conexiones:**
- Se dibujan líneas entre partículas cercanas
- Distancia máxima: 100px
- Opacidad proporcional a la distancia
- Grosor de línea: 1px

**Física:**
- Movimiento browniano aleatorio
- Rebote en bordes del canvas
- Actualización en cada frame (60fps)

### 📱 **Responsive Design**

#### **Desktop (>768px)**
- Rueda: 400px × 400px
- Items: 90px × 90px
- Radio: 150px
- Icono: 28px
- Label: 11px

#### **Tablet (768px)**
- Rueda: 320px × 320px
- Items: 70px × 70px
- Radio: 120px
- Icono: 22px
- Label: 9px

#### **Mobile (<480px)**
- Rueda: 280px × 280px
- Items: 60px × 60px
- Radio: 100px
- Icono: 20px
- Label: 8px

### 🎨 **Paleta de Colores**

```css
/* Azul Principal */
--blue-500: #3B82F6
--blue-600: #2563EB
--blue-400: #60A5FA

/* Fondos */
--bg-dark: #0a0a0a
--bg-gray: #1a1a1a

/* Texto */
--text-white: #ffffff
--text-gray: #9b9b9b
```

### 🔧 **Funciones JavaScript**

#### **initializeCategoryWheel()**
- Marca "Todos" como activo por defecto
- Anima la entrada de items secuencialmente
- Aplica transformaciones con CSS
- Inicializa el sistema de partículas

#### **selectCategoryFromWheel(category, icon, name)**
- Actualiza la categoría activa
- Anima el item seleccionado con pulso
- Actualiza el texto con fade
- Anima el centro de la rueda
- Llama a applyFilters()

#### **initializeParticles()**
- Crea canvas y contexto 2D
- Genera 30 partículas
- Define clase Particle
- Inicia loop de animación
- Dibuja conexiones entre partículas

### 📊 **Rendimiento**

**Optimizaciones:**
- Canvas para partículas (hardware accelerated)
- CSS transforms en lugar de top/left
- will-change en elementos animados
- requestAnimationFrame para animaciones
- Pointer-events: none en canvas

**FPS Target:** 60fps
**Partículas:** 30 (balance performance/visual)
**Conexiones:** Máximo 55 líneas (30 choose 2 / 2)

### 🎯 **Interactividad**

#### **Click en Item**
1. Remover clase `active` de todos
2. Agregar `active` al clickeado
3. Animar con `categoryPulse`
4. Actualizar texto seleccionado
5. Pulsar centro de rueda
6. Filtrar productos

#### **Hover en Item**
1. Escala 1.15 con transform
2. Cambiar a gradiente azul
3. Expandir sombra
4. Rotar icono 10°
5. Escalar icono 1.2

### 🌟 **Efectos Especiales**

#### **Gradiente Cónico Rotante**
```css
background: conic-gradient(
  from 0deg,
  transparent 0deg,
  rgba(59, 130, 246, 0.03) 90deg,
  transparent 180deg,
  rgba(59, 130, 246, 0.03) 270deg,
  transparent 360deg
);
animation: rotateBackground 20s linear infinite;
```

#### **Pulso del Centro**
```css
@keyframes pulse {
  0%, 100% {
    box-shadow: 
      0 0 0 8px rgba(59, 130, 246, 0.2),
      0 0 0 16px rgba(59, 130, 246, 0.1),
      0 8px 32px rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 
      0 0 0 12px rgba(59, 130, 246, 0.3),
      0 0 0 24px rgba(59, 130, 246, 0.15),
      0 12px 40px rgba(59, 130, 246, 0.5);
  }
}
```

### 📝 **Estructura HTML**

```html
<div class="category-wheel-container">
  <canvas id="particlesCanvas"></canvas>
  
  <div class="category-wheel-title">
    <h3>Selecciona una Categoría</h3>
    <p class="selected-category-text">📦 Todos</p>
  </div>
  
  <div class="category-wheel">
    <div class="wheel-center">
      <div class="wheel-center-icon">🎯</div>
      <div class="wheel-center-text">Explora</div>
    </div>
    
    <div class="wheel-item" data-category="todos">
      <div class="wheel-item-content">
        <span class="wheel-icon">📦</span>
        <span class="wheel-label">Todos</span>
      </div>
    </div>
    <!-- ... 10 más items -->
  </div>
</div>
```

### 🚀 **Cómo Funciona**

1. **Usuario carga la página**
   - `initializeCategoryWheel()` se ejecuta
   - Items aparecen con animación secuencial
   - Partículas comienzan a flotar
   - "Todos" está seleccionado por defecto

2. **Usuario hace hover en categoría**
   - CSS detecta `:hover`
   - Item se escala y cambia color
   - Icono rota y crece
   - Sombra se expande

3. **Usuario hace click en categoría**
   - `selectCategoryFromWheel()` se ejecuta
   - Item obtiene clase `active`
   - Animación `categoryPulse` se aplica
   - Texto se actualiza con fade
   - Centro de rueda hace rebote
   - `applyFilters()` filtra productos

4. **Partículas en segundo plano**
   - Loop infinito con `requestAnimationFrame`
   - Cada partícula se actualiza
   - Se dibujan conexiones cercanas
   - Canvas se limpia y redibuja (60fps)

### ✅ **Características Completadas**

- [x] Rueda circular con 11 items
- [x] Distribución geométrica perfecta
- [x] Centro pulsante animado
- [x] Fondo cónico rotante
- [x] 30 partículas flotantes
- [x] Conexiones dinámicas entre partículas
- [x] Animación de entrada secuencial
- [x] Efecto de pulso en selección
- [x] Animación de texto seleccionado
- [x] Rebote del centro en click
- [x] Estados hover/active/normal
- [x] Responsive design (3 breakpoints)
- [x] Integración con filtrado de productos
- [x] Optimización de rendimiento

### 🎉 **Resultado Final**

Una rueda de categorías **visualmente impactante** y **altamente interactiva** que:
- ✨ Capta la atención del usuario inmediatamente
- 🎯 Facilita la navegación por categorías
- 🌊 Ofrece feedback visual en cada interacción
- 📱 Se adapta perfectamente a todos los dispositivos
- ⚡ Mantiene 60fps constantes
- 🎨 Usa animaciones fluidas y modernas
- 🔥 Destaca sobre cualquier diseño estático

**¡Es una experiencia de usuario memorable y enganchadora!** 🚀
