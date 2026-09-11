export type Ingredient = {
  id: string;
  nome: string;
  emoji: string;
};

export const ingredientes: Ingredient[] = [
  { id: "arroz", nome: "Sobra de arroz", emoji: "🍚" },
  { id: "pao", nome: "Pão amanhecido", emoji: "🍞" },
  { id: "feijao", nome: "Sobra de feijão", emoji: "🫘" },
  { id: "banana", nome: "Banana madura (e a casca)", emoji: "🍌" },
  { id: "cenoura", nome: "Cenoura (e as folhas)", emoji: "🥕" },
  { id: "batata", nome: "Batata (e a casca)", emoji: "🥔" },
  { id: "abobrinha", nome: "Abobrinha murcha", emoji: "🥒" },
  { id: "couve", nome: "Couve com talos", emoji: "🥬" },
  { id: "tomate", nome: "Tomate bem maduro", emoji: "🍅" },
  { id: "cebola", nome: "Cebola", emoji: "🧅" },
  { id: "alho", nome: "Alho", emoji: "🧄" },
  { id: "ovo", nome: "Ovo", emoji: "🥚" },
  { id: "leite", nome: "Leite", emoji: "🥛" },
  { id: "queijo", nome: "Pedaço de queijo", emoji: "🧀" },
  { id: "farinha", nome: "Farinha de trigo", emoji: "🌾" },
  { id: "abobora", nome: "Abóbora (com casca e semente)", emoji: "🎃" },
  { id: "macarrao", nome: "Sobra de macarrão", emoji: "🍝" },
  { id: "frango", nome: "Sobra de frango cozido", emoji: "🍗" },
];

export type Recipe = {
  id: string;
  nome: string;
  emoji: string;
  resumo: string;
  tempo: string;
  porcoes: string;
  usa: string[];
  ingredientes: string[];
  passos: string[];
};

export const receitas: Recipe[] = [
  {
    id: "bolinho-de-arroz",
    nome: "Bolinho de arroz da vovó",
    emoji: "🍙",
    resumo: "Aquela sobra de arroz da geladeira virando bolinho dourado e crocante.",
    tempo: "30 minutos",
    porcoes: "10 bolinhos",
    usa: ["arroz", "ovo", "queijo", "farinha", "cebola"],
    ingredientes: [
      "2 xícaras de arroz cozido (pode ser de ontem)",
      "1 ovo",
      "3 colheres de farinha de trigo",
      "1 pedaço de queijo picado",
      "Meia cebola bem picadinha",
      "Sal e cheiro-verde a gosto",
      "Óleo para fritar",
    ],
    passos: [
      "Coloque o arroz cozido numa vasilha grande e amasse um pouco com o garfo.",
      "Junte o ovo, a farinha, o queijo, a cebola, o sal e o cheiro-verde.",
      "Misture com a mão até virar uma massa que dá para enrolar. Se estiver mole, ponha mais um pouco de farinha.",
      "Faça bolinhas do tamanho de uma noz.",
      "Aqueça o óleo em fogo médio e frite poucos bolinhos por vez, até ficarem dourados.",
      "Retire com escumadeira e deixe descansar num prato com papel toalha. Sirva quentinho.",
    ],
  },
  {
    id: "torta-de-pao-amanhecido",
    nome: "Rabanada salgada de pão amanhecido",
    emoji: "🥖",
    resumo: "Pão duro nunca é lixo: fica macio por dentro e crocante por fora.",
    tempo: "25 minutos",
    porcoes: "4 pessoas",
    usa: ["pao", "ovo", "leite", "queijo"],
    ingredientes: [
      "4 pães amanhecidos cortados em fatias grossas",
      "2 ovos",
      "1 copo de leite",
      "Queijo ralado",
      "Sal, pimenta e orégano a gosto",
    ],
    passos: [
      "Bata os ovos com o leite, o sal, a pimenta e o orégano numa vasilha funda.",
      "Passe cada fatia de pão nessa mistura, deixando molhar bem dos dois lados.",
      "Coloque as fatias numa frigideira antiaderente quente com um fiozinho de óleo.",
      "Doure de um lado, vire com cuidado e doure do outro.",
      "Salpique queijo ralado por cima, tampe por 1 minuto para derreter e sirva.",
    ],
  },
  {
    id: "sopa-de-talos-e-cascas",
    nome: "Sopa de talos, folhas e cascas",
    emoji: "🍲",
    resumo: "Tudo que costuma ir para o lixo vira um caldo cheiroso e nutritivo.",
    tempo: "40 minutos",
    porcoes: "4 pessoas",
    usa: ["couve", "cenoura", "batata", "cebola", "alho", "abobrinha"],
    ingredientes: [
      "Talos de couve e folhas de cenoura bem lavados",
      "Cascas de batata e de cenoura lavadas",
      "1 abobrinha murcha picada",
      "1 cebola e 2 dentes de alho",
      "1,5 litro de água",
      "Sal e azeite a gosto",
    ],
    passos: [
      "Lave muito bem todos os talos, folhas e cascas em água corrente.",
      "Numa panela grande, doure a cebola e o alho no azeite.",
      "Junte os talos, as cascas e a abobrinha e mexa por 2 minutos.",
      "Coloque a água, tampe e cozinhe em fogo baixo por 25 minutos.",
      "Bata no liquidificador (com cuidado, morno) até ficar cremoso e volte à panela.",
      "Acerte o sal, aqueça de novo e sirva com um fio de azeite.",
    ],
  },
  {
    id: "bolo-de-casca-de-banana",
    nome: "Bolo de banana com casca",
    emoji: "🍌",
    resumo: "A casca da banana vira um bolo úmido e docinho, sem desperdício nenhum.",
    tempo: "50 minutos",
    porcoes: "8 pedaços",
    usa: ["banana", "ovo", "farinha", "leite"],
    ingredientes: [
      "3 bananas maduras com as cascas bem lavadas",
      "2 ovos",
      "1 copo de açúcar",
      "2 copos de farinha de trigo",
      "Meio copo de óleo",
      "Meio copo de leite",
      "1 colher de sopa de pó royal (fermento)",
      "Canela a gosto",
    ],
    passos: [
      "Lave as bananas com casca, corte em pedaços e coloque no liquidificador.",
      "Junte os ovos, o óleo, o leite e o açúcar e bata bem até ficar liso.",
      "Passe para uma vasilha e misture a farinha com uma colher.",
      "Por último acrescente o fermento, mexendo devagar.",
      "Ponha numa forma untada, salpique canela e leve ao forno médio por 35 a 40 minutos.",
      "Espete um garfo no meio: se sair limpo, o bolo está pronto.",
    ],
  },
  {
    id: "bolinho-de-feijao",
    nome: "Bolinho de feijão temperado",
    emoji: "🫘",
    resumo: "O feijão que sobrou do almoço vira petisco para o jantar.",
    tempo: "35 minutos",
    porcoes: "12 bolinhos",
    usa: ["feijao", "farinha", "ovo", "cebola", "alho"],
    ingredientes: [
      "2 xícaras de feijão cozido (com pouco caldo)",
      "1 ovo",
      "Farinha de trigo até dar liga",
      "Meia cebola e 1 dente de alho picados",
      "Sal, cheiro-verde e pimenta a gosto",
    ],
    passos: [
      "Amasse o feijão com um garfo ou passe no liquidificador rapidinho.",
      "Misture o ovo, a cebola, o alho e os temperos.",
      "Vá colocando farinha aos poucos até a massa desgrudar da mão.",
      "Modele os bolinhos com a ajuda de duas colheres.",
      "Frite em óleo quente ou asse em forno médio por 25 minutos, virando na metade.",
    ],
  },
  {
    id: "omelete-de-sobras",
    nome: "Omelete de sobras da geladeira",
    emoji: "🍳",
    resumo: "Um jeito rápido de aproveitar quase tudo que ficou guardado.",
    tempo: "15 minutos",
    porcoes: "2 pessoas",
    usa: ["ovo", "queijo", "frango", "macarrao", "tomate", "couve"],
    ingredientes: [
      "3 ovos",
      "Sobras picadas: frango, macarrão, legumes, couve ou queijo",
      "Sal e pimenta a gosto",
      "Um fio de óleo ou azeite",
    ],
    passos: [
      "Bata os ovos com sal e pimenta usando um garfo.",
      "Pique bem pequenininho tudo que você vai aproveitar.",
      "Aqueça a frigideira com o fio de óleo em fogo baixo.",
      "Espalhe as sobras na frigideira e depois cubra com os ovos batidos.",
      "Deixe firmar por uns 4 minutos, dobre ao meio e sirva.",
    ],
  },
  {
    id: "doce-de-casca-de-abobora",
    nome: "Doce de casca de abóbora",
    emoji: "🎃",
    resumo: "A casca da abóbora rende um doce cheiroso com cravo e canela.",
    tempo: "1 hora",
    porcoes: "6 porções",
    usa: ["abobora"],
    ingredientes: [
      "Cascas de 1 abóbora bem lavadas e picadas",
      "1 copo de açúcar",
      "1 copo de água",
      "Cravo e canela em pau",
    ],
    passos: [
      "Lave as cascas com escovinha e corte em tiras pequenas.",
      "Coloque numa panela com a água, o açúcar, o cravo e a canela.",
      "Cozinhe em fogo baixo, mexendo de vez em quando, por cerca de 40 minutos.",
      "Quando a calda engrossar e as cascas ficarem transparentes, está pronto.",
      "Deixe esfriar e guarde num pote fechado na geladeira.",
    ],
  },
  {
    id: "escondidinho-de-sobras",
    nome: "Escondidinho de batata com sobras",
    emoji: "🥔",
    resumo: "Purê por cima, sobras por baixo: prato completo e barato.",
    tempo: "45 minutos",
    porcoes: "4 pessoas",
    usa: ["batata", "frango", "leite", "queijo", "cebola"],
    ingredientes: [
      "5 batatas cozidas e amassadas",
      "Meio copo de leite",
      "Sobra de frango ou carne desfiada",
      "1 cebola picada",
      "Queijo ralado, sal e pimenta",
    ],
    passos: [
      "Amasse as batatas ainda quentes com o leite e o sal até formar um purê.",
      "Refogue a cebola e junte a carne ou o frango desfiado, temperando bem.",
      "Espalhe o refogado no fundo de um refratário.",
      "Cubra com o purê e alise com as costas da colher.",
      "Salpique queijo e leve ao forno quente por 20 minutos, até dourar.",
    ],
  },
  {
    id: "molho-de-tomate-maduro",
    nome: "Molho de tomate bem maduro",
    emoji: "🍅",
    resumo: "Tomates passando do ponto rendem um molho caseiro que dura dias.",
    tempo: "35 minutos",
    porcoes: "1 pote",
    usa: ["tomate", "cebola", "alho"],
    ingredientes: [
      "6 tomates bem maduros picados",
      "1 cebola e 3 dentes de alho",
      "Azeite, sal, açúcar e manjericão",
    ],
    passos: [
      "Doure a cebola e o alho no azeite em fogo baixo.",
      "Junte os tomates picados e uma pitada de sal.",
      "Tampe e cozinhe por 20 minutos, mexendo às vezes.",
      "Coloque uma pitadinha de açúcar para tirar a acidez e finalize com manjericão.",
      "Guarde em pote de vidro na geladeira por até 5 dias, ou congele em porções.",
    ],
  },
  {
    id: "macarrao-na-chapa",
    nome: "Macarrão na chapa crocante",
    emoji: "🍝",
    resumo: "A sobra de macarrão vira uma casquinha dourada que as crianças adoram.",
    tempo: "20 minutos",
    porcoes: "2 pessoas",
    usa: ["macarrao", "ovo", "queijo"],
    ingredientes: [
      "2 xícaras de macarrão cozido",
      "1 ovo",
      "Queijo ralado",
      "Sal e pimenta a gosto",
    ],
    passos: [
      "Misture o macarrão com o ovo batido, o queijo e os temperos.",
      "Aqueça uma frigideira com um fio de óleo.",
      "Espalhe a mistura e aperte com a espátula para formar um disco.",
      "Deixe dourar bem uns 6 minutos, vire com ajuda de um prato e doure do outro lado.",
      "Corte em fatias como uma pizza e sirva.",
    ],
  },
];

export type Dica = {
  id: string;
  titulo: string;
  emoji: string;
  texto: string;
};

export const dicas: Dica[] = [
  {
    id: "verduras-murchas",
    titulo: "Verdura murcha volta a ficar firme",
    emoji: "🥬",
    texto:
      "Coloque as folhas murchas numa bacia com água bem fria e um punhado de gelo por 15 minutos. Elas voltam a ficar firmes e boas para salada.",
  },
  {
    id: "talos",
    titulo: "Talos rendem refogado e caldo",
    emoji: "🌿",
    texto:
      "Talos de couve, brócolis e salsinha podem ser picadinhos e refogados com alho, ou guardados no congelador para fazer caldo de legumes.",
  },
  {
    id: "cascas",
    titulo: "Cascas bem lavadas são comida",
    emoji: "🥕",
    texto:
      "Lave as cascas com escovinha em água corrente. Elas viram farofa assada, chips no forno, doce ou caldo. Só evite cascas de batata brotada ou esverdeada.",
  },
  {
    id: "sementes",
    titulo: "Sementes tostadas no forno",
    emoji: "🎃",
    texto:
      "Sementes de abóbora ou melão: lave, seque bem, tempere com sal e asse em forno médio por 20 minutos. Fica um petisco crocante.",
  },
  {
    id: "geladeira",
    titulo: "Cada coisa no seu lugar na geladeira",
    emoji: "🧊",
    texto:
      "Guarde folhas em potes fechados com um papel toalha dentro, para absorver a umidade. Deixe o que vence primeiro sempre na frente, na altura dos olhos.",
  },
  {
    id: "congelar",
    titulo: "Congelar em porções pequenas",
    emoji: "❄️",
    texto:
      "Congele arroz, feijão, caldos e molhos em potes pequenos, com a data escrita numa fita. Assim você tira só o que vai usar e nada estraga.",
  },
  {
    id: "pao-duro",
    titulo: "Pão duro tem três destinos",
    emoji: "🍞",
    texto:
      "Farinha de rosca no ralador, torradinhas no forno com azeite, ou pudim de pão com leite e canela. Nenhum pão precisa ir para o lixo.",
  },
  {
    id: "frutas-passando",
    titulo: "Fruta passando do ponto",
    emoji: "🍌",
    texto:
      "Banana, mamão e maçã muito maduros podem ser congelados em pedaços para vitamina, ou virar bolo, geleia e compota no mesmo dia.",
  },
];

export function receitasParaSelecao(selecionados: string[]): Recipe[] {
  if (selecionados.length === 0) return [];
  return receitas
    .map((r) => ({
      receita: r,
      acertos: r.usa.filter((u) => selecionados.includes(u)).length,
    }))
    .filter((x) => x.acertos > 0)
    .sort((a, b) => b.acertos - a.acertos)
    .map((x) => x.receita);
}
