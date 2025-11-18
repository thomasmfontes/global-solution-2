import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";

interface Integrante {
  nome: string;
  rm: string;
  github?: string;
  foto?: string;
}

export default function IntegrantesPage() {
  const integrantes: Integrante[] = [
    {
      nome: "Gabriel Maciel",
      rm: "RM562795",
      github: "Gabriel-Maciel06",
      foto: user1,
    },
    {
      nome: "Matheus Molina",
      rm: "RM563399",
      github: "matheus-molina",
      foto: user2,
    },
    {
      nome: "Thomas Fontes",
      rm: "RM562254",
      github: "thomasmfontes",
      foto: user3,
    },
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Nossa Equipe
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Conheça os integrantes do projeto FUTURIZE
        </p>

        {/* Cards de Integrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {integrantes.map((integrante, index) => (
            <article
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                {integrante.foto ? (
                  <img
                    src={integrante.foto}
                    alt={`Foto de ${integrante.nome}`}
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary-500 mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">
                      {integrante.nome.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Nome */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {integrante.nome}
                </h2>

                {/* RM */}
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-4">
                  {integrante.rm}
                </p>

                {/* GitHub (se houver) */}
                {integrante.github && (
                  <a
                    href={`https://github.com/${integrante.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                    aria-label={`GitHub de ${integrante.nome}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    @{integrante.github}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Tabela Alternativa */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Lista Completa
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    RM
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    GitHub
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {integrantes.map((integrante, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {integrante.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-semibold">
                      {integrante.rm}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {integrante.github ? (
                        <a
                          href={`https://github.com/${integrante.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
                          aria-label={`GitHub de ${integrante.nome}`}
                        >
                          @{integrante.github}
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
