import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clear } = useCart();

  const formatBRL = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const freight = 5.00;
  const discount = 56.00;

  const displaySubtotal = items.length > 0 ? items.reduce((acc, item) => acc + item.price * item.quantity, 0) : 270.00;
  const displayTotal = items.length > 0 ? displaySubtotal + freight - discount : 219.00;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to success
    navigate('/checkout/success', {
        state: {
            product: {
                name: items[0]?.name || 'Tênis Nike Revolution 6 Next Nature Masculino',
                image: items[0]?.image || '/images/products/product-thumb-2.jpeg',
                total: displayTotal
            }
        }
    });
    clear();
  };

  return (
    <div className="bg-[#F9F8FE] min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>

        <form onSubmit={handlePayment} className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Forms */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Informações Pessoais */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Informações Pessoais</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Nome Completo *</label>
                        <input type="text" placeholder="Insira seu nome" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">CPF *</label>
                        <input type="text" placeholder="Insira seu CPF" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">E-mail *</label>
                        <input type="email" placeholder="Insira seu email" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Celular *</label>
                        <input type="tel" placeholder="Insira seu celular" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                </div>
            </div>

            {/* Informações de Entrega */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Informações de Entrega</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Endereço *</label>
                        <input type="text" placeholder="Insira seu endereço" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Bairro *</label>
                        <input type="text" placeholder="Insira seu bairro" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Cidade *</label>
                        <input type="text" placeholder="Insira sua cidade" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">CEP *</label>
                        <input type="text" placeholder="Insira seu CEP" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Complemento</label>
                        <input type="text" placeholder="Insira complemento" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                </div>
            </div>

            {/* Informações de Pagamento */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Informações de Pagamento</h2>
                
                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 mb-2">Forma de Pagamento</label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="paymentMethod" className="w-4 h-4 text-[#C92071] focus:ring-[#C92071] accent-[#C92071]" defaultChecked />
                            <span className="text-sm text-gray-700">Cartão de Crédito</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="paymentMethod" className="w-4 h-4 text-[#C92071] focus:ring-[#C92071] accent-[#C92071]" />
                            <span className="text-sm text-gray-700">Boleto Bancário</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Nome do Cartão *</label>
                        <input type="text" placeholder="Insira o nome do Cartão" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Número do Cartão *</label>
                            <input type="text" placeholder="Insira número do Cartão" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Data de validade do Cartão *</label>
                            <input type="text" placeholder="Insira a validade do Cartão" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">CVV *</label>
                        <input type="text" placeholder="CVV *" className="w-full bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary outline-none" required />
                    </div>
                </div>
            </div>

            {/* Finalizar Compra Section (Bottom of Left Column) */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h2 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Finalizar Compra</h2>
                <div className="flex justify-between items-end mb-1 relative">
                    <span className="font-bold text-gray-800">Total</span>
                    <div className="text-right">
                        <span className="font-bold text-2xl text-[#C92071]">{formatBRL(displayTotal)}</span>
                        <div className="text-xs text-gray-400">ou 10x de {formatBRL(displayTotal / 10)} sem juros</div>
                    </div>
                </div>
                
                <div className="mt-6">
                    <button type="submit" className="w-full bg-[#FFB31F] text-white font-bold py-3 rounded hover:bg-yellow-500 transition-colors">
                        Realizar Pagamento
                    </button>
                    <div className="text-center mt-2">
                         <Link to="/products" className="text-[10px] text-gray-400 underline">ver mais itens</Link>
                    </div>
                </div>
            </div>

          </div>

          {/* Right Column: Summary */}
          <div className="w-full lg:w-80 shrink-0">
             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">RESUMO</h2>
                
                {/* Product Thumbnail */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 bg-[#E2E3FF] rounded flex items-center justify-center shrink-0">
                        <img 
                            src={items[0]?.image || "/images/products/product-thumb-2.jpeg"} 
                            alt="Produto" 
                            className="w-full h-full object-contain mix-blend-multiply p-1" 
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xs font-bold text-gray-800 leading-tight">
                            {items[0]?.name || "Tênis Nike Revolution 6 Next Nature Masculino"}
                        </h3>
                    </div>
                </div>

                <div className="space-y-3 text-sm mb-6 border-b border-gray-100 pb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold text-gray-800">{formatBRL(displaySubtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Frete</span>
                        <span className="font-bold text-gray-800">{formatBRL(freight)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Desconto</span>
                        <span className="font-bold text-gray-800">{formatBRL(discount)}</span>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-2xl text-[#C92071]">{formatBRL(displayTotal)}</span>
                </div>
                <div className="text-right text-xs text-gray-400 mb-6">
                    ou 10x de {formatBRL(displayTotal / 10)} sem juros
                </div>

                <button 
                    type="submit"
                    className="w-full bg-[#FFB31F] text-white font-bold py-3 rounded hover:bg-yellow-500 transition-colors uppercase tracking-wide text-sm hidden lg:block"
                >
                    Realizar Pagamento
                </button>
             </div>
          </div>

        </form>
      </div>
    </div>
  );
};
