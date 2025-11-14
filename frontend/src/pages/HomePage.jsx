import { useEffect, useState } from "react";

export const HomePage = () => {
  // TODO: Integrar lógica para obtener superhéroes desde la API
  // TODO: Implementar useState para almacenar la lista de superhéroes
  // TODO: Implementar función para recargar superhéroes

  // Datos de ejemplo para las cards
    const [superheroes, setSuperheroes] = useState([]);
    const [loading, setLoading] = useState(false);
  
  // {
  //   id: 1,
  //   superhero: "Superman",
  //   image:
  //     "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
  // },
  //   {
  //     id: 2,
  //     superhero: "Batman",
  //     image:
  //       "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
  //   },
  //   {
  //     id: 3,
  //     superhero: "Wonder Woman",
  //     image:
  //       "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
  //   },
  //   {
  //     id: 4,
  //     superhero: "Spider-Man",
  //     image:
  //       "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
  //   },
  //   {
  //     id: 5,
  //     superhero: "Iron Man",
  //     image:
  //       "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
  //   },
  //   {
  //     id: 6,
  //     superhero: "Captain America",
  //     image:
  //       "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
  //   },
  // ];

  const getSuperheroes = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/superheroes", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const dataHeroe = await response.json();
        setSuperheroes(dataHeroe);
      }
    } catch (error) {
      console.log("Error al obtener los superHeroes: ", error.message);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSuperheroes();
  }, []);

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
        Galería de Superhéroes
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={getSuperheroes}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Recargar"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {superheroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={hero.image}
              alt={hero.superhero}
              className="h-64 object-cover w-full"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {hero.superhero}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
