import { Food } from "../types";

export const initialFoods: Food[] = [
  {
    id: "banana",
    name: "Banana",
    scientificName: "Musa acuminata",
    category: "Fruta",
    family: "Musaceae",
    origin: "Sudeste Asiático",
    countryOfOrigin: "Índia / Filipinas",
    season: "Ano inteiro",
    description: "Uma das frutas mais populares do mundo, conhecida pelo seu alto teor de potássio, facilidade de consumo e sabor doce característico. É uma excelente fonte de energia de rápida absorção, ideal para atletas e pessoas fisicamente ativas.",
    curiosities: [
      "A bananeira não é uma árvore, mas sim uma erva gigante de crescimento rápido.",
      "As bananas são levemente radioativas devido ao potássio-40 que contêm, mas em níveis totalmente inofensivos.",
      "A casca de banana pode ser usada para polir sapatos de couro e folhas de plantas."
    ],
    nutrients: {
      calories: 89,
      water: 74.9,
      protein: 1.1,
      carbs: 22.8,
      fats: 0.3,
      saturatedFats: 0.1,
      unsaturatedFats: 0.1,
      fiber: 2.6,
      sugars: 12.2,
      cholesterol: 0,
      glycemicIndex: 51,
      glycemicLoad: 11
    },
    vitamins: [
      { name: "Vitamina C", amount: 8.7, unit: "mg", dailyValuePercentage: 10 },
      { name: "Vitamina B6", amount: 0.4, unit: "mg", dailyValuePercentage: 31 },
      { name: "Vitamina B3", amount: 0.7, unit: "mg", dailyValuePercentage: 4 },
      { name: "Vitamina B5", amount: 0.3, unit: "mg", dailyValuePercentage: 6 },
      { name: "Vitamina B9 (Ácido Fólico)", amount: 20, unit: "µg", dailyValuePercentage: 5 },
      { name: "Vitamina A", amount: 3, unit: "µg", dailyValuePercentage: 0.3 },
      { name: "Vitamina E", amount: 0.1, unit: "mg", dailyValuePercentage: 1 }
    ],
    minerals: [
      { name: "Potássio", amount: 358, unit: "mg", dailyValuePercentage: 10 },
      { name: "Magnésio", amount: 27, unit: "mg", dailyValuePercentage: 7 },
      { name: "Manganês", amount: 0.27, unit: "mg", dailyValuePercentage: 12 },
      { name: "Cobre", amount: 0.08, unit: "mg", dailyValuePercentage: 9 },
      { name: "Ferro", amount: 0.26, unit: "mg", dailyValuePercentage: 2 },
      { name: "Fósforo", amount: 22, unit: "mg", dailyValuePercentage: 3 },
      { name: "Cálcio", amount: 5, unit: "mg", dailyValuePercentage: 0.5 },
      { name: "Sódio", amount: 1, unit: "mg", dailyValuePercentage: 0.1 }
    ],
    bioactives: [
      { name: "Dopamina", description: "Atua como um potente antioxidante na banana, em vez de alterar o humor diretamente." },
      { name: "Catequinas", description: "Polifenóis que ajudam a reduzir o risco de doenças cardíacas." },
      { name: "Luteína", description: "Carotenoide que apoia a saúde ocular e protege contra a degeneração macular." }
    ],
    benefits: {
      heart: "O alto teor de potássio e baixo sódio ajudam a regular a pressão arterial e reduzem o risco de AVC.",
      brain: "A vitamina B6 apoia a produção de neurotransmissores como serotonina e dopamina, melhorando o humor.",
      memory: "Contribui para a concentração graças à libertação constante de energia.",
      vision: "Contém antioxidantes e vitamina A que ajudam a preservar a saúde ocular.",
      bones: "O magnésio e o potássio promovem a densidade óssea prevenindo a perda de cálcio pela urina.",
      muscles: "Ajuda a prevenir cãibras musculares e fadiga durante e após treinos intensos.",
      digestion: "Fácil de digerir, ajuda a acalmar o trato gastrointestinal e repõe eletrólitos perdidos.",
      intestine: "Rica em fibras solúveis e amido resistente que alimentam as bactérias benéficas do intestino.",
      immunity: "A vitamina C apoia o sistema imunológico ao estimular a produção de glóbulos brancos."
    },
    contraindications: {
      general: "Consumo seguro para a maioria das pessoas, devendo ser moderado em dietas restritivas em carboidratos ou potássio.",
      whoShouldAvoid: "Indivíduos com insuficiência renal crónica avançada devido à dificuldade de excretar potássio excessivo.",
      allergies: "Alergias à banana são raras, mas frequentemente associadas à síndrome da alergia ao látex-fruta.",
      drugInteractions: "Pode interagir com medicamentos bloqueadores beta ou inibidores da ECA (antitensores), que já elevam o potássio plasmático.",
      maxRecommendedAmount: "1 a 2 bananas de tamanho médio por dia são perfeitamente adequadas para uma pessoa saudável.",
      possibleRisks: "Consumo excessivo extremo de potássio pode teoreticamente causar hipercalemia, embora seja quase impossível apenas comendo fruta."
    },
    recipes: [
      {
        id: "rec_banana_panqueca",
        name: "Panquecas Saudáveis de Banana e Aveia",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "1 banana madura de tamanho médio",
          "1 ovo inteiro",
          "4 colheres de sopa de farelo de aveia",
          "1 pitada de canela em pó",
          "Óleo de coco para untar a frigideira"
        ],
        steps: [
          "Esmague a banana completamente com um garfo num prato fundo.",
          "Adicione o ovo e bata bem até obter uma mistura homogénea.",
          "Incorpore a aveia e a canela, mexendo até que toda a farinha esteja integrada.",
          "Aqueça uma frigideira antiaderente untada com um pouco de óleo de coco em fogo médio.",
          "Coloque porções da massa, cozinhe por 2 minutos até formar bolhas e depois vire para dourar o outro lado."
        ],
        time: 15,
        difficulty: "Fácil",
        calories: 250,
        nutrients: { calories: 250, protein: 10, carbs: 42, fat: 6, fiber: 5.5 }
      }
    ]
  },
  {
    id: "maca",
    name: "Maçã",
    scientificName: "Malus domestica",
    category: "Fruta",
    family: "Rosaceae",
    origin: "Ásia Central",
    countryOfOrigin: "Cazaquistão",
    season: "Ano inteiro (pico no outono)",
    description: "Conhecida pelo ditado popular 'uma maçã por dia mantém o médico afastado', esta fruta é incrivelmente rica em fibras solúveis (como pectina) e polifenóis que promovem a saúde digestiva e cardiovascular.",
    curiosities: [
      "As maçãs flutuam na água porque 25% do seu volume é constituído por ar.",
      "Existem mais de 7.500 variedades conhecidas de maçãs cultivadas no mundo.",
      "A macieira leva em média 4 a 5 anos para produzir as suas primeiras frutas."
    ],
    nutrients: {
      calories: 52,
      water: 85.6,
      protein: 0.3,
      carbs: 13.8,
      fats: 0.2,
      saturatedFats: 0.05,
      unsaturatedFats: 0.1,
      fiber: 2.4,
      sugars: 10.4,
      cholesterol: 0,
      glycemicIndex: 38,
      glycemicLoad: 5
    },
    vitamins: [
      { name: "Vitamina C", amount: 4.6, unit: "mg", dailyValuePercentage: 5 },
      { name: "Vitamina B6", amount: 0.04, unit: "mg", dailyValuePercentage: 3 },
      { name: "Vitamina B1", amount: 0.02, unit: "mg", dailyValuePercentage: 2 },
      { name: "Vitamina B2", amount: 0.03, unit: "mg", dailyValuePercentage: 2 },
      { name: "Vitamina B9", amount: 3, unit: "µg", dailyValuePercentage: 1 },
      { name: "Vitamina A", amount: 3, unit: "µg", dailyValuePercentage: 0.3 },
      { name: "Vitamina E", amount: 0.18, unit: "mg", dailyValuePercentage: 1 },
      { name: "Vitamina K", amount: 2.2, unit: "µg", dailyValuePercentage: 2 }
    ],
    minerals: [
      { name: "Potássio", amount: 107, unit: "mg", dailyValuePercentage: 3 },
      { name: "Fósforo", amount: 11, unit: "mg", dailyValuePercentage: 2 },
      { name: "Cálcio", amount: 6, unit: "mg", dailyValuePercentage: 0.6 },
      { name: "Magnésio", amount: 5, unit: "mg", dailyValuePercentage: 1 },
      { name: "Ferro", amount: 0.12, unit: "mg", dailyValuePercentage: 1 },
      { name: "Zinco", amount: 0.04, unit: "mg", dailyValuePercentage: 0.4 },
      { name: "Sódio", amount: 1, unit: "mg", dailyValuePercentage: 0.1 }
    ],
    bioactives: [
      { name: "Pectina", description: "Fibra solúvel que atua como prebiótico e ajuda a reduzir o colesterol sanguíneo." },
      { name: "Quercetina", description: "Flavonoide antioxidante com efeitos anti-inflamatórios e cardioprotetores." },
      { name: "Floridzina", description: "Polifenol exclusivo da maçã que pode ajudar a melhorar a sensibilidade à insulina." }
    ],
    benefits: {
      heart: "A combinação de fibras solúveis e polifenóis ajuda a diminuir os níveis de colesterol LDL.",
      brain: "A quercetina protege as células cerebrais contra danos oxidativos associados à demência.",
      intestine: "A pectina serve de alimento para as bactérias saudáveis do cólon, melhorando a microbiota.",
      digestion: "Ajuda a regular o trânsito intestinal, combatendo tanto a diarreia quanto a obstipação (quando consumida com casca).",
      blood: "Possui baixo índice glicémico, libertando açúcar no sangue de forma lenta e estável.",
      weight: "Altamente saciante devido ao teor de água e fibras, auxiliando em planos de emagrecimento.",
      immunity: "Os antioxidantes protegem as células contra mutações e inflamações crónicas."
    },
    contraindications: {
      general: "Consumo extremamente seguro para crianças e adultos.",
      whoShouldAvoid: "Pessoas com síndrome do intestino irritável (SII) podem precisar de limitar o consumo devido ao teor de FODMAPs (frutose).",
      allergies: "Síndrome de alergia oral associada ao pólen de bétula pode causar comichão na boca ao comer maçã crua.",
      drugInteractions: "Nenhuma interação medicamentosa severa documentada.",
      maxRecommendedAmount: "1 a 3 unidades de tamanho médio por dia.",
      possibleRisks: "Engolir sementes de maçã em quantidades astronómicas pode ser tóxico devido à presença de amigdalina (precursor de cianeto), mas consumir algumas acidentalmente é inofensivo."
    },
    recipes: [
      {
        id: "rec_maca_assada",
        name: "Maçãs Assadas com Canela e Nozes",
        image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "2 maçãs vermelhas (Fuji ou Gala)",
          "1 colher de chá de canela em pó",
          "4 nozes picadas",
          "1 colher de sobremesa de mel (opcional)"
        ],
        steps: [
          "Pré-aqueça o forno a 180°C.",
          "Lave bem as maçãs e remova a parte central (sementes) usando uma faca ou descaroçador, deixando o fundo intacto.",
          "Coloque as maçãs num refratário médio.",
          "Preencha a cavidade com as nozes picadas, polvilhe a canela por cima e regue com o mel.",
          "Asse por 25 a 30 minutos até que as maçãs estejam macias ao espetar com um garfo."
        ],
        time: 35,
        difficulty: "Fácil",
        calories: 140,
        nutrients: { calories: 140, protein: 1.5, carbs: 24, fat: 5, fiber: 4 }
      }
    ]
  },
  {
    id: "funge_bombo",
    name: "Funge de Bombo",
    scientificName: "Manihot esculenta (preparado)",
    category: "Angolano",
    family: "Euphorbiaceae (farinha base)",
    origin: "Angola",
    countryOfOrigin: "Angola",
    season: "Ano inteiro",
    description: "O acompanhamento mais tradicional da culinária de Angola. É uma papa consistente de consistência elástica e suave, feita à base de fuba de bombo (farinha de mandioca seca e fermentada). É um alimento altamente energético, isento de glúten e que constitui a base alimentar de milhões de angolanos.",
    curiosities: [
      "O termo 'bombo' refere-se à raiz de mandioca que sofreu um processo de fermentação na água antes de ser seca e moída.",
      "Bater o funge exige grande força física e técnica, usando um utensílio tradicional chamado 'colher de funge' ou 'batedor'.",
      "É tradicionalmente consumido quente e sem mastigar, engolindo-se pequenas bolas acompanhadas com molhos ricos."
    ],
    nutrients: {
      calories: 135,
      water: 64.2,
      protein: 0.6,
      carbs: 32.5,
      fats: 0.1,
      saturatedFats: 0,
      unsaturatedFats: 0,
      fiber: 1.8,
      sugars: 0.3,
      cholesterol: 0,
      glycemicIndex: 85,
      glycemicLoad: 27
    },
    vitamins: [
      { name: "Vitamina B1", amount: 0.05, unit: "mg", dailyValuePercentage: 4 },
      { name: "Vitamina B2", amount: 0.02, unit: "mg", dailyValuePercentage: 1 },
      { name: "Vitamina B3", amount: 0.3, unit: "mg", dailyValuePercentage: 2 },
      { name: "Vitamina B6", amount: 0.04, unit: "mg", dailyValuePercentage: 3 },
      { name: "Vitamina C", amount: 2.1, unit: "mg", dailyValuePercentage: 2 },
      { name: "Vitamina B9", amount: 4, unit: "µg", dailyValuePercentage: 1 }
    ],
    minerals: [
      { name: "Cálcio", amount: 16, unit: "mg", dailyValuePercentage: 1.6 },
      { name: "Fósforo", amount: 21, unit: "mg", dailyValuePercentage: 3 },
      { name: "Potássio", amount: 92, unit: "mg", dailyValuePercentage: 2 },
      { name: "Magnésio", amount: 12, unit: "mg", dailyValuePercentage: 3 },
      { name: "Sódio", amount: 3, unit: "mg", dailyValuePercentage: 0.1 },
      { name: "Ferro", amount: 0.4, unit: "mg", dailyValuePercentage: 3 },
      { name: "Zinco", amount: 0.12, unit: "mg", dailyValuePercentage: 1 }
    ],
    bioactives: [
      { name: "Amido Resistente", description: "Amido que resiste à digestão, atuando como fibra prebiótica alimentando as bactérias saudáveis do cólon." }
    ],
    benefits: {
      muscles: "Excelente fonte de carboidratos complexos de libertação energética contínua, ideal para trabalho físico.",
      digestion: "Livre de glúten e de digestibilidade suave, excelente para pessoas com doença celíaca ou estômagos sensíveis.",
      intestine: "Ajuda a dar volume às fezes e apoia a integridade da barreira intestinal.",
      bones: "Apresenta minerais vestigiais como cálcio e fósforo que suportam a matriz óssea."
    },
    contraindications: {
      general: "Por ser muito rico em carboidratos e de elevado índice glicémico, o consumo deve ser equilibrado.",
      whoShouldAvoid: "Diabéticos tipo 2 devem controlar rigorosamente as porções devido ao rápido impacto na glicemia plasmática.",
      allergies: "Alergias à mandioca são extremamente raras.",
      drugInteractions: "Nenhuma interação medicamentosa direta conhecida.",
      maxRecommendedAmount: "Cerca de 150g a 200g por refeição principal, acompanhado de vegetais e proteínas.",
      possibleRisks: "Mandioca mal cozida ou mal processada pode reter compostos cianogénicos, mas a fuba comercial de bombo passa por lavagem e secagem que removem totalmente qualquer toxicidade."
    },
    recipes: [
      {
        id: "rec_funge_tradicional",
        name: "Funge de Bombo Tradicional Angolano",
        image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "500g de fuba de bombo (farinha de mandioca)",
          "1.5 litros de água limpa",
          "1 pitada de sal (opcional, tradicionalmente não leva)"
        ],
        steps: [
          "Coloque 1 litro de água para ferver numa panela grande em fogo alto.",
          "Entretanto, dissolva cerca de 1 chávena de fuba na água fria restante para evitar grumos.",
          "Assim que a água ferver, verta a fuba dissolvida mexendo vigorosamente com o batedor.",
          "Vá deitando a restante fuba aos poucos, em chuva, mexendo sempre sem parar para não empedrar.",
          "Reduza o fogo e use a colher de funge para 'bater' a massa contra as paredes da panela com movimentos fortes e circulares.",
          "Deixe cozinhar por cerca de 10 a 15 minutos até que fique com um aspeto translúcido e brilhante, continuando a bater periodicamente.",
          "Molhe uma tigela com água fria, deite porções de funge dentro e agite a tigela para formar bolas lisas e brilhantes."
        ],
        time: 25,
        difficulty: "Médio",
        calories: 320,
        nutrients: { calories: 320, protein: 1.2, carbs: 78, fat: 0.2, fiber: 4 }
      }
    ]
  },
  {
    id: "kizaka",
    name: "Kizaka",
    scientificName: "Manihot esculenta (folhas)",
    category: "Angolano",
    family: "Euphorbiaceae",
    origin: "Angola",
    countryOfOrigin: "Angola",
    season: "Ano inteiro",
    description: "Prato nacional angolano delicioso feito à base de folhas novas de mandioca esmagadas, cozidas lentamente e temperadas com pasta de amendoim moído e óleo de palma. É um alimento extraordinariamente rico em ferro, fibras, proteínas de origem vegetal e antioxidantes.",
    curiosities: [
      "A kizaka também é chamada de sakasaka ou folhas de mandioca em outras regiões da África Central.",
      "As folhas de mandioca contêm muito mais proteína que a própria raiz da mandioca.",
      "O uso do óleo de palma vermelho tradicional fornece uma quantidade massiva de pró-vitamina A."
    ],
    nutrients: {
      calories: 180,
      water: 72,
      protein: 4.8,
      carbs: 11.2,
      fats: 13.5,
      saturatedFats: 3.2,
      unsaturatedFats: 9.8,
      fiber: 4.2,
      sugars: 1.1,
      cholesterol: 0,
      glycemicIndex: 30,
      glycemicLoad: 3
    },
    vitamins: [
      { name: "Vitamina A", amount: 480, unit: "µg", dailyValuePercentage: 60 },
      { name: "Vitamina C", amount: 32, unit: "mg", dailyValuePercentage: 35 },
      { name: "Vitamina E", amount: 2.4, unit: "mg", dailyValuePercentage: 16 },
      { name: "Vitamina B1", amount: 0.12, unit: "mg", dailyValuePercentage: 10 },
      { name: "Vitamina B2", amount: 0.18, unit: "mg", dailyValuePercentage: 14 },
      { name: "Vitamina B9", amount: 65, unit: "µg", dailyValuePercentage: 16 }
    ],
    minerals: [
      { name: "Ferro", amount: 3.4, unit: "mg", dailyValuePercentage: 19 },
      { name: "Cálcio", amount: 144, unit: "mg", dailyValuePercentage: 14 },
      { name: "Magnésio", amount: 54, unit: "mg", dailyValuePercentage: 14 },
      { name: "Fósforo", amount: 68, unit: "mg", dailyValuePercentage: 10 },
      { name: "Potássio", amount: 310, unit: "mg", dailyValuePercentage: 9 },
      { name: "Zinco", amount: 0.8, unit: "mg", dailyValuePercentage: 7 }
    ],
    bioactives: [
      { name: "Beta-caroteno", description: "Poderoso antioxidante precursor da vitamina A que apoia a visão e imunidade." },
      { name: "Polifenóis", description: "Antioxidantes vegetais que neutralizam radicais livres e reduzem inflamações." }
    ],
    benefits: {
      immunity: "A fantástica quantidade de vitamina A e vitamina C estimula as defesas naturais do corpo contra infeções.",
      blood: "O excelente teor de ferro vegetal, associado à vitamina C, auxilia na prevenção da anemia ferropriva.",
      vision: "O beta-caroteno é crucial para manter a saúde da retina e combater a cegueira noturna.",
      intestine: "Rica em fibras alimentares que apoiam o trânsito intestinal e o bem-estar do cólon.",
      skin: "A vitamina E e antioxidantes promovem a regeneração celular e rejuvenescimento cutâneo."
    },
    contraindications: {
      general: "Um prato nutritivo excelente, mas calórico devido à pasta de amendoim e óleo de palma.",
      whoShouldAvoid: "Pessoas com alergia severa a amendoim não devem consumir a receita tradicional com pasta de amendoim.",
      allergies: "Alergia ao amendoim (ingrediente comum no molho da kizaka).",
      drugInteractions: "Nenhuma conhecida relevante.",
      maxRecommendedAmount: "100g a 150g como acompanhamento.",
      possibleRisks: "As folhas cruas contêm glicosídeos cianogénicos, por isso NUNCA devem ser comidas cruas. No entanto, o processo de pisar/esmagar e cozer prolongado elimina estes compostos a 100%."
    },
    recipes: [
      {
        id: "rec_kizaka_tradicional",
        name: "Kizaka com Pasta de Amendoim",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "500g de folhas de mandioca limpas e trituradas (kizaka fresca ou congelada)",
          "1 cebola média picada",
          "2 dentes de alho esmagados",
          "3 colheres de sopa de pasta de amendoim natural (sem açúcar)",
          "2 colheres de sopa de óleo de palma vermelho",
          "Sal a gosto"
        ],
        steps: [
          "Coloque as folhas de mandioca trituradas numa panela com água suficiente para cobri-las e leve a ferver.",
          "Deixe cozinhar por 30 a 40 minutos em fogo médio até que as folhas fiquem macias e percam a cor verde viva inicial.",
          "Noutra panela, aqueça o óleo de palma e refogue a cebola e o alho até dourarem ligeiramente.",
          "Adicione as folhas de mandioca cozidas e escorridas ao refogado.",
          "Dissolva a pasta de amendoim em meia chávena de água morna e adicione à panela, mexendo muito bem.",
          "Tempere com sal, reduza o fogo e deixe apurar por 15 minutos até formar um molho espesso e aveludado."
        ],
        time: 60,
        difficulty: "Médio",
        calories: 290,
        nutrients: { calories: 290, protein: 9.5, carbs: 18, fat: 21, fiber: 7 }
      }
    ]
  },
  {
    id: "mandioca",
    name: "Mandioca",
    scientificName: "Manihot esculenta",
    category: "Legume",
    family: "Euphorbiaceae",
    origin: "América do Sul (altamente cultivada em Angola)",
    countryOfOrigin: "Brasil / Angola",
    season: "Ano inteiro",
    description: "Um tubérculo subterrâneo altamente nutritivo e energético, rico em carboidratos complexos e livre de glúten. É uma das colheitas mais tolerantes à seca, sendo um alimento de subsistência crucial em Angola, consumido cozido, frito, ou transformado em fuba (farinha).",
    curiosities: [
      "A mandioca também é chamada de aipim, macaxeira ou cassava pelo mundo.",
      "Angola é um dos maiores produtores de mandioca do continente africano.",
      "Toda a planta da mandioca é aproveitada: as raízes para comer cozidas ou farinha, e as folhas para fazer a Kizaka."
    ],
    nutrients: {
      calories: 160,
      water: 60.0,
      protein: 1.4,
      carbs: 38.1,
      fats: 0.3,
      saturatedFats: 0.1,
      unsaturatedFats: 0.1,
      fiber: 1.8,
      sugars: 1.7,
      cholesterol: 0,
      glycemicIndex: 46,
      glycemicLoad: 18
    },
    vitamins: [
      { name: "Vitamina C", amount: 20.6, unit: "mg", dailyValuePercentage: 23 },
      { name: "Vitamina B1 (Tiamina)", amount: 0.09, unit: "mg", dailyValuePercentage: 8 },
      { name: "Vitamina B2 (Riboflavina)", amount: 0.05, unit: "mg", dailyValuePercentage: 4 },
      { name: "Vitamina B3 (Niacina)", amount: 0.85, unit: "mg", dailyValuePercentage: 5 },
      { name: "Vitamina B5", amount: 0.11, unit: "mg", dailyValuePercentage: 2 },
      { name: "Vitamina B6", amount: 0.09, unit: "mg", dailyValuePercentage: 7 },
      { name: "Vitamina B9", amount: 27, unit: "µg", dailyValuePercentage: 7 }
    ],
    minerals: [
      { name: "Potássio", amount: 271, unit: "mg", dailyValuePercentage: 8 },
      { name: "Cálcio", amount: 16, unit: "mg", dailyValuePercentage: 1.6 },
      { name: "Magnésio", amount: 21, unit: "mg", dailyValuePercentage: 5 },
      { name: "Fósforo", amount: 27, unit: "mg", dailyValuePercentage: 4 },
      { name: "Sódio", amount: 14, unit: "mg", dailyValuePercentage: 0.6 },
      { name: "Zinco", amount: 0.34, unit: "mg", dailyValuePercentage: 3 },
      { name: "Cobre", amount: 0.1, unit: "mg", dailyValuePercentage: 11 },
      { name: "Manganês", amount: 0.38, unit: "mg", dailyValuePercentage: 17 }
    ],
    bioactives: [
      { name: "Saponinas", description: "Fitoquímicos com propriedades anti-inflamatórias que auxiliam na redução do colesterol." },
      { name: "Fitoesteróis", description: "Compostos vegetais que competem com a absorção do colesterol no intestino." }
    ],
    benefits: {
      muscles: "Fornece energia estável excelente para recarregar o glicogénio muscular de desportistas.",
      digestion: "Não causa inflamação intestinal por ser livre de glúten, tendo digestão lenta e muito limpa.",
      immunity: "Boa concentração de Vitamina C, essencial para combater radicais livres e apoiar células brancas.",
      skin: "A presença de cobre e vitamina C apoia a síntese de colagénio, prevenindo a flacidez e rugas."
    },
    contraindications: {
      general: "Excelente fonte alimentar energética que deve ser bem confecionada.",
      whoShouldAvoid: "Pessoas com dietas de emagrecimento muito estritas devem moderar o tamanho das porções.",
      allergies: "Sem relatos de alergias frequentes.",
      drugInteractions: "Nenhuma conhecida.",
      maxRecommendedAmount: "100g a 150g por refeição principal cozida.",
      possibleRisks: "Nunca consumir mandioca crua. Existem variedades bravas (amargas) com alto teor de ácido cianídrico que necessitam de processos de extração longos. A mandioca mansa (doce) vendida em mercados comuns exige apenas ser descascada e totalmente cozida."
    },
    recipes: [
      {
        id: "rec_mandioca_cozida",
        name: "Mandioca Cozida Salpicada com Ervas",
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "500g de mandioca fresca descascada",
          "1 colher de sopa de azeite extra virgem",
          "1 colher de sopa de coentros frescos picados",
          "Água e sal q.b."
        ],
        steps: [
          "Corte a mandioca descascada em pedaços de cerca de 6-8 cm.",
          "Coloque os pedaços numa panela de pressão ou panela comum, cubra totalmente com água e adicione sal.",
          "Cozinhe na pressão por 15-20 minutos (ou 35-40 minutos na panela normal) até que as fibras estejam macias e abram ligeiramente.",
          "Retire da panela, escorra a água e remova o cordão fibroso central de cada pedaço.",
          "Disponha num prato, regue com o azeite e salpique com os coentros frescos antes de servir quente."
        ],
        time: 25,
        difficulty: "Fácil",
        calories: 180,
        nutrients: { calories: 180, protein: 1.5, carbs: 40, fat: 2.5, fiber: 2 }
      }
    ]
  },
  {
    id: "frango",
    name: "Frango (Peito)",
    scientificName: "Gallus gallus domesticus",
    category: "Carne",
    family: "Phasianidae",
    origin: "Ásia Meridional",
    countryOfOrigin: "Sudeste Asiático",
    season: "Ano inteiro",
    description: "Uma das fontes de proteína animal magra mais populares e eficientes do planeta. O peito de frango sem pele oferece proteína de alto valor biológico com baixíssimo teor de gordura, tornando-se o pilar de dietas desportivas e de perda de peso.",
    curiosities: [
      "Os frangos domésticos descendem principalmente do galo-banquiva (Red Junglefowl) das florestas asiáticas.",
      "O peito é a parte mais magra do frango, enquanto as asas e coxas contêm mais gordura e colagénio.",
      "O consumo de frango cresceu globalmente mais de 300% desde os anos 1960 por ser económico e saudável."
    ],
    nutrients: {
      calories: 165,
      water: 65.3,
      protein: 31.0,
      carbs: 0.0,
      fats: 3.6,
      saturatedFats: 1.0,
      unsaturatedFats: 2.1,
      fiber: 0.0,
      sugars: 0.0,
      cholesterol: 85,
      glycemicIndex: 0,
      glycemicLoad: 0
    },
    vitamins: [
      { name: "Vitamina B3 (Niacina)", amount: 13.7, unit: "mg", dailyValuePercentage: 86 },
      { name: "Vitamina B6", amount: 0.6, unit: "mg", dailyValuePercentage: 46 },
      { name: "Vitamina B5", amount: 0.9, unit: "mg", dailyValuePercentage: 18 },
      { name: "Vitamina B12", amount: 0.3, unit: "µg", dailyValuePercentage: 13 },
      { name: "Vitamina B1", amount: 0.07, unit: "mg", dailyValuePercentage: 6 },
      { name: "Vitamina B2", amount: 0.1, unit: "mg", dailyValuePercentage: 8 },
      { name: "Vitamina E", amount: 0.3, unit: "mg", dailyValuePercentage: 2 }
    ],
    minerals: [
      { name: "Fósforo", amount: 228, unit: "mg", dailyValuePercentage: 33 },
      { name: "Selênio", amount: 27.6, unit: "µg", dailyValuePercentage: 50 },
      { name: "Zinco", amount: 1.0, unit: "mg", dailyValuePercentage: 9 },
      { name: "Potássio", amount: 256, unit: "mg", dailyValuePercentage: 7 },
      { name: "Ferro", amount: 1.0, unit: "mg", dailyValuePercentage: 6 },
      { name: "Magnésio", amount: 29, unit: "mg", dailyValuePercentage: 7 },
      { name: "Sódio", amount: 74, unit: "mg", dailyValuePercentage: 3 }
    ],
    bioactives: [
      { name: "Carnosina", description: "Dipéptido concentrado nos músculos que atua como antioxidante e protetor celular contra o envelhecimento." },
      { name: "Creatina", description: "Composto nitrogenado que ajuda a fornecer energia rápida para a contração muscular." }
    ],
    benefits: {
      muscles: "O altíssimo teor proteico com aminoácidos essenciais completos promove a reparação e hipertrofia muscular.",
      weight: "Altamente saciante e termogénico (gasta energia para ser digerido), apoia a queima de gordura corporal.",
      brain: "A vitamina B12 e o selénio apoiam o funcionamento neuronal e previnem danos cognitivos.",
      heart: "Substituir carnes vermelhas gordas por peito de frango reduz a ingestão de gorduras saturadas, beneficiando as artérias."
    },
    contraindications: {
      general: "Consumo geral extremamente benéfico para todas as faixas etárias.",
      whoShouldAvoid: "Nenhuma contraindicação clínica, exceto restrições específicas de proteína por distúrbios renais graves.",
      allergies: "Alergias à carne de aves são raras, mas existem em pessoas sensibilizadas.",
      drugInteractions: "Nenhuma conhecida.",
      maxRecommendedAmount: "150g a 250g por dia de forma saudável.",
      possibleRisks: "O maior risco é microbiológico (bactérias como Salmonella). Nunca lave o frango cru na torneira (espalha bactérias pela cozinha) e assegure-se de que é completamente cozinhado até ao centro."
    },
    recipes: [
      {
        id: "rec_frango_grelhado",
        name: "Peito de Frango Suculento com Ervas e Limão",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "2 bifes de peito de frango (aprox. 120g cada)",
          "1 colher de sopa de sumo de limão espremido na hora",
          "1 dente de alho picado",
          "1 colher de chá de azeite",
          "Sal, pimenta preta e alecrim seco q.b."
        ],
        steps: [
          "Num prato, tempere os bifes de frango com o limão, alho, alecrim, sal e pimenta preta. Deixe marinar por 10 minutos.",
          "Aqueça uma frigideira antiaderente ou grelhador com o azeite espalhado uniformemente em fogo médio-alto.",
          "Coloque os bifes de frango na frigideira bem quente.",
          "Grelhe por cerca de 3 a 4 minutos de um lado sem mexer, para selar os sumos da carne.",
          "Vire os bifes e cozinhe por mais 3 minutos do outro lado, até que estejam totalmente dourados e cozinhados no centro, mas ainda suculentos."
        ],
        time: 20,
        difficulty: "Fácil",
        calories: 190,
        nutrients: { calories: 190, protein: 35, carbs: 0, fat: 5, fiber: 0 }
      }
    ]
  },
  {
    id: "carapau",
    name: "Carapau Grelhado",
    scientificName: "Trachurus trachurus",
    category: "Peixe",
    family: "Carangidae",
    origin: "Oceano Atlântico (muito popular na costa de Angola)",
    countryOfOrigin: "Angola / Portugal",
    season: "Verão / Outono (ano inteiro congelado)",
    description: "Um peixe azul de tamanho pequeno-médio abundante nas águas angolanas. É uma fonte extraordinária de ácidos gordos Ómega-3, proteínas magras de alta qualidade, vitamina D e iodo, sendo um elemento essencial na dieta popular angolana e de países costeiros.",
    curiosities: [
      "O carapau é um dos peixes mais consumidos em Luanda, frequentemente feito no carvão na praia (Mufete).",
      "Sendo um peixe de pequeno porte e de ciclo de vida rápido, acumula quantidades praticamente nulas de metais pesados.",
      "A pele prateada do carapau contém uma linha lateral de escamas afiadas chamadas escudos que devem ser retiradas."
    ],
    nutrients: {
      calories: 135,
      water: 71.5,
      protein: 19.8,
      carbs: 0.0,
      fats: 6.2,
      saturatedFats: 1.5,
      unsaturatedFats: 4.2,
      fiber: 0.0,
      sugars: 0.0,
      cholesterol: 65,
      glycemicIndex: 0,
      glycemicLoad: 0
    },
    vitamins: [
      { name: "Vitamina D", amount: 16.2, unit: "µg", dailyValuePercentage: 324 },
      { name: "Vitamina B12", amount: 7.2, unit: "µg", dailyValuePercentage: 300 },
      { name: "Vitamina B3", amount: 7.5, unit: "mg", dailyValuePercentage: 47 },
      { name: "Vitamina B6", amount: 0.45, unit: "mg", dailyValuePercentage: 35 },
      { name: "Vitamina A", amount: 24, unit: "µg", dailyValuePercentage: 3 },
      { name: "Vitamina E", amount: 1.6, unit: "mg", dailyValuePercentage: 11 }
    ],
    minerals: [
      { name: "Fósforo", amount: 240, unit: "mg", dailyValuePercentage: 34 },
      { name: "Selênio", amount: 36.5, unit: "µg", dailyValuePercentage: 66 },
      { name: "Potássio", amount: 380, unit: "mg", dailyValuePercentage: 11 },
      { name: "Ferro", amount: 1.4, unit: "mg", dailyValuePercentage: 8 },
      { name: "Cálcio", amount: 40, unit: "mg", dailyValuePercentage: 4 },
      { name: "Iodo", amount: 50, unit: "µg", dailyValuePercentage: 33 },
      { name: "Magnésio", amount: 32, unit: "mg", dailyValuePercentage: 8 },
      { name: "Sódio", amount: 95, unit: "mg", dailyValuePercentage: 4 }
    ],
    bioactives: [
      { name: "Ômega 3 (EPA/DHA)", description: "Ácidos gordos poli-insaturados que protegem o endotélio, reduzem triglicéridos e combatem a inflamação vascular." }
    ],
    benefits: {
      heart: "O Ómega-3 atua na redução do colesterol LDL, aumento do HDL e prevenção de arritmias cardíacas.",
      brain: "O DHA apoia a saúde das membranas das células cerebrais, melhorando a velocidade cognitiva.",
      vision: "Previne a secura ocular e diminui os riscos de degeneração macular.",
      immunity: "A incrível abundância em Vitamina D suporta a imunidade celular e previne infeções respiratórias.",
      bones: "A vitamina D e fósforo promovem a absorção intestinal de cálcio, blindando a estrutura óssea.",
      blood: "Evita o risco de agregação plaquetária excessiva, tornando o sangue mais fluido."
    },
    contraindications: {
      general: "Consumo altamente recomendável devido ao seu excelente perfil lipídico protetor.",
      whoShouldAvoid: "Pessoas com níveis de ácido úrico muito elevados (gota ativa) devem consumir peixes azuis com moderação por causa das purinas.",
      allergies: "Alergia a peixes marinhos e mariscos.",
      drugInteractions: "Em doses alimentares comuns, não há interações. Suplementação excessiva de ómega-3 combinada com varfarina ou anticoagulantes deve ser supervisionada.",
      maxRecommendedAmount: "2 a 3 porções de peixe gordo/azul por semana (porção de 150g).",
      possibleRisks: "Peixe grelhado no carvão queimado em demasia gera hidrocarbonetos aromáticos policíclicos que são carcinogénicos. Deve-se grelhar suavemente sem queimar a pele."
    },
    recipes: [
      {
        id: "rec_carapau_mufete",
        name: "Carapau Grelhado ao Estilo Mufete",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "2 carapaus médios frescos inteiros limpos",
          "1 limão maduro",
          "2 dentes de alho esmagados com casca",
          "1 cebola média bem picadinha",
          "1 colher de sopa de óleo de palma ou azeite de oliveira",
          "Sal grosso q.b."
        ],
        steps: [
          "Faça 2 a 3 golpes transversais na pele do carapau de ambos os lados.",
          "Esfregue o peixe com sal grosso, alho e sumo de meio limão. Deixe repousar por 10 minutos.",
          "Prepare o grelhador (ou grelha elétrica) bem quente e pincele o peixe com um fio de azeite para não pegar.",
          "Grelhe o carapau por 6-8 minutos de cada lado até a pele estar estaladiça e o interior cozinhado.",
          "Entretanto, prepare o molho: numa tigela junte a cebola picada, o sumo do restante limão, o azeite/óleo de palma e uma pitada de sal fino, misturando bem.",
          "Sirva o carapau grelhado coberto generosamente com o molho de cebola, acompanhado com mandioca ou batata-doce cozida."
        ],
        time: 30,
        difficulty: "Fácil",
        calories: 220,
        nutrients: { calories: 220, protein: 30, carbs: 2, fat: 10, fiber: 0.5 }
      }
    ]
  },
  {
    id: "arroz_integral",
    name: "Arroz Integral",
    scientificName: "Oryza sativa",
    category: "Cereal",
    family: "Poaceae",
    origin: "Ásia Oriental",
    countryOfOrigin: "China",
    season: "Ano inteiro",
    description: "Cereal de grão inteiro que retém a casca (farelo) e o germe, preservando uma quantidade de fibras, vitaminas do complexo B e minerais infinitamente superior ao arroz branco refinado. Oferece energia estável devido aos hidratos de carbono complexos de absorção lenta.",
    curiosities: [
      "O arroz integral requer cerca do dobro do tempo de cozedura e mais água que o arroz branco devido à casca fibrosa protetora.",
      "As três partes do grão integral são o endosperma (carboidrato), o farelo (fibras) e o germe (nutrientes e gordura saudável).",
      "O arroz é o alimento básico de mais de metade da população mundial de forma diária."
    ],
    nutrients: {
      calories: 111,
      water: 68.4,
      protein: 2.6,
      carbs: 23.0,
      fats: 0.9,
      saturatedFats: 0.2,
      unsaturatedFats: 0.6,
      fiber: 1.8,
      sugars: 0.1,
      cholesterol: 0,
      glycemicIndex: 50,
      glycemicLoad: 11
    },
    vitamins: [
      { name: "Vitamina B1 (Tiamina)", amount: 0.1, unit: "mg", dailyValuePercentage: 9 },
      { name: "Vitamina B3 (Niacina)", amount: 1.5, unit: "mg", dailyValuePercentage: 10 },
      { name: "Vitamina B5", amount: 0.3, unit: "mg", dailyValuePercentage: 6 },
      { name: "Vitamina B6", amount: 0.14, unit: "mg", dailyValuePercentage: 11 },
      { name: "Vitamina E", amount: 0.05, unit: "mg", dailyValuePercentage: 0.3 }
    ],
    minerals: [
      { name: "Manganês", amount: 1.1, unit: "mg", dailyValuePercentage: 48 },
      { name: "Fósforo", amount: 83, unit: "mg", dailyValuePercentage: 12 },
      { name: "Magnésio", amount: 43, unit: "mg", dailyValuePercentage: 11 },
      { name: "Zinco", amount: 0.6, unit: "mg", dailyValuePercentage: 6 },
      { name: "Ferro", amount: 0.4, unit: "mg", dailyValuePercentage: 2 },
      { name: "Potássio", amount: 43, unit: "mg", dailyValuePercentage: 1 },
      { name: "Cobre", amount: 0.1, unit: "mg", dailyValuePercentage: 11 },
      { name: "Sódio", amount: 2, unit: "mg", dailyValuePercentage: 0.1 }
    ],
    bioactives: [
      { name: "Lignanas", description: "Fitoquímicos convertidos pela flora intestinal em compostos que protegem contra doenças cardíacas." },
      { name: "Ácido Fítico", description: "Antioxidante vegetal que pode reduzir o risco de pedras nos rins e cancro, embora reduza ligeiramente a absorção de minerais." }
    ],
    benefits: {
      heart: "As fibras e lignanas ajudam a manter as artérias desimpedidas e melhoram o perfil lipídico geral.",
      blood: "Tem baixo índice glicémico, sendo absorvido lentamente e evitando picos prejudiciais de insulina.",
      intestine: "Rico em fibras insolúveis que aceleram o bolo fecal, prevenindo a obstipação e protegendo o cólon.",
      weight: "Dá maior sensação de saciedade prolongada, reduzindo a ingestão calórica compulsiva.",
      nervousSystem: "As vitaminas do complexo B suportam a bainha de mielina e metabolismo celular nervoso."
    },
    contraindications: {
      general: "Uma das fontes de hidratos de carbono mais limpas e seguras disponíveis na nutrição.",
      whoShouldAvoid: "Sem contraindicações específicas relevantes.",
      allergies: "Alergias ao arroz são extremamente raras, sendo um dos alimentos menos alergénicos conhecidos.",
      drugInteractions: "Nenhuma conhecida.",
      maxRecommendedAmount: "100g a 180g cozidos por porção.",
      possibleRisks: "O arroz integral pode conter vestígios de arsénio inorgânico do solo em quantidades minúsculas. Lavar e ferver o arroz em água abundante escorrendo-a no fim elimina até 80% do arsénio."
    },
    recipes: [
      {
        id: "rec_arroz_solto",
        name: "Arroz Integral Soltinho e Perfumado",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "1 chávena de arroz integral",
          "2.5 chávenas de água a ferver",
          "1 dente de alho esmagado",
          "1 colher de chá de azeite de oliva",
          "Sal q.b."
        ],
        steps: [
          "Lave bem o arroz sob água corrente num escorredor e escorra.",
          "Numa panela média, aqueça o azeite e doure o alho levemente em fogo médio.",
          "Adicione o arroz integral seco e refogue por 2 minutos mexendo sempre, para selar os grãos.",
          "Adicione a água a ferver com cuidado e o sal, mexendo uma vez.",
          "Reduza o fogo para o mínimo, tape a panela deixando uma pequena fresta aberta e cozinhe por 25 a 30 minutos até que toda a água seja absorvida.",
          "Desligue o fogo, tape totalmente a panela e deixe repousar no vapor por 5 minutos antes de afofar com um garfo e servir."
        ],
        time: 35,
        difficulty: "Fácil",
        calories: 180,
        nutrients: { calories: 180, protein: 4, carbs: 36, fat: 1.5, fiber: 3 }
      }
    ]
  },
  {
    id: "leite_desnatado",
    name: "Leite (Desnatado)",
    scientificName: "Lac vaccnum (filtrado)",
    category: "Bebida",
    family: "Laticínios",
    origin: "Domesticação animal histórica",
    countryOfOrigin: "Global",
    season: "Ano inteiro",
    description: "Leite de vaca fluido do qual foi extraída quase a totalidade da gordura, mantendo integralmente as proteínas de alto valor biológico (caseína e soro de leite), cálcio biodisponível, fósforo e vitaminas hidrossolúveis.",
    curiosities: [
      "O leite desnatado é virtualmente livre de gorduras mas mantém a mesma quantidade exata de cálcio que o leite gordo.",
      "A cor levemente azulada do leite desnatado deve-se à ausência de carotenos solúveis em gordura.",
      "Cerca de 65% da população global adulta tem alguma dificuldade em digerir a lactose à medida que envelhece."
    ],
    nutrients: {
      calories: 35,
      water: 90.8,
      protein: 3.4,
      carbs: 4.8,
      fats: 0.1,
      saturatedFats: 0.05,
      unsaturatedFats: 0.05,
      fiber: 0.0,
      sugars: 4.8,
      cholesterol: 2,
      glycemicIndex: 32,
      glycemicLoad: 1.5
    },
    vitamins: [
      { name: "Vitamina B12", amount: 0.4, unit: "µg", dailyValuePercentage: 17 },
      { name: "Vitamina B2 (Riboflavina)", amount: 0.18, unit: "mg", dailyValuePercentage: 14 },
      { name: "Vitamina B1 (Tiamina)", amount: 0.04, unit: "mg", dailyValuePercentage: 3 },
      { name: "Vitamina B5", amount: 0.36, unit: "mg", dailyValuePercentage: 7 },
      { name: "Vitamina B6", amount: 0.04, unit: "mg", dailyValuePercentage: 3 },
      { name: "Vitamina D", amount: 1.0, unit: "µg", dailyValuePercentage: 20 },
      { name: "Vitamina A", amount: 50, unit: "µg", dailyValuePercentage: 6 }
    ],
    minerals: [
      { name: "Cálcio", amount: 122, unit: "mg", dailyValuePercentage: 12 },
      { name: "Fósforo", amount: 95, unit: "mg", dailyValuePercentage: 14 },
      { name: "Potássio", amount: 156, unit: "mg", dailyValuePercentage: 4 },
      { name: "Sódio", amount: 42, unit: "mg", dailyValuePercentage: 2 },
      { name: "Zinco", amount: 0.4, unit: "mg", dailyValuePercentage: 4 },
      { name: "Magnésio", amount: 11, unit: "mg", dailyValuePercentage: 3 }
    ],
    bioactives: [
      { name: "Peptídeos Bioativos", description: "Fragmentos proteicos que podem apresentar efeitos hipotensores e antimicrobianos benéficos." }
    ],
    benefits: {
      bones: "A combinação soberba de cálcio de altíssima biodisponibilidade, fósforo e vitamina D previne a osteoporose crónica.",
      muscles: "Fornece caseína e proteína de soro de leite (Whey) excelentes para a regeneração de tecidos e síntese muscular.",
      blood: "Ajuda a manter a pressão arterial em faixas adequadas pelo rácio de potássio e cálcio.",
      weight: "Baixo teor calórico com excelente aporte proteico ajuda a controlar o apetite."
    },
    contraindications: {
      general: "Excelente alimento rico em cálcio, devendo ser evitado apenas por indivíduos com patologias específicas.",
      whoShouldAvoid: "Pessoas com intolerância grave à lactose ou pacientes com Alergia à Proteína do Leite de Vaca (APLV).",
      allergies: "Alergia à proteína do leite (APLV) e intolerância à lactose.",
      drugInteractions: "O cálcio do leite pode reduzir a absorção intestinal de alguns antibióticos como tetraciclinas e fluoroquinolonas se tomados em conjunto.",
      maxRecommendedAmount: "2 a 3 porções de laticínios magros por dia (cerca de 200ml a 500ml).",
      possibleRisks: "O consumo excessivo extremo de cálcio pode inibir a absorção de ferro se consumido perto de refeições de carne."
    },
    recipes: [
      {
        id: "rec_vitamina_banana",
        name: "Batido Fit de Banana e Leite Desnatado",
        image: "https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "200ml de leite desnatado gelado",
          "1 banana madura fatiada",
          "1 colher de sopa de sementes de linhaça ou chia",
          "1 pitada de canela em pó"
        ],
        steps: [
          "Coloque todos os ingredientes (leite, banana fatiada e as sementes de linhaça) no liquidificador.",
          "Bata em velocidade máxima por cerca de 1 a 2 minutos até que a banana e as sementes estejam perfeitamente trituradas e o batido esteja espumoso.",
          "Verta para um copo alto, polvilhe com a canela em pó por cima e beba imediatamente fresco como pequeno-almoço ou lanche pré-treino."
        ],
        time: 5,
        difficulty: "Fácil",
        calories: 195,
        nutrients: { calories: 195, protein: 9, carbs: 32, fat: 3, fiber: 4.5 }
      }
    ]
  },
  {
    id: "mufete_peixe",
    name: "Mufete",
    scientificName: "Mufete de Cacusso (Coptodon rendalli / Oreochromis niloticus preparado)",
    category: "Angolano",
    family: "Cichlidae (Cacusso base)",
    origin: "Angola (Luanda / Ilha do Cabo)",
    countryOfOrigin: "Angola",
    season: "Ano inteiro",
    description: "Prato emblemático da gastronomia luandense, consumido tradicionalmente aos sábados e em festividades. Consiste em peixe fresco de água doce (Cacusso/Tilápia) ou do mar (como carapau) grelhado na brasa, acompanhado de batata-doce cozida, plantain (banana pão), mandioca cozida, feijão de óleo de palma e um maravilhoso molho de cebola picada crua temperada com limão e azeite.",
    curiosities: [
      "O Cacusso é a tilápia de Angola, pescada principalmente no rio Kwanza e lagoas circundantes.",
      "O molho de cebola é tradicionalmente batido com a mão ou esmagado levemente para libertar os sumos picantes da cebola.",
      "Embora seja uma refeição rica e volumosa, o Mufete é extraordinariamente equilibrado quando consumido com porções certas de batata-doce, feijão e peixe."
    ],
    nutrients: {
      calories: 210,
      water: 68.0,
      protein: 15.5,
      carbs: 18.2,
      fats: 8.5,
      saturatedFats: 2.1,
      unsaturatedFats: 5.8,
      fiber: 2.4,
      sugars: 1.2,
      cholesterol: 45,
      glycemicIndex: 45,
      glycemicLoad: 8
    },
    vitamins: [
      { name: "Vitamina A", amount: 210, unit: "µg", dailyValuePercentage: 26 },
      { name: "Vitamina C", amount: 12, unit: "mg", dailyValuePercentage: 13 },
      { name: "Vitamina B12", amount: 2.1, unit: "µg", dailyValuePercentage: 87 },
      { name: "Vitamina B6", amount: 0.28, unit: "mg", dailyValuePercentage: 21 },
      { name: "Vitamina B3", amount: 3.8, unit: "mg", dailyValuePercentage: 24 }
    ],
    minerals: [
      { name: "Potássio", amount: 290, unit: "mg", dailyValuePercentage: 8 },
      { name: "Ferro", amount: 1.8, unit: "mg", dailyValuePercentage: 10 },
      { name: "Cálcio", amount: 48, unit: "mg", dailyValuePercentage: 5 },
      { name: "Fósforo", amount: 165, unit: "mg", dailyValuePercentage: 24 },
      { name: "Sódio", amount: 120, unit: "mg", dailyValuePercentage: 5 },
      { name: "Magnésio", amount: 28, unit: "mg", dailyValuePercentage: 7 }
    ],
    bioactives: [
      { name: "Alicina", description: "Composto bioativo da cebola e alho esmagados no molho, com alto poder antibacteriano e regulador vascular." },
      { name: "Antocianinas", description: "Presentes se a batata-doce usada for roxa, auxiliando contra radicais livres oculares." }
    ],
    benefits: {
      muscles: "Uma refeição completa repleta de carboidratos complexos das raízes e proteínas puras do peixe para atletas.",
      heart: "Rica em gorduras mono e poli-insaturadas do azeite de oliva e peixe que reduzem riscos ateroscleróticos.",
      digestion: "Fibra alimentar da batata-doce e mandioca que garante saciedade e conforto gástrico estável.",
      blood: "Índice glicémico moderado graças à excelente quantidade de fibras da batata-doce cozida que amortecem a glicose."
    },
    contraindications: {
      general: "Excelente refeição de alta densidade nutricional que deve ser repartida com equilíbrio no prato.",
      whoShouldAvoid: "Pessoas que necessitem de restrição severa de sódio devem moderar o sal no peixe e no feijão.",
      allergies: "Alergias a peixe ou cebola.",
      drugInteractions: "Nenhuma conhecida.",
      maxRecommendedAmount: "Um prato completo (rácio ideal de 1/2 peixe com molho de cebola, 1/4 batata-doce e mandioca, e 1/4 feijão).",
      possibleRisks: "Grelhar peixe no carvão excessivamente preto cria compostos tóxicos. Limpe a grelha e mantenha as brasas sem chama ativa."
    },
    recipes: [
      {
        id: "rec_mufete_cacusso",
        name: "Mufete de Cacusso Completo",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "1 peixe Cacusso (Tilápia) fresco inteiro de 400g limpo",
          "1 batata-doce média cozida",
          "1 pedaço de mandioca cozida (aprox. 100g)",
          "1 banana pão (plantain) assada ou cozida",
          "4 colheres de sopa de feijão cozido temperado com óleo de palma",
          "Para o molho: 1 cebola roxa bem picada, sumo de 2 limões, 2 colheres de sopa de azeite, sal e piripiri seco picado a gosto"
        ],
        steps: [
          "Faça incisões laterais no Cacusso limpo, tempere com alho picado, limão e sal grosso.",
          "Grelhe o peixe lentamente nas brasas ou grelhador por 10 minutos de cada lado até ficar cozinhado e suculento.",
          "Cozza a batata-doce, a mandioca e a banana-pão cortada em rodelas na água e sal até ficarem macias.",
          "Aqueça o feijão com uma colher de chá de óleo de palma vermelho e um refogado leve de cebola.",
          "Misture todos os ingredientes do molho numa tigela pequena com cebola roxa picada, sumo de limão, azeite, sal e picante.",
          "Disponha o peixe grelhado no prato rodeado pela batata-doce, mandioca, banana-pão e o feijão. Regue o peixe e as raízes abundantemente com o molho de cebola fresca."
        ],
        time: 45,
        difficulty: "Médio",
        calories: 580,
        nutrients: { calories: 580, protein: 42, carbs: 68, fat: 16, fiber: 9 }
      }
    ]
  },
  {
    id: "calulu_peixe",
    name: "Calulu de Peixe",
    scientificName: "Calulu (Coriandrum sativum & Abelmoschus esculentus preparado)",
    category: "Angolano",
    family: "Malvaceae (Quiabos base)",
    origin: "Angola",
    countryOfOrigin: "Angola",
    season: "Ano inteiro",
    description: "Um dos cozinhados tradicionais mais emblemáticos e nutritivos de Angola. Trata-se de um guisado encorpado de peixe fresco e peixe seco (frequentemente bacalhau, corvina ou carapau seco), cozido em camadas alternadas com bastantes vegetais verdes como folhas de rama de batata-doce (ou folhas de espinafre), quiabos tenros, beringela, cebola, tomate fresco e óleo de palma vermelho.",
    curiosities: [
      "O uso simultâneo de peixe fresco e peixe seco confere um sabor profundo e único (gosto umami natural africano).",
      "É um prato de extrema riqueza histórica, tradicionalmente servido com funge de bombo ou de milho quente.",
      "As folhas de rama de batata-doce contêm excelentes níveis de zinco e ferro, superiores ao espinafre cozido."
    ],
    nutrients: {
      calories: 195,
      water: 74.0,
      protein: 16.8,
      carbs: 8.4,
      fats: 11.2,
      saturatedFats: 2.8,
      unsaturatedFats: 7.9,
      fiber: 3.1,
      sugars: 1.5,
      cholesterol: 40,
      glycemicIndex: 35,
      glycemicLoad: 3
    },
    vitamins: [
      { name: "Vitamina A", amount: 560, unit: "µg", dailyValuePercentage: 70 },
      { name: "Vitamina C", amount: 28, unit: "mg", dailyValuePercentage: 31 },
      { name: "Vitamina K", amount: 140, unit: "µg", dailyValuePercentage: 116 },
      { name: "Vitamina B12", amount: 1.8, unit: "µg", dailyValuePercentage: 75 },
      { name: "Vitamina B6", amount: 0.35, unit: "mg", dailyValuePercentage: 27 },
      { name: "Vitamina B9", amount: 72, unit: "µg", dailyValuePercentage: 18 }
    ],
    minerals: [
      { name: "Ferro", amount: 2.8, unit: "mg", dailyValuePercentage: 16 },
      { name: "Cálcio", amount: 110, unit: "mg", dailyValuePercentage: 11 },
      { name: "Magnésio", amount: 48, unit: "mg", dailyValuePercentage: 12 },
      { name: "Zinco", amount: 1.2, unit: "mg", dailyValuePercentage: 11 },
      { name: "Potássio", amount: 390, unit: "mg", dailyValuePercentage: 11 },
      { name: "Sódio", amount: 340, unit: "mg", dailyValuePercentage: 14 }
    ],
    bioactives: [
      { name: "Mucilagem de Quiabo", description: "Fibras solúveis viscosas excelentes que revestem o estômago e atrasam a absorção intestinal de gordura." },
      { name: "Carotenoides", description: "Fornecidos em alta dose pelo óleo de palma vermelho, apoiando a renovação celular celular." }
    ],
    benefits: {
      intestine: "A mucilagem solúvel do quiabo e as fibras das folhas verdes limpam o trato intestinal e reduzem a obstipação.",
      immunity: "Incrível aporte de Vitaminas A e C que blindam as barreiras mucosas corporais contra germes.",
      bones: "Rico em cálcio e magnésio biodisponíveis dos peixes secos cozidos e quiabos.",
      blood: "O magnésio e o potássio ajudam a relaxar as paredes arteriais regulando a hipertensão vascular."
    },
    contraindications: {
      general: "Uma refeição tradicional excecionalmente saudável e equilibrada.",
      whoShouldAvoid: "Pacientes que tomam anticoagulantes orais como a Varfarina devem ter cuidado com o alto teor de Vitamina K das folhas verdes. O peixe seco pode ter excesso de sódio se não for bem demolhado.",
      allergies: "Alergia a quiabo ou a peixe seco/salgado.",
      drugInteractions: "O alto teor de Vitamina K (folhas e quiabo) pode interagir com anticoagulantes cumarínicos.",
      maxRecommendedAmount: "Uma concha grande (cerca de 200g) de Calulu acompanhando com porção moderada de funge.",
      possibleRisks: "O peixe seco deve ser lavado e demolhado muito bem de véspera para remover o excesso de sal de conservação, evitando picos de pressão arterial."
    },
    recipes: [
      {
        id: "rec_calulu_tradicional",
        name: "Calulu de Peixe Tradicional de Angola",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "400g de peixe fresco (corvina ou garoupa) cortado em postas",
          "200g de peixe seco (demolhado e sem espinhas)",
          "1 embalagem de quiabos frescos cortados ao meio",
          "2 beringelas cortadas em fatias longitudinais",
          "300g de rama de batata-doce ou espinafres frescos",
          "2 tomates maduros picados e 1 cebola grande picada",
          "2 colheres de sopa de óleo de palma vermelho",
          "Sal e alho para temperar"
        ],
        steps: [
          "Tempere o peixe fresco com alho esmagado e sumo de limão.",
          "Demolhe o peixe seco por algumas horas em água fria para retirar o sal excessivo.",
          "Num tacho largo, faça camadas alternadas: uma camada de cebola e tomate, uma camada de peixes (fresco e seco), beringela, quiabo e folhas verdes de rama.",
          "Repita as camadas até preencher, finalize com uma camada de folhas verdes, cebola e tomate.",
          "Regue tudo uniformemente com o óleo de palma vermelho.",
          "Tape o tacho hermeticamente e cozinhe em fogo brando por cerca de 30 a 40 minutos. Não mexa o tacho com colher para não desfazer o peixe; em vez disso, rode o tacho pelas pegas delicadamente de tempos a tempos.",
          "Sirva fumegante acompanhado com funge de bombo ou milho."
        ],
        time: 50,
        difficulty: "Difícil",
        calories: 380,
        nutrients: { calories: 380, protein: 32, carbs: 14, fat: 22, fiber: 6 }
      }
    ]
  },
  {
    id: "abacate",
    name: "Abacate",
    scientificName: "Persea americana",
    category: "Fruta",
    family: "Lauraceae",
    origin: "Mesoamérica (México)",
    countryOfOrigin: "México",
    season: "Ano inteiro",
    description: "Uma fruta única e altamente nutritiva, conhecida pelo seu teor de gorduras saudáveis monoinsaturadas, que auxiliam o sistema cardiovascular. É rica em potássio, fibras e antioxidantes lipossolúveis.",
    curiosities: [
      "O abacate amadurece apenas depois de colhido da árvore.",
      "A palavra 'abacate' deriva do asteca 'ahuacatl', que significa testículo.",
      "Sua polpa cremosa pode substituir manteiga e maionese em receitas veganas."
    ],
    nutrients: {
      calories: 160,
      water: 73.2,
      protein: 2.0,
      carbs: 8.5,
      fats: 14.7,
      saturatedFats: 2.1,
      unsaturatedFats: 11.5,
      fiber: 6.7,
      sugars: 0.7,
      cholesterol: 0,
      glycemicIndex: 15,
      glycemicLoad: 1
    },
    vitamins: [
      { name: "Vitamina K", amount: 21, unit: "µg", dailyValuePercentage: 26 },
      { name: "Vitamina B9 (Ácido Fólico)", amount: 81, unit: "µg", dailyValuePercentage: 20 },
      { name: "Vitamina B5", amount: 1.4, unit: "mg", dailyValuePercentage: 28 },
      { name: "Vitamina B6", amount: 0.26, unit: "mg", dailyValuePercentage: 20 },
      { name: "Vitamina E", amount: 2.07, unit: "mg", dailyValuePercentage: 14 },
      { name: "Vitamina C", amount: 10, unit: "mg", dailyValuePercentage: 11 }
    ],
    minerals: [
      { name: "Potássio", amount: 485, unit: "mg", dailyValuePercentage: 14 },
      { name: "Cobre", amount: 0.19, unit: "mg", dailyValuePercentage: 21 },
      { name: "Magnésio", amount: 29, unit: "mg", dailyValuePercentage: 8 },
      { name: "Manganês", amount: 0.14, unit: "mg", dailyValuePercentage: 6 },
      { name: "Fósforo", amount: 52, unit: "mg", dailyValuePercentage: 7 }
    ],
    bioactives: [
      { name: "Luteína", description: "Carotenoide essencial para prevenir a degeneração macular nos olhos." },
      { name: "Beta-sitosterol", description: "Fitoesterol que ajuda a manter níveis saudáveis de colesterol." }
    ],
    benefits: {
      heart: "O ácido oleico ajuda a reduzir o colesterol LDL e aumenta o colesterol HDL benéfico.",
      brain: "As gorduras monoinsaturadas promovem um fluxo sanguíneo saudável para o cérebro.",
      skin: "Rico em luteína e vitamina E, nutre a pele contra os efeitos do envelhecimento e radicais livres.",
      digestion: "O excelente teor de fibras insolúveis e solúveis previne a obstipação."
    },
    contraindications: {
      general: "Consumo seguro e altamente recomendado na maioria das dietas.",
      whoShouldAvoid: "Pessoas com alergia ao látex podem apresentar sensibilidade cruzada ao abacate.",
      allergies: "Raras, mas associadas à síndrome látex-fruta.",
      drugInteractions: "A vitamina K pode interferir levemente com anticoagulantes como a Varfarina.",
      maxRecommendedAmount: "Meio abacate médio por dia é adequado para a maioria das dietas equilibradas.",
      possibleRisks: "Devido à sua densidade calórica, o consumo em excesso deve ser monitorado em dietas restritivas de calorias."
    },
    recipes: [
      {
        id: "rec_guacamole",
        name: "Guacamole Cremoso Tradicional",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "2 abacates maduros",
          "1 tomate picado sem sementes",
          "1/2 cebola roxa finamente picada",
          "Sumo de 1 limão espremido",
          "Coentros frescos picados a gosto",
          "Uma pitada de sal e pimenta-preta"
        ],
        steps: [
          "Corte os abacates ao meio, retire o caroço e raspe a polpa para uma tigela.",
          "Esmague a polpa grosseiramente com um garfo, mantendo alguns pedaços.",
          "Adicione o tomate, a cebola roxa e os coentros picados.",
          "Regue com o sumo de limão e tempere com sal e pimenta.",
          "Misture tudo delicadamente e sirva fresco com tortilhas de milho ou fatias de pão integral."
        ],
        time: 10,
        difficulty: "Fácil",
        calories: 190,
        nutrients: { calories: 190, protein: 3, carbs: 12, fat: 16, fiber: 7 }
      }
    ]
  },
  {
    id: "manga",
    name: "Manga",
    scientificName: "Mangifera indica",
    category: "Fruta",
    family: "Anacardiaceae",
    origin: "Sul da Ásia (Índia)",
    countryOfOrigin: "Índia",
    season: "Verão",
    description: "Conhecida como a 'rainha das frutas', a manga é extremamente suculenta, doce e aromática. Fornece uma quantidade espetacular de vitamina C e beta-caroteno, promovendo viço à pele e robustez imunológica.",
    curiosities: [
      "A manga é a fruta nacional da Índia, Paquistão e Filipinas.",
      "A mangueira é uma árvore sagrada na tradição budista, associada à meditação.",
      "Dar uma cesta de mangas a alguém é considerado um gesto caloroso de amizade na Ásia."
    ],
    nutrients: {
      calories: 60,
      water: 83.4,
      protein: 0.8,
      carbs: 15.0,
      fats: 0.38,
      saturatedFats: 0.09,
      unsaturatedFats: 0.2,
      fiber: 1.6,
      sugars: 13.7,
      cholesterol: 0,
      glycemicIndex: 51,
      glycemicLoad: 8
    },
    vitamins: [
      { name: "Vitamina C", amount: 36.4, unit: "mg", dailyValuePercentage: 40 },
      { name: "Vitamina A", amount: 54, unit: "µg", dailyValuePercentage: 6 },
      { name: "Vitamina B6", amount: 0.12, unit: "mg", dailyValuePercentage: 9 },
      { name: "Vitamina E", amount: 0.9, unit: "mg", dailyValuePercentage: 6 },
      { name: "Vitamina B9", amount: 43, unit: "µg", dailyValuePercentage: 11 }
    ],
    minerals: [
      { name: "Cobre", amount: 0.11, unit: "mg", dailyValuePercentage: 12 },
      { name: "Potássio", amount: 168, unit: "mg", dailyValuePercentage: 4 },
      { name: "Magnésio", amount: 10, unit: "mg", dailyValuePercentage: 3 }
    ],
    bioactives: [
      { name: "Mangiferina", description: "Super antioxidante exclusivo com propriedades anti-inflamatórias potentes." },
      { name: "Beta-caroteno", description: "Protetor solar interno e precursor da vitamina A." }
    ],
    benefits: {
      immunity: "Incrível dose de vitamina C e fitoquímicos protetores de células.",
      skin: "A vitamina A estimula a produção de colagénio e protege o tecido cutâneo dos raios UV.",
      digestion: "Contém amilases, enzimas digestivas naturais que quebram amido complexo."
    },
    contraindications: {
      general: "Consumo seguro. Deve ser moderado em dietas hipocalóricas severas ou diabetes devido à frutose rápida.",
      whoShouldAvoid: "Sensíveis à casca da mangueira (que contém urushiol, o mesmo composto da hera venenosa, podendo causar dermatite de contacto na boca).",
      allergies: "Raras, mas associadas à dermatite de contacto com a casca.",
      drugInteractions: "Nenhuma interação severa conhecida.",
      maxRecommendedAmount: "1 manga média por dia.",
      possibleRisks: "O excesso pode elevar rapidamente a glicémia se consumida de estômago vazio."
    },
    recipes: [
      {
        id: "rec_mousse_manga",
        name: "Mousse Fit de Manga e Chia",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "1 manga madura grande descascada",
          "1 pote (170g) de iogurte grego natural desnatado",
          "2 colheres de sopa de sementes de chia",
          "Folhas de hortelã para decorar"
        ],
        steps: [
          "Bata a manga picada e o iogurte grego no liquidificador até obter um creme sedoso.",
          "Transfira a mistura para taças individuais.",
          "Misture as sementes de chia uniformemente com uma colher.",
          "Leve ao frigorífico por no mínimo 2 horas para ganhar consistência firme.",
          "Decore com folhas de hortelã frescas e sirva bem fresco como sobremesa saudável."
        ],
        time: 15,
        difficulty: "Fácil",
        calories: 120,
        nutrients: { calories: 120, protein: 6, carbs: 18, fat: 3, fiber: 4 }
      }
    ]
  },
  {
    id: "morango",
    name: "Morango",
    scientificName: "Fragaria ananassa",
    category: "Fruta",
    family: "Rosaceae",
    origin: "Europa",
    countryOfOrigin: "França",
    season: "Primavera a Verão",
    description: "Uma baga vermelha vibrante e irresistível, campeã em antioxidantes como a vitamina C e antocianinas. É incrivelmente baixa em calorias, tornando-se o snack perfeito para perda de peso e controle glicémico.",
    curiosities: [
      "O morango não é tecnicamente uma baga botânica, mas sim um recetáculo floral dilatado.",
      "As sementes amarelas na parte externa são, na verdade, os frutos reais chamados aquénios.",
      "Em média, um único morango carrega cerca de 200 sementes externas."
    ],
    nutrients: {
      calories: 32,
      water: 90.9,
      protein: 0.67,
      carbs: 7.7,
      fats: 0.3,
      saturatedFats: 0.02,
      unsaturatedFats: 0.15,
      fiber: 2.0,
      sugars: 4.9,
      cholesterol: 0,
      glycemicIndex: 40,
      glycemicLoad: 3
    },
    vitamins: [
      { name: "Vitamina C", amount: 58.8, unit: "mg", dailyValuePercentage: 65 },
      { name: "Vitamina B9", amount: 24, unit: "µg", dailyValuePercentage: 6 },
      { name: "Vitamina K", amount: 2.2, unit: "µg", dailyValuePercentage: 2 }
    ],
    minerals: [
      { name: "Manganês", amount: 0.38, unit: "mg", dailyValuePercentage: 17 },
      { name: "Potássio", amount: 153, unit: "mg", dailyValuePercentage: 3 },
      { name: "Magnésio", amount: 13, unit: "mg", dailyValuePercentage: 3 }
    ],
    bioactives: [
      { name: "Antocianinas", description: "Pigmentos flavonoides que dão a cor vermelha e combatem o envelhecimento celular." },
      { name: "Ácido Elágico", description: "Polifenol com forte capacidade antitumoral estudada em laboratório." }
    ],
    benefits: {
      heart: "As antocianinas melhoram a função do endotélio vascular diminuindo a pressão arterial.",
      blood: "Reduz picos de insulina e açúcar após as refeições graças aos polifenóis.",
      weight: "Densidade calórica extremamente reduzida, ideal para saciedade em dietas de restrição calórica."
    },
    contraindications: {
      general: "Consumo seguro para a maioria das pessoas.",
      whoShouldAvoid: "Pessoas suscetíveis a pedras nos rins devem consumir moderadamente devido à presença de oxalatos.",
      allergies: "Comum em indivíduos alérgicos ao pólen de bétula ou maçãs (reação cruzada proteica).",
      drugInteractions: "Nenhuma significativa.",
      maxRecommendedAmount: "1 a 2 chávenas (150-300g) por dia.",
      possibleRisks: "O morango convencional é frequentemente exposto a pesticidas, pelo que deve ser lavado muito bem."
    },
    recipes: [
      {
        id: "rec_salada_morango",
        name: "Salada Refrescante de Espinafres e Morango",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "2 chávenas de folhas de espinafres jovens",
          "1 chávena de morangos fatiados",
          "50g de queijo ricota esfarelado",
          "1 colher de sopa de amêndoas laminadas",
          "1 colher de chá de azeite e vinagre balsâmico"
        ],
        steps: [
          "Lave bem as folhas de espinafre e morangos.",
          "Coloque as folhas num prato largo de salada.",
          "Distribua uniformemente os morangos fatiados e a ricota por cima.",
          "Toste levemente as amêndoas numa frigideira rápida e deite por cima da salada.",
          "Regue com o azeite de oliva e vinagre balsâmico antes de servir."
        ],
        time: 10,
        difficulty: "Fácil",
        calories: 150,
        nutrients: { calories: 150, protein: 5, carbs: 10, fat: 10, fiber: 3 }
      }
    ]
  },
  {
    id: "salmao",
    name: "Salmão",
    scientificName: "Salmo salar",
    category: "Peixe",
    family: "Salmonidae",
    origin: "Oceanos Atlântico e Pacífico",
    countryOfOrigin: "Noruega / Chile",
    season: "Ano inteiro",
    description: "Um peixe gordo de água fria excecional, reconhecido globalmente como um dos superalimentos mais potentes do mar. É uma das fontes mais ricas do planeta em ácidos gordos Ómega-3 (EPA e DHA) e proteínas completas de altíssima qualidade biológica.",
    curiosities: [
      "O salmão é uma espécie anádroma: nasce no rio doce, vive no mar e volta ao rio para desovar.",
      "Sua icónica carne rosa-alaranjada deve-se à ingestão de astaxantina presente em pequenos crustáceos.",
      "Possui capacidades de orientação espacial fascinantes baseadas no magnetismo terrestre e no olfato."
    ],
    nutrients: {
      calories: 208,
      water: 68.5,
      protein: 20.0,
      carbs: 0.0,
      fats: 13.0,
      saturatedFats: 3.1,
      unsaturatedFats: 8.9,
      fiber: 0.0,
      sugars: 0.0,
      cholesterol: 55,
      glycemicIndex: 0,
      glycemicLoad: 0
    },
    vitamins: [
      { name: "Vitamina B12", amount: 3.2, unit: "µg", dailyValuePercentage: 133 },
      { name: "Vitamina D", amount: 11, unit: "µg", dailyValuePercentage: 110 },
      { name: "Vitamina B3", amount: 8.5, unit: "mg", dailyValuePercentage: 53 },
      { name: "Vitamina B6", amount: 0.6, unit: "mg", dailyValuePercentage: 46 }
    ],
    minerals: [
      { name: "Selénio", amount: 24, unit: "µg", dailyValuePercentage: 43 },
      { name: "Fósforo", amount: 200, unit: "mg", dailyValuePercentage: 28 },
      { name: "Potássio", amount: 363, unit: "mg", dailyValuePercentage: 10 },
      { name: "Magnésio", amount: 27, unit: "mg", dailyValuePercentage: 7 }
    ],
    bioactives: [
      { name: "Ómega-3 (DHA/EPA)", description: "Ácidos gordos essenciais que reduzem inflamações e protegem os neurónios." },
      { name: "Astaxantina", description: "Carotenoide vermelho antioxidante com fortes propriedades protetoras oculares e celulares." }
    ],
    benefits: {
      heart: "Diminui significativamente triglicéridos e a pressão arterial, estabilizando os ritmos cardíacos.",
      brain: "O DHA é um bloco estrutural chave do córtex cerebral, auxiliando a neuroplasticidade.",
      muscles: "Fantástica fonte de proteínas para regeneração de fibras musculares e hipertrofia.",
      vision: "O Ómega-3 previne a síndrome do olho seco e protege os fotorrecetores da retina."
    },
    contraindications: {
      general: "Consumo seguro para grávidas e crianças em rotações adequadas de peixe de cativeiro ou mar.",
      whoShouldAvoid: "Indivíduos com alergia severa a pescados marinhos.",
      allergies: "Alergia específica a peixe.",
      drugInteractions: "Suplementação massiva com Ómega-3 pode interagir com aspirina ou anticoagulantes, mas o consumo alimentar de salmão é seguro.",
      maxRecommendedAmount: "2 a 3 porções (100-150g cada) por semana.",
      possibleRisks: "Salmão selvagem é preferível, pois o salmão de viveiro comercial em águas de baixa qualidade pode acumular vestígios de metais pesados."
    },
    recipes: [
      {
        id: "rec_salmao_grelhado",
        name: "Salmão Grelhado com Ervas e Limão",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "1 posta de salmão fresco de 150g",
          "Sumo de 1/2 limão",
          "1 colher de chá de azeite extra virgem",
          "Alecrim e tomilho frescos",
          "Sal e pimenta preta ralada"
        ],
        steps: [
          "Seque bem a posta de salmão com papel de cozinha.",
          "Tempere o peixe com sal, pimenta, sumo de limão e as ervas frescas picadas.",
          "Aqueça uma grelha ou frigideira antiaderente com o azeite em lume médio-alto.",
          "Grelhe o salmão com o lado da pele para baixo por 4 minutos, depois vire e grelhe por mais 3 minutos até ficar cozinhado no centro mas sumarento.",
          "Sirva imediatamente acompanhado com legumes cozidos ao vapor."
        ],
        time: 15,
        difficulty: "Fácil",
        calories: 280,
        nutrients: { calories: 280, protein: 30, carbs: 0, fat: 18, fiber: 0 }
      }
    ]
  },
  {
    id: "brocolis",
    name: "Brócolos",
    scientificName: "Brassica oleracea var. italica",
    category: "Legume",
    family: "Brassicaceae",
    origin: "Região do Mediterrâneo",
    countryOfOrigin: "Itália",
    season: "Outono a Inverno",
    description: "Um vegetal crucífero extraordinário que atua como uma autêntica central de desintoxicação natural para o corpo. Oferece mais vitamina C do que muitas laranjas por porção, além de fitoquímicos antitumorais como o sulforafano.",
    curiosities: [
      "A palavra 'brócolos' provém do italiano 'brocco', que significa broto ou ramo.",
      "São cultivados desde a época do Império Romano, que os considerava uma iguaria preciosa.",
      "Cozinhar brócolos ao vapor preserva quase todas as suas vitaminas solúveis, enquanto a cozedura prolongada na água destrói metade."
    ],
    nutrients: {
      calories: 34,
      water: 89.3,
      protein: 2.8,
      carbs: 7.0,
      fats: 0.37,
      saturatedFats: 0.04,
      unsaturatedFats: 0.2,
      fiber: 2.6,
      sugars: 1.7,
      cholesterol: 0,
      glycemicIndex: 15,
      glycemicLoad: 1
    },
    vitamins: [
      { name: "Vitamina C", amount: 89.2, unit: "mg", dailyValuePercentage: 99 },
      { name: "Vitamina K", amount: 101.6, unit: "µg", dailyValuePercentage: 85 },
      { name: "Vitamina B9 (Ácido Fólico)", amount: 63, unit: "µg", dailyValuePercentage: 16 },
      { name: "Vitamina A", amount: 31, unit: "µg", dailyValuePercentage: 3 }
    ],
    minerals: [
      { name: "Cálcio", amount: 47, unit: "mg", dailyValuePercentage: 5 },
      { name: "Ferro", amount: 0.73, unit: "mg", dailyValuePercentage: 4 },
      { name: "Potássio", amount: 316, unit: "mg", dailyValuePercentage: 9 },
      { name: "Magnésio", amount: 21, unit: "mg", dailyValuePercentage: 5 }
    ],
    bioactives: [
      { name: "Sulforafano", description: "Fitoquímico com poderosa capacidade antioxidante e indutor de enzimas desintoxicantes do fígado." },
      { name: "Indol-3-carbinol", description: "Composto que apoia o equilíbrio hormonal de estrogénio." }
    ],
    benefits: {
      immunity: "Incrível suprimento de Vitamina C que ativa as defesas contra infeções bacterianas.",
      liver: "O sulforafano apoia os processos de detoxificação hepática de toxinas do corpo.",
      bones: "Rico em Vitamina K e cálcio, promovendo o endurecimento e mineralização óssea.",
      intestine: "Excelente quantidade de fibras que nutrem os colonócitos e facilitam a evacuação."
    },
    contraindications: {
      general: "Altamente seguro para o consumo diário em todas as idades.",
      whoShouldAvoid: "Pessoas com distúrbios graves da tiroide (bócio) devem consumi-los cozidos, pois o brócolos cru contém substâncias goitrogénicas ligeiras.",
      allergies: "Extremamente raras.",
      drugInteractions: "O elevado teor de vitamina K pode requerer consistência no consumo em doentes a tomar anticoagulantes orais como a Varfarina.",
      maxRecommendedAmount: "1 a 2 chávenas de brócolos cozidos por dia.",
      possibleRisks: "O consumo excessivo em estado cru pode provocar gases ou inchaço abdominal devido à fermentação de fibras complexas no cólon."
    },
    recipes: [
      {
        id: "rec_brocolos_vapor",
        name: "Brócolos ao Vapor com Alho e Amêndoas",
        image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "200g de floretes de brócolos frescos",
          "2 dentes de alho cortados em fatias finas",
          "1 colher de sopa de azeite extra virgem",
          "1 colher de chá de amêndoas torradas picadas",
          "Sal marinho a gosto"
        ],
        steps: [
          "Coloque água para ferver numa panela de vapor.",
          "Lave os brócolos e coloque-os no cesto de vapor por cerca de 4 a 5 minutos, garantindo que mantêm a cor verde viva e uma consistência al dente.",
          "Enquanto cozem, aqueça uma frigideira pequena com o azeite de oliva e doure as fatias de alho por 1 minuto.",
          "Transfira os brócolos cozidos para uma travessa, verta o azeite com alho quente por cima.",
          "Salpique as amêndoas tostadas e uma pitada de sal antes de servir."
        ],
        time: 10,
        difficulty: "Fácil",
        calories: 90,
        nutrients: { calories: 90, protein: 4, carbs: 8, fat: 6, fiber: 3 }
      }
    ]
  },
  {
    id: "ovo",
    name: "Ovo",
    scientificName: "Gallus gallus domesticus (ovo)",
    category: "Outro",
    family: "Phasianidae",
    origin: "Global",
    countryOfOrigin: "Global",
    season: "Ano inteiro",
    description: "Um dos alimentos mais completos e versáteis da natureza, contendo quase todos os nutrientes necessários para a vida humana. Oferece proteína de valor biológico ideal de referência, além de colina, essencial para a saúde e plasticidade do cérebro.",
    curiosities: [
      "A cor da casca do ovo (branca ou castanha) depende apenas da raça da galinha, não influenciando o valor nutricional.",
      "A gema de ovo é uma das raras fontes alimentares que fornecem Vitamina D natural ativa.",
      "Se um ovo cru flutuar quando colocado num copo com água, significa que já está velho e acumulou ar; se afundar, está perfeitamente fresco."
    ],
    nutrients: {
      calories: 155,
      water: 75.0,
      protein: 13.0,
      carbs: 1.1,
      fats: 11.0,
      saturatedFats: 3.3,
      unsaturatedFats: 7.7,
      fiber: 0.0,
      sugars: 1.1,
      cholesterol: 373,
      glycemicIndex: 0,
      glycemicLoad: 0
    },
    vitamins: [
      { name: "Vitamina B12", amount: 1.1, unit: "µg", dailyValuePercentage: 46 },
      { name: "Vitamina D", amount: 2, unit: "µg", dailyValuePercentage: 20 },
      { name: "Vitamina B2 (Riboflavina)", amount: 0.5, unit: "mg", dailyValuePercentage: 38 },
      { name: "Vitamina A", amount: 140, unit: "µg", dailyValuePercentage: 16 }
    ],
    minerals: [
      { name: "Fósforo", amount: 172, unit: "mg", dailyValuePercentage: 24 },
      { name: "Zinco", amount: 1.1, unit: "mg", dailyValuePercentage: 10 },
      { name: "Ferro", amount: 1.2, unit: "mg", dailyValuePercentage: 7 },
      { name: "Selénio", amount: 30.8, unit: "µg", dailyValuePercentage: 56 }
    ],
    bioactives: [
      { name: "Colina", description: "Nutriente vital para a síntese da acetilcolina, o neurotransmissor da memória e aprendizagem." },
      { name: "Luteína e Zeaxantina", description: "Antioxidantes acumulados na gema que protegem a retina de lesões luminosas." }
    ],
    benefits: {
      brain: "A colina atua na preservação das membranas neuronais e estimula a atividade cognitiva.",
      memory: "Promove ligações sinápticas saudáveis graças à libertação de acetilcolina.",
      muscles: "A albumina na clara e o perfil completo de aminoácidos estruturam a recuperação e ganho de massa muscular.",
      vision: "Previne as cataratas e a fadiga ocular devido aos carotenoides na gema."
    },
    contraindications: {
      general: "Consumo amplamente saudável, devendo-se preferir cozinhado.",
      whoShouldAvoid: "Pessoas diagnosticadas com hipercolesterolemia familiar grave podem precisar de moderar a dose diária, embora em pessoas saudáveis o colesterol alimentar influencie muito pouco o colesterol plasmático.",
      allergies: "A alergia à proteína do ovo é comum em crianças pequenas (muitas vezes revertida na adolescência).",
      drugInteractions: "Nenhuma interação de relevo registada.",
      maxRecommendedAmount: "1 a 3 ovos por dia na alimentação normal.",
      possibleRisks: "O consumo de ovos crus apresenta risco de infeção por Salmonella; deve sempre ser consumido bem cozinhado."
    },
    recipes: [
      {
        id: "rec_omelete_ervas",
        name: "Omelete de Clara e Gemas com Ervas Finas",
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600",
        ingredients: [
          "2 ovos inteiros frescos",
          "1 colher de sopa de salsa e cebolinho frescos picados",
          "1 colher de chá de azeite",
          "Sal e pimenta preta q.b."
        ],
        steps: [
          "Bata os ovos vigorosamente num prato fundo com um garfo até obter uma consistência espumosa uniforme.",
          "Misture as ervas finas picadas, o sal e a pimenta-preta.",
          "Aqueça uma frigideira antiaderente untada com o azeite em lume médio.",
          "Verta a mistura de ovos e cozinhe por 2 minutos. Quando as bordas começarem a soltar, dobre a omelete a meio.",
          "Deixe cozinhar por mais 1 minuto para manter o interior cremoso e sirva quente."
        ],
        time: 8,
        difficulty: "Fácil",
        calories: 160,
        nutrients: { calories: 160, protein: 13, carbs: 1, fat: 11, fiber: 0 }
      }
    ]
  }
];

