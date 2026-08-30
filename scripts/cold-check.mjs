import assert from 'node:assert/strict';
import { allMeals, menu } from '../app/data.ts';
import { getIsoWeekKey, getWeeklyRecommendation } from '../app/recommendations.ts';

assert.equal(menu.length, 7, 'El menú debe contener siete días');
assert.ok(allMeals.length > 0, 'El menú no puede estar vacío');
assert.equal(new Set(allMeals.map((meal) => meal.id)).size, allMeals.length, 'Los identificadores de comida deben ser únicos');

const dates = [new Date('2026-08-30T12:00:00Z'), new Date('2026-08-31T12:00:00Z')];
assert.equal(getIsoWeekKey(dates[0]), '2026-W35');
assert.equal(getIsoWeekKey(dates[1]), '2026-W36');

for (const [dayIndex, day] of menu.entries()) {
  assert.equal(day.day, dayIndex + 1, 'Los días deben estar ordenados');
  assert.ok(day.meals.length >= 5, `El día ${day.day} debe tener al menos cinco comidas`);

  for (const meal of day.meals) {
    assert.ok(/^\d{2}:\d{2}$/.test(meal.baseTime), `${meal.id} debe tener una hora válida`);
    assert.ok(meal.ingredients.length > 0, `${meal.id} debe tener ingredientes`);
    assert.ok(meal.steps.length > 0, `${meal.id} debe tener pasos`);
    assert.ok(meal.ingredients.every((item) => item.name.trim() && item.grams > 0), `${meal.id} contiene una cantidad no válida`);

    const recommendation = getWeeklyRecommendation(meal, dates[1]);
    assert.equal(recommendation.mealId, meal.id);
    assert.equal(recommendation.weekKey, '2026-W36');
    assert.ok(recommendation.title.trim(), `${meal.id} necesita un título semanal`);
    assert.ok(recommendation.sourceTitle.trim(), `${meal.id} necesita una fuente identificada`);
    assert.match(recommendation.sourceUrl, /^https:\/\//, `${meal.id} necesita una fuente HTTPS`);
    assert.ok(recommendation.steps.length >= 3, `${meal.id} necesita instrucciones completas`);
    assert.deepEqual(recommendation.ingredients, meal.ingredients, `${meal.id} alteró ingredientes o gramos`);

    const serialized = JSON.stringify({ ...recommendation, day: day.day, mealLabel: meal.label, savedAt: dates[1].toISOString() });
    assert.deepEqual(JSON.parse(serialized).ingredients, meal.ingredients, `${meal.id} no conserva los gramos al guardarse`);
  }
}
