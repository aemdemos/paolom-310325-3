export default function parse(element, { document }) {
  // Helper function to create the accordion block
  function createAccordionBlock(rows) {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Accordion';
    return WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  }

  // Extract the content from the input element
  const rows = [];
  const headers = element.querySelectorAll('h2');

  headers.forEach((header) => {
    const titleCell = header.cloneNode(true);
    const contentCell = document.createElement('div');

    // Collect sibling elements as content until reaching the next header or end of section
    let sibling = header.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      contentCell.appendChild(sibling.cloneNode(true));
      sibling = sibling.nextElementSibling;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the accordion block
  const accordionBlock = createAccordionBlock(rows);

  // Replace the original element with the new block table
  element.replaceWith(accordionBlock);
}