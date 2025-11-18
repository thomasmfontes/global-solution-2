import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { cursoService } from "../services/cursoService";
import type { Curso } from "../services/cursoService";
import { usuarioService } from "../services/usuarioService";
import type { Usuario } from "../services/usuarioService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import CardCurso from "../components/CardCurso";

export default function DashboardPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cursos" | "usuarios">("cursos");
  
  // Estado do formulário de curso
  const [showCursoForm, setShowCursoForm] = useState(false);
  const [novoCurso, setNovoCurso] = useState<Curso>({
    nome: "",
    descricao: "",
    duracao: 0,
    nivel: "Iniciante",
    categoria: "",
    plataforma: "",
    link: "",
  });
  const [criandoCurso, setCriandoCurso] = useState(false);

  // Estado do formulário de usuário
  const [showUsuarioForm, setShowUsuarioForm] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    senha: "",
  });
  const [criandoUsuario, setCriandoUsuario] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Tentar carregar cursos e usuários separadamente para melhor controle de erros
      let cursosData: Curso[] = [];
      let usuariosData: Usuario[] = [];
      
      try {
        cursosData = await cursoService.listarTodos();
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
      }
      
      try {
        usuariosData = await usuarioService.listarTodos();
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
      }
      
      setCursos(cursosData);
      setUsuarios(usuariosData);
      
      // Se ambos falharem, mostrar erro
      if (cursosData.length === 0 && usuariosData.length === 0) {
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
    
    if (!novoCurso.nome || !novoCurso.descricao || novoCurso.duracao <= 0) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setCriandoCurso(true);
      const cursoCriado = await cursoService.criar(novoCurso);
      setCursos([cursoCriado, ...cursos]);
      setShowCursoForm(false);
      setNovoCurso({
        nome: "",
        descricao: "",
        duracao: 0,
        nivel: "Iniciante",
        categoria: "",
        plataforma: "",
        link: "",
      });
      alert("Curso criado com sucesso!");
    } catch (err) {
      alert("Erro ao criar curso. Tente novamente.");
      console.error(err);
    } finally {
      setCriandoCurso(false);
    }
  };

  const handleCriarUsuario = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoUsuario.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      setCriandoUsuario(true);
      const usuarioCriado = await usuarioService.criar(novoUsuario);
      setUsuarios([usuarioCriado, ...usuarios]);
      setShowUsuarioForm(false);
      setNovoUsuario({
        nome: "",
        email: "",
        senha: "",
      });
      alert("Usuário criado com sucesso!");
    } catch (err) {
      alert("Erro ao criar usuário. Tente novamente.");
      console.error(err);
    } finally {
      setCriandoUsuario(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie cursos e usuários da plataforma FUTURIZE
          </p>
        </div>

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
                    onClick={() => setShowCursoForm(!showCursoForm)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={showCursoForm ? "Cancelar criação de curso" : "Criar novo curso"}
                  >
                    {showCursoForm ? "Cancelar" : "+ Novo Curso"}
                  </button>
                </div>

                {/* Formulário de Criar Curso */}
                {showCursoForm && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Criar Novo Curso
                    </h3>
                    <form onSubmit={handleCriarCurso} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="nome-curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome do Curso *
                          </label>
                          <input
                            type="text"
                            id="nome-curso"
                            value={novoCurso.nome}
                            onChange={(e) => setNovoCurso({ ...novoCurso, nome: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="duracao-curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Duração (horas) *
                          </label>
                          <input
                            type="number"
                            id="duracao-curso"
                            min="1"
                            value={novoCurso.duracao || ""}
                            onChange={(e) => setNovoCurso({ ...novoCurso, duracao: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="descricao-curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Descrição *
                        </label>
                        <textarea
                          id="descricao-curso"
                          value={novoCurso.descricao}
                          onChange={(e) => setNovoCurso({ ...novoCurso, descricao: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="nivel-curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nível
                          </label>
                          <select
                            id="nivel-curso"
                            value={novoCurso.nivel}
                            onChange={(e) => setNovoCurso({ ...novoCurso, nivel: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option>Iniciante</option>
                            <option>Intermediário</option>
                            <option>Avançado</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="categoria-curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Categoria
                          </label>
                          <input
                            type="text"
                            id="categoria-curso"
                            value={novoCurso.categoria}
                            onChange={(e) => setNovoCurso({ ...novoCurso, categoria: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="plataforma-curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Plataforma
                          </label>
                          <input
                            type="text"
                            id="plataforma-curso"
                            value={novoCurso.plataforma}
                            onChange={(e) => setNovoCurso({ ...novoCurso, plataforma: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="link-curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Link do Curso
                        </label>
                        <input
                          type="url"
                          id="link-curso"
                          value={novoCurso.link}
                          onChange={(e) => setNovoCurso({ ...novoCurso, link: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="https://"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={criandoCurso}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        {criandoCurso ? "Criando..." : "Criar Curso"}
                      </button>
                    </form>
                  </div>
                )}

                {/* Lista de Cursos */}
                {cursos.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p>Nenhum curso encontrado. Crie o primeiro!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cursos.map((curso) => (
                      <CardCurso key={curso.id} curso={curso} />
                    ))}
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
                    onClick={() => setShowUsuarioForm(!showUsuarioForm)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={showUsuarioForm ? "Cancelar criação de usuário" : "Criar novo usuário"}
                  >
                    {showUsuarioForm ? "Cancelar" : "+ Novo Usuário"}
                  </button>
                </div>

                {/* Formulário de Criar Usuário */}
                {showUsuarioForm && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Criar Novo Usuário
                    </h3>
                    <form onSubmit={handleCriarUsuario} className="space-y-4">
                      <div>
                        <label htmlFor="nome-usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="nome-usuario"
                          value={novoUsuario.nome}
                          onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email-usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email-usuario"
                          value={novoUsuario.email}
                          onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="senha-usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Senha *
                        </label>
                        <input
                          type="password"
                          id="senha-usuario"
                          value={novoUsuario.senha}
                          onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          minLength={6}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={criandoUsuario}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        {criandoUsuario ? "Criando..." : "Criar Usuário"}
                      </button>
                    </form>
                  </div>
                )}

                {/* Lista de Usuários */}
                {usuarios.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p>Nenhum usuário encontrado. Crie o primeiro!</p>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Nome
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              E-mail
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Data Cadastro
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {usuario.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {usuario.nome}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                {usuario.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {usuario.dataCadastro ? new Date(usuario.dataCadastro).toLocaleDateString('pt-BR') : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
