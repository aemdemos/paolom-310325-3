export default function parse(element, { document }) {
    const rows = [];

    // Add header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = "Accordion";
    const headerRow = [headerCell];
    rows.push(headerRow);

    // Extract accordion items
    const accordions = element.querySelectorAll('.HeaderAndBody');
    accordions.forEach(accordion => {
        const titleButton = accordion.querySelector('.HeaderAndBody__header-title button');
        const title = document.createElement('p');
        title.textContent = titleButton ? titleButton.textContent.trim() : "";

        const bodyDiv = accordion.querySelector('.HeaderAndBody__body div[itemprop="text"]');
        const body = document.createElement('div');
        body.innerHTML = bodyDiv ? bodyDiv.innerHTML.trim() : "";

        rows.push([title, body]);
    });

    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}