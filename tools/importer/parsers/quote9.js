export default function parse(element, { document }) {
  // Check for key elements in the provided HTML
  const quoteElement = element.querySelector('.BasicContent__body');

  // Handle cases where the quote element might be missing
  if (!quoteElement) {
    console.warn('No quote content found');
    return;
  }

  // Extract the quote text dynamically
  const quoteText = quoteElement.querySelector('p')?.textContent.trim();

  // Create the header row without additional formatting
  const headerRow = ['Quote'];

  // Create the content row with the extracted quote
  const contentRow = [quoteText];

  // Compile the table data
  const tableData = [headerRow, contentRow];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}