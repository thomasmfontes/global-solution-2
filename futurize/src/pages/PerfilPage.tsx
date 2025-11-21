import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usuarioHabilidadeService } from "../services/usuarioHabilidadeService";
import { habilidadeService } from "../services/habilidadeService";
import { PageContainer, PageHeader } from '../components';
import type { UsuarioHabilidadeDetalhada } from "../services/usuarioHabilidadeService";
import type { Habilidade } from "../services/habilidadeService";

export default function PerfilPage() {
  const { usuario, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [minhasHabilidades, setMinhasHabilidades] = useState<UsuarioHabilidadeDetalhada[]>([]);
  const [todasHabilidades, setTodasHabilidades] = useState<Habilidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [adicionandoId, setAdicionandoId] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);

  // Dados do perfil já vêm do contexto (usuario)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    carregarDados();
  }, [isAuthenticated, navigate]);

  const carregarDados = async () => {
    if (!usuario?.id) return;
    
    try {
      setLoading(true);
      const [habilidadesUsuario, habilidades] = await Promise.all([
        usuarioHabilidadeService.buscarPorUsuario(usuario.id),
        habilidadeService.listarTodos()
      ]);
      setMinhasHabilidades(habilidadesUsuario);
      setTodasHabilidades(habilidades);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarProficiencia = async (habilidadeId: number, valor: number) => {
    if (!usuario?.id) return;
    
    try {
      console.log(`Atualizando habilidade ${habilidadeId} para ${valor}%`);
      await usuarioHabilidadeService.atualizarProficiencia(usuario.id, habilidadeId, valor);
      console.log('Atualização concluída, recarregando dados...');
      await carregarDados();
      setMensagem({ tipo: 'sucesso', texto: 'Proficiência atualizada!' });
      setTimeout(() => setMensagem(null), 2000);
    } catch (error: any) {
      console.error("Erro ao atualizar proficiência:", error);
      console.error("Detalhes:", error.response?.data);
      setMensagem({ tipo: 'erro', texto: 'Erro ao atualizar proficiência.' });
      setTimeout(() => setMensagem(null), 3000);
      await carregarDados(); // Reverte
    }
  };

  const adicionarHabilidade = async (habilidadeId: number) => {
    if (!usuario?.id) return;
    
    try {
      setAdicionandoId(habilidadeId);
      
      // Verifica se já possui essa habilidade
      const jaTemHabilidade = minhasHabilidades.some(h => h.habilidade?.id === habilidadeId);
      if (jaTemHabilidade) {
        setMensagem({ tipo: 'erro', texto: 'Você já possui essa habilidade!' });
        setTimeout(() => setMensagem(null), 3000);
        return;
      }
      
      console.log('Tentando adicionar habilidade:', habilidadeId);
      console.log('Dados enviados:', {
        usuarioId: usuario.id,
        habilidadeId,
        proficiencia: 50
      });
      
      const resultado = await usuarioHabilidadeService.criar({
        usuarioId: usuario.id,
        habilidadeId,
        proficiencia: 50
      });
      
      console.log('Habilidade adicionada com sucesso:', resultado);
      setMensagem({ tipo: 'sucesso', texto: 'Habilidade adicionada com sucesso!' });
      await carregarDados();
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setMensagem(null), 3000);
    } catch (error: any) {
      console.error("Erro ao adicionar habilidade:", error);
      console.error("Detalhes do erro:", error.response?.data);
      const mensagemErro = error.response?.data?.message || 'Erro ao adicionar habilidade. Tente novamente.';
      setMensagem({ tipo: 'erro', texto: mensagemErro });
      setTimeout(() => setMensagem(null), 5000);
    } finally {
      setAdicionandoId(null);
    }
  };

  const removerHabilidade = async (habilidadeId: number) => {
    if (!usuario?.id) return;
    if (!confirm("Deseja remover esta habilidade?")) return;
    
    try {
      await usuarioHabilidadeService.deletarPorUsuarioHabilidade(usuario.id, habilidadeId);
      setMensagem({ tipo: 'sucesso', texto: 'Habilidade removida com sucesso!' });
      await carregarDados();
      setTimeout(() => setMensagem(null), 2000);
    } catch (error) {
      console.error("Erro ao remover habilidade:", error);
    }
  };

  const getNivelPorProficiencia = (proficiencia: number): string => {
    if (proficiencia <= 25) return "Iniciante";
    if (proficiencia <= 50) return "Básico";
    if (proficiencia <= 75) return "Intermediário";
    return "Avançado";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Não foi possível carregar os dados do usuário.</div>
      </div>
    );
  }

  const habilidadesDisponiveis = todasHabilidades.filter(
    h => !minhasHabilidades.some(mh => mh.habilidade?.id === h.id)
  );

  return (
    <PageContainer maxWidth="7xl">
      <PageHeader
        title="Meu Perfil"
        subtitle="Gerencie suas informações e habilidades profissionais"
        align="left"
      />

        {/* Mensagem de Feedback */}
        {mensagem && (
          <div className={`mb-6 p-4 rounded-lg ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
            <div className="flex items-center gap-2">
              {mensagem.tipo === 'sucesso' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{mensagem.texto}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Informações Pessoais */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-3">
                  <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {usuario.nome.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {usuario.nome}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {usuario.email}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Cadastrado em: {usuario.dataCadastro ? new Date(usuario.dataCadastro).toLocaleDateString() : "-"}
                </p>
                <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${usuario.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {usuario.ativo ? "Ativo" : "Inativo"}
                </span>
              </div>
              {/* Estatísticas */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {minhasHabilidades.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Habilidades</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {minhasHabilidades.length > 0 
                        ? Math.round(minhasHabilidades.reduce((acc, h) => acc + h.proficiencia, 0) / minhasHabilidades.length)
                        : 0}%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Média Geral</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2 e 3: Minhas Habilidades */}
          <div className="lg:col-span-2 space-y-6">
            {/* Minhas Habilidades */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Minhas Habilidades ({minhasHabilidades.length})
              </h2>

              {minhasHabilidades.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Você ainda não adicionou nenhuma habilidade.
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Adicione habilidades abaixo para começar!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {minhasHabilidades.map((uh) => (
                    <div
                      key={uh.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            {uh.habilidade?.nome}
                          </h3>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                              {uh.habilidade?.categoria}
                            </span>
                            <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                              {uh.habilidade?.nivel}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => uh.habilidade?.id && removerHabilidade(uh.habilidade.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                          title="Remover habilidade"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Proficiência: {getNivelPorProficiencia(uh.proficiencia)}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {uh.proficiencia}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={uh.proficiencia}
                          onChange={(e) => {
                            // Atualiza visualmente enquanto arrasta
                            const novaProficiencia = parseInt(e.target.value);
                            setMinhasHabilidades(prev => 
                              prev.map(h => 
                                h.id === uh.id 
                                  ? { ...h, proficiencia: novaProficiencia }
                                  : h
                              )
                            );
                          }}
                          onMouseUp={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (uh.habilidade?.id) {
                              atualizarProficiencia(uh.habilidade.id, parseInt(target.value));
                            }
                          }}
                          onTouchEnd={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (uh.habilidade?.id) {
                              atualizarProficiencia(uh.habilidade.id, parseInt(target.value));
                            }
                          }}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, ${
                              uh.proficiencia <= 25 ? '#ef4444' :
                              uh.proficiencia <= 50 ? '#eab308' :
                              uh.proficiencia <= 75 ? '#3b82f6' :
                              '#10b981'
                            } 0%, ${
                              uh.proficiencia <= 25 ? '#ef4444' :
                              uh.proficiencia <= 50 ? '#eab308' :
                              uh.proficiencia <= 75 ? '#3b82f6' :
                              '#10b981'
                            } ${uh.proficiencia}%, #e5e7eb ${uh.proficiencia}%, #e5e7eb 100%)`
                          }}
                        />
                      </div>

                      {uh.dataAtualizacao && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                          Última atualização: {new Date(uh.dataAtualizacao).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Adicionar Novas Habilidades */}
            {habilidadesDisponiveis.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Adicionar Habilidades
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Selecione habilidades que você possui ou deseja desenvolver
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {habilidadesDisponiveis.map((habilidade) => (
                    <button
                      key={habilidade.id}
                      onClick={() => adicionarHabilidade(habilidade.id!)}
                      disabled={adicionandoId !== null}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {habilidade.nome}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {habilidade.categoria} • {habilidade.nivel}
                        </p>
                      </div>
                      {adicionandoId === habilidade.id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                      ) : (
                        <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
    </PageContainer>
  );
}
