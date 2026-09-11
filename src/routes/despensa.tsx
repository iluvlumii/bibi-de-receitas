import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ingredientes, receitasParaSelecao } from "@/lib/data";

export const Route = createFileRoute("/despensa")({
  head: () => ({
    meta: [
      { title: "O que você tem em casa hoje? — Biblioteca de Receitas" },
      {
        name: "description",
        content:
          "Marque na lista o que sobrou na sua geladeira e veja receitas fáceis para aproveitar tudo, sem desperdício.",
      },
      { property: "og:title", content: "O que você tem em casa hoje?" },
      {
        property: "og:description",
        content: "Selecione seus ingredientes com um toque e receba receitas na hora.",
      },
    ],
    links: [{ rel: "canonical", href: "/despensa" }],
  }),
  component: Despensa,
});

function Despensa() {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [mostrar, setMostrar] = useState(false);

  const sugestoes = useMemo(() => receitasParaSelecao(selecionados), [selecionados]);

  function alternar(id: string) {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id],
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-40">
      <h1 className="text-3xl font-bold text-primary sm:text-4xl">
        O que você tem em casa hoje?
      </h1>
      <p className="mt-3 text-xl text-muted-foreground">
        Toque na figura de cada alimento que você tem. Pode marcar quantos quiser. Para
        desmarcar, toque de novo.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {ingredientes.map((item) => {
          const marcado = selecionados.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => alternar(item.id)}
                aria-pressed={marcado}
                className={`flex min-h-44 w-full flex-col items-center justify-center gap-2 rounded-3xl border-4 p-4 text-center ${
                  marcado
                    ? "border-primary bg-secondary"
                    : "border-leaf-darkest bg-card hover:border-leaf-deep"
                }`}
              >
                <span aria-hidden="true" className="text-6xl">
                  {item.emoji}
                </span>
                <span className="text-lg font-bold">{item.nome}</span>
                <span className={`text-base ${marcado ? "text-primary" : "text-muted-foreground"}`}>
                  {marcado ? "✓ Selecionado" : "Tocar para marcar"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {mostrar && (
        <section className="mt-12" aria-live="polite">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {sugestoes.length > 0
              ? `Encontramos ${sugestoes.length} receita(s) para você`
              : "Marque pelo menos um alimento para ver receitas"}
          </h2>
          <div className="mt-6 space-y-5">
            {sugestoes.map((receita) => {
              const usados = receita.usa.filter((u) => selecionados.includes(u));
              return (
                <Link
                  key={receita.id}
                  to="/receita/$id"
                  params={{ id: receita.id }}
                  className="card-warm flex flex-col gap-3 p-6 hover:border-primary sm:flex-row sm:items-center"
                >
                  <span aria-hidden="true" className="text-6xl">
                    {receita.emoji}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-bold text-primary">
                      {receita.nome}
                    </span>
                    <span className="mt-1 block text-lg text-muted-foreground">
                      {receita.resumo}
                    </span>
                    <span className="mt-2 block text-lg">
                      Aproveita {usados.length} do que você marcou · {receita.tempo}
                    </span>
                  </span>
                  <span className="min-h-16 shrink-0 rounded-2xl bg-primary px-6 py-4 text-center text-xl font-bold text-primary-foreground">
                    Ver receita
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 border-t-2 border-leaf-darkest bg-card p-4">
        <div className="mx-auto flex max-w-5xl flex-col gap-2">
          <button
            type="button"
            onClick={() => setMostrar(true)}
            disabled={selecionados.length === 0}
            className="min-h-20 w-full rounded-3xl bg-primary text-2xl font-bold text-primary-foreground disabled:opacity-50"
          >
            Ver receitas com o que eu marquei ({selecionados.length})
          </button>
          {selecionados.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelecionados([]);
                setMostrar(false);
              }}
              className="min-h-14 w-full rounded-2xl border-2 border-leaf-deep text-lg font-bold"
            >
              Limpar tudo e começar de novo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
