import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import Results from './Results';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const result = useQuery(['search', requestParams], fetchSearch);
  const pets = result.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? '',
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            className="search-input"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
            className="search-input grayed-out-disabled"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className="rounded border-none bg-green-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
