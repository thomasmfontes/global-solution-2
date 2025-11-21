/**
 * Tipos centralizados baseados no esquema do banco de dados Oracle
 * Referência: MAPEAMENTO_DATABASE.md
 */

// Tipo para níveis de curso/habilidade (conforme constraint do banco)
export type NivelType = 'Iniciante' | 'Intermediario' | 'Avancado';

// Tipo para prioridade de recomendação (1-5 conforme constraint do banco)
export type PrioridadeType = 1 | 2 | 3 | 4 | 5;

// Tipo para proficiência (0-100 conforme constraint do banco)
export type ProficienciaType = number; // 0-100

/**
 * Interface para Usuario (tabela: t_fz_usuario)
 */
export interface IUsuario {
  id?: number; // id_usuario (auto-increment)
  nome: string; // nm_usuario
  email: string; // ds_email (unique)
  dataCadastro?: string; // dt_cadastro (ISO string)
  ativo?: boolean; // st_ativo ('S'/'N' convertido para boolean)
}

/**
 * Interface para Habilidade (tabela: t_fz_habilidade)
 */
export interface IHabilidade {
  id?: number; // id_habilidade (auto-increment)
  nome: string; // nm_habilidade
  categoria: string; // ds_categoria
  nivel: NivelType; // ds_nivel (constraint: Iniciante/Intermediario/Avancado)
}

/**
 * Interface para Curso (tabela: t_fz_curso)
 */
export interface ICurso {
  id?: number; // id_curso (auto-increment)
  nome: string; // nm_curso
  categoria: string; // ds_categoria
  cargaHoraria: number; // qt_carga_horaria (>0)
  nivel: NivelType; // ds_nivel (constraint: Iniciante/Intermediario/Avancado)
}

/**
 * Interface para UsuarioHabilidade (tabela: t_fz_usuario_habilidade)
 * Relacionamento N:M entre Usuario e Habilidade
 */
export interface IUsuarioHabilidade {
  id?: number; // id_usuario_habilidade (auto-increment)
  usuarioId: number; // id_usuario (FK)
  habilidadeId: number; // id_habilidade (FK)
  proficiencia: ProficienciaType; // nu_proficiencia (0-100)
  dataAtualizacao?: string; // dt_atualizacao (ISO string)
}

/**
 * Interface estendida com dados da habilidade
 */
export interface IUsuarioHabilidadeDetalhada extends IUsuarioHabilidade {
  habilidade?: IHabilidade;
}

/**
 * Interface para Recomendacao (tabela: t_fz_recomendacao)
 */
export interface IRecomendacao {
  id?: number; // id_recomendacao (auto-increment)
  usuarioId: number; // id_usuario (FK)
  cursoId: number; // id_curso (FK)
  dataRecomendacao?: string; // dt_recomendacao (ISO string)
  prioridade?: PrioridadeType; // nu_prioridade (1-5, default: 3)
  motivo?: string; // ds_motivo
}

/**
 * Interface estendida com dados do curso
 */
export interface IRecomendacaoDetalhada extends IRecomendacao {
  curso?: ICurso;
}

/**
 * Tipo para validação de status ativo
 */
export type StatusAtivoDb = 'S' | 'N';

/**
 * Helpers para conversão de tipos
 */
export const DatabaseHelpers = {
  /**
   * Converte status ativo do banco ('S'/'N') para boolean
   */
  statusToBoolean: (status: StatusAtivoDb): boolean => status === 'S',

  /**
   * Converte boolean para status ativo do banco
   */
  booleanToStatus: (ativo: boolean): StatusAtivoDb => ativo ? 'S' : 'N',

  /**
   * Valida se a proficiência está no intervalo correto (0-100)
   */
  validarProficiencia: (proficiencia: number): boolean => 
    proficiencia >= 0 && proficiencia <= 100,

  /**
   * Valida se a prioridade está no intervalo correto (1-5)
   */
  validarPrioridade: (prioridade: number): boolean => 
    prioridade >= 1 && prioridade <= 5,

  /**
   * Valida se a carga horária é maior que 0
   */
  validarCargaHoraria: (cargaHoraria: number): boolean => 
    cargaHoraria > 0,

  /**
   * Valida se o nível é válido
   */
  validarNivel: (nivel: string): nivel is NivelType => 
    ['Iniciante', 'Intermediario', 'Avancado'].includes(nivel),
};
