export default function parse(element, { document }) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  const rows = [headerRow];

  const sections = element.querySelectorAll('h2, h3, ul');

  let currentSectionTitle = null;

  sections.forEach((node) => {
    if (node.tagName === 'H2' || node.tagName === 'H3') {
      currentSectionTitle = document.createElement('div');
      currentSectionTitle.textContent = node.textContent;
    }

    if (node.tagName === 'UL') {
      const links = Array.from(node.querySelectorAll('li')).map((li) => {
        const linkElement = li.querySelector('a');
        if (linkElement) {
          const link = document.createElement('a');
          link.href = linkElement.href;
          link.textContent = linkElement.textContent;

          return link;
        }

        return null;
      }).filter(Boolean);

      if (currentSectionTitle && links.length > 0) {
        rows.push([currentSectionTitle, links]);
      }
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}