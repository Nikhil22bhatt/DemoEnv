import { createOptimizedPicture } from '../../scripts/aem.js';

function decorateBlogBody(bodyDiv) {
  // Expected order from Word doc: p (category tag), h3 (title), p > a (Read More)
  [...bodyDiv.children].forEach((el) => {
    if (el.matches('p') && !el.querySelector('a')) {
      el.classList.add('cards-card-tag');
    } else if (el.matches('h3')) {
      el.classList.add('cards-card-title');
    } else if (el.matches('p') && el.querySelector('a')) {
      el.classList.add('cards-card-cta');
      const link = el.querySelector('a');
      // Strip button class added by EDS decorateButtons
      link.classList.remove('button', 'primary', 'secondary');
      link.closest('.button-container')?.classList.remove('button-container');
      if (!link.textContent.trim()) link.textContent = 'Read More';
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
      // Detect image column by checking if the first meaningful child is a picture or img.
      // Avoids the strict children.length === 1 check that breaks when EDS adds empty siblings.
      const firstEl = div.firstElementChild;
      if (firstEl && (firstEl.tagName === 'PICTURE' || firstEl.tagName === 'IMG')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        if (isBlog) decorateBlogBody(div);
      }
    });

    ul.append(li);
  });

  // Optimize all images inside image columns — handles both picture > img and bare img
  ul.querySelectorAll('.cards-card-image img').forEach((img) => {
    const target = img.closest('picture') ?? img;
    target.replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [
        { media: '(min-width: 900px)', width: '600' },
        { width: '750' },
      ]),
    );
  });

  block.replaceChildren(ul);
}
