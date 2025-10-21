/**
 * page.tsx — Página principal (Home/Landing)
 * 
 * Contexto:
 * Landing page con todas las secciones principales.
 * Ya no necesita lógica de fade-in propia (ClientLayout lo maneja).
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import HeroSection from "@/components/Home/HeroSection";
import ValueProposition from "@/components/Home/ValueProposition";
import CompanyValues from "@/components/Home/CompanyValues";
import InvestmentProcess from "@/components/Home/InvestmentProcess";
import InvestorSupport from "@/components/Home/InvestorSupport";
import ActiveProjects from "@/components/Home/ActiveProjects";
import ContactCTA from "@/components/Home/ContactCTA";
import FAQ from "@/components/shared/FAQ";
import LatestArticles from "@/components/Home/LatestArticles";

const faqDataHome = [
  {
    category: "Sobre Boost A Project",
    questions: [
      {
        q: "¿Qué es Boost A Project?",
        a: "Boost A Project es una plataforma de inversión inmobiliaria colaborativa que selecciona, analiza y presenta proyectos con alta transparencia y documentación verificable. Nuestro objetivo es facilitar el acceso a oportunidades seguras y rentables, sin intermediarios innecesarios."
      },
      {
        q: "¿Qué diferencia hay con una inmobiliaria tradicional?",
        a: "A diferencia de una agencia inmobiliaria, Boost A Project no vende propiedades: presenta proyectos estructurados como inversiones, con información financiera clara, análisis de riesgos y estimaciones de rentabilidad basadas en datos reales."
      },
      {
        q: "¿Quién puede invertir?",
        a: "Cualquier persona mayor de edad que desee diversificar su capital en proyectos inmobiliarios puede participar, sin necesidad de grandes cantidades iniciales ni experiencia previa."
      }
    ]
  },
  {
    category: "Seguridad y transparencia",
    questions: [
      {
        q: "¿Cómo se garantiza la seguridad de las inversiones?",
        a: "Todos los proyectos pasan por una revisión técnica, legal y económica antes de ser publicados. Además, las operaciones se formalizan mediante contratos físicos y cuentas segregadas para garantizar la trazabilidad del capital."
      },
      {
        q: "¿Dónde puedo ver los datos del proyecto?",
        a: "Cada proyecto incluye toda su documentación accesible: presupuesto, proyección de rentabilidad, análisis de riesgos, proceso de obra y escenarios de salida. No publicamos estimaciones sin respaldo técnico."
      },
      {
        q: "¿Qué ocurre si un proyecto no se completa o no alcanza la meta?",
        a: "En ese caso, el proceso se detiene y los importes comprometidos no se ejecutan. La prioridad es la seguridad del inversor, no la captación a cualquier coste."
      }
    ]
  },
  {
    category: "Rentabilidad y funcionamiento",
    questions: [
      {
        q: "¿Qué rentabilidad puedo esperar?",
        a: "La rentabilidad depende de cada proyecto y se indica siempre en un rango realista (conservador, base y optimista). No ofrecemos promesas fijas ni retornos garantizados: trabajamos con escenarios financieros transparentes."
      },
      {
        q: "¿Cómo recibo mi rentabilidad?",
        a: "Una vez finalizado el proyecto y cumplido el objetivo, los beneficios se distribuyen según el contrato suscrito, mediante transferencia bancaria al inversor."
      },
      {
        q: "¿Qué plazos tienen los proyectos?",
        a: "Cada inversión incluye su plazo estimado de ejecución y salida, normalmente entre 6 y 24 meses según el tipo de proyecto (reforma, alquiler, revalorización, etc.)."
      }
    ]
  },
  {
    category: "Uso de la plataforma",
    questions: [
      {
        q: "¿Puedo ver proyectos sin estar registrado?",
        a: "Sí. Puedes explorar todos los proyectos, ver sus imágenes, características técnicas y rentabilidad general. Para acceder al análisis completo del proyecto (descripción detallada, escenarios financieros, análisis de riesgos y documentación), solo tienes que crear una cuenta gratuita."
      },
      {
        q: "¿Por qué necesito registrarme para ver el análisis completo?",
        a: "El registro nos ayuda a verificar el interés real de los inversores y proteger información detallada del proyecto. Además, podrás recibir actualizaciones sobre proyectos que te interesen y descargar documentación oficial."
      },
      {
        q: "¿Tiene algún coste registrarme o usar la plataforma?",
        a: "No. Crear cuenta, consultar análisis completos y recibir asesoramiento es totalmente gratuito. Solo hablamos de dinero cuando decides invertir de verdad."
      }
    ]
  }
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValueProposition />
      <InvestorSupport />
      <CompanyValues />
      <InvestmentProcess />
      <ActiveProjects />
      <FAQ 
        categories={faqDataHome}
        title="¿Tienes dudas sobre invertir?"
        subtitle="Resolvemos las preguntas más frecuentes sobre inversión inmobiliaria"
      />
      <LatestArticles />
      <ContactCTA />
    </main>
  );
}