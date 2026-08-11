'use client';

import { useMemo, useState } from 'react';

type Position = 'GK' | 'LB' | 'CB' | 'RB' | 'CM' | 'LW' | 'CAM' | 'RW' | 'ST';
type Player = { id: string; personId: string; name: string; shortName: string; season: string; position: Position; rating: number };
type Season = { id: string; name: string; achievement?: string; players: Player[] };

const slots: Position[] = ['GK','LB','CB','CB','RB','CM','CM','LW','CAM','RW','ST'];

const mk = (season: string, rows: Array<[string,string,Position,number]>): Player[] => rows.map(([personId, shortName, position, rating]) => ({
  id: `${personId}-${season.replace(/\W/g,'')}`,
  personId,
  name: shortName,
  shortName,
  season,
  position,
  rating,
}));

const seasons: Season[] = [
  { id:'1998', name:'Локомотив · 1998', achievement:'Еврокубковая весна', players: mk('1998', [
    ['nigmatullin','Нигматуллин','GK',91],['chugainov','Чугайнов','CB',89],['drozdov','Дроздов','LB',84],['pashinin','Пашинин','CB',82],['arifullin','Арифуллин','RB',84],['maminov','Маминов','CM',88],['loskov','Лоськов','CAM',91],['kharlachev','Харлачёв','CM',86],['janashia','Джанашия','ST',90],['bulykin','Булыкин','ST',85],['veselov','Веселов','RW',82]
  ])},
  { id:'2002', name:'Локомотив · 2002', achievement:'Чемпион России', players: mk('2002', [
    ['nigmatullin','Нигматуллин','GK',93],['evseev','Евсеев','LB',91],['chugainov','Чугайнов','CB',90],['lekgetho','Лекхето','RB',89],['sennikov','Сенников','CB',88],['maminov','Маминов','CM',92],['loskov','Лоськов','CAM',96],['izmailov','Измайлов','RW',91],['khokhlov','Хохлов','CM',91],['pimenov','Пименов','ST',87],['obiorah','Обиора','LW',86]
  ])},
  { id:'2003', name:'Локомотив · 2003/04', achievement:'1/8 финала Лиги чемпионов', players: mk('2003/04', [
    ['ovchinnikov','Овчинников','GK',93],['evseev','Евсеев','LB',92],['asatiani','Асатиани','CB',90],['sennikov','Сенников','CB',89],['lekgetho','Лекхето','RB',88],['maminov','Маминов','CM',91],['loskov','Лоськов','CAM',97],['izmailov','Измайлов','RW',92],['bilyaletdinov','Билялетдинов','LW',87],['khokhlov','Хохлов','CM',92],['ashvetia','Ашветия','ST',86]
  ])},
  { id:'2004', name:'Локомотив · 2004', achievement:'Чемпион России', players: mk('2004', [
    ['ovchinnikov','Овчинников','GK',95],['evseev','Евсеев','LB',92],['asatiani','Асатиани','CB',92],['sennikov','Сенников','CB',89],['gurенко','Гуренко','RB',89],['maminov','Маминов','CM',92],['loskov','Лоськов','CAM',96],['izmailov','Измайлов','RW',91],['bilyaletdinov','Билялетдинов','LW',90],['khokhlov','Хохлов','CM',91],['sychev','Сычёв','ST',94]
  ])},
  { id:'2005', name:'Локомотив · 2005', achievement:'Бронза РПЛ', players: mk('2005', [
    ['ovchinnikov','Овчинников','GK',92],['evseev','Евсеев','LB',89],['asatiani','Асатиани','CB',91],['pashinin','Пашинин','CB',86],['gurенко','Гуренко','RB',87],['maminov','Маминов','CM',90],['loskov','Лоськов','CAM',94],['izmailov','Измайлов','RW',89],['bilyaletdinov','Билялетдинов','LW',92],['khokhlov','Хохлов','CM',89],['sychev','Сычёв','ST',92]
  ])},
  { id:'2007', name:'Локомотив · 2007', achievement:'Обладатель Кубка России', players: mk('2007', [
    ['pelizzoli','Пелиццоли','GK',84],['spahic','Спахич','CB',88],['asatiani','Асатиани','CB',89],['fininho','Фининью','LB',84],['yanbaev','Янбаев','RB',87],['maminov','Маминов','CM',88],['loskov','Лоськов','CAM',91],['bilyaletdinov','Билялетдинов','LW',91],['samedov','Самедов','RW',88],['gurenko','Гуренко','CM',84],['sychev','Сычёв','ST',90]
  ])},
  { id:'2014', name:'Локомотив · 2013/14', achievement:'Бронза РПЛ', players: mk('2013/14', [
    ['guilherme','Гилерме','GK',89],['denisovv','В. Денисов','LB',89],['corluka','Чорлука','CB',93],['durica','Дюрица','CB',89],['shishkin','Шишкин','RB',87],['tarasov','Тарасов','CM',88],['tigorev','Тигорев','CM',86],['samedov','Самедов','RW',91],['boussoufa','Буссуфа','CAM',89],['maicon','Майкон','LW',88],['ndoye','Н’Дойе','ST',92]
  ])},
  { id:'2015', name:'Локомотив · 2014/15', achievement:'Обладатель Кубка России', players: mk('2014/15', [
    ['guilherme','Гилерме','GK',88],['denisovv','В. Денисов','LB',88],['corluka','Чорлука','CB',92],['pejcinovic','Пейчинович','CB',87],['shishkin','Шишкин','RB',86],['tarasov','Тарасов','CM',87],['fernandes','М. Фернандеш','CM',89],['samedov','Самедов','RW',90],['boussoufa','Буссуфа','CAM',88],['maicon','Майкон','LW',86],['pavlyuchenko','Павлюченко','ST',86]
  ])},
  { id:'2018', name:'Локомотив · 2017/18', achievement:'Чемпион России', players: mk('2017/18', [
    ['guilherme','Гилерме','GK',92],['rybus','Рыбус','LB',91],['corluka','Чорлука','CB',94],['kverkvelia','Кверквелия','CB',91],['ignatyev','Игнатьев','RB',88],['barinov','Баринов','CM',90],['denisovi','И. Денисов','CM',92],['farfan','Фарфан','LW',94],['fernandes','М. Фернандеш','CAM',93],['miranchuka','А. Миранчук','RW',91],['eder','Эдер','ST',90]
  ])},
  { id:'2020', name:'Локомотив · 2019/20', achievement:'Серебро РПЛ', players: mk('2019/20', [
    ['guilherme','Гилерме','GK',91],['rybus','Рыбус','LB',89],['corluka','Чорлука','CB',92],['murilo','Мурило','CB',89],['ignatyev','Игнатьев','RB',86],['barinov','Баринов','CM',93],['krychowiak','Крыховяк','CM',94],['joao','Жоау Мариу','LW',90],['miranchuka','А. Миранчук','CAM',94],['zhemaletdinov','Жемалетдинов','RW',89],['eder','Эдер','ST',87]
  ])},
  { id:'2021', name:'Локомотив · 2020/21', achievement:'Обладатель Кубка России', players: mk('2020/21', [
    ['guilherme','Гилерме','GK',90],['rybus','Рыбус','LB',88],['corluka','Чорлука','CB',91],['murilo','Мурило','CB',90],['zhivoglyadov','Живоглядов','RB',85],['barinov','Баринов','CM',91],['krychowiak','Крыховяк','CM',93],['kamano','Камано','LW',89],['miranchukant','Ан. Миранчук','CAM',88],['zhemaletdinov','Жемалетдинов','RW',90],['smolov','Смолов','ST',89]
  ])},
];

function compatible(player: Position, slot: Position) {
  if (player === slot) return true;
  if (player === 'CB' && slot === 'CB') return true;
  if (player === 'CM' && slot === 'CM') return true;
  return false;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [order, setOrder] = useState<Season[]>([]);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<Player[]>([]);

  const current = order[round];
  const usedPeople = useMemo(() => new Set(picked.map(p => p.personId)), [picked]);
  const openSlots = useMemo(() => slots.map((s, i) => ({ s, i })).filter(({ i }) => !picked[i]), [picked]);

  function start() {
    const shuffled = [...seasons].sort(() => Math.random() - 0.5);
    setOrder(shuffled);
    setPicked(Array(11).fill(null));
    setRound(0);
    setStarted(true);
  }

  function choose(player: Player) {
    if (usedPeople.has(player.personId)) return;
    const target = openSlots.find(({ s }) => compatible(player.position, s));
    if (!target) return;
    const next = [...picked];
    next[target.i] = player;
    setPicked(next);
    if (round >= 10) setRound(11); else setRound(r => r + 1);
  }

  if (!started) return (
    <main className="landing">
      <div className="rail railTop" />
      <section className="hero">
        <div className="badge">МОСКВА · ЧЕРКИЗОВО</div>
        <h1>LOKO<br/><span>DRAFT</span></h1>
        <p>Собери величайший «Локомотив» в истории. Один сезон — один выбор. Один игрок — один раз.</p>
        <button onClick={start}>НАЧАТЬ ДРАФТ <span>→</span></button>
        <small>11 раундов · схема 4–2–3–1 · исторические версии игроков</small>
      </section>
      <div className="rail railBottom" />
    </main>
  );

  if (round >= 11) {
    const team = picked.filter(Boolean) as Player[];
    const avg = Math.round(team.reduce((a,p) => a+p.rating,0)/team.length);
    const attack = Math.round(team.filter(p => ['LW','CAM','RW','ST'].includes(p.position)).reduce((a,p)=>a+p.rating,0)/4);
    const midfield = Math.round(team.filter(p => p.position === 'CM').reduce((a,p)=>a+p.rating,0)/2);
    const defense = Math.round(team.filter(p => ['LB','CB','RB'].includes(p.position)).reduce((a,p)=>a+p.rating,0)/4);
    return <main className="resultPage"><div className="topline"><b>LOKO DRAFT</b><span>ФИНАЛ</span></div><section className="resultWrap">
      <p className="eyebrow">ТВОЙ ВЕЛИЧАЙШИЙ</p><h2>ЛОКОМОТИВ</h2><div className="score">{avg}<small>OVERALL</small></div>
      <Pitch picked={picked}/>
      <div className="metrics"><div><b>{attack}</b><span>АТАКА</span></div><div><b>{midfield}</b><span>ПОЛУЗАЩИТА</span></div><div><b>{defense}</b><span>ОБОРОНА</span></div></div>
      <button className="again" onClick={start}>СЫГРАТЬ ЕЩЁ РАЗ</button>
    </section></main>;
  }

  return <main className="gamePage">
    <div className="topline"><b>LOKO DRAFT</b><span>РАУНД {round+1} / 11</span></div>
    <div className="progress"><i style={{width:`${((round+1)/11)*100}%`}}/></div>
    <section className="gameGrid">
      <div className="seasonPanel"><p className="eyebrow">ТВОЙ ВЫБОР</p><h2>{current?.name}</h2><div className="achievement">{current?.achievement}</div>
        <div className="cards">{current?.players.map(p => {
          const blocked = usedPeople.has(p.personId);
          const fits = openSlots.some(({s}) => compatible(p.position,s));
          return <button key={p.id} disabled={blocked || !fits} onClick={()=>choose(p)} className="playerCard"><span className="pos">{p.position}</span><strong>{p.rating}</strong><b>{p.shortName}</b><small>{p.season}</small>{blocked && <em>УЖЕ В КОМАНДЕ</em>}</button>
        })}</div>
      </div>
      <aside><p className="eyebrow">МОЙ СОСТАВ</p><Pitch picked={picked}/></aside>
    </section>
  </main>;
}

function Pitch({picked}:{picked:(Player|null)[]}) {
  const coords = [
    [50,88],[14,70],[38,72],[62,72],[86,70],[37,51],[63,51],[15,29],[50,27],[85,29],[50,10]
  ];
  return <div className="pitch"><div className="centerCircle"/>{slots.map((slot,i)=>{
    const p = picked[i]; const [x,y] = coords[i];
    return <div className={`slot ${p?'filled':''}`} key={i} style={{left:`${x}%`,top:`${y}%`}}><div className="shirt">{p ? p.rating : slot}</div><b>{p ? p.shortName : slot}</b>{p && <small>{p.season}</small>}</div>
  })}</div>;
}
