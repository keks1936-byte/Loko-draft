export type Position = 'GK'|'LB'|'CB'|'RB'|'CM'|'LW'|'CAM'|'RW'|'ST';
export type Player = {
  id:string;
  personId:string;
  shortName:string;
  season:string;
  lineupPosition:Position;
  positions:Position[];
  rating:number;
};
export type Season = {id:string;name:string;achievement:string;players:Player[]};
const p=(personId:string,shortName:string,lineupPosition:Position,rating:number,positions:Position[]=[lineupPosition]):[string,string,Position,number,Position[]] =>
  [personId,shortName,lineupPosition,rating,positions];

const mk=(season:string,rows:Array<[string,string,Position,number,Position[]]>):Player[] =>
  rows.map(([personId,shortName,lineupPosition,rating,positions])=>({
    id:`${personId}-${season}`,
    personId,shortName,season,lineupPosition,positions,rating
  }));

export const seasons:Season[]=[
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
