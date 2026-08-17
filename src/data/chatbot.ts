/**
 * Asistente Municipal — chat de prueba.
 *
 * Responde única y exclusivamente preguntas relacionadas con la
 * Municipalidad de Puerto Cortés. Por el momento no tiene backend ni modelo
 * de lenguaje conectado: es un motor de coincidencia local sobre una base de
 * conocimiento estructurada a partir de contenido real publicado en
 * https://ampcwp.ampuertocortes.hn (sitio oficial). Cuando exista un backend,
 * este mismo archivo (las entradas + la función `answerQuery`) es lo único
 * que habría que reemplazar por una llamada a un modelo real — la interfaz
 * del widget no cambiaría.
 */

export type ChatEntry = {
  id: string;
  keywords: string[];
  answer: string;
  link?: { label: string; href: string };
  source?: string;
};

const SOURCE_OFICIAL = "ampcwp.ampuertocortes.hn";

export const chatKnowledge: ChatEntry[] = [
  {
    id: "impuestos",
    keywords: [
      "impuesto", "impuestos", "bienes inmuebles", "pagar impuesto", "pago de impuesto",
      "avaluo", "avalúo", "predial", "banpais",
    ],
    answer:
      "Para pagar el impuesto sobre bienes inmuebles necesitas la Notificación de Avalúo (o tu último recibo) del Departamento de Ordenamiento Territorial. El proceso es: 1) presentas el documento en Control de Ingresos, 2) te calculan el monto y te dan un estado de cuenta, 3) pagas en caja. También puedes depositar en la cuenta BANPAIS No. 01-070-000065-5 y subir el comprobante por la plataforma de atención ciudadana en línea, en horario de 7:30 a.m. a 4:00 p.m.",
    link: { label: "Ver trámites y pagos", href: "/tramites#pagos" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "permisos-construccion",
    keywords: [
      "permiso de construccion", "permiso de construcción", "construir", "lotificar",
      "carnet de constructor", "rezonificacion", "rezonificación", "ruptura de concreto",
    ],
    answer:
      "El Departamento de Ordenamiento Territorial atiende permiso de construcción, permiso para lotificar, rezonificación de propiedad, autorización para ruptura de concreto, autorización para instalación de publicidad y carnet de constructor. Te recomiendo iniciar el trámite en la plataforma de trámites del portal o comunicarte directamente con la municipalidad para conocer los requisitos exactos de tu caso.",
    link: { label: "Ver trámites y permisos", href: "/tramites#permisos" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "permiso-negocio",
    keywords: [
      "permiso de negocio", "abrir negocio", "apertura de negocio", "operar negocio",
      "licencia de negocio", "permiso de operacion", "permiso de operación",
    ],
    answer:
      "Para abrir un negocio se gestiona el Permiso para Apertura de Negocios con el Departamento de Control de Ingresos. Puedes iniciar la solicitud desde el portal de trámites o comunicarte con la municipalidad para conocer los requisitos según el giro de tu negocio.",
    link: { label: "Ver trámites y permisos", href: "/tramites#permisos-negocio" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "otros-permisos",
    keywords: [
      "permiso de entierro", "fiesta bailable", "sonido y carpa", "marchas", "desfiles",
      "corte de arbol", "corte de árbol", "vendedores ambulantes", "taxi", "punto de taxis",
      "transporte de equipo pesado",
    ],
    answer:
      "Ese tipo de permisos (entierro, fiestas y sonido, marchas y desfiles, corte de árbol, nuevos puntos de taxi, transporte de equipo pesado) los gestionan los departamentos de Justicia Municipal, Vialidad y Transporte, o el Departamento Municipal Ambiental, según el caso. Lo más rápido es llamar directamente a la municipalidad para que te indiquen requisitos y ventanilla exacta.",
    link: { label: "Ver trámites y permisos", href: "/tramites#permisos" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "constancias",
    keywords: [
      "constancia", "certificacion", "certificación", "constancia catastral", "solvencia",
      "solvencia municipal", "acta de defuncion", "acta de defunción",
    ],
    answer:
      "Puedes solicitar constancia catastral (Ordenamiento Territorial), constancias y certificaciones generales (Secretaría) y actas o certificaciones de defunción (Justicia Municipal). Estos trámites se solicitan en el portal de trámites o directamente en las oficinas municipales.",
    link: { label: "Ver trámites y permisos", href: "/tramites" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "agua",
    keywords: [
      "agua", "agua potable", "conexion de agua", "conexión de agua", "alcantarillado",
      "aguas de puerto cortes", "fuga de agua", "no hay agua",
    ],
    answer:
      "El agua potable y el alcantarillado sanitario los administra la empresa Aguas de Puerto Cortés (creada en 1999), no la municipalidad directamente — atienden a unos 66,000 habitantes del área urbana con tres plantas de tratamiento. Para una conexión nueva, reportar una fuga o consultar tu factura, contacta a Aguas de Puerto Cortés en aguaspuertocortes.com. Si prefieres, la municipalidad también puede orientarte a través de su plataforma de atención ciudadana.",
    link: { label: "Ver servicios de agua", href: "/servicios#agua" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "desechos",
    keywords: [
      "basura", "desechos", "recoleccion", "recolección", "recoleccion de basura",
      "camion de basura", "camión de basura", "reciclaje",
    ],
    answer:
      "La recolección de desechos sólidos opera con 6 unidades recolectoras tipo compactador (25 yardas cada una) que cubren seis rutas entre sectores residenciales, comerciales e industriales, recogiendo entre 40 y 60 toneladas diarias. El sitio oficial no publica el horario exacto por zona/calle, así que para conocer el día de recolección en tu sector o reportar una recolección perdida, lo mejor es llamar a la municipalidad.",
    link: { label: "Ver servicio de recolección", href: "/servicios#recoleccion" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "bomberos",
    keywords: [
      "bomberos", "incendio", "emergencia", "ambulancia", "rescate",
    ],
    answer:
      "El Cuerpo de Bomberos de Puerto Cortés está en el barrio San Martín, 8ª avenida y 10 calle este. Brindan atención de incendios, rescate y ambulancia, además de programas educativos (academia infantil de bomberos 7-12 años y compañía de bomberos voluntarios) y el Departamento Técnico de Prevención y Seguridad contra Incendios (OTPSCI), que inspecciona negocios y espacios públicos. Para emergencias, llama de inmediato a la municipalidad.",
    link: { label: "Ver contacto de bomberos", href: "/servicios#bomberos" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "denuncia",
    keywords: [
      "denuncia", "denunciar", "queja", "reportar", "sugerencia", "felicitacion", "felicitación",
      "reclamo",
    ],
    answer:
      "Puedes presentar una denuncia o queja identificada (con tu nombre, contacto y sector), una denuncia anónima, una sugerencia o incluso una felicitación al servicio municipal. Todo se recibe en línea y se enruta automáticamente al departamento responsable, con seguimiento de un Promotor Social. Puedes adjuntar documentos o fotos como respaldo (PDF, DOC, JPG, PNG).",
    link: { label: "Presentar una denuncia", href: "/tramites#denuncias" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "transparencia",
    keywords: [
      "transparencia", "presupuesto", "rendicion de cuentas", "rendición de cuentas",
      "plan de arbitrios", "arbitrios", "contrataciones", "licitacion", "licitación",
    ],
    answer:
      "La municipalidad mantiene un Portal Único de Transparencia con su Política de Transparencia vigente hasta 2029, y ha sido reconocida por el Instituto de Acceso a la Información Pública (IAIP) con 100% de cumplimiento de la ley de transparencia durante tres años consecutivos. Ahí también encuentras el Plan de Arbitrios 2026 (tasas y tributos vigentes).",
    link: { label: "Ver transparencia", href: "/transparencia" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "gestion-alcalde",
    keywords: [
      "alcalde", "giancarlo", "giancarlo rodriguez", "giancarlo rodríguez", "gestion del alcalde",
      "gestión del alcalde", "obras", "proyectos", "avances", "en que trabaja el alcalde",
    ],
    answer:
      "Estamos bajo la gestión de nuestro Alcalde Giancarlo Rodríguez. En la sección Gestión del Alcalde de este portal puedes ver el detalle de más de 100 proyectos y acciones — pavimentación, agua y saneamiento, turismo, deporte, bienestar social y gobierno de puertas abiertas — con su estado, avance e inversión, además de un dashboard en vivo y un buscador para filtrar por categoría o comunidad.",
    link: { label: "Ver Gestión del Alcalde", href: "/gestion-alcalde" },
    source: "Puerto Cortés Digital",
  },
  {
    id: "municipio-datos",
    keywords: [
      "poblacion", "población", "habitantes", "extension", "extensión", "cuantos habitantes",
      "cuántos habitantes", "donde queda puerto cortes", "dónde queda puerto cortés", "ubicacion",
      "ubicación",
    ],
    answer:
      "Puerto Cortés tiene una población proyectada al 2024 de 142,659 habitantes (48.28% hombres, 51.72% mujeres; 47.92% urbana y 52.08% rural), con una extensión territorial de 391.2 km². Está en el noroeste de Honduras, frente al mar Caribe, y es sede del puerto más importante del país.",
    link: { label: "Conocer más de Puerto Cortés", href: "/turismo" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "contacto",
    keywords: [
      "contacto", "telefono", "teléfono", "numero", "número", "llamar", "correo", "email",
      "horario", "direccion", "dirección", "donde queda la alcaldia", "dónde queda la alcaldía",
    ],
    answer:
      "Puedes comunicarte con la Municipalidad de Puerto Cortés al +504 2665-8000, o a través de la plataforma de atención ciudadana en línea (para trámites y pagos, el horario de atención es de 7:30 a.m. a 4:00 p.m.). Si prefieres, también puedes dejar tu consulta como una denuncia, queja o sugerencia desde este portal.",
    link: { label: "Ir a trámites y contacto", href: "/tramites#denuncias" },
    source: SOURCE_OFICIAL,
  },
  {
    id: "turismo",
    keywords: [
      "turismo", "playa", "playas", "laguna", "feria agostina", "que hacer", "qué hacer",
      "visitar", "atardecer", "gastronomia", "gastronomía",
    ],
    answer:
      "Puerto Cortés combina playa caribeña, la Laguna de Alvarado (humedal de importancia internacional), gastronomía garífuna y tradiciones como la Noche Veneciana y la Feria Agostina. En la sección Puerto Cortés del portal tienes todo el detalle de playas, naturaleza, cultura y eventos.",
    link: { label: "Explorar Puerto Cortés", href: "/turismo" },
    source: "Puerto Cortés Digital",
  },
];

const GREETING_WORDS = ["hola", "buenas", "buenos dias", "buenos días", "buenas tardes", "buenas noches", "que tal", "qué tal", "saludos"];
const THANKS_WORDS = ["gracias", "muchas gracias", "te lo agradezco", "excelente gracias"];
const IDENTITY_WORDS = ["quien eres", "quién eres", "que eres", "qué eres", "eres un bot", "eres real", "eres humano", "eres una persona"];

const ON_TOPIC_HINTS = [
  "municipalidad", "municipio", "alcalde", "alcaldia", "alcaldía", "tramite", "trámite",
  "permiso", "impuesto", "pago", "agua", "basura", "desecho", "bombero", "denuncia",
  "transparencia", "servicio", "certificado", "constancia", "construccion", "construcción",
  "negocio", "licencia", "arbitrios", "presupuesto", "contacto", "telefono", "teléfono",
  "horario", "direccion", "dirección", "turismo", "playa", "feria", "patronato", "obra",
  "proyecto", "puerto cortes", "puerto cortés", "corporacion municipal", "corporación municipal",
];

export type ChatAnswer = {
  text: string;
  link?: { label: string; href: string };
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function includesAny(haystack: string, needles: string[]): boolean {
  return needles.some((n) => haystack.includes(normalize(n)));
}

export const WELCOME_MESSAGE =
  "¡Hola! Soy el Asistente Municipal de Puerto Cortés, un chat de prueba que responde preguntas sobre trámites, servicios, transparencia y la gestión de nuestro Alcalde Giancarlo Rodríguez. ¿En qué te puedo ayudar hoy?";

export const SUGGESTED_QUESTIONS = [
  "¿Cómo pago mis impuestos?",
  "¿Cómo reporto la recolección de basura?",
  "¿En qué trabaja el Alcalde?",
  "¿Cómo presento una denuncia?",
];

const OUT_OF_SCOPE_REPLIES = [
  "Con gusto, pero soy un asistente enfocado únicamente en temas de la Municipalidad de Puerto Cortés — trámites, servicios, transparencia y la gestión del Alcalde Giancarlo Rodríguez. ¿Te ayudo con algo de eso?",
  "Esa consulta se sale de lo que puedo responder: solo manejo información municipal de Puerto Cortés (trámites, servicios, transparencia, contacto). ¿Quieres que te ayude con alguno de esos temas?",
];

/** Simula un pequeño rango de variación en el saludo para que se sienta menos robótico. */
const GREETING_REPLIES = [
  "¡Hola! ¿En qué te puedo ayudar con temas de la municipalidad?",
  "¡Buenas! Cuéntame qué necesitas saber sobre trámites, servicios o la gestión municipal.",
];

export function answerQuery(rawQuery: string): ChatAnswer {
  const q = normalize(rawQuery);

  if (!q) {
    return { text: "Cuéntame en qué te puedo ayudar sobre la municipalidad de Puerto Cortés." };
  }

  if (includesAny(q, IDENTITY_WORDS)) {
    return {
      text:
        "Soy un asistente de prueba de Puerto Cortés Digital, bajo la gestión de nuestro Alcalde Giancarlo Rodríguez. Por ahora respondo con información publicada en el sitio oficial de la municipalidad — todavía no soy un modelo de IA conectado en vivo, pero ya puedo orientarte en trámites, servicios, transparencia y más.",
    };
  }

  if (includesAny(q, THANKS_WORDS) && q.length < 40) {
    return { text: "¡Con mucho gusto! Si necesitas algo más sobre la municipalidad, aquí estoy." };
  }

  if (includesAny(q, GREETING_WORDS) && q.length < 30) {
    return { text: GREETING_REPLIES[Math.floor(Math.random() * GREETING_REPLIES.length)] };
  }

  const words = q.split(/\s+/).filter((w) => w.length > 2);
  let best: { entry: ChatEntry; score: number } | null = null;

  for (const entry of chatKnowledge) {
    let score = 0;
    for (const kw of entry.keywords) {
      const nkw = normalize(kw);
      if (q.includes(nkw)) {
        score += nkw.split(/\s+/).length; // frases completas pesan más que palabras sueltas
      } else if (words.some((w) => nkw === w)) {
        score += 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  if (best) {
    return { text: best.entry.answer, link: best.entry.link };
  }

  if (includesAny(q, ON_TOPIC_HINTS)) {
    return {
      text:
        "Entiendo que tu pregunta es sobre la municipalidad, pero no tengo información específica sobre eso todavía. Te recomiendo llamar al +504 2665-8000 o dejar tu consulta como una solicitud desde el portal de trámites.",
      link: { label: "Ir a trámites", href: "/tramites" },
    };
  }

  return { text: OUT_OF_SCOPE_REPLIES[Math.floor(Math.random() * OUT_OF_SCOPE_REPLIES.length)] };
}
