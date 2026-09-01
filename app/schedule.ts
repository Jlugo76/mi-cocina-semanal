import type { Meal, MealType } from './data';

export type ScheduledMeal = Meal & {
  suggested: number;
  actual?: number;
  shiftedByCompletion: boolean;
  timingRuleApplied: boolean;
};

const minimumGap: Record<MealType, number> = {
  breakfast: 0,
  snack: 120,
  lunch: 150,
  afternoon: 120,
  dinner: 120,
  late: 60,
};

export function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

export function toTime(value: number) {
  const minutes = ((value % 1440) + 1440) % 1440;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

function plannedTime(meal: Meal, training: number, dinnerTime?: number) {
  const base = toMinutes(meal.baseTime);
  const isMorningWorkout = training < 14 * 60;

  if (meal.timingRule === 'pre-workout-2h' && isMorningWorkout) return { time: training - 120, applied: true };
  if (meal.timingRule === 'post-workout' && isMorningWorkout) return { time: training + 120, applied: true };
  if (meal.timingRule === 'pre-or-post-workout') return { time: training < 18 * 60 ? training + 120 : training - 120, applied: true };
  if (meal.type === 'afternoon') return { time: training - 120, applied: true };
  if (meal.type === 'dinner') return { time: Math.max(base, training + 120), applied: true };
  if (meal.type === 'late') return { time: Math.max(base, (dinnerTime ?? base - 60) + 60, training + 180), applied: true };
  return { time: base, applied: false };
}

export function buildSchedule(
  meals: Meal[],
  trainingTime: string,
  actualFor: (meal: Meal) => number | undefined,
): ScheduledMeal[] {
  const training = toMinutes(trainingTime);
  const result: ScheduledMeal[] = [];
  let rollingTime: number | undefined;
  let hasCompletionAnchor = false;

  for (const meal of meals) {
    const dinnerTime = result.find((entry) => entry.type === 'dinner')?.suggested;
    const plan = plannedTime(meal, training, dinnerTime);
    const actual = actualFor(meal);
    let suggested = plan.time;
    let shiftedByCompletion = false;

    if (hasCompletionAnchor && typeof rollingTime === 'number') {
      const earliest = rollingTime + minimumGap[meal.type];
      if (earliest > suggested) {
        suggested = earliest;
        shiftedByCompletion = true;
      }
    }

    if (typeof actual === 'number') {
      rollingTime = actual;
      hasCompletionAnchor = true;
    } else if (hasCompletionAnchor) {
      rollingTime = suggested;
    }

    result.push({ ...meal, suggested, actual, shiftedByCompletion, timingRuleApplied: plan.applied });
  }

  return result;
}
