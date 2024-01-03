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
        res = {}

        if item:
            res['amazon'] = search_amazon(item).get_json('amazon')
            return jsonify({'deals': res})
        else:
            return jsonify({'error': 'Item not provided'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

    # Return deals in an array
    # a = []
    # for i in range(random.randint(0,10)):
    #     a.append(str(random.randint(0,10)))
    # return jsonify({'deals': a})

def search_amazon(item):
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
        return jsonify({'amazon': data['results']})

    else:
        # Handle unsuccessful API request
        return jsonify({'error': 'Failed to retrieve data'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
