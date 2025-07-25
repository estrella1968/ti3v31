"use client";

// Importamos las bibliotecas para utilizar efectos y estados de objetos
import { useEffect, useState } from "react";

// Importamos el componente reusable TalleresCard
import TallerCard from "./components/tallercard";

// Definimos el componente principal de la página
export default function Home() {
  // Se declaran los 3 objetos que representarán las entidades de dato de la API
  const [talleres, setTalleres] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  

  // Se declara objeto que definirá si aparece o no el mensaje "Cargando datos"
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Definición de la función asíncrona para obtener los datos de la API
    async function fetchData() {
      try {
        // Definimos los objetos y llamamos a los servicios de la API
        const [talleresRes, inscripcionesRes] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
        
        ]);

        // Definimos las variables que estarán esperando los datos de respuesta de 
        // los servicios de la API
        const [talleresData, inscripcionesData] = await Promise.all([
          talleresRes.json(),
          inscripcionesRes.json(),
        
        ]);

        // Almacenamiento de los datos ya obtenidos en los objetos que representan
        // las entidades de datos de la API.
        setTalleres(talleresData.slice(1));
        setInscripciones(inscripcionesData.slice(1));
        
      } catch (error) {
        // En caso de error, no se detiene el programa
        console.error("Error al cargar datos:", error);
      } finally {
        // Si todo sale bien, se deja de mostrar el mensaje "Cargando datos"
        setCargando(false);
      }
    }

    // Se invoca a la función que obtiene y almacena los datos de la API
    fetchData();
  }, []);

  // Definir una estructura que relaciona los datos de Inscripciones por Talleres 
  const obtenerinscripcionesPorTalleres = (id) => {
    // Se realiza la inscricion de los talleres del cliente identificado 
    const inscripcionesTaller = inscripciones.filter(i => i.id === id)[0];
    const taller = talleres.filter(t => t.id === inscripcionesTaller.taller)[0];

    return { talleres: taller };
  };


// Esto es lo que se dibuja en la pagína (es el "children")
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {cargando ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {inscripciones.map(inscripcion => {
            const { talleres } = obtenerinscripcionesPorTalleres(inscripcion.id);
            return (
              // Aquí se hace referencia a la componente ClienteCard
              <TallerCard
                key={inscripcion.id}
                nombre={inscripcion.nombres}
                apellido={inscripcion.apellidos}
                correo={inscripcion.correo}
                telefono={inscripcion.telefono}
                taller={talleres}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
