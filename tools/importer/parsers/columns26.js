export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract relevant content from the input element
  const rows = Array.from(element.querySelectorAll('td')).map(td => {
    const content = td.querySelector('p > strong');
    return content ? content.textContent : '';
  });

  const cells = [
    headerRow, // Header row
    rows       // Content row
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable); // Replace the original element with the new block table
}