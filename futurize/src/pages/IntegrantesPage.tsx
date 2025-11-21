import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import IntegranteCard from "../components/integrantes/IntegranteCard";
import IntegrantesTable from "../components/integrantes/IntegrantesTable";
import { PageContainer, PageHeader } from '../components';

interface Integrante {
  nome: string;
  rm: string;
  github?: string;
  foto?: string;
}

export default function IntegrantesPage() {
  const integrantes: Integrante[] = [
    {
      nome: "Gabriel Maciel",
      rm: "RM562795",
      github: "Gabriel-Maciel06",
      foto: user1,
    },
    {
      nome: "Matheus Molina",
      rm: "RM563399",
      github: "matheus-molina",
      foto: user2,
    },
    {
      nome: "Thomas Fontes",
      rm: "RM562254",
      github: "thomasmfontes",
      foto: user3,
    },
  ];

  return (
    <PageContainer maxWidth="5xl">
      <PageHeader
        title="Nossa Equipe"
        subtitle="Conheça os integrantes do projeto FUTURIZE"
        align="center"
      />

        {/* Cards de Integrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {integrantes.map((integrante, index) => (
            <IntegranteCard
              key={index}
              nome={integrante.nome}
              rm={integrante.rm}
              github={integrante.github}
              foto={integrante.foto}
            />
          ))}
        </div>

        {/* Tabela Alternativa */}
        <IntegrantesTable integrantes={integrantes} />
    </PageContainer>
  );
}