export default function parse(element, { document }) {
  // Helper function to extract the cards
  function extractCards(element) {
    const cards = [];
    
    const cardTitles = element.querySelectorAll('h2');
    const cardDescriptions = Array.from(element.querySelectorAll('p')).filter((p) => p.textContent.trim());

    cardTitles.forEach((title, index) => {
      const cardRow = [];

      // Add title as the first strong element
      const strongTitle = document.createElement('strong');
      strongTitle.textContent = title.textContent.trim();
      const titleCell = [strongTitle];
      cards.push([titleCell]); // Push title row

      // Add description below the title
      const description = cardDescriptions[index];
      if (description) {
        const paragraph = document.createElement('p');
        paragraph.textContent = description.textContent.trim();
        const descriptionCell = [paragraph];

        // Add links if present in the description
        const links = description.querySelectorAll('a');
        links.forEach((link) => {
          const clonedLink = document.createElement('a');
          clonedLink.href = link.href;
          clonedLink.textContent = link.textContent.trim();
          descriptionCell.push(clonedLink);
        });

        cards.push([descriptionCell]); // Push description row
      }
    });

    return cards;
  }

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];

  const cards = extractCards(element);
  const cells = [headerRow, ...cards];

  // Remove empty rows
  const sanitizedCells = cells.filter((row) => row.some((cell) => cell));

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(sanitizedCells, document);

  // Replace the original element
  element.replaceWith(block);
}