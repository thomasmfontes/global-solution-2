import type { Curso } from "../../services/cursoService";

interface CardCursoProps {
  curso: Curso;
}

export default function CardCurso({ curso }: CardCursoProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {curso.nome}
          </h3>
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-semibold px-2.5 py-0.5 rounded">
              {curso.nivel}
            </span>
            <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded">
              {curso.categoria}
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{curso.cargaHoraria}h de carga horária</span>
        </div>
      </div>
    </article>
  );
}
