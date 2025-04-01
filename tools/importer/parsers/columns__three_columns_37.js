export default function parse(element, { document }) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const cells = [
    headerRow, // Header row
    [] // Content row
  ];

  // Dynamically extract content for each column
  const contentSections = [
    element.querySelector('.footer__featured-content'),
    element.querySelector('.footer__socialRow'),
    element.querySelector('.footerNav__wrapper')
  ];

  contentSections.forEach((section, index) => {
    const columnTitle = document.createElement('h2');
    const columnContent = document.createElement('div');

    if (section) {
      let titleText = '';

      // Extract title dynamically based on section type
      if (index === 0) {
        const logoImg = section.querySelector('.footer__featured-logo img');
        titleText = logoImg?.alt || 'Featured';
      } else if (index === 1) {
        titleText = 'Social Links';
      } else if (index === 2) {
        const navHeader = section.querySelector('.visually-hidden');
        titleText = navHeader?.textContent || 'Footer Navigation';
      }

      columnTitle.textContent = titleText;

      // Extract and clean content text dynamically
      if (index === 1) {
        const socialLinks = section.querySelectorAll('a');
        socialLinks.forEach((link) => {
          const socialItem = document.createElement('p');
          socialItem.textContent = link.textContent.trim();
          columnContent.appendChild(socialItem);
        });
      } else if (index === 2) {
        const navItems = section.querySelectorAll('li > a');
        navItems.forEach((link) => {
          const navItem = document.createElement('p');
          navItem.textContent = link.textContent.trim();
          columnContent.appendChild(navItem);
        });
      } else {
        const contentText = section.textContent.trim();
        const contentParagraph = document.createElement('p');
        contentParagraph.textContent = contentText ? contentText : 'No content available';
        columnContent.appendChild(contentParagraph);
      }
    } else {
      columnTitle.textContent = `Column ${index + 1}`;
      const contentParagraph = document.createElement('p');
      contentParagraph.textContent = 'No content available';
      columnContent.appendChild(contentParagraph);
    }

    cells[1].push([columnTitle, columnContent]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}