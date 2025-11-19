import type { FormEvent } from "react";
import type { Usuario } from "../../services/usuarioService";

interface UsuarioFormProps {
  novoUsuario: Usuario;
  setNovoUsuario: (usuario: Usuario) => void;
  onSubmit: (e: FormEvent) => void;
  criando: boolean;
  onCancel: () => void;
}

export default function UsuarioForm({
  novoUsuario,
  setNovoUsuario,
  onSubmit,
  criando,
  onCancel,
}: UsuarioFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Criar Novo Usuário
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome-usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome Completo *
          </label>
          <input
            type="text"
            id="nome-usuario"
            value={novoUsuario.nome}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="email-usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            E-mail *
          </label>
          <input
            type="email"
            id="email-usuario"
            value={novoUsuario.email}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="senha-usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Senha *
          </label>
          <input
            type="password"
            id="senha-usuario"
            value={novoUsuario.senha}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            minLength={6}
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={criando}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {criando ? "Criando..." : "Criar Usuário"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}