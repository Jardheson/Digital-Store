import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  subtitle: string;
  title: React.ReactNode;
  description: string;
  image: string;
  link: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    subtitle: 'Melhores ofertas personalizadas',
    title: <>Queima de <br /> estoque Nike 🔥</>,
    description: 'Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.',
    image: '/images/slides/home-slide-1.jpeg',
    link: '/products',
    buttonText: 'Ver Ofertas'
  },
  {
    id: 2,
    subtitle: 'Coleção de Verão',
    title: <>Novas Cores <br /> e Estilos ☀️</>,
    description: 'Aproveite o verão com o melhor estilo. Conforto e design exclusivo para você.',
    image: '/images/slides/home-slide-2.jpeg',
    link: '/products',
    buttonText: 'Ver Ofertas'
  },
  {
    id: 3,
    subtitle: 'Lançamentos Exclusivos',
    title: <>Tênis para <br /> Performance 🏃</>,
    description: 'Tecnologia de ponta para seus treinos. Supere seus limites com a nova coleção.',
    image: '/images/slides/home-slide-3.jpeg',
    link: '/products',
    buttonText: 'Comprar Agora'
  },
  {
    id: 4,
    subtitle: 'Oferta Especial',
    title: <>Descontos de <br /> até 50% 🏷️</>,
    description: 'Não perca as últimas unidades com preços imperdíveis. Garanta já o seu.',
    image: '/images/slides/home-slide-4.jpeg',
    link: '/products',
    buttonText: 'Conferir'
  }
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-light-gray relative overflow-hidden py-2 lg:py-4 min-h-[300px] lg:min-h-[450px] flex items-center">
      <div className="mx-auto max-w-[1120px] px-4 w-full relative z-10">
        
        <div className="relative">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`transition-opacity duration-700 ease-in-out absolute inset-0 lg:static flex flex-col-reverse lg:flex-row items-center justify-between ${
                index === currentIndex ? 'opacity-100 z-10 relative' : 'opacity-0 z-0 absolute top-0 left-0 w-full'
              }`}
              style={{ display: index === currentIndex ? 'flex' : 'none' }} // Force display for layout stability when active, but CSS transition handles opacity if we remove display:none. 
              // Better approach for fade: Keep them all in DOM, absolute position them, except the container height might collapse.
              // Let's use a simpler approach: Render only active one? No, animation needs both.
              // Let's stick to the current structure but refine the classes.
            >
               {/* Content */}
               <div className="lg:w-1/2 space-y-4 md:space-y-6 z-10 mt-8 lg:mt-0 animate-slide-up">
                <span className="text-warning text-yellow-500 font-bold tracking-wide text-xs md:text-base">
                  {slide.subtitle}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-500 text-sm md:text-lg max-w-md">
                  {slide.description}
                </p>                            
                <Link
                  to={slide.link}
                  className="inline-block bg-primary text-white font-bold py-3 px-8 rounded hover:bg-pink-700 transition-colors text-base w-full md:w-auto text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {slide.buttonText}
                </Link>
              </div>

              {/* Image */}
              <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
                  
                <div className="relative w-full max-w-[300px] md:max-w-[500px] lg:max-w-[620px] aspect-square flex items-center justify-center">
                    {/* Circle Background effect if needed, but sticking to image provided */}
                    <img
                      src={slide.image}
                      alt="Produto em destaque"
                      className="w-full h-full object-contain drop-shadow-2xl animate-float"
                    />
                </div>
              </div>
            </div>
          ))}

          {/* Fallback layout wrapper to ensure height is maintained if we were using absolute positioning (not needed with current logic where active is static/relative) */}
        </div>

        {/* Pagination Dots */}
        <div className="mt-12 lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
