export type MealType = 'breakfast' | 'snack' | 'lunch' | 'afternoon' | 'dinner' | 'late';

export type Ingredient = {
  name: string;
  grams: number;
};

export type RecipeStep = {
  title: string;
  detail: string;
};

export type TimingRule = 'pre-workout-2h' | 'post-workout' | 'pre-or-post-workout';

export type Meal = {
  id: string;
  type: MealType;
  label: string;
  title: string;
  baseTime: string;
  timingRule?: TimingRule;
  ingredients: Ingredient[];
  steps: RecipeStep[];
};

export type MenuDay = {
  day: number;
  meals: Meal[];
};

const step = (title: string, detail: string): RecipeStep => ({ title, detail });
const ingredient = (name: string, grams: number): Ingredient => ({ name, grams });

export const menu: MenuDay[] = [
  {
    day: 1,
    meals: [
      {
        id: 'd1-breakfast', type: 'breakfast', label: 'Desayuno', baseTime: '07:00',
        title: 'Skyr con fruta y tostada de atún',
        ingredients: [ingredient('Yogur skyr natural', 150), ingredient('Fruta', 155), ingredient('Pan', 50), ingredient('Atún al natural', 56), ingredient('Aceite de oliva', 5)],
        steps: [step('Prepara el bol', 'Sirve el skyr y corta la fruta en trozos.'), step('Tuesta el pan', 'Tuesta el pan hasta que quede dorado.'), step('Termina la tostada', 'Escurre el atún, colócalo sobre el pan y añade el aceite.')],
      },
      {
        id: 'd1-snack', type: 'snack', label: 'Media mañana', baseTime: '11:30',
        title: 'Frutos secos, plátano y montado de pavo',
        ingredients: [ingredient('Frutos secos', 30), ingredient('Plátano', 160), ingredient('Pan', 50), ingredient('Jamón cocido o pavo', 40)],
        steps: [step('Prepara el montado', 'Abre el pan y coloca el jamón cocido o el pavo.'), step('Añade la fruta', 'Pela el plátano y sírvelo con los frutos secos.'), step('Guarda o sirve', 'Llévalo en un recipiente o tómalo al momento.')],
      },
      {
        id: 'd1-lunch', type: 'lunch', label: 'Almuerzo', baseTime: '14:30',
        title: 'Macarrones boloñesa de pollo',
        ingredients: [ingredient('Macarrones cocidos', 80), ingredient('Pollo picado', 80), ingredient('Tomate natural', 80), ingredient('Pimiento rojo', 30), ingredient('Pimiento verde', 30), ingredient('Cebolla', 30), ingredient('Zanahoria', 25), ingredient('Manzana', 200)],
        steps: [step('Corta las verduras', 'Pica la cebolla, la zanahoria y los pimientos.'), step('Cocina la boloñesa', 'Saltea las verduras, incorpora el pollo y añade el tomate.'), step('Cuece y mezcla', 'Cuece los macarrones, escúrrelos y mézclalos con la salsa.'), step('Sirve', 'Pesa la ración y acompaña con la manzana.')],
      },
      {
        id: 'd1-afternoon', type: 'afternoon', label: 'Merienda', baseTime: '17:30', timingRule: 'pre-or-post-workout',
        title: 'Yogur recovery y tostada de pavo',
        ingredients: [ingredient('Yogur skyr', 150), ingredient('Leche desnatada', 150), ingredient('Copos de maíz', 40), ingredient('Canela', 2), ingredient('Pan', 50), ingredient('Jamón cocido o pavo', 40), ingredient('Aceite de oliva', 5)],
        steps: [step('Monta el yogur', 'Mezcla el yogur, la leche, los copos y la canela.'), step('Prepara la tostada', 'Tuesta el pan y añade el pavo.'), step('Termina', 'Añade el aceite sobre la tostada y sirve.')],
      },
      {
        id: 'd1-dinner', type: 'dinner', label: 'Cena', baseTime: '21:30',
        title: 'Tortilla de patata y verdura con guisantes',
        ingredients: [ingredient('Verdura', 150), ingredient('Patata', 100), ingredient('Huevo', 100), ingredient('Guisantes con cebolla', 135), ingredient('Pan integral', 60), ingredient('Plátano', 160)],
        steps: [step('Cocina la patata', 'Corta la patata y cocínala hasta que esté tierna.'), step('Haz la tortilla', 'Añade la verdura y el huevo batido y cuaja por ambos lados.'), step('Rehoga los guisantes', 'Calienta los guisantes con cebolla.'), step('Sirve', 'Acompaña con el pan y el plátano.')],
      },
    ],
  },
  {
    day: 2,
    meals: [
      {
        id: 'd2-breakfast', type: 'breakfast', label: 'Desayuno', baseTime: '07:00',
        title: 'Tostada de pavo, leche, cereales y uvas',
        ingredients: [ingredient('Pan', 50), ingredient('Jamón cocido o pavo', 40), ingredient('Aceite de oliva', 5), ingredient('Leche desnatada', 300), ingredient('Cereales', 30), ingredient('Uvas', 120)],
        steps: [step('Prepara la tostada', 'Tuesta el pan, añade el pavo y termina con aceite.'), step('Sirve los cereales', 'Pon los cereales en un bol y añade la leche.'), step('Añade la fruta', 'Lava las uvas y sírvelas aparte.')],
      },
      {
        id: 'd2-snack', type: 'snack', label: 'Media mañana', baseTime: '11:30',
        title: 'Dos frutas y anacardos',
        ingredients: [ingredient('Fruta variada', 370), ingredient('Anacardos', 30)],
        steps: [step('Elige la fruta', 'Escoge dos piezas medianas según las equivalencias del plan.'), step('Lava y prepara', 'Lava o pela la fruta y sírvela con los anacardos.')],
      },
      {
        id: 'd2-lunch', type: 'lunch', label: 'Almuerzo', baseTime: '14:30',
        title: 'Garbanzos con espinacas y tortilla con queso',
        ingredients: [ingredient('Garbanzos cocidos', 200), ingredient('Espinacas', 150), ingredient('Patata cocida', 150), ingredient('Huevo', 120), ingredient('Queso de Burgos 0%', 65), ingredient('Pera', 170)],
        steps: [step('Cocina el guiso', 'Calienta los garbanzos con las espinacas y la patata.'), step('Haz la tortilla', 'Bate el huevo, añade el queso y cuaja la tortilla.'), step('Sirve', 'Reparte ambas preparaciones y termina con la pera.')],
      },
      {
        id: 'd2-afternoon', type: 'afternoon', label: 'Merienda', baseTime: '17:30',
        title: 'Tostada de pavo y batido de plátano',
        ingredients: [ingredient('Pan', 50), ingredient('Jamón cocido o pavo', 40), ingredient('Aceite de oliva', 5), ingredient('Yogur natural', 125), ingredient('Plátano', 106), ingredient('Leche desnatada', 125), ingredient('Cereales', 30)],
        steps: [step('Prepara la tostada', 'Tuesta el pan, añade el pavo y el aceite.'), step('Tritura el batido', 'Mezcla el yogur, el plátano, la leche y los cereales.'), step('Sirve', 'Toma ambas preparaciones juntas.')],
      },
      {
        id: 'd2-dinner', type: 'dinner', label: 'Cena', baseTime: '21:30',
        title: 'Salmón con verduras y patatas asadas',
        ingredients: [ingredient('Salmón', 200), ingredient('Verduras', 170), ingredient('Patata', 250), ingredient('Yogur skyr', 150), ingredient('Fruta', 86), ingredient('Miel', 10), ingredient('Salsa de soja', 5)],
        steps: [step('Asa las patatas', 'Corta la patata y ásala al horno o al microondas.'), step('Cocina el salmón', 'Haz el salmón con las verduras y un toque de soja.'), step('Prepara el postre', 'Mezcla el skyr con la fruta y la miel.'), step('Sirve', 'Reparte el salmón, las verduras y las patatas.')],
      },
    ],
  },
  {
    day: 3,
    meals: [
      {
        id: 'd3-breakfast', type: 'breakfast', label: 'Desayuno', baseTime: '07:00',
        title: 'Skyr con fruta y tostada de jamón serrano',
        ingredients: [ingredient('Yogur skyr', 150), ingredient('Fruta', 155), ingredient('Pan', 50), ingredient('Jamón serrano', 50), ingredient('Tomate', 5)],
        steps: [step('Prepara el bol', 'Sirve el skyr con la fruta cortada.'), step('Monta la tostada', 'Tuesta el pan y añade el jamón y el tomate.'), step('Sirve', 'Toma ambas preparaciones juntas.')],
      },
      {
        id: 'd3-snack', type: 'snack', label: 'Media mañana', baseTime: '11:30',
        title: 'Pera, nueces y montado de pavo',
        ingredients: [ingredient('Pera', 170), ingredient('Nueces', 20), ingredient('Pan', 50), ingredient('Jamón cocido o pavo', 40)],
        steps: [step('Monta el bocadillo', 'Coloca el jamón o el pavo dentro del pan.'), step('Prepara la fruta', 'Lava la pera y sírvela con las nueces.')],
      },
      {
        id: 'd3-lunch', type: 'lunch', label: 'Almuerzo', baseTime: '14:30',
        title: 'Lentejas guisadas y ensalada de atún',
        ingredients: [ingredient('Lentejas cocidas', 252), ingredient('Verduras', 252), ingredient('Tomate', 110), ingredient('Atún al natural', 60)],
        steps: [step('Cocina las lentejas', 'Calienta las lentejas con las verduras hasta integrar el guiso.'), step('Haz la ensalada', 'Corta el tomate y añade el atún escurrido.'), step('Sirve', 'Reparte las lentejas y acompaña con la ensalada.')],
      },
      {
        id: 'd3-afternoon', type: 'afternoon', label: 'Merienda', baseTime: '17:30',
        title: 'Batido proteico de plátano y cacao',
        ingredients: [ingredient('Leche desnatada', 250), ingredient('Plátano', 125), ingredient('Proteína de suero', 30), ingredient('Coco rallado', 20), ingredient('Cacao', 3)],
        steps: [step('Añade los ingredientes', 'Pon la leche, el plátano, la proteína, el cacao y el coco en la batidora.'), step('Tritura', 'Bate hasta obtener una textura uniforme.'), step('Sirve', 'Tómalo recién preparado.')],
      },
      {
        id: 'd3-dinner', type: 'dinner', label: 'Cena', baseTime: '21:30',
        title: 'Merluza con verduras y patata al horno',
        ingredients: [ingredient('Merluza', 150), ingredient('Patata', 150), ingredient('Tomate', 36), ingredient('Cebolla', 36), ingredient('Zanahoria', 35), ingredient('Aceite de oliva', 5)],
        steps: [step('Prepara la bandeja', 'Corta la patata y las verduras y colócalas en una bandeja.'), step('Hornea', 'Añade la merluza y hornea hasta que el pescado esté cocinado.'), step('Sirve', 'Pesa la ración y añade el aceite indicado.')],
      },
      {
        id: 'd3-late', type: 'late', label: 'Resopón', baseTime: '22:30',
        title: 'Skyr con una pieza de fruta',
        ingredients: [ingredient('Yogur skyr', 150), ingredient('Fruta', 155)],
        steps: [step('Prepara', 'Sirve el skyr en un bol y añade la fruta troceada.'), step('Termina', 'Mezcla y toma al momento.')],
      },
    ],
  },
  {
    day: 4,
    meals: [
      {
        id: 'd4-breakfast', type: 'breakfast', label: 'Desayuno', baseTime: '07:00',
        title: 'Cereales con leche y tostada de pavo',
        ingredients: [ingredient('Cereales', 30), ingredient('Leche desnatada', 300), ingredient('Uvas', 120), ingredient('Pan', 50), ingredient('Jamón cocido o pavo', 40), ingredient('Aceite de oliva', 5)],
        steps: [step('Sirve los cereales', 'Añade la leche a los cereales.'), step('Prepara la tostada', 'Tuesta el pan, añade el pavo y el aceite.'), step('Añade las uvas', 'Lava la fruta y sirve todo junto.')],
      },
      {
        id: 'd4-snack', type: 'snack', label: 'Media mañana', baseTime: '11:30',
        title: 'Dos piezas de fruta',
        ingredients: [ingredient('Fruta variada', 370)],
        steps: [step('Elige', 'Escoge dos piezas medianas según las equivalencias del plan.'), step('Lava y sirve', 'Lava o pela la fruta y tómala al momento.')],
      },
      {
        id: 'd4-lunch', type: 'lunch', label: 'Almuerzo', baseTime: '14:30',
        title: 'Arroz con verduras, gambas y huevo',
        ingredients: [ingredient('Arroz cocido', 250), ingredient('Calabacín', 60), ingredient('Guisantes', 60), ingredient('Zanahoria', 60), ingredient('Gambas', 60), ingredient('Jamón cocido', 40), ingredient('Huevo', 60), ingredient('Manzana', 200)],
        steps: [step('Corta las verduras', 'Trocea el calabacín y la zanahoria.'), step('Saltea', 'Cocina las verduras con las gambas y el jamón.'), step('Añade el huevo', 'Incorpora el huevo batido y después el arroz.'), step('Sirve', 'Pesa la ración y acompaña con la manzana.')],
      },
      {
        id: 'd4-afternoon', type: 'afternoon', label: 'Merienda', baseTime: '17:30',
        title: 'Yogur con frutos rojos, avena y proteína',
        ingredients: [ingredient('Yogur natural', 250), ingredient('Frutos rojos', 100), ingredient('Avena', 60), ingredient('Miel', 10), ingredient('Leche desnatada', 125), ingredient('Proteína de suero', 15)],
        steps: [step('Monta el bol', 'Sirve el yogur con los frutos rojos y la avena.'), step('Añade la leche', 'Incorpora la leche y mezcla.'), step('Termina', 'Añade la proteína y la miel.')],
      },
      {
        id: 'd4-dinner', type: 'dinner', label: 'Cena', baseTime: '21:30',
        title: 'Sopa de fideos y wok de ternera',
        ingredients: [ingredient('Sopa de fideos', 295), ingredient('Ternera', 150), ingredient('Pimientos', 75), ingredient('Cebolla', 75), ingredient('Salsa de soja', 9), ingredient('Pan integral', 40)],
        steps: [step('Calienta la sopa', 'Prepara la sopa de fideos hasta que esté caliente.'), step('Saltea la ternera', 'Cocina la ternera con los pimientos y la cebolla.'), step('Añade la soja', 'Incorpora la salsa y mezcla el wok.'), step('Sirve', 'Acompaña con el pan integral.')],
      },
    ],
  },
  {
    day: 5,
    meals: [
      {
        id: 'd5-breakfast', type: 'breakfast', label: 'Desayuno', baseTime: '07:00',
        title: 'Tostada de aguacate y pavo con skyr',
        ingredients: [ingredient('Pan', 50), ingredient('Aguacate', 40), ingredient('Jamón cocido', 40), ingredient('Yogur skyr', 150), ingredient('Fruta', 155)],
        steps: [step('Monta la tostada', 'Tuesta el pan, aplasta el aguacate y añade el jamón.'), step('Prepara el bol', 'Sirve el skyr y añade la fruta.'), step('Sirve', 'Toma ambas preparaciones juntas.')],
      },
      {
        id: 'd5-snack', type: 'snack', label: 'Media mañana', baseTime: '11:30',
        title: 'Nueces, plátano y montado de pavo',
        ingredients: [ingredient('Nueces', 30), ingredient('Plátano', 160), ingredient('Pan', 50), ingredient('Jamón cocido o pavo', 40)],
        steps: [step('Prepara el montado', 'Coloca el pavo dentro del pan.'), step('Añade fruta y frutos secos', 'Pela el plátano y sírvelo con las nueces.')],
      },
      {
        id: 'd5-lunch', type: 'lunch', label: 'Almuerzo', baseTime: '14:30',
        title: 'Macarrones con verduras y sepia',
        ingredients: [ingredient('Pasta cocida', 200), ingredient('Sepia', 150), ingredient('Pimientos', 30), ingredient('Berenjena', 25), ingredient('Cebolla', 25), ingredient('Pera', 170)],
        steps: [step('Corta las verduras', 'Trocea los pimientos, la berenjena y la cebolla.'), step('Cocina la sepia', 'Saltea la sepia y añade las verduras.'), step('Añade la pasta', 'Incorpora los macarrones cocidos y mezcla.'), step('Sirve', 'Pesa la ración y termina con la pera.')],
      },
      {
        id: 'd5-afternoon', type: 'afternoon', label: 'Merienda', baseTime: '17:30',
        title: 'Montado de jamón y queso con fruta',
        ingredients: [ingredient('Pan', 50), ingredient('Jamón cocido', 50), ingredient('Queso fresco 0%', 50), ingredient('Fruta variada', 370)],
        steps: [step('Monta el bocadillo', 'Abre el pan y añade el jamón y el queso.'), step('Prepara la fruta', 'Lava o pela las dos piezas de fruta.'), step('Sirve', 'Toma el montado con la fruta.')],
      },
      {
        id: 'd5-dinner', type: 'dinner', label: 'Cena', baseTime: '21:30',
        title: 'Pizza casera de verduras y atún',
        ingredients: [ingredient('Masa de pizza', 90), ingredient('Tomate', 30), ingredient('Verduras', 35), ingredient('Atún al natural', 32)],
        steps: [step('Prepara la base', 'Extiende la masa y añade el tomate.'), step('Añade la cobertura', 'Reparte las verduras y el atún.'), step('Hornea', 'Hornea hasta que la base esté cocinada y los bordes dorados.'), step('Sirve', 'Corta la ración indicada.')],
      },
      {
        id: 'd5-late', type: 'late', label: 'Resopón', baseTime: '22:30',
        title: 'Skyr natural con miel',
        ingredients: [ingredient('Yogur skyr', 150), ingredient('Miel', 10)],
        steps: [step('Sirve', 'Pon el skyr en un bol.'), step('Termina', 'Añade la miel y mezcla.')],
      },
    ],
  },
  {
    day: 6,
    meals: [
      {
        id: 'd6-breakfast', type: 'breakfast', label: 'Desayuno', baseTime: '08:00', timingRule: 'pre-workout-2h',
        title: 'Tostada de pavo, leche, maíz y naranja',
        ingredients: [ingredient('Pan', 40), ingredient('Jamón cocido o pavo', 40), ingredient('Aceite de oliva', 5), ingredient('Leche desnatada', 250), ingredient('Copos de maíz', 30), ingredient('Naranja', 225)],
        steps: [step('Prepara la tostada', 'Tuesta el pan, añade el pavo y el aceite.'), step('Sirve los cereales', 'Añade la leche a los copos de maíz.'), step('Prepara la naranja', 'Pela la naranja y sirve todo junto.')],
      },
      {
        id: 'd6-snack', type: 'snack', label: 'Media mañana', baseTime: '11:30', timingRule: 'post-workout',
        title: 'Batido de frutas y cacahuete',
        ingredients: [ingredient('Leche desnatada', 250), ingredient('Proteína de suero', 10), ingredient('Fresas', 80), ingredient('Mango', 80), ingredient('Manzana', 145), ingredient('Cacahuete en polvo', 25), ingredient('Miel', 10)],
        steps: [step('Prepara la fruta', 'Lava y corta las fresas, el mango y la manzana.'), step('Tritura', 'Añade la leche, la proteína, el cacahuete y la miel y bate.'), step('Sirve', 'Tómalo después del entrenamiento.')],
      },
      {
        id: 'd6-lunch', type: 'lunch', label: 'Almuerzo', baseTime: '14:30',
        title: 'Puré de verduras y alitas al horno',
        ingredients: [ingredient('Puré de verduras', 340), ingredient('Alitas de pollo', 220), ingredient('Escalivada de verduras', 127), ingredient('Patata panadera', 127)],
        steps: [step('Prepara la bandeja', 'Coloca las alitas, la patata y las verduras en una bandeja.'), step('Hornea', 'Cocina hasta que el pollo esté hecho y la patata tierna.'), step('Calienta el puré', 'Calienta el puré de verduras.'), step('Sirve', 'Reparte ambas preparaciones.')],
      },
      {
        id: 'd6-afternoon', type: 'afternoon', label: 'Merienda', baseTime: '17:30',
        title: 'Skyr con fruta y chocolate negro',
        ingredients: [ingredient('Yogur skyr', 150), ingredient('Piña', 50), ingredient('Mango', 49), ingredient('Chocolate negro', 20)],
        steps: [step('Corta la fruta', 'Trocea la piña y el mango.'), step('Monta el bol', 'Añade la fruta al skyr.'), step('Termina', 'Trocea el chocolate y repártelo por encima.')],
      },
      {
        id: 'd6-dinner', type: 'dinner', label: 'Cena', baseTime: '21:30',
        title: 'Arepas rellenas de pollo',
        ingredients: [ingredient('Arepa', 120), ingredient('Pollo cocinado', 100), ingredient('Verduras', 60)],
        steps: [step('Cocina la arepa', 'Dora la arepa por ambos lados hasta que esté cocinada.'), step('Prepara el relleno', 'Desmenuza el pollo y mézclalo con las verduras.'), step('Rellena', 'Abre la arepa, añade el relleno y sirve.')],
      },
    ],
  },
  {
    day: 7,
    meals: [
      {
        id: 'd7-breakfast', type: 'breakfast', label: 'Desayuno', baseTime: '08:00',
        title: 'Yogur con frutos rojos y avena',
        ingredients: [ingredient('Yogur natural', 250), ingredient('Frutos rojos', 100), ingredient('Avena', 60), ingredient('Miel', 10), ingredient('Leche desnatada', 125)],
        steps: [step('Pon los yogures', 'Sirve los yogures en un bol.'), step('Añade la fruta', 'Lava los frutos rojos y colócalos encima.'), step('Termina el bol', 'Añade la avena, la leche y la miel y mezcla.')],
      },
      {
        id: 'd7-snack', type: 'snack', label: 'Media mañana', baseTime: '11:30',
        title: 'Dos piezas de fruta',
        ingredients: [ingredient('Fruta variada', 370)],
        steps: [step('Elige dos frutas', 'Escoge dos piezas medianas según las equivalencias del plan.'), step('Lava y prepara', 'Lávalas y córtalas si lo necesitas.'), step('Sirve', 'Ponlas juntas en un plato o recipiente.')],
      },
      {
        id: 'd7-lunch', type: 'lunch', label: 'Almuerzo', baseTime: '14:30',
        title: 'Paella de conejo y ensalada de aguacate',
        ingredients: [ingredient('Paella de conejo', 500), ingredient('Tomate', 149), ingredient('Aguacate', 74), ingredient('Orégano', 1), ingredient('Albahaca', 1)],
        steps: [step('Prepara la paella', 'Calienta y sirve la ración indicada de paella.'), step('Corta la ensalada', 'Lava y corta el tomate y el aguacate.'), step('Aliña y sirve', 'Añade orégano y albahaca y acompaña la paella.')],
      },
      {
        id: 'd7-afternoon', type: 'afternoon', label: 'Merienda', baseTime: '17:30',
        title: 'Macedonia casera',
        ingredients: [ingredient('Fresa', 76), ingredient('Kiwi', 75), ingredient('Mandarina', 75), ingredient('Pera', 75)],
        steps: [step('Lava la fruta', 'Lava bien todas las piezas.'), step('Pela y corta', 'Quita las pieles necesarias y corta en trozos pequeños.'), step('Mezcla', 'Pon toda la fruta en un bol y mezcla con una cuchara.')],
      },
      {
        id: 'd7-dinner', type: 'dinner', label: 'Cena', baseTime: '21:30',
        title: 'Puré de calabacín y emperador a la plancha',
        ingredients: [ingredient('Puré de calabacín', 320), ingredient('Emperador', 188), ingredient('Limón', 5), ingredient('Aceite de oliva', 5)],
        steps: [step('Calienta el puré', 'Calienta el puré de calabacín hasta que esté listo.'), step('Cocina el pescado', 'Haz el emperador a la plancha con el aceite indicado.'), step('Añade limón', 'Sirve el pescado junto al puré y termina con limón.')],
      },
      {
        id: 'd7-late', type: 'late', label: 'Resopón', baseTime: '22:30',
        title: 'Skyr natural con kiwi',
        ingredients: [ingredient('Yogur skyr', 150), ingredient('Kiwi', 86)],
        steps: [step('Pon el yogur', 'Sirve el yogur skyr en un bol.'), step('Prepara el kiwi', 'Pela el kiwi y córtalo en trozos.'), step('Junta y sirve', 'Añade el kiwi al yogur.')],
      },
    ],
  },
];

export const allMeals = menu.flatMap((day) => day.meals);
