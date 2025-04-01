export default function parse(element, { document }) {
    // Helper function to create a new header row with strong text
    function createHeaderRow(text) {
        const strongElement = document.createElement('strong');
        strongElement.textContent = text;
        return [strongElement];
    }

    // Extract content from the provided HTML element
    const introParagraphs = Array.from(element.querySelectorAll('.PageSection__intro p'));
    const images = Array.from(element.querySelectorAll('.PageSection__intro img'));

    // Create content for each column
    const column1Content = [introParagraphs[0], images[0]]; // First paragraph + first image
    const column2Content = [introParagraphs[1], introParagraphs[2]]; // Next two paragraphs
    const column3Content = [introParagraphs[3], introParagraphs[4]]; // Last two paragraphs

    // Organize the data into a table structure
    const tableData = [
        createHeaderRow('Columns'),
        [column1Content, column2Content, column3Content]
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}