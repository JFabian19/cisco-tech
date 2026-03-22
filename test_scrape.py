import requests
import sys

url = "https://corpmagicsystem.com/3743-procesador-amd"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
}
try:
    resp = requests.get(url, headers=headers)
    print("Status:", resp.status_code)
    print("Length:", len(resp.text))
    if resp.status_code == 200:
        print("Starts with:", resp.text[:200])
except Exception as e:
    print("Error:", e)
