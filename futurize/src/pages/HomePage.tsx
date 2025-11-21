import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Bem-vindo ao FUTURIZE
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Desenvolva suas habilidades, receba recomendações personalizadas de cursos e encontre as melhores oportunidades de emprego com inteligência artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/registro"
              className="bg-white text-primary-700 hover:bg-primary-50 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 inline-block min-w-[200px]"
            >
              Criar Conta Grátis
            </Link>
            <Link
              to="/sobre"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-700 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 inline-block min-w-[200px]"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Por que escolher o FUTURIZE?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Descubra como nossa plataforma pode transformar sua trajetória profissional
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <article className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4" role="img" aria-label="Perfil de Habilidades">
                💼
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Gerencie suas Habilidades
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cadastre suas habilidades, defina níveis de proficiência e acompanhe sua evolução profissional em tempo real.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4" role="img" aria-label="Recomendações IA">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Recomendações com IA
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receba sugestões personalizadas de cursos baseadas no seu perfil, objetivos e lacunas de conhecimento.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4" role="img" aria-label="Vagas">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Oportunidades de Emprego
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Encontre vagas compatíveis com suas habilidades, ordenadas por nível de compatibilidade com seu perfil.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Pronto para impulsionar sua carreira?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Crie sua conta gratuitamente e comece a receber recomendações personalizadas de cursos e vagas de emprego.
          </p>
          <Link
            to="/registro"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 inline-block shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2"
          >
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </div>
  );
}
