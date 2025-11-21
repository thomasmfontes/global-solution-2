import { api } from "./api";
import type { Curso } from "./cursoService";

export interface Recomendacao {
  id?: number;
  usuarioId: number; // id_usuario
  cursoId: number; // id_curso
  dataRecomendacao?: string; // dt_recomendacao
  prioridade?: number; // nu_prioridade (1-5)
  motivo?: string; // ds_motivo
}

export const recomendacaoService = {
  async listarTodos(): Promise<Recomendacao[]> {
    try {
      const response = await api.get<Recomendacao[]>("/recomendacoes");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar recomendações:", error);
      throw error;
    }
  },

  async buscarPorUsuario(usuarioId: number): Promise<Curso[]> {
    try {
      const response = await api.get<Curso[]>(`/recomendacoes/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar recomendações para usuário ${usuarioId}:`, error);
      throw error;
    }
  },

  async criar(recomendacao: Recomendacao): Promise<Recomendacao> {
    try {
      const response = await api.post<Recomendacao>("/recomendacoes", recomendacao);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar recomendação:", error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await api.delete(`/recomendacoes/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar recomendação ${id}:`, error);
      throw error;
    }
  },
};
