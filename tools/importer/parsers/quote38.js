export default function parse(element, { document }) {
  // Extract relevant content
  const quoteParagraph = element.querySelector('.PageSection__intro p');

  if (!quoteParagraph) {
    console.error('Quote paragraph not found');
    return;
  }

  const emphasizedQuote = quoteParagraph.cloneNode(true); // Clone to preserve formatting

  // Create the table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Organize content into table rows
  const contentRow = [emphasizedQuote];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}