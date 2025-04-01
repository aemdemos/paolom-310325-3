export default function parse(element, { document }) {
    // Create the header row with exact text matching the example
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Quote';
    const headerRow = [headerCell];

    // Extract the correct quote content dynamically
    const firstParagraph = element.querySelector('p');
    let quoteContent = '';

    // Handle edge cases for missing or empty elements
    if (firstParagraph && firstParagraph.textContent.trim() !== '') {
        quoteContent = firstParagraph.textContent.trim();
    } else {
        quoteContent = 'No content available.';
    }

    // Create content row with the quote
    const contentRow = [quoteContent];

    // Create table structure
    const cells = [headerRow, contentRow];

    // Generate the block table using the utility function
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new structure
    element.replaceWith(block);
}