export default function parse(element, { document }) {
  // Helper to create a heading element
  const createHeading = (text) => {
    const heading = document.createElement('h2');
    heading.textContent = text;
    return heading;
  };

  // Header row (matches example exactly)
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract the title
  const titleElem = element.querySelector('.PageSection__header h2');
  const title = titleElem ? createHeading(titleElem.textContent.trim()) : null;

  // Extract the subheading
  const introElem = element.querySelector('.PageSection__intro p');
  const subheading = introElem ? introElem.cloneNode(true) : null;

  // Extract the call-to-action
  const ctaElem = element.querySelector('.PageSection__ctas a');
  const cta = ctaElem ? ctaElem.cloneNode(true) : null;

  // Combine all content into a single cell
  const combinedContent = document.createElement('div');
  [title, subheading, cta].filter(Boolean).forEach((element) => {
    combinedContent.appendChild(element);
  });

  // Create the block table
  const cells = [
    headerRow,
    [combinedContent],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}