'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from "next/image";
/* =========================
   Types & Helpers
========================= */
type Billing = 'monthly' | 'yearly';
type Goal = 'Yağ Kaybı' | 'Kas Gelişimi' | 'Kuvvet' | 'Genel Fitness';
type Equipment = 'Tam Salon' | 'Barbell + Dumbbell' | 'Ev · Bodyweight';
type Level = 'Başlangıç' | 'Orta' | 'İleri';

type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number; // TL/ay
  perks: string[];
  best?: boolean;
};

type SessionItem = { name: string; sets: number; reps: string };
type DayPlan = { title: string; focus: string[]; items: SessionItem[] };
type Program = {
  id: string;
  goal: Goal;
  days: number;
  equipment: Equipment;
  level: Level;
  createdAt: number;
  plan: DayPlan[];
  note?: string;
};

/* ---- Coaches & Classes (Adım 4-5) ---- */
type ClassType = 'HIIT' | 'Mobility' | 'Spinning' | 'Pilates' | 'Strength' | 'Yoga';
type Coach = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialties: ClassType[];
  bio: string;
};
type ClassSession = {
  id: string;
  title: string;
  type: ClassType;
  coachId: string;
  weekday: 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1=Pzt ... 7=Paz
  start: string; // 'HH:MM'
  durationMin: number;
  level: Level;
  room: string;
  capacity: number;
  enrolled: number;
};

const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Starter',
    tagline: 'Temel giriş seviyesi',
    monthly: 399,
    perks: ['Salon erişimi (09:00–22:00)', 'Haftada 2 grup dersi', 'Kilitlemeli dolap'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Daha fazla ders + esnek saatler',
    monthly: 599,
    perks: ['Salon erişimi (06:00–00:00)', 'Haftada 4 grup dersi', 'Aylık 1 InBody ölçüm', 'Sauna & Buhar'],
    best: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'PT dahil premium',
    monthly: 999,
    perks: ['24/7 erişim', 'Sınırsız grup dersleri', 'Aylık 2 InBody + beslenme', 'Aylık 2 PT seansı', 'Misafir girişi (ayda 2)'],
  },
];

const YEARLY_DISCOUNT = 0.2;
const STUDENT_DISCOUNT = 0.15;
const PROMO_CODE = 'FIT10';
const PROMO_DISCOUNT = 0.1;

const formatPrice = (n: number) => `₺${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;
const priceFor = (plan: Plan, billing: Billing) =>
  billing === 'monthly' ? plan.monthly : Math.round(plan.monthly * 12 * (1 - YEARLY_DISCOUNT));

/* =========================
   Exercise Library (by equipment) · Adım 3
========================= */
const LIB = {
  'Ev · Bodyweight': {
    push: ['Şınav', 'Eğimli Şınav', 'Pike Push-up', 'Dip (Bench)'],
    pull: ['Ters Barfiks (Masa Altı)', 'Superman Çekiş', 'Band Row (Varsa Elastik)'],
    legs: ['Vücut Ağırlığı Squat', 'Lunge', 'Bulgarian Split Squat', 'Kalf Raise'],
    hinge: ['Hip Hinge (BW)', 'Glute Bridge', 'Tek Bacak Glute Bridge'],
    core: ['Plank', 'Side Plank', 'Mountain Climber', 'Hollow Hold'],
    full: ['Burpee', 'Jump Squat'],
  },
  'Barbell + Dumbbell': {
    push: ['Dumbbell Bench Press', 'Overhead Press', 'Incline DB Press', 'Push-up'],
    pull: ['Barbell Row', 'Dumbbell Row', 'Face Pull (Band)', 'Hammer Curl'],
    legs: ['Goblet Squat', 'Front Squat (BB)', 'Walking Lunge', 'DB Step-up'],
    hinge: ['Romanian Deadlift', 'Hip Thrust', 'Good Morning (BB)'],
    core: ['Hanging Knee Raise (Bar)', 'Cable Crunch/Band', 'Pallof Press (Band)'],
    full: ['Kettlebell/DB Swing', 'Farmer’s Carry'],
  },
  'Tam Salon': {
    push: ['Bench Press', 'Incline Bench', 'Machine Chest Press', 'Overhead Press', 'Cable Fly'],
    pull: ['Lat Pulldown', 'Seated Row', 'Chest Supported Row', 'Cable Face Pull', 'Preacher Curl'],
    legs: ['Back Squat', 'Leg Press', 'Walking Lunge', 'Leg Extension', 'Leg Curl', 'Calf Raise'],
    hinge: ['Deadlift', 'Romanian Deadlift', 'Hip Thrust', 'Back Extension'],
    core: ['Cable Crunch', 'Hanging Leg Raise', 'Weighted Plank'],
    full: ['Sled Push', 'Kettlebell Swing'],
  },
} as const;

/* Rep scheme by goal/level */
function scheme(goal: Goal, level: Level) {
  const lvl = level === 'İleri' ? 1 : level === 'Orta' ? 0 : -1;
  if (goal === 'Kuvvet') return { sets: 4 + Math.max(0, lvl), reps: '3–5' };
  if (goal === 'Kas Gelişimi') return { sets: 3 + Math.max(0, lvl), reps: '8–12' };
  if (goal === 'Yağ Kaybı') return { sets: 3 + Math.max(0, lvl), reps: '12–15' };
  return { sets: 3, reps: '8–10' };
}

/* Split generator */
function buildSplit(days: number): Array<{ title: string; focus: string[] }> {
  switch (days) {
    case 3:
      return [
        { title: 'Gün 1 · Full Body A', focus: ['push', 'pull', 'legs', 'core'] },
        { title: 'Gün 2 · Full Body B', focus: ['hinge', 'push', 'legs', 'core'] },
        { title: 'Gün 3 · Full Body C', focus: ['pull', 'legs', 'core'] },
      ];
    case 4:
      return [
        { title: 'Gün 1 · Upper', focus: ['push', 'pull', 'core'] },
        { title: 'Gün 2 · Lower', focus: ['legs', 'hinge', 'core'] },
        { title: 'Gün 3 · Upper', focus: ['push', 'pull', 'core'] },
        { title: 'Gün 4 · Lower', focus: ['legs', 'hinge', 'core'] },
      ];
    case 5:
      return [
        { title: 'Gün 1 · Push', focus: ['push', 'core'] },
        { title: 'Gün 2 · Pull', focus: ['pull', 'core'] },
        { title: 'Gün 3 · Legs', focus: ['legs', 'hinge', 'core'] },
        { title: 'Gün 4 · Upper Mix', focus: ['push', 'pull', 'core'] },
        { title: 'Gün 5 · Full/Conditioning', focus: ['full', 'core'] },
      ];
    default:
      return [
        { title: 'Gün 1 · Push', focus: ['push', 'core'] },
        { title: 'Gün 2 · Pull', focus: ['pull', 'core'] },
        { title: 'Gün 3 · Legs', focus: ['legs', 'hinge', 'core'] },
        { title: 'Gün 4 · Push', focus: ['push', 'core'] },
        { title: 'Gün 5 · Pull', focus: ['pull', 'core'] },
        { title: 'Gün 6 · Legs', focus: ['legs', 'hinge', 'core'] },
      ];
  }
}

function pick(arr: string[], n: number) {
  const out: string[] = [];
  const copy = [...arr];
  while (out.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

function generateProgram(goal: Goal, days: number, equipment: Equipment, level: Level): Program {
  const lib = LIB[equipment];
  const split = buildSplit(days);
  const sc = scheme(goal, level);
  const plan: DayPlan[] = split.map((d) => {
    const items: SessionItem[] = [];
    d.focus.forEach((f) => {
      const pool = (lib as any)[f] as string[] | undefined;
      if (!pool || !pool.length) return;
      const count = f === 'core' ? 1 : f === 'full' ? 2 : days >= 5 ? 2 : 1;
      const picks = pick(pool, count);
      picks.forEach((name) => items.push({ name, sets: sc.sets, reps: sc.reps }));
    });
    while (items.length < Math.min(8, days >= 5 ? 7 : 6)) {
      const extraPool = [...lib.push, ...lib.pull, ...lib.legs, ...lib.hinge, ...lib.core];
      const extra = pick(extraPool, 1)[0];
      if (extra && !items.some((i) => i.name === extra)) items.push({ name: extra, sets: sc.sets, reps: sc.reps });
      else break;
    }
    return { title: d.title, focus: d.focus, items };
  });

  return { id: `TF-${Date.now()}`, goal, days, equipment, level, createdAt: Date.now(), plan };
}

/* ---- Adım 4-5 helpers ---- */
const DAY_NAMES: Record<ClassSession['weekday'], string> = {
  1: 'Pzt',
  2: 'Sal',
  3: 'Çar',
  4: 'Per',
  5: 'Cum',
  6: 'Cmt',
  7: 'Paz',
};

function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(':').map((x) => parseInt(x, 10));
  const d = new Date();
  d.setHours(h, m + minutes, 0, 0);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

const TYPE_STYLE: Record<
  ClassType,
  { chip: string; pill: string }
> = {
  HIIT: { chip: 'bg-rose-500/20 text-rose-300 border-rose-400/30', pill: 'bg-rose-500 text-white' },
  Mobility: { chip: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', pill: 'bg-emerald-500 text-white' },
  Spinning: { chip: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30', pill: 'bg-indigo-500 text-white' },
  Pilates: { chip: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30', pill: 'bg-fuchsia-500 text-white' },
  Strength: { chip: 'bg-amber-500/20 text-amber-300 border-amber-400/30', pill: 'bg-amber-500 text-white' },
  Yoga: { chip: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30', pill: 'bg-cyan-500 text-white' },
};

/* ---- Demo data for Adım 5 ---- */
const COACHES: Coach[] = [
  {
    id: 'c-ara',
    name: 'Aras Demir',
    avatar: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
    specialties: ['Strength', 'HIIT'],
    bio: 'Güç-odaklı antrenman, powerlifting temelli programlama.',
  },
  {
    id: 'c-elif',
    name: 'Elif Kaya',
    avatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    specialties: ['Pilates', 'Mobility', 'Yoga'],
    bio: 'Hareket kalitesi ve core stabilite uzmanı.',
  },
  {
    id: 'c-umut',
    name: 'Umut Aydın',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&auto=format&fit=crop',
    rating: 4.7,
    specialties: ['Spinning', 'HIIT'],
    bio: 'Yüksek tempo kardiyo ve kondisyon dersleri.',
  },
  {
    id: 'c-naz',
    name: 'Naz Çetin',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
    specialties: ['Yoga', 'Mobility'],
    bio: 'Nefes, esneklik, zihinsel odaklanma.',
  },
];

/* ---- Demo data for Adım 4 ---- */
const INITIAL_SESSIONS: ClassSession[] = [
  // Pzt
  { id: 's1', title: 'Sabah HIIT', type: 'HIIT', coachId: 'c-ara', weekday: 1, start: '07:30', durationMin: 45, level: 'Orta', room: 'A', capacity: 16, enrolled: 13 },
  { id: 's2', title: 'Mobility Flow', type: 'Mobility', coachId: 'c-elif', weekday: 1, start: '10:00', durationMin: 50, level: 'Başlangıç', room: 'B', capacity: 14, enrolled: 9 },
  { id: 's3', title: 'Spinning Power', type: 'Spinning', coachId: 'c-umut', weekday: 1, start: '19:00', durationMin: 45, level: 'Orta', room: 'Spin', capacity: 18, enrolled: 17 },
  // Sal
  { id: 's4', title: 'Pilates Mat', type: 'Pilates', coachId: 'c-elif', weekday: 2, start: '09:30', durationMin: 55, level: 'Başlangıç', room: 'B', capacity: 12, enrolled: 8 },
  { id: 's5', title: 'Strength 101', type: 'Strength', coachId: 'c-ara', weekday: 2, start: '18:30', durationMin: 60, level: 'Orta', room: 'A', capacity: 10, enrolled: 6 },
  // Çar
  { id: 's6', title: 'Vinyasa Yoga', type: 'Yoga', coachId: 'c-naz', weekday: 3, start: '07:00', durationMin: 60, level: 'Orta', room: 'C', capacity: 15, enrolled: 10 },
  { id: 's7', title: 'Evening HIIT', type: 'HIIT', coachId: 'c-umut', weekday: 3, start: '20:00', durationMin: 40, level: 'İleri', room: 'A', capacity: 16, enrolled: 12 },
  // Per
  { id: 's8', title: 'Mobility Reset', type: 'Mobility', coachId: 'c-elif', weekday: 4, start: '12:30', durationMin: 45, level: 'Orta', room: 'B', capacity: 14, enrolled: 9 },
  { id: 's9', title: 'Spinning Rush', type: 'Spinning', coachId: 'c-umut', weekday: 4, start: '19:30', durationMin: 45, level: 'Orta', room: 'Spin', capacity: 18, enrolled: 15 },
  // Cum
  { id: 's10', title: 'Total Strength', type: 'Strength', coachId: 'c-ara', weekday: 5, start: '18:00', durationMin: 60, level: 'İleri', room: 'A', capacity: 10, enrolled: 7 },
  // Cmt
  { id: 's11', title: 'Pilates Core', type: 'Pilates', coachId: 'c-elif', weekday: 6, start: '11:00', durationMin: 55, level: 'Orta', room: 'B', capacity: 12, enrolled: 10 },
  { id: 's12', title: 'Yin Yoga', type: 'Yoga', coachId: 'c-naz', weekday: 6, start: '17:00', durationMin: 60, level: 'Başlangıç', room: 'C', capacity: 15, enrolled: 14 },
  // Paz
  { id: 's13', title: 'Recovery Mobility', type: 'Mobility', coachId: 'c-naz', weekday: 7, start: '10:30', durationMin: 50, level: 'Başlangıç', room: 'C', capacity: 15, enrolled: 9 },
];

/* =========================
   Page
========================= */
export default function Paket13GymClient() {
  /* ---- Adım 2 (plans) ---- */
  const [billing, setBilling] = useState<Billing>('monthly');
  const [selected, setSelected] = useState<Plan | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [promo, setPromo] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const base = useMemo(() => (selected ? priceFor(selected, billing) : 0), [selected, billing]);
  const total = useMemo(() => {
    if (!selected) return 0;
    const t = base;
    let discount = 0;
    if (isStudent) discount += STUDENT_DISCOUNT;
    if (promo.trim().toUpperCase() === PROMO_CODE) discount += PROMO_DISCOUNT;
    return Math.round(t * (1 - discount));
  }, [base, isStudent, promo, selected]);

  /* ---- Adım 3 (builder) ---- */
  const [goal, setGoal] = useState<Goal>('Genel Fitness');
  const [days, setDays] = useState<number>(4);
  const [equipment, setEquipment] = useState<Equipment>('Barbell + Dumbbell');
  const [level, setLevel] = useState<Level>('Orta');
  const [program, setProgram] = useState<Program | null>(null);
  const [saved, setSaved] = useState<Program[]>([]);
  const STORAGE_KEY = 'titanfit_programs';
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch { }
  }, []);
  const savePrograms = (arr: Program[]) => {
    setSaved(arr);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch { }
  };
  const saveCurrent = () => program && savePrograms([program, ...saved].slice(0, 12));
  const removeSaved = (id: string) => savePrograms(saved.filter((p) => p.id !== id));

  /* ---- Adım 4 (schedule) & Adım 5 (coaches) ---- */
  const [sessions, setSessions] = useState<ClassSession[]>(INITIAL_SESSIONS);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveSession, setReserveSession] = useState<ClassSession | null>(null);

  const [ptOpen, setPtOpen] = useState(false);
  const [ptCoach, setPtCoach] = useState<Coach | null>(null);

  const today = (() => {
    const js = new Date().getDay(); // 0=Sun..6=Sat
    return (js === 0 ? 7 : js) as ClassSession['weekday'];
  })();

  const [filterDay, setFilterDay] = useState<ClassSession['weekday'] | 0>(0); // 0 = tümü
  const [filterCoach, setFilterCoach] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | ClassType>('all');
  const [filterLevel, setFilterLevel] = useState<'all' | Level>('all');

  // external triggers (from Coaches section)
  const showCoachOnSchedule = (coachId: string) => {
    setFilterCoach(coachId);
    setFilterDay(0);
    window.location.hash = '#schedule';
  };

  const filteredSessions = useMemo(() => {
    return sessions
      .filter((s) => (filterDay ? s.weekday === filterDay : true))
      .filter((s) => (filterCoach === 'all' ? true : s.coachId === filterCoach))
      .filter((s) => (filterType === 'all' ? true : s.type === filterType))
      .filter((s) => (filterLevel === 'all' ? true : s.level === filterLevel))
      .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start));
  }, [sessions, filterCoach, filterDay, filterType, filterLevel]);

  const reserve = (sess: ClassSession) => {
    setReserveSession(sess);
    setReserveOpen(true);
  };
  const confirmReserve = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, enrolled: Math.min(s.capacity, s.enrolled + 1) } : s))
    );
  };

  /* =========================
     Render
  ========================== */
  return (
    <main className="min-h-[100dvh] bg-slate-950 text-slate-100">
      {/* TOP PROMO */}
      <div className="bg-gradient-to-r from-lime-500 to-cyan-500 text-slate-900 text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span className="font-semibold">Baksoft · Özelleştirilebilir Tasarım No:9</span>
          <a href="#plans" className="underline underline-offset-4">Planları Gör</a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
          {/* Logo + Marka */}
          <a
            href="/paketler"
            className="flex items-center gap-2"
          >
            <Image
              src="/baksoftLogo.png"
              alt="Baksoft Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <div className="font-semibold tracking-wide">Baksoft Tasarım</div>
          </a>

          {/* Menü */}
          <nav className="hidden md:flex ml-6 gap-6 text-sm text-slate-300">
            <a href="#plans" className="hover:text-white">Üyelik</a>
            <a href="#builder" className="hover:text-white">Program Oluştur</a>
            <a href="#schedule" className="hover:text-white">Ders Takvimi</a>
            <a href="#coaches" className="hover:text-white">Antrenörler</a>
            <a href="#contact" className="hover:text-white">İletişim</a>
          </nav>

          {/* Sağ buton */}
          <a
            href="#plans"
            className="ml-auto rounded-xl px-4 h-10 grid place-items-center bg-lime-500 text-slate-900 font-semibold hover:bg-lime-400 transition"
          >
            Üye Ol
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Gym motivation"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_20%_0%,rgba(132,204,22,0.18),transparent),radial-gradient(50%_35%_at_100%_0%,rgba(34,211,238,0.18),transparent)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/30 via-slate-950 to-slate-950" />

        <div className="mx-auto max-w-7xl px-4 py-16 md:py-28 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <span className="inline-block text-[11px] uppercase tracking-widest text-lime-300 bg-white/5 border border-white/10 px-2 py-1 rounded">
              Kişisel Program · Üyelik Takibi · Pro Koçlar
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.06]">
              <span className="text-white">Gelecekteki</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-emerald-300 to-cyan-300 drop-shadow-[0_0_30px_rgba(34,197,94,0.35)]">
                Sen’i İnşa Et
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Hedefini seç, ekipmanını işaretle, haftalık gün sayını gir. TitanFit, sana özel
              <span className="font-semibold text-slate-200"> akıllı program</span> önersin. Üyeliklerini tek yerden takip et,
              derslere katıl, ilerlemeni kaydet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#builder" className="px-6 h-12 grid place-items-center rounded-xl bg-lime-500 text-slate-900 font-semibold hover:bg-lime-400">
                Program Oluştur
              </a>
              <a href="#plans" className="px-6 h-12 grid place-items-center rounded-xl border border-white/15 hover:bg-white/5">
                Üyelik Planları
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                ['🎯', 'Hedef Bazlı'],
                ['🧠', 'Akıllı Öneriler'],
                ['📅', 'Ders Takvimi'],
                ['📈', 'İlerleme Takibi'],
              ].map(([icon, text]) => (
                <div key={text} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  <span className="text-slate-200">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-slate-300">
              <Stat k="Aktif Üye" v="1.8K+" />
              <Stat k="Haftalık Ders" v="45+" />
              <Stat k="Açık Saat" v="06:00–00:00" />
            </div>
          </div>

          {/* Quick builder preview */}
          <aside className="md:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-[0_0_80px_-30px_rgba(34,197,94,0.45)]">
              <div className="text-sm text-slate-300">Hızlı Başlangıç</div>
              <form className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="col-span-2">
                  <label className="text-slate-400 text-xs">Hedef</label>
                  <select className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
                    <option>Yağ Kaybı</option>
                    <option>Kas Gelişimi</option>
                    <option>Kuvvet</option>
                    <option>Genel Fitness</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs">Gün/Hafta</label>
                  <select className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" value={days} onChange={(e) => setDays(Number(e.target.value))}>
                    {[3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs">Ekipman</label>
                  <select className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" value={equipment} onChange={(e) => setEquipment(e.target.value as Equipment)}>
                    <option>Tam Salon</option>
                    <option>Barbell + Dumbbell</option>
                    <option>Ev · Bodyweight</option>
                  </select>
                </div>
                <a href="#builder" className="col-span-2 h-11 rounded-lg bg-cyan-400 text-slate-900 font-semibold grid place-items-center hover:bg-cyan-300">
                  Detaylı Oluşturucuya Git
                </a>
              </form>
              <p className="mt-3 text-xs text-slate-400">* Bu kart demo — tam oluşturucu aşağıda.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================
          ADIM 2 · Üyelik Planları
      ========================== */}
      <section id="plans" className="mx-auto max-w-7xl px-4 py-16 border-t border-white/10">
        <PlansSection
          billing={billing}
          setBilling={setBilling}
          onSelect={(p) => {
            setSelected(p);
            setDrawer(true);
            setIsStudent(false);
            setPromo('');
          }}
        />
      </section>

      {/* =========================
          ADIM 3 · Program Oluşturucu
      ========================== */}
      <section id="builder" className="mx-auto max-w-7xl px-4 py-16 border-t border-white/10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Kişisel Program Oluşturucu</h2>
            <p className="text-slate-400 mt-1">Hedefine ve ekipmanına göre otomatik split ve egzersiz listesi.</p>
          </div>
          <button
            onClick={() => {
              const p = generateProgram(goal, days, equipment, level);
              setProgram(p);
              window.scrollTo({ top: (document.getElementById('plan-view')?.offsetTop ?? 0) - 80, behavior: 'smooth' });
            }}
            className="shrink-0 h-11 px-5 rounded-xl bg-lime-500 text-slate-900 font-semibold hover:bg-lime-400"
          >
            Planı Oluştur
          </button>
        </div>

        {/* Controls */}
        <div className="mt-6 grid md:grid-cols-4 gap-3">
          <Control label="Hedef">
            <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="h-11 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3">
              <option>Yağ Kaybı</option>
              <option>Kas Gelişimi</option>
              <option>Kuvvet</option>
              <option>Genel Fitness</option>
            </select>
          </Control>
          <Control label="Gün/Hafta">
            <div className="flex items-center gap-3">
              <input type="range" min={3} max={6} step={1} value={days} onChange={(e) => setDays(Number(e.target.value))} className="flex-1" />
              <span className="w-10 text-right">{days}</span>
            </div>
          </Control>
          <Control label="Ekipman">
            <select value={equipment} onChange={(e) => setEquipment(e.target.value as Equipment)} className="h-11 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3">
              <option>Tam Salon</option>
              <option>Barbell + Dumbbell</option>
              <option>Ev · Bodyweight</option>
            </select>
          </Control>
          <Control label="Seviye">
            <select value={level} onChange={(e) => setLevel(e.target.value as Level)} className="h-11 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3">
              <option>Başlangıç</option>
              <option>Orta</option>
              <option>İleri</option>
            </select>
          </Control>
        </div>

        {/* Plan View */}
        <div id="plan-view" className="mt-8">
          {!program ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
              Henüz program oluşturulmadı. Parametreleri seçip <span className="text-slate-200 font-semibold">Planı Oluştur</span>’a tıkla.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>🎯 {program.goal}</Badge>
                <Badge>📅 {program.days} gün/hafta</Badge>
                <Badge>🏋️ {program.equipment}</Badge>
                <Badge>⚡ {program.level}</Badge>
                <span className="text-xs text-slate-400">ID: {program.id}</span>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {program.plan.map((d, idx) => (
                  <article key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{d.title}</h3>
                      <div className="flex items-center gap-1">
                        {d.focus.map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded-full text-[11px] bg-slate-900/60 border border-white/10">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm">
                      {d.items.map((it, i2) => (
                        <li key={i2} className="flex items-baseline gap-2">
                          <span className="text-slate-400">{i2 + 1}.</span>
                          <span className="text-slate-100 flex-1">{it.name}</span>
                          <span className="text-lime-300 font-medium">
                            {it.sets} x {it.reps}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => setProgram(generateProgram(goal, days, equipment, level))} className="h-11 px-5 rounded-xl bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300">
                  Yeniden Oluştur
                </button>
                <button onClick={saveCurrent} className="h-11 px-5 rounded-xl bg-lime-500 text-slate-900 font-semibold hover:bg-lime-400">
                  Planı Kaydet
                </button>
                <button onClick={() => window.print()} className="h-11 px-5 rounded-xl border border-white/15 hover:bg-white/5">
                  Yazdır / PDF
                </button>
                <button
                  onClick={() => {
                    if (!program) return;
                    const blob = new Blob([JSON.stringify(program, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${program.id}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="h-11 px-5 rounded-xl border border-white/15 hover:bg-white/5"
                >
                  JSON Dışa Aktar
                </button>
              </div>

              {/* Saved Programs */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold">Planlarım</h3>
                {!saved.length ? (
                  <p className="text-slate-400 mt-2 text-sm">Henüz kayıt yok. “Planı Kaydet” ile ekleyebilirsin.</p>
                ) : (
                  <div className="mt-3 grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {saved.map((p) => (
                      <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold">
                              {p.goal} · {p.days}g
                            </div>
                            <div className="text-slate-400">
                              {p.equipment} · {p.level}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1">{new Date(p.createdAt).toLocaleString('tr-TR')}</div>
                          </div>
                          <button onClick={() => removeSaved(p.id)} className="text-xs text-rose-300 hover:underline">
                            Sil
                          </button>
                        </div>
                        <button onClick={() => setProgram(p)} className="mt-3 h-9 w-full rounded-lg bg-slate-900/60 border border-white/10 hover:bg-white/5">
                          Aç & Kullan
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          ADIM 4 · Ders Takvimi
      ========================== */}
      <section id="schedule" className="mx-auto max-w-7xl px-4 py-16 border-t border-white/10">
        <div className="flex items-end justify_between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Ders Takvimi</h2>
            <p className="text-slate-400 mt-1">Koça, derse ve seviyeye göre filtrele; yerini ayırt.</p>
          </div>
          <button
            onClick={() => {
              setFilterDay(today);
              setFilterCoach('all');
              setFilterType('all');
              setFilterLevel('all');
            }}
            className="shrink-0 h-10 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-sm"
          >
            Bugünü Göster
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 grid lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <div className="flex flex-wrap gap-2">
              <FilterPill active={filterDay === 0} onClick={() => setFilterDay(0)}>
                Tümü
              </FilterPill>
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <FilterPill key={d} active={filterDay === d} onClick={() => setFilterDay(d as any)}>
                  {DAY_NAMES[d as 1]}
                </FilterPill>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <select
              value={filterCoach}
              onChange={(e) => setFilterCoach(e.target.value)}
              className="h-10 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3"
            >
              <option value="all">Tüm Koçlar</option>
              {COACHES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <div className="flex flex-wrap gap-2">
              <FilterPill active={filterType === 'all'} onClick={() => setFilterType('all')}>
                Tüm Dersler
              </FilterPill>
              {(['HIIT', 'Mobility', 'Spinning', 'Pilates', 'Strength', 'Yoga'] as ClassType[]).map((t) => (
                <FilterPill key={t} active={filterType === t} onClick={() => setFilterType(t)}>
                  {t}
                </FilterPill>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as any)}
              className="h-10 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3"
            >
              <option value="all">Tüm Seviyeler</option>
              <option>Başlangıç</option>
              <option>Orta</option>
              <option>İleri</option>
            </select>
          </div>
        </div>

        {/* Sessions grouped by day */}
        <div className="mt-8 space-y-6">
          {(() => {
            const groups: Record<number, ClassSession[]> = {};
            filteredSessions.forEach((s) => {
              (groups[s.weekday] ||= []).push(s);
            });
            const order = [1, 2, 3, 4, 5, 6, 7].filter((d) => groups[d]?.length);
            if (!order.length)
              return (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
                  Uygun ders bulunamadı. Filtreleri değiştirin.
                </div>
              );
            return order.map((d) => (
              <div key={d} className="rounded-2xl border border-white/10 bg-white/5">
                <div className="px-5 py-3 border-b border-white/10 flex items-center gap-3">
                  <span className="text-sm text-slate-300">Gün</span>
                  <span className="px-2 py-1 rounded bg-slate-900/60 border border-white/10 text-sm">{DAY_NAMES[d as 1]}</span>
                </div>
                <div className="p-5 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {groups[d]!.map((s) => {
                    const coach = COACHES.find((c) => c.id === s.coachId)!;
                    const remain = s.capacity - s.enrolled;
                    return (
                      <article key={s.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm text-slate-300">{s.room} · {s.level}</div>
                            <h3 className="text-lg font-semibold">{s.title}</h3>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-[11px] border ${TYPE_STYLE[s.type].chip}`}>{s.type}</span>
                        </div>

                        <div className="mt-2 flex items-center gap-3 text-sm text-slate-300">
                          <span>⏱ {s.start}–{addMinutes(s.start, s.durationMin)}</span>
                          <span>·</span>
                          <span>👤 {coach.name}</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <div className="text-xs text-slate-300">
                            Kontenjan: <span className="text-slate-100 font-medium">{s.enrolled}</span>/{s.capacity}
                          </div>
                          {remain <= 3 && <span className="text-xs px-2 py-0.5 rounded bg-rose-500 text-white">Son {remain}</span>}
                        </div>

                        <button
                          disabled={remain <= 0}
                          onClick={() => reserve(s)}
                          className={'mt-4 w-full h-10 rounded-xl font-semibold ' + (remain > 0 ? 'bg-lime-500 text-slate-900 hover:bg-lime-400' : 'bg-slate-700 text-slate-400 cursor-not-allowed')}
                        >
                          {remain > 0 ? 'Rezerve Et' : 'Dolu'}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* =========================
          ADIM 5 · Antrenörler
      ========================== */}
      <section id="coaches" className="mx-auto max-w-7xl px-4 py-16 border-t border-white/10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Antrenörler</h2>
            <p className="text-slate-400 mt-1">Uzmanlıklarına göre koç seç; ders takvimini filtrele ya da PT rezervasyonu yap.</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {COACHES.map((c) => (
            <article key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                {/* İstersen koç avatarını burada da gösterebilirsin */}
                <div>
                  <div className="text-lg font-semibold">{c.name}</div>
                  <div className="text-sm text-slate-300">⭐ {c.rating.toFixed(1)}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">{c.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {c.specialties.map((s) => (
                  <span key={s} className={`px-2 py-1 rounded-full text-[11px] border ${TYPE_STYLE[s].chip}`}>{s}</span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    showCoachOnSchedule(c.id);
                  }}
                  className="h-10 rounded-xl border border-white/10 hover:bg-white/5 text-sm"
                >
                  Takvimi Göster
                </button>
                <button
                  onClick={() => {
                    setPtCoach(c);
                    setPtOpen(true);
                  }}
                  className="h-10 rounded-xl bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 text-sm"
                >
                  PT Rezervasyon
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-sm text-slate-400">
          <span>© {new Date().getFullYear()} Baksoft · TitanFit</span>
          <a href="#plans" className="underline underline-offset-4">Üyelik</a>
        </div>
      </footer>

      {/* DRAWERS */}
      <JoinDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        plan={selected}
        billing={billing}
        base={base}
        total={total}
        isStudent={isStudent}
        setIsStudent={setIsStudent}
        promo={promo}
        setPromo={setPromo}
        startDate={startDate}
        setStartDate={setStartDate}
      />

      <ClassReserveDrawer
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        session={reserveSession}
        coach={reserveSession ? COACHES.find((c) => c.id === reserveSession.coachId) || null : null}
        onConfirm={(id) => {
          confirmReserve(id);
          setReserveOpen(false);
        }}
      />

      <PtBookingDrawer
        open={ptOpen}
        onClose={() => setPtOpen(false)}
        coach={ptCoach}
      />
    </main>
  );
}

/* =========================
   Components
========================= */
function PlansSection({
  billing,
  setBilling,
  onSelect,
}: {
  billing: Billing;
  setBilling: (b: Billing) => void;
  onSelect: (p: Plan) => void;
}) {
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">Üyelik Planları</h3>
        </div>
        <div className="shrink-0">
          <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
            <button onClick={() => setBilling('monthly')} className={'px-3 h-9 rounded-lg text-sm ' + (billing === 'monthly' ? 'bg-lime-500 text-slate-900 font-semibold' : 'text-slate-200 hover:bg-white/10')}>
              Aylık
            </button>
            <button onClick={() => setBilling('yearly')} className={'px-3 h-9 rounded-lg text-sm ' + (billing === 'yearly' ? 'bg-cyan-400 text-slate-900 font-semibold' : 'text-slate-200 hover:bg-white/10')}>
              Yıllık <span className="ml-1 text-[11px] opacity-90">(−%20)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {PLANS.map((p) => (
          <article key={p.id} className={'relative rounded-2xl border bg-white/5 backdrop-blur p-6 ' + (p.best ? 'border-lime-400/40 shadow-[0_0_80px_-30px_rgba(132,204,22,0.55)]' : 'border-white/10')}>
            {p.best && <div className="absolute -top-3 right-4 text-xs px-2 py-1 rounded-full bg-lime-500 text-slate-900 font-semibold">Önerilen</div>}
            <h4 className="text-xl font-semibold">{p.name}</h4>
            <p className="text-slate-300 text-sm mt-1">{p.tagline}</p>
            <div className="mt-4">
              {billing === 'monthly' ? (
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-extrabold">{formatPrice(p.monthly)}</div>
                  <div className="text-slate-400 text-sm">/ ay</div>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-extrabold">{formatPrice(priceFor(p, 'yearly'))}</div>
                    <div className="text-slate-400 text-sm">/ yıl</div>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Aylık efektif: <span className="text-slate-200 font-medium">{formatPrice(Math.round(priceFor(p, 'yearly') / 12))}</span>
                  </div>
                </div>
              )}
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-slate-200">{perk}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => onSelect(p)} className={'mt-6 w-full h-11 rounded-xl font-semibold ' + (p.best ? 'bg-lime-500 text-slate-900 hover:bg-lime-400' : 'bg-cyan-400 text-slate-900 hover:bg-cyan-300')}>
              Üye Ol
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="px-2.5 py-1 rounded-full text-[11px] bg-slate-900/60 border border-white/10">{children}</span>;
}

function FilterPill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        'px-3 py-1.5 rounded-full text-sm border ' +
        (active ? 'bg-lime-500 text-slate-900 border-lime-400' : 'bg-slate-900/60 text-slate-200 border-white/10 hover:bg-white/5')
      }
    >
      {children}
    </button>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <div className="text-2xl font-extrabold text-white">{v}</div>
      <div className="text-slate-400">{k}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-lime-400 shrink-0">
      <path d="M7.629 14.314L3.314 10l1.372-1.372 2.943 2.943 7.685-7.685L16.686 5.3l-9.057 9.014z" />
    </svg>
  );
}

function JoinDrawer({
  open,
  onClose,
  plan,
  billing,
  base,
  total,
  isStudent,
  setIsStudent,
  promo,
  setPromo,
  startDate,
  setStartDate,
}: {
  open: boolean;
  onClose: () => void;
  plan: Plan | null;
  billing: Billing;
  base: number;
  total: number;
  isStudent: boolean;
  setIsStudent: (v: boolean) => void;
  promo: string;
  setPromo: (s: string) => void;
  startDate: string;
  setStartDate: (s: string) => void;
}) {
  return (
    <div className={'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[440px] bg-slate-950/95 backdrop-blur border-l border-white/10 transition-transform ' + (open ? 'translate-x-0' : 'translate-x-full')}>
      <div className={'fixed inset-0 bg-black/40 transition ' + (open ? 'opacity-100' : 'opacity-0 pointer-events-none')} onClick={onClose} />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold">Üyelik Kaydı</div>
          <button onClick={onClose} className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5">
            Kapat
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-auto">
          {!plan ? (
            <div className="rounded-xl border border-white/10 p-6 text-center text-sm text-slate-300">Plan seçip devam edin.</div>
          ) : (
            <>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-sm text-slate-300">Seçilen Plan</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-lg font-semibold">{plan.name}</div>
                  <div className="text-sm text-slate-300">{billing === 'monthly' ? 'Aylık' : 'Yıllık'}</div>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  {plan.perks.slice(0, 3).map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-slate-200">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />
                    <span>Öğrenciyim (−%15)</span>
                  </label>
                  <div>
                    <div className="text-slate-300">Başlangıç</div>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                  </div>
                  <div className="col-span-2">
                    <div className="text-slate-300">Kampanya Kodu</div>
                    <div className="mt-1 flex gap-2">
                      <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Örn: FIT10" className="flex-1 h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3 placeholder:text-slate-500" />
                      <span className="h-10 px-3 rounded-lg border border-white/10 grid place-items-center text-xs text-slate-300">Örnek: FIT10 (−%10)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-300">Ara toplam</div>
                  <div className="font-semibold">{formatPrice(base)}</div>
                </div>
                <div className="mt-1 text-xs text-slate-400">{billing === 'monthly' ? 'Aylık ödeme tutarıdır.' : 'Yıllık peşin ödeme tutarıdır.'}</div>
                {total !== base && (
                  <div className="mt-2 flex items-center justify-between text-sm text-lime-300">
                    <div>İndirimli</div>
                    <div className="font-semibold">{formatPrice(total)}</div>
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Demo: Üyelik kaydı oluşturuldu.');
                  onClose();
                }}
                className="grid grid-cols-2 gap-3 text-sm"
              >
                <div className="col-span-2">
                  <div className="text-slate-300">Ad Soyad</div>
                  <input className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                </div>
                <div>
                  <div className="text-slate-300">Telefon</div>
                  <input className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                </div>
                <div>
                  <div className="text-slate-300">E-posta</div>
                  <input type="email" className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                </div>
                <button className="col-span-2 h-11 rounded-xl bg-lime-500 text-slate-900 font-semibold hover:bg-lime-400">Kaydı Tamamla (Demo)</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ClassReserveDrawer({
  open,
  onClose,
  session,
  coach,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  session: ClassSession | null;
  coach: Coach | null;
  onConfirm: (id: string) => void;
}) {
  return (
    <div className={'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[440px] bg-slate-950/95 backdrop-blur border-l border-white/10 transition-transform ' + (open ? 'translate-x-0' : 'translate-x-full')}>
      <div className={'fixed inset-0 bg-black/40 transition ' + (open ? 'opacity-100' : 'opacity-0 pointer-events-none')} onClick={onClose} />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold">Ders Rezervasyonu</div>
          <button onClick={onClose} className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5">
            Kapat
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-auto">
          {!session || !coach ? (
            <div className="rounded-xl border border-white/10 p-6 text-center text-sm text-slate-300">Ders seçiniz.</div>
          ) : (
            <>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-sm text-slate-300">Seçilen Ders</div>
                <div className="mt-1 flex items-start justify_between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{session.title}</div>
                    <div className="text-sm text-slate-300">
                      {DAY_NAMES[session.weekday]} · {session.start}–{addMinutes(session.start, session.durationMin)} · {session.room}
                    </div>
                    <div className="text-sm text-slate-300 mt-1">Koç: {coach.name} · Seviye: {session.level}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[11px] border ${TYPE_STYLE[session.type].chip}`}>{session.type}</span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onConfirm(session.id);
                  alert('Demo: Rezervasyon oluşturuldu.');
                }}
                className="grid grid-cols-2 gap-3 text-sm"
              >
                <div className="col-span-2">
                  <div className="text-slate-300">Ad Soyad</div>
                  <input required className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                </div>
                <div>
                  <div className="text-slate-300">Telefon</div>
                  <input required className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                </div>
                <div>
                  <div className="text-slate-300">E-posta</div>
                  <input type="email" required className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                </div>
                <button className="col-span-2 h-11 rounded-xl bg-lime-500 text-slate-900 font-semibold hover:bg-lime-400">Rezerve Et (Demo)</button>
                <p className="col-span-2 text-xs text-slate-500">* Demo akıştır; gerçek ödeme/entegrasyon sonradan bağlanır.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PtBookingDrawer({
  open,
  onClose,
  coach,
}: {
  open: boolean;
  onClose: () => void;
  coach: Coach | null;
}) {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('09:00');
  const slots = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
  return (
    <div className={'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[440px] bg-slate-950/95 backdrop-blur border-l border-white/10 transition-transform ' + (open ? 'translate-x-0' : 'translate-x-full')}>
      <div className={'fixed inset-0 bg-black/40 transition ' + (open ? 'opacity-100' : 'opacity-0 pointer-events-none')} onClick={onClose} />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-white/10 flex items-center justify_between">
          <div className="font-semibold">PT Rezervasyonu</div>
          <button onClick={onClose} className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5">
            Kapat
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-auto">
          {!coach ? (
            <div className="rounded-xl border border-white/10 p-6 text-center text-sm text-slate-300">Koç seçiniz.</div>
          ) : (
            <>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <Image src={coach.avatar} width={48} height={48} alt={coach.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <div className="font-semibold">{coach.name}</div>
                    <div className="text-sm text-slate-300">⭐ {coach.rating.toFixed(1)} · {coach.specialties.join(' / ')}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="col-span-2">
                  <div className="text-slate-300">Tarih</div>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3" />
                </div>
                <div className="col-span-2">
                  <div className="text-slate-300">Saat</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button key={s} onClick={() => setTime(s)} className={'h-9 px-3 rounded-lg border text-sm ' + (time === s ? 'bg-cyan-400 text-slate-900 border-cyan-300' : 'bg-slate-900/60 border-white/10 hover:bg-white/5')}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-slate-300">Not</div>
                  <textarea className="mt-1 w-full min-h-[80px] rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2" placeholder="Hedefler, sakatlıklar vb." />
                </div>
                <button
                  onClick={() => {
                    if (!date) {
                      alert('Lütfen tarih seçin.');
                      return;
                    }
                    alert(`Demo: ${coach.name} ile ${date} ${time} için PT randevusu alındı.`);
                    onClose();
                  }}
                  className="col-span-2 h-11 rounded-xl bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300"
                >
                  Randevuyu Al (Demo)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
