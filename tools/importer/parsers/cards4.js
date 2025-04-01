export default function parse(element, { document }) {
  const cells = [];

  // Add header row for the block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cells.push(headerRow);

  // Extract card items
  const cardItems = Array.from(element.querySelectorAll('.ColumnItem'));
  cardItems.forEach((cardItem) => {
    const imageSrc = cardItem.querySelector('img')?.getAttribute('src');
    const imageElement = imageSrc ? (() => {
      const img = document.createElement('img');
      img.setAttribute('src', imageSrc);
      return img;
    })() : '';

    const title = cardItem.querySelector('.BasicContent__header h4')?.textContent.trim();
    const description = cardItem.querySelector('.BasicContent__body p')?.textContent.trim();
    const ctaText = cardItem.querySelector('.Cta__link')?.textContent.trim();
    const ctaLink = cardItem.querySelector('a')?.getAttribute('href');
    const ctaElement = (ctaText && ctaLink) ? (() => {
      const span = document.createElement('span');
      const anchor = document.createElement('a');
      anchor.setAttribute('href', ctaLink);
      anchor.textContent = ctaText;
      span.appendChild(anchor);
      return span;
    })() : '';

    // Build content for the card's text column
    const textContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      textContent.push(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      textContent.push(descriptionElement);
    }
    if (ctaElement) {
      textContent.push(ctaElement);
    }

    // Add row for the current card
    cells.push([imageElement, textContent]);
  });

  // Create table block and replace the element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}