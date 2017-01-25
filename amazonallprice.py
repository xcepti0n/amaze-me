from flask import Flask,request
from flask_restful import Resource, Api, reqparse
from bs4 import BeautifulSoup
from urllib.request import urlopen
app = Flask(__name__)
api = Api(app)
@app.route('/')
class AmazonPrice (Resource):
       def post(self):
              parser = reqparse.RequestParser()
              parser.add_argument('url', type=str, help='url to get price')
              args = parser.parse_args()
              url = args['url']
              #url =request.args.get('url')
              r = urlopen(url).read()
              soup = BeautifulSoup(r,"html.parser")
              title=soup.find("title")
              tr=soup.find("tr",{"id":"priceblock_dealprice_row"})
              typetr="Deal price"
              if not tr:
                  tr=soup.find("tr",{"id":"priceblock_saleprice_row"})
                  typetr="Sale Price"
                  if not tr:
                      tr=soup.find("tr",{"id":"priceblock_ourprice_row"})
                      typetr="Our Price"
                      if not tr:
                          div=soup.find("div",{"id":"price"})
                          table =div.find("table")
                          table_row=table.find_all("tr")
                          tr=table_row[0]
                          typetr=" Original price"
              #get row
              spanner = tr.find("span")
              v=spanner.find_all("span")
              currency = str(v[0].get('class')[0])
              price= (str(spanner.get_text()))
              return { 'title':title.get_text(),'currency': currency,'type':typetr, 'price' : price}
              #return currency+" "+price
       def get(self):
              parser = reqparse.RequestParser()
              parser.add_argument('url', type=str, help='url to get price')
              args = parser.parse_args()
              url = args['url']
              #url =request.args.get('url')
              r = urlopen(url).read()
              soup = BeautifulSoup(r,"html.parser")
              title=soup.find("title")
              tr=soup.find("tr",{"id":"priceblock_dealprice_row"})
              typetr="Deal price"
              if not tr:
                  tr=soup.find("tr",{"id":"priceblock_saleprice_row"})
                  typetr="Sale Price"
                  if not tr:
                      tr=soup.find("tr",{"id":"priceblock_ourprice_row"})
                      typetr="Our Price"
                      if not tr:
                          div=soup.find("div",{"id":"price"})
                          table =div.find("table")
                          table_row=table.find_all("tr")
                          tr=table_row[0]
                          typetr=" Original price"
              #get row
              spanner = tr.find("span")
              v=spanner.find_all("span")
              currency = str(v[0].get('class')[0])
              price= (str(spanner.get_text()))
              return { 'title':title.get_text(),'currency': currency,'type':typetr, 'price' : price}
api.add_resource(AmazonPrice,'/q')
if __name__ == '__main__':
       app.run(debug=True,port=4000)

