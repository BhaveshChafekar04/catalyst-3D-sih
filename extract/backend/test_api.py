
import urllib.request
import json
import urllib.error

data = json.dumps({'title': 'River Pollution', 'category': 'Environment & Water', 'location': 'Sacramento', 'description': 'High nitrate levels.'}).encode()
req = urllib.request.Request('http://localhost:8000/api/challenges', data=data, headers={'Content-Type': 'application/json'})
try:
    resp = urllib.request.urlopen(req)
    print('SUCCESS')
    print(resp.read().decode())
except urllib.error.HTTPError as e:
    print('ERROR:', e.code)
    print(e.read().decode())

