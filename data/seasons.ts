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
p('nigmatullin','Нигматуллин','GK',84),p('drozdov','Дроздов','LB',61,['LB','CM']),p('chugainov','Чугайнов','CB',79),p('arifullin','Арифуллин','CB',69),p('kharlachev','Харлачёв','RB',66,['RB','CM']),p('maminov','Маминов','CM',77),p('kosolapov','Косолапов','CM',68),p('janashia','Джанашия','LW',88,['LW','ST']),p('loskov','Лоськов','CAM',87,['CAM','CM']),p('borodyuk','Бородюк','RW',73,['RW','ST']),p('bulykin','Булыкин','ST',65)
])},
{id:'2000',name:'Локомотив · 2000',achievement:'Серебро чемпионата России',players:mk('2000',[
p('nigmatullin','Нигматуллин','GK',90),p('lekgetho','Лекхето','LB',77,['LB','RB']),p('chugainov','Чугайнов','CB',82),p('sennikov','Сенников','CB',69,['CB','RB']),p('nizhegorodov','Нижегородов','RB',81,['RB','CB']),p('maminov','Маминов','CM',85),p('drozdov','Дроздов','CM',67,['CM','LB']),p('janashia','Джанашия','LW',80,['LW','ST']),p('loskov','Лоськов','CAM',94,['CAM','CM']),p('izmailov','Измайлов','RW',75,['RW','CAM']),p('buznikin','Бузникин','ST',69)
])},
{id:'2002',name:'Локомотив · 2002',achievement:'Чемпион России',players:mk('2002',[
p('ovchinnikov','Овчинников','GK',94),p('lekgetho','Лекхето','LB',87,['LB','RB']),p('ignashevich','Игнашевич','CB',91),p('sennikov','Сенников','CB',78,['CB','RB']),p('evseev','Евсеев','RB',89,['RB','LB']),p('maminov','Маминов','CM',89),p('izmailov','Измайлов','CM',87,['CM','CAM','RW']),p('obiorah','Обиора','LW',72,['LW','ST']),p('loskov','Лоськов','CAM',98,['CAM','CM']),p('julio','Жулио Сезар','RW',71,['RW','ST']),p('pimenov','Пименов','ST',76)
])},
{id:'2003',name:'Локомотив · 2003/04',achievement:'1/8 финала Лиги чемпионов',players:mk('2003/04',[
p('ovchinnikov','Овчинников','GK',95),p('lekgetho','Лекхето','LB',84,['LB','RB']),p('asatiani','Асатиани','CB',87,['CB','CM']),p('sennikov','Сенников','CB',83,['CB','RB']),p('evseev','Евсеев','RB',92,['RB','LB']),p('maminov','Маминов','CM',90),p('khokhlov','Хохлов','CM',92,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',76,['LW','CM']),p('loskov','Лоськов','CAM',98,['CAM','CM']),p('izmailov','Измайлов','RW',93,['RW','CAM']),p('ashvetia','Ашветия','ST',72)
])},
{id:'2004',name:'Локомотив · 2004',achievement:'Чемпион России',players:mk('2004',[
p('ovchinnikov','Овчинников','GK',97),p('evseev','Евсеев','LB',92,['LB','RB']),p('asatiani','Асатиани','CB',91,['CB','CM']),p('sennikov','Сенников','CB',83,['CB','RB']),p('gurenko','Гуренко','RB',83,['RB','LB','CM']),p('maminov','Маминов','CM',92),p('khokhlov','Хохлов','CM',90,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',89,['LW','CM']),p('loskov','Лоськов','CAM',97,['CAM','CM']),p('izmailov','Измайлов','RW',89,['RW','CAM']),p('sychev','Сычёв','ST',97,['ST','LW'])
])},
{id:'2005',name:'Локомотив · 2005',achievement:'Бронза чемпионата России',players:mk('2005',[
p('ovchinnikov','Овчинников','GK',90),p('evseev','Евсеев','LB',82,['LB','RB']),p('asatiani','Асатиани','CB',88,['CB','CM']),p('pashinin','Пашинин','CB',70,['CB','RB']),p('gurenko','Гуренко','RB',74,['RB','LB','CM']),p('maminov','Маминов','CM',84),p('khokhlov','Хохлов','CM',79,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',90,['LW','CM']),p('loskov','Лоськов','CAM',94,['CAM','CM']),p('izmailov','Измайлов','RW',82,['RW','CAM']),p('sychev','Сычёв','ST',93,['ST','LW'])
])},
{id:'2014',name:'Локомотив · 2013/14',achievement:'Бронза чемпионата России',players:mk('2013/14',[
p('guilherme','Гилерме','GK',81),p('denisovv','В. Денисов','LB',80),p('corluka','Чорлука','CB',93),p('durica','Дюрица','CB',81),p('shishkin','Шишкин','RB',74,['RB','LB']),p('tarasov','Тарасов','CM',78,['CM','CB']),p('tigorev','Тигорев','CM',70),p('maicon','Майкон','LW',77,['LW','ST']),p('boussoufa','Буссуфа','CAM',82,['CAM','RW']),p('samedov','Самедов','RW',89,['RW','CAM']),p('ndoye','Н’Дойе','ST',90)
])},
{id:'2017',name:'Локомотив · 2016/17',achievement:'Обладатель Кубка России',players:mk('2016/17',[
p('guilherme','Гилерме','GK',78),p('denisovv','В. Денисов','LB',72),p('corluka','Чорлука','CB',90),p('pejcinovic','Пейчинович','CB',76),p('ignatyev','Игнатьев','RB',68,['RB','RW']),p('denisovi','И. Денисов','CM',83),p('tarasov','Тарасов','CM',67,['CM','CB']),p('miranchuka','А. Миранчук','LW',79,['LW','CAM','RW']),p('fernandes','М. Фернандеш','CAM',83,['CAM','CM']),p('kasaev','Касаев','RW',68,['RW','LW']),p('ari','Ари','ST',84)
])},
{id:'2018',name:'Локомотив · 2017/18',achievement:'Чемпион России',players:mk('2017/18',[
p('guilherme','Гилерме','GK',91),p('rybus','Рыбус','LB',89,['LB','LW']),p('corluka','Чорлука','CB',94),p('kverkvelia','Кверквелия','CB',91),p('ignatyev','Игнатьев','RB',78,['RB','RW']),p('barinov','Баринов','CM',87,['CM','CB']),p('denisovi','И. Денисов','CM',91),p('farfan','Фарфан','LW',96,['LW','RW','ST']),p('fernandes','М. Фернандеш','CAM',94,['CAM','CM']),p('miranchuka','А. Миранчук','RW',89,['RW','CAM','LW']),p('eder','Эдер','ST',87)
])},
{id:'2019',name:'Локомотив · 2018/19',achievement:'Серебро РПЛ · Кубок России',players:mk('2018/19',[
p('guilherme','Гилерме','GK',89),p('rybus','Рыбус','LB',85,['LB','LW']),p('corluka','Чорлука','CB',93),p('kverkvelia','Кверквелия','CB',86),p('ignatyev','Игнатьев','RB',75,['RB','RW']),p('barinov','Баринов','CM',88,['CM','CB']),p('krychowiak','Крыховяк','CM',94),p('farfan','Фарфан','LW',93,['LW','RW','ST']),p('fernandes','М. Фернандеш','CAM',89,['CAM','CM']),p('miranchuka','А. Миранчук','RW',90,['RW','CAM','LW']),p('smolov','Смолов','ST',85)
])},
{id:'2020',name:'Локомотив · 2019/20',achievement:'Серебро чемпионата России',players:mk('2019/20',[
p('guilherme','Гилерме','GK',89),p('rybus','Рыбус','LB',83,['LB','LW']),p('corluka','Чорлука','CB',91),p('howedes','Хёведес','CB',86),p('ignatyev','Игнатьев','RB',71,['RB','RW']),p('barinov','Баринов','CM',93,['CM','CB']),p('krychowiak','Крыховяк','CM',95),p('joao','Жоау Мариу','LW',86,['LW','CAM','RW']),p('miranchuka','А. Миранчук','CAM',95,['CAM','RW','LW']),p('miranchukant','Ан. Миранчук','RW',86,['RW','CAM']),p('smolov','Смолов','ST',83)
])},
{id:'2021',name:'Локомотив · 2020/21',achievement:'Обладатель Кубка России',players:mk('2020/21',[
p('guilherme','Гилерме','GK',85),p('rybus','Рыбус','LB',76,['LB','LW']),p('corluka','Чорлука','CB',88),p('murilo','Мурило','CB',85,['CB','CM']),p('zhivoglyadov','Живоглядов','RB',64),p('barinov','Баринов','CM',88,['CM','CB']),p('krychowiak','Крыховяк','CM',93),p('kamano','Камано','LW',82,['LW','RW','ST']),p('miranchukant','Ан. Миранчук','CAM',77,['CAM','RW']),p('zhemaletdinov','Жемалетдинов','RW',85,['RW','LW','CAM']),p('smolov','Смолов','ST',81)
])},
{id:'2023',name:'Локомотив · 2022/23',achievement:'Яркая весенняя серия',players:mk('2022/23',[
p('lantratov','Лантратов','GK',75),p('tiknizyan','Тикнизян','LB',75,['LB','LW']),p('pogostnov','Погостнов','CB',60),p('magkeev','Магкеев','CB',62,['CB','CM']),p('nenakhov','Ненахов','RB',63,['RB','LB']),p('karpukas','Карпукас','CM',75),p('barinov','Баринов','CM',83,['CM','CB']),p('kamano','Камано','LW',71,['LW','RW','ST']),p('miranchukant','Ан. Миранчук','CAM',78,['CAM','RW']),p('glushenkov','Глушенков','RW',86,['RW','CAM','LW']),p('dzyuba','Дзюба','ST',83)
])},
{id:'2024',name:'Локомотив · 2023/24',achievement:'4-е место в РПЛ',players:mk('2023/24',[
p('lantratov','Лантратов','GK',85),p('tiknizyan','Тикнизян','LB',85,['LB','LW']),p('fasson','Фассон','CB',77),p('morozov','Морозов','CB',82),p('silyanov','Сильянов','RB',81,['RB','LB']),p('karpukas','Карпукас','CM',82),p('barinov','Баринов','CM',88,['CM','CB']),p('pinyaev','Пиняев','LW',84,['LW','RW']),p('miranchukant','Ан. Миранчук','CAM',85,['CAM','RW']),p('glushenkov','Глушенков','RW',94,['RW','CAM','LW']),p('dzyuba','Дзюба','ST',76)
])},
{id:'2025',name:'Локомотив · 2024/25',achievement:'Сильный старт сезона',players:mk('2024/25',[
p('lantratov','Лантратов','GK',85),p('silyanov','Сильянов','LB',84,['LB','RB']),p('nyamsi','Ньямси','CB',82),p('montes','Монтес','CB',88),p('nenakhov','Ненахов','RB',74,['RB','LB']),p('karpukas','Карпукас','CM',82),p('barinov','Баринов','CM',90,['CM','CB']),p('pinyaev','Пиняев','LW',88,['LW','RW']),p('batrakov','Батраков','CAM',95,['CAM','CM']),p('rudenko','Руденко','RW',82,['RW','ST']),p('vorobyev','Воробьёв','ST',88)
])},
{id:'2026',name:'Локомотив · 2025/26',achievement:'Современный «Локо»',players:mk('2025/26',[
p('mitryushkin','Митрюшкин','GK',79),p('silyanov','Сильянов','LB',84,['LB','RB']),p('fasson','Фассон','CB',80),p('morozov','Морозов','CB',84),p('nenakhov','Ненахов','RB',73,['RB','LB']),p('karpukas','Карпукас','CM',84),p('prutsev','Пруцев','CM',79),p('pinyaev','Пиняев','LW',88,['LW','RW']),p('batrakov','Батраков','CAM',96,['CAM','CM']),p('bakaev','Бакаев','RW',84,['RW','CAM']),p('vorobyev','Воробьёв','ST',90)
])}
];
