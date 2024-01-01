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
      displayDeals(data.deals);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  }
  
  function displayDeals(deals) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Found ${deals.length} deals:</p><ul>${deals.map(deal => `<li>${deal}</li>`).join('')}</ul>`;
  }
  