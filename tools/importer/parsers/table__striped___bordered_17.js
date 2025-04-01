export default function parse(element, { document }) {
  const rows = Array.from(element.querySelectorAll('tr'));

  // Extract the original table header row (e.g., Location, Security level, etc.)
  const originalHeaderRow = rows[0];
  const headerCells = Array.from(originalHeaderRow.querySelectorAll('td, th')).map((cell, cellIndex) => {
    if (cellIndex === 0) {
      return ''; // Leave the first column cell empty in the original header row
    }
    const strong = document.createElement('strong');
    strong.textContent = cell.textContent.trim();
    return strong;
  });

  // Extract table data rows excluding the original header row
  const tableDataRows = rows.slice(1).map(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(cell => {
      const paragraph = document.createElement('p');
      paragraph.textContent = cell.textContent.trim();
      return paragraph;
    });
    return cells;
  });

  // Prepare the block header row
  const blockHeaderCell = document.createElement('strong');
  blockHeaderCell.textContent = 'Table (striped & bordered)';
  const blockHeaderRow = [blockHeaderCell];

  const tableBlockData = [
    blockHeaderRow, // Block header row
    headerCells, // Original table header row
    ...tableDataRows // Remaining data rows
  ];

  // Create block table and replace original element
  const blockTable = WebImporter.DOMUtils.createTable(tableBlockData, document);
  element.replaceWith(blockTable);
}