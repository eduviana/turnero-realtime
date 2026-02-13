import Link from "next/link";

export default function PublicLandingPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <header className="mb-14 text-center">
          {/* Badge institucional */}
          <div className="flex items-center justify-center w-fit mx-auto px-4 py-2 rounded-full font-semibold bg-blue-100 gap-2 text-sm text-blue-700 mb-6">
            <span className="text-base" aria-hidden>
              🛡️
            </span>
            <span className="tracking-wide">Portal Oficial de Autogestión</span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-800">
            Bienvenido a <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-800 to-blue-600">
              Medical Healt
            </span>
          </h1>

          {/* Descripción */}
          <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Seleccione una opción para continuar.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Iniciar sesión */}
          <Link
            href="/sign-in"
            aria-label="Iniciar sesión — Operadores y Administradores"
            className="
              group rounded-2xl border border-slate-200 bg-white p-8 text-center
              transition-all duration-200 ease-out
              hover:-translate-y-1
              hover:shadow-lg
              hover:border-slate-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
            "
          >
            <div className="flex flex-col items-center gap-5">
              <div
                className="
                  text-6xl
                  transition-transform duration-200
                  group-hover:scale-105
                "
                aria-hidden
              >
                🔒
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                Iniciar sesión
              </h2>

              <p className="text-slate-500 leading-relaxed">
                Panel exclusivo para operadores, supervisores y administradores
                del sistema.
              </p>
            </div>
          </Link>

          {/* Turnero */}
          <Link
            href="/ingreso-afiliado"
            aria-label="Turnero — Ingreso de afiliados"
            className="
              group rounded-2xl border border-slate-200 bg-white p-8 text-center
              transition-all duration-200 ease-out
              hover:-translate-y-1
              hover:shadow-lg
              hover:border-slate-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
            "
          >
            <div className="flex flex-col items-center gap-5">
              <div
                className="
                  text-6xl
                  transition-transform duration-200
                  group-hover:scale-105
                "
                aria-hidden
              >
                🧾
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                Turnero Digital
              </h2>

              <p className="text-slate-600 leading-relaxed">
                Gestione su turno ingresando su número de documento
              </p>
            </div>
          </Link>

          {/* Pantalla de turnos */}
          <Link
            href="/pantalla-turnos"
            aria-label="Pantalla de turnos — Visualización pública"
            className="
              group rounded-2xl border border-slate-200 bg-white p-8 text-center
              transition-all duration-200 ease-out
              hover:-translate-y-1
              hover:shadow-lg
              hover:border-slate-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
            "
          >
            <div className="flex flex-col items-center gap-5">
              <div
                className="
                  text-6xl
                  transition-transform duration-200
                  group-hover:scale-105
                "
                aria-hidden
              >
                📺
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                Visor de Turnos
              </h2>

              <p className="text-slate-600 leading-relaxed">
                Visualización en tiempo real de los turnos en atención y
                llamados recientes.
              </p>
            </div>
          </Link>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Obra Social
        </footer>
      </div>
    </main>
  );
}
