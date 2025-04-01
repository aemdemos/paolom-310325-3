export default function parse(element, { document }) {
  // Validate input element and document
  if (!element || !document) {
    throw new Error('Invalid input: element and document are required.');
  }

  // Extract relevant content from the input element
  const hero = element.querySelector('.Hero');
  if (!hero) {
    throw new Error('No Hero block found in the given element.');
  }

  // Extract title
  const titleElement = hero.querySelector('.Hero__header .title-1');
  let title;
  if (titleElement) {
    title = document.createElement('h1');
    title.textContent = titleElement.textContent.trim();
  } else {
    throw new Error('Hero block is missing a mandatory title.');
  }

  // Extract optional subheader
  const subheaderElement = hero.querySelector('.Hero__subheader');
  let subheader;
  if (subheaderElement) {
    subheader = document.createElement('p');
    subheader.textContent = subheaderElement.textContent.trim();
  }

  // Extract call-to-action link if available
  const ctaElement = hero.querySelector('.Hero__ctas .Cta__link');
  let cta;
  if (ctaElement) {
    cta = document.createElement('a');
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent.trim();
  }

  // Create table rows
  const headerRow = ['Hero']; // Plain text header as specified

  const contentRow = [];

  if (title) {
    contentRow.push(title);
  }

  if (subheader) {
    contentRow.push(subheader);
  }

  if (cta) {
    contentRow.push(cta);
  }

  // Ensure at least one content is present in the table's content row
  if (contentRow.length === 0) {
    throw new Error('Hero block is missing content for the second row.');
  }

  // Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}