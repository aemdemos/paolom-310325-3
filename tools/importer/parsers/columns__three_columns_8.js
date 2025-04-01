export default function parse(element, { document }) {
    const cells = [];

    // Header row (correct as per example)
    const headerRow = ['Columns'];
    cells.push(headerRow);

    // Content row
    const contentRow = [];
    const columnItems = element.querySelectorAll('.ColumnItem');

    columnItems.forEach((columnItem) => {
        const column = document.createElement('div');

        // Title
        const titleElement = columnItem.querySelector('.BasicContent__header h4');
        if (titleElement) {
            const title = document.createElement('h2');
            title.textContent = titleElement.textContent.trim();
            column.appendChild(title);
        }

        // Content
        const contentElement = columnItem.querySelector('.BasicContent__body p');
        if (contentElement) {
            const content = document.createElement('p');
            content.innerHTML = contentElement.innerHTML; // Preserve formatting
            column.appendChild(content);
        }

        // CTA
        const ctaElement = columnItem.querySelector('.BasicContent__cta .Cta__link');
        const linkElement = columnItem.querySelector('a');
        if (ctaElement && linkElement) {
            const ctaLink = document.createElement('a');
            ctaLink.href = linkElement.href;
            ctaLink.textContent = ctaElement.textContent.trim();
            column.appendChild(ctaLink);
        }

        contentRow.push(column);
    });

    cells.push(contentRow);

    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}