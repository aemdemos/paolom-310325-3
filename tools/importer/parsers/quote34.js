export default function parse(element, { document }) {
  // Importing helper function

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';

  // Extract quote text dynamically from the first paragraph inside the element
  const quoteParagraph = element.querySelector('div.BasicContent__body p');
  const quoteText = quoteParagraph ? quoteParagraph.textContent.trim() : '';

  // Handle edge case where quote text might be empty
  if (!quoteText) {
    console.warn('No quote text found in the provided HTML element.');
  }

  // Create table structure
  const cells = [
    [headerCell],
    [quoteText],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}