import { createOptimizedPicture } from '../../scripts/aem.js';

function buildBreadcrumb() {
  const nav = document.createElement('nav');
  nav.classList.add('hero-breadcrumb');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const parts = window.location.pathname.split('/').filter(Boolean);
  const crumbs = [{ label: 'Home', href: '/' }];
  let cumPath = '';
  parts.forEach((part) => {
    cumPath += `/${part}`;
    crumbs.push({
      label: part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      href: cumPath,
    });
  });

  const ol = document.createElement('ol');
  crumbs.forEach((crumb, i) => {
    const li = document.createElement('li');
    if (i < crumbs.length - 1) {
      const a = document.createElement('a');
      a.href = crumb.href;
      a.textContent = crumb.label;
      li.append(a);
    } else {
      li.textContent = crumb.label;
      li.setAttribute('aria-current', 'page');
    }
    ol.append(li);
  });

  nav.append(ol);
  return nav;
}

export default function decorate(block) {
  const row = block.firstElementChild;
  const [imageCol, textCol] = [...row.children];

  const img = imageCol.querySelector('img');
  const picture = img
    ? createOptimizedPicture(img.src, img.alt || '', true, [
      { media: '(min-width: 900px)', width: '2000' },
      { width: '750' },
    ])
    : imageCol.querySelector('picture');

  picture.classList.add('hero-background');

  const overlay = document.createElement('div');
  overlay.classList.add('hero-overlay');

  const content = document.createElement('div');
  content.classList.add('hero-content');
  content.prepend(buildBreadcrumb());
  content.append(...textCol.children);

  block.replaceChildren(picture, overlay, content);
}
