export default function parse(element, { document }) {
  // Review of code for critical issues:

  // Step 1: Check for dynamic extraction of content.
  const basicContentBody = element.querySelector('.BasicContent__body');
  if (!basicContentBody) {
    console.error('Missing BasicContent__body element.');
    return;
  }

  // Extract the quote text dynamically from the BasicContent__body.
  const quoteText = basicContentBody.textContent.trim();

  if (!quoteText) {
    console.error('Quote text is empty.');
    return;
  }

  // Step 2: Ensure proper HTML elements are used for headers.
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Quote';

  // Step 3: Create content row dynamically.
  const contentRow = [document.createTextNode(quoteText)];

  // Step 4: Use WebImporter.DOMUtils.createTable to create the block table dynamically.
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Step 5: Replace the original element with the new block table.
  element.replaceWith(block);
}