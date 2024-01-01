from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/find_deals', methods=['POST'])
def find_deals():
    try:
        data = request.get_json()
        item = data.get('item')

        if item:
            url = "https://parazun-amazon-data.p.rapidapi.com/search/"
            querystring = {"keywords":item,"region":"US","page":"1"}
            headers = {
                "X-RapidAPI-Key": "cf981d71c0msha037686af39d585p171f05jsne10178d8c98a",
                "X-RapidAPI-Host": "parazun-amazon-data.p.rapidapi.com"
            }

            response = requests.get(url, headers=headers, params=querystring)

            # Check if the request was successful (status code 200)
            if response.status_code == 200:
                # Parse JSON data
                data = response.json()

                # Access the "results" key and iterate through the products
                
                # for product in data["results"]:
                #     # Append the title of each product to the 'deals' list
                #     deals.append(product["title"])
                #     print(deals[-1])

                # Return the results as JSON
                return jsonify({'deals': data["results"]})
            else:
                # Handle unsuccessful API request
                return jsonify({'error': 'Failed to retrieve data'}), response.status_code
        else:
            return jsonify({'error': 'Item not provided'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

    # Return deals in an array
    # a = []
    # for i in range(random.randint(0,10)):
    #     a.append(str(random.randint(0,10)))
    # return jsonify({'deals': a})

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
