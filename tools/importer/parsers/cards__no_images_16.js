export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards (no images)';

  const rows = [];
  rows.push(headerRow);

  const cards = element.querySelectorAll('.BasicContent__body');

  cards.forEach((card) => {
    const cardContent = document.createElement('div');

    const heading = card.querySelector('h2, h3, h4, strong');
    const paragraphs = card.querySelectorAll('p');

    if (heading) {
      const headingElem = document.createElement('strong');
      headingElem.textContent = heading.textContent.trim();
      cardContent.appendChild(headingElem);
    }

    paragraphs.forEach((p) => {
      const paragraphElem = document.createElement('p');
      paragraphElem.innerHTML = p.innerHTML.trim();
      cardContent.appendChild(paragraphElem);
    });

    rows.push([cardContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}