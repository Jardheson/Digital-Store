import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import { getProducts } from '../services/api';
import { HeroCarousel } from '../components/Home/HeroCarousel';
import { ProductCard } from '../components/Product/ProductCard';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setTrendingProducts(data.slice(0, 8)); // Show first 8 products
    };
    loadProducts();              
  }, []);

  return (
    <div className="bg-light-gray relative min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Collections Section */}
      <section className="py-12 md:py-16 bg-[#F9F8FE]">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
            Coleções em destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
            {/* Collection Cards */}
            <div className="bg-[#D8E3F2] rounded-lg p-4 md:p-6 h-48 md:h-64 relative overflow-hidden group">
              <span className="bg-[#E7FF86] text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-1 md:mb-2">
                30% OFF
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800 w-1/2 relative z-10">
                Novo drop Supreme
              </h3>
              <Link to="/products" className="mt-2 md:mt-4 bg-white text-primary font-bold py-1 md:py-2 px-4 md:px-6 rounded text-xs md:text-base hover:bg-gray-100 transition-colors relative z-10 inline-block" aria-label="Comprar Novo drop Supreme">
                Comprar
              </Link>
              <img
                src="/images/products/star-wars-storm.png"
                className="absolute bottom-0 right-0 h-full object-contain group-hover:scale-105 transition-transform"
                alt="Coleção Supreme Star Wars"
              />
            </div>
            <div className="bg-[#D8E3F2] rounded-lg p-4 md:p-6 h-48 md:h-64 relative overflow-hidden group">
              <span className="bg-[#E7FF86] text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-1 md:mb-2">
                30% OFF
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800 w-1/2 relative z-10">
                Coleção Adidas
              </h3>
              <Link to="/products?brand=Adidas" className="mt-2 md:mt-4 bg-white text-primary font-bold py-1 md:py-2 px-4 md:px-6 rounded text-xs md:text-base hover:bg-gray-100 transition-colors relative z-10 inline-block" aria-label="Comprar Coleção Adidas">
                Comprar
              </Link>
              <img
                src="/images/icons/ddd 1.png"
                className="absolute bottom-0 right-0 h-full object-contain group-hover:scale-105 transition-transform"
                alt="Tênis Adidas"
              />
            </div>
            <div className="bg-[#D8E3F2] rounded-lg p-4 md:p-6 h-48 md:h-64 relative overflow-hidden group">
              <span className="bg-[#E7FF86] text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-1 md:mb-2">
                30% OFF
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800 w-1/2 relative z-10">
                Novo Beats Bass
              </h3>
              <Link to="/products?category=Headphones" className="mt-2 md:mt-4 bg-white text-primary font-bold py-1 md:py-2 px-4 md:px-6 rounded text-xs md:text-base hover:bg-gray-100 transition-colors relative z-10 inline-block" aria-label="Comprar Novo Beats Bass">
                Comprar
              </Link>
              <img
                src="/images/products/collection-3.png"
                className="absolute bottom-0 right-0 h-full object-contain group-hover:scale-105 transition-transform"
                alt="Fone de ouvido Beats"
              />
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
            Coleções em destaque
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-16 px-4 md:px-0">
            {[
              { label: "Camisetas", svg: <img src="/images/icons/tshirt-_1_.svg" alt="Ícone Camisetas" className="w-8 h-8 md:w-12 md:h-12" /> },
              { label: "Calças", svg: <img src="/images/icons/pants.svg" alt="Ícone Calças" className="w-8 h-8 md:w-12 md:h-12" /> },
              {
                label: "Bonés",
                svg: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-label="Ícone Bonés"
                    role="img"
                    className="w-8 h-8 md:w-12 md:h-12"
                  >
                    <path d="M4 13a8 8 0 0116 0v2H4v-2z" />
                    <path d="M2 15h20" />
                  </svg>
                ),
              },
              {
                label: "Headphones",
                svg: <img src="/images/icons/headphones_1.svg" alt="Ícone Headphones" className="w-8 h-8 md:w-12 md:h-12" />,
              },
              { label: "Tênis", svg: <img src="/images/icons/sneakers.svg" alt="Ícone Tênis" className="w-8 h-8 md:w-12 md:h-12" /> },
            ].map((item, idx) => (
              <Link
                to={`/products?category=${item.label}`}
                key={idx}
                className="flex flex-col items-center gap-2 md:gap-4 group cursor-pointer min-w-[80px] md:min-w-auto snap-center shrink-0"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all text-gray-400 group-hover:text-primary">
                  {item.svg}
                </div>
                <span className="font-bold text-sm md:text-base text-gray-800 group-hover:text-primary transition-colors text-center">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 md:py-20 bg-light-gray">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="flex justify-between items-center mb-4 md:mb-6 flex-col sm:flex-row gap-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Produtos em alta
            </h2>
            <Link
              to="/products"
              className="text-primary hover:underline flex items-center gap-1 text-sm md:text-base"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {trendingProducts.map((product, idx) => (
              <ProductCard
                key={`${product.id}-${idx}`}
                product={product}
                badge={idx < 2 ? "30% OFF" : undefined}
                disableAutoBadge={idx >= 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto max-w-[1120px] px-4 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="md:w-1/2 relative h-[300px] md:h-[400px] lg:h-[450px] w-full">
            <img
              src="/images/ui/Ellipse11.png"
              alt="Ellipse"
              className="absolute w-[300px] md:w-[400px] lg:w-[520px] h-[300px] md:h-[400px] lg:h-[520px] top-[50%] left-[50%] md:left-[50%] lg:left-[46%] -translate-x-1/2 -translate-y-1/2 opacity-100 z-0 pointer-events-none select-none"
            />
            <img
              src="/images/products/Laye 1.png"
              alt="Layer 1"
              className="absolute w-[350px] md:w-[480px] lg:w-[660px] h-auto top-[50%] left-[50%] md:top-[50%] md:left-[50%] lg:top-[-20px] lg:left-[-20px] -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 opacity-100 rotate-0 z-10 pointer-events-none select-none drop-shadow-2xl"
            />
          </div>
          <div className="md:w-1/2 space-y-4 md:space-y-6 lg:space-y-7">
            <span className="text-primary font-bold text-xs md:text-base">Oferta especial</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800">
              Air Jordan edição de colecionador
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-[560px] text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </p>
            <Link
              to="/products/1"
              className="inline-block bg-primary text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded hover:bg-pink-700 transition-colors text-sm md:text-base w-full md:w-auto text-center"
            >
              Ver Oferta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
