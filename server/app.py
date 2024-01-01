from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/find_deals', methods=['POST'])
def find_deals():
    # try:
    #     data = request.get_json()
    #     item = data.get('item')

    #     if item:
    #         deals = scrape_deals(item)
    #         return jsonify({'deals': deals})
    #     else:
    #         return jsonify({'error': 'Item not provided'}), 400
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    return jsonify({'deals', "agfdgdsf"})

def scrape_deals(item):
    # Replace this URL with the actual URL of the website you want to scrape
    url = f'https://example.com/deals/{item}'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Modify the following based on the structure of the website you're scraping
    deal_elements = soup.select('.deal-item')
    deals = [element.get_text().strip() for element in deal_elements]

    return deals

if __name__ == '__main__':
    app.run(debug=True)
