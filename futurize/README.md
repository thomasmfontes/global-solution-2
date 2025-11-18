# FUTURIZE

**Plataforma inteligente de recomendação de cursos baseada em IA**

## 📋 Sobre o Projeto

O FUTURIZE é uma aplicação web moderna que conecta pessoas ao futuro do trabalho através de recomendações personalizadas de cursos. Utilizando Inteligência Artificial, a plataforma analisa perfis de usuários e sugere os melhores cursos para impulsionar suas carreiras.

### 🎯 Problema

O mercado de trabalho está em constante transformação devido a novas tecnologias, automação e IA. Muitas pessoas não sabem por onde começar ou quais cursos fazer para se manterem relevantes, resultando em investimento inadequado de tempo e recursos.

### 💡 Solução

Plataforma que utiliza algoritmos de IA para:
- Analisar perfis, habilidades e objetivos dos usuários
- Fornecer recomendações personalizadas de cursos
- Conectar usuários às melhores plataformas de ensino
- Acompanhar progresso e evolução de habilidades

### 🌍 Conexão com ODS (Objetivos de Desenvolvimento Sustentável)

- **ODS 4** - Educação de Qualidade: Promove acesso à educação de qualidade e aprendizagem ao longo da vida
- **ODS 8** - Trabalho Decente e Crescimento Econômico: Capacita pessoas para empregos dignos
- **ODS 9** - Indústria, Inovação e Infraestrutura: Utiliza tecnologia para democratizar o conhecimento

## 🚀 Stack Tecnológica

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilização**: TailwindCSS v4
- **Roteamento**: React Router DOM v7
- **HTTP Client**: Axios
- **Gerenciamento de Estado**: Context API
- **Deploy**: Vercel

## 📁 Estrutura do Projeto

```
futurize/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── Loader.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── CardCurso.tsx
│   ├── context/           # Context API
│   │   └── ThemeContext.tsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── SobrePage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── IntegrantesPage.tsx
│   │   └── DashboardPage.tsx
│   ├── routes/            # Configuração de rotas
│   │   └── Router.tsx
│   ├── services/          # Serviços de API
│   │   ├── api.ts
│   │   ├── usuarioService.ts
│   │   ├── cursoService.ts
│   │   ├── habilidadeService.ts
│   │   └── recomendacaoService.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                   # Variáveis de ambiente
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## 🔧 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/thomasmfontes/global-solution-2.git
cd global-solution-2/futurize
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse no navegador:
```
http://localhost:5173
```

## 🌐 API

A aplicação consome a API Java do projeto FUTURIZE:

**Base URL**: `https://futurize-api-production.up.railway.app/api`

### Endpoints principais:
- `GET /cursos` - Lista todos os cursos
- `POST /cursos` - Cria um novo curso
- `GET /usuarios` - Lista todos os usuários
- `POST /usuarios` - Cria um novo usuário
- `GET /habilidades` - Lista todas as habilidades
- `GET /recomendacoes` - Lista recomendações

## 📱 Funcionalidades

### Páginas Implementadas

1. **Home** (`/`)
   - Apresentação do projeto
   - CTAs para dashboard e informações
   - Destaque de features principais

2. **Sobre** (`/sobre`)
   - Descrição do problema e solução
   - Conexão com ODS
   - Explicação sobre IA e tecnologia

3. **FAQ** (`/faq`)
   - Perguntas frequentes
   - Formulário de contato (fake com validação)

4. **Integrantes** (`/integrantes`)
   - Lista de membros da equipe
   - Cards e tabela com Nome + RM

5. **Dashboard** (`/dashboard`)
   - Listagem de cursos (GET)
   - Criação de cursos (POST)
   - Listagem de usuários (GET)
   - Criação de usuários (POST)
   - Loading states e tratamento de erros

## ✨ Características

### Responsividade
- Design mobile-first
- Menu hamburguer no mobile
- Grids adaptáveis (1 coluna → 3 colunas)
- Breakpoints: mobile, tablet, desktop

### Tema Claro/Escuro
- Alternância global via Context API
- Botão no Header
- Persistência no localStorage
- Transições suaves

### Acessibilidade
- Fonte legível (>= 14px)
- Alto contraste
- Labels em todos os inputs
- Áreas clicáveis adequadas
- Aria-labels e roles
- Navegação por teclado

### Performance
- Keys corretas em listas
- useEffect com dependências corretas
- Lazy loading preparado
- Componentes otimizados
- Build otimizado com Vite

## 🎨 Design System

### Paleta de Cores
- **Primary**: Blue (50-900)
- **Background Light**: Gray 50
- **Background Dark**: Gray 950
- **Text Light**: Gray 900
- **Text Dark**: Gray 100

### Tipografia
- Font Family: system-ui, -apple-system, 'Segoe UI', Roboto
- Hierarquia clara de títulos e textos

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Deploy na Vercel
1. Conecte o repositório GitHub à Vercel
2. Configure a variável de ambiente:
   - `VITE_API_URL`: URL da API
3. Deploy automático em cada push

## 👥 Integrantes

- **Thomas Fontes** - RM123456 - [@thomasmfontes](https://github.com/thomasmfontes)
- **Integrante 2** - RM234567
- **Integrante 3** - RM345678

## 📚 Scripts Disponíveis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build de produção
npm run lint       # Executa o linter
```

## 🔗 Links

- **Repositório**: [github.com/thomasmfontes/global-solution-2](https://github.com/thomasmfontes/global-solution-2)
- **API**: [futurize-api-production.up.railway.app](https://futurize-api-production.up.railway.app/api)
- **Deploy**: (será adicionado após deploy na Vercel)
- **Vídeo**: (será adicionado)

## 📄 Licença

Este projeto foi desenvolvido como parte de um projeto acadêmico.

---

**Desenvolvido com ❤️ para transformar o futuro da educação**

