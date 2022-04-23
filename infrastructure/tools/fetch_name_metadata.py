import requests
from bs4 import BeautifulSoup
import re
import os
import csv
import time

# https://www.zenrows.com/blog/stealth-web-scraping-in-python-avoid-blocking-like-a-ninja#user-agent-header
# https://github.com/philipperemy/name-dataset


def write_names(buffer):
    fieldnames = ["Name", "Sex", "Origin"]
    with open("names_with_origins.csv", "a", newline="") as write_csvfile:
        writer = csv.DictWriter(write_csvfile, fieldnames=fieldnames)
        for x in buffer:
            name, sex, origin = x[0], x[1], x[2]
            writer.writerow({"Name": name, "Sex": sex, "Origin": origin})


def scrape_html_for_name(base_url: str, name: str) -> str:
    url = f"{base_url}/${name}"
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
    }
    html_text = requests.get(url, headers=headers).text
    return html_text
    
def scrape_html_for_name_2(base_url: str, name: str) -> str:
    url = f"{base_url}/{name.lower()}-baby-name"
    print(url)
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
    }
    html_text = requests.get(url, headers=headers).text
    return html_text


# with open("sample_response.html", "r") as file:
#     data = file.read()
#     html_text = data
def extract_origin_from_html(html_text: str) -> str:
    try:
        soup = BeautifulSoup(html_text, "html.parser")

        ul = soup.find("ul", class_="name-meta")
        origin_li = ul.contents[3]

        m = re.search(">([A-Za-z]*)<", str(origin_li))
        origin = m.group(1)

        return origin
    except:
        return "Uknown"
        


def extract_origin_from_html_2(html_text: str) -> str:
    try:
        soup = BeautifulSoup(html_text, "html.parser")

        ul = soup.find("div", class_="nameInfo")
        origin_li = ul.contents[3]

        m = re.search(">([A-Za-z]*)<", str(origin_li))
        origin = m.group(1)

        return origin
    except:
        return "Uknown"


def scrape_names():
    with open("../data/clustered-names.csv", newline="") as read_csvfile:
        writer = None
        # base_url = os.environ["BABY_NAMES_WEBSITE_URL"]
        base_url = os.environ["BABY_NAMES_WEBSITE_URL_2"]
        reader = csv.DictReader(read_csvfile)
        buffer = []

        with open("names_with_origins.csv", "w", newline="") as write_csvfile:
            fieldnames = ["Name", "Sex", "Origin"]
            writer = csv.DictWriter(write_csvfile, fieldnames=fieldnames)
            writer.writeheader()

        counter = 0
        for row in reader:
            name, sex = row["Name"], row["Sex"]
            html = scrape_html_for_name_2(base_url, name)
            origin = extract_origin_from_html_2(html)
            buffer.append((name, sex, origin))
            counter += 1

            if counter % 100 == 0:
                print(counter)
                write_names(buffer)
                buffer = []
                print("Sleeping for 60 sec")
                time.sleep(60)

if __name__ == "__main__":
    scrape_names()

# with open("sample_response_2.html", "r") as file:
#     data = file.read()
#     html_text = data
#     origin = extract_origin_from_html_2(html_text)
#     print(origin)