export default function decorate(block) {
  // Read optional industry options from block rows (col 1 = option label)
  const options = [...block.children].map((row) => row.querySelector('p, div')?.textContent.trim()).filter(Boolean);

  const bar = document.createElement('div');
  bar.classList.add('insights-filter-bar');

  // ── Filter group ──────────────────────────────────────────────────────────
  const filterGroup = document.createElement('div');
  filterGroup.classList.add('insights-filter-group');

  const filterLabel = document.createElement('label');
  filterLabel.htmlFor = 'insights-industry';
  filterLabel.textContent = 'Filter By:';

  const select = document.createElement('select');
  select.id = 'insights-industry';
  select.name = 'industry';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Industry';
  select.append(defaultOption);

  const industries = options.length
    ? options
    : ['Automotive', 'Media & Communications', 'Healthcare', 'Transportation', 'Industrial Design'];

  industries.forEach((label) => {
    const opt = document.createElement('option');
    opt.value = label.toLowerCase().replace(/\s+/g, '-');
    opt.textContent = label;
    select.append(opt);
  });

  filterGroup.append(filterLabel, select);

  // ── Search group ──────────────────────────────────────────────────────────
  const searchGroup = document.createElement('div');
  searchGroup.classList.add('insights-search-group');

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.id = 'insights-search';
  searchInput.name = 'q';
  searchInput.placeholder = 'Search Insights';
  searchInput.setAttribute('aria-label', 'Search Insights');

  const searchBtn = document.createElement('button');
  searchBtn.type = 'button';
  searchBtn.setAttribute('aria-label', 'Search');
  searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>`;

  searchGroup.append(searchInput, searchBtn);

  bar.append(filterGroup, searchGroup);
  block.replaceChildren(bar);
}
