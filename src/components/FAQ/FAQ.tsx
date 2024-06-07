import React from "react";
import Title from "../Title/Title";
import Accordion from "../Accordion/Accordion";

function FAQ() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="container">
        <Title
          customClassName=" items-center"
          title={
            <>
              Ficou com alguma {"  "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                dúvida?
              </span>
            </>
          }
        />
        <Accordion
          title="O site é realmente 100% gratuito?"
          content="Sim, nosso site é 100% gratuito. Comprometemo-nos a fornecer acesso irrestrito a uma rica coleção de livros sem qualquer custo para nossos usuários. Acreditamos que o conhecimento e a cultura devem ser acessíveis a todos."
        />
        <Accordion
          title="Posso marcar livros como favoritos no site?"
          content="Com certeza! Entendemos que encontrar um livro que você ama é uma experiência especial. Por isso, nosso site permite que você marque livros como favoritos para facilitar o acesso posterior."
        />
        <Accordion
          title="O site salva automaticamente o meu progresso de leitura?"
          content="Sim, nosso site salva automaticamente o seu progresso de leitura para que você possa retomar exatamente de onde parou, mesmo que feche o livro ou o site. Quando você retorna a um livro previamente iniciado, o site o abre na página em que você parou, garantindo uma experiência de leitura contínua e conveniente."
        />
        <Accordion
          title="Como posso buscar por livros no site?"
          content="Utilize a barra de pesquisa na parte superior da tela para digitar o título do livro, o nome do autor ou palavras-chave relacionadas."
        />
      </div>
    </div>
  );
}

export default FAQ;
