import React from 'react';
import { Link } from 'react-router-dom';
import {
  BoltIcon,
  WrenchIcon,
  LightBulbIcon,
  CubeIcon,
  RectangleStackIcon,
  SparklesIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const categories = [
  {
    id: 'centro-carga',
    label: 'Centros de Carga',
    icon: CubeIcon,
    colorClasses: {
      bg: 'bg-slate-700',
      text: 'text-slate-700',
      groupHoverBg: 'group-hover:bg-slate-700',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Centros de distribución eléctrica'
  },
  {
    id: 'interruptores-1p',
    label: 'Interruptores 1 Polo',
    icon: BoltIcon,
    colorClasses: {
      bg: 'bg-teal-600',
      text: 'text-teal-600',
      groupHoverBg: 'group-hover:bg-teal-600',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Interruptores termomagnéticos de un polo'
  },
  {
    id: 'interruptores-2p',
    label: 'Interruptores 2 Polos',
    icon: BoltIcon,
    colorClasses: {
      bg: 'bg-slate-600',
      text: 'text-slate-600',
      groupHoverBg: 'group-hover:bg-slate-600',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Dispositivos de control bipolar'
  },
  {
    id: 'interruptores-3p',
    label: 'Interruptores 3 Polos',
    icon: BoltIcon,
    colorClasses: {
      bg: 'bg-amber-600',
      text: 'text-amber-600',
      groupHoverBg: 'group-hover:bg-amber-600',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Interruptores industriales tripolares'
  },
  {
    id: 'conductores',
    label: 'Conductores Eléctricos',
    icon: RectangleStackIcon,
    colorClasses: {
      bg: 'bg-slate-700',
      text: 'text-slate-700',
      groupHoverBg: 'group-hover:bg-slate-700',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Cables y conductores de calidad'
  },
  {
    id: 'iluminacion',
    label: 'Iluminación',
    icon: LightBulbIcon,
    colorClasses: {
      bg: 'bg-teal-600',
      text: 'text-teal-600',
      groupHoverBg: 'group-hover:bg-teal-600',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Lámparas y sistemas de iluminación'
  },
  {
    id: 'herramientas',
    label: 'Herramientas',
    icon: WrenchIcon,
    colorClasses: {
      bg: 'bg-slate-600',
      text: 'text-slate-600',
      groupHoverBg: 'group-hover:bg-slate-600',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Herramientas profesionales y de precisión'
  },
  {
    id: 'accesorios',
    label: 'Accesorios',
    icon: SparklesIcon,
    colorClasses: {
      bg: 'bg-amber-600',
      text: 'text-amber-600',
      groupHoverBg: 'group-hover:bg-amber-600',
      groupHoverText: 'group-hover:text-white'
    },
    description: 'Accesorios y componentes eléctricos'
  }
];

export default function Section2() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 md:py-20 px-4">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight text-gray-900">
            Nuestras <span className="text-blue-600">Categorías</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
            Explora nuestros departamentos y encuentra exactamente lo que necesitas para tus proyectos eléctricos
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/Catalogo?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-gray-200 bg-white hover:bg-white transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 hover:border-blue-200 shadow-sm hover:shadow-xl"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${category.colorClasses.bg}`} />

                {/* Content */}
                <div className="relative z-10 p-4 md:p-6 h-full flex flex-col">
                  {/* Icon Container */}
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gray-50 ${category.colorClasses.groupHoverBg} p-2 md:p-3 mb-3 md:mb-4 flex items-center justify-center transition-colors duration-300`}>
                    <Icon className={`w-full h-full ${category.colorClasses.text} ${category.colorClasses.groupHoverText} transition-colors duration-300`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-all duration-300 leading-tight">
                    {category.label}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 flex-grow line-clamp-2">
                    {category.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1 md:gap-2 text-blue-600 font-medium text-xs md:text-sm group-hover:translate-x-1 transition-transform duration-300 mt-auto">
                    <span>Ver</span>
                    <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/Catalogo"
            className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            <span>Ver Catálogo Completo</span>
            <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
