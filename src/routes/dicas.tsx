import { createFileRoute } from "@tanstack/react-router";
import { dicas } from "@/lib/data";

export const Route = createFileRoute("/dicas")({
  head: () => ({
    meta: [
      { title: "Dicas de conservação e aproveitamento — Biblioteca de Receitas" },
      {
        name: "description",
        content:
          "Como guardar, congelar e aproveitar cascas, talos e sementes para nada estragar na sua cozinha.",
      },
      { property: "og:title", content: "Dicas de conservação e aproveitamento" },
      {
        property: "og:description",
        content: "Dicas simples para a comida durar mais e nada ir para o lixo.",
      },
    ],
    links: [{ rel: "canonical", href: "/dicas" }],
  }),
  component: Dicas,
});

function Dicas() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-primary sm:text-4xl">
        Dicas para nada estragar
      </h1>
      <p className="mt-3 text-xl text-muted-foreground">
        Guardar bem é a primeira receita contra o desperdício. Leia com calma, uma dica por vez.
      </p>

      <div className="mt-8 space-y-5">
        {dicas.map((dica) => (
          <article key={dica.id} className="card-warm flex gap-4 p-6">
            <span aria-hidden="true" className="text-6xl">
              {dica.emoji}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-primary">{dica.titulo}</h2>
              <p className="mt-2 text-xl">{dica.texto}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
