import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CarContext";
import { products as localProducts } from "./productosData";
import EMPTY_PNG from "../emptyImage";

export default function ProductView() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Permitir forzar datos locales para pruebas: /producto/:id?local=1
  const forceLocal = (() => {
    try {
      return new URLSearchParams(window.location.search).has('local');
    } catch {
      return false;
    }
  })();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);

  // Reset galería cuando cambia el ID
  useEffect(() => {
    setActiveIndex(0);
    setQty(1);
  }, [id]);

  // Asegurar fondo blanco a pantalla completa en esta vista (evita banda negra del body oscuro)
  useEffect(() => {
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    const prevRootBg = document.getElementById('root')?.style.backgroundColor;
    const prevOverflow = document.body.style.overflow;

    // Fondo blanco forzado en html, body y #root
    document.documentElement.style.backgroundColor = '#ffffff';
    document.body.style.backgroundColor = '#ffffff';
    if (document.getElementById('root')) document.getElementById('root').style.backgroundColor = '#ffffff';

    // Evitar scroll global; gestionamos scroll dentro de columnas
    // document.body.style.overflow = 'hidden'; // COMENTADO: Permitir scroll en móvil

    // Ocultar footer global solo en esta vista
    document.body.classList.add('no-footer');
    return () => {
      document.documentElement.style.backgroundColor = prevHtmlBg || '';
      document.body.style.backgroundColor = prevBodyBg || '#0a0a0a';
      if (document.getElementById('root')) document.getElementById('root').style.backgroundColor = prevRootBg || '';
      document.body.style.overflow = prevOverflow || '';
      document.body.classList.remove('no-footer');
    };
  }, []);

  // Cargar producto (usa datos locales directamente, sin esperar API)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        // Buscar primero en productos locales (sin esperar API)
        const foundLocal = localProducts.find((p) => String(p.id) === String(id));
        if (foundLocal) {
          if (!cancelled) setProduct(foundLocal);
          return;
        }

        // Si no está en locales, intenta por API (con timeout de 3 segundos)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        try {
          const byId = await fetch(`${API_BASE}/api/products/${id}`, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (byId.ok) {
            const data = await byId.json();
            if (!cancelled) setProduct(data || null);
          } else {
            if (!cancelled) setProduct(null);
          }
        } catch (fetchError) {
          // Timeout o error de fetch - no hagas fallback, mantén null
          if (!cancelled) setProduct(null);
        }
      } catch (e) {
        console.error('ProductView error:', e);
        if (!cancelled) setProduct(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h2 className="mb-3 text-xl font-bold text-gray-900">Producto no encontrado</h2>
        <button className="px-5 py-3 text-white bg-black rounded-lg" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    );
  }

  const stock = 12; // Opcional: reemplazar por product.stock si existe
  // Normalizar galería de imágenes con tolerancia a distintos formatos/campos
  const normalizeToArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val
        .map((item) => {
          if (!item) return null;
          if (typeof item === 'string') return item.trim();
          if (typeof item === 'object') {
            return (
              item.url ||
              item.secure_url ||
              item.src ||
              item.image ||
              item.imagen ||
              null
            );
          }
          return null;
        })
        .filter(Boolean);
    }
    if (typeof val === 'string') {
      const trimmed = val.trim();
      // Intentar parsear JSON si parece un array
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
        } catch (_) {
          // Si falla el parseo, continuar a separación por comas
        }
      }
      // Separar por comas si existen múltiples URLs
      if (trimmed.includes(',')) {
        return trimmed.split(',').map(s => s.trim()).filter(Boolean);
      }
      // Una sola URL en string
      return [trimmed];
    }
    return [];
  };

  const imagesGathered = [
    ...normalizeToArray(product.images),
    ...normalizeToArray(product.imagenes),
    ...normalizeToArray(product.gallery),
    ...normalizeToArray(product.galeria),
  ];
  const primary = product.image || product.imagen || EMPTY_PNG;
  const images = Array.from(new Set([primary, ...imagesGathered].filter(Boolean)));

  return (
    <section className="relative flex flex-col items-center min-h-screen md:h-screen px-3 md:px-4 pt-4 md:pt-16 pb-10 md:pb-6 bg-white md:overflow-hidden">
      {/* Fondo blanco ya forzado en html/body/root desde efecto; sin capa fija para evitar 'algo blanco' tapando */}
      <div className="w-full max-w-7xl h-full flex flex-col pb-4">

        {/* Breadcrumbs minimal (ocultos en móvil para dar más aire a la imagen) */}
        <nav className="hidden md:block mb-2 text-sm text-gray-500" aria-label="Navegación secundaria">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/Catalogo" className="hover:text-blue-600">
                Catálogo
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-gray-700 truncate max-w-[40ch]" title={product.title || product.nombre}>
              {product.title || product.nombre}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.9fr)] gap-6 flex-1 md:overflow-hidden">
          {/* Columna izquierda: Galería profesional - miniaturas al lateral izquierdo + imagen principal */}
          <div className="flex flex-col h-auto md:h-full gap-3 order-1 md:pt-1">
            {/* Desktop: imagen grande al lado izquierdo + grid de miniaturas derecho */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto] md:gap-4 md:h-full">
              {/* Grid de miniaturas al lateral izquierdo */}
              {images.length > 1 && (
                <div className="grid grid-cols-1 gap-2 content-start w-[80px] overflow-y-auto pr-1">
                  {images.slice(0, 8).map((src, idx) => (
                    <button
                      key={idx}
                      className={`w-full aspect-square overflow-hidden rounded-lg transition-transform ${idx === activeIndex
                          ? "ring-2 ring-blue-500 scale-105"
                          : "ring-1 ring-gray-200 hover:ring-gray-400 hover:scale-105"
                        }`}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Imagen ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`thumb-${idx + 1}`}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = EMPTY_PNG;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Imagen principal */}
              <div
                className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-white flex items-start justify-center w-full md:self-start md:max-h-[calc(100vh-220px)]"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (images.length > 1) {
                    if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length);
                    if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length);
                  }
                }}
              >
                <img
                  src={images[activeIndex]}
                  alt={(product.title || product.nombre) + " - imagen " + (activeIndex + 1)}
                  className="object-contain w-full h-full max-h-full transition-transform duration-300 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = EMPTY_PNG;
                  }}
                />
                {images.length > 1 && (
                  <div className="absolute px-2 py-1 text-xs font-semibold text-white bg-black/40 rounded top-3 right-3">
                    {activeIndex + 1}/{images.length}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: imagen principal + tira horizontal de miniaturas abajo */}
            <div className="md:hidden flex flex-col h-full gap-3">
              <div
                className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-white flex-1 flex items-start justify-center min-h-[280px]"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (images.length > 1) {
                    if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length);
                    if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length);
                  }
                }}
              >
                <img
                  src={images[activeIndex]}
                  alt={(product.title || product.nombre) + " - imagen " + (activeIndex + 1)}
                  className="object-contain w-full h-full max-h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = EMPTY_PNG;
                  }}
                />
                {images.length > 1 && (
                  <>
                    <div className="absolute px-2 py-1 text-xs font-semibold text-white bg-black/40 rounded top-3 right-3">
                      {activeIndex + 1}/{images.length}
                    </div>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md"
                      onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                      aria-label="Anterior"
                    >
                      ‹
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md"
                      onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                      aria-label="Siguiente"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.slice(0, 6).map((src, idx) => (
                    <button
                      key={idx}
                      className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-md transition-all ${idx === activeIndex
                          ? "ring-2 ring-blue-500 scale-105"
                          : "ring-1 ring-gray-200 hover:ring-gray-400"
                        }`}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Imagen ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`thumb-${idx + 1}`}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = EMPTY_PNG;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Columna central: Descripción larga */}
          <div className="order-3 md:order-2 flex flex-col w-full h-auto md:h-full md:overflow-hidden pb-2 md:pt-1">
            <div className="pr-1 flex-1 md:overflow-auto pb-3">
              <h2 className="mb-2 text-base font-semibold text-gray-900 md:sr-only">Descripción</h2>
              <p className="text-sm md:text-[15px] leading-6 md:leading-7 text-gray-800 font-normal antialiased whitespace-pre-line text-left tracking-normal">
                {product.description || product.descripcion || ""}
              </p>
              {product.details && (
                <div className="mt-3 text-sm md:text-[15px] leading-6 md:leading-7 text-gray-800 font-normal antialiased whitespace-pre-line text-left tracking-normal">
                  {product.details}
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: Título, precio y acciones */}
          <aside className="order-2 md:order-3 flex flex-col justify-between w-full h-auto md:h-full md:overflow-hidden pb-2 md:pt-1">
            <div className="pr-1 flex-1 md:overflow-auto pb-3 text-left">
              <h1 className="mb-2 text-[26px] md:text-3xl font-extrabold tracking-tight text-gray-900">{product.title || product.nombre}</h1>
              <div className="mb-3">
                <span className="text-[32px] md:text-4xl font-extrabold text-gray-900">${product.price || product.precio}</span>
                <span className="ml-2 text-sm text-gray-500 align-super">MXN</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Código: <span className="font-medium text-gray-700">{product.id}</span> ·
                <span className="uppercase text-gray-600"> {product.category}</span>
              </div>
            </div>

            <div className="pt-3 border-t mt-2 flex-shrink-0 pb-2">
              <div className="text-sm font-medium text-green-700">{stock > 0 ? `Stock disponible (${stock})` : "Sin stock"}</div>

              {/* Selector de cantidad */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm text-gray-700">Cantidad</span>
                <div className="inline-flex items-center rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-800 hover:bg-gray-100 disabled:opacity-40"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>
                  <input
                    className="w-12 text-center text-sm py-2 outline-none select-none"
                    value={qty}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!Number.isNaN(v)) setQty(Math.max(1, Math.min(v, stock || 999)));
                    }}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-800 hover:bg-gray-100 disabled:opacity-40"
                    onClick={() => setQty((q) => Math.min((stock || 999), q + 1))}
                    disabled={stock ? qty >= stock : false}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 mb-2">
                <button
                  className="w-full h-12 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#1ebe57] hover:shadow-lg hover:shadow-green-500/30 active:scale-95 transition-all"
                  onClick={() => {
                    const msg = `¡Hola! Quiero comprar:\n\n${product.title || product.nombre} x${qty}\nPrecio unitario: $${(product.price || product.precio)}\n\n?`;
                    window.open(`https://wa.me/528119817118?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                >
                  Comprar por WhatsApp
                </button>
                <button
                  className="w-full h-12 rounded-lg bg-black text-white font-semibold hover:bg-neutral-900 hover:shadow-lg hover:shadow-black/30 active:scale-95 transition-all disabled:opacity-60"
                  onClick={() => addToCart({ ...product, quantity: qty })}
                  disabled={stock === 0}
                >
                  {stock === 0 ? "Sin stock" : "Agregar al carrito"}
                </button>
                <button
                  className="w-full h-11 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm active:scale-95 transition-all"
                  onClick={() => navigate(-1)}
                >
                  Volver al catálogo
                </button>
              </div>
              <div className="mt-2 text-[11px] text-gray-500">Coordinamos entregas y envíos — actualiza esta información para tu tienda.</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
