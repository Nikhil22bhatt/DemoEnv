import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const row = block.firstElementChild;
  const [imageCol, textCol] = [...row.children];

  // Extract and optimize the background picture
  const img = imageCol.querySelector('img');
  const picture = img
    ? createOptimizedPicture(img.src, img.alt || '', true, [
      { media: '(min-width: 900px)', width: '2000' },
      { width: '750' },
    ])
    : imageCol.querySelector('picture');

  // Build new DOM structure
  const bgPicture = picture;
  bgPicture.classList.add('hero-background');

  const overlay = document.createElement('div');
  overlay.classList.add('hero-overlay');

  const content = document.createElement('div');
  content.classList.add('hero-content');
  content.append(...textCol.children);

  block.replaceChildren(bgPicture, overlay, content);
}
