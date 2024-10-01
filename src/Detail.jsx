import { useState, useContext, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import Carousel from './Carousel';
import fetchPet from './fetchPet';
import ErrorBoundary from './ErrorBoundary';

const Modal = lazy(() => import('./modal'));

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Acceder al contexto de la mascota adoptada
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  // Obtener el ID del parámetro de la URL
  const { id } = useParams();

  // Realizar la consulta para obtener los detalles del animal
  const results = useQuery(['details', id], fetchPet);

  // Mostrar un loader si los datos aún se están cargando
  if (results.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h2 className="animate-spin text-9xl">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Componente de carrusel para mostrar las imágenes */}
      <Carousel images={pet.images} />

      {/* Nombre del animal */}
      <h1 className="my-4 text-center text-4xl font-bold text-gray-800">
        {pet.name}
      </h1>

      {/* Información del animal */}
      <h2 className="my-2 text-center text-xl text-gray-600">
        {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
      </h2>

      {/* Botón para adoptar */}
      <button
        className="mx-auto mt-4 block rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Adopt {pet.name}
      </button>

      {/* Descripción del animal */}
      <p className="my-4 px-4 text-center text-gray-700">{pet.description}</p>

      {/* Modal de confirmación de adopción */}
      {showModal ? (
        <Modal>
          <div className="mx-auto max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800">
              Would you like to adopt {pet.name}?
            </h1>
            <div className="mt-6 flex justify-center gap-4">
              {/* Botón para confirmar adopción */}
              <button
                className="rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-600"
                onClick={() => {
                  setAdoptedPet(pet);
                  navigate('/');
                }}
              >
                Yes
              </button>

              {/* Botón para cerrar el modal */}
              <button
                className="rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

// Envolver el componente `Details` con `ErrorBoundary` para manejo de errores
function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsWithErrorBoundary;
