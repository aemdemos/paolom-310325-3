export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const columns = element.querySelectorAll('.ColumnItem');

  // Prepare the table rows
  const rows = [];

  // Add the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Process each column item to extract content
  columns.forEach((column) => {
    const kicker = column.querySelector('.BasicContent__kicker');
    const header = column.querySelector('.BasicContent__header h4');
    const cta = column.querySelector('.Cta__link');

    // Create the content cell
    const cellContent = [];

    if (kicker) {
      const kickerElement = document.createElement('p');
      kickerElement.textContent = kicker.textContent.trim();
      cellContent.push(kickerElement);
    }

    if (header) {
      const headerElement = document.createElement('h4');
      headerElement.textContent = header.textContent.trim();
      cellContent.push(headerElement);
    }

    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.href = column.querySelector('a').href;
      ctaElement.textContent = cta.textContent.trim();
      cellContent.push(ctaElement);
    }

    rows.push([cellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}