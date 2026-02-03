import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PersonalInfo {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface DeliveryInfo {
  address: string;
  bairro: string;
  cidade: string;
  cep: string;
}

export const MyInfoPage: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [personal, setPersonal] = useState<PersonalInfo>({
    name: 'Francisco Antonio Pereira',
    cpf: '123495913-35',
    email: 'francisco@gmail.com',
    phone: '(85) 5555-5555',
  });
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    address: 'Rua João Pessoa, 333',
    bairro: 'Centro',
    cidade: 'Fortaleza, Ceará',
    cep: '433-8800',
  });

  return (
    <div className="bg-light-gray min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          Home <span className="text-gray-400">/</span> Meus Pedidos <span className="text-gray-400">/</span> Minhas Informações
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <div className="bg-white rounded shadow-sm border">
              <ul className="divide-y">
                <li className="px-4 py-3 text-gray-700">Meu Perfil</li>
                <li className="px-4 py-3 text-gray-700">
                  <Link to="/orders" className="hover:text-primary">Meus Pedidos</Link>
                </li>
                <li className="px-4 py-3 font-bold text-primary">
                  <Link to="/orders/info" className="text-primary">Minhas Informações</Link>
                </li>
                <li className="px-4 py-3 text-gray-700">
                  <Link to="/orders/payments" className="hover:text-primary">Métodos de Pagamento</Link>
                </li>
              </ul>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded shadow-sm border">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="font-bold text-gray-800">Minhas Informações</h2>
                {!editing ? (
                  <button className="text-primary font-bold text-sm" onClick={() => setEditing(true)}>Editar</button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded hover:bg-pink-700" onClick={() => setEditing(false)}>Salvar</button>
                    <button className="text-gray-500 text-sm font-bold" onClick={() => setEditing(false)}>Cancelar</button>
                  </div>
                )}
              </div>

              <div className="px-6 py-6 border-b">
                <h3 className="font-bold text-gray-800 mb-4">Informações Pessoais</h3>
                {!editing ? (
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Nome:</span> <span className="font-bold text-gray-800">{personal.name}</span></div>
                    <div><span className="text-gray-500">CPF:</span> <span className="font-bold text-gray-800">{personal.cpf}</span></div>
                    <div><span className="text-gray-500">Email:</span> <span className="font-bold text-gray-800">{personal.email}</span></div>
                    <div><span className="text-gray-500">Celular:</span> <span className="font-bold text-gray-800">{personal.phone}</span></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-500 text-sm">Nome</label>
                      <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">CPF</label>
                      <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={personal.cpf} onChange={(e) => setPersonal({ ...personal, cpf: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Email</label>
                      <input type="email" className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Celular</label>
                      <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-6">
                <h3 className="font-bold text-gray-800 mb-4">Informações de Entrega</h3>
                {!editing ? (
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Endereço:</span> <span className="font-bold text-gray-800">{delivery.address}</span></div>
                    <div><span className="text-gray-500">Bairro:</span> <span className="font-bold text-gray-800">{delivery.bairro}</span></div>
                    <div><span className="text-gray-500">Cidade:</span> <span className="font-bold text-gray-800">{delivery.cidade}</span></div>
                    <div><span className="text-gray-500">CEP:</span> <span className="font-bold text-gray-800">{delivery.cep}</span></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-gray-500 text-sm">Endereço</label>
                      <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Bairro</label>
                      <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={delivery.bairro} onChange={(e) => setDelivery({ ...delivery, bairro: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Cidade</label>
                      <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={delivery.cidade} onChange={(e) => setDelivery({ ...delivery, cidade: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">CEP</label>
                      <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm" value={delivery.cep} onChange={(e) => setDelivery({ ...delivery, cep: e.target.value })} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};