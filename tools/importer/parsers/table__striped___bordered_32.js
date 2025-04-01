export default function parse(element, { document }) {
  // Create the header row with exact text specified in the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (striped & bordered)';
  const headerRow = [headerCell];

  // Extract content dynamically from the HTML and ensure no placeholder text is used
  const rows = Array.from(element.querySelectorAll('div.BasicContent')).map((contentBlock) => {
    const textContainer = contentBlock.querySelector('div.BasicContent__body');
    const imageContainer = contentBlock.closest('div.ColumnItem').querySelector('img');

    const textContent = textContainer ? textContainer.cloneNode(true) : null; // Avoid placeholder text entirely
    const imageContent = imageContainer ? imageContainer.cloneNode(true) : null; // Avoid placeholder text entirely

    // Only include valid, non-empty content in the row
    return textContent && imageContent ? [textContent, imageContent] : [textContent || imageContent];
  });

  // Add header row and extracted rows into the cells array
  const cells = [headerRow, ...rows];

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table block
  element.replaceWith(tableBlock);
}