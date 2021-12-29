import requests
import json

TEST_ARTICLE_ID=0

# def test_should_get_likes_for_article():
#     r = requests.get(f'https://api.mkurien.com/likes?articleId={TEST_ARTICLE_ID}')
#     assert r.status_code == 200
#     assert r.json() >= 1
    
# def test_should_increment_likes_for_article():
#     initial_likes = requests.get(f'https://api.mkurien.com/likes?articleId={TEST_ARTICLE_ID}').json()

#     r = requests.post(f'https://api.mkurien.com/likes?articleId={TEST_ARTICLE_ID}')

#     assert r.status_code == 200
#     assert r.json() > initial_likes

def test_should_create_feedback_for_article():
    r = requests.put(f'https://api.mkurien.com/feedback?articleId={TEST_ARTICLE_ID}', 
        headers= {
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
        data= json.dumps({
            'feedback': 'blah',
            'twitterHandle': '@blah',
            'email': 'blah@blah.com'
            }))
    assert r.status_code == 200