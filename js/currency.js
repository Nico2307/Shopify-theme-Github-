// Sistema de Gestión de Moneda y País
class CurrencySystem {
    constructor() {
        this.currencies = {
            COP: { symbol: '$', name: 'Peso Colombiano', rate: 1 },
            USD: { symbol: '$', name: 'Dólar', rate: 0.00025 }, // 1 COP ≈ 0.00025 USD
            EUR: { symbol: '€', name: 'Euro', rate: 0.00023 }, // 1 COP ≈ 0.00023 EUR
            MXN: { symbol: '$', name: 'Peso Mexicano', rate: 0.0042 }, // 1 COP ≈ 0.0042 MXN
            ARS: { symbol: '$', name: 'Peso Argentino', rate: 0.24 }, // 1 COP ≈ 0.24 ARS
            BRL: { symbol: 'R$', name: 'Real Brasileño', rate: 0.0012 }, // 1 COP ≈ 0.0012 BRL
            CLP: { symbol: '$', name: 'Peso Chileno', rate: 0.22 }, // 1 COP ≈ 0.22 CLP
            PEN: { symbol: 'S/', name: 'Sol Peruano', rate: 0.00085 }, // 1 COP ≈ 0.00085 PEN
            VES: { symbol: 'Bs', name: 'Bolívar Venezolano', rate: 0.01 }, // 1 COP ≈ 0.01 VES
            GBP: { symbol: '£', name: 'Libra Esterlina', rate: 0.00019 }, // 1 COP ≈ 0.00019 GBP
        };

        this.countries = {
            CO: { name: 'Colombia', currency: 'COP', flag: '🇨🇴' },
            US: { name: 'Estados Unidos', currency: 'USD', flag: '🇺🇸' },
            MX: { name: 'México', currency: 'MXN', flag: '🇲🇽' },
            AR: { name: 'Argentina', currency: 'ARS', flag: '🇦🇷' },
            BR: { name: 'Brasil', currency: 'BRL', flag: '🇧🇷' },
            CL: { name: 'Chile', currency: 'CLP', flag: '🇨🇱' },
            PE: { name: 'Perú', currency: 'PEN', flag: '🇵🇪' },
            VE: { name: 'Venezuela', currency: 'VES', flag: '🇻🇪' },
            ES: { name: 'España', currency: 'EUR', flag: '🇪🇸' },
            GB: { name: 'Reino Unido', currency: 'GBP', flag: '🇬🇧' },
        };

        this.currentCountry = null;
        this.currentCurrency = null;
        this.init();
    }

    init() {
        // Cargar configuración guardada
        const saved = localStorage.getItem('YunGuer_currency_config');
        if (saved) {
            const config = JSON.parse(saved);
            this.currentCountry = config.country;
            this.currentCurrency = config.currency;
        } else {
            // Detectar país automáticamente
            this.detectCountry();
        }
    }

    async detectCountry() {
        try {
            // Intentar detectar país por IP usando API gratuita
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            const countryCode = data.country_code;
            
            if (this.countries[countryCode]) {
                this.setCountry(countryCode);
            } else {
                // País por defecto: Colombia
                this.setCountry('CO');
            }
        } catch (error) {
            console.log('No se pudo detectar el país, usando Colombia por defecto');
            this.setCountry('CO');
        }
    }

    setCountry(countryCode) {
        if (!this.countries[countryCode]) {
            countryCode = 'CO'; // Default a Colombia
        }

        this.currentCountry = countryCode;
        this.currentCurrency = this.countries[countryCode].currency;

        // Guardar configuración
        localStorage.setItem('YunGuer_currency_config', JSON.stringify({
            country: this.currentCountry,
            currency: this.currentCurrency
        }));

        // Actualizar UI
        this.updatePricesInPage();
    }

    convertPrice(priceInCOP) {
        if (!this.currentCurrency) return priceInCOP;
        
        const rate = this.currencies[this.currentCurrency].rate;
        const convertedPrice = priceInCOP * rate;
        
        return Math.round(convertedPrice);
    }

    formatPrice(priceInCOP) {
        const convertedPrice = this.convertPrice(priceInCOP);
        const symbol = this.currencies[this.currentCurrency].symbol;
        
        return `${symbol}${convertedPrice.toLocaleString()}`;
    }

    getCurrencyInfo() {
        return {
            country: this.countries[this.currentCountry],
            currency: this.currencies[this.currentCurrency],
            code: this.currentCurrency
        };
    }

    updatePricesInPage() {
        // Actualizar todos los precios en la página
        document.querySelectorAll('[data-price]').forEach(element => {
            const priceInCOP = parseInt(element.getAttribute('data-price'));
            element.textContent = this.formatPrice(priceInCOP);
        });

        // Actualizar selector de moneda si existe
        const currencySelector = document.getElementById('currentCurrency');
        if (currencySelector) {
            const info = this.getCurrencyInfo();
            currencySelector.textContent = `${info.country.flag} ${info.currency.name}`;
        }
    }

    showCountrySelector() {
        const modal = document.createElement('div');
        modal.className = 'currency-modal active';
        
        const countriesList = Object.keys(this.countries).map(code => {
            const country = this.countries[code];
            const isSelected = code === this.currentCountry;
            
            return `
                <div class="country-option ${isSelected ? 'selected' : ''}" onclick="window.currencySystem.selectCountry('${code}')">
                    <span class="country-flag">${country.flag}</span>
                    <div class="country-info">
                        <div class="country-name">${country.name}</div>
                        <div class="country-currency">${this.currencies[country.currency].name} (${this.currencies[country.currency].symbol})</div>
                    </div>
                    ${isSelected ? '<span class="check-icon">✓</span>' : ''}
                </div>
            `;
        }).join('');

        modal.innerHTML = `
            <div class="currency-modal-content">
                <div class="currency-modal-header">
                    <h3>🌎 Selecciona tu país</h3>
                    <p>Los precios se convertirán automáticamente</p>
                    <button onclick="window.currencySystem.closeCountrySelector()" class="close-modal-btn">&times;</button>
                </div>
                <div class="countries-list">
                    ${countriesList}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    selectCountry(countryCode) {
        this.setCountry(countryCode);
        this.closeCountrySelector();
        
        // Mostrar notificación
        const info = this.getCurrencyInfo();
        this.showNotification(`País cambiado a ${info.country.name}. Precios en ${info.currency.name}.`);
        
        // Recargar página para actualizar todos los precios
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    closeCountrySelector() {
        const modal = document.querySelector('.currency-modal');
        if (modal) {
            modal.remove();
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'currency-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Crear instancia global
window.currencySystem = new CurrencySystem();

// Estilos CSS para el modal de país
const currencyStyles = document.createElement('style');
currencyStyles.textContent = `
    .currency-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }

    .currency-modal.active {
        display: flex;
    }

    .currency-modal-content {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .currency-modal-header {
        padding: 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        position: relative;
    }

    .currency-modal-header h3 {
        color: #fff;
        margin: 0 0 8px 0;
        font-size: 1.5rem;
    }

    .currency-modal-header p {
        color: #9b9b9b;
        margin: 0;
        font-size: 0.9rem;
    }

    .close-modal-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        color: #9b9b9b;
        font-size: 2rem;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 32px;
        height: 32px;
        transition: color 0.3s ease;
    }

    .close-modal-btn:hover {
        color: #fff;
    }

    .countries-list {
        max-height: 500px;
        overflow-y: auto;
        padding: 8px;
    }

    .country-option {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 12px;
        margin-bottom: 8px;
        background: rgba(255, 255, 255, 0.03);
        border: 2px solid transparent;
    }

    .country-option:hover {
        background: rgba(59, 130, 246, 0.1);
        border-color: rgba(59, 130, 246, 0.3);
    }

    .country-option.selected {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.5);
    }

    .country-flag {
        font-size: 2rem;
    }

    .country-info {
        flex: 1;
    }

    .country-name {
        color: #fff;
        font-weight: 600;
        margin-bottom: 4px;
    }

    .country-currency {
        color: #9b9b9b;
        font-size: 0.9rem;
    }

    .check-icon {
        color: #3b82f6;
        font-size: 1.5rem;
        font-weight: 700;
    }

    .currency-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(59, 130, 246, 0.95);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }

    .currency-notification.show {
        opacity: 1;
        transform: translateY(0);
    }

    .currency-selector-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }

    .currency-selector-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(currencyStyles);
