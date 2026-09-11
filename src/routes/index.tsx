import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biblioteca de Receitas — cozinhe sem desperdiçar nada" },
      {
        name: "description",
        content:
          "Receitas fáceis com o que já está na sua geladeira, dicas de conservação e um mural de dicas da vovó. Letras grandes e leitura em voz alta.",
      },
      { property: "og:title", content: "Biblioteca de Receitas" },
      {
        property: "og:description",
        content: "Receitas simples para aproveitar tudo: cascas, talos, sementes e as sobras de ontem.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Inicio,
});

const atalhos = [
  {
    to: "/despensa" as const,
    icone: "🧺",
    titulo: "O que você tem em casa hoje?",
    texto: "Marque na lista o que está na geladeira e veja receitas na hora.",
  },
  {
    to: "/dicas" as const,
    icone: "💡",
    titulo: "Dicas de conservação",
    texto: "Como guardar, congelar e aproveitar cascas, talos e sementes.",
  },
  {
    to: "/comunidade" as const,
    icone: "💬",
    titulo: "Comunidade",
    texto: "Leia e compartilhe dicas da vovó, truques e receitas de família.",
  },
];

function Inicio() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="card-warm flex flex-col items-center gap-6 p-6 text-center sm:p-10">
        <img
          src={logo.url}
          alt="Biblioteca de Receitas: um senhor de avental lendo um livro de receitas"
          className="w-56 max-w-full rounded-3xl bg-background p-2"
        />
        <h1 className="text-3xl font-bold text-primary sm:text-5xl">
          Nada de jogar comida fora
        </h1>
        <p className="max-w-2xl text-xl text-foreground sm:text-2xl">
          Aqui você diz o que sobrou na sua cozinha e a gente mostra receitas simples,
          passo a passo, com letras grandes e a opção de ouvir a receita em voz alta.
        </p>
        <Link
          to="/despensa"
          className="flex min-h-20 w-full max-w-xl items-center justify-center gap-3 rounded-3xl bg-primary px-6 text-2xl font-bold text-primary-foreground sm:text-3xl"
        >
          <span aria-hidden="true">🧺</span>
          Começar: o que tenho em casa
        </Link>
      </section>

      <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Escolha por onde começar</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {atalhos.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="card-warm flex flex-col gap-3 p-6 text-left transition-colors hover:border-primary"
          >
            <span aria-hidden="true" className="text-6xl">
              {a.icone}
            </span>
            <span className="font-display text-2xl font-bold text-primary">{a.titulo}</span>
            <span className="text-lg text-muted-foreground">{a.texto}</span>
          </Link>
        ))}
      </div>

      <section className="card-warm mt-12 p-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Como funciona, bem devagar</h2>
        <ol className="mt-4 space-y-4 text-xl">
          {[
            "Toque no botão verde grande lá em cima.",
            "Marque com o dedo as figuras dos alimentos que você tem em casa.",
            "Toque em “Ver receitas” e escolha uma da lista.",
            "Se quiser, toque em “Ouvir a receita” e o site lê os passos para você.",
          ].map((passo, i) => (
            <li key={passo} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span>{passo}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
