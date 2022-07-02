import scrapy
from MySpider.items import MyspiderItem
from MySpider.constants import _985, _211
import json


class Spider1Spider(scrapy.Spider):
    name = 'spider1'
    allowed_domains = ['www.gaokao.cn']
    start_urls = ['http://www.gaokao.cn/']



    def parse_id(self, response):
        _985_id = dict()
        _211_id = dict()

        json_obj = json.loads(response.text)

        if json_obj['message'] == '成功':
            data = json_obj['data']
            for info in data:
                name = info['name']
                school_id = info['school_id']
                if name in _985:
                    _985_id[name] = school_id
                if name in _211:
                    _211_id[name] = school_id
        else:
            print("出错啦")
        print(_985_id, len(_985_id.keys()), _985 - set(_985_id.keys()))
        print(_211_id, len(_211_id.keys()), _211 - set(_211_id.keys()))

        with open('_985_id.json', 'w') as f1:
            json.dump(_985_id, f1)

        with open('_211_id.json', 'w') as f2:
            json.dump(_211_id, f2)

    def start_requests(self):
        all_college_url = 'https://static-data.gaokao.cn/www/2.0/school/name.json'

        yield scrapy.Request(url=all_college_url, callback=self.parse_id, priority=10)
