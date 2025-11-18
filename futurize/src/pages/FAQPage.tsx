import { useState } from "react";
import type { FormEvent } from "react";

interface FAQItem {
  pergunta: string;
  resposta: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [mensagemEnviada, setMensagemEnviada] = useState(false);

  const faqs: FAQItem[] = [
    {
      pergunta: "O que é o FUTURIZE?",
      resposta: "O FUTURIZE é uma plataforma de recomendação de cursos baseada em Inteligência Artificial. Analisamos seu perfil, objetivos e habilidades para sugerir os melhores cursos que vão impulsionar sua carreira.",
    },
    {
      pergunta: "Como funciona a recomendação de cursos?",
      resposta: "Utilizamos algoritmos de Machine Learning que analisam seu histórico, preferências, habilidades atuais e objetivos profissionais. Com base nesses dados, cruzamos informações com tendências de mercado e sugerimos cursos personalizados para você.",
    },
    {
      pergunta: "Os cursos são gratuitos?",
      resposta: "O FUTURIZE é uma plataforma de recomendação. Indicamos cursos de diversas plataformas parceiras, que podem ser gratuitos ou pagos. Sempre mostramos todas as informações sobre preço, duração e certificação de cada curso.",
    },
    {
      pergunta: "Preciso pagar para usar o FUTURIZE?",
      resposta: "Não! O acesso à plataforma FUTURIZE é completamente gratuito. Você pode criar sua conta, receber recomendações personalizadas e explorar cursos sem nenhum custo.",
    },
    {
      pergunta: "Como a plataforma garante a qualidade dos cursos?",
      resposta: "Trabalhamos apenas com plataformas de ensino reconhecidas e avaliamos constantemente a satisfação dos usuários. Nosso algoritmo considera avaliações, taxa de conclusão e feedback da comunidade para recomendar apenas cursos de alta qualidade.",
    },
    {
      pergunta: "Posso acompanhar meu progresso?",
      resposta: "Sim! No Dashboard você pode acompanhar os cursos que já concluiu, ver suas habilidades desenvolvidas e receber novas recomendações baseadas na sua evolução profissional.",
    },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome.trim() || !formData.email.trim() || !formData.mensagem.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    // Simula envio
    setMensagemEnviada(true);
    setFormData({ nome: "", email: "", mensagem: "" });

    // Reseta mensagem após 5 segundos
    setTimeout(() => {
      setMensagemEnviada(false);
    }, 5000);
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Perguntas Frequentes
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Tire suas dúvidas sobre o FUTURIZE
        </p>

        {/* FAQ Items */}
        <section className="mb-16">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.pergunta}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {faq.resposta}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Formulário de Contato */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Não encontrou sua resposta?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Entre em contato conosco e responderemos o mais breve possível.
          </p>

          {mensagemEnviada && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg" role="alert">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                placeholder="Digite sua dúvida ou mensagem..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Enviar Mensagem
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
