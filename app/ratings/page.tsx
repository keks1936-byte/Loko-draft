'use client';

import { useMemo, useState } from 'react';
import { seasons, type Player, type Position } from '../../data/seasons';

type Version = Player & { achievement: string };
type SortKey = 'rating' | 'season' | 'name' | 'position';

const positions: Position[] = ['GK', 'LB', 'CB', 'RB', 'CM', 'LW', 'CAM', 'RW', 'ST'];
const ratingScale = Array.from({ length: 16 }, (_, index) => 99 - index);
const versions: Version[] = seasons.flatMap((season) =>
  season.players.map((player) => ({ ...player, achievement: season.achievement })),
);

function ratingCategory(rating: number) {
  if (rating >= 95) return 'LEGEND';
  if (rating >= 92) return 'ELITE';
  if (rating >= 89) return 'STRONG';
  if (rating >= 86) return 'SOLID';
  return 'ROTATION';
}

function byRatingThenSeason(a: Version, b: Version) {
  return b.rating - a.rating || a.season.localeCompare(b.season, 'ru', { numeric: true });
}

function RatingBadge({ rating }: { rating: number }) {
  const category = ratingCategory(rating);
  return <span className={`ratingBadge rating${category.toLowerCase()}`}><b>{rating}</b>{category}</span>;
}

export default function RatingsPage() {
  const [sort, setSort] = useState<SortKey>('rating');
  const [season, setSeason] = useState('all');
  const [position, setPosition] = useState('all');
  const [minimum, setMinimum] = useState(84);
  const [legendsOnly, setLegendsOnly] = useState(false);

  const distribution = useMemo(() => new Map(ratingScale.map((rating) => [rating, versions.filter((player) => player.rating === rating).length])), []);
  const topTwenty = useMemo(() => [...versions].sort(byRatingThenSeason).slice(0, 20), []);
  const positionTops = useMemo(() => positions.map((item) => ({
    position: item,
    players: versions.filter((player) => player.positions.includes(item)).sort(byRatingThenSeason).slice(0, 5),
  })), []);

  const filtered = useMemo(() => {
    const result = versions.filter((player) =>
      (season === 'all' || player.season === season) &&
      (position === 'all' || player.positions.includes(position as Position)) &&
      player.rating >= minimum && (!legendsOnly || player.rating >= 95),
    );
    return result.sort((a, b) => {
      if (sort === 'season') return a.season.localeCompare(b.season, 'ru', { numeric: true }) || byRatingThenSeason(a, b);
      if (sort === 'name') return a.shortName.localeCompare(b.shortName, 'ru') || byRatingThenSeason(a, b);
      if (sort === 'position') return positions.indexOf(a.lineupPosition) - positions.indexOf(b.lineupPosition) || byRatingThenSeason(a, b);
      return byRatingThenSeason(a, b);
    });
  }, [legendsOnly, minimum, position, season, sort]);

  return <main className="ratingsPage">
    <header className="ratingsHeader"><div><p className="eyebrow">ВНУТРЕННИЙ ИНСТРУМЕНТ · БАЗА ИГРОКОВ</p><h1>RATINGS<br/><span>REVIEW</span></h1></div><div className="databaseCount"><b>{versions.length}</b><span>СЕЗОННЫХ ВЕРСИЙ</span></div></header>

    <section className="ratingsSection"><div className="sectionTitle"><div><p className="eyebrow">БАЛАНС БАЗЫ</p><h2>РАСПРЕДЕЛЕНИЕ РЕЙТИНГОВ</h2></div></div><div className="distribution">{ratingScale.map((rating) => <div key={rating}><b>{rating}</b><i style={{ height: `${Math.max(4, (distribution.get(rating) || 0) / Math.max(...distribution.values()) * 100)}%` }}/><span>{distribution.get(rating)}</span></div>)}</div></section>

    <section className="ratingsSection"><div className="sectionTitle"><div><p className="eyebrow">ВСЯ ИСТОРИЯ</p><h2>ТОП-20 ВЕРСИЙ ИГРОКОВ</h2></div></div><div className="topGrid">{topTwenty.map((player, index) => <article className="topCard" key={player.id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div><b>{player.shortName}</b><small>{player.season} · {player.lineupPosition}</small></div><RatingBadge rating={player.rating}/></article>)}</div></section>

    <section className="ratingsSection"><div className="sectionTitle"><div><p className="eyebrow">ЛУЧШИЕ В АМПЛУА</p><h2>ТОП ПО ПОЗИЦИЯМ</h2></div></div><div className="positionGrid">{positionTops.map((group) => <article className="positionCard" key={group.position}><h3>{group.position}</h3><ol>{group.players.map((player) => <li key={`${group.position}-${player.id}`}><div><b>{player.shortName}</b><small>{player.season}</small></div><RatingBadge rating={player.rating}/></li>)}</ol></article>)}</div></section>

    <section className="ratingsSection databaseSection"><div className="sectionTitle"><div><p className="eyebrow">ЕДИНЫЙ ИСТОЧНИК ДАННЫХ</p><h2>ВСЕ ВЕРСИИ</h2></div><b className="resultCount">{filtered.length} / {versions.length}</b></div>
      <div className="ratingFilters">
        <label>СЕЗОН<select value={season} onChange={(event) => setSeason(event.target.value)}><option value="all">Все сезоны</option>{seasons.map((item) => <option value={item.players[0].season} key={item.id}>{item.players[0].season}</option>)}</select></label>
        <label>ПОЗИЦИЯ<select value={position} onChange={(event) => setPosition(event.target.value)}><option value="all">Все позиции</option>{positions.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <label>МИНИМАЛЬНЫЙ RATING<div className="rangeControl"><input type="range" min="84" max="99" value={minimum} onChange={(event) => setMinimum(Number(event.target.value))}/><b>{minimum}</b></div></label>
        <label className="legendToggle"><input type="checkbox" checked={legendsOnly} onChange={(event) => setLegendsOnly(event.target.checked)}/><span>ТОЛЬКО LEGEND 95+</span></label>
        <label>СОРТИРОВКА<select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="rating">Rating: высокий → низкий</option><option value="season">По сезону</option><option value="name">По фамилии</option><option value="position">По позиции</option></select></label>
      </div>
      <div className="ratingsTableWrap"><table className="ratingsTable"><thead><tr><th>Сезон</th><th>Игрок</th><th>Основная позиция</th><th>Все позиции</th><th>Rating</th><th>Achievement сезона</th></tr></thead><tbody>{filtered.map((player) => <tr key={player.id}><td>{player.season}</td><td><b>{player.shortName}</b></td><td>{player.lineupPosition}</td><td>{player.positions.join(' / ')}</td><td><RatingBadge rating={player.rating}/></td><td>{player.achievement}</td></tr>)}</tbody></table></div>
    </section>
  </main>;
}
