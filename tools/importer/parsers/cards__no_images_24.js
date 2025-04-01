export default function parse(element, { document }) {
    // Import helper function
    const { createTable } = WebImporter.DOMUtils;

    // Header for the table
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards (no images)';
    const headerRow = [headerCell];

    // Create rows for each card
    const rows = [];
    const cardsContainer = element.querySelector('.Columns__wrap');

    if (cardsContainer) {
        const cards = cardsContainer.querySelectorAll('.ColumnItem');

        cards.forEach(card => {
            const cardContent = card.querySelector('.BasicContent__text');
            const rowData = [];

            if (cardContent) {
                const cellContent = document.createElement('div');

                const headingElement = cardContent.querySelector('h4');
                if (headingElement) {
                    const heading = document.createElement('strong');
                    heading.textContent = headingElement.textContent.trim();
                    cellContent.appendChild(heading);
                }

                const descriptionElement = cardContent.querySelector('p');
                if (descriptionElement) {
                    const description = document.createElement('p');
                    description.textContent = descriptionElement.textContent.trim();
                    cellContent.appendChild(description);
                }

                const ctaElement = card.querySelector('.Cta__link');
                if (ctaElement) {
                    const link = document.createElement('a');
                    link.href = card.querySelector('a')?.href || '#';
                    link.textContent = ctaElement.textContent.trim();
                    cellContent.appendChild(link);
                }

                rowData.push(cellContent);
            }

            rows.push(rowData);
        });
    }

    // Combine header with rows
    const tableData = [headerRow, ...rows];
    const tableBlock = createTable(tableData, document);

    // Replace the original element with the table
    element.replaceWith(tableBlock);
}