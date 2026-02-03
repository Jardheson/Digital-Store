import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Heart, User, Download } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { usePWA } from "../../context/PWAContext";
import { SearchModal } from "../UI/SearchModal";
import { CartDropdown } from "./CartDropdown";

type HeaderVariant = "default" | "auth";

interface HeaderProps {
  variant?: HeaderVariant;
}

export const Header: React.FC<HeaderProps> = ({ variant = "default" }) => {
  const [openCart, setOpenCart] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartRef = useRef<HTMLDivElement | null>(null);
  const mobileCartRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();
  const { count: favoritesCount } = useFavorites();
  const { showInstallPrompt, installApp } = usePWA();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?filter=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const clickedOutsideDesktop = cartRef.current && !cartRef.current.contains(e.target as Node);
      const clickedOutsideMobile = mobileCartRef.current && !mobileCartRef.current.contains(e.target as Node);
      
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fechar menu ao clicar em um link
  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (mobileSearchOpen) setMobileSearchOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Produtos" },
    { path: "/categories", label: "Categorias" },
    { path: "/orders", label: "Meus Pedidos" },
  ];

  return (
    <>
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={() => {
          // Implement search logic
        }}
      />

      {/* Header Principal */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Top Bar - Auth & Search */}
          <div className="border-b border-gray-100">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0" aria-label="Ir para página inicial">
                <img src="/images/icons/logo-header.svg" alt="Digital Store Logo" className="h-10 w-auto hover:opacity-80 transition-opacity" />
              </Link>

              {/* Search Bar */}
              {variant === "default" && (
                <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8" role="search">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      aria-label="Buscar produtos"
                      className="w-full bg-light-gray rounded-lg py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" aria-label="Realizar busca" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Right Actions */}
              {variant === "default" && (
                <div className="flex items-center gap-6">
                  {/* Install App */}
                  {showInstallPrompt && (
                    <button
                      onClick={installApp}
                      className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
                      title="Instalar Aplicativo"
                    >
                      <Download className="w-6 h-6" />
                      <span className="hidden xl:inline">Instalar App</span>
                    </button>
                  )}

                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="relative text-gray-600 hover:text-primary transition-colors"
                    title="Wishlist"
                    aria-label="Ir para lista de desejos"
                  >
                    <Heart className="w-6 h-6" />
                    {favoritesCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>

                  {/* Auth Links */}
                  <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                    <Link
                      to="/signup"
                      className="text-gray-600 hover:text-primary text-sm font-medium transition-colors"
                    >
                      Crie sua conta
                    </Link>
                    <Link
                      to="/login"
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700 transition-all hover:shadow-lg"
                    >
                      Acesse sua conta
                    </Link>
                  </div>

                  {/* Cart */}
                  <div ref={cartRef} className="relative">
                    <button
                      className="relative text-primary hover:text-secondary transition-colors"
                      onClick={() => setOpenCart(!openCart)}
                      title="Carrinho"
                      aria-label="Abrir carrinho de compras"
                      aria-expanded={openCart}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {count > 0 && (
                        <span className="absolute -top-3 -right-3 bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                          {Math.min(99, count)}
                        </span>
                      )}
                    </button>

                    {/* Cart Dropdown */}
                    {openCart && <CartDropdown onClose={() => setOpenCart(false)} />}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          {variant === "default" && (
            <nav className="border-t border-gray-100">
              <div className="container mx-auto px-6">
                <div className="flex items-center gap-8 h-16">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`font-semibold text-sm transition-all relative h-full flex items-center ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      {location.pathname === link.path && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-full"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </div>

        {/* Mobile & Tablet Header */}
        <div className="lg:hidden">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between h-16 px-4 bg-white">
            {/* Menu Hamburger */}
            {variant === "default" && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-primary transition-colors p-2 -ml-2 rounded-full active:bg-gray-100"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 absolute left-1/2 -translate-x-1/2" aria-label="Ir para página inicial">
              <img src="/images/icons/logo-header.svg" alt="Digital Store Logo" className="h-6 w-auto" />
            </Link>

            {/* Right Icons */}
            {variant === "default" && (
              <div className="flex items-center gap-1">
                {/* Search Icon */}
                <button
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  className="text-gray-700 hover:text-primary transition-colors p-2 rounded-full active:bg-gray-100"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Cart */}
                <div className="relative" ref={mobileCartRef}>
                  <button
                    onClick={() => setOpenCart(!openCart)}
                    className="relative text-primary p-2 rounded-full active:bg-gray-100"
                    title="Carrinho"
                  >
                    <ShoppingCart className="w-5 h-5 text-[#C92071]" />
                    {count > 0 && (
                      <span className="absolute top-0 right-0 bg-[#C92071] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white box-content">
                        {Math.min(99, count)}
                      </span>
                    )}
                  </button>
                  {/* Cart Dropdown Mobile */}
                  {openCart && <CartDropdown onClose={() => setOpenCart(false)} />}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="border-t border-gray-100 p-4 sm:p-6 bg-light-gray">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-white rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="border-t border-gray-100 bg-white max-h-96 overflow-y-auto">
              <nav className="flex flex-col">
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-6 py-4 border-b border-gray-100 text-base font-semibold transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/5 border-l-4 border-l-primary"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-gray-200 mt-2 pt-2">
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="px-6 py-4 border-b border-gray-100 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </Link>

                  {/* User Account */}
                  <Link
                    to="/orders/info"
                    className="px-6 py-4 border-b border-gray-100 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <User className="w-5 h-5" />
                    Minha Conta
                  </Link>
                </div>

                {/* Auth Section */}
                <div className="px-6 py-6 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-all text-center block"
                  >
                    Acesse sua conta
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full border-2 border-primary text-primary font-bold py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition-all text-center block"
                  >
                    Crie sua conta
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
