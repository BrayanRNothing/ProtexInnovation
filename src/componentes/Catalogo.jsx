import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products as localProducts } from "./productosData";
import EMPTY_PNG from "../emptyImage";
import ProductSkeleton from "./ProductSkeleton";

const categories = [
  { value: "all", label: "Todos" },
  { value: "centro-carga", label: "Centros de Carga" },
  { value: "interruptores-1p", label: "Interruptores 1 Polo" },
  { value: "interruptores-2p", label: "Interruptores 2 Polos" },
  { value: "interruptores-3p", label: "Interruptores 3 Polos" },
  { value: "conductores", label: "Conductores Eléctricos" },
  { value: "iluminacion", label: "Iluminación" },
  { value: "herramientas", label: "Herramientas" },
  { value: "accesorios", label: "Accesorios" },
];

export default function Catalogo() {
  const resolveImageSrc = (imgPath) => {
    if (!imgPath) return EMPTY_PNG;
    return imgPath;
  };
  const [searchParams, setSearchParams] = useSearchParams();
  // Template default: render only local sample products to avoid fetching any remote data
  const [products, setProducts] = useState(localProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [loading, setLoading] = useState(false);

  // Actualizar categoría cuando cambia la URL
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [searchParams]);

  // Filtro por búsqueda y categoría
  const filteredProducts = products.filter((product) => {
    const nombre = product.title || product.nombre || "";
    const descripcion = product.description || product.descripcion || "";
    const categoria = product.category || "all";

    return (
      (category === "all" || categoria === category) &&
      (nombre.toLowerCase().includes(search.toLowerCase()) ||
        descripcion.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchParams({ category: newCategory });
  };

  return (
    <section className="relative flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 pt-[15px] md:pt-[15px] pb-12 px-4 overflow-hidden">
      {/* Hero simple para el catálogo */}
      <div className="relative z-10 w-full max-w-7xl mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">Catálogo de Productos</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all placeholder:text-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="w-full md:w-auto px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-white text-gray-900">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600 flex items-center justify-between">
          <span>{filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}</span>
          {filteredProducts.length > 0 && (
            <span>Mostrando <span className="text-gray-900 font-semibold">{filteredProducts.length}</span> de <span className="text-gray-900 font-semibold">{products.length}</span></span>
          )}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Skeletons mientras carga */}
          {loading && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          )}

          {/* Mensaje de vacío (solo cuando no hay carga) */}
          {!loading && filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xl text-gray-700">No se encontraron productos</p>
              <p className="text-sm text-gray-600 mt-2">Intenta cambiar los filtros</p>
            </div>
          )}
          {!loading && filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Imagen del producto */}
              <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={resolveImageSrc(product.image || product.imagen)}
                  alt={product.title || product.nombre}
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = EMPTY_PNG;
                    e.target.style.objectFit = 'contain';
                    e.target.style.padding = '2rem';
                  }}
                />
                {/* Badge de precio */}
                <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1.5 font-bold text-sm rounded-lg shadow-md">
                  ${product.price || product.precio}
                </div>
              </div>

              {/* Contenido del producto */}
              <div className="flex flex-col flex-1 p-5 gap-3 bg-white">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
                  {product.title || product.nombre}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 flex-1">
                  {product.description || product.descripcion}
                </p>

                {/* Categoría badge */}
                {product.category && product.category !== 'all' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 w-fit">
                    {categories.find(c => c.value === product.category)?.label || product.category}
                  </span>
                )}

                {/* Botón */}
                <Link
                  to={`/producto/${product.id}`}
                  className="mt-auto w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-1.5 px-3 text-xs md:text-base md:py-2.5 md:px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sin animaciones exageradas: catálogo limpio y genérico */}
    </section>
  );
}
