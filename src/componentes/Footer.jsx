import React from 'react';
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa';
import logo from '../pics/protexlogo.png'

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-6 py-8 md:py-16">
        {/* Grid principal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-12">

          {/* Logo y descripción - Order 1 on mobile */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start space-y-4 order-1">
            <div className="flex items-center space-x-2 md:space-x-3">
              <img src={logo} alt="Protex" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
              <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">Protex</h2>
            </div>
            <p className="hidden md:block text-sm text-gray-500 text-left max-w-xs leading-relaxed">
              Soluciones industriales de alta calidad para su negocio. Con la confianza de profesionales.
            </p>
          </div>

          {/* Redes Sociales - Order 2 on mobile (Top Right) */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-end md:items-start order-2 md:order-4">
            <h3 className="hidden md:block text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Síguenos</h3>
            <div className="flex space-x-2 md:space-x-4 mt-1 md:mt-0">
              <a
                href="https://instagram.com/lorang_mx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 p-2 md:p-3 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
              >
                <FaInstagram className="h-4 w-4 md:h-5 md:w-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
              </a>
              <a
                href="https://facebook.com/lorangmx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 p-2 md:p-3 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
              >
                <FaFacebook className="h-4 w-4 md:h-5 md:w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Navegación - Order 3 on mobile (Bottom Left) */}
          <div className="flex flex-col items-start order-3 md:order-2">
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 md:mb-4">Navegación</h3>
            <ul className="space-y-2 md:space-y-3 text-left">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm font-medium">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/Catalogo" className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm font-medium">
                  Productos
                </a>
              </li>
              <li>
                <a href="/Contacto" className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm font-medium">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/Empresa" className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm font-medium">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto - Order 4 on mobile (Bottom Right) */}
          <div className="flex flex-col items-start order-4 md:order-3">
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 md:mb-4">Contacto</h3>
            <div className="space-y-2 md:space-y-3 flex flex-col items-start">
              <a
                href="mailto:Protex@gmail.com"
                className="flex items-center space-x-2 md:space-x-3 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <FaEnvelope className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm font-medium">Protex@gmail.com</span>
              </a>
              <a
                href="tel:+528119817118"
                className="flex items-center space-x-2 md:space-x-3 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <FaPhone className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm font-medium">+52 8119817118</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="mt-12 mb-8 border-t border-gray-200"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Protex. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/politica-privacidad" className="text-gray-500 hover:text-blue-500 transition-colors duration-300">
              Política de Privacidad
            </a>
            <span className="text-gray-700">•</span>
            <a href="/terminos-condiciones" className="text-gray-500 hover:text-blue-500 transition-colors duration-300">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
