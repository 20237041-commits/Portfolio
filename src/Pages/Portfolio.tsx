

import { useSearchParams }            from 'react-router-dom'   
import { PROJECTS }                   from '../Data/PortfolioData'
import type { ProjectCategory }       from '../Data/PortfolioData'


interface FilterOption {
  key  : 'all' | ProjectCategory
  label: string
}

const FILTERS: FilterOption[] = [
  { key: 'all',   label: 'All'         },
  { key: 'web',   label: 'Web Design'  },
  { key: 'network', label: 'Networking' },
]

export default function Portfolio() {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = (searchParams.get('filter') ?? 'all') as 'all' | ProjectCategory

  const setFilter = (key: 'all' | ProjectCategory) => {
    setSearchParams(key === 'all' ? {} : { filter: key })
  }

  const visible = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === activeFilter)

  return (
    <section className="page-wrap" id="portfolio-page">

      <header className="page-header">
        <p className="page-label">My Work</p>
        <h1 className="page-title">My <span>Projects</span></h1>
        <div className="bar" />
      </header>

      <nav className="filter-bar" aria-label="Portfolio filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
            aria-pressed={activeFilter === f.key}
          >
            {f.label}
          </button>
        ))}
      </nav>


      <div className="p-grid" role="list">
        {visible.map((proj, i) => (
          <a
            href={proj.link}
            className="p-card"
            key={i}
            target="_blank"
            rel="noreferrer"
            role="listitem"
            aria-label={`${proj.title} — ${proj.label}`}
          >
            <div className="p-card-img">
              <img src={proj.img} alt={proj.title} loading="lazy" />
              <div className="p-card-overlay" aria-hidden="true">
                <i className="fas fa-arrow-up-right-from-square" />
              </div>
            </div>
            <div className="p-card-body">
              <span className="p-cat">{proj.label}</span>
              <p   className="p-title">{proj.title}</p>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .filter-bar {
          display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap;
        }
        .filter-btn {
          padding: 7px 20px; border-radius: 99px;
          border: 1px solid var(--border); background: none;
          color: var(--muted); font-size: .78rem; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all .2s;
        }
        .filter-btn.active,
        .filter-btn:hover {
          border-color: var(--accent); color: var(--accent);
          background: rgba(0, 212, 255, .06);
        }

        /* Grid */
        .p-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 20px;
        }

        /* Card */
        .p-card {
          border-radius: 14px; overflow: hidden;
          background: var(--card); border: 1px solid var(--border);
          text-decoration: none; display: block;
          transition: transform .25s, box-shadow .25s;
        }
        .p-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 44px rgba(0,0,0,.44);
        }
        .p-card-img { position: relative; overflow: hidden; }
        .p-card-img img {
          width: 100%; height: 190px; object-fit: cover; display: block;
          filter: brightness(.88);
          transition: transform .4s, filter .3s;
        }
        .p-card:hover .p-card-img img {
          transform: scale(1.05); filter: brightness(1);
        }
        .p-card-overlay {
          position: absolute; inset: 0;
          background: rgba(0, 212, 255, .1);
          display: grid; place-items: center;
          opacity: 0; transition: opacity .28s;
          color: var(--accent); font-size: 1.25rem;
        }
        .p-card:hover .p-card-overlay { opacity: 1; }

        .p-card-body { padding: 16px 18px; }
        .p-cat {
          font-size: .68rem; text-transform: uppercase;
          letter-spacing: .14em; color: var(--accent);
          display: block; margin-bottom: 5px;
        }
        .p-title { font-size: .92rem; font-weight: 500; color: var(--text); }
      `}</style>
    </section>
  )
}
