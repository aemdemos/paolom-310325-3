export default function parse(element, { document }) {
  // Create the block header
  const blockType = document.createElement('strong');
  blockType.textContent = 'Cards (no images)';

  // Initialize rows with the header row
  const rows = [[blockType]];

  // Extract all cards
  const cards = element.querySelectorAll('.ColumnItem');

  cards.forEach((card) => {
    const cardContent = [];

    // Extract and process the heading
    const header = card.querySelector('.BasicContent__header h4');
    if (header) {
      const heading = document.createElement('strong');
      heading.textContent = header.textContent.trim();
      cardContent.push(heading);
    }

    // Extract and process the description
    const body = card.querySelector('.BasicContent__body p');
    if (body) {
      const description = document.createElement('p');
      description.textContent = body.textContent.trim();
      cardContent.push(description);
    }

    // Extract and process the call-to-action link
    const ctaLink = card.querySelector('.Cta__link');
    if (ctaLink) {
      const linkElement = document.createElement('a');
      linkElement.href = card.querySelector('a') ? card.querySelector('a').href : '#';
      linkElement.textContent = ctaLink.textContent.trim();
      cardContent.push(linkElement);
    }

    // Add the card content to rows
    rows.push([cardContent]);
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}