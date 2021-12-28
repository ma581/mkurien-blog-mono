import requests

def test_should_get_likes_for_article():
    r = requests.get('https://api.mkurien.com/likes?articleId=3')
    assert r.status_code == 200
    assert r.json() >= 1
    
def test_should_increment_likes_for_article():
    initial_likes = requests.get('https://api.mkurien.com/likes?articleId=3').json()

    r = requests.post('https://api.mkurien.com/likes?articleId=3')

    assert r.status_code == 200
    assert r.json() > initial_likes

