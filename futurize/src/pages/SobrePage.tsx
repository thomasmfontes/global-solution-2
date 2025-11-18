export default function SobrePage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Sobre o FUTURIZE
        </h1>

        {/* Problema */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl" role="img" aria-label="Problema">⚠️</span>
              O Problema
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              O mercado de trabalho está em constante transformação. Novas tecnologias, automação e inteligência artificial 
              estão mudando radicalmente as profissões e as habilidades exigidas dos profissionais.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Muitas pessoas não sabem por onde começar ou quais cursos fazer para se manterem relevantes e competitivas. 
              A falta de orientação personalizada resulta em investimento de tempo e dinheiro em cursos que podem não ser 
              os mais adequados para seus objetivos de carreira.
            </p>
          </div>
        </section>

        {/* Solução */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl" role="img" aria-label="Solução">💡</span>
              Nossa Solução
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              O <strong className="text-primary-600 dark:text-primary-400">FUTURIZE</strong> é uma plataforma inteligente 
              que utiliza algoritmos de Inteligência Artificial para analisar o perfil, habilidades e objetivos de cada usuário.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Com base nessa análise, fornecemos recomendações personalizadas de cursos que realmente fazem sentido para 
              sua trajetória profissional. Conectamos você às melhores plataformas de ensino e aos cursos mais relevantes 
              para as profissões do futuro.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              <li>Recomendações baseadas em IA e análise de dados</li>
              <li>Cursos alinhados com as tendências do mercado</li>
              <li>Economia de tempo e recursos na escolha de cursos</li>
              <li>Acompanhamento do progresso e evolução de habilidades</li>
            </ul>
          </div>
        </section>

        {/* ODS */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl" role="img" aria-label="ODS">🌍</span>
              Conexão com os ODS
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              O FUTURIZE está alinhado com os <strong>Objetivos de Desenvolvimento Sustentável (ODS)</strong> da ONU, 
              contribuindo diretamente para:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-4xl flex-shrink-0" role="img" aria-label="ODS 4">📚</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    ODS 4 - Educação de Qualidade
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Promovemos o acesso à educação de qualidade e oportunidades de aprendizagem ao longo da vida para todos.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-4xl flex-shrink-0" role="img" aria-label="ODS 8">💼</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    ODS 8 - Trabalho Decente e Crescimento Econômico
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Capacitamos pessoas para conquistarem empregos dignos e contribuírem para o crescimento econômico sustentável.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-4xl flex-shrink-0" role="img" aria-label="ODS 9">🚀</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    ODS 9 - Indústria, Inovação e Infraestrutura
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Utilizamos tecnologia e inovação para democratizar o acesso ao conhecimento e preparar profissionais para o futuro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IA */}
        <section>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg shadow-md p-8 border border-primary-200 dark:border-primary-800">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl" role="img" aria-label="IA">🤖</span>
              Inteligência Artificial
            </h2>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
              Nossa plataforma utiliza algoritmos avançados de Machine Learning para:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2 ml-4">
              <li>Analisar perfis de usuários e identificar lacunas de conhecimento</li>
              <li>Prever tendências do mercado de trabalho</li>
              <li>Mapear habilidades mais demandadas por setor e região</li>
              <li>Recomendar trilhas de aprendizado personalizadas</li>
              <li>Otimizar a compatibilidade entre perfis profissionais e cursos disponíveis</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mt-4">
              Tudo isso para garantir que você invista seu tempo nas competências que realmente farão diferença 
              na sua carreira.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
