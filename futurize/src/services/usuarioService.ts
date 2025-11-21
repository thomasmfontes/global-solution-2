import { api } from "./api";

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  dataCadastro?: string;
  ativo?: boolean; // st_ativo convertido de 'S'/'N' para boolean
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
      // A API Java Oracle pode esperar 'S'/'N' para o campo ativo (CHAR(1))
      const payload = {
        nome: usuario.nome,
        email: usuario.email,
        ativo: 'S' // Envia 'S' para ativo ao invés de boolean
      };
      
      console.log('Payload enviado para criar usuário:', payload);
      
      const response = await api.post<Usuario>("/usuarios", payload);
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
