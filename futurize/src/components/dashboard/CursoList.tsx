import type { Curso } from "../../services/cursoService";
import CardCurso from "../CardCurso";

interface CursoListProps {
  cursos: Curso[];
}

export default function CursoList({ cursos }: CursoListProps) {
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
        <CardCurso key={curso.id} curso={curso} />
      ))}
    </div>
  );
}