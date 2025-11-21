export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              FUTURIZE
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Plataforma de recomendação de cursos baseada em IA, conectando pessoas ao futuro do trabalho.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  Home
                </a>
              </li>
              <li>
                <a href="/sobre" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/integrantes" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  Integrantes
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Conecte-se
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Alinhado com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="text-2xl" role="img" aria-label="ODS 4 - Educação de Qualidade">📚</span>
              <span className="text-2xl" role="img" aria-label="ODS 8 - Trabalho Decente">💼</span>
              <span className="text-2xl" role="img" aria-label="ODS 9 - Inovação">🚀</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} FUTURIZE. Desenvolvido com ❤️ para transformar o futuro da educação.
          </p>
        </div>
      </div>
    </footer>
  );
}
