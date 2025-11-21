import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usuarioService } from '../services/usuarioService';
import { AuthLayout, AuthHeader, AuthFormCard, AuthTextInput, AuthErrorAlert, AuthSubmitButton, AuthDivider, AuthSwitchLink } from '../components';

export default function RegistroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // Verifica se o email já existe
      const usuarios = await usuarioService.listarTodos();
      const emailJaExiste = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());

      if (emailJaExiste) {
        setErro('Este email já está cadastrado. Faça login.');
        return;
      }

      // Cria o novo usuário
      const novoUsuario = await usuarioService.criar({
        nome,
        email,
        ativo: true
      });

      login(novoUsuario);
      navigate('/perfil');
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      const mensagemErro = error.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
      setErro(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader icon="register" title="Comece sua jornada" subtitle="Crie sua conta e desenvolva suas habilidades" />
      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthTextInput
            id="nome"
            label="Nome completo"
            value={nome}
            onChange={setNome}
            icon="user"
            placeholder="Seu nome completo"
          />
          <AuthTextInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            icon="email"
            placeholder="seu@email.com"
            autoComplete="email"
          />
          <AuthErrorAlert message={erro} />
          <AuthSubmitButton
            loading={loading}
            label="Criar conta"
            loadingLabel="Criando conta..."
          />
        </form>
        <AuthDivider text="Já tem uma conta?" />
        <AuthSwitchLink to="/login" label="Fazer login" />
      </AuthFormCard>
    </AuthLayout>
  );
}