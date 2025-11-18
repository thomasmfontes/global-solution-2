import { api } from "./api";

export interface Curso {
  id?: number;
  nome: string;
  descricao: string;
  duracao: number;
  nivel: string;
  categoria?: string;
  plataforma?: string;
  link?: string;
}

export const cursoService = {
  async listarTodos(): Promise<Curso[]> {
    try {
      const response = await api.get<Curso[]>("/cursos");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<Curso> {
    try {
      const response = await api.get<Curso>(`/cursos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar curso ${id}:`, error);
      throw error;
    }
  },

  async criar(curso: Curso): Promise<Curso> {
    try {
      const response = await api.post<Curso>("/cursos", curso);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      throw error;
    }
  },

  async atualizar(id: number, curso: Curso): Promise<Curso> {
    try {
      const response = await api.put<Curso>(`/cursos/${id}`, curso);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar curso ${id}:`, error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await api.delete(`/cursos/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar curso ${id}:`, error);
      throw error;
    }
  },
};
