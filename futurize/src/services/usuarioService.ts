import { api } from "./api";

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  dataCadastro?: string;
}

export const usuarioService = {
  async listarTodos(): Promise<Usuario[]> {
    try {
      const response = await api.get<Usuario[]>("/usuarios");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<Usuario> {
    try {
      const response = await api.get<Usuario>(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  },

  async criar(usuario: Usuario): Promise<Usuario> {
    try {
      const response = await api.post<Usuario>("/usuarios", usuario);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  async atualizar(id: number, usuario: Usuario): Promise<Usuario> {
    try {
      const response = await api.put<Usuario>(`/usuarios/${id}`, usuario);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}:`, error);
      throw error;
    }
  },
};
