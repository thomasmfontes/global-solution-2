import { api } from "./api";

export interface Habilidade {
  id?: number;
  nome: string;
  descricao: string;
  categoria?: string;
  nivelImportancia?: string;
}

export const habilidadeService = {
  async listarTodos(): Promise<Habilidade[]> {
    try {
      const response = await api.get<Habilidade[]>("/habilidades");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar habilidades:", error);
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<Habilidade> {
    try {
      const response = await api.get<Habilidade>(`/habilidades/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar habilidade ${id}:`, error);
      throw error;
    }
  },

  async criar(habilidade: Habilidade): Promise<Habilidade> {
    try {
      const response = await api.post<Habilidade>("/habilidades", habilidade);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar habilidade:", error);
      throw error;
    }
  },

  async atualizar(id: number, habilidade: Habilidade): Promise<Habilidade> {
    try {
      const response = await api.put<Habilidade>(`/habilidades/${id}`, habilidade);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar habilidade ${id}:`, error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await api.delete(`/habilidades/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar habilidade ${id}:`, error);
      throw error;
    }
  },
};
