import type { Meal, RecipeStep } from './data';

export type WeeklyRecommendation = {
  id: string;
  mealId: string;
  weekKey: string;
  title: string;
  note: string;
  sourceTitle: string;
  sourceUrl: string;
  verifiedOn: string;
  ingredients: Meal['ingredients'];
  steps: RecipeStep[];
};

export type SavedRecommendation = WeeklyRecommendation & {
  day: number;
  mealLabel: string;
  savedAt: string;
};

type VerifiedTechnique = {
  title: string;
  sourceTitle: string;
  sourceUrl: string;
  steps: RecipeStep[];
};

const techniques = {
  yogurtBowl: {
    title: 'Healthy bowl',
    sourceTitle: 'Healthy bowl - Canal Cocina',
    sourceUrl: 'https://canalcocina.es/receta/healthy-bowl',
    steps: [
      { title: 'Prepara la base', detail: 'Sirve primero el yogur o la parte cremosa en un cuenco ancho.' },
      { title: 'Corta y reparte', detail: 'Prepara la fruta y los ingredientes firmes en piezas pequeñas y colócalos por secciones.' },
      { title: 'Termina el bowl', detail: 'Añade al final los cereales, frutos secos o miel que figuren en la lista y sirve.' },
    ],
  },
  smoothie: {
    title: 'Batido de plátano',
    sourceTitle: 'Batido de plátano - Canal Cocina',
    sourceUrl: 'https://canalcocina.es/receta/batido-de-platano',
    steps: [
      { title: 'Prepara la fruta', detail: 'Pela y trocea la fruta indicada para que se triture de manera uniforme.' },
      { title: 'Tritura', detail: 'Pon en la batidora los ingredientes líquidos y después los sólidos; tritura hasta que no queden grumos.' },
      { title: 'Sirve', detail: 'Pasa el batido a un vaso y acompáñalo con los ingredientes que deban tomarse enteros.' },
    ],
  },
  fruit: {
    title: 'Macedonia de frutas',
    sourceTitle: 'Macedonia de frutas - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/postres/receta-de-macedonia-de-frutas',
    steps: [
      { title: 'Lava y pela', detail: 'Lava la fruta y retira piel, huesos o semillas cuando sea necesario.' },
      { title: 'Corta igual', detail: 'Trocea la fruta en piezas de tamaño parecido para que sea fácil de comer.' },
      { title: 'Monta la ración', detail: 'Combina la fruta con los frutos secos o acompañamientos indicados y sirve fresca.' },
    ],
  },
  sandwich: {
    title: 'Montado tostado',
    sourceTitle: 'Ensalada de pavo y aguacate - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-ensaladas/ensalada-de-pavo-y-aguacate-receta',
    steps: [
      { title: 'Prepara el relleno', detail: 'Corta o dobla el pavo, jamón, atún o queso que indique la receta.' },
      { title: 'Tuesta el pan', detail: 'Calienta el pan hasta que quede firme y ligeramente dorado.' },
      { title: 'Monta y acompaña', detail: 'Reparte el relleno, añade el aceite o vegetal indicado y sirve con el resto de la ración.' },
    ],
  },
  bolognese: {
    title: 'Macarrones a la boloñesa',
    sourceTitle: 'Macarrones a la boloñesa - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-pasta/macarrones-a-bolonesa-receta-pasta-carne-facil-como-popular-sabrosa-efectiva',
    steps: [
      { title: 'Haz el sofrito', detail: 'Pica las verduras y cocínalas a fuego medio hasta que estén tiernas.' },
      { title: 'Cocina la boloñesa', detail: 'Añade el pollo picado y después el tomate; cocina hasta obtener una salsa ligada.' },
      { title: 'Integra la pasta', detail: 'Incorpora los macarrones cocidos a la salsa y mezcla un minuto antes de servir.' },
    ],
  },
  tortilla: {
    title: 'Tortilla de patatas y verduras',
    sourceTitle: 'Tortilla de patatas y verduras - TodoCooking',
    sourceUrl: 'https://www.todocooking.com/tortilla-de-patatas-y-verduras-receta-expres/',
    steps: [
      { title: 'Cocina la base', detail: 'Corta la patata y la verdura en piezas pequeñas y cocínalas hasta que estén tiernas.' },
      { title: 'Añade el huevo', detail: 'Bate el huevo, mézclalo con la base y vierte todo en una sartén caliente.' },
      { title: 'Cuaja y sirve', detail: 'Cuaja por ambos lados y sirve con los acompañamientos indicados en la ración.' },
    ],
  },
  chickpeas: {
    title: 'Espinacas con garbanzos',
    sourceTitle: 'Espinacas con garbanzos - Canal Cocina',
    sourceUrl: 'https://canalcocina.es/receta/espinacas-con-garbanzos',
    steps: [
      { title: 'Prepara las espinacas', detail: 'Lava y cocina las espinacas hasta que pierdan volumen.' },
      { title: 'Incorpora los garbanzos', detail: 'Añade los garbanzos escurridos y calienta el conjunto a fuego suave.' },
      { title: 'Completa el plato', detail: 'Prepara aparte la tortilla con queso y sirve la pera como postre.' },
    ],
  },
  lentils: {
    title: 'Lentejas guisadas con verduras',
    sourceTitle: 'Lentejas guisadas con verduras - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-legumbres-y-verduras/como-hacer-lentejas-guisadas-receta',
    steps: [
      { title: 'Cocina la verdura', detail: 'Trocea la verdura y cocínala a fuego suave hasta que empiece a ablandarse.' },
      { title: 'Añade las lentejas', detail: 'Incorpora las lentejas cocidas y calienta el guiso hasta integrar los sabores.' },
      { title: 'Prepara la ensalada', detail: 'Corta el tomate, añade el atún escurrido y sírvelo junto al guiso.' },
    ],
  },
  salmon: {
    title: 'Salmón al horno con patatas',
    sourceTitle: 'Salmón al horno con patatas - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-pescados-y-mariscos/salmon-al-horno-con-patatas',
    steps: [
      { title: 'Hornea la guarnición', detail: 'Corta la patata y las verduras y hornéalas primero, porque necesitan más tiempo.' },
      { title: 'Añade el salmón', detail: 'Coloca el salmón sobre la guarnición y termina la cocción sin dejar que se seque.' },
      { title: 'Prepara el postre', detail: 'Mezcla el yogur con la fruta y la miel y sirve después del plato principal.' },
    ],
  },
  hake: {
    title: 'Merluza al horno con verduras',
    sourceTitle: 'Merluza al horno con verduras - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-pescados-y-mariscos/receta-merluza-al-horno-verduras-cocina-facil-para-resolver-cena',
    steps: [
      { title: 'Prepara la cama', detail: 'Corta la patata y la verdura, repártelas en una bandeja y hornéalas primero.' },
      { title: 'Añade la merluza', detail: 'Coloca la merluza sobre las verduras y hornea solo hasta que el pescado esté jugoso.' },
      { title: 'Sirve', detail: 'Reparte el pescado, la patata y las verduras respetando la ración indicada.' },
    ],
  },
  rice: {
    title: 'Arroz salteado con verduras y huevo',
    sourceTitle: 'Arroz salteado con verduras y huevo - Canal Cocina',
    sourceUrl: 'https://canalcocina.es/receta/arroz-salteado-verduras-juliana-brotes-soja-huevo',
    steps: [
      { title: 'Prepara el arroz', detail: 'Cuece el arroz, escúrrelo y déjalo suelto antes de saltearlo.' },
      { title: 'Saltea por orden', detail: 'Cocina primero las verduras, después las gambas y finalmente el huevo.' },
      { title: 'Mezcla', detail: 'Añade el arroz y saltea brevemente para repartir todos los ingredientes.' },
    ],
  },
  wok: {
    title: 'Wok de ternera',
    sourceTitle: 'Wok de ternera - Canal Cocina',
    sourceUrl: 'https://canalcocina.es/receta/wok-de-ternera',
    steps: [
      { title: 'Corta fino', detail: 'Corta la ternera y las verduras en tiras finas de tamaño parecido.' },
      { title: 'Saltea fuerte', detail: 'Cocina la verdura en un wok muy caliente y añade después la ternera.' },
      { title: 'Termina el plato', detail: 'Añade la soja indicada, sirve el wok y acompáñalo con la sopa de fideos.' },
    ],
  },
  pasta: {
    title: 'Pasta con sepia',
    sourceTitle: 'Pasta nero di sepia - Recetas de Rechupete',
    sourceUrl: 'https://cdn.recetasderechupete.com/wp-content/uploads/2013/05/recetas-cocina-italiana-web.pdf',
    steps: [
      { title: 'Prepara la sepia', detail: 'Limpia y corta la sepia en piezas pequeñas; cocina hasta que esté tierna.' },
      { title: 'Saltea las verduras', detail: 'Corta las verduras y saltéalas antes de mezclarlas con la sepia.' },
      { title: 'Integra la pasta', detail: 'Añade los macarrones cocidos y mezcla el conjunto antes de servir.' },
    ],
  },
  pizza: {
    title: 'Pizza de atún con vegetales',
    sourceTitle: 'Pizza de atún - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-panes/pizza-atun-cena-facil-sencilla-lista-20-minutos',
    steps: [
      { title: 'Extiende la base', detail: 'Coloca la masa en la bandeja y reparte el tomate sobre la superficie.' },
      { title: 'Añade la cobertura', detail: 'Distribuye las verduras, el atún escurrido y el queso sin amontonarlos.' },
      { title: 'Hornea', detail: 'Hornea hasta que la base esté firme y el queso se haya fundido.' },
    ],
  },
  chicken: {
    title: 'Pollo al horno con verduras',
    sourceTitle: 'Muslo de pollo a la parrilla - Canal Cocina',
    sourceUrl: 'https://canalcocina.es/receta/muslo-de-pollo-a-la-parrilla',
    steps: [
      { title: 'Prepara las verduras', detail: 'Corta las verduras y cocínalas hasta que queden tiernas.' },
      { title: 'Hornea el pollo', detail: 'Coloca el pollo en una bandeja y hornéalo hasta que esté completamente cocinado.' },
      { title: 'Monta el plato', detail: 'Sirve el pollo con el puré o las verduras y completa con los acompañamientos indicados.' },
    ],
  },
  arepas: {
    title: 'Arepas rellenas de pollo',
    sourceTitle: 'Cómo hacer arepas - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/ingredientes-y-alimentos/arepas-plato-tipico-venezuela-colombia-como-hacerlas-cuales-mejores-rellenos',
    steps: [
      { title: 'Forma las arepas', detail: 'Prepara la masa, forma discos de grosor uniforme y cocínalos por ambos lados.' },
      { title: 'Prepara el relleno', detail: 'Deshilacha el pollo cocinado y mézclalo con los ingredientes del relleno indicados.' },
      { title: 'Rellena', detail: 'Abre las arepas sin separarlas por completo, reparte el pollo y sirve.' },
    ],
  },
  paella: {
    title: 'Paella de conejo',
    sourceTitle: 'Paella de conejo - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-arroces/paella-de-conejo-receta',
    steps: [
      { title: 'Dora el conejo', detail: 'Trocea y dora el conejo antes de añadir la verdura del sofrito.' },
      { title: 'Cocina el arroz', detail: 'Añade el arroz y el líquido indicado; cocina primero a fuego vivo y termina a fuego suave.' },
      { title: 'Reposa y sirve', detail: 'Deja reposar unos minutos y acompaña con la ensalada de aguacate.' },
    ],
  },
  swordfish: {
    title: 'Pez espada a la plancha',
    sourceTitle: 'Pez espada a la plancha - Directo al Paladar',
    sourceUrl: 'https://www.directoalpaladar.com/recetas-de-pescados-y-mariscos/receta-de-aguja-a-la-plancha',
    steps: [
      { title: 'Prepara el puré', detail: 'Cocina el calabacín y tritúralo hasta conseguir una crema uniforme.' },
      { title: 'Calienta la plancha', detail: 'Seca el pescado y calienta bien una plancha antiadherente.' },
      { title: 'Cocina y sirve', detail: 'Marca el pescado poco tiempo por cada lado para mantenerlo jugoso y sírvelo con el puré.' },
    ],
  },
} satisfies Record<string, VerifiedTechnique>;

function selectTechnique(meal: Meal): VerifiedTechnique {
  const title = meal.title.toLocaleLowerCase('es-ES');
  if (/arepa/.test(title)) return techniques.arepas;
  if (/paella|conejo/.test(title)) return techniques.paella;
  if (/emperador/.test(title)) return techniques.swordfish;
  if (/pizza/.test(title)) return techniques.pizza;
  if (/sepia/.test(title)) return techniques.pasta;
  if (/boloñesa/.test(title)) return techniques.bolognese;
  if (/garbanzo/.test(title)) return techniques.chickpeas;
  if (/lenteja/.test(title)) return techniques.lentils;
  if (/salmón|salmon/.test(title)) return techniques.salmon;
  if (/merluza/.test(title)) return techniques.hake;
  if (/arroz/.test(title)) return techniques.rice;
  if (/wok|ternera/.test(title)) return techniques.wok;
  if (/tortilla/.test(title)) return techniques.tortilla;
  if (/alita|pollo/.test(title)) return techniques.chicken;
  if (/batido/.test(title)) return techniques.smoothie;
  if (/yogur|skyr|cereal/.test(title)) return techniques.yogurtBowl;
  if (/tostada|montado|pan /.test(title)) return techniques.sandwich;
  return techniques.fruit;
}

export function getIsoWeekKey(date: Date) {
  const current = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const weekday = current.getUTCDay() || 7;
  current.setUTCDate(current.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(current.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((current.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${current.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function getWeeklyRecommendation(meal: Meal, date: Date): WeeklyRecommendation {
  const technique = selectTechnique(meal);
  const weekKey = getIsoWeekKey(date);
  return {
    id: `${meal.id}:${weekKey}:${technique.title.toLocaleLowerCase('es-ES').replace(/[^a-z0-9]+/g, '-')}`,
    mealId: meal.id,
    weekKey,
    title: technique.title,
    note: 'Técnica adaptada de una receta publicada. Se conservan exactamente los ingredientes y gramos de tu planificación; no se añaden los extras de la fuente.',
    sourceTitle: technique.sourceTitle,
    sourceUrl: technique.sourceUrl,
    verifiedOn: '2026-08-30',
    ingredients: meal.ingredients.map((ingredient) => ({ ...ingredient })),
    steps: technique.steps.map((step) => ({ ...step })),
  };
}
