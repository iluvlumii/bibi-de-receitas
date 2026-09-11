import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";

const SIZES = [17, 19, 22, 26, 30];
const STORAGE_KEY = "tamanho-da-letra";

function useFontSize() {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY));
    if (SIZES[saved] !== undefined) setIndex(saved);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--app-font-size", `${SIZES[index]}px`);
    window.localStorage.setItem(STORAGE_KEY, String(index));
  }, [index]);

  return {
    index,
    aumentar: () => setIndex((i) => Math.min(i + 1, SIZES.length - 1)),
    diminuir: () => setIndex((i) => Math.max(i - 1, 0)),
  };
}

export function SiteHeader() {
  const { index, aumentar, diminuir } = useFontSize();

  return (
    <header className="border-b-2 border-leaf-darkest bg-card">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 rounded-2xl p-1">
            <img
              src={logo.url}
              alt="Biblioteca de Receitas: um senhor lendo um livro de receitas"
              className="size-16 rounded-full bg-background object-contain"
            />
            <span className="font-display text-2xl font-bold text-primary">
              Biblioteca de Receitas
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-base text-muted-foreground">Tamanho da letra:</span>
            <button
              type="button"
              onClick={diminuir}
              disabled={index === 0}
              aria-label="Diminuir o tamanho da letra"
              className="min-h-14 min-w-14 rounded-2xl border-2 border-leaf-deep bg-background text-2xl font-bold text-primary disabled:opacity-40"
            >
              A-
            </button>
            <button
              type="button"
              onClick={aumentar}
              disabled={index === SIZES.length - 1}
              aria-label="Aumentar o tamanho da letra"
              className="min-h-14 min-w-14 rounded-2xl border-2 border-leaf-deep bg-background text-2xl font-bold text-primary disabled:opacity-40"
            >
              A+
            </button>
          </div>
        </div>

        <nav aria-label="Menu principal" className="flex flex-wrap gap-3">
          {[
            { to: "/", texto: "Início", icone: "🏠" },
            { to: "/despensa", texto: "O que tenho em casa", icone: "🧺" },
            { to: "/dicas", texto: "Dicas de conservação", icone: "💡" },
            { to: "/comunidade", texto: "Comunidade", icone: "💬" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground border-primary" }}
              className="flex min-h-14 items-center gap-2 rounded-2xl border-2 border-leaf-deep px-4 py-2 text-lg font-bold"
            >
              <span aria-hidden="true">{item.icone}</span>
              {item.texto}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-leaf-darkest bg-card">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-base text-muted-foreground">
        <p className="text-lg text-foreground">
          Biblioteca de Receitas — tradição, experiência e sabor em cada receita.
        </p>
        <p className="mt-2">
          Aqui a gente cozinha aproveitando tudo: cascas, talos, sementes e as sobras de ontem.
        </p>
      </div>
    </footer>
  );
}
