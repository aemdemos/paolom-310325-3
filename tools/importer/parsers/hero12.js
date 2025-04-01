export default function parse(element, { document }) {
  // Helper to create table blocks
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract the title
  const titleEl = element.querySelector('.title-2');
  const title = document.createElement('h2');
  title.textContent = titleEl ? titleEl.textContent.trim() : '';

  // Extract the subheading text
  const subheadingEl = element.querySelector('.BasicContent__body h4');
  const subheading = document.createElement('p');
  subheading.textContent = subheadingEl ? subheadingEl.textContent.trim() : '';

  // Extract the CTA link
  const ctaEl = element.querySelector('.Cta__link');
  const cta = document.createElement('a');
  if (ctaEl) {
    cta.href = ctaEl.href;
    cta.textContent = ctaEl.textContent.trim();
  }

  // Prepare header row explicitly using strong element
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Construct cells array for table creation
  const cells = [
    headerRow,
    [[title, subheading, cta]],
  ];

  // Create the block table
  const blockTable = createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}