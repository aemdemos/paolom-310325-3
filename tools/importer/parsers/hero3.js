export default function parse(element, { document }) {
    // Extract relevant data from the Hero block
    const titleElement = element.querySelector('.Hero__header .title-1');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const subheadingElement = element.querySelector('.Hero__subheader.title-3');
    const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

    const ctaLinkElement = element.querySelector('.Hero__ctas .Cta__link');
    const ctaText = ctaLinkElement ? ctaLinkElement.textContent.trim() : '';
    const ctaHref = ctaLinkElement ? ctaLinkElement.getAttribute('href') : '';

    // Create structured elements dynamically
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Hero';

    const contentCell = document.createElement('div');

    if (title) {
        const heading = document.createElement('h1');
        heading.textContent = title;
        contentCell.appendChild(heading);
    }

    if (subheading) {
        const subheadingEl = document.createElement('p');
        subheadingEl.textContent = subheading;
        contentCell.appendChild(subheadingEl);
    }

    if (ctaText && ctaHref) {
        const ctaEl = document.createElement('a');
        ctaEl.textContent = ctaText;
        ctaEl.setAttribute('href', ctaHref);
        contentCell.appendChild(ctaEl);
    }

    const cells = [
        headerRow,
        [contentCell],
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new block table
    element.replaceWith(blockTable);
}