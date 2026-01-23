import React from 'react';
import { Link } from 'react-router-dom';
import {
  TruckIcon,
  CreditCardIcon,
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: TruckIcon,
    title: 'Envíos a todo el país',
    description: 'Entrega rápida y segura. Envío gratis en tu primera compra.',
  },
  {
    icon: CreditCardIcon,
    title: 'Opciones de pago seguras',
    description: 'Múltiples métodos de pago disponibles. 100% seguro.',
  },
  {
    icon: SparklesIcon,
    title: 'Precios competitivos',
    description: 'Los mejores precios sin comprometer la calidad.',
  },
  {
    icon: ClockIcon,
    title: 'Soporte 24/7',
    description: 'Soporte disponible todos los días de la semana.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Garantía total',
    description: 'Garantía del fabricante en todos los productos.',
  },
  {
    icon: CheckCircleIcon,
    title: 'Productos originales',
    description: 'Solo marcas certificadas y de confianza.',
  }
];

export default function Section3() {
  return (
    <section className="relative w-full bg-white text-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Hero section with text and features */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Main heading */}
        <div className="mb-12 md:mb-24 text-center md:text-left">
          <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-4 md:mb-8 leading-tight text-gray-900">
            La mejor opción en <br />
            <span className="text-blue-600">
              distribución eléctrica
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto md:mx-0">
            Con más de 20 años de experiencia, somos su aliado para encontrar los mejores productos eléctricos con precios competitivos y un servicio de calidad.
          </p>
        </div>

        {/* Features as a list */}
        <div className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-8 md:pb-0 mb-16 md:mb-24 -mx-6 px-6 md:mx-0 md:px-0">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-auto snap-center flex gap-4 md:gap-6 group p-4 rounded-xl bg-white border border-gray-100 md:border-transparent hover:bg-gray-50 transition-colors shadow-sm md:shadow-none">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats section - simple and clean */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 py-12 md:py-16 border-y border-gray-100 mb-16 md:mb-24">
          <div className="text-center md:text-left">
            <div className="text-4xl md:text-6xl font-black text-blue-600 mb-2">20+</div>
            <p className="text-gray-500 font-medium">Años de experiencia en el mercado</p>
          </div>
          <div className="text-center md:text-left">
            <div className="text-4xl md:text-6xl font-black text-cyan-600 mb-2">50K+</div>
            <p className="text-gray-500 font-medium">Clientes satisfechos confían en nosotros</p>
          </div>
          <div className="text-center md:text-left">
            <div className="text-4xl md:text-6xl font-black text-teal-600 mb-2">10K+</div>
            <p className="text-gray-500 font-medium">Productos disponibles en catálogo</p>
          </div>
        </div>

        {/* CTA section - minimal and elegant */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between text-center md:text-left">
          <div>
            <h3 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">¿Listo para empezar?</h3>
            <p className="text-gray-600 text-base md:text-lg">Explora miles de productos eléctricos a los mejores precios.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              to="/Catalogo"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <span>Explorar Catálogo</span>
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/Contacto"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-900 font-bold rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}