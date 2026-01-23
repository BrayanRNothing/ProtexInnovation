import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from './productosData';

export default function Section1Mobile() {
  const navigate = useNavigate();
  // Seleccionamos los primeros 5 productos para el carrusel
  const featuredProducts = products.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotación automática
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <section className="relative w-full h-[85vh] flex flex-col items-center justify-between bg-gray-50 pt-10 pb-8 px-6 overflow-hidden">

      {/* Texto Principal - Arriba */}
      <div className="flex flex-col items-center text-center space-y-2 z-10">
        <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
          Nueva Colección
        </h2>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Protex Innovation
        </h1>
        <p className="text-lg text-gray-600 max-w-[280px]">
          Protección eléctrica profesional.
        </p>

        {/* Enlace de texto simple */}
        <button
          onClick={() => navigate('/Catalogo')}
          className="mt-2 text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
        >
          Comprar ahora <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      {/* Carrusel de Imágenes */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative my-4">
        <div className="relative w-full h-full flex items-center justify-center">
          {featuredProducts.map((product, index) => (
            <img
              key={product.id}
              src={product.image}
              alt={product.title}
              className={`absolute w-full max-w-[320px] h-auto object-contain drop-shadow-2xl transition-all duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              style={{ maxHeight: '40vh' }}
            />
          ))}
        </div>

        {/* Indicadores (Puntos) */}
        <div className="flex gap-2 mt-6 z-10">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gray-800 w-6' : 'bg-gray-300 w-2'
                }`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Botón Principal - Abajo */}
      <div className="w-full z-10">
        <button
          onClick={() => navigate('/Catalogo')}
          className="w-full py-4 bg-black text-white text-lg font-semibold rounded-full shadow-lg active:scale-[0.98] transition-transform"
        >
          Ver Catálogo
        </button>
      </div>

    </section>
  );
}
