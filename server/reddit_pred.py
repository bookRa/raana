import pandas as pd
import requests, time, re, sys
import numpy as np
from sklearn.externals import joblib
from nltk import word_tokenize          


subr0 = sys.argv[1]
subr = sys.argv[2]

def scrape_subr():
    posts=[]
    for subr in [subr0, subr1]:
        url= "https://www.reddit.com/r/"+subr+'/new.json'; 
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
    return posts; 


subr0 = sys.argv[1].lower()
subr1 = sys.argv[2].lower()

q= scrape_subr()

# q[1] # title, subreddit, permalink 

df = pd.DataFrame(q)

#Proccess the title
X = df['title'].apply(lambda x: re.sub(r'[^\w\s]','', x.lower()))
# map_dict= {
#         subr0: 0,
#         subr1: 1
#     }
# df['subreddit'] = df['subreddit'].map(map_dict)


class SnowballTokenizer(object):
    def __init__(self):
        self.sbs = SnowballStemmer('english')
    def __call__(self, doc):
        return [self.sbs.stem(t) for t in word_tokenize(doc)]

# Import our pickled model
# In the model, askscience is 1, and futurology is 0 
model = joblib.load('./tf_svc_pipe.pkl')


dct= {
    0: subr0,
    1: subr1
}
preds = [dct[k] for k in model.predict(X)]
df['raana_pred']= preds

# df

print(df.to_json())