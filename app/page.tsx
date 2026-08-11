'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Position = 'GK'|'LB'|'CB'|'RB'|'CM'|'LW'|'CAM'|'RW'|'ST';
type Player = {
  id:string;
  personId:string;
  shortName:string;
  season:string;
  lineupPosition:Position;
  positions:Position[];
  rating:number;
};
type Season = {id:string;name:string;achievement:string;players:Player[]};
type PickedPlayer = Player & {draftPosition:Position};
type SlotState = (PickedPlayer|null)[];

const slots:Position[]=['GK','LB','CB','CB','RB','CM','CM','LW','CAM','RW','ST'];
const coords=[[50,90],[14,72],[38,74],[62,74],[86,72],[36,52],[64,52],[15,30],[50,28],[85,30],[50,10]];

const p=(personId:string,shortName:string,lineupPosition:Position,rating:number,positions:Position[]=[lineupPosition]):[string,string,Position,number,Position[]] =>
  [personId,shortName,lineupPosition,rating,positions];

const mk=(season:string,rows:Array<[string,string,Position,number,Position[]]>):Player[] =>
  rows.map(([personId,shortName,lineupPosition,rating,positions])=>({
    id:`${personId}-${season}`,
    personId,shortName,season,lineupPosition,positions,rating
  }));

const seasons:Season[]=[
{id:'1998',name:'Локомотив · 1998',achievement:'Полуфинал Кубка кубков',players:mk('1998',[
p('nigmatullin','Нигматуллин','GK',91),p('drozdov','Дроздов','LB',85,['LB','CM']),p('chugainov','Чугайнов','CB',90),p('arifullin','Арифуллин','CB',87),p('kharlachev','Харлачёв','RB',86,['RB','CM']),p('maminov','Маминов','CM',89),p('kosolapov','Косолапов','CM',87),p('janashia','Джанашия','LW',92,['LW','ST']),p('loskov','Лоськов','CAM',92,['CAM','CM']),p('borodyuk','Бородюк','RW',88,['RW','ST']),p('bulykin','Булыкин','ST',86)
])},
{id:'2000',name:'Локомотив · 2000',achievement:'Серебро чемпионата России',players:mk('2000',[
p('nigmatullin','Нигматуллин','GK',93),p('lekgetho','Лекхето','LB',89,['LB','RB']),p('chugainov','Чугайнов','CB',90),p('sennikov','Сенников','CB',87,['CB','RB']),p('nizhegorodov','Нижегородов','RB',90,['RB','CB']),p('maminov','Маминов','CM',91),p('drozdov','Дроздов','CM',86,['CM','LB']),p('janashia','Джанашия','LW',90,['LW','ST']),p('loskov','Лоськов','CAM',95,['CAM','CM']),p('izmailov','Измайлов','RW',88,['RW','CAM']),p('buznikin','Бузникин','ST',87)
])},
{id:'2002',name:'Локомотив · 2002',achievement:'Чемпион России',players:mk('2002',[
p('ovchinnikov','Овчинников','GK',95),p('lekgetho','Лекхето','LB',91,['LB','RB']),p('ignashevich','Игнашевич','CB',93),p('sennikov','Сенников','CB',89,['CB','RB']),p('evseev','Евсеев','RB',92,['RB','LB']),p('maminov','Маминов','CM',92),p('izmailov','Измайлов','CM',91,['CM','CAM','RW']),p('obiorah','Обиора','LW',87,['LW','ST']),p('loskov','Лоськов','CAM',97,['CAM','CM']),p('julio','Жулио Сезар','RW',87,['RW','ST']),p('pimenov','Пименов','ST',88)
])},
{id:'2003',name:'Локомотив · 2003/04',achievement:'1/8 финала Лиги чемпионов',players:mk('2003/04',[
p('ovchinnikov','Овчинников','GK',95),p('lekgetho','Лекхето','LB',90,['LB','RB']),p('asatiani','Асатиани','CB',91,['CB','CM']),p('sennikov','Сенников','CB',90,['CB','RB']),p('evseev','Евсеев','RB',93,['RB','LB']),p('maminov','Маминов','CM',92),p('khokhlov','Хохлов','CM',93,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',88,['LW','CM']),p('loskov','Лоськов','CAM',98,['CAM','CM']),p('izmailov','Измайлов','RW',93,['RW','CAM']),p('ashvetia','Ашветия','ST',87)
])},
{id:'2004',name:'Локомотив · 2004',achievement:'Чемпион России',players:mk('2004',[
p('ovchinnikov','Овчинников','GK',96),p('evseev','Евсеев','LB',93,['LB','RB']),p('asatiani','Асатиани','CB',93,['CB','CM']),p('sennikov','Сенников','CB',90,['CB','RB']),p('gurenko','Гуренко','RB',90,['RB','LB','CM']),p('maminov','Маминов','CM',93),p('khokhlov','Хохлов','CM',92,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',92,['LW','CM']),p('loskov','Лоськов','CAM',97,['CAM','CM']),p('izmailov','Измайлов','RW',92,['RW','CAM']),p('sychev','Сычёв','ST',96,['ST','LW'])
])},
{id:'2005',name:'Локомотив · 2005',achievement:'Бронза чемпионата России',players:mk('2005',[
p('ovchinnikov','Овчинников','GK',93),p('evseev','Евсеев','LB',90,['LB','RB']),p('asatiani','Асатиани','CB',92,['CB','CM']),p('pashinin','Пашинин','CB',87,['CB','RB']),p('gurenko','Гуренко','RB',88,['RB','LB','CM']),p('maminov','Маминов','CM',91),p('khokhlov','Хохлов','CM',90,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',93,['LW','CM']),p('loskov','Лоськов','CAM',95,['CAM','CM']),p('izmailov','Измайлов','RW',90,['RW','CAM']),p('sychev','Сычёв','ST',94,['ST','LW'])
])},
{id:'2014',name:'Локомотив · 2013/14',achievement:'Бронза чемпионата России',players:mk('2013/14',[
p('guilherme','Гилерме','GK',90),p('denisovv','В. Денисов','LB',90),p('corluka','Чорлука','CB',94),p('durica','Дюрица','CB',90),p('shishkin','Шишкин','RB',88,['RB','LB']),p('tarasov','Тарасов','CM',89,['CM','CB']),p('tigorev','Тигорев','CM',87),p('maicon','Майкон','LW',89,['LW','ST']),p('boussoufa','Буссуфа','CAM',90,['CAM','RW']),p('samedov','Самедов','RW',92,['RW','CAM']),p('ndoye','Н’Дойе','ST',93)
])},
{id:'2017',name:'Локомотив · 2016/17',achievement:'Обладатель Кубка России',players:mk('2016/17',[
p('guilherme','Гилерме','GK',90),p('denisovv','В. Денисов','LB',88),p('corluka','Чорлука','CB',93),p('pejcinovic','Пейчинович','CB',89),p('ignatyev','Игнатьев','RB',87,['RB','RW']),p('denisovi','И. Денисов','CM',91),p('tarasov','Тарасов','CM',87,['CM','CB']),p('miranchuka','А. Миранчук','LW',90,['LW','CAM','RW']),p('fernandes','М. Фернандеш','CAM',91,['CAM','CM']),p('kasaev','Касаев','RW',87,['RW','LW']),p('ari','Ари','ST',91)
])},
{id:'2018',name:'Локомотив · 2017/18',achievement:'Чемпион России',players:mk('2017/18',[
p('guilherme','Гилерме','GK',93),p('rybus','Рыбус','LB',92,['LB','LW']),p('corluka','Чорлука','CB',95),p('kverkvelia','Кверквелия','CB',93),p('ignatyev','Игнатьев','RB',89,['RB','RW']),p('barinov','Баринов','CM',91,['CM','CB']),p('denisovi','И. Денисов','CM',93),p('farfan','Фарфан','LW',96,['LW','RW','ST']),p('fernandes','М. Фернандеш','CAM',94,['CAM','CM']),p('miranchuka','А. Миранчук','RW',92,['RW','CAM','LW']),p('eder','Эдер','ST',91)
])},
{id:'2019',name:'Локомотив · 2018/19',achievement:'Серебро РПЛ · Кубок России',players:mk('2018/19',[
p('guilherme','Гилерме','GK',92),p('rybus','Рыбус','LB',91,['LB','LW']),p('corluka','Чорлука','CB',94),p('kverkvelia','Кверквелия','CB',91),p('ignatyev','Игнатьев','RB',88,['RB','RW']),p('barinov','Баринов','CM',92,['CM','CB']),p('krychowiak','Крыховяк','CM',95),p('farfan','Фарфан','LW',94,['LW','RW','ST']),p('fernandes','М. Фернандеш','CAM',92,['CAM','CM']),p('miranchuka','А. Миранчук','RW',93,['RW','CAM','LW']),p('smolov','Смолов','ST',91)
])},
{id:'2020',name:'Локомотив · 2019/20',achievement:'Серебро чемпионата России',players:mk('2019/20',[
p('guilherme','Гилерме','GK',92),p('rybus','Рыбус','LB',90,['LB','LW']),p('corluka','Чорлука','CB',93),p('howedes','Хёведес','CB',91),p('ignatyev','Игнатьев','RB',87,['RB','RW']),p('barinov','Баринов','CM',94,['CM','CB']),p('krychowiak','Крыховяк','CM',96),p('joao','Жоау Мариу','LW',91,['LW','CAM','RW']),p('miranchuka','А. Миранчук','CAM',96,['CAM','RW','LW']),p('miranchukant','Ан. Миранчук','RW',91,['RW','CAM']),p('smolov','Смолов','ST',90)
])},
{id:'2021',name:'Локомотив · 2020/21',achievement:'Обладатель Кубка России',players:mk('2020/21',[
p('guilherme','Гилерме','GK',91),p('rybus','Рыбус','LB',89,['LB','LW']),p('corluka','Чорлука','CB',92),p('murilo','Мурило','CB',91,['CB','CM']),p('zhivoglyadov','Живоглядов','RB',86),p('barinov','Баринов','CM',92,['CM','CB']),p('krychowiak','Крыховяк','CM',94),p('kamano','Камано','LW',90,['LW','RW','ST']),p('miranchukant','Ан. Миранчук','CAM',89,['CAM','RW']),p('zhemaletdinov','Жемалетдинов','RW',91,['RW','LW','CAM']),p('smolov','Смолов','ST',90)
])},
{id:'2023',name:'Локомотив · 2022/23',achievement:'Яркая весенняя серия',players:mk('2022/23',[
p('lantratov','Лантратов','GK',89),p('tiknizyan','Тикнизян','LB',89,['LB','LW']),p('pogostnov','Погостнов','CB',84),p('magkeev','Магкеев','CB',86,['CB','CM']),p('nenakhov','Ненахов','RB',86,['RB','LB']),p('karpukas','Карпукас','CM',89),p('barinov','Баринов','CM',91,['CM','CB']),p('kamano','Камано','LW',88,['LW','RW','ST']),p('miranchukant','Ан. Миранчук','CAM',90,['CAM','RW']),p('glushenkov','Глушенков','RW',92,['RW','CAM','LW']),p('dzyuba','Дзюба','ST',91)
])},
{id:'2024',name:'Локомотив · 2023/24',achievement:'4-е место в РПЛ',players:mk('2023/24',[
p('lantratov','Лантратов','GK',91),p('tiknizyan','Тикнизян','LB',91,['LB','LW']),p('fasson','Фассон','CB',89),p('morozov','Морозов','CB',90),p('silyanov','Сильянов','RB',90,['RB','LB']),p('karpukas','Карпукас','CM',90),p('barinov','Баринов','CM',92,['CM','CB']),p('pinyaev','Пиняев','LW',91,['LW','RW']),p('miranchukant','Ан. Миранчук','CAM',91,['CAM','RW']),p('glushenkov','Глушенков','RW',95,['RW','CAM','LW']),p('dzyuba','Дзюба','ST',89)
])},
{id:'2025',name:'Локомотив · 2024/25',achievement:'Сильный старт сезона',players:mk('2024/25',[
p('lantratov','Лантратов','GK',91),p('silyanov','Сильянов','LB',91,['LB','RB']),p('nyamsi','Ньямси','CB',90),p('montes','Монтес','CB',92),p('nenakhov','Ненахов','RB',88,['RB','LB']),p('karpukas','Карпукас','CM',90),p('barinov','Баринов','CM',93,['CM','CB']),p('pinyaev','Пиняев','LW',92,['LW','RW']),p('batrakov','Батраков','CAM',96,['CAM','CM']),p('rudenko','Руденко','RW',90,['RW','ST']),p('vorobyev','Воробьёв','ST',92)
])},
{id:'2026',name:'Локомотив · 2025/26',achievement:'Современный «Локо»',players:mk('2025/26',[
p('mitryushkin','Митрюшкин','GK',90),p('silyanov','Сильянов','LB',91,['LB','RB']),p('fasson','Фассон','CB',90),p('morozov','Морозов','CB',91),p('nenakhov','Ненахов','RB',88,['RB','LB']),p('karpukas','Карпукас','CM',91),p('prutsev','Пруцев','CM',90),p('pinyaev','Пиняев','LW',92,['LW','RW']),p('batrakov','Батраков','CAM',97,['CAM','CM']),p('bakaev','Бакаев','RW',91,['RW','CAM']),p('vorobyev','Воробьёв','ST',93)
])}
];

function canFillAll(openSlots:Position[], remainingSeasons:Season[], used:Set<string>) {
  if (openSlots.length===0) return true;
  if (remainingSeasons.length<openSlots.length) return false;
  const edges = remainingSeasons.map(season => openSlots.map((slot,slotIndex) => season.players.some(pl=>!used.has(pl.personId)&&pl.positions.includes(slot)) ? slotIndex : -1).filter(x=>x>=0));
  const match = Array(openSlots.length).fill(-1);
  function dfs(seasonIndex:number, seen:boolean[]):boolean {
    for (const slotIndex of edges[seasonIndex]) {
      if (seen[slotIndex]) continue;
      seen[slotIndex]=true;
      if (match[slotIndex]===-1 || dfs(match[slotIndex], seen)) { match[slotIndex]=seasonIndex; return true; }
    }
    return false;
  }
  let matched=0;
  for (let i=0;i<remainingSeasons.length;i++) {
    if (dfs(i,Array(openSlots.length).fill(false))) matched++;
    if (matched===openSlots.length) return true;
  }
  return false;
}

function targetSlotFor(player:Player, picked:SlotState) {
  const exact = slots.findIndex((slot,i)=>!picked[i] && slot===player.lineupPosition && player.positions.includes(slot));
  if (exact>=0) return exact;
  return slots.findIndex((slot,i)=>!picked[i] && player.positions.includes(slot));
}

function pickDraftOrder() { return [...seasons].sort(()=>Math.random()-.5).slice(0,11); }

export default function Home(){
  const[started,setStarted]=useState(false);
  const[order,setOrder]=useState<Season[]>([]);
  const[round,setRound]=useState(0);
  const[picked,setPicked]=useState<SlotState>(Array(11).fill(null));
  const[shareLabel,setShareLabel]=useState('ПОДЕЛИТЬСЯ РЕЗУЛЬТАТОМ');
  const[confirmation,setConfirmation]=useState<Player|null>(null);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
  const current=order[round];
  const used=useMemo(()=>new Set(picked.filter((x):x is PickedPlayer=>x!==null).map(x=>x.personId)),[picked]);
  const start=()=>{if(timer.current)clearTimeout(timer.current);setConfirmation(null);setOrder(pickDraftOrder());setPicked(Array(11).fill(null));setRound(0);setShareLabel('ПОДЕЛИТЬСЯ РЕЗУЛЬТАТОМ');setStarted(true)};
  const isSafeChoice=(player:Player)=>{
    if (!current || used.has(player.personId)) return false;
    const slotIndex=targetSlotFor(player,picked); if (slotIndex<0) return false;
    const nextPicked=[...picked]; nextPicked[slotIndex]={...player,draftPosition:slots[slotIndex]};
    const nextUsed=new Set(used); nextUsed.add(player.personId);
    const nextOpen=slots.filter((_,i)=>!nextPicked[i]);
    return canFillAll(nextOpen,order.slice(round+1),nextUsed);
  };
  const choose=(player:Player)=>{if(confirmation||!isSafeChoice(player))return;const slotIndex=targetSlotFor(player,picked);if(slotIndex<0)return;const next=[...picked];next[slotIndex]={...player,draftPosition:slots[slotIndex]};setPicked(next);setConfirmation(player);timer.current=setTimeout(()=>{setConfirmation(null);setRound(r=>r+1)},850)};

  if(!started)return <main className="landing"><div className="rail railTop"/><section className="hero"><div className="badge">МОСКВА · ЧЕРКИЗОВО</div><h1>LOKO<br/><span>DRAFT</span></h1><p>Собери величайший «Локомотив» в истории. Рейтинги скрыты до финала — выбирай сердцем и знанием истории.</p><button onClick={start}>НАЧАТЬ ДРАФТ <span>→</span></button><small>11 раундов · 16 исторических команд · универсальные позиции</small></section><div className="rail railBottom"/></main>;

  if(round>=11){
    const team=picked.filter((x):x is PickedPlayer=>x!==null);
    const avg=Math.round(team.reduce((a,x)=>a+x.rating,0)/team.length);
    const group=(indexes:number[])=>Math.round(indexes.reduce((a,i)=>a+(picked[i]?.rating||0),0)/indexes.length);
    const attack=group([7,8,9,10]),midfield=group([5,6]),defense=group([0,1,2,3,4]);
    const legendCount=team.filter(x=>x.rating>=95).length;
    const championCount=team.filter(player=>seasons.find(season=>season.players.some(x=>x.id===player.id))?.achievement.includes('Чемпион России')).length;
    const best=team.reduce((winner,player)=>player.rating>winner.rating?player:winner,team[0]);
    const share=async()=>{const url=window.location.href;const text=`Я собрал Локомотив на ${avg} 🔴🟢\nАтака: ${attack} · Полузащита: ${midfield} · Оборона: ${defense}\nЛегенд: ${legendCount}\nСможешь лучше?\n${url}`;try{if(navigator.share){await navigator.share({title:'LOKO DRAFT',text})}else{await navigator.clipboard.writeText(text);setShareLabel('СКОПИРОВАНО ✓');setTimeout(()=>setShareLabel('ПОДЕЛИТЬСЯ РЕЗУЛЬТАТОМ'),1500)}}catch{}};
    return <main className="resultPage"><div className="topline"><b>LOKO DRAFT</b><span>ФИНАЛ</span></div><section className="resultWrap compactResult"><div className="resultHead"><div><p className="eyebrow">ТВОЙ ВЕЛИЧАЙШИЙ</p><h2>ЛОКОМОТИВ</h2></div><div className="score">{avg}<small>OVERALL</small></div></div><div className="finalStats">{legendCount} ЛЕГЕНД · {championCount} ЧЕМПИОНСКИХ ВЕРСИЙ</div><TeamPitch picked={picked} reveal/><div className="metrics"><div><b>{attack}</b><span>АТАКА</span></div><div><b>{midfield}</b><span>ПОЛУЗАЩИТА</span></div><div><b>{defense}</b><span>ОБОРОНА</span></div></div><div className="bestPick"><span>ЛУЧШИЙ ВЫБОР</span><b>{best.shortName} · {best.season} · {best.rating}</b></div><div className="resultActions"><button className="share" onClick={share}>{shareLabel}</button><button className="again" onClick={start}>СЫГРАТЬ ЕЩЁ РАЗ</button></div></section></main>
  }

  return <main className="gamePage"><div className="topline"><b>LOKO DRAFT</b><span>РАУНД {round+1} / 11</span></div><div className="progress"><i style={{width:`${((round+1)/11)*100}%`}}/></div><section className="gameGrid"><div className="seasonPanel"><p className="eyebrow">ВЫБЕРИ ОДНОГО</p><h2>{current?.name}</h2><div className="achievement">{current?.achievement}</div>{current&&<SeasonPitch season={current} used={used} canChoose={isSafeChoice} onChoose={choose} locked={Boolean(confirmation)}/>}<p className="draftHint">Серые игроки уже выбраны, не подходят в свободный слот или их выбор создаст тупик в следующих раундах.</p></div><aside><p className="eyebrow">МОЙ СОСТАВ · {round+(confirmation?1:0)}/11</p><TeamPitch picked={picked}/></aside></section>{confirmation&&<div className="pickOverlay" role="status" aria-live="polite"><div><b>{confirmation.shortName} · {confirmation.season}</b><span>В СОСТАВЕ ✓</span></div></div>}</main>
}

function SeasonPitch({season,used,canChoose,onChoose,locked}:{season:Season;used:Set<string>;canChoose:(p:Player)=>boolean;onChoose:(p:Player)=>void;locked:boolean}){
  return <div className="pitch seasonPitch"><div className="centerCircle"/>{season.players.map((player,i)=>{const duplicate=used.has(player.personId);const unavailable=!duplicate&&!canChoose(player);const disabled=locked||duplicate||unavailable;const[x,y]=coords[i];return <button className="draftPlayer" disabled={disabled} onClick={()=>onChoose(player)} key={player.id} title={duplicate?'УЖЕ В СОСТАВЕ':unavailable?'НЕДОСТУПЕН ДЛЯ ЭТОГО ДРАФТА':undefined} style={{left:`${x}%`,top:`${y}%`}}><span>{player.lineupPosition}</span><b>{player.shortName}</b>{player.positions.length>1&&<small>{player.positions.join(' / ')}</small>}{!locked&&disabled&&<em>{duplicate?'УЖЕ В СОСТАВЕ':'НЕДОСТУПЕН ДЛЯ ЭТОГО ДРАФТА'}</em>}</button>})}</div>
}

function TeamPitch({picked,reveal=false}:{picked:SlotState;reveal?:boolean}){
  return <div className="pitch teamPitch"><div className="centerCircle"/>{slots.map((slot,i)=>{const player=picked[i];const[x,y]=coords[i];const legend=reveal&&player&&player.rating>=95;return <div className={`slot ${player?'filled':''} ${legend?'legend':''}`} key={i} style={{left:`${x}%`,top:`${y}%`}}><div className="shirt">{player?(reveal?player.rating:'✓'):slot}</div><b>{player?player.shortName:slot}</b>{player&&<small>{player.season}</small>}{legend&&<em>LEGEND</em>}</div>})}</div>
}
