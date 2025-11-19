import { useState } from "react";
import type { FormEvent } from "react";

interface ContactFormData {
  nome: string;
  email: string;
  mensagem: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [mensagemEnviada, setMensagemEnviada] = useState(false);

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
  );
}