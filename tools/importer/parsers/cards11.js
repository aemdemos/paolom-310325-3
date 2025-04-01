export default function parse(element, { document }) {
  // Create table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];

  // Initialize table data with header
  const cells = [headerRow];

  // Extract promo items
  const promoItems = element.querySelectorAll('.Promo__item');

  promoItems.forEach((promoItem) => {
    const imgWrapper = promoItem.querySelector('img');
    const image = imgWrapper ? imgWrapper.cloneNode(true) : document.createElement('span'); // Placeholder if no image

    const promoText = promoItem.querySelector('.Promo__text');
    const titleElement = promoText ? promoText.querySelector('p') : null;
    const title = titleElement ? titleElement.textContent.trim() : '';

    const promoCTA = promoItem.querySelector('.Promo__cta a');
    const linkText = promoCTA ? promoCTA.textContent.trim() : '';
    const linkHref = promoCTA ? promoCTA.getAttribute('href') : '';

    const textContent = [];

    // Add title as heading
    if (title) {
      const titleHeading = document.createElement('strong');
      titleHeading.textContent = title;
      textContent.push(titleHeading);
    }

    // Add description or link
    if (linkText) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = linkText;
      textContent.push(descriptionParagraph);
    }

    if (linkHref) {
      const ctaLink = document.createElement('a');
      ctaLink.href = linkHref;
      ctaLink.textContent = linkText;
      textContent.push(ctaLink);
    }

    // Append row to table
    cells.push([image, textContent]);
  });

  // Create table block using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(block);
}