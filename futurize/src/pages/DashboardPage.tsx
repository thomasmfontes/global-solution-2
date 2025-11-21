import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { cursoService } from "../services/cursoService";
import type { Curso } from "../services/cursoService";
import { usuarioService } from "../services/usuarioService";
import type { Usuario } from "../services/usuarioService";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { Modal } from "../components/common";
import CursoForm from "../components/dashboard/CursoForm";
import CursoList from "../components/dashboard/CursoList";
import UsuarioForm from "../components/dashboard/UsuarioForm";
import UsuarioList from "../components/dashboard/UsuarioList";
import { PageContainer, PageHeader } from '../components';

export default function DashboardPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursosError, setCursosError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cursos" | "usuarios">("cursos");
  
  // Paginação
  const [cursosPagina, setCursosPagina] = useState(1);
  const [usuariosPagina, setUsuariosPagina] = useState(1);
  const itensPorPagina = 10;
  
  // Estado do formulário de curso
  const [showCursoForm, setShowCursoForm] = useState(false);
  const [editandoCursoId, setEditandoCursoId] = useState<number | null>(null);
  const [novoCurso, setNovoCurso] = useState<Curso>({
    nome: "",
    categoria: "",
    cargaHoraria: 0,
    nivel: "Iniciante",
  });
  const [criandoCurso, setCriandoCurso] = useState(false);

  // Estado do formulário de usuário
  const [showUsuarioForm, setShowUsuarioForm] = useState(false);
  const [editandoUsuarioId, setEditandoUsuarioId] = useState<number | null>(null);
  const [novoUsuario, setNovoUsuario] = useState<Usuario>({
    nome: "",
    email: "",
  });
  const [criandoUsuario, setCriandoUsuario] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      setCursosError(null);
      
      // Tentar carregar cursos e usuários separadamente para melhor controle de erros
      let cursosData: Curso[] = [];
      let usuariosData: Usuario[] = [];
      
      try {
        cursosData = await cursoService.listarTodos();
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
        setCursosError("Erro ao carregar cursos. O endpoint de cursos está com problemas no servidor (erro 500).");
      }
      
      try {
        usuariosData = await usuarioService.listarTodos();
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
      }
      
      setCursos(cursosData);
      setUsuarios(usuariosData);
      
      // Se ambos falharem, mostrar erro geral
      if (cursosData.length === 0 && usuariosData.length === 0 && !cursosError) {
        setError("A API está demorando para responder. Tente novamente em alguns instantes ou use o formulário para criar novos registros.");
      }
    } catch (err) {
      setError("Erro ao conectar com a API. Verifique se a API está online e tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarCurso = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!novoCurso.nome || !novoCurso.categoria || novoCurso.cargaHoraria <= 0) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setCriandoCurso(true);
      
      if (editandoCursoId) {
        // Editando curso existente
        const cursoAtualizado = await cursoService.atualizar(editandoCursoId, novoCurso);
        setCursos(cursos.map(c => c.id === editandoCursoId ? cursoAtualizado : c));
        alert("Curso atualizado com sucesso!");
      } else {
        // Criando novo curso
        const cursoCriado = await cursoService.criar(novoCurso);
        setCursos([cursoCriado, ...cursos]);
        setCursosPagina(1);
        alert("Curso criado com sucesso!");
      }
      
      setShowCursoForm(false);
      setEditandoCursoId(null);
      setNovoCurso({
        nome: "",
        categoria: "",
        cargaHoraria: 0,
        nivel: "Iniciante",
      });
    } catch (err) {
      alert(editandoCursoId ? "Erro ao atualizar curso. Tente novamente." : "Erro ao criar curso. Tente novamente.");
      console.error(err);
    } finally {
      setCriandoCurso(false);
    }
  };

  const handleCriarUsuario = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!novoUsuario.nome || !novoUsuario.email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoUsuario.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      setCriandoUsuario(true);
      
      if (editandoUsuarioId) {
        // Editando usuário existente
        const usuarioAtualizado = await usuarioService.atualizar(editandoUsuarioId, novoUsuario);
        setUsuarios(usuarios.map(u => u.id === editandoUsuarioId ? usuarioAtualizado : u));
        alert("Usuário atualizado com sucesso!");
      } else {
        // Criando novo usuário
        const usuarioCriado = await usuarioService.criar(novoUsuario);
        setUsuarios([usuarioCriado, ...usuarios]);
        setUsuariosPagina(1);
        alert("Usuário criado com sucesso!");
      }
      
      setShowUsuarioForm(false);
      setEditandoUsuarioId(null);
      setNovoUsuario({
        nome: "",
        email: "",
      });
    } catch (err) {
      alert(editandoUsuarioId ? "Erro ao atualizar usuário. Tente novamente." : "Erro ao criar usuário. Tente novamente.");
      console.error(err);
    } finally {
      setCriandoUsuario(false);
    }
  };

  const handleEditarCurso = (curso: Curso) => {
    setNovoCurso(curso);
    setEditandoCursoId(curso.id || null);
    setShowCursoForm(true);
  };

  const handleDeletarCurso = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este curso?")) return;
    
    try {
      await cursoService.deletar(id);
      setCursos(cursos.filter(c => c.id !== id));
      alert("Curso deletado com sucesso!");
    } catch (err) {
      alert("Erro ao deletar curso. Tente novamente.");
      console.error(err);
    }
  };

  const handleEditarUsuario = (usuario: Usuario) => {
    setNovoUsuario(usuario);
    setEditandoUsuarioId(usuario.id || null);
    setShowUsuarioForm(true);
  };

  const handleDeletarUsuario = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este usuário?")) return;
    
    try {
      await usuarioService.deletar(id);
      setUsuarios(usuarios.filter(u => u.id !== id));
      alert("Usuário deletado com sucesso!");
    } catch (err) {
      alert("Erro ao deletar usuário. Tente novamente.");
      console.error(err);
    }
  };

  const handleCancelarCurso = () => {
    setShowCursoForm(false);
    setEditandoCursoId(null);
    setNovoCurso({
      nome: "",
      categoria: "",
      cargaHoraria: 0,
      nivel: "Iniciante",
    });
  };

  const handleCancelarUsuario = () => {
    setShowUsuarioForm(false);
    setEditandoUsuarioId(null);
    setNovoUsuario({
      nome: "",
      email: "",
    });
  };

  return (
    <PageContainer maxWidth="7xl">
      <PageHeader
        title="Dashboard"
        subtitle="Gerencie cursos e usuários da plataforma FUTURIZE"
        align="left"
      />

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex gap-4" aria-label="Abas">
            <button
              onClick={() => setActiveTab("cursos")}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-t ${
                activeTab === "cursos"
                  ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              aria-current={activeTab === "cursos" ? "page" : undefined}
            >
              Cursos ({cursos.length})
            </button>
            <button
              onClick={() => setActiveTab("usuarios")}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-t ${
                activeTab === "usuarios"
                  ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              aria-current={activeTab === "usuarios" ? "page" : undefined}
            >
              Usuários ({usuarios.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} onRetry={carregarDados} />
        ) : (
          <>
            {/* Tab Cursos */}
            {activeTab === "cursos" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Lista de Cursos
                  </h2>
                  <button
                    onClick={() => {
                      if (showCursoForm && editandoCursoId) {
                        handleCancelarCurso();
                      } else {
                        setShowCursoForm(!showCursoForm);
                      }
                    }}
                    className="ml-2 p-2 text-primary-600 hover:text-primary-700 focus:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                    aria-label={showCursoForm ? "Cancelar" : "Criar novo curso"}
                  >
                    {showCursoForm ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    )}
                  </button>
                </div>

                {/* Erro específico de cursos */}
                {cursosError && (
                  <div className="mb-6">
                    <ErrorMessage message={cursosError} onRetry={carregarDados} />
                  </div>
                )}

                {/* Formulário de Criar Curso */}
                <Modal
                  isOpen={showCursoForm}
                  onClose={handleCancelarCurso}
                  title={editandoCursoId ? "Editar Curso" : "Criar Novo Curso"}
                  size="lg"
                >
                  <CursoForm
                    novoCurso={novoCurso}
                    setNovoCurso={setNovoCurso}
                    onSubmit={handleCriarCurso}
                    criando={criandoCurso}
                    onCancel={handleCancelarCurso}
                    editando={!!editandoCursoId}
                  />
                </Modal>

                {/* Lista de Cursos */}
                <CursoList 
                  cursos={cursos.slice((cursosPagina - 1) * itensPorPagina, cursosPagina * itensPorPagina)}
                  onEditar={handleEditarCurso}
                  onDeletar={handleDeletarCurso}
                />
                
                {/* Paginação de Cursos */}
                {cursos.length > itensPorPagina && (
                  <div className="mt-6 flex items-center justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCursosPagina(p => Math.max(1, p - 1))}
                        disabled={cursosPagina === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Anterior
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.ceil(cursos.length / itensPorPagina) }, (_, i) => i + 1).map(num => (
                          <button
                            key={num}
                            onClick={() => setCursosPagina(num)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              num === cursosPagina
                                ? "bg-primary-600 text-white"
                                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCursosPagina(p => Math.min(Math.ceil(cursos.length / itensPorPagina), p + 1))}
                        disabled={cursosPagina >= Math.ceil(cursos.length / itensPorPagina)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Próximo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab Usuários */}
            {activeTab === "usuarios" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Lista de Usuários
                  </h2>
                  <button
                    onClick={() => {
                      if (showUsuarioForm && editandoUsuarioId) {
                        handleCancelarUsuario();
                      } else {
                        setShowUsuarioForm(!showUsuarioForm);
                      }
                    }}
                    className="ml-2 p-2 text-primary-600 hover:text-primary-700 focus:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                    aria-label={showUsuarioForm ? "Cancelar" : "Criar novo usuário"}
                  >
                    {showUsuarioForm ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    )}
                  </button>
                </div>

                {/* Formulário de Criar Usuário */}
                <Modal
                  isOpen={showUsuarioForm}
                  onClose={handleCancelarUsuario}
                  title={editandoUsuarioId ? "Editar Usuário" : "Criar Novo Usuário"}
                  size="md"
                >
                  <UsuarioForm
                    novoUsuario={novoUsuario}
                    setNovoUsuario={setNovoUsuario}
                    onSubmit={handleCriarUsuario}
                    criando={criandoUsuario}
                    onCancel={handleCancelarUsuario}
                    editando={!!editandoUsuarioId}
                  />
                </Modal>

                {/* Lista de Usuários */}
                <UsuarioList 
                  usuarios={usuarios.slice((usuariosPagina - 1) * itensPorPagina, usuariosPagina * itensPorPagina)}
                  onEditar={handleEditarUsuario}
                  onDeletar={handleDeletarUsuario}
                />
                
                {/* Paginação de Usuários */}
                {usuarios.length > itensPorPagina && (
                  <div className="mt-6 flex items-center justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUsuariosPagina(p => Math.max(1, p - 1))}
                        disabled={usuariosPagina === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Anterior
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.ceil(usuarios.length / itensPorPagina) }, (_, i) => i + 1).map(num => (
                          <button
                            key={num}
                            onClick={() => setUsuariosPagina(num)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              num === usuariosPagina
                                ? "bg-primary-600 text-white"
                                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setUsuariosPagina(p => Math.min(Math.ceil(usuarios.length / itensPorPagina), p + 1))}
                        disabled={usuariosPagina >= Math.ceil(usuarios.length / itensPorPagina)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Próximo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
    </PageContainer>
  );
}