#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor Backend para Mercado Pago
Maneja las llamadas a la API de Mercado Pago de forma segura
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.request
import urllib.parse
from urllib.error import HTTPError

# Configuración de Mercado Pago
ACCESS_TOKEN = 'APP_USR-8900921273242040-120803-824f0bf5b0c262bdabee1d6761e1d65a-1516215604'
MP_API_URL = 'https://api.mercadopago.com/checkout/preferences'

class MercadoPagoHandler(BaseHTTPRequestHandler):
    
    def _set_cors_headers(self):
        """Configurar headers CORS para permitir peticiones desde el frontend"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        """Manejar preflight requests de CORS"""
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()
    
    def do_POST(self):
        """Manejar solicitudes POST para crear preferencias de pago"""
        if self.path == '/create-preference':
            try:
                # Leer datos del body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                preference_data = json.loads(post_data.decode('utf-8'))
                
                print(f"📦 Recibida solicitud de pago: {preference_data.get('external_reference', 'N/A')}")
                
                # Preparar request a Mercado Pago
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {ACCESS_TOKEN}'
                }
                
                data = json.dumps(preference_data).encode('utf-8')
                request = urllib.request.Request(
                    MP_API_URL,
                    data=data,
                    headers=headers,
                    method='POST'
                )
                
                # Llamar a Mercado Pago
                try:
                    with urllib.request.urlopen(request) as response:
                        mp_response = json.loads(response.read().decode('utf-8'))
                        
                        print(f"✅ Preferencia creada: {mp_response.get('id', 'N/A')}")
                        print(f"🔗 Link de pago: {mp_response.get('init_point', 'N/A')}")
                        
                        # Enviar respuesta exitosa al frontend
                        self.send_response(200)
                        self._set_cors_headers()
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps(mp_response).encode('utf-8'))
                        
                except HTTPError as e:
                    error_body = e.read().decode('utf-8')
                    print(f"❌ Error de Mercado Pago: {error_body}")
                    
                    self.send_response(e.code)
                    self._set_cors_headers()
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'error': 'Error de Mercado Pago',
                        'details': error_body
                    }).encode('utf-8'))
                    
            except Exception as e:
                print(f"❌ Error en el servidor: {str(e)}")
                
                self.send_response(500)
                self._set_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'error': 'Error interno del servidor',
                    'message': str(e)
                }).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_GET(self):
        """Manejar solicitudes GET para verificar que el servidor está funcionando"""
        if self.path == '/health':
            self.send_response(200)
            self._set_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'OK',
                'message': 'Servidor de Mercado Pago funcionando correctamente'
            }).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def log_message(self, format, *args):
        """Override para logging más limpio"""
        print(f"🌐 {self.address_string()} - {format % args}")


def run_server(port=3000):
    """Iniciar el servidor"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, MercadoPagoHandler)
    
    print("=" * 60)
    print("🚀 Servidor Backend de Mercado Pago")
    print("=" * 60)
    print(f"✅ Servidor corriendo en http://localhost:{port}")
    print(f"📝 Endpoint: http://localhost:{port}/create-preference")
    print(f"💳 Listo para procesar pagos reales de Mercado Pago")
    print("=" * 60)
    print("\nPresiona Ctrl+C para detener el servidor\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n⏹️  Servidor detenido")
        httpd.shutdown()


if __name__ == '__main__':
    run_server(3000)
