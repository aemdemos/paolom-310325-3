export default function parse(element, { document }) {
  // Extract image
  const img = element.querySelector('img');

  // Ensure image exists and dynamically extract its properties
  const imageElement = img ? document.createElement('img') : null;
  if (imageElement && img) {
    imageElement.src = img.getAttribute('data-src') || img.src;
    imageElement.alt = img.alt || '';
  }

  // Create header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Create content row
  const contentRow = [imageElement].filter(Boolean); // Filter out null values in case imageElement is missing

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}