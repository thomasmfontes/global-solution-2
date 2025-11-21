import { api } from "./api";
import type { Habilidade } from "./habilidadeService";

export interface UsuarioHabilidade {
  id?: number;
  usuarioId: number; // id_usuario
  habilidadeId: number; // id_habilidade
  proficiencia: number; // nu_proficiencia (0-100)
  dataAtualizacao?: string; // dt_atualizacao
}

// Interface estendida que inclui os dados da habilidade
export interface UsuarioHabilidadeDetalhada extends UsuarioHabilidade {
  habilidade?: Habilidade;
}

export const usuarioHabilidadeService = {
  async listarTodos(): Promise<UsuarioHabilidade[]> {
    try {
      const response = await api.get<UsuarioHabilidade[]>("/usuario-habilidades");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar usuário-habilidades:", error);
      throw error;
    }
  },

  async buscarPorUsuario(usuarioId: number): Promise<UsuarioHabilidadeDetalhada[]> {
    try {
      const response = await api.get<UsuarioHabilidadeDetalhada[]>(
        `/usuario-habilidades/usuario/${usuarioId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar habilidades do usuário ${usuarioId}:`, error);
      throw error;
    }
  },

  async buscarPorHabilidade(habilidadeId: number): Promise<UsuarioHabilidade[]> {
    try {
      const response = await api.get<UsuarioHabilidade[]>(
        `/usuario-habilidades/habilidade/${habilidadeId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuários com habilidade ${habilidadeId}:`, error);
      throw error;
    }
  },

  async criar(usuarioHabilidade: UsuarioHabilidade): Promise<UsuarioHabilidade> {
    try {
      // Formato esperado pela API Java: objetos aninhados com id
      const payload = {
        usuario: {
          id: usuarioHabilidade.usuarioId
        },
        habilidade: {
          id: usuarioHabilidade.habilidadeId
        },
        proficiencia: usuarioHabilidade.proficiencia
      };
      
      console.log('Payload enviado para API:', payload);
      
      const response = await api.post<UsuarioHabilidade>(
        "/usuario-habilidades",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário-habilidade:", error);
      throw error;
    }
  },

  async atualizar(
    id: number,
    usuarioHabilidade: Partial<UsuarioHabilidade>
  ): Promise<UsuarioHabilidade> {
    try {
      const response = await api.put<UsuarioHabilidade>(
        `/usuario-habilidades/${id}`,
        usuarioHabilidade
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário-habilidade ${id}:`, error);
      throw error;
    }
  },

  async atualizarProficiencia(
    usuarioId: number,
    habilidadeId: number,
    proficiencia: number
  ): Promise<UsuarioHabilidade> {
    try {
      // Encontra o ID da relação primeiro
      console.log(`Buscando relação para usuário ${usuarioId} e habilidade ${habilidadeId}`);
      const habilidades = await this.buscarPorUsuario(usuarioId);
      console.log('Habilidades encontradas:', habilidades);
      
      // A API retorna habilidade como objeto, então precisamos acessar habilidade.id
      const relacao = habilidades.find(h => 
        (h.habilidadeId === habilidadeId) || 
        ((h as any).habilidade?.id === habilidadeId)
      );
      console.log('Relação encontrada:', relacao);
      
      if (!relacao || !relacao.id) {
        throw new Error('Relação usuário-habilidade não encontrada');
      }

      // Atualiza usando PUT com o formato esperado pela API
      const payload = {
        usuario: {
          id: usuarioId
        },
        habilidade: {
          id: habilidadeId
        },
        proficiencia: proficiencia
      };

      console.log(`PUT /usuario-habilidades/${relacao.id}`, payload);

      const response = await api.put<UsuarioHabilidade>(
        `/usuario-habilidades/${relacao.id}`,
        payload
      );
      
      console.log('Resposta da API:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao atualizar proficiência da habilidade ${habilidadeId} do usuário ${usuarioId}:`,
        error
      );
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await api.delete(`/usuario-habilidades/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar usuário-habilidade ${id}:`, error);
      throw error;
    }
  },

  async deletarPorUsuarioHabilidade(
    usuarioId: number,
    habilidadeId: number
  ): Promise<void> {
    try {
      // A API Java provavelmente usa DELETE /usuario-habilidades/{id}
      // Precisamos encontrar o ID da relação primeiro
      const habilidades = await this.buscarPorUsuario(usuarioId);
      
      // A API retorna habilidade como objeto, então precisamos acessar habilidade.id
      const relacao = habilidades.find(h => 
        (h.habilidadeId === habilidadeId) || 
        ((h as any).habilidade?.id === habilidadeId)
      );
      
      if (!relacao || !relacao.id) {
        throw new Error('Relação usuário-habilidade não encontrada');
      }
      
      await this.deletar(relacao.id);
    } catch (error) {
      console.error(
        `Erro ao deletar relação usuário ${usuarioId} - habilidade ${habilidadeId}:`,
        error
      );
      throw error;
    }
  },
};
