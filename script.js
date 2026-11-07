const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) { menuToggle.textContent = '☰'; menuToggle.setAttribute('aria-label', 'Open navigation'); }
}));

const filterButtons = [...document.querySelectorAll('.filter-btn')];
const cards = [...document.querySelectorAll('.product-card')];
const searchInput = document.getElementById('productSearch');
const emptyState = document.getElementById('emptyState');
let activeFilter = 'All';

function filterProducts() {
  const term = (searchInput?.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const categoryMatch = activeFilter === 'All' || card.dataset.category === activeFilter;
    const searchMatch = !term || `${card.dataset.search} ${card.textContent}`.toLowerCase().includes(term);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  if (emptyState) emptyState.hidden = visible !== 0;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  filterProducts();
}));
searchInput?.addEventListener('input', filterProducts);

document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => {
  activeFilter = link.dataset.categoryLink;
  filterButtons.forEach(button => button.classList.toggle('active', button.dataset.filter === activeFilter));
  filterProducts();
}));

document.querySelectorAll('.save-btn').forEach(button => button.addEventListener('click', () => {
  const saved = button.getAttribute('aria-pressed') === 'true';
  button.setAttribute('aria-pressed', String(!saved));
  button.textContent = saved ? '♡' : '♥';
}));

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('newsletterForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const message = document.getElementById('formMessage');
  message.textContent = 'Thanks! This demo form is not connected yet. Add your email platform integration before publishing.';
});
