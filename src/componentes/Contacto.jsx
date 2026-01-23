import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaClock } from 'react-icons/fa';

export default function Contacto() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 pt-[15px] md:pt-[15px] pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Formulario de contacto */}
          <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
              Envíanos un mensaje
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="+52 81 1234 5678"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  placeholder="¿Sobre qué quieres hablar?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Enviar mensaje
              </button>

              <p className="text-sm text-gray-600 text-center">
                Te responderemos lo antes posible
              </p>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-6">

            {/* Tarjetas de contacto directo */}
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-300 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-all">
                  <FaEnvelope className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <a href="mailto:Protex@gmail.com" className="text-gray-600 hover:text-blue-500 transition-colors">
                    Protex@gmail.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Respuesta en 24-48 horas</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-300 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-all">
                  <FaPhone className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Teléfono</h3>
                  <a href="tel:+528119817118" className="text-gray-600 hover:text-blue-500 transition-colors">
                    +52 81 1981 7118
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Lun - Sáb: 9:00am - 6:00pm</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-300 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-all">
                  <FaMapMarkerAlt className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Ubicación</h3>
                  <p className="text-gray-600">Monterrey, Nuevo León</p>
                  <p className="text-sm text-gray-500 mt-1">México</p>
                </div>
              </div>
            </div>

            {/* Horario */}
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Horario de atención</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunes - Viernes</span>
                  <span className="text-gray-900 font-medium">9:00am - 6:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado</span>
                  <span className="text-gray-900 font-medium">10:00am - 2:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="text-gray-500">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Síguenos en redes</h3>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://wa.me/528119817118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-green-500/10 border border-gray-300 hover:border-green-500 transition-all group"
                >
                  <FaWhatsapp className="w-7 h-7 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-600 group-hover:text-green-500">WhatsApp</span>
                </a>
                <a
                  href="https://facebook.com/lorangmx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-blue-500/10 border border-gray-300 hover:border-blue-500 transition-all group"
                >
                  <FaFacebook className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-600 group-hover:text-blue-500">Facebook</span>
                </a>
                <a
                  href="https://instagram.com/lorang_mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-pink-500/10 border border-gray-300 hover:border-pink-500 transition-all group"
                >
                  <FaInstagram className="w-7 h-7 text-pink-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-600 group-hover:text-pink-500">Instagram</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}