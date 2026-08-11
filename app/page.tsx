'use client';

import { useMemo, useState } from 'react';

type Position = 'GK' | 'LB' | 'CB' | 'RB' | 'CM' | 'LW' | 'CAM' | 'RW' | 'ST';
type Player = { id: string; personId: string; shortName: string; season: string; position: Position; rating: number };
type Season = { id: string; name: string; achievement: string; players: Player[] };

const slots: Position[] = ['GK','LB','CB','CB','RB','CM','CM','LW','CAM','RW','ST'];
const legends: Array<[string,string,Position,number]> = [
  ['ovchinnikov','Овчинников','GK',94],
  ['evseev','Евсеев','LB',91],
  ['asatiani','Асатиани','CB',92],
  ['corluka','Чорлука','CB',94],
  ['yanbaev','Янбаев','RB',88],
  ['maminov','Маминов','CM',92],
  ['barinov','Баринов','CM',91],
  ['farfan','Фарфан','LW',94],
  ['loskov','Лоськов','CAM',97],
  ['miranchuk','А. Миранчук','RW',93],
  ['sychev','Сычёв','ST',94],
];

const seasonDefs = [
  ['1998','Локомотив · 1998','Еврокубковая весна',-5],
  ['2002','Локомотив · 2002','Чемпион России',0],
  ['2003','Локомотив · 2003/04','1/8 финала Лиги чемпионов',1],
  ['2004','Локомотив · 2004','Чемпион России',2],
  ['2005','Локомотив · 2005','Бронза РПЛ',-1],
  ['2007','Локомотив · 2007','Обладатель Кубка России',-2],
  ['2014','Локомотив · 2013/14','Бронза РПЛ',0],
  ['2015','Локомотив · 2014/15','Обладатель Кубка России',-1],
  ['2018','Локомотив · 2017/18','Чемпион России',2],
  ['2020','Локомотив · 2019/20','Серебро РПЛ',1],
  ['2021','Локомотив · 2020/21','Обладатель Кубка России',0],
] as const;

const seasons: Season[] = seasonDefs.map(([id,name,achievement,delta], idx) => ({
  id,
  name,
  achievement,
  players: legends.map(([personId,shortName,position,base], pIdx) => ({
    id: `${personId}-${id}`,
    personId,
    shortName,
    season: name.replace('Локомотив · ',''),
    position,
    rating: Math.max(80, Math.min(99, base + delta + ((idx + pIdx) % 3) - 1)),
  })),
}));

function compatible(player: Position, slot: Position) {
  return player === slot;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [order, setOrder] = useState<Season[]>([]);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<(Player|null)[]>(Array(11).fill(null));

  const current = order[round];
  const usedPeople = useMemo(
    () => new Set(picked.filter((p): p is Player => p !== null).map(p => p.personId)),
    [picked]
  );
  const openSlots = useMemo(
    () => slots.map((s,i)=>({s,i})).filter(({i}) => picked[i] === null),
    [picked]
  );

  function start() {
    setOrder([...seasons].sort(() => Math.random() - 0.5));
    setPicked(Array(11).fill(null));
    setRound(0);
    setStarted(true);
  }

  function choose(player: Player) {
    if (usedPeople.has(player.personId)) return;
    const target = openSlots.find(({s}) => compatible(player.position,s));
    if (!target) return;
    const next = [...picked];
    next[target.i] = player;
    setPicked(next);
    setRound(r => r + 1);
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
    const team = picked.filter((p): p is Player => p !== null);
    const avg = Math.round(team.reduce((a,p)=>a+p.rating,0)/team.length);
    const attackPlayers = team.filter(p => ['LW','CAM','RW','ST'].includes(p.position));
    const midfieldPlayers = team.filter(p => p.position === 'CM');
    const defensePlayers = team.filter(p => ['LB','CB','RB'].includes(p.position));
    const score = (arr: Player[]) => Math.round(arr.reduce((a,p)=>a+p.rating,0)/arr.length);
    return <main className="resultPage">
      <div className="topline"><b>LOKO DRAFT</b><span>ФИНАЛ</span></div>
      <section className="resultWrap">
        <p className="eyebrow">ТВОЙ ВЕЛИЧАЙШИЙ</p><h2>ЛОКОМОТИВ</h2>
        <div className="score">{avg}<small>OVERALL</small></div>
        <Pitch picked={picked}/>
        <div className="metrics"><div><b>{score(attackPlayers)}</b><span>АТАКА</span></div><div><b>{score(midfieldPlayers)}</b><span>ПОЛУЗАЩИТА</span></div><div><b>{score(defensePlayers)}</b><span>ОБОРОНА</span></div></div>
        <button className="again" onClick={start}>СЫГРАТЬ ЕЩЁ РАЗ</button>
      </section>
    </main>;
  }

  return <main className="gamePage">
    <div className="topline"><b>LOKO DRAFT</b><span>РАУНД {round+1} / 11</span></div>
    <div className="progress"><i style={{width:`${((round+1)/11)*100}%`}}/></div>
    <section className="gameGrid">
      <div className="seasonPanel">
        <p className="eyebrow">ТВОЙ ВЫБОР</p><h2>{current?.name}</h2><div className="achievement">{current?.achievement}</div>
        <div className="cards">{current?.players.map(p => {
          const blocked = usedPeople.has(p.personId);
          const fits = openSlots.some(({s}) => compatible(p.position,s));
          return <button key={p.id} disabled={blocked || !fits} onClick={()=>choose(p)} className="playerCard"><span className="pos">{p.position}</span><strong>{p.rating}</strong><b>{p.shortName}</b><small>{p.season}</small>{blocked && <em>УЖЕ В КОМАНДЕ</em>}</button>;
        })}</div>
      </div>
      <aside><p className="eyebrow">МОЙ СОСТАВ</p><Pitch picked={picked}/></aside>
    </section>
  </main>;
}

function Pitch({picked}:{picked:(Player|null)[]}) {
  const coords = [[50,88],[14,70],[38,72],[62,72],[86,70],[37,51],[63,51],[15,29],[50,27],[85,29],[50,10]];
  return <div className="pitch"><div className="centerCircle"/>{slots.map((slot,i)=>{
    const p = picked[i]; const [x,y] = coords[i];
    return <div className={`slot ${p?'filled':''}`} key={i} style={{left:`${x}%`,top:`${y}%`}}><div className="shirt">{p ? p.rating : slot}</div><b>{p ? p.shortName : slot}</b>{p && <small>{p.season}</small>}</div>;
  })}</div>;
}
