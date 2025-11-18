import type { FormEvent } from "react";
import type { Curso } from "../../services/cursoService";

interface CursoFormProps {
  novoCurso: Curso;
  setNovoCurso: (curso: Curso) => void;
  onSubmit: (e: FormEvent) => void;
  criando: boolean;
  onCancel: () => void;
}

export default function CursoForm({
  novoCurso,
  setNovoCurso,
  onSubmit,
  criando,
  onCancel,
}: CursoFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Criar Novo Curso
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
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
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={criando}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {criando ? "Criando..." : "Criar Curso"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}