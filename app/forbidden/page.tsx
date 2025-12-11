


export default function ForbiddenPage() {
  return (
    <div className="flex items-center justify-center h-full p-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Acceso denegado</h1>
        <p className="text-lg text-gray-600">
          No tiene permisos para acceder a esta sección.
        </p>
      </div>
    </div>
  );
}