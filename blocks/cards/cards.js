import { createOptimizedPicture } from '../../scripts/aem.js';

function decorateBlogBody(bodyDiv) {
  // Expected order: p (category tag), h3 (title), p > a (Read More)
  [...bodyDiv.children].forEach((el) => {
    if (el.matches('p') && !el.querySelector('a')) {
      el.classList.add('cards-card-tag');
    } else if (el.matches('h3')) {
      el.classList.add('cards-card-title');
    } else if (el.matches('p') && el.querySelector('a')) {
      el.classList.add('cards-card-cta');
      const link = el.querySelector('a');
      link.textContent = link.textContent.trim() || 'Read More';
    }
  });
}

export default function decorate(block) {
  const isBlog = block.classList.contains('blog');

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        if (isBlog) decorateBlogBody(div);
      }
    });

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [
        { media: '(min-width: 900px)', width: '600' },
        { width: '750' },
      ]),
    );
  });

  block.replaceChildren(ul);
}
