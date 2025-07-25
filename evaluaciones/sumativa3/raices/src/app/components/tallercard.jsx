export default function TallerCard({ nombre, apellido, correo, telefono, taller }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800">
        {nombre} {apellido}
      </h2>
      <p className="text-sm text-gray-600">
        <a href={`mailto:${correo}`} className="text-blue-500 hover:underline">{correo}</a>
      </p>
      <p className="text-sm text-gray-600">{telefono}</p>

      {taller && (
        <>
          <p className="text-sm text-gray-600 font-bold mt-2">{taller.nombre}</p>
          <p className="text-sm text-gray-500">{taller.descripcion}</p>
          <p className="text-sm text-gray-500">Profesor: {taller.profesor}</p>
        </>
      )}
    </div>
  );
}

      

