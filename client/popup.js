document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function() {
      const item = document.getElementById('item').value;
      if (item.trim() !== '') {
        findDeals(item);
      }
    });
  });
  
  async function findDeals(item) {
    try {
      const response = await fetch('http://127.0.0.1:5000/find_deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
      });
  
      const data = await response.json();
      console.log(data.deals);
      displayDeals(data.deals);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  }
  
  function displayDeals(deals) {
    const resultDiv = document.getElementById('result');
  
    // Create a list of deals with price and image information
    const dealsList = deals.map(deal => {
      const title = deal.title;
      const price = deal.price ? `${deal.price.symbol}${deal.price.amount}` : 'Price not available';
      const image = deal.images.length > 0 ? `<a href="https://www.amazon.com/dp/${deal.asin}"><img src="${deal.images[0].image}" alt="Product Image" /></a>` : 'Image not available';
  
      // Display title, price, and image for each deal
      return `<li>
                <p><strong>${title}</strong></p>
                <p>${price}</p>
                <p>${image}</p>
              </li>`;
    }).join('');
  
    // Display the deals list in the resultDiv
    resultDiv.innerHTML = `<p>Found ${deals.length} deals:</p><ul>${dealsList}</ul>`;
  }
