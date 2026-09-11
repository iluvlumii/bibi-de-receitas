import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useId, useState } from "react";
import {
  alternarCurtida,
  buscarMural,
  comentar,
  meuCodigoDeVisitante,
  publicar,
} from "@/lib/comunidade";

export const Route = createFileRoute("/comunidade")({
  head: () => ({
    meta: [
      { title: "Comunidade: dicas da vovó e receitas de família — Biblioteca de Receitas" },
      {
        name: "description",
        content:
          "Leia, curta e comente dicas de cozinha e receitas enviadas por outras pessoas. Compartilhe a sua também.",
      },
      { property: "og:title", content: "Comunidade da Biblioteca de Receitas" },
      {
        property: "og:description",
        content: "Um mural acolhedor de dicas da vovó, truques de cozinha e receitas de família.",
      },
    ],
    links: [{ rel: "canonical", href: "/comunidade" }],
  }),
  component: Comunidade,
});

function Comunidade() {
  const queryClient = useQueryClient();
  const [visitante, setVisitante] = useState("");
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("dica");
  const [aviso, setAviso] = useState("");
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    setVisitante(meuCodigoDeVisitante());
  }, []);

  const mural = useQuery({ queryKey: ["mural"], queryFn: buscarMural });

  const novaPublicacao = useMutation({
    mutationFn: publicar,
    onSuccess: () => {
      setTitulo("");
      setTexto("");
      setEnviado(true);
      setAviso("");
      queryClient.invalidateQueries({ queryKey: ["mural"] });
    },
    onError: () => setAviso("Não conseguimos enviar agora. Tente mais uma vez, por favor."),
  });

  const novoComentario = useMutation({
    mutationFn: comentar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mural"] }),
  });

  const curtir = useMutation({
    mutationFn: (v: { id: string; jaCurtiu: boolean }) => alternarCurtida(v.id, v.jaCurtiu),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mural"] }),
  });

  function enviar() {
    if (nome.trim().length < 2) return setAviso("Escreva o seu nome, com pelo menos 2 letras.");
    if (titulo.trim().length < 2) return setAviso("Dê um título para a sua dica ou receita.");
    if (texto.trim().length < 5) return setAviso("Conte um pouquinho mais no texto.");
    setAviso("");
    novaPublicacao.mutate({
      autor: nome.trim(),
      tipo,
      titulo: titulo.trim(),
      texto: texto.trim(),
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-primary sm:text-4xl">Nossa comunidade</h1>
      <p className="mt-3 text-xl text-muted-foreground">
        Aqui a gente troca dicas da vovó, truques de cozinha e receitas de família. Fique à
        vontade para contar a sua.
      </p>

      <section className="card-warm mt-8 p-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Quero compartilhar</h2>

        <label className="mt-6 block text-xl font-bold" htmlFor="nome">
          Seu nome
        </label>
        <input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Por exemplo: Dona Maria"
          className="mt-2 min-h-16 w-full rounded-2xl border-2 border-leaf-deep bg-input px-4 text-xl placeholder:text-muted-foreground"
        />

        <p className="mt-6 text-xl font-bold">O que você vai contar?</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {[
            { valor: "dica", texto: "💡 Uma dica ou truque" },
            { valor: "receita", texto: "🍲 Uma receita minha" },
          ].map((op) => (
            <button
              key={op.valor}
              type="button"
              onClick={() => setTipo(op.valor)}
              aria-pressed={tipo === op.valor}
              className={`min-h-16 flex-1 rounded-2xl border-4 px-4 text-xl font-bold ${
                tipo === op.valor ? "border-primary bg-secondary" : "border-leaf-darkest"
              }`}
            >
              {op.texto}
            </button>
          ))}
        </div>

        <label className="mt-6 block text-xl font-bold" htmlFor="titulo">
          Título
        </label>
        <input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Por exemplo: Sopa de talos da minha mãe"
          className="mt-2 min-h-16 w-full rounded-2xl border-2 border-leaf-deep bg-input px-4 text-xl placeholder:text-muted-foreground"
        />

        <label className="mt-6 block text-xl font-bold" htmlFor="texto">
          Conte com as suas palavras
        </label>
        <textarea
          id="texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={6}
          placeholder="Escreva do jeitinho que você faz em casa. Não precisa se preocupar com palavras difíceis."
          className="mt-2 w-full rounded-2xl border-2 border-leaf-deep bg-input p-4 text-xl placeholder:text-muted-foreground"
        />

        {aviso && (
          <p className="mt-4 rounded-2xl bg-secondary p-4 text-xl text-foreground" role="alert">
            ⚠️ {aviso}
          </p>
        )}
        {enviado && !aviso && (
          <p className="mt-4 rounded-2xl bg-secondary p-4 text-xl text-primary" role="status">
            ✅ Pronto! Sua mensagem já está no mural, logo abaixo. Muito obrigado!
          </p>
        )}

        <button
          type="button"
          onClick={enviar}
          disabled={novaPublicacao.isPending}
          className="mt-6 min-h-20 w-full rounded-3xl bg-primary text-2xl font-bold text-primary-foreground disabled:opacity-60"
        >
          {novaPublicacao.isPending ? "Enviando..." : "Enviar para o mural"}
        </button>
      </section>

      <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Mural da comunidade</h2>

      {mural.isLoading && <p className="mt-4 text-xl">Carregando as mensagens...</p>}
      {mural.isError && (
        <p className="mt-4 text-xl" role="alert">
          Não conseguimos carregar o mural agora. Tente atualizar a página.
        </p>
      )}

      <div className="mt-6 space-y-6">
        {mural.data?.publicacoes.map((pub) => {
          const curtidas = mural.data.curtidas.filter((c) => c.publicacao_id === pub.id);
          const jaCurtiu = curtidas.some((c) => c.visitante === visitante);
          const comentarios = mural.data.comentarios.filter((c) => c.publicacao_id === pub.id);
          return (
            <article key={pub.id} className="card-warm p-6">
              <p className="text-lg text-muted-foreground">
                {pub.tipo === "receita" ? "🍲 Receita" : "💡 Dica"} de {pub.autor}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-primary">{pub.titulo}</h3>
              <p className="mt-3 whitespace-pre-line text-xl">{pub.texto}</p>

              <button
                type="button"
                onClick={() => curtir.mutate({ id: pub.id, jaCurtiu })}
                aria-pressed={jaCurtiu}
                className={`mt-5 min-h-16 w-full rounded-2xl border-4 px-4 text-xl font-bold sm:w-auto ${
                  jaCurtiu
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-leaf-deep"
                }`}
              >
                {jaCurtiu ? "💚 Você gostou" : "🤍 Gostei"} ({curtidas.length})
              </button>

              <div className="mt-6 border-t-2 border-leaf-darkest pt-4">
                <h4 className="text-xl font-bold">
                  Comentários ({comentarios.length})
                </h4>
                <ul className="mt-3 space-y-3">
                  {comentarios.map((c) => (
                    <li key={c.id} className="rounded-2xl bg-secondary p-4 text-lg">
                      <span className="font-bold text-primary">{c.autor}: </span>
                      {c.texto}
                    </li>
                  ))}
                </ul>
                <FormularioComentario
                  onEnviar={(autor, textoComentario) =>
                    novoComentario.mutate({
                      publicacao_id: pub.id,
                      autor,
                      texto: textoComentario,
                    })
                  }
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FormularioComentario({
  onEnviar,
}: {
  onEnviar: (autor: string, texto: string) => void;
}) {
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("");
  const campoId = useId();

  return (
    <div className="mt-4">
      <label className="block text-lg font-bold" htmlFor={`autor-${campoId}`}>
        Deixar um comentário
      </label>
      <input
        id={`autor-${campoId}`}
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Seu nome"
        aria-label="Seu nome para o comentário"
        className="mt-2 min-h-14 w-full rounded-2xl border-2 border-leaf-deep bg-input px-4 text-lg placeholder:text-muted-foreground"
      />
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        placeholder="Escreva aqui o que você achou"
        aria-label="Texto do comentário"
        className="mt-3 w-full rounded-2xl border-2 border-leaf-deep bg-input p-4 text-lg placeholder:text-muted-foreground"
      />
      {aviso && (
        <p className="mt-2 text-lg" role="alert">
          ⚠️ {aviso}
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          if (autor.trim().length < 2 || texto.trim().length < 2) {
            setAviso("Escreva o seu nome e o comentário antes de enviar.");
            return;
          }
          setAviso("");
          onEnviar(autor.trim(), texto.trim());
          setTexto("");
        }}
        className="mt-3 min-h-16 w-full rounded-2xl bg-secondary px-6 text-xl font-bold sm:w-auto"
      >
        Enviar comentário
      </button>
    </div>
  );
}
