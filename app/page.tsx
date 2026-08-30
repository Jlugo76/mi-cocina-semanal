'use client';

import {
  Apple,
  ArrowLeft,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Coffee,
  CookingPot,
  Dumbbell,
  GlassWater,
  Minus,
  Moon,
  Plus,
  Scale,
  Sun,
  Timer,
  Utensils,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { allMeals, Meal, MealType, menu } from './data';

type View = 'day' | 'week' | 'training' | 'recipes' | 'guide';
type CompletionMap = Record<string, number>;

const STORAGE_KEY = 'mi-cocina-state-v1';
const defaultTraining = Array.from({ length: 7 }, () => '19:30');
const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function toTime(value: number) {
  const minutes = ((value % 1440) + 1440) % 1440;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

function isoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getMonday(date: Date) {
  const result = new Date(date);
  const day = result.getDay() || 7;
  result.setDate(result.getDate() - day + 1);
  result.setHours(12, 0, 0, 0);
  return result;
}

function MealGlyph({ type }: { type: MealType }) {
  const props = { size: 20, strokeWidth: 2 };
  if (type === 'breakfast') return <Coffee {...props} />;
  if (type === 'snack') return <Apple {...props} />;
  if (type === 'lunch') return <Utensils {...props} />;
  if (type === 'afternoon') return <GlassWater {...props} />;
  if (type === 'dinner') return <CookingPot {...props} />;
  return <Moon {...props} />;
}

export default function Home() {
  const today = useMemo(() => new Date(), []);
  const todayIndex = (today.getDay() + 6) % 7;
  const weekDates = useMemo(() => {
    const monday = getMonday(today);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  }, [today]);

  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [view, setView] = useState<View>('day');
  const [trainingTimes, setTrainingTimes] = useState(defaultTraining);
  const [completed, setCompleted] = useState<CompletionMap>({});
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [servings, setServings] = useState(1);
  const [finishedSteps, setFinishedSteps] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { trainingTimes?: string[]; completed?: CompletionMap };
        if (Array.isArray(parsed.trainingTimes) && parsed.trainingTimes.length === 7) setTrainingTimes(parsed.trainingTimes);
        if (parsed.completed) setCompleted(parsed.completed);
      }
    } catch {
      // Local preferences are optional.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ trainingTimes, completed }));
  }, [completed, ready, trainingTimes]);

  const selectedMenu = menu[selectedDay];
  const selectedDate = weekDates[selectedDay];
  const selectedDateKey = isoDate(selectedDate);

  function completionKey(meal: Meal, dayIndex = selectedDay) {
    return `${isoDate(weekDates[dayIndex])}:${meal.id}`;
  }

  function scheduleFor(dayIndex: number) {
    const dayMenu = menu[dayIndex];
    const training = toMinutes(trainingTimes[dayIndex]);
    let adjustment = 0;

    return dayMenu.meals.map((meal) => {
      let suggested = toMinutes(meal.baseTime) + adjustment;
      if (meal.type === 'afternoon') suggested = training - 120;
      if (meal.type === 'dinner') suggested = training + 120;
      if (meal.type === 'late') suggested = Math.max(suggested, training + 180);

      const actual = completed[completionKey(meal, dayIndex)];
      if (typeof actual === 'number' && meal.type !== 'afternoon' && meal.type !== 'dinner' && meal.type !== 'late') {
        adjustment = Math.max(-60, Math.min(120, actual - suggested));
      }
      return { ...meal, suggested, actual };
    });
  }

  const scheduledMeals = scheduleFor(selectedDay);
  const nextMeal = scheduledMeals.find((meal) => typeof meal.actual !== 'number');

  function toggleMeal(meal: Meal, suggested: number) {
    const key = completionKey(meal);
    setCompleted((current) => {
      const copy = { ...current };
      if (typeof copy[key] === 'number') {
        delete copy[key];
      } else {
        const now = new Date();
        copy[key] = selectedDay === todayIndex ? now.getHours() * 60 + now.getMinutes() : suggested;
      }
      return copy;
    });
  }

  function changeTraining(value: string) {
    if (!value) return;
    setTrainingTimes((current) => current.map((time, index) => index === selectedDay ? value : time));
  }

  function openMeal(meal: Meal) {
    setActiveMeal(meal);
    setServings(1);
    setFinishedSteps([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectDay(index: number) {
    setSelectedDay(index);
    setView('day');
    setActiveMeal(null);
  }

  function changeView(next: View) {
    setView(next);
    setActiveMeal(null);
    if (next === 'day') setSelectedDay(todayIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const weekLabel = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' });
  const totalRecipeWeight = activeMeal
    ? activeMeal.ingredients.reduce((sum, item) => sum + item.grams, 0) * servings
    : 0;

  return (
    <main className="app-shell">
      <div className={`app-frame ${activeMeal ? 'recipe-active' : ''}`}>
        <header className="topbar">
          <div className="brand-mark" aria-hidden="true"><CookingPot size={22} /></div>
          <div className="brand-copy">
            <strong>Mi cocina</strong>
            <span>{weekLabel.format(weekDates[0])} - {weekLabel.format(weekDates[6])}</span>
          </div>
          <button className="icon-button" type="button" aria-label="Avisos"><Bell size={19} /></button>
        </header>

        <nav className="week-strip" aria-label="Días de la semana">
          {weekDates.map((date, index) => (
            <button
              key={isoDate(date)}
              type="button"
              aria-label={`${dayNames[index]}, ${date.getDate()}`}
              aria-pressed={selectedDay === index}
              onClick={() => selectDay(index)}
            >
              <span>{dayNames[index].charAt(0)}</span>
              <strong>{date.getDate()}</strong>
            </button>
          ))}
        </nav>

        <section className="main-surface">
          {activeMeal ? (
            <section className="recipe-view" aria-label={`Receta de ${activeMeal.title}`}>
              <header className="recipe-header">
                <button className="icon-button" type="button" aria-label="Volver" onClick={() => setActiveMeal(null)}>
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <span>{activeMeal.label}</span>
                  <h1>{activeMeal.title}</h1>
                </div>
              </header>

              <div className={`recipe-hero ${activeMeal.type}`}>
                <MealGlyph type={activeMeal.type} />
                <span>{activeMeal.title}</span>
              </div>

              <div className="recipe-meta">
                <span><Scale size={18} /> {totalRecipeWeight} g</span>
                <div className="servings-control" aria-label="Número de personas">
                  <button type="button" aria-label="Restar una persona" disabled={servings === 1} onClick={() => setServings((count) => Math.max(1, count - 1))}><Minus size={18} /></button>
                  <strong>{servings} {servings === 1 ? 'persona' : 'personas'}</strong>
                  <button type="button" aria-label="Sumar una persona" disabled={servings === 8} onClick={() => setServings((count) => Math.min(8, count + 1))}><Plus size={18} /></button>
                </div>
                <span><Timer size={18} /> Preparación guiada</span>
              </div>

              <section className="ingredients-section">
                <h2>Prepara esto</h2>
                <ul className="ingredient-list">
                  {activeMeal.ingredients.map((item) => (
                    <li key={item.name}>
                      <span>{item.name}</span>
                      <strong>{item.grams * servings} g</strong>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="steps-section">
                <h2>Paso a paso</h2>
                <div className="steps-list">
                  {activeMeal.steps.map((item, index) => {
                    const finished = finishedSteps.includes(index);
                    return (
                      <button
                        key={item.title}
                        type="button"
                        className={finished ? 'is-finished' : ''}
                        aria-pressed={finished}
                        onClick={() => setFinishedSteps((current) => current.includes(index) ? current.filter((step) => step !== index) : [...current, index])}
                      >
                        <span className="step-number">{finished ? <Check size={18} /> : index + 1}</span>
                        <span><strong>{item.title}</strong><span>{item.detail}</span></span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </section>
          ) : view === 'day' ? (
            <section className="day-view">
              <div className="day-heading">
                <div>
                  <span>{dayNames[selectedDay]}, {selectedDate.getDate()}</span>
                  <h1>{selectedDay === todayIndex ? 'Hoy' : `Día ${selectedMenu.day}`}</h1>
                </div>
                <span>Día {selectedMenu.day} del menú</span>
              </div>

              <TrainingCard
                time={trainingTimes[selectedDay]}
                onChange={changeTraining}
              />

              <div className="next-card" aria-live="polite">
                <Clock3 size={19} />
                <div>
                  <span>Lo siguiente</span>
                  <strong>{nextMeal ? `${toTime(nextMeal.suggested)} · ${nextMeal.label} · ${nextMeal.title}` : 'Todo listo por hoy'}</strong>
                </div>
              </div>

              <div className="meal-list">
                {scheduledMeals.map((meal) => {
                  const done = typeof meal.actual === 'number';
                  return (
                    <article className={`meal-row ${done ? 'is-done' : ''}`} key={meal.id}>
                      <button
                        className="done-button"
                        type="button"
                        aria-label={`${done ? 'Desmarcar' : 'Marcar'} ${meal.label}`}
                        aria-pressed={done}
                        onClick={() => toggleMeal(meal, meal.suggested)}
                      >
                        {done ? <Check size={20} /> : null}
                      </button>
                      <button className="meal-open" type="button" aria-label={`Abrir receta de ${meal.title}`} onClick={() => openMeal(meal)}>
                        <span className={`meal-symbol ${meal.type}`}><MealGlyph type={meal.type} /></span>
                        <span className="meal-copy">
                          <span><strong>{meal.label}</strong> {done ? `Hecho ${toTime(meal.actual as number)}` : `aprox. ${toTime(meal.suggested)}`}</span>
                          <span>{meal.title}</span>
                        </span>
                        <ChevronRight size={18} aria-hidden="true" />
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : view === 'week' ? (
            <section className="week-view">
              <div className="section-heading">
                <span>Menú que se repite cada semana</span>
                <h1>Semana completa</h1>
              </div>
              <div className="week-overview">
                {menu.map((dayMenu, index) => (
                  <section key={dayMenu.day} className="week-day-block">
                    <button type="button" className="week-day-heading" onClick={() => selectDay(index)}>
                      <span><strong>{dayNames[index]}</strong><span>{weekDates[index].getDate()} · Día {dayMenu.day}</span></span>
                      <ChevronRight size={20} />
                    </button>
                    <div>
                      {scheduleFor(index).map((meal) => (
                        <button type="button" key={meal.id} onClick={() => openMeal(meal)}>
                          <span>{toTime(meal.suggested)}</span>
                          <strong>{meal.label}</strong>
                          <span>{meal.title}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>
          ) : view === 'training' ? (
            <section className="training-view">
              <div className="section-heading">
                <span>{dayNames[selectedDay]} · Día {selectedMenu.day}</span>
                <h1>Entrenamiento</h1>
              </div>
              <TrainingCard time={trainingTimes[selectedDay]} onChange={changeTraining} large />
              <div className="training-timeline">
                <TimelineItem icon={<GlassWater size={20} />} label="Merienda" time={toTime(toMinutes(trainingTimes[selectedDay]) - 120)} detail="Dos horas antes de salir" />
                <TimelineItem icon={<Dumbbell size={20} />} label="Entreno" time={trainingTimes[selectedDay]} detail="Hora de salida" active />
                <TimelineItem icon={<CookingPot size={20} />} label="Cena" time={toTime(toMinutes(trainingTimes[selectedDay]) + 120)} detail="Al volver a casa" />
              </div>
            </section>
          ) : view === 'recipes' ? (
            <section className="recipes-view">
              <div className="section-heading">
                <span>{allMeals.length} preparaciones del plan</span>
                <h1>Recetas</h1>
              </div>
              <div className="recipe-index">
                {menu.map((dayMenu) => (
                  <section key={dayMenu.day}>
                    <h2>Día {dayMenu.day}</h2>
                    {dayMenu.meals.map((meal) => (
                      <button type="button" key={meal.id} onClick={() => openMeal(meal)}>
                        <span className={`meal-symbol ${meal.type}`}><MealGlyph type={meal.type} /></span>
                        <span><strong>{meal.title}</strong><span>{meal.label} · {meal.ingredients.length} ingredientes</span></span>
                        <ChevronRight size={18} />
                      </button>
                    ))}
                  </section>
                ))}
              </div>
            </section>
          ) : (
            <section className="guide-view">
              <div className="section-heading">
                <span>Recordatorios del plan</span>
                <h1>Guía</h1>
              </div>
              <GuideItem title="Pesos de los platos" text="Las cantidades corresponden al alimento ya cocinado, salvo cuando el menú indique expresamente que el peso es en crudo." />
              <GuideItem title="Raciones" text="1 R significa una ración completa. Al cambiar el número de personas, el portal multiplica todos los ingredientes de la receta." />
              <GuideItem title="Fruta" text="Puedes cambiar una pieza mediana por dos mandarinas, dos kiwis, ocho fresas, doce uvas o 250 g de sandía o melón." />
              <GuideItem title="Verduras y aceite" text="Las verduras son libres salvo indicación. Usa aproximadamente 10 g de aceite en ensaladas y 5 g en preparaciones a la plancha." />
              <GuideItem title="Hidratación" text="Toma un vaso grande de agua al levantarte y llega bien hidratado al entrenamiento." />
              <GuideItem title="Suplementación" text="El documento indica 8 g diarios de creatina. Mantén siempre la pauta acordada con tu profesional y consulta cualquier cambio." />
            </section>
          )}
        </section>

        <nav className="bottom-nav" aria-label="Navegación principal">
          <NavButton label="Hoy" icon={<Sun size={20} />} active={view === 'day' && !activeMeal} onClick={() => changeView('day')} />
          <NavButton label="Semana" icon={<CalendarDays size={20} />} active={view === 'week'} onClick={() => changeView('week')} />
          <NavButton label="Entreno" icon={<Dumbbell size={20} />} active={view === 'training'} onClick={() => changeView('training')} />
          <NavButton label="Recetas" icon={<BookOpen size={20} />} active={view === 'recipes'} onClick={() => changeView('recipes')} />
          <NavButton label="Guía" icon={<CircleHelp size={20} />} active={view === 'guide'} onClick={() => changeView('guide')} />
        </nav>
      </div>
    </main>
  );
}

function TrainingCard({ time, onChange, large = false }: { time: string; onChange: (value: string) => void; large?: boolean }) {
  return (
    <section className={`training-card ${large ? 'is-large' : ''}`} aria-label="Horario de entrenamiento">
      <span className="training-icon"><Dumbbell size={21} /></span>
      <label htmlFor={large ? 'training-time-large' : 'training-time'}>
        <strong>Entreno</strong>
        <span>Hora de salida</span>
      </label>
      <input id={large ? 'training-time-large' : 'training-time'} type="time" value={time} onChange={(event) => onChange(event.target.value)} />
      <div className="training-related" aria-live="polite">
        <span>Merienda <strong>{toTime(toMinutes(time) - 120)}</strong></span>
        <span>Cena <strong>{toTime(toMinutes(time) + 120)}</strong></span>
      </div>
    </section>
  );
}

function TimelineItem({ icon, label, time, detail, active = false }: { icon: React.ReactNode; label: string; time: string; detail: string; active?: boolean }) {
  return (
    <div className={active ? 'is-active' : ''}>
      <span>{icon}</span>
      <span><strong>{label}</strong><span>{detail}</span></span>
      <strong>{time}</strong>
    </div>
  );
}

function GuideItem({ title, text }: { title: string; text: string }) {
  return <article className="guide-item"><h2>{title}</h2><p>{text}</p></article>;
}

function NavButton({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return <button type="button" aria-current={active ? 'page' : undefined} onClick={onClick}>{icon}<span>{label}</span></button>;
}
