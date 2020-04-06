import json
import requests
from bs4 import BeautifulSoup
import re
import threading
import pymongo
import pymongo
from bson.objectid import ObjectId
import datetime
data = []

collection = ""
users = ""

with open('./config.json','r') as con:
    config = json.load(con)


def init():
    global collection
    global users
    global config
    client = pymongo.MongoClient(
        "mongodb+srv://"+config['dbName']+":"+config['dbPassword']+"@shelter-rm3lc.azure.mongodb.net/test?retryWrites=true&w=majority")
    collection = client.shelter.services
    users = client.shelter.vuser
    return client.shelter.vemail


def getdbdata():
    li = collection.find({"$and": [{"crawledAt": {"$exists": False}}, {
                         "isCrawled": {"$exists": False}}]}).sort('_id')
    if li.count() == 0:
        li = collection.find({"isCrawled": False}).sort("crawledAt")
        if li.count() == 0:
            li = collection.find({"isCrawled": True}).sort("crawledAt")
    temp = li[0]
    # temp.pop('_id')
    temp['_id'] = str(li[0]['_id'])
    # print(str(li[0]['_id']))
    return temp


def userInsert(query):
    global users
    try:
        users.insert({"email": query[0], "fname": query[1], "lname": query[2], "password": query[3],
                      'createdAt': datetime.datetime.now(), 'lastSigned': datetime.datetime.now(), 'disableBit': False})
        return 1
    except:
        return 0


def getUser(email):
    global users
    b = users.find({"email": email})
    # print(b[0])
    if b.count() == 0:
        return 0
    elif b[0]["disableBit"] == True:
        return 1
    else:
        users.find_one_and_update(
            {"email": email}, {"$set": {"lastSigned": datetime.datetime.now()}})
        return b


def changePassword(email, password):
    b = users.find_one_and_update(
        {"email": email}, {"$set": {"password": password}})
    if b == None:
        return 0
    else:
        return 1


def putindb(verified, crawl):
    if(crawl == True):
        if verified['1'] != '':
            add = verified['1'].split('|')
        else:
            add = ['', '', '', '', '']
        b = collection.find_one_and_update({"_id": ObjectId(verified['0'])}, {'$set': {"website": verified['4'], "twitter": verified['6'], "youtube": verified['8'], "contactEmail": verified['2'], "instagram": verified['7'],
                                                                                       "facebook": verified['5'], "address1": add[0], "address2": add[1], "city": add[2], "state": add[3], "zip": add[4], "schedules": verified['9'], "closeSchedules": verified['10'], "phone": verified['3'], "name": verified['11'], "serviceSummary": verified["12"], "isCrawled": crawl, "crawledAt": datetime.datetime.now(), "isContact": verified["13"]}})
        # print(b)
    else:
        collection.find_one_and_update({"_id": ObjectId(verified)}, {'$set': {
                                       "isCrawled": crawl, "crawledAt": datetime.datetime.now().strftime('%Y/%m/%d')}})


def sendreq(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0',
    }
    if url == '':
        return 0
    # print("url="+url)
    try:
        r = requests.get(url, headers=headers)
    except:
        return 0
    soup = BeautifulSoup(r.content, 'html5lib')
    return soup


def getFacebook(soup):
    if soup == 0:
        return
    ma = re.compile('facebook.com')
    ma2 = re.compile('fb.com')
    links = soup.find_all('a', href=True)
    for link in links:
        if ma.search(link['href']) or ma2.search(link['href']):
            # print(link['href'])
            if link['href'] not in data[5]:
                data[5].append(link['href'])


def getTwitter(soup):
    if soup == 0:
        return
    ma = re.compile('twitter.com')
    # ma2 = re.compile('fb.com')
    links = soup.find_all('a', href=True)
    for link in links:
        if ma.search(link['href']):
            # print(link['href'])
            if link['href'] not in data[6]:
                data[6].append(link['href'])


def getYoutube(soup):
    if soup == 0:
        return
    ma = re.compile('youtube.com')
    # ma2 = re.compile('fb.com')
    links = soup.find_all('a', href=True)
    for link in links:
        if ma.search(link['href']):
            # print(link['href'])
            if link['href'] not in data[8]:
                data[8].append(link['href'])


def getGmail(soup):
    if soup == 0:
        return
    ma = re.compile(
        r'([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)\b')
    ma2 = re.compile('contact')
    links = soup.find_all('a', href=True)
    res = ma.search(soup.prettify())
    if res != None:
        data[2].append(res.group())
    # contacts = ma2.search()
    # ma.search(soup.prettify())
    # print(ma.search(soup.prettify()))
    done = []
    for link in links:
        if link['href'] in done:
            continue
        if ma2.search(link['href']):
            # print(link['href'])
            done.append(link['href'])
            con = link['href']
            headers = {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0',
            }
            try:
                r = requests.get(con, headers=headers)
            except:
                try:
                    # print(url+con)
                    li = ""
                    if con[-1] == '/':
                        for st in con.split('/')[:-2]:
                            li += st + '/'
                    else:
                        for st in con.split('/')[:-2]:
                            li += st + '/'
                    if con[0] == '/':
                        li += con[1:]
                    else:
                        li += con
                    # print(li)
                    r = requests.get(li, headers=headers)
                except:
                    continue
            soup = BeautifulSoup(r.content, 'html5lib')
            res = ma.search(soup.prettify())
            if res != None:
                data[2].append(res.group())

    data[2] = list(dict.fromkeys(data[2]))


def getInstagram(soup):
    if soup == 0:
        return
    ma = re.compile('instagram.com')
    # ma2 = re.compile('fb.com')
    links = soup.find_all('a', href=True)
    for link in links:
        if ma.search(link['href']):
            if link['href'] not in data[7]:
                # print(link['href'])
                data[7].append(link['href'])


def getfbAddress(code):
    print(code)
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0',
        'Content-Language': 'en-GB',
        'Accept-Language': 'en-GB'
    }
    flag = 0
    for link in data[5]:
        li = link
        try:
            r = requests.get(li, headers=headers)
            soup = BeautifulSoup(r.content, 'lxml')
        except:
            continue
        else:
            if code != 1:
                try:
                    add = [soup.select_one("._2wzd").text.split(' (')[0],soup.select_one("._2wzd").text.split(') ')[1]]
                    print(add)
                    if len(add[0].split(',')) > 1:
                        if len(add[1].split(',')[0].split(' ')) > 1:
                            data[1] = [add[0].split(',')[0], add[0].split(',')[1], add[1].split(
                                ',')[0].split(' ')[1], add[1].split(', ')[1], add[1].split(',')[0].split(' ')[0]]
                        else:
                            data[1] = [add[0].split(',')[0], add[0].split(',')[1], add[1].split(',')[
                                0], add[1].split(',')[1], '']
                    else:
                        # print(add[1].split(',')[0].split(' '))
                        if len(add[1].split(',')[0].split(' ')) > 1:
                            data[1] = [add[0].split(',')[0], '', add[1].split(',')[0].split(' ')[1], add[1].split(', ')[
                                1], add[1].split(',')[0].split(' ')[0]]
                        else:
                            data[1] = [add[0].split(',')[0], '', add[1].split(
                                ',')[0], add[1].split(', ')[1], '']
                    flag = 1
                except Exception as e:
                    print(e)
                    data[1] = ['', '', '', '', '']
            if code != 4:
                try:
                    if soup.select_one("._14-5").text == "Permanently closed":
                        data[9] = 0
                    else:
                        data[9] = 1
                    flag = 1
                except:
                    data[9] = 1
            if flag == 1:
                data[5] = [link]
                break


def getgoogleAddress(name, place):
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0',
        'Content-Language': 'en-GB',
        'Accept-Language': 'en-GB'
    }
    weeks = {"MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3,
            "THURSDAY": 4, "FRIDAY": 5, "SATURDAY": 6, "SUNDAY": 7, "SUNDAY(EASTER)": 8}
    url = "https://www.google.com/search?"
    query = name+" "+place
    url += "q="+query.split(' ')[0]
    for i in query.split(' ')[1:]:
        url += '+'+i
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.content, 'lxml')
    try:
        add = soup.select_one(
            ".i4J0ge > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text
        data[1] = [add.split(',')[0], '', add.split(',')[1], add.split(',')[
            2].split(' ')[1], add.split(',')[2].split(' ')[2]]
    except:
        try:
            add = soup.select_one("div.mod:nth-child(4) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text
            data[1] = [add.split(',')[0], '', add.split(',')[1], add.split(',')[
            2].split(' ')[1], add.split(',')[2].split(' ')[2]]
        except Exception as e:
            data[1] = ''
    try:
        if soup.select_one(".TLou0b > span:nth-child(1) > b:nth-child(1)").text == "Permanently closed":
            data[9] = 0
        else:
            data[9] = 1
    except:
        try:
            if soup.select_one('#Shyhc > span:nth-child(1)').text == "Permanently closed":
                data[9] = 0
            else:
                data[9] = 1
        except:
            data[9] = 1
    try:
        data[3].append(soup.select_one(
            ".zdqRlf > span:nth-child(1) > span:nth-child(1)").text)
    except:
        data[3] = ''
    try:
        temp = soup.select(".WgFkxc > tr > td")
        schdule = []
        i = 0
        count = 0
        while i < len(temp):
            if temp[i+1].text == "Open 24 hours":
               data[11] = 1
               break
            elif temp[i+1].text == "Closed":
                i = i+2
            else:
                print(temp[i].text,temp[i+1].text)
                for j in temp[i+1].text.split(','):
                    schdule.append([[], [], []])
                    schdule[count][0] = temp[i].text.upper()
                    if schdule[count][0].find('EASTER'):
                        schdule[count][0]=schdule[count][0].split('(')[0]
                        j = j.split('H')[0]
                    # print(j.split('–'))
                    
                    if j.split('–')[0].find('AM') != -1:
                       schdule[count][1].append(j.split('–')[0][:-2]+':00 AM')
                    elif j.split('–')[0].find('PM') != -1:
                       schdule[count][1].append(j.split('–')[0][:-2]+':00 PM')
                    else:
                        if j.split('–')[1].find('AM') != -1:
                            schdule[count][1].append(j.split('–')[0]+':00 AM')
                        elif j.split('–')[1].find('PM') != -1:
                            schdule[count][1].append(j.split('–')[0]+':00 PM')
                    if j.split('–')[1].find('AM') != -1:
                        schdule[count][2].append(j.split('–')[1][:-2]+':00 AM')
                    elif j.split('–')[1].find('PM') != -1:
                        schdule[count][2].append(j.split('–')[1][:-2]+':00 PM')
                    if len(schdule[count][2][0]) == 10:
                        schdule[count][2][0] = schdule[count][2][0][0:4]+schdule[count][2][0][-3:]
                    if len(schdule[count][1][0]) == 10:
                        schdule[count][1][0] = schdule[count][1][0][0:4]+schdule[count][1][0][-3:] 
                    if len(schdule[count][2][0]) == 11:
                        schdule[count][2][0] = schdule[count][2][0][0:5]+schdule[count][2][0][-3:]
                    if len(schdule[count][1][0]) == 11:
                        schdule[count][1][0] = schdule[count][1][0][0:5]+schdule[count][1][0][-3:]
                    count +=1
                i = i+2
        def weeksort(a):
            return weeks[a[0]]
        print(schdule)
        schdule.sort(key=weeksort)
        data[10] = schdule
    except Exception as e:
        print(e)
        data[10] = []


def getData(i):
    global data
    data.append([])
    soup = sendreq(i['website'])
    code = 3
    data = [i["_id"], [], [], [], i['website'], [], [], [], [], [], [], 0]
    t1 = threading.Thread(target=getFacebook, args=(soup,))
    t2 = threading.Thread(target=getTwitter, args=(soup,))
    t3 = threading.Thread(target=getGmail, args=(soup,))
    t4 = threading.Thread(target=getYoutube, args=(soup,))
    t5 = threading.Thread(target=getInstagram, args=(soup,))
    t6 = threading.Thread(target=getgoogleAddress,
                          args=(i["name"], i["city"]))
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t5.start()
    t6.start()
    t1.join()
    t6.join()
    if data[1] == '':
        code = 2
    if data[9] == '':
        if code == 2:
            code = 0
        else:
            code = 1
    # print(code)
    if code < 3:
        t7 = threading.Thread(target=getfbAddress, args=(code,))
        t7.start()
    t2.join()
    t3.join()
    t4.join()
    t5.join()
    if code < 3:
        t7.join()
    return data
