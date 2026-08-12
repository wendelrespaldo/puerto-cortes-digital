/**
 * Contenido editorial verificado sobre Puerto Cortés.
 * Fuentes: Municipalidad de Puerto Cortés (ampcwp.ampuertocortes.hn),
 * El País Honduras, Honduras.com, RedHonduras, Ramsar (humedal Laguna de
 * Alvarado). No se inventan cifras, fechas ni datos históricos.
 */

export const historyArticle = {
  eyebrow: "Un poco de historia",
  title: "Puerto Cortés: una ciudad entre el Caribe y la historia",
  paragraphs: [
    "Todo comenzó en 1524, cuando la expedición de Gil González Dávila llegó a esta costa y la bautizó Puerto Caballos, luego de que una fuerte tormenta pusiera en riesgo la travesía y la expedición perdiera 17 caballos.",
    "El nombre que conocemos hoy nace el 5 de marzo de 1869, cuando el presidente José María Medina fundó la ciudad actual en memoria del capitán Hernán Cortés, como punto de partida del ferrocarril interoceánico de Honduras.",
    "El 3 de abril de 1882, Puerto Cortés fue declarado municipio. Desde entonces, su puerto —hoy el más importante de Honduras— ha sido el motor que conecta a la ciudad con el resto del mundo, mientras su identidad caribeña se sigue construyendo entre el mar, la cultura garífuna y el orgullo porteño.",
  ],
};

export type CityStat = {
  id: string;
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  hint: string;
};

export const cityStats: CityStat[] = [
  {
    id: "poblacion",
    label: "Población proyectada",
    value: 142659,
    hint: "Municipalidad de Puerto Cortés, proyección 2024",
  },
  {
    id: "extension",
    label: "Extensión territorial",
    value: 391.2,
    decimals: 1,
    suffix: " km²",
    hint: "Municipalidad de Puerto Cortés",
  },
  {
    id: "aniversario",
    label: "Nombre 'Puerto Cortés' en 2026",
    value: 157,
    suffix: " años",
    hint: "Fundada el 5 de marzo de 1869",
  },
  {
    id: "hombres",
    label: "Hombres",
    value: 48.28,
    decimals: 2,
    suffix: "%",
    hint: "Proyección 2024",
  },
  {
    id: "mujeres",
    label: "Mujeres",
    value: 51.72,
    decimals: 2,
    suffix: "%",
    hint: "Proyección 2024",
  },
  {
    id: "urbana",
    label: "Población urbana",
    value: 47.92,
    decimals: 2,
    suffix: "%",
    hint: "Proyección 2024",
  },
  {
    id: "rural",
    label: "Población rural",
    value: 52.08,
    decimals: 2,
    suffix: "%",
    hint: "Proyección 2024",
  },
];

export type Tradition = {
  id: string;
  month: string;
  title: string;
  description: string;
};

export const traditions: Tradition[] = [
  {
    id: "noche-veneciana",
    month: "Agosto",
    title: "Noche Veneciana",
    description:
      "Un desfile de embarcaciones decoradas e iluminadas navega la bahía de Puerto Cortés, en la playa municipal de El Porvenir. La tradición nació con inmigrantes italianos que veían en los atardeceres del puerto un reflejo de Venecia, y desde 2022 es Patrimonio Cultural de Honduras.",
  },
  {
    id: "feria-agostina",
    month: "Agosto",
    title: "Feria Agostina",
    description:
      "Celebrada cada agosto en honor a la Virgen de Santa María de Asunción, patrona de los porteños, es una de las ferias más esperadas de Honduras y reúne actividades culturales, recreativas y comunitarias durante todo el mes.",
  },
  {
    id: "aniversario",
    month: "Marzo",
    title: "Aniversario de Puerto Cortés",
    description:
      "Cada 5 de marzo, la ciudad conmemora la fundación decretada en 1869 por el presidente José María Medina. En 2026, Puerto Cortés cumple 157 años de llevar este nombre.",
  },
];

export type MiniStory = {
  id: string;
  title: string;
  text: string;
};

export const miniStories: MiniStory[] = [
  {
    id: "sabias-que",
    title: "¿Sabías que...?",
    text: "Puerto Cortés se llamó primero Puerto Caballos: la expedición de 1524 perdió 17 caballos en una tormenta al llegar a esta costa.",
  },
  {
    id: "ciudad-con-historia",
    title: "Una ciudad con historia",
    text: "El nombre actual nace el 5 de marzo de 1869, cuando el presidente José María Medina fundó la ciudad en memoria del capitán Hernán Cortés.",
  },
  {
    id: "sabores-del-caribe",
    title: "Sabores del Caribe",
    text: "La machuca y el casabe son herencia garífuna: plátano majado en mortero de madera y pan de yuca tostado, típicos de la costa caribeña.",
  },
  {
    id: "tradiciones-que-permanecen",
    title: "Tradiciones que permanecen",
    text: "La Noche Veneciana, nacida con inmigrantes italianos, es Patrimonio Cultural de Honduras desde 2022 y única en todo el país.",
  },
  {
    id: "puerto-que-mueve-honduras",
    title: "El puerto que mueve Honduras",
    text: "Bajo el nombre de Puerto Caballos desde 1524, este punto de la costa fue el origen del que hoy es el principal puerto de Honduras.",
  },
];
