import { useState } from "react";
import FAQItem from "../components/faq/FAQItem";
import ContactForm from "../components/faq/ContactForm";
import { PageContainer, PageHeader } from '../components';

interface FAQData {
  pergunta: string;
  resposta: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQData[] = [
    {
      pergunta: "O que é o FUTURIZE?",
      resposta: "O FUTURIZE é uma plataforma completa de desenvolvimento profissional que combina gestão de habilidades, recomendações inteligentes de cursos e conexão com vagas de emprego. Cadastre suas habilidades, receba recomendações personalizadas e encontre oportunidades alinhadas ao seu perfil.",
    },
    {
      pergunta: "Como funciona o sistema de habilidades?",
      resposta: "No seu perfil, você pode adicionar habilidades e definir o nível de proficiência (0-100%) para cada uma. Nossa IA analisa essas informações para recomendar cursos que preencham lacunas de conhecimento e vagas compatíveis com suas competências.",
    },
    {
      pergunta: "Como são feitas as recomendações de cursos?",
      resposta: "Utilizamos algoritmos de Machine Learning que analisam suas habilidades cadastradas, níveis de proficiência e objetivos. Com base nisso, recomendamos cursos com alta compatibilidade, priorizando aqueles que complementam suas competências existentes.",
    },
    {
      pergunta: "Como funciona a seção de Empregabilidade?",
      resposta: "A página de Empregabilidade mostra vagas de emprego rankeadas por compatibilidade com seu perfil. Quanto mais alinhadas suas habilidades estiverem com os requisitos da vaga, maior será o percentual de compatibilidade exibido.",
    },
    {
      pergunta: "Preciso pagar para usar o FUTURIZE?",
      resposta: "Não! A plataforma FUTURIZE é completamente gratuita. Você pode criar sua conta, gerenciar habilidades, receber recomendações personalizadas de cursos e explorar vagas de emprego sem nenhum custo.",
    },
    {
      pergunta: "O que posso fazer no Dashboard?",
      resposta: "O Dashboard permite que administradores gerenciem cursos e usuários da plataforma. Você pode criar, visualizar e organizar o catálogo de cursos disponíveis, além de gerenciar a base de usuários do sistema.",
    },
    {
      pergunta: "Como atualizo minhas habilidades?",
      resposta: "Acesse a página 'Meu Perfil' para adicionar novas habilidades ou ajustar os níveis de proficiência das existentes. Use o slider para definir seu nível (Iniciante 0-25%, Básico 26-50%, Intermediário 51-75%, Avançado 76-100%).",
    },
    {
      pergunta: "As recomendações são atualizadas automaticamente?",
      resposta: "Sim! Sempre que você atualiza suas habilidades ou níveis de proficiência, nossas recomendações de cursos e compatibilidade com vagas são recalculadas para refletir seu perfil atual.",
    },
  ];

  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre o FUTURIZE"
        align="center"
      />

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
    </PageContainer>
  );
}