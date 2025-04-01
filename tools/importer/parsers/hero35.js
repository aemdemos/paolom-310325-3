export default function parse(element, { document }) {
  // Import DOMUtils for creating table
  const { createTable } = WebImporter.DOMUtils;

  // Extract information from the provided element
  const heroHeader = element.querySelector('.Hero__header h1');
  const heroSubheader = element.querySelector('.Hero__subheader');
  const heroCta = element.querySelector('.Hero__ctas a');

  // Create the header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the content for the second row
  const content = [];

  // Add the heading
  if (heroHeader) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heroHeader.textContent.trim();
    content.push(headingElement);
  }

  // Add the subheading
  if (heroSubheader) {
    const subheadingElement = document.createElement('p');
    subheadingElement.textContent = heroSubheader.textContent.trim();
    content.push(subheadingElement);
  }

  // Add the CTA
  if (heroCta) {
    const ctaElement = document.createElement('a');
    ctaElement.href = heroCta.href;
    ctaElement.textContent = heroCta.textContent.trim();
    content.push(ctaElement);
  }

  // Create the table using createTable
  const cells = [
    headerRow,             // Header row
    [content]              // Content row
  ];

  const blockTable = createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}