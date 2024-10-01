import { useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import './style.css';

const Details = lazy(() => import('./Detail'));
const SearchParams = lazy(() => import('./SearchParams'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div
      className="m-0 p-0"
      style={{
        background: 'url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)',
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-panel">
                <h2 className="animate-spin text-9xl">🌀</h2>
              </div>
            }
          >
            <AdoptedPetContext.Provider value={adoptedPet}>
              <header className="mb-10 w-full bg-gradient-to-b from-green-200 via-green-300 to-green-500 p-7 text-center">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </AdoptedPetContext.Provider>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
