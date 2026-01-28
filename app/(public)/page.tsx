// import Link from "next/link";

// export default function PublicLandingPage() {
//   return (
//     <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-5xl">
//         <header className="mb-8 text-center">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800">
//             Bienvenido — Obra Social Ejemplo
//           </h1>
//           <p className="mt-2 text-sm text-slate-600">
//             Seleccione una opción para continuar.
//           </p>
//         </header>

//         <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <Link
//             href="/sign-in"
//             className="group block rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
//             aria-label="Iniciar sesión — Operadores y Administradores"
//           >
//             <div className="text-6xl mb-4" aria-hidden>
//               🔒
//             </div>
//             <h2 className="text-2xl font-semibold text-slate-800">
//               Iniciar sesión
//             </h2>
//             <p className="mt-2 text-slate-600">
//               Operadores, supervisores y administradores
//             </p>
//           </Link>
//           <Link
//             href="/ingreso-afiliado"
//             className="group block rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
//             aria-label="Abrir Turnero — Ingreso de Afiliados"
//           >
//             <div className="text-6xl mb-4" aria-hidden>
//               🧾
//             </div>
//             <h2 className="text-2xl font-semibold text-slate-800">Turnero</h2>
//             <p className="mt-2 text-slate-600">Ingresar DNI y sacar turno</p>
//           </Link>
//         </section>

//         <footer className="mt-10 text-center text-xs text-slate-500">
//           © {new Date().getFullYear()} Obra Social Ejemplo
//         </footer>
//       </div>
//     </main>
//   );
// }


import Link from "next/link";

export default function PublicLandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800">
            Bienvenido — Obra Social
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Seleccione una opción para continuar.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Iniciar sesión */}
          <Link
            href="/sign-in"
            className="group block rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Iniciar sesión — Operadores y Administradores"
          >
            <div className="text-6xl mb-4" aria-hidden>
              🔒
            </div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Iniciar sesión
            </h2>
            <p className="mt-2 text-slate-600">
              Operadores, supervisores y administradores
            </p>
          </Link>

          {/* Turnero */}
          <Link
            href="/ingreso-afiliado"
            className="group block rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Turnero — Ingreso de afiliados"
          >
            <div className="text-6xl mb-4" aria-hidden>
              🧾
            </div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Turnero
            </h2>
            <p className="mt-2 text-slate-600">
              Ingresar DNI y sacar turno
            </p>
          </Link>

          {/* Pantalla de turnos */}
          <Link
            href="/pantalla-turnos"
            className="group block rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Pantalla de turnos — Visualización pública"
          >
            <div className="text-6xl mb-4" aria-hidden>
              📺
            </div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Pantalla de turnos
            </h2>
            <p className="mt-2 text-slate-600">
              Turnos llamados y turno en atención
            </p>
          </Link>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Obra Social
        </footer>
      </div>
    </main>
  );
}