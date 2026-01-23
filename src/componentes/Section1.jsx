import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from './productosData';
import { ChevronRight, ChevronLeft, Star, ShieldCheck, Zap } from 'lucide-react';

export default function Section1() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Use the actual products for the hero slider
  const heroItems = products.slice(0, 5); // Take top 5 products for the slider

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroItems.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroItems.length) % heroItems.length);

  const currentProduct = heroItems[currentSlide];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-gray-100 to-blue-50/50 rounded-full blur-3xl opacity-60" />
        {/* Animated accent blob */}
        <div key={currentSlide} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-[100px] transition-all duration-1000" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 py-1 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content: Text */}
          <div className="space-y-2 lg:space-y-3 order-2 lg:order-1 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>Protección Premium</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
                <span className="block">{currentProduct.title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  {currentProduct.title.split(' ').slice(2, 4).join(' ')}
                </span>
                <span className="text-2xl sm:text-4xl font-light text-gray-400 block mt-2">
                  {currentProduct.title.split(' ').slice(4).join(' ')}
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed border-l-4 border-blue-500/20 pl-4 py-1">
                {currentProduct.details}
              </p>

              <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <Zap size={16} className="text-amber-500 fill-amber-500" /> Alto Rendimiento
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-blue-500 fill-blue-500" /> Alta Calidad
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate(`/producto/${currentProduct.id}`)}
                className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Ver Detalle <ChevronRight size={18} />
                </span>
              </button>

              <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Precio</span>
                <span className="text-xl font-bold text-gray-900">${currentProduct.price}</span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-4 pt-8">
              <button onClick={prevSlide} className="p-3 rounded-full hover:bg-gray-100 border border-gray-200 transition-colors text-gray-600 hover:text-gray-900">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {heroItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="p-3 rounded-full hover:bg-gray-100 border border-gray-200 transition-colors text-gray-600 hover:text-gray-900">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Content: Product Image */}
          <div className="order-1 lg:order-2 relative h-[50vh] lg:h-[70vh] flex items-center justify-center perspective-1000">
            {/* Decorative rings background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-[500px] h-[500px] border border-gray-200 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[400px] h-[400px] border border-gray-200 rounded-full animate-[spin_40s_linear_infinite_reverse] border-dashed" />
              <div className="absolute w-[600px] h-[600px] border border-blue-100/50 rounded-full" />
            </div>

            {/* Main Image Container */}
            <div className="relative z-10 transition-all duration-700 w-full max-w-md mx-auto aspect-square flex items-center justify-center p-8">
              {/* Glass Card Background */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/60 shadow-2xl shadow-blue-900/5 rotate-[-6deg] transition-transform duration-500 group-hover:rotate-0" />

              {/* Product Image */}
              <div
                key={currentProduct.id}
                className="relative w-full h-full p-6 transition-all duration-700 animate-float"
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-full object-contain drop-shadow-2xl filter contrast-110"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))'
                  }}
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -right-4 top-10 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 animate-bounce-slow">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Disponible
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1.02); }
          50% { transform: translateY(-15px) scale(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes bounce-slow {
           0%, 100% { transform: translateY(0); }
           50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
           animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
