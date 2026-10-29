import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>
        {" "}
        Sobre o <span> Brazuka</span>
      </h1>
      <p>
        O Blog Brazuka nasceu da paixão por compartilhar informação de forma
        simples, confiável e acessível. Criado em 2026, o projeto tem como
        objetivo reunir conteúdos de qualidade para quem gosta de acompanhar as
        principais novidades do Brasil e do mundo.
      </p>
      <p>
        No Brazuka, os leitores encontram notícias, análises, curiosidades e
        artigos sobre diversos temas, como esportes, tecnologia, entretenimento,
        economia, cultura, estilo de vida e muito mais. Nosso compromisso é
        apresentar informações claras, sempre buscando uma linguagem direta e de
        fácil compreensão.
      </p>
      <p>
        Acreditamos que a informação tem o poder de aproximar pessoas,
        incentivar o aprendizado e estimular boas conversas. Por isso,
        trabalhamos para produzir conteúdos relevantes, úteis e atualizados,
        respeitando nossos leitores e valorizando a qualidade das informações
        publicadas.
      </p>
      <p>
        Além das notícias, o Blog Brazuka também oferece guias, listas, dicas e
        conteúdos especiais para ajudar o público a tomar decisões mais
        informadas no dia a dia.
      </p>{" "}
      <p>
        {" "}
        Nossa missão é construir uma comunidade de leitores que valorizam
        informação de qualidade, diversidade de opiniões e conteúdos produzidos
        com responsabilidade.
      </p>
      <p>
        Seja bem-vindo ao Blog Brazuka. Esperamos que você aproveite a leitura e
        faça parte dessa jornada conosco.
      </p>
      <Link to="/posts/create" className="btn ">
        {" "}
        Criar Post
      </Link>
    </div>
  );
};

export default About;
