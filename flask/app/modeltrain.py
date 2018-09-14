#!/usr/bin/env python3

import requests, json, time
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from tokenizers import SnowballTokenizer
from sklearn.externals import joblib

from sklearn.pipeline import Pipeline
from sklearn.svm import SVC 

sci_df = pd.read_csv('~/GA/projects/project-3/data_csvs/askscience_clean.csv')
fut_df = pd.read_csv('~/GA/projects/project-3/data_csvs/futurology_clean.csv')

master_df = pd.concat([sci_df, fut_df], ignore_index=True)
#Drop the extraneous index column
master_df.drop('Unnamed: 0', 1, inplace=True)

#gonna map the subreddit to a 1 if 'askcience', 0 otherwise
map_dict= {
    "askscience": 1,
    "Futurology": 0
}
master_df['subreddit'] = master_df['subreddit'].map(map_dict)

#might as well remove selftext, num_comments, and ups because I don't want to use those right now
dropfeats= ['ups', 'selftext', 'num_comments']
master_df.drop(dropfeats, 1, inplace=True)


import re
from nltk.corpus import stopwords

master_df['processed'] = master_df['title'].apply(lambda x: re.sub(r'[^\w\s]','', x.lower()))

X= master_df.drop(columns= ['subreddit', 'title'])
y= master_df['subreddit']
X_train, X_test, y_train, y_test= train_test_split(X,y)

X_train= X_train.reset_index(drop=True)
y_train= y_train.reset_index(drop=True)
X_test= X_test.reset_index(drop=True)
y_test= y_test.reset_index(drop=True)


final_pipe= Pipeline(steps=[
    ('tfidf', TfidfVectorizer(ngram_range=(1,4), tokenizer=SnowballTokenizer(), max_features=9500)),
    ('svc', SVC(C= .8, kernel='linear', probability=True ))
])
final_pipe.fit(X_train['processed'], y_train)
joblib.dump(final_pipe, './raana_fut_sci.pkl')