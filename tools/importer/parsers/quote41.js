export default function parse(element, { document }) {
  const textElement = element.querySelector('.BasicContent__body');
  if (!textElement) {
    console.error('No content found in the given element.');
    return;
  }

  const headerRow = ['Quote'];  // Fix: The header row must match the example exactly, without additional tags.

  const contentCell = document.createElement('div');
  contentCell.innerHTML = textElement.innerHTML.trim();

  const cells = [
    headerRow,
    [contentCell]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}