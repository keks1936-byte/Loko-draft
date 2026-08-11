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
{id:'HISTORIC',name:'Локомотив · XX век',achievement:'Исторический состав',players:mk('HISTORIC',[
p('maslachenko','Маслаченко','GK',91),p('basalaev','Басалаев','LB',82),p('marienko','Марьенко','CB',83),p('nkmorozov','Н. Морозов','CB',85),p('zaitsev','Зайцев','RB',82),p('batanov','Батанов','CM',87),p('bubukin','Бубукин','CM',94,['CM','CAM']),p('chesnokov','Чесноков','LW',88,['LW','ST']),p('voroshilov','Ворошилов','CAM',92,['CAM','ST']),p('sokolov','В. Соколов','RW',90,['RW','ST']),p('nodiya','Нодия','ST',93)
])},
{id:'2000',name:'Локомотив · 2000',achievement:'Серебро чемпионата России',players:mk('2000',[
p('nigmatullin','Нигматуллин','GK',90),p('lekgetho','Лекхето','LB',77,['LB','RB']),p('chugainov','Чугайнов','CB',82),p('sennikov','Сенников','CB',69,['CB','RB']),p('nizhegorodov','Нижегородов','RB',81,['RB','CB']),p('maminov','Маминов','CM',85),p('drozdov','Дроздов','CM',67,['CM','LB']),p('janashia','Джанашия','LW',80,['LW','ST']),p('loskov','Лоськов','CAM',94,['CAM','CM']),p('izmailov','Измайлов','RW',75,['RW','CAM']),p('buznikin','Бузникин','ST',69)
])},
{id:'2001',name:'Локомотив · 2001',achievement:'Серебро чемпионата России · Кубок России',players:mk('2001',[
p('nigmatullin','Нигматуллин','GK',94),p('lekgetho','Лекхето','LB',83,['LB','RB']),p('chugainov','Чугайнов','CB',84),p('sennikov','Сенников','CB',75,['CB','RB']),p('nizhegorodov','Нижегородов','RB',86,['RB','CB']),p('maminov','Маминов','CM',87),p('izmailov','Измайлов','CM',85,['CM','CAM','RW']),p('obiorah','Обиора','LW',75,['LW','ST']),p('loskov','Лоськов','CAM',96,['CAM','CM']),p('buznikin','Бузникин','RW',73,['RW','ST']),p('pimenov','Пименов','ST',75)
])},
{id:'2002',name:'Локомотив · 2002',achievement:'Чемпион России',players:mk('2002',[
p('ovchinnikov','Овчинников','GK',94),p('lekgetho','Лекхето','LB',87,['LB','RB']),p('ignashevich','Игнашевич','CB',91),p('sennikov','Сенников','CB',78,['CB','RB']),p('evseev','Евсеев','RB',89,['RB','LB']),p('maminov','Маминов','CM',89),p('izmailov','Измайлов','CM',87,['CM','CAM','RW']),p('obiorah','Обиора','LW',72,['LW','ST']),p('loskov','Лоськов','CAM',98,['CAM','CM']),p('julio','Жулио Сезар','RW',71,['RW','ST']),p('pimenov','Пименов','ST',76)
])},
{id:'2003',name:'Локомотив · 2003',achievement:'1/8 финала Лиги чемпионов',players:mk('2003',[
p('ovchinnikov','Овчинников','GK',95),p('lekgetho','Лекхето','LB',84,['LB','RB']),p('asatiani','Асатиани','CB',87,['CB','CM']),p('sennikov','Сенников','CB',83,['CB','RB']),p('evseev','Евсеев','RB',92,['RB','LB']),p('maminov','Маминов','CM',90),p('khokhlov','Хохлов','CM',92,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',76,['LW','CM']),p('loskov','Лоськов','CAM',98,['CAM','CM']),p('izmailov','Измайлов','RW',93,['RW','CAM']),p('ashvetia','Ашветия','ST',72)
])},
{id:'2004',name:'Локомотив · 2004',achievement:'Чемпион России',players:mk('2004',[
p('ovchinnikov','Овчинников','GK',97),p('evseev','Евсеев','LB',92,['LB','RB']),p('asatiani','Асатиани','CB',91,['CB','CM']),p('sennikov','Сенников','CB',83,['CB','RB']),p('gurenko','Гуренко','RB',83,['RB','LB','CM']),p('maminov','Маминов','CM',92),p('khokhlov','Хохлов','CM',90,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',89,['LW','CM']),p('loskov','Лоськов','CAM',97,['CAM','CM']),p('izmailov','Измайлов','RW',89,['RW','CAM']),p('sychev','Сычёв','ST',97,['ST','LW'])
])},
{id:'2005',name:'Локомотив · 2005',achievement:'Бронза чемпионата России',players:mk('2005',[
p('ovchinnikov','Овчинников','GK',90),p('evseev','Евсеев','LB',82,['LB','RB']),p('asatiani','Асатиани','CB',88,['CB','CM']),p('pashinin','Пашинин','CB',70,['CB','RB']),p('gurenko','Гуренко','RB',74,['RB','LB','CM']),p('maminov','Маминов','CM',84),p('khokhlov','Хохлов','CM',79,['CM','CAM']),p('bilyaletdinov','Билялетдинов','LW',90,['LW','CM']),p('loskov','Лоськов','CAM',94,['CAM','CM']),p('izmailov','Измайлов','RW',82,['RW','CAM']),p('sychev','Сычёв','ST',93,['ST','LW'])
])},
{id:'2006',name:'Локомотив · 2006',achievement:'Бронза чемпионата России',players:mk('2006',[
p('polyakov','Поляков','GK',79),p('spahic','Спахич','LB',78,['LB','CB']),p('asatiani','Асатиани','CB',88,['CB','CM']),p('pashinin','Пашинин','CB',75,['CB','RB']),p('gurenko','Гуренко','RB',80,['RB','LB','CM']),p('maminov','Маминов','CM',83),p('bilyaletdinov','Билялетдинов','CM',91,['CM','LW']),p('samedov','Самедов','LW',79,['LW','RW']),p('loskov','Лоськов','CAM',92,['CAM','CM']),p('izmailov','Измайлов','RW',80,['RW','CAM']),p('sychev','Сычёв','ST',90,['ST','LW'])
])},
{id:'2007',name:'Локомотив · 2007',achievement:'Обладатель Кубка России',players:mk('2007',[
p('yakupovic','Якупович','GK',75),p('fininho','Фининью','LB',77,['LB','LW']),p('asatiani','Асатиани','CB',84,['CB','CM']),p('rodolfo','Родолфо','CB',82),p('ivanovic','Иванович','RB',73,['RB','CB']),p('maminov','Маминов','CM',80),p('gurenko','Гуренко','CM',77,['CM','RB','LB']),p('bilyaletdinov','Билялетдинов','LW',92,['LW','CM']),p('kochish','Кочиш','CAM',78,['CAM','RW']),p('samedov','Самедов','RW',80,['RW','LW']),p('sychev','Сычёв','ST',86,['ST','LW'])
])},
{id:'2008',name:'Локомотив · 2008',achievement:'Финалист Суперкубка России',players:mk('2008',[
p('cech','Чех','GK',81),p('fininho','Фининью','LB',75,['LB','LW']),p('asatiani','Асатиани','CB',83,['CB','CM']),p('rodolfo','Родолфо','CB',85),p('kambolov','Камболов','RB',68,['RB','CM']),p('maminov','Маминов','CM',78),p('glushakov','Глушаков','CM',77),p('bilyaletdinov','Билялетдинов','LW',91,['LW','CM']),p('torbinskiy','Торбинский','CAM',84,['CAM','CM','LW']),p('kochish','Кочиш','RW',76,['RW','CAM']),p('sychev','Сычёв','ST',85,['ST','LW'])
])},
{id:'2009',name:'Локомотив · 2009',achievement:'4-е место в чемпионате России',players:mk('2009',[
p('guilherme','Гилерме','GK',78),p('yanbaev','Янбаев','LB',84,['LB','RB']),p('asatiani','Асатиани','CB',84,['CB','CM']),p('rodolfo','Родолфо','CB',86),p('kuzmin','Кузьмин','RB',77,['RB','LB']),p('duimovic','Дуймович','CM',81),p('glushakov','Глушаков','CM',85),p('torbinskiy','Торбинский','LW',83,['LW','CM','CAM']),p('wagner','Вагнер','CAM',81,['CAM','CM']),p('bilyaletdinov','Билялетдинов','RW',88,['RW','LW','CM']),p('sychev','Сычёв','ST',87,['ST','LW'])
])},
{id:'2010',name:'Локомотив · 2010',achievement:'5-е место в чемпионате России',players:mk('2010',[
p('guilherme','Гилерме','GK',82),p('yanbaev','Янбаев','LB',83,['LB','RB']),p('asatiani','Асатиани','CB',82,['CB','CM']),p('basha','Баша','CB',84),p('kuzmin','Кузьмин','RB',78,['RB','LB']),p('duimovic','Дуймович','CM',78),p('glushakov','Глушаков','CM',88),p('torbinskiy','Торбинский','LW',82,['LW','CM','CAM']),p('aliciev','Алиев','CAM',89,['CAM','CM']),p('ignatyev','Игнатьев','RW',76,['RW','RB']),p('sychev','Сычёв','ST',84,['ST','LW'])
])},
{id:'2011/12',name:'Локомотив · 2011/12',achievement:'7-е место в чемпионате России',players:mk('2011/12',[
p('guilherme','Гилерме','GK',84),p('yanbaev','Янбаев','LB',82,['LB','RB']),p('burlak','Бурлак','CB',79),p('da-costa','Да Кошта','CB',82),p('shishkin','Шишкин','RB',81,['RB','LB']),p('ibricic','Ибричич','CM',76,['CM','CAM']),p('glushakov','Глушаков','CM',90),p('torbinskiy','Торбинский','LW',80,['LW','CM','CAM']),p('loskov','Лоськов','CAM',80,['CAM','CM']),p('maicon','Майкон','RW',78,['RW','LW','ST']),p('caicedo','Кайседо','ST',88)
])},
{id:'2012/13',name:'Локомотив · 2012/13',achievement:'9-е место в чемпионате России',players:mk('2012/13',[
p('guilherme','Гилерме','GK',82),p('yanbaev','Янбаев','LB',79,['LB','RB']),p('corluka','Чорлука','CB',89),p('burlak','Бурлак','CB',74),p('shishkin','Шишкин','RB',78,['RB','LB']),p('tarasov','Тарасов','CM',77,['CM','CB']),p('glushakov','Глушаков','CM',86),p('maicon','Майкон','LW',78,['LW','ST']),p('samedov','Самедов','CAM',85,['CAM','RW']),p('obinna','Обинна','RW',78,['RW','LW','ST']),p('ndoye','Н’Дойе','ST',87)
])},
{id:'2013/14',name:'Локомотив · 2013/14',achievement:'Бронза чемпионата России',players:mk('2013/14',[
p('guilherme','Гилерме','GK',81),p('denisovv','В. Денисов','LB',80),p('corluka','Чорлука','CB',93),p('durica','Дюрица','CB',81),p('shishkin','Шишкин','RB',74,['RB','LB']),p('tarasov','Тарасов','CM',78,['CM','CB']),p('tigorev','Тигорев','CM',70),p('maicon','Майкон','LW',77,['LW','ST']),p('boussoufa','Буссуфа','CAM',82,['CAM','RW']),p('samedov','Самедов','RW',89,['RW','CAM']),p('ndoye','Н’Дойе','ST',90)
])},
{id:'2014/15',name:'Локомотив · 2014/15',achievement:'Обладатель Кубка России',players:mk('2014/15',[
p('guilherme','Гилерме','GK',84),p('denisovv','В. Денисов','LB',81),p('corluka','Чорлука','CB',92),p('durica','Дюрица','CB',82),p('shishkin','Шишкин','RB',76,['RB','LB']),p('tarasov','Тарасов','CM',78,['CM','CB']),p('fernandes','М. Фернандеш','CM',84,['CM','CAM']),p('maicon','Майкон','LW',79,['LW','ST']),p('boussoufa','Буссуфа','CAM',83,['CAM','RW']),p('samedov','Самедов','RW',88,['RW','CAM']),p('niasse','Ньяссе','ST',84)
])},
{id:'2015/16',name:'Локомотив · 2015/16',achievement:'6-е место в чемпионате России',players:mk('2015/16',[
p('guilherme','Гилерме','GK',85),p('denisovv','В. Денисов','LB',78),p('corluka','Чорлука','CB',91),p('pejcinovic','Пейчинович','CB',80),p('shishkin','Шишкин','RB',75,['RB','LB']),p('tarasov','Тарасов','CM',79,['CM','CB']),p('kolomeytsev','Коломейцев','CM',80,['CM','RW']),p('maicon','Майкон','LW',78,['LW','ST']),p('miranchuka','А. Миранчук','CAM',81,['CAM','RW','LW']),p('samedov','Самедов','RW',87,['RW','CAM']),p('niasse','Ньяссе','ST',91)
])},
{id:'2016/17',name:'Локомотив · 2016/17',achievement:'Обладатель Кубка России',players:mk('2016/17',[
p('guilherme','Гилерме','GK',78),p('denisovv','В. Денисов','LB',72),p('corluka','Чорлука','CB',90),p('pejcinovic','Пейчинович','CB',76),p('ignatyev','Игнатьев','RB',68,['RB','RW']),p('denisovi','И. Денисов','CM',83),p('tarasov','Тарасов','CM',67,['CM','CB']),p('miranchuka','А. Миранчук','LW',79,['LW','CAM','RW']),p('fernandes','М. Фернандеш','CAM',83,['CAM','CM']),p('kasaev','Касаев','RW',68,['RW','LW']),p('ari','Ари','ST',84)
])},
{id:'2017/18',name:'Локомотив · 2017/18',achievement:'Чемпион России',players:mk('2017/18',[
p('guilherme','Гилерме','GK',91),p('rybus','Рыбус','LB',89,['LB','LW']),p('corluka','Чорлука','CB',94),p('kverkvelia','Кверквелия','CB',91),p('ignatyev','Игнатьев','RB',78,['RB','RW']),p('barinov','Баринов','CM',87,['CM','CB']),p('denisovi','И. Денисов','CM',91),p('farfan','Фарфан','LW',96,['LW','RW','ST']),p('fernandes','М. Фернандеш','CAM',94,['CAM','CM']),p('miranchuka','А. Миранчук','RW',89,['RW','CAM','LW']),p('eder','Эдер','ST',87)
])},
{id:'2018/19',name:'Локомотив · 2018/19',achievement:'Серебро РПЛ · Кубок России',players:mk('2018/19',[
p('guilherme','Гилерме','GK',89),p('rybus','Рыбус','LB',85,['LB','LW']),p('corluka','Чорлука','CB',93),p('kverkvelia','Кверквелия','CB',86),p('ignatyev','Игнатьев','RB',75,['RB','RW']),p('barinov','Баринов','CM',88,['CM','CB']),p('krychowiak','Крыховяк','CM',94),p('farfan','Фарфан','LW',93,['LW','RW','ST']),p('fernandes','М. Фернандеш','CAM',89,['CAM','CM']),p('miranchuka','А. Миранчук','RW',90,['RW','CAM','LW']),p('smolov','Смолов','ST',85)
])},
{id:'2019/20',name:'Локомотив · 2019/20',achievement:'Серебро чемпионата России',players:mk('2019/20',[
p('guilherme','Гилерме','GK',89),p('rybus','Рыбус','LB',83,['LB','LW']),p('corluka','Чорлука','CB',91),p('howedes','Хёведес','CB',86),p('ignatyev','Игнатьев','RB',71,['RB','RW']),p('barinov','Баринов','CM',93,['CM','CB']),p('krychowiak','Крыховяк','CM',95),p('joao','Жоау Мариу','LW',86,['LW','CAM','RW']),p('miranchuka','А. Миранчук','CAM',95,['CAM','RW','LW']),p('miranchukant','Ан. Миранчук','RW',86,['RW','CAM']),p('smolov','Смолов','ST',83)
])},
{id:'2020/21',name:'Локомотив · 2020/21',achievement:'Обладатель Кубка России',players:mk('2020/21',[
p('guilherme','Гилерме','GK',85),p('rybus','Рыбус','LB',76,['LB','LW']),p('corluka','Чорлука','CB',88),p('murilo','Мурило','CB',85,['CB','CM']),p('zhivoglyadov','Живоглядов','RB',64),p('barinov','Баринов','CM',88,['CM','CB']),p('krychowiak','Крыховяк','CM',93),p('kamano','Камано','LW',82,['LW','RW','ST']),p('miranchukant','Ан. Миранчук','CAM',77,['CAM','RW']),p('zhemaletdinov','Жемалетдинов','RW',85,['RW','LW','CAM']),p('smolov','Смолов','ST',81)
])},
{id:'2021/22',name:'Локомотив · 2021/22',achievement:'6-е место в чемпионате России',players:mk('2021/22',[
p('guilherme','Гилерме','GK',80),p('rybus','Рыбус','LB',77,['LB','LW']),p('jedvaj','Едвай','CB',79,['CB','RB']),p('pablo','Пабло','CB',78),p('zhivoglyadov','Живоглядов','RB',69),p('barinov','Баринов','CM',87,['CM','CB']),p('beka-beka','Бека-Бека','CM',78),p('kamano','Камано','LW',80,['LW','RW','ST']),p('miranchukant','Ан. Миранчук','CAM',76,['CAM','RW']),p('zhemaletdinov','Жемалетдинов','RW',83,['RW','LW','CAM']),p('kuchta','Кухта','ST',80)
])},
{id:'2022/23',name:'Локомотив · 2022/23',achievement:'Яркая весенняя серия',players:mk('2022/23',[
p('lantratov','Лантратов','GK',75),p('tiknizyan','Тикнизян','LB',75,['LB','LW']),p('pogostnov','Погостнов','CB',60),p('magkeev','Магкеев','CB',62,['CB','CM']),p('nenakhov','Ненахов','RB',63,['RB','LB']),p('karpukas','Карпукас','CM',75),p('barinov','Баринов','CM',83,['CM','CB']),p('kamano','Камано','LW',71,['LW','RW','ST']),p('miranchukant','Ан. Миранчук','CAM',78,['CAM','RW']),p('glushenkov','Глушенков','RW',86,['RW','CAM','LW']),p('dzyuba','Дзюба','ST',83)
])},
{id:'2023/24',name:'Локомотив · 2023/24',achievement:'4-е место в РПЛ',players:mk('2023/24',[
p('lantratov','Лантратов','GK',85),p('tiknizyan','Тикнизян','LB',85,['LB','LW']),p('fasson','Фассон','CB',77),p('morozov','Морозов','CB',82),p('silyanov','Сильянов','RB',81,['RB','LB']),p('karpukas','Карпукас','CM',82),p('barinov','Баринов','CM',88,['CM','CB']),p('pinyaev','Пиняев','LW',84,['LW','RW']),p('miranchukant','Ан. Миранчук','CAM',85,['CAM','RW']),p('glushenkov','Глушенков','RW',94,['RW','CAM','LW']),p('dzyuba','Дзюба','ST',76)
])},
{id:'2024/25',name:'Локомотив · 2024/25',achievement:'Сильный старт сезона',players:mk('2024/25',[
p('lantratov','Лантратов','GK',85),p('silyanov','Сильянов','LB',84,['LB','RB']),p('nyamsi','Ньямси','CB',82),p('montes','Монтес','CB',88),p('nenakhov','Ненахов','RB',74,['RB','LB']),p('karpukas','Карпукас','CM',82),p('barinov','Баринов','CM',90,['CM','CB']),p('pinyaev','Пиняев','LW',88,['LW','RW']),p('batrakov','Батраков','CAM',95,['CAM','CM']),p('rudenko','Руденко','RW',82,['RW','ST']),p('vorobyev','Воробьёв','ST',88)
])},
{id:'2025/26',name:'Локомотив · 2025/26',achievement:'Современный «Локо»',players:mk('2025/26',[
p('mitryushkin','Митрюшкин','GK',79),p('silyanov','Сильянов','LB',84,['LB','RB']),p('fasson','Фассон','CB',80),p('morozov','Морозов','CB',84),p('nenakhov','Ненахов','RB',73,['RB','LB']),p('karpukas','Карпукас','CM',84),p('prutsev','Пруцев','CM',79),p('pinyaev','Пиняев','LW',88,['LW','RW']),p('batrakov','Батраков','CAM',96,['CAM','CM']),p('bakaev','Бакаев','RW',84,['RW','CAM']),p('vorobyev','Воробьёв','ST',90)
])}
];

const expectedLineup: Position[] = ['GK','LB','CB','CB','RB','CM','CM','LW','CAM','RW','ST'];

/** Throws only in development when the shared season database is malformed. */
export function validateSeasons(data: Season[] = seasons): void {
  const players = data.flatMap((season) => season.players);
  const ids = new Set(players.map((player) => player.id));
  if (data.length !== 27) throw new Error(`Expected 27 seasons, received ${data.length}`);
  if (players.length !== 297) throw new Error(`Expected 297 player versions, received ${players.length}`);
  if (ids.size !== players.length) throw new Error('Seasonal player version ids must be unique');

  for (const season of data) {
    if (season.players.length !== 11) throw new Error(`${season.id}: expected exactly 11 players`);
    season.players.forEach((player, index) => {
      if (player.lineupPosition !== expectedLineup[index]) throw new Error(`${season.id}: invalid XI position at slot ${index + 1}`);
      if (!player.positions.includes(player.lineupPosition)) throw new Error(`${player.id}: lineupPosition must be included in positions`);
      if (!player.personId.trim()) throw new Error(`${player.id}: personId must not be empty`);
      if (!player.shortName.trim()) throw new Error(`${player.id}: shortName must not be empty`);
    });
  }
}

if (process.env.NODE_ENV !== 'production') validateSeasons();
