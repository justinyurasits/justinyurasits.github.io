// The site's one script (site/design.md, 2026-11-23). It's progressive: without it, the
// header links stay visible and every filtered item shows.
document.documentElement.classList.add('js');

// Mobile menu (handoff §5): opens from the menu button, closes on outside click or Escape.
const button = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (button && menu) {
  button.hidden = false;
  const set = (open: boolean) => {
    button.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  };
  button.addEventListener('click', () => set(button.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', (e) => {
    const t = e.target as Node;
    if (!button.contains(t) && !menu.contains(t)) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { set(false); button.focus(); }
  });
}

// Filters (Demos, Writing): chips are <button aria-pressed> in a [data-filter-group]; items
// carry data-filter-item="<group>" and space-separated data-tags. A status element
// announces "Showing N of M".
document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
  const name = group.dataset.filterGroup;
  const buttons = group.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const items = document.querySelectorAll<HTMLElement>(`[data-filter-item="${name}"]`);
  const status = group.querySelector<HTMLElement>('[data-filter-status]');
  group.hidden = false;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let shown = 0;
      items.forEach((item) => {
        const match = filter === 'all' || (item.dataset.tags ?? '').split(' ').includes(filter!);
        item.hidden = !match;
        if (match) shown += 1;
      });
      if (status) status.textContent = `Showing ${shown} of ${items.length}`;
    });
  });
});
