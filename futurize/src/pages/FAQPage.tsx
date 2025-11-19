import { useState } from "react";
import FAQItem from "../components/faq/FAQItem";
import ContactForm from "../components/faq/ContactForm";

interface FAQData {
  pergunta: string;
  resposta: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQData[] = [
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
              <FAQItem
                key={index}
                pergunta={faq.pergunta}
                resposta={faq.resposta}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </section>

        {/* Formulário de Contato */}
        <ContactForm />
      </div>
    </div>
  );
}