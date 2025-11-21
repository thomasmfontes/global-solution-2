import type { Curso } from "../../services/cursoService";
import CardCurso from "../curso/CardCurso";

interface CursoListProps {
  cursos: Curso[];
  onEditar: (curso: Curso) => void;
  onDeletar: (id: number) => void;
}

export default function CursoList({ cursos, onEditar, onDeletar }: CursoListProps) {
  if (cursos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>Nenhum curso encontrado. Crie o primeiro!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cursos.map((curso) => (
        <div key={curso.id} className="relative group">
          <CardCurso curso={curso} />
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={() => onEditar(curso)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Editar curso"
              aria-label="Editar curso"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => curso.id && onDeletar(curso.id)}
              className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              title="Deletar curso"
              aria-label="Deletar curso"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}