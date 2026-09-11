import { supabase } from "@/integrations/supabase/client";

export type Publicacao = {
  id: string;
  autor: string;
  tipo: string;
  titulo: string;
  texto: string;
  created_at: string;
};

export type Comentario = {
  id: string;
  publicacao_id: string;
  autor: string;
  texto: string;
  created_at: string;
};

export type Curtida = {
  publicacao_id: string;
  visitante: string;
};

const VISITANTE_KEY = "meu-codigo-de-visitante";

export function meuCodigoDeVisitante(): string {
  if (typeof window === "undefined") return "servidor-sem-visitante";
  let codigo = window.localStorage.getItem(VISITANTE_KEY);
  if (!codigo) {
    codigo = crypto.randomUUID();
    window.localStorage.setItem(VISITANTE_KEY, codigo);
  }
  return codigo;
}

export async function buscarMural() {
  const [pubs, coms, curt] = await Promise.all([
    supabase.from("publicacoes").select("*").order("created_at", { ascending: false }),
    supabase.from("comentarios").select("*").order("created_at", { ascending: true }),
    supabase.from("curtidas").select("publicacao_id, visitante"),
  ]);

  if (pubs.error) throw pubs.error;
  if (coms.error) throw coms.error;
  if (curt.error) throw curt.error;

  return {
    publicacoes: (pubs.data ?? []) as Publicacao[],
    comentarios: (coms.data ?? []) as Comentario[],
    curtidas: (curt.data ?? []) as Curtida[],
  };
}

export async function publicar(entrada: {
  autor: string;
  tipo: string;
  titulo: string;
  texto: string;
}) {
  const { error } = await supabase.from("publicacoes").insert(entrada);
  if (error) throw error;
}

export async function comentar(entrada: {
  publicacao_id: string;
  autor: string;
  texto: string;
}) {
  const { error } = await supabase.from("comentarios").insert(entrada);
  if (error) throw error;
}

export async function alternarCurtida(publicacaoId: string, jaCurtiu: boolean) {
  const visitante = meuCodigoDeVisitante();
  if (jaCurtiu) {
    const { error } = await supabase
      .from("curtidas")
      .delete()
      .eq("publicacao_id", publicacaoId)
      .eq("visitante", visitante);
    if (error) throw error;
    return;
  }
  const { error } = await supabase
    .from("curtidas")
    .insert({ publicacao_id: publicacaoId, visitante });
  if (error) throw error;
}
