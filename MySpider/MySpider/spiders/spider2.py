import scrapy
from MySpider.constants import _985, _211
import json


class Spider2Spider(scrapy.Spider):
    name = 'spider2'
    allowed_domains = ['www.gaokao.cn']
    start_urls = ['http://www.gaokao.cn/']

    college_info = dict()

    def parse(self, response, **kwargs):
        json_obj = json.loads(response.text)
        if json_obj['message'] == '成功':
            data = json_obj['data']
            with open(data['name'] + '.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

    def start_requests(self):
        _211_id, _985_id = dict(), dict()
        with open('_985_id.json', 'r') as f1:
            _985_id = json.load(f1)

        with open('_211_id.json', 'r') as f2:
            _211_id = json.load(f2)

        all_college = set(_211_id.keys()) | set(_985_id.keys())

        for name in all_college:
            self.college_info[name] = dict()
            self.college_info[name]['school_id'] = 0
            types = 0

            if name in _985:
                self.college_info[name]['school_id'] = _985_id[name]
                types |= 2
            if name in _211:
                self.college_info[name]['school_id'] = _211_id[name]
                types |= 1

            assert types != 0
            if types == 3:
                self.college_info[name]['type'] = '985 | 211'
            elif types == 1:
                self.college_info[name]['type'] = '211'
            else:
                self.college_info[name]['type'] = 985

            info_url = f'https://static-data.gaokao.cn/www/2.0/school/{self.college_info[name]["school_id"]}/info.json'

            yield scrapy.Request(url=info_url, callback=self.parse)
