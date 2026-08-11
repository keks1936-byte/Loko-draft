'use client';

import { useEffect, useMemo, useState } from 'react';
import { seasons, type Player, type Position } from '../../data/seasons';

type Version = Player & { achievement: string };
type SortKey = 'rating' | 'season' | 'name' | 'position';
type Suggestions = Record<string, number>;

const positions: Position[] = ['GK', 'LB', 'CB', 'RB', 'CM', 'LW', 'CAM', 'RW', 'ST'];
const ratingScale = Array.from({ length: 39 }, (_, index) => 98 - index);
const storageKey = 'loko-draft-rating-review-v1';
const versions: Version[] = seasons.flatMap((season) =>
  season.players.map((player) => ({ ...player, achievement: season.achievement })),
);

function ratingCategory(rating: number) {
  if (rating >= 96) return 'HISTORIC';
  if (rating >= 92) return 'ELITE';
  if (rating >= 87) return 'VERY STRONG';
  if (rating >= 81) return 'SOLID';
  if (rating >= 74) return 'AVERAGE';
  if (rating >= 67) return 'ROTATION';
  return 'WEAK';
}

function byRatingThenSeason(a: Version, b: Version) {
  return b.rating - a.rating || a.season.localeCompare(b.season, 'ru', { numeric: true });
}

function RatingBadge({ rating }: { rating: number }) {
  const category = ratingCategory(rating);
  return <span className={`ratingBadge rating${category.toLowerCase().replace(' ', '')}`}><b>{rating}</b>{category}</span>;
}

function RatingControl({ player, editor, suggestions, update }: {
  player: Version;
  editor: boolean;
  suggestions: Suggestions;
  update: (player: Version, rating?: number) => void;
}) {
  const suggested = suggestions[player.id];
  if (!editor) return <RatingBadge rating={player.rating}/>;
  return <div className="ratingEditorControl">
    <div className={suggested === undefined ? '' : 'ratingChange'}>
      {suggested === undefined ? <RatingBadge rating={player.rating}/> : <><s>{player.rating}</s><span>→</span><RatingBadge rating={suggested}/></>}
    </div>
    <input aria-label={`Предложенный рейтинг: ${player.shortName}, ${player.season}`} type="number" min="60" max="98"
      value={suggested ?? player.rating} onChange={(event) => update(player, Number(event.target.value))}/>
    {suggested !== undefined && <button className="resetRating" type="button" onClick={() => update(player)} aria-label="Сбросить эту правку">↺</button>}
  </div>;
}

export default function RatingsPage() {
  const [sort, setSort] = useState<SortKey>('rating');
  const [season, setSeason] = useState('all');
  const [position, setPosition] = useState('all');
  const [minimum, setMinimum] = useState(60);
  const [historicOnly, setHistoricOnly] = useState(false);
  const [editor, setEditor] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestions>({});
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') as Suggestions;
      const knownIds = new Set(versions.map((player) => player.id));
      setSuggestions(Object.fromEntries(Object.entries(saved).filter(([id, rating]) => knownIds.has(id) && Number.isInteger(rating) && rating >= 60 && rating <= 98)));
    } catch {
      localStorage.removeItem(storageKey);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(suggestions));
  }, [loaded, suggestions]);

  const distribution = useMemo(() => new Map(ratingScale.map((rating) => [rating, versions.filter((player) => player.rating === rating).length])), []);
  const maxDistribution = Math.max(...distribution.values());
  const topTwenty = useMemo(() => [...versions].sort(byRatingThenSeason).slice(0, 20), []);
  const positionTops = useMemo(() => positions.map((item) => ({
    position: item,
    players: versions.filter((player) => player.positions.includes(item)).sort(byRatingThenSeason).slice(0, 5),
  })), []);
  const changed = useMemo(() => versions.filter((player) => suggestions[player.id] !== undefined), [suggestions]);
  const originalAverage = useMemo(() => versions.reduce((sum, player) => sum + player.rating, 0) / versions.length, []);
  const proposedAverage = useMemo(() => versions.reduce((sum, player) => sum + (suggestions[player.id] ?? player.rating), 0) / versions.length, [suggestions]);

  const filtered = useMemo(() => {
    const result = versions.filter((player) =>
      (season === 'all' || player.season === season) &&
      (position === 'all' || player.positions.includes(position as Position)) &&
      player.rating >= minimum && (!historicOnly || player.rating >= 96),
    );
    return result.sort((a, b) => {
      if (sort === 'season') return a.season.localeCompare(b.season, 'ru', { numeric: true }) || byRatingThenSeason(a, b);
      if (sort === 'name') return a.shortName.localeCompare(b.shortName, 'ru') || byRatingThenSeason(a, b);
      if (sort === 'position') return positions.indexOf(a.lineupPosition) - positions.indexOf(b.lineupPosition) || byRatingThenSeason(a, b);
      return byRatingThenSeason(a, b);
    });
  }, [historicOnly, minimum, position, season, sort]);

  function updateSuggestion(player: Version, rating?: number) {
    setSuggestions((current) => {
      const next = { ...current };
      if (rating === undefined || rating === player.rating) delete next[player.id];
      else if (Number.isInteger(rating) && rating >= 60 && rating <= 98) next[player.id] = rating;
      return next;
    });
  }

  function exportText() {
    const lines = changed.map((player) => `${player.shortName} · ${player.season}: ${player.rating} → ${suggestions[player.id]}`);
    return `LOKO DRAFT — rating review\n\n${lines.join('\n')}\n\nВсего изменений: ${changed.length}`;
  }

  async function copyExport() {
    const text = exportText();
    let successful = false;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        successful = true;
      }
    } catch { /* The textarea fallback below also works outside a secure context. */ }
    if (!successful) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed'; textarea.style.opacity = '0';
      document.body.appendChild(textarea); textarea.select();
      successful = document.execCommand('copy');
      textarea.remove();
    }
    if (successful) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  function downloadExport() {
    const url = URL.createObjectURL(new Blob([exportText()], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'loko-draft-rating-review.txt'; link.click();
    URL.revokeObjectURL(url);
  }

  const controlProps = { editor, suggestions, update: updateSuggestion };
  return <main className="ratingsPage">
    <header className="ratingsHeader"><div><p className="eyebrow">ВНУТРЕННИЙ ИНСТРУМЕНТ · БАЗА ИГРОКОВ</p><h1>RATINGS<br/><span>REVIEW</span></h1></div><div className="headerActions"><div className="databaseCount"><b>{seasons.length}</b><span>СОСТАВОВ</span></div><div className="databaseCount"><b>{versions.length}</b><span>ВЕРСИЙ ИГРОКОВ</span></div><button className={editor ? 'editorButton active' : 'editorButton'} onClick={() => setEditor((value) => !value)}>{editor ? 'ВЫЙТИ ИЗ РЕЖИМА' : 'РЕЖИМ РЕДАКТОРА'}</button></div></header>

    {editor && <section className="reviewSummary"><div><span>ИЗМЕНЕНО</span><b>{changed.length}</b></div><div><span>СРЕДНИЙ РЕЙТИНГ БАЗЫ</span><p>оригинал <b>{originalAverage.toFixed(1)}</b> <i>→</i> предложение <b>{proposedAverage.toFixed(1)}</b></p></div><div className="reviewActions"><button disabled={!changed.length} onClick={copyExport}>{copied ? 'СКОПИРОВАНО ✓' : 'ЭКСПОРТИРОВАТЬ ПРАВКИ'}</button><button disabled={!changed.length} onClick={downloadExport}>СКАЧАТЬ .TXT</button><button className="dangerButton" disabled={!changed.length} onClick={() => setSuggestions({})}>СБРОСИТЬ ВСЕ ПРАВКИ</button></div><small>Правки хранятся только в этом браузере и не влияют на драфт.</small></section>}

    <section className="ratingsSection"><div className="sectionTitle"><div><p className="eyebrow">БАЛАНС БАЗЫ · 98–60</p><h2>РАСПРЕДЕЛЕНИЕ РЕЙТИНГОВ</h2></div></div><div className="distribution">{ratingScale.map((rating) => <div key={rating}><b>{rating}</b><i style={{ height: `${Math.max(4, (distribution.get(rating) || 0) / maxDistribution * 100)}%` }}/><span>{distribution.get(rating)}</span></div>)}</div></section>

    <section className="ratingsSection"><div className="sectionTitle"><div><p className="eyebrow">ВСЯ ИСТОРИЯ</p><h2>ТОП-20 ВЕРСИЙ ИГРОКОВ</h2></div></div><div className="topGrid">{topTwenty.map((player, index) => <article className="topCard" key={player.id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div><b>{player.shortName}</b><small>{player.season} · {player.lineupPosition}</small></div><RatingControl player={player} {...controlProps}/></article>)}</div></section>

    <section className="ratingsSection"><div className="sectionTitle"><div><p className="eyebrow">ЛУЧШИЕ В АМПЛУА</p><h2>ТОП ПО ПОЗИЦИЯМ</h2></div></div><div className="positionGrid">{positionTops.map((group) => <article className="positionCard" key={group.position}><h3>{group.position}</h3><ol>{group.players.map((player) => <li key={`${group.position}-${player.id}`}><div><b>{player.shortName}</b><small>{player.season}</small></div><RatingControl player={player} {...controlProps}/></li>)}</ol></article>)}</div></section>

    <section className="ratingsSection databaseSection"><div className="sectionTitle"><div><p className="eyebrow">ЕДИНЫЙ ИСТОЧНИК ДАННЫХ</p><h2>ВСЕ ВЕРСИИ</h2></div><b className="resultCount">{filtered.length} / {versions.length}</b></div>
      <div className="ratingFilters">
        <label>СЕЗОН<select value={season} onChange={(event) => setSeason(event.target.value)}><option value="all">Все сезоны</option>{seasons.map((item) => <option value={item.players[0].season} key={item.id}>{item.players[0].season}</option>)}</select></label>
        <label>ПОЗИЦИЯ<select value={position} onChange={(event) => setPosition(event.target.value)}><option value="all">Все позиции</option>{positions.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <label>МИНИМАЛЬНЫЙ RATING<div className="rangeControl"><input type="range" min="60" max="98" value={minimum} onChange={(event) => setMinimum(Number(event.target.value))}/><b>{minimum}</b></div></label>
        <label className="legendToggle"><input type="checkbox" checked={historicOnly} onChange={(event) => setHistoricOnly(event.target.checked)}/><span>ТОЛЬКО HISTORIC 96+</span></label>
        <label>СОРТИРОВКА<select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="rating">Rating: высокий → низкий</option><option value="season">По сезону</option><option value="name">По фамилии</option><option value="position">По позиции</option></select></label>
      </div>
      <div className="ratingsTableWrap"><table className="ratingsTable"><thead><tr><th>Сезон</th><th>Игрок</th><th>Основная позиция</th><th>Все позиции</th><th>Rating</th><th>Achievement сезона</th></tr></thead><tbody>{filtered.map((player) => <tr key={player.id}><td>{player.season}</td><td><b>{player.shortName}</b></td><td>{player.lineupPosition}</td><td>{player.positions.join(' / ')}</td><td><RatingControl player={player} {...controlProps}/></td><td>{player.achievement}</td></tr>)}</tbody></table></div>
    </section>
  </main>;
}
