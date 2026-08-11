'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { seasons, type Player, type Position, type Season } from '../data/seasons';

type PickedPlayer = Player & {draftPosition:Position};
type SlotState = (PickedPlayer|null)[];

const slots:Position[]=['GK','LB','CB','CB','RB','CM','CM','LW','CAM','RW','ST'];
const coords=[[50,90],[14,72],[38,74],[62,74],[86,72],[36,52],[64,52],[15,30],[50,28],[85,30],[50,10]];

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
