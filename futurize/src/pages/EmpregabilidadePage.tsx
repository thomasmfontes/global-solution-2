import { useState } from "react";
import { PageContainer, PageHeader } from '../components';

interface Vaga {
  id: number;
  titulo: string;
  empresa: string;
  localizacao: string;
  tipo: "Remoto" | "Presencial" | "Híbrido";
  nivel: "Júnior" | "Pleno" | "Sênior";
  salario: string;
  descricao: string;
  requisitos: string[];
  compatibilidade: number;
  dataPublicacao: string;
}

export default function EmpregabilidadePage() {
  const [filtroNivel, setFiltroNivel] = useState<string>("Todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("Todos");
  const [buscaTexto, setBuscaTexto] = useState("");

  // Dados simulados de vagas - em produção, viriam de uma API
  const [vagas] = useState<Vaga[]>([
    {
      id: 1,
      titulo: "Desenvolvedor React",
      empresa: "Tech Solutions",
      localizacao: "São Paulo, SP",
      tipo: "Remoto",
      nivel: "Pleno",
      salario: "R$ 8.000 - R$ 12.000",
      descricao: "Buscamos desenvolvedor React experiente para atuar em projetos inovadores.",
      requisitos: ["React", "TypeScript", "Git", "REST APIs"],
      compatibilidade: 95,
      dataPublicacao: "2025-11-19"
    },
    {
      id: 2,
      titulo: "Frontend Developer",
      empresa: "Digital Innovations",
      localizacao: "Rio de Janeiro, RJ",
      tipo: "Híbrido",
      nivel: "Júnior",
      salario: "R$ 4.000 - R$ 6.000",
      descricao: "Oportunidade para desenvolvedores frontend iniciantes com vontade de aprender.",
      requisitos: ["HTML", "CSS", "JavaScript", "React"],
      compatibilidade: 88,
      dataPublicacao: "2025-11-18"
    },
    {
      id: 3,
      titulo: "Full Stack Developer",
      empresa: "StartUp XYZ",
      localizacao: "Belo Horizonte, MG",
      tipo: "Presencial",
      nivel: "Sênior",
      salario: "R$ 15.000 - R$ 20.000",
      descricao: "Desenvolvedor full stack para liderar projetos estratégicos da empresa.",
      requisitos: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
      compatibilidade: 78,
      dataPublicacao: "2025-11-17"
    },
    {
      id: 4,
      titulo: "React Native Developer",
      empresa: "Mobile First",
      localizacao: "Remoto",
      tipo: "Remoto",
      nivel: "Pleno",
      salario: "R$ 9.000 - R$ 13.000",
      descricao: "Desenvolvimento de aplicativos móveis usando React Native.",
      requisitos: ["React Native", "JavaScript", "Redux", "APIs"],
      compatibilidade: 85,
      dataPublicacao: "2025-11-16"
    },
    {
      id: 5,
      titulo: "UI/UX Developer",
      empresa: "Design Co",
      localizacao: "São Paulo, SP",
      tipo: "Híbrido",
      nivel: "Pleno",
      salario: "R$ 7.000 - R$ 11.000",
      descricao: "Profissional com foco em experiência do usuário e desenvolvimento frontend.",
      requisitos: ["React", "Figma", "TailwindCSS", "Acessibilidade"],
      compatibilidade: 82,
      dataPublicacao: "2025-11-15"
    }
  ]);

  const vagasFiltradas = vagas.filter(vaga => {
    const nivelOk = filtroNivel === "Todos" || vaga.nivel === filtroNivel;
    const tipoOk = filtroTipo === "Todos" || vaga.tipo === filtroTipo;
    const buscaOk = buscaTexto === "" || 
      vaga.titulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      vaga.empresa.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      vaga.requisitos.some(req => req.toLowerCase().includes(buscaTexto.toLowerCase()));
    
    return nivelOk && tipoOk && buscaOk;
  }).sort((a, b) => b.compatibilidade - a.compatibilidade);

  const getCompatibilidadeColor = (compatibilidade: number): string => {
    if (compatibilidade >= 90) return "text-green-600 dark:text-green-400";
    if (compatibilidade >= 75) return "text-blue-600 dark:text-blue-400";
    if (compatibilidade >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const getCompatibilidadeBg = (compatibilidade: number): string => {
    if (compatibilidade >= 90) return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700";
    if (compatibilidade >= 75) return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700";
    if (compatibilidade >= 60) return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700";
    return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700";
  };

  return (
    <PageContainer maxWidth="7xl">
      <PageHeader
        title="Oportunidades de Emprego"
        subtitle="Vagas recomendadas com base em suas habilidades e perfil profissional"
        align="left"
      />

        {/* Banner Informativo */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-6 text-white mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">🎯 Vagas Personalizadas para Você</h3>
              <p className="text-sm text-white/90">
                Utilizamos IA para analisar suas habilidades e recomendar as melhores oportunidades.
                As vagas são ordenadas por compatibilidade com seu perfil.
              </p>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Buscar vagas
              </label>
              <input
                type="text"
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
                placeholder="Cargo, empresa ou tecnologia..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nível
              </label>
              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Todos">Todos os níveis</option>
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Todos">Todos os tipos</option>
                <option value="Remoto">Remoto</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              <strong>{vagasFiltradas.length}</strong> vaga(s) encontrada(s)
            </span>
            <span>
              Ordenadas por compatibilidade
            </span>
          </div>
        </div>

        {/* Lista de Vagas */}
        {vagasFiltradas.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Nenhuma vaga encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou refine sua busca
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {vagasFiltradas.map((vaga) => (
              <div
                key={vaga.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-2 ${getCompatibilidadeBg(vaga.compatibilidade)}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {vaga.titulo}
                      </h2>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getCompatibilidadeColor(vaga.compatibilidade)}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {vaga.compatibilidade}% compatível
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">{vaga.empresa}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {vaga.localizacao}
                      </span>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vaga.tipo === "Remoto" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                        vaga.tipo === "Híbrido" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}>
                        {vaga.tipo}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                        {vaga.nivel}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        💰 {vaga.salario}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {vaga.descricao}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Requisitos:
                      </span>
                      {vaga.requisitos.map((req, index) => (
                        <span
                          key={index}
                          className="text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {req}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Publicada em {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
                      Candidatar-se
                    </button>
                    <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
                      Salvar Vaga
                    </button>
                  </div>
                </div>

                {/* Barra de Compatibilidade */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Compatibilidade com seu perfil</span>
                    <span className={`font-bold ${getCompatibilidadeColor(vaga.compatibilidade)}`}>
                      {vaga.compatibilidade}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        vaga.compatibilidade >= 90 ? 'bg-green-500' :
                        vaga.compatibilidade >= 75 ? 'bg-blue-500' :
                        vaga.compatibilidade >= 60 ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${vaga.compatibilidade}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dicas */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
            💡 Dicas para aumentar suas chances
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">→</span>
              <span>Complete cursos nas áreas mais demandadas para aumentar sua compatibilidade</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">→</span>
              <span>Mantenha seu perfil atualizado com suas habilidades e experiências recentes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">→</span>
              <span>Vagas com compatibilidade acima de 75% são as mais recomendadas para você</span>
            </li>
          </ul>
        </div>
    </PageContainer>
  );
}
