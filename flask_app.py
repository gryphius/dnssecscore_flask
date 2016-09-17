from flask import Flask, request, send_from_directory
from flask import jsonify
import requests, json
#from dnssecscore import dnssecscore

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='static')

@app.route('/<path:filename>')
def send_static(filename):
    return send_from_directory(app.static_folder, filename)

# @app.route('/index')
# def hello_world():
#     return app.send_static_file('index.html')


@app.route('/domain_submitted', methods=['POST', 'GET'])
def giving_score():
    domain = request.form['domain'];
    to_request = 'http://backend.dnssecscore.com:5000/d/' + domain
    score_response = (requests.get(to_request)).text
    print(score_response)
    #print(score_response)
    parsed_response = json.loads(score_response)
    print(parsed_response)
    print(parsed_response['result'])
    result_dictionary = {"S":"Secure", "I": "Insecure", "F": "Validation Error", "T":"Trust issue", "E": "Error while sunning test"}

    parsed_response['result'] = result_dictionary[parsed_response['result']]

    if parsed_response['result']=="Secure":
        score_json = {'result':"Secure", 'score':parsed_response['score']}
    else:
        score_json = {'result':parsed_response['result'], 'score':"none"}

    score=5
    return jsonify(score_json);
    #return score_response



if __name__ == "__main__":
    app.run(debug=True)

#d/wgwh.ch