// Mobilní menu
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Zobrazit/skrýt suroviny u receptu dne
const showIngredientsBtn = document.getElementById('showIngredients');
const ingredientsList = document.getElementById('ingredientsList');

showIngredientsBtn.addEventListener('click', () => {
  const isHidden = ingredientsList.hasAttribute('hidden');
  if (isHidden) {
    ingredientsList.removeAttribute('hidden');
    showIngredientsBtn.textContent = 'Skrýt suroviny';
  } else {
    ingredientsList.setAttribute('hidden', '');
    showIngredientsBtn.textContent = 'Zobrazit suroviny';
  }
});

// Filtrování receptů podle kategorie
const catFilter = document.getElementById('catFilter');
const dishes = Array.from(document.querySelectorAll('.dish'));
const catEmpty = document.getElementById('catEmpty');

catFilter.addEventListener('click', (e) => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;

  catFilter.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');

  const cat = btn.dataset.cat;
  let visibleCount = 0;

  dishes.forEach(dish => {
    const cats = dish.dataset.cat.split(' ');
    const show = cat === 'all' || cats.includes(cat);
    dish.classList.toggle('is-hidden', !show);
    if (show) visibleCount++;
  });

  catEmpty.hidden = visibleCount !== 0;
});

// Přihlášení k odběru novinek
const newsletterForm = document.getElementById('newsletterForm');
const formMsg = document.getElementById('formMsg');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formMsg.textContent = 'Zkontrolujte prosím e-mailovou adresu.';
    formMsg.className = 'form-msg is-error';
    return;
  }

  formMsg.textContent = `Díky! Recepty budou chodit na ${email}.`;
  formMsg.className = 'form-msg is-ok';
  newsletterForm.reset();
});

// Rok v patičce
document.getElementById('year').textContent = new Date().getFullYear();
