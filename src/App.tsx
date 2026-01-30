import { useEffect, useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PWAUpdateManager } from './utils/pwaUpdateManager';
import './index.css';

function App() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [updateManager] = useState(() => new PWAUpdateManager());

  useEffect(() => {
    updateManager.init((update) => {
      if (update) {
        setHasUpdate(true);
      }
    });
  }, [updateManager]);

  const handleUpdate = () => {
    updateManager.activateUpdate();
  };

  return (
    <FavoritesProvider>
      <CartProvider>
        {hasUpdate && (
          <div className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-bounce">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold">Nova versão disponível!</p>
                <p className="text-sm text-gray-100 mt-1">Atualize para aproveitar as melhores novidades.</p>
              </div>
              <button 
                onClick={handleUpdate}
                className="ml-4 bg-white text-primary px-4 py-2 rounded font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Atualizar
              </button>
            </div>
          </div>
        )}
        <AppRoutes />
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
