export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const titleElement = element.querySelector('.Hero__header .title-1');
  const subheaderElement = element.querySelector('.Hero__subheader.title-3');
  const ctaElement = element.querySelector('.Hero__ctas .Cta__link');

  // Create structured elements
  const title = document.createElement('h1');
  title.textContent = titleElement ? titleElement.textContent.trim() : '';

  const subheader = document.createElement('p');
  subheader.textContent = subheaderElement ? subheaderElement.textContent.trim() : '';

  const cta = document.createElement('a');
  cta.textContent = ctaElement ? ctaElement.textContent.trim() : '';
  cta.href = ctaElement ? ctaElement.href : '#';

  // Combine all extracted elements into a single cell
  const combinedContent = document.createElement('div');
  if (title.textContent) combinedContent.appendChild(title);
  if (subheader.textContent) combinedContent.appendChild(subheader);
  if (cta.textContent) combinedContent.appendChild(cta);

  // Create table rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentRow = [combinedContent];

  // Create block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}