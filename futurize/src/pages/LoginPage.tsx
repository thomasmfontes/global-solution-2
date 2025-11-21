import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usuarioService } from '../services/usuarioService';
import { AuthLayout, AuthHeader, AuthFormCard, AuthTextInput, AuthErrorAlert, AuthSubmitButton, AuthDivider, AuthSwitchLink } from '../components';

export default function LoginPage() {
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
      // Busca todos os usuários e procura pelo email
      const usuarios = await usuarioService.listarTodos();
      const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!usuario) {
        setErro('Usuário não encontrado. Verifique o email ou cadastre-se.');
        return;
      }

      if (!usuario.ativo) {
        setErro('Usuário inativo. Entre em contato com o suporte.');
        return;
      }

      login(usuario);
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader icon="login" title="Bem-vindo de volta!" subtitle="Entre com seu email para continuar" />
      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            label="Entrar"
            loadingLabel="Entrando..."
          />
        </form>
        <AuthDivider text="Novo por aqui?" />
        <AuthSwitchLink to="/registro" label="Criar nova conta" />
      </AuthFormCard>
    </AuthLayout>
  );
}