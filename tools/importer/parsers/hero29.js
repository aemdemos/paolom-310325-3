export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const container = document.createElement('div');

  // Extracting title
  const titleElement = element.querySelector('.Hero__header h1');
  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    container.appendChild(title);
  }

  // Extracting subheader
  const subheaderElement = element.querySelector('.Hero__subheader');
  if (subheaderElement) {
    const subheader = document.createElement('p');
    subheader.textContent = subheaderElement.textContent;
    container.appendChild(subheader);
  }

  // Extracting CTA
  const ctaElement = element.querySelector('.Hero__ctas a');
  if (ctaElement) {
    const cta = document.createElement('a');
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent;
    container.appendChild(cta);
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [container],
  ], document);

  element.replaceWith(table);
}