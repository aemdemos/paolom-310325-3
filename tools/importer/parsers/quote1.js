export default function parse(element, { document }) {
  // Check if the element has the required content
  const quoteBody = element.querySelector('.BasicContent__body');

  let quoteText = '';
  if (quoteBody) {
    quoteText = quoteBody.innerText?.trim() || 'No quote content available';
  } else {
    console.warn('Quote content not found in the element.');
    quoteText = 'No quote content available';
  }

  // Create header row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Create content row dynamically
  const quoteRow = [quoteText];

  // Assemble rows into a table
  const cells = [headerRow, quoteRow];

  // Create table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}