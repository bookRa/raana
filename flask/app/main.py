#!/usr/bin/env python3
# import pandas as pd
# import requests, time, re, sys
# import numpy as np
# from sklearn.externals import joblib
# from nltk import word_tokenize  

import reddit_pred
from flask import Flask, request, abort, jsonify
# from snowball import SnowballTokenizer

app= Flask(__name__)

@app.route('/')


def hello_world():
    return reddit_pred.golong('so', 'no')

@app.route('/getsubrs', methods=['POST'])
def checkit():
    my_d= request.json
    # print(reddit_pred.getData(my_d['subr0'],my_d['subr1']))
    error= None
    if request.method =='POST':
        return(reddit_pred.getData(my_d['subr0'],my_d['subr1']))
        # return(f"you chose {my_d['subr0']} and {my_d['subr1']}")
        # return('sup')
    else:
        return('try again')

if __name__=="__main__":
    app.run(host='0.0.0.0', debug=True, port=5002)