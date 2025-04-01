export default function parse(element, { document }) {
    // Extract all paragraphs within the element and combine their text into a single string
    const paragraphElements = element.querySelectorAll('p');
    const combinedText = Array.from(paragraphElements)
        .map(paragraph => paragraph.textContent.trim())
        .join(' '); // Combine paragraphs into one block of text

    // Create the header row for the block table
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Quote';
    const headerRow = [headerCell];

    // Create the content row containing the combined text
    const contentRow = [combinedText];

    // Create the table using the WebImporter.DOMUtils.createTable helper function
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}