export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Insight categories');

  const ul = document.createElement('ul');
  const currentPath = window.location.pathname;

  [...block.children].forEach((row) => {
    const anchor = row.querySelector('a');
    if (!anchor) return;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = anchor.href;
    a.textContent = anchor.textContent.trim();

    // Mark active tab: exact match or prefix match for section pages
    const linkPath = new URL(anchor.href, window.location).pathname;
    if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }

    li.append(a);
    ul.append(li);
  });

  nav.append(ul);
  block.replaceChildren(nav);
}
