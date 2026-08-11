'use client';

import { useMemo, useState } from 'react';

type Position='GK'|'LB'|'CB'|'RB'|'CM'|'LW'|'CAM'|'RW'|'ST';
type Player={id:string;personId:string;shortName:string;season:string;position:Position;rating:number};
type Season={id:string;name:string;achievement:string;players:Player[]};
const slots:Position[]=['GK','LB','CB','CB','RB','CM','CM','LW','CAM','RW','ST'];
const coords=[[50,90],[14,72],[38,74],[62,74],[86,72],[36,52],[64,52],[15,30],[50,28],[85,30],[50,10]];
const mk=(season:string,rows:Array<[string,string,Position,number]>):Player[]=>rows.map(([personId,shortName,position,rating])=>({id:`${personId}-${season}`,personId,shortName,season,position,rating}));

const seasons:Season[]=[
{id:'1998',name:'Локомотив · 1998',achievement:'Полуфинал Кубка кубков',players:mk('1998',[
['nigmatullin','Нигматуллин','GK',91],['drozdov','Дроздов','LB',85],['chugainov','Чугайнов','CB',90],['arifullin','Арифуллин','CB',87],['kharlachev','Харлачёв','RB',86],['maminov','Маминов','CM',89],['kosolapov','Косолапов','CM',87],['janashia','Джанашия','LW',92],['loskov','Лоськов','CAM',92],['borodyuk','Бородюк','RW',88],['bulykin','Булыкин','ST',86]])},
{id:'2000',name:'Локомотив · 2000',achievement:'Серебро чемпионата России',players:mk('2000',[
['nigmatullin','Нигматуллин','GK',93],['lekgetho','Лекхето','LB',89],['chugainov','Чугайнов','CB',90],['sennikov','Сенников','CB',87],['nizhegorodov','Нижегородов','RB',90],['maminov','Маминов','CM',91],['drozdov','Дроздов','CM',86],['janashia','Джанашия','LW',90],['loskov','Лоськов','CAM',95],['izmailov','Измайлов','RW',88],['buznikin','Бузникин','ST',87]])},
{id:'2002',name:'Локомотив · 2002',achievement:'Чемпион России',players:mk('2002',[
['ovchinnikov','Овчинников','GK',95],['lekgetho','Лекхето','LB',91],['ignashevich','Игнашевич','CB',93],['sennikov','Сенников','CB',89],['evseev','Евсеев','RB',92],['maminov','Маминов','CM',92],['izmailov','Измайлов','CM',91],['obiorah','Обиора','LW',87],['loskov','Лоськов','CAM',97],['julio','Жулио Сезар','RW',87],['pimenov','Пименов','ST',88]])},
{id:'2003',name:'Локомотив · 2003/04',achievement:'1/8 финала Лиги чемпионов',players:mk('2003/04',[
['ovchinnikov','Овчинников','GK',95],['lekgetho','Лекхето','LB',90],['asatiani','Асатиани','CB',91],['sennikov','Сенников','CB',90],['evseev','Евсеев','RB',93],['maminov','Маминов','CM',92],['khokhlov','Хохлов','CM',93],['bilyaletdinov','Билялетдинов','LW',88],['loskov','Лоськов','CAM',98],['izmailov','Измайлов','RW',93],['ashvetia','Ашветия','ST',87]])},
{id:'2004',name:'Локомотив · 2004',achievement:'Чемпион России',players:mk('2004',[
['ovchinnikov','Овчинников','GK',96],['evseev','Евсеев','LB',93],['asatiani','Асатиани','CB',93],['sennikov','Сенников','CB',90],['gurenko','Гуренко','RB',90],['maminov','Маминов','CM',93],['khokhlov','Хохлов','CM',92],['bilyaletdinov','Билялетдинов','LW',92],['loskov','Лоськов','CAM',97],['izmailov','Измайлов','RW',92],['sychev','Сычёв','ST',96]])},
{id:'2005',name:'Локомотив · 2005',achievement:'Бронза чемпионата России',players:mk('2005',[
['ovchinnikov','Овчинников','GK',93],['evseev','Евсеев','LB',90],['asatiani','Асатиани','CB',92],['pashinin','Пашинин','CB',87],['gurenko','Гуренко','RB',88],['maminov','Маминов','CM',91],['khokhlov','Хохлов','CM',90],['bilyaletdinov','Билялетдинов','LW',93],['loskov','Лоськов','CAM',95],['izmailov','Измайлов','RW',90],['sychev','Сычёв','ST',94]])},
{id:'2014',name:'Локомотив · 2013/14',achievement:'Бронза чемпионата России',players:mk('2013/14',[
['guilherme','Гилерме','GK',90],['denisovv','В. Денисов','LB',90],['corluka','Чорлука','CB',94],['durica','Дюрица','CB',90],['shishkin','Шишкин','RB',88],['tarasov','Тарасов','CM',89],['tigorev','Тигорев','CM',87],['maicon','Майкон','LW',89],['boussoufa','Буссуфа','CAM',90],['samedov','Самедов','RW',92],['ndoye','Н’Дойе','ST',93]])},
{id:'2017',name:'Локомотив · 2016/17',achievement:'Обладатель Кубка России',players:mk('2016/17',[
['guilherme','Гилерме','GK',90],['denisovv','В. Денисов','LB',88],['corluka','Чорлука','CB',93],['pejcinovic','Пейчинович','CB',89],['ignatyev','Игнатьев','RB',87],['denisovi','И. Денисов','CM',91],['tarasov','Тарасов','CM',87],['miranchuka','А. Миранчук','LW',90],['fernandes','М. Фернандеш','CAM',91],['kasaev','Касаев','RW',87],['ari','Ари','ST',91]])},
{id:'2018',name:'Локомотив · 2017/18',achievement:'Чемпион России',players:mk('2017/18',[
['guilherme','Гилерме','GK',93],['rybus','Рыбус','LB',92],['corluka','Чорлука','CB',95],['kverkvelia','Кверквелия','CB',93],['ignatyev','Игнатьев','RB',89],['barinov','Баринов','CM',91],['denisovi','И. Денисов','CM',93],['farfan','Фарфан','LW',96],['fernandes','М. Фернандеш','CAM',94],['miranchuka','А. Миранчук','RW',92],['eder','Эдер','ST',91]])},
{id:'2019',name:'Локомотив · 2018/19',achievement:'Серебро РПЛ · Кубок России',players:mk('2018/19',[
['guilherme','Гилерме','GK',92],['rybus','Рыбус','LB',91],['corluka','Чорлука','CB',94],['kverkvelia','Кверквелия','CB',91],['ignatyev','Игнатьев','RB',88],['barinov','Баринов','CM',92],['krychowiak','Крыховяк','CM',95],['farfan','Фарфан','LW',94],['fernandes','М. Фернандеш','CAM',92],['miranchuka','А. Миранчук','RW',93],['smolov','Смолов','ST',91]])},
{id:'2020',name:'Локомотив · 2019/20',achievement:'Серебро чемпионата России',players:mk('2019/20',[
['guilherme','Гилерме','GK',92],['rybus','Рыбус','LB',90],['corluka','Чорлука','CB',93],['howedes','Хёведес','CB',91],['ignatyev','Игнатьев','RB',87],['barinov','Баринов','CM',94],['krychowiak','Крыховяк','CM',96],['joao','Жоау Мариу','LW',91],['miranchuka','А. Миранчук','CAM',96],['miranchukant','Ан. Миранчук','RW',91],['smolov','Смолов','ST',90]])},
{id:'2021',name:'Локомотив · 2020/21',achievement:'Обладатель Кубка России',players:mk('2020/21',[
['guilherme','Гилерме','GK',91],['rybus','Рыбус','LB',89],['corluka','Чорлука','CB',92],['murilo','Мурило','CB',91],['zhivoglyadov','Живоглядов','RB',86],['barinov','Баринов','CM',92],['krychowiak','Крыховяк','CM',94],['kamano','Камано','LW',90],['miranchukant','Ан. Миранчук','CAM',89],['zhemaletdinov','Жемалетдинов','RW',91],['smolov','Смолов','ST',90]])}
];

export default function Home(){
 const[started,setStarted]=useState(false);const[order,setOrder]=useState<Season[]>([]);const[round,setRound]=useState(0);const[picked,setPicked]=useState<(Player|null)[]>(Array(11).fill(null));
 const current=order[round];
 const used=useMemo(()=>new Set(picked.filter((p):p is Player=>p!==null).map(p=>p.personId)),[picked]);
 const open=useMemo(()=>slots.map((s,i)=>({s,i})).filter(({i})=>!picked[i]),[picked]);
 const start=()=>{setOrder([...seasons].sort(()=>Math.random()-.5).slice(0,11));setPicked(Array(11).fill(null));setRound(0);setStarted(true)};
 const choose=(p:Player)=>{if(used.has(p.personId))return;const target=open.find(x=>x.s===p.position);if(!target)return;const next=[...picked];next[target.i]=p;setPicked(next);setRound(r=>r+1)};
 if(!started)return <main className="landing"><div className="rail railTop"/><section className="hero"><div className="badge">МОСКВА · ЧЕРКИЗОВО</div><h1>LOKO<br/><span>DRAFT</span></h1><p>Собери величайший «Локомотив» в истории. Рейтинги скрыты до финала — выбирай сердцем и знанием истории.</p><button onClick={start}>НАЧАТЬ ДРАФТ <span>→</span></button><small>11 раундов · 12 исторических команд · схема 4–2–3–1</small></section><div className="rail railBottom"/></main>;
 if(round>=11){const team=picked.filter((p):p is Player=>p!==null);const avg=Math.round(team.reduce((a,p)=>a+p.rating,0)/11);const group=(ps:Position[])=>{const x=team.filter(p=>ps.includes(p.position));return Math.round(x.reduce((a,p)=>a+p.rating,0)/x.length)};return <main className="resultPage"><div className="topline"><b>LOKO DRAFT</b><span>ФИНАЛ</span></div><section className="resultWrap"><p className="eyebrow">ТВОЙ ВЕЛИЧАЙШИЙ</p><h2>ЛОКОМОТИВ</h2><div className="score">{avg}<small>OVERALL</small></div><TeamPitch picked={picked} reveal/><div className="metrics"><div><b>{group(['LW','CAM','RW','ST'])}</b><span>АТАКА</span></div><div><b>{group(['CM'])}</b><span>ПОЛУЗАЩИТА</span></div><div><b>{group(['LB','CB','RB','GK'])}</b><span>ОБОРОНА</span></div></div><button className="again" onClick={start}>СЫГРАТЬ ЕЩЁ РАЗ</button></section></main>}
 return <main className="gamePage"><div className="topline"><b>LOKO DRAFT</b><span>РАУНД {round+1} / 11</span></div><div className="progress"><i style={{width:`${((round+1)/11)*100}%`}}/></div><section className="gameGrid"><div className="seasonPanel"><p className="eyebrow">ВЫБЕРИ ОДНОГО</p><h2>{current?.name}</h2><div className="achievement">{current?.achievement}</div>{current&&<SeasonPitch season={current} used={used} open={open.map(x=>x.s)} onChoose={choose}/>}<p className="draftHint">Рейтинг игрока откроется только после завершения драфта.</p></div><aside><p className="eyebrow">МОЙ СОСТАВ</p><TeamPitch picked={picked}/></aside></section></main>
}

function SeasonPitch({season,used,open,onChoose}:{season:Season;used:Set<string>;open:Position[];onChoose:(p:Player)=>void}){return <div className="pitch seasonPitch"><div className="centerCircle"/>{season.players.map((p,i)=>{const blocked=used.has(p.personId)||!open.includes(p.position);const[x,y]=coords[i];return <button className="draftPlayer" disabled={blocked} onClick={()=>onChoose(p)} key={p.id} style={{left:`${x}%`,top:`${y}%`}}><span>{p.position}</span><b>{p.shortName}</b>{used.has(p.personId)&&<small>УЖЕ В XI</small>}</button>})}</div>}
function TeamPitch({picked,reveal=false}:{picked:(Player|null)[];reveal?:boolean}){return <div className="pitch"><div className="centerCircle"/>{slots.map((slot,i)=>{const p=picked[i];const[x,y]=coords[i];return <div className={`slot ${p?'filled':''}`} key={i} style={{left:`${x}%`,top:`${y}%`}}><div className="shirt">{p?(reveal?p.rating:'✓'):slot}</div><b>{p?p.shortName:slot}</b>{p&&<small>{p.season}</small>}</div>})}</div>}
