import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { cursoService } from "../services/cursoService";
import type { Curso } from "../services/cursoService";
import { usuarioService } from "../services/usuarioService";
import type { Usuario } from "../services/usuarioService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import CursoForm from "../components/dashboard/CursoForm";
import CursoList from "../components/dashboard/CursoList";
import UsuarioForm from "../components/dashboard/UsuarioForm";
import UsuarioList from "../components/dashboard/UsuarioList";

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
                  <CursoForm
                    novoCurso={novoCurso}
                    setNovoCurso={setNovoCurso}
                    onSubmit={handleCriarCurso}
                    criando={criandoCurso}
                    onCancel={() => setShowCursoForm(false)}
                  />
                )}

                {/* Lista de Cursos */}
                <CursoList cursos={cursos} />
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
                  <UsuarioForm
                    novoUsuario={novoUsuario}
                    setNovoUsuario={setNovoUsuario}
                    onSubmit={handleCriarUsuario}
                    criando={criandoUsuario}
                    onCancel={() => setShowUsuarioForm(false)}
                  />
                )}

                {/* Lista de Usuários */}
                <UsuarioList usuarios={usuarios} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}