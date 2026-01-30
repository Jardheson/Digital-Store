import React from 'react';
import type { FilterOptions } from '../../types/Product';

interface FilterSidebarProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  type FilterCategory = 'brand' | 'category' | 'gender' | 'state';

  const handleCheckboxChange = (category: FilterCategory, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] ?? [];
      if (currentValues.includes(value)) {
        return { ...prev, [category]: currentValues.filter((item: string) => item !== value) };
      } else {
        return { ...prev, [category]: [...currentValues, value] };
      }
    });
  };

  const handleRadioChange = (category: FilterCategory, value: string) => {
     setFilters(prev => ({ ...prev, [category]: [value] }));
  };

  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded shadow-sm h-fit">
      <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Filtrar por</h3>
      
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Marca</h4>
        <div className="space-y-2">
          {['Adidas', 'Calenciaga', 'K-Swiss', 'Nike', 'Puma', 'Converse', 'Generic'].map(brand => {
            const isChecked = filters.brand?.includes(brand) || false;
            return (
            <label key={brand} className={`flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded ${
              isChecked ? 'bg-primary bg-opacity-10 text-primary font-semibold' : 'text-gray-600'
            }`}>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                checked={isChecked}
                onChange={() => handleCheckboxChange('brand', brand)}
              />
              {brand}
            </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Categoria</h4>
        <div className="space-y-2">
          {['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida', 'Tênis', 'Acessórios'].map(cat => {
            const isChecked = filters.category?.includes(cat) || false;
            return (
            <label key={cat} className={`flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded ${
              isChecked ? 'bg-primary bg-opacity-10 text-primary font-semibold' : 'text-gray-600'
            }`}>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                checked={isChecked}
                onChange={() => handleCheckboxChange('category', cat)}
              />
              {cat}
            </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Gênero</h4>
        <div className="space-y-2">
          {['Masculino', 'Feminino', 'Unisex'].map(gender => {
            const isChecked = filters.gender?.includes(gender) || false;
            return (
            <label key={gender} className={`flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded ${
              isChecked ? 'bg-primary bg-opacity-10 text-primary font-semibold' : 'text-gray-600'
            }`}>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                checked={isChecked}
                onChange={() => handleCheckboxChange('gender', gender)}
              />
              {gender}
            </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Estado</h4>
        <div className="space-y-2">
          {['Novo', 'Usado'].map(state => {
            const isChecked = filters.state?.includes(state) || false;
            return (
            <label key={state} className={`flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded ${
              isChecked ? 'bg-primary bg-opacity-10 text-primary font-semibold' : 'text-gray-600'
            }`}>
              <input 
                type="radio" 
                name="state"
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                checked={isChecked}
                onChange={() => handleRadioChange('state', state)}
              />
              {state}
            </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
