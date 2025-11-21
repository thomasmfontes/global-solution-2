import { useState, useEffect } from "react";
import { recomendacaoService } from "../services/recomendacaoService";
import { usuarioHabilidadeService } from "../services/usuarioHabilidadeService";
import { PageContainer, PageHeader } from '../components';
import type { Curso } from "../services/cursoService";

export default function RecomendacoesPage() {
  const [cursosRecomendados, setCursosRecomendados] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioId] = useState(1); // TODO: Pegar do contexto de autenticação
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todas");
  const [filtroNivel, setFiltroNivel] = useState<string>("Todos");

  useEffect(() => {
    carregarRecomendacoes();
  }, []);

  const carregarRecomendacoes = async () => {
    try {
      setLoading(true);
      const cursos = await recomendacaoService.buscarPorUsuario(usuarioId);
      setCursosRecomendados(cursos);
    } catch (error) {
      console.error("Erro ao carregar recomendações:", error);
    } finally {
      setLoading(false);
    }
  };

  const gerarRecomendacoesIA = async () => {
    try {
      setLoading(true);
      
      // Buscar habilidades do usuário
      const habilidades = await usuarioHabilidadeService.buscarPorUsuario(usuarioId);
      
      // Aqui você integraria com uma API de IA real
      // Por enquanto, vamos simular recomendações baseadas em habilidades
      alert(`IA analisou ${habilidades.length} habilidades e está gerando recomendações personalizadas...`);
      
      await carregarRecomendacoes();
    } catch (error) {
      console.error("Erro ao gerar recomendações:", error);
    } finally {
      setLoading(false);
    }
  };

  const categorias = ["Todas", ...new Set(cursosRecomendados.map(c => c.categoria))];
  const niveis = ["Todos", "Iniciante", "Intermediario", "Avancado"];

  const cursosFiltrados = cursosRecomendados.filter(curso => {
    const categoriaOk = filtroCategoria === "Todas" || curso.categoria === filtroCategoria;
    const nivelOk = filtroNivel === "Todos" || curso.nivel === filtroNivel;
    return categoriaOk && nivelOk;
  });

  const getPrioridadeColor = (index: number): string => {
    if (index < 3) return "border-l-4 border-l-green-500";
    if (index < 6) return "border-l-4 border-l-yellow-500";
    return "border-l-4 border-l-gray-300";
  };

  const getPrioridadeLabel = (index: number): { text: string; color: string } => {
    if (index < 3) return { text: "Alta Prioridade", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" };
    if (index < 6) return { text: "Média Prioridade", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" };
    return { text: "Baixa Prioridade", color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Gerando recomendações personalizadas...</p>
        </div>
      </div>
    );
  }

  return (
    <PageContainer maxWidth="7xl">
      <PageHeader
        title="Recomendações Personalizadas"
        subtitle="Cursos selecionados especialmente para você com base em suas habilidades e objetivos"
        align="left"
      />

          {/* IA Banner */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Recomendações Inteligentes</h3>
                  <p className="text-sm text-white/80">
                    Nossa IA analisa seu perfil e sugere os melhores cursos para você
                  </p>
                </div>
              </div>
              <button
                onClick={gerarRecomendacoesIA}
                className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Atualizar Recomendações
              </button>
            </div>
          </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nível
              </label>
              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {niveis.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>{cursosFiltrados.length}</strong> curso(s) encontrado(s)
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Cursos Recomendados */}
        {cursosFiltrados.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Nenhuma recomendação encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete seu perfil e adicione suas habilidades para receber recomendações personalizadas
            </p>
            <button
              onClick={gerarRecomendacoesIA}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Gerar Recomendações
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cursosFiltrados.map((curso, index) => {
              const prioridade = getPrioridadeLabel(index);
              
              return (
                <div
                  key={curso.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700 ${getPrioridadeColor(index)}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Badges de Prioridade e Posição */}
                      <div className="flex gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${prioridade.color}`}>
                          {prioridade.text}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-2.5 py-0.5 rounded">
                          #{index + 1} Recomendado
                        </span>
                      </div>

                      {/* Título e Categoria */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {curso.nome}
                      </h3>

                      <div className="flex gap-2 mb-4">
                        <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {curso.nivel}
                        </span>
                        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {curso.categoria}
                        </span>
                      </div>

                      {/* Informações */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{curso.cargaHoraria}h de carga horária</span>
                        </div>
                      </div>

                      {/* Motivo da Recomendação (Simulado) */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                        <p className="text-sm text-blue-900 dark:text-blue-200">
                          <strong>💡 Por que recomendamos:</strong> Este curso complementa suas habilidades em {curso.categoria} 
                          e está alinhado com seu perfil profissional.
                        </p>
                      </div>

                      {/* Compatibilidade (Simulado) */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Compatibilidade com seu perfil</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {95 - index * 5}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${95 - index * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col gap-2">
                      <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors whitespace-nowrap">
                        Ver Detalhes
                      </button>
                      <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors whitespace-nowrap">
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dicas */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            💡 Dicas para aproveitar melhor as recomendações
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">→</span>
              <span>Cursos com <strong>alta prioridade</strong> têm maior compatibilidade com seu perfil atual</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">→</span>
              <span>Atualize suas habilidades regularmente para receber recomendações mais precisas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">→</span>
              <span>Complete cursos para desbloquear novas recomendações avançadas</span>
            </li>
          </ul>
        </div>
    </PageContainer>
  );
}
