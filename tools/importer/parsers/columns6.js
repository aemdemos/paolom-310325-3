export default function parse(element, { document }) {
  const blockName = document.createElement('strong');
  blockName.textContent = 'Columns';

  const cells = [[blockName]];

  // Extract column content
  const columns = element.querySelectorAll('.ColumnItem');

  if (columns.length > 0) {
    const contentRow = [];

    columns.forEach((column) => {
      const innerContent = column.querySelector('.ColumnItem__inner');

      if (!innerContent) return;

      const images = innerContent.querySelectorAll('img');
      const paragraphs = innerContent.querySelectorAll('p');
      const headers = innerContent.querySelectorAll('h2');
      const lists = innerContent.querySelectorAll('ul');

      const cellContent = [];

      images.forEach((img) => {
        const imgElem = document.createElement('img');
        imgElem.src = img.getAttribute('data-src') || img.src;
        imgElem.alt = img.alt;
        cellContent.push(imgElem);
      });

      paragraphs.forEach((para) => {
        cellContent.push(para.cloneNode(true));
      });

      headers.forEach((header) => {
        cellContent.push(header.cloneNode(true));
      });

      lists.forEach((list) => {
        cellContent.push(list.cloneNode(true));
      });

      contentRow.push(cellContent);
    });

    cells.push(contentRow);
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}