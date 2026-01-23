import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CarContext";
import { useToast } from "./Toast";
import logo from '../pics/protexlogonavbar.png'

export default function Navbar() {
  const { cart, removeFromCart, addToCart, removeAllFromCart, clearCart } = useCart();
  const { addToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [empresaDropdown, setEmpresaDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Línea 15
  const empresaRef = useRef();
  const location = useLocation();
  // Estado para el blur - siempre activo
  const [hasBlur, setHasBlur] = useState(true);

  // El blur siempre está activo
  useEffect(() => {
    setHasBlur(true);
  }, []);

  // Mostrar siempre el navbar cuando el carrito está abierto
  useEffect(() => {
    // Código si es necesario para el carrito
  }, [cartOpen]);

  // Cierra el dropdown si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (empresaRef.current && !empresaRef.current.contains(event.target)) {
        setEmpresaDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Calcular total de productos (sumando cantidades)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular total $
  const totalPrice = cart.reduce((acc, item) => acc + (item.price || item.precio) * item.quantity, 0);

  const isLightPage = location.pathname.startsWith('/Catalogo') || location.pathname.startsWith('/producto');
  const navLinkClass = "text-gray-900 text-lg md:text-xl font-semibold tracking-wide transition-colors duration-200 relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-8";
  const logoTextClass = "ml-2 text-lg sm:text-xl md:text-3xl font-black tracking-tight text-gray-900 animate-fade-in-logo whitespace-nowrap";
  const desktopCartIconClass = "w-7 h-7 text-gray-900 hover:text-gray-700 transition-colors";
  const mobileButtonClass = "p-2 mr-1 text-gray-900 rounded focus:outline-none hover:text-gray-700 transition-colors";
  const mobileCartIconClass = "text-gray-900 w-7 h-7 hover:text-gray-700 transition-colors";
  const mobileMenuLinkClass = "py-2 text-lg text-gray-900 rounded hover:text-gray-700 transition-colors relative group after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>
      <nav
        className="w-full overflow-hidden fixed top-0 left-0 z-[100] transition-all duration-500"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div className="flex items-center h-14 md:h-16 w-full overflow-hidden">
          {/* Logo + nombre de tienda (neutro) alineado a la izquierda */}
          <div className="flex items-center flex-shrink-0 overflow-hidden">
            <a href="/" className="flex items-center text-2xl font-semibold overflow-hidden">
              <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                <div className="transition-transform duration-700 ease-out" style={{ animationDelay: '0.2s' }}>
                  <img src={logo} alt="Protex" className="w-14 h-14 object-contain" />
                </div>
              </div>
              <span className={logoTextClass} style={{ animationDelay: '0.7s' }}>
                Protex Innovation
              </span>
            </a>
          </div>
          {/* Desktop Menu (hidden on mobile) */}
          <div className="justify-end flex-1 hidden px-6 md:flex">
            <div className="flex items-center space-x-6">
              <Link to="/" className={navLinkClass}>Inicio</Link>
              <Link to="/Catalogo" className={navLinkClass}>Catálogo</Link>
              <Link to="/Empresa" className={navLinkClass}>Nosotros</Link>
              <Link to="/Contacto" className={navLinkClass}>Contacto</Link>
              <button className="relative" onClick={() => setCartOpen(true)} aria-label="Ver carrito">
                <svg xmlns="http://www.w3.org/2000/svg" className={desktopCartIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center text-[10px]">{totalItems}</span>
                )}
              </button>
            </div>
          </div>
          {/* Mobile Menu: hamburger and cart */}
          <div className="flex items-center justify-end flex-1 mr-2 md:hidden">
            <button
              className={mobileButtonClass}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {/* Hamburger icon */}
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="relative" onClick={() => setCartOpen(true)} aria-label="Ver carrito">
              <svg xmlns="http://www.w3.org/2000/svg" className={mobileCartIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center text-[10px]">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        <div
          className={`flex flex-row items-center justify-center w-full gap-3 px-4 border-b md:hidden transition-all duration-300
        ${mobileMenuOpen ? 'py-2 opacity-100 pointer-events-auto' : 'py-0 opacity-0 pointer-events-none border-none'}`}
          style={{
            height: mobileMenuOpen ? 'auto' : 0,
            overflow: 'hidden',
          }}
        >
          <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
          <Link to="/Catalogo" className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>Catálogo</Link>
          <Link to="/Empresa" className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>Nosotros</Link>
          <Link to="/Contacto" className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
        </div>
      </nav>
      {/* Spacer to offset the fixed navbar with tighter gap */}
      <div className="w-full h-14 md:h-16"></div>

      {/* Drawer lateral del carrito - FUERA del nav */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 border-gray-300">
          <h2 className="text-xl text-gray-900 font-bold ">Carrito de Compras</h2>
          <button
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4 bg-white">
          {cart.length === 0 ? (
            <p className="text-gray-500">No hay productos en el carrito.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex text-gray-900 items-center justify-between pb-1 border-b border-gray-300"
                >
                  <span>
                    {item.title || item.nombre}
                    {item.quantity > 1 && (
                      <span className="ml-2 text-xs text-gray-500">x{item.quantity}</span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      onClick={() => removeFromCart(item.id)}
                      title="Quitar uno"
                    >
                      −
                    </button>
                    <span className="px-2 text-lg font-bold text-gray-900">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      title="Agregar uno"
                    >
                      +
                    </button>
                    <span className="font-bold text-blue-600">${(item.price || item.precio) * item.quantity}</span>
                    {/* Botón para quitar todos */}
                    <button
                      className="px-2 py-1 text-sm bg-red-700 hover:bg-red-600 text-white rounded transition-colors"
                      onClick={() => {
                        removeAllFromCart(item.id);
                        addToast(`${item.title || item.nombre} eliminado del carrito`, 'info');
                      }}
                      title="Quitar todos"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <>
              <div className="flex items-center justify-between mt-4 mb-2 font-bold text-gray-900">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
              <a
                className="w-full mt-2 px-4 py-2 h-11 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold rounded-lg transition-all text-center flex items-center justify-center hover:shadow-lg hover:shadow-green-500/30 active:scale-95"
                href={`https://wa.me/528119817118?text=${encodeURIComponent(
                  `¡Hola! Quiero comprar:\n\n${cart
                    .map((item, i) => `${i + 1}. ${(item.title || item.nombre)} x${item.quantity} - $${(item.price || item.precio) * item.quantity}`)
                    .join("\n")}\n\nTotal: $${totalPrice}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar por WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
      {/* Fondo para cerrar el drawer */}
      {cartOpen && (
        <div
          className="fixed h-screen inset-0 z-[9998] backdrop-blur-sm bg-gray-900/30"
          onClick={() => setCartOpen(false)}
        />
      )}
      {/* --- Fin Drawer --- */}
    </>
  );
}

/*
Agrega las siguientes animaciones a tu CSS global (index.css o tailwind.config.js):
@keyframes spin-once {
  0% { transform: rotate(0deg); }
  80% { transform: rotate(720deg); }
  100% { transform: rotate(720deg); }
}
.animate-spin-once {
  animation: spin-once 1s cubic-bezier(0.4,0,0.2,1) 1;
}
@keyframes fade-in-logo {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-logo {
  animation: fade-in-logo 0.7s 0.7s both;
}
*/