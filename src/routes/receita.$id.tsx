import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { receitas } from "@/lib/data";

export const Route = createFileRoute("/receita/$id")({
  loader: ({ params }) => {
    const receita = receitas.find((r) => r.id === params.id);
    if (!receita) throw notFound();
    return { receita };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Receita não encontrada — Biblioteca de Receitas" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { receita } = loaderData;
    return {
      meta: [
        { title: `${receita.nome} — Biblioteca de Receitas` },
        { name: "description", content: receita.resumo },
        { property: "og:title", content: receita.nome },
        { property: "og:description", content: receita.resumo },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/receita/${receita.id}` }],
    };
  },
  component: ReceitaPagina,
  notFoundComponent: ReceitaNaoEncontrada,
});

function ReceitaNaoEncontrada() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-primary">Não achamos essa receita</h1>
      <p className="mt-3 text-xl text-muted-foreground">
        Talvez o endereço esteja errado. Volte e escolha outra receita da lista.
      </p>
      <Link
        to="/despensa"
        className="mt-8 inline-flex min-h-20 items-center rounded-3xl bg-primary px-8 text-2xl font-bold text-primary-foreground"
      >
        Ver receitas
      </Link>
    </div>
  );
}

function ReceitaPagina() {
  const { receita } = Route.useLoaderData();
  const [passo, setPasso] = useState(0);
  const [lendo, setLendo] = useState(false);
  const [temVoz, setTemVoz] = useState(true);

  useEffect(() => {
    setTemVoz(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function ouvir() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const texto = [
      receita.nome,
      "Ingredientes:",
      ...receita.ingredientes,
      "Modo de fazer:",
      ...receita.passos.map((p, i) => `Passo ${i + 1}. ${p}`),
    ].join(". ");
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = 0.9;
    fala.onend = () => setLendo(false);
    setLendo(true);
    window.speechSynthesis.speak(fala);
  }

  function parar() {
    window.speechSynthesis.cancel();
    setLendo(false);
  }

  const total = receita.passos.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="card-warm flex flex-col items-center gap-3 p-6 text-center">
        <span aria-hidden="true" className="text-8xl">
          {receita.emoji}
        </span>
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">{receita.nome}</h1>
        <p className="text-xl text-muted-foreground">{receita.resumo}</p>
        <p className="text-lg">
          ⏱ {receita.tempo} · 🍽 Rende {receita.porcoes}
        </p>

        {temVoz ? (
          <button
            type="button"
            onClick={lendo ? parar : ouvir}
            className="min-h-20 w-full max-w-lg rounded-3xl bg-primary text-2xl font-bold text-primary-foreground"
          >
            {lendo ? "⏹ Parar de ouvir" : "🔊 Ouvir a receita em voz alta"}
          </button>
        ) : (
          <p className="text-lg text-muted-foreground">
            Este aparelho não consegue ler a receita em voz alta.
          </p>
        )}
      </div>

      <section className="card-warm mt-8 p-6">
        <h2 className="text-2xl font-bold sm:text-3xl">O que você vai usar</h2>
        <ul className="mt-4 space-y-3 text-xl">
          {receita.ingredientes.map((ing) => (
            <li key={ing} className="flex gap-3">
              <span aria-hidden="true" className="text-primary">
                ●
              </span>
              {ing}
            </li>
          ))}
        </ul>
      </section>

      <section className="card-warm mt-8 p-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Modo de fazer, um passo por vez</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Passo {passo + 1} de {total}
        </p>
        <div className="mt-4 rounded-3xl bg-secondary p-6" aria-live="polite">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
            {passo + 1}
          </span>
          <p className="mt-4 text-2xl">{receita.passos[passo]}</p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setPasso((p) => Math.max(0, p - 1))}
            disabled={passo === 0}
            className="min-h-20 flex-1 rounded-3xl border-2 border-leaf-deep text-xl font-bold disabled:opacity-40"
          >
            ← Passo anterior
          </button>
          <button
            type="button"
            onClick={() => setPasso((p) => Math.min(total - 1, p + 1))}
            disabled={passo === total - 1}
            className="min-h-20 flex-1 rounded-3xl bg-primary text-xl font-bold text-primary-foreground disabled:opacity-40"
          >
            Próximo passo →
          </button>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/despensa"
          className="min-h-20 flex-1 rounded-3xl border-2 border-leaf-deep p-5 text-center text-xl font-bold"
        >
          🧺 Ver outras receitas
        </Link>
        <Link
          to="/comunidade"
          className="min-h-20 flex-1 rounded-3xl border-2 border-leaf-deep p-5 text-center text-xl font-bold"
        >
          💬 Contar como ficou na comunidade
        </Link>
      </div>
    </div>
  );
}
