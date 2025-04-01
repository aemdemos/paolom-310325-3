export default function parse(element, { document }) {
  // Helper function to extract concise text content
  const getTextContent = (node) => node.textContent.trim();

  // Extract the first paragraph as the quote
  const quoteParagraph = element.querySelector('.BasicContent__body p');
  const quoteText = quoteParagraph ? getTextContent(quoteParagraph) : '';

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Create the content row
  const contentRow = [quoteText];

  // Create block table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}