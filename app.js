const cardsEl = document.getElementById('cards');
const searchEl = document.getElementById('search');
const fieldEl = document.getElementById('fieldFilter');
const schoolEl = document.getElementById('schoolFilter');
const sortEl = document.getElementById('sortBy');
const metaEl = document.getElementById('meta');

let dataset = [];

function byUnique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function optionize(el, values) {
  for (const value of values) {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    el.append(opt);
  }
}

function render() {
  const q = searchEl.value.trim().toLowerCase();
  const field = fieldEl.value;
  const school = schoolEl.value;
  const sort = sortEl.value;

  let rows = dataset.filter((d) => {
    const haystack = `${d.name} ${d.school} ${d.primaryField} ${d.paper.title}`.toLowerCase();
    return (!q || haystack.includes(q)) && (!field || d.primaryField === field) && (!school || d.school === school);
  });

  rows.sort((a, b) => {
    if (sort === 'year') return b.cohortYear - a.cohortYear || a.name.localeCompare(b.name);
    return a[sort].localeCompare(b[sort]);
  });

  metaEl.textContent = `Showing ${rows.length} of ${dataset.length} candidates.`;
  cardsEl.innerHTML = rows.map((d) => `
    <article class="card">
      <h2>${d.name}</h2>
      <div>${d.school} · Cohort ${d.cohortYear}</div>
      <div class="badges">
        <span class="badge">${d.primaryField}</span>
        ${d.secondaryFields.map((f) => `<span class="badge">${f}</span>`).join('')}
      </div>
      <p><strong>Job Market Paper:</strong> ${d.paper.title}</p>
      <p><a href="${d.paper.url}" target="_blank" rel="noopener">Read paper</a> · <a href="${d.cvUrl}" target="_blank" rel="noopener">CV</a> · <a href="${d.websiteUrl}" target="_blank" rel="noopener">Website</a></p>
      <p class="small">Source: <a href="${d.source.url}" target="_blank" rel="noopener">${d.source.label}</a> (verified ${d.source.verifiedOn})</p>
    </article>
  `).join('');
}

async function init() {
  const res = await fetch('data/candidates.json');
  const payload = await res.json();
  dataset = payload.candidates;

  optionize(fieldEl, byUnique(dataset.map((d) => d.primaryField)));
  optionize(schoolEl, byUnique(dataset.map((d) => d.school)));
  render();

  [searchEl, fieldEl, schoolEl, sortEl].forEach((el) => el.addEventListener('input', render));
}

init();
