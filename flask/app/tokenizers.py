from nltk import word_tokenize          
from nltk.stem import WordNetLemmatizer, SnowballStemmer
class LemmaTokenizer(object):
    def __init__(self):
        self.wnl = WordNetLemmatizer()
    def __call__(self, doc):
        return [self.wnl.lemmatize(t) for t in word_tokenize(doc)]

class SnowballTokenizer(object):
    def __init__(self):
        self.sbs = SnowballStemmer('english')
    def __call__(self, doc):
        return [self.sbs.stem(t) for t in word_tokenize(doc)]