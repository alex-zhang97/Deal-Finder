//Global var contianing product data from api calls
var data;

document.addEventListener('DOMContentLoaded', function() {
    //Event listeners for each desired action
    const searchBtn = document.getElementById('searchBtn');
    const amazonBtn = document.getElementById('amazonBtn');
    const otherBtn = document.getElementById('otherBtn');
    //Load data from api calls
    searchBtn.addEventListener('click', function() {
      const item = document.getElementById('item').value;
      if (item.trim() !== '') {
        findDeals(item);
      }
    });
    //Display Amazon data
    amazonBtn.addEventListener('click', function() {
      displayAmazon(data.amazon);
    });
    //Display other data (currently nothing)
    otherBtn.addEventListener('click', function(){
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '<p>There\s nothing here</p>';
    })
  });
  
  async function findDeals(item) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Searching...</p>';
    try {
      const response = await fetch('http://127.0.0.1:5000/find_deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
      });
  
      data = await response.json();
      resultDiv.innerHTML = '<p>Done!</p>';
      console.log(data.deals);
      // displayDeals(data.deals.amazon);
    } catch (error) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '<p>Error retrieving products</p>';
      console.error('Error fetching deals:', error);
    }
  }
  
  function displayAmazon(source) {
    const resultDiv = document.getElementById('result');
  
    // Create a list of deals with price and image information
    const dealsList = source.map(deal => {
      const title = deal.title;
      const price = deal.price ? `${deal.price.symbol}${deal.price.amount}` : 'Price not available';
      const image = deal.images.length > 0 ? `<a href="https://www.amazon.com/dp/${deal.asin}"><img src="${deal.images[0].image}" alt="Product Image" /></a>` : 'Image not available';
  
      // Display title, price, and image for each deal
      return `<li>
                <a href="https://www.amazon.com/dp/${deal.asin}"><p><strong>${title}</strong></p></a>
                <p>${price}</p>
                <p>${image}</p>
              </li>`;
    }).join('');
  
    // Display the deals list in the resultDiv
    resultDiv.innerHTML = `<p>Found ${source.length} deals:</p><ul>${dealsList}</ul>`;
  }
