#!/usr/bin/env python3
import pandas as pd
import requests, time, re, sys, itertools
import numpy as np
from sklearn.externals import joblib
from nltk import word_tokenize
from nltk.stem import SnowballStemmer          
import os

from tokenizers import SnowballTokenizer

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.svm import SVC

def golong(thing1, thing2):
    return(f"I hear you want {thing1} and {thing2}")

def getData(first_subr, second_subr):
    subr0 = first_subr.lower()
    subr1 = second_subr.lower()
    posts=[]
    for subr in [subr0, subr1]:
        url= f"https://www.reddit.com/r/{subr}/new.json"; 
        res= requests.get(url, headers={'User-agent': 'DataSci 5.5'})
        if res.status_code != 200:
                    print('Status error', res.status_code)
                    break
        current_dict = res.json()
        current_posts = [{
            "title": p['data']['title'],
            "subreddit": p['data']['subreddit'].lower(),
            "permalink": p['data']['permalink']
        } for p in current_dict['data']['children']]
        posts.extend(current_posts)
        time.sleep(1)
    df = pd.DataFrame(posts)
    # print(df.head(5))
    #Proccess the title
    X = df['title'].apply(lambda x: re.sub(r'[^\w\s]','', x.lower()))

    
    # Import our pickled model
    # In the model, askscience is 1, and futurology is 0 
    model = joblib.load('./raana_fut_sci.pkl')

    dct= {
        0: subr0,
        1: subr1
    }
    preds = [dct[k] for k in model.predict(X)]
    df['raana_pred']= preds

    # df

    return(df.to_json())

