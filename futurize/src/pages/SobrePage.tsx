import { PageContainer, PageHeader } from '../components';

export default function SobrePage() {
  return (
    <PageContainer maxWidth="4xl">
      <PageHeader title="Sobre o FUTURIZE" align="center" />

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
              O <strong className="text-primary-600 dark:text-primary-400">FUTURIZE</strong> é uma plataforma completa de desenvolvimento profissional 
              que combina gestão de habilidades, recomendações inteligentes de cursos e conexão com oportunidades de emprego.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Você cadastra suas habilidades e define níveis de proficiência. Nossa IA analisa seu perfil completo e recomenda 
              cursos personalizados para preencher lacunas de conhecimento. Além disso, conectamos você com vagas de emprego 
              compatíveis com suas competências atuais.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              <li>Gestão completa de habilidades com níveis de proficiência</li>
              <li>Recomendações personalizadas de cursos baseadas em IA</li>
              <li>Vagas de emprego rankeadas por compatibilidade com seu perfil</li>
              <li>Dashboard para gerenciar cursos e usuários</li>
              <li>Acompanhamento da evolução profissional em tempo real</li>
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
              <li>Analisar seu perfil de habilidades e identificar gaps de conhecimento</li>
              <li>Calcular compatibilidade entre suas competências e cursos disponíveis</li>
              <li>Rankear vagas de emprego por nível de match com seu perfil</li>
              <li>Sugerir cursos que complementam suas habilidades existentes</li>
              <li>Recomendar trilhas de desenvolvimento profissional personalizadas</li>
              <li>Priorizar oportunidades com base em seus objetivos de carreira</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mt-4">
              Tudo isso para garantir que você invista seu tempo nas competências que realmente farão diferença 
              na sua carreira.
            </p>
          </div>
        </section>
    </PageContainer>
  );
}
