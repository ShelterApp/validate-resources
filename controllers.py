from passlib.context import CryptContext
from flask import Flask
import json
from flask import Flask, flash, redirect, render_template, request, session, abort
from models import getData, init, getdbdata, putindb, getUser, userInsert, changePassword
app = Flask(__name__)

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    default="pbkdf2_sha256",
    pbkdf2_sha256__default_rounds=30000
)
email = ""


@app.route("/")
def home():
    if 'logged_in' not in session:
        session['resetemail'] = ''
        session['logged_in'] = False
        return render_template('Login.html')
    else:
        if session['logged_in'] == False:
            session['resetemail'] = ''
            return render_template('Login.html')
        return render_template('home.html')


@app.route("/dataS", methods=['GET'])
def givedata():
    model = getdbdata()
    data = getData(model)
    final = {}
    final['1'] = ['id', ['Address'], ['ContactEmail'], ['Phones'], 'Website', ['Facebook'], ['Twitter'], ['Instagram'], ['Youtube'],
                  ['Open Schedules']]
    if email.find_one({'name': model['name'],'zip': model['zip']}) == None:
        email.insert(
            {'name': model['name'], 'zip': model['zip'], 'db-email': model['contactEmail'], 'scrapped-email': data[2]})
    temp = []
    for i in model['schedules']:
        try:
            if i["type"] == 'WEEKLY':
                temp.append(
                    [i["type"], i["day"], [i["startTime"]], [i["endTime"]]])
            elif i["type"] == 'MONTHLY':
                temp.append([i["type"], i["period"], i["day"],
                             [i["startTime"]], [i["endTime"]]])
            elif i["type"] == 'FULL_DAY':
                temp.append([i['type'], '', [], []])
            else:
                temp.append(['', '', [], []])
        except:
            temp.append(['', '', [], []])
    temp1 = []
    for i in model["closeSchedules"]:
        try:
            if i["type"] == 'WEEKLY':
                temp1.append(
                    [i["type"], i["day"], [i["startTime"]], [i["endTime"]]])
            elif i["type"] == 'MONTHLY':
                temp1.append([i["type"], i["period"], i["day"],
                              [i["startTime"]], [i["endTime"]]])
            elif i["type"] == 'PERMANENTLY_CLOSED':
                temp1.append([i['type'], '', [], []])
            else:
                temp1.append(['', '', [], []])
        except:
            temp1.append(['', '', [], []])
    final['2'] = data
    if 'productid' not in session:
        session['productid'] = data[0]
    session['productid'] = data[0]
    db = [data[0], [model['address1'], model['address2'], model['city'], model['state'], model['zip']], [model['contactEmail']],
          [model['phone']], model['website'], [model['facebook']], [model['twitter']], [model['instagram']], [model['youtube']],    temp,  temp1, model['name'], model['serviceSummary'], session['fname'], model['isContact']]
    final['3'] = db
    print(final['2'])
    return final


@app.route("/ApplyChanges", methods=['POST', 'GET'])
def ApplyChanges():

    # Session variable i is original from model.json
    # Add to session variable MongoDB
    # print(request.args)
    lan = request.form
    # import time
    # print(lan['1'])
    # import time
    # time.sleep(1000)
    new = {}
    new['11'] = lan['11']
    new['12'] = lan['12']
    if 'contact' in lan:
        new['13'] = True
    else:
        new['13'] = False
    new['0'] = session['productid']
    # new['1'] = {"address1":lan['1'].split(',')[0],"address2":lan['1'].split(',')[1],"city":lan['1'].split(',')[2],"state":lan['1'].split(',')[4],"zip":lan['1'].split(',')[3]}
    for i in range(1, 9):
        if lan[str(i)] == '-':
            new[str(i)] = ''
        else:
            new[str(i)] = lan[str(i)]
    u = lan['schedule']

    y = json.loads(u)
    sch = []
    i = 0
    while i < len(y):
        try:
            if y[i][0] == 'WEEKLY':
                for k in range(len(y[i][2])):
                    sch.append({'type': y[i][0], 'day': y[i][1],
                                "startTime": y[i][2][k], "endTime": y[i][3][k]})
                i += 1
            elif y[i][0] == 'MONTHLY':
                for k in range(len(y[i][3])):
                    sch.append({'type': y[i][0], 'period': y[
                               i][1], 'day': y[i][2], "startTime": y[i][3][k], "endTime": y[i][4][k]})
                i += 1
            elif y[i][0] == 'FULL_DAY':
                sch.append({'type': y[i][0]})
                i += 1
            else:
                i += 1
        except Exception as e:
            print(e)
            i += 1

    new['9'] = sch
    print(new['9'])
    u = lan['closedschedule']
    # print(u)
    y = json.loads(u)
    # print(y)
    # print(len(y))
    sch = []
    i = 0
    while i < len(y):
        try:
            # print(y[i][0])
            if y[i][0] == 'WEEKLY':
                for k in range(len(y[i][2])):
                    sch.append({'type': y[i][0], 'day': y[i][1],
                                "startTime": y[i][2][k], "endTime": y[i][3][k]})
                i += 1
            elif y[i][0] == 'MONTHLY':
                for k in range(len(y[i][3])):
                    sch.append({'type': y[i][0], 'period': y[
                               i][1], 'day': y[i][2], "startTime": y[i][3][k], "endTime": y[i][4][k]})
                i = i+1
            elif y[i] == 'PERMANENTLY_CLOSED':
                sch.append({'type': y[i]})
                i += 1
            else:
                i += 1
        except:
            i += 1

    new['10'] = sch
    # print(new['10'])
    putindb(new, True)
    return redirect("/")


@app.route("/Skip", methods=['POST'])
def applyskip():
    # Session variable i is original from model.json
    # Add to session variable MongoDB
    putindb(session['productid'], False)
    return redirect("/")


def Checklogin(Formdata):
    Dict = getUser(Formdata['email'])
    if Dict == 0:
        return "No user Found. Please Register"
    elif Dict == 1:
        return "Account has been Suspended"
    # print(len(Dict[0]['password']))
    # print(len(Formdata['password']))
    if pwd_context.verify(Formdata['password'], Dict[0]['password']):
        session['fname'] = ""
        string = Dict[0]['fname']
        session['fname'] = string
        return True
    else:
        return "Wrong Password!"


@app.route("/otpsubmit", methods=['POST'])
def otpsubmit():
    data = request.form['otp']
    if data == session['otp']:
        session['otpverification'] = True
        return redirect("/changepassword")
    else:
        session['otp'] = '12345678'
        session['otpverification'] = False
        flash("Wrong Otp")
        return redirect("/ForgotPassword")


@app.route("/passreset", methods=['POST', 'GET'])
def passreset():
    if 'otpverification' in session:
        if session['otpverification'] == False:
            return redirect("/")
        else:
            print(changePassword(
                session['resetemail'], pwd_context.encrypt(request.form['password'])))
            if changePassword(session['resetemail'], pwd_context.encrypt(request.form['password'])) == 1:
                return {'status': 'success'}
            else:
                print("Blahblah")
                return {'status': 'No such email found'}
    else:
        return redirect("/")


@app.route("/changepassword")
def changePass():
    if 'otpverification' in session:
        if session['otpverification'] == False:
            return redirect("/")
        else:
            return render_template('changepassword.html')
    else:
        return redirect("/")


@app.route("/ForgotPassword")
def forgotpassword():
    session['resetemail'] = ''
    session['otpverification'] = False
    return render_template('forgotpassword.html')


@app.route("/emailreset", methods=['POST', 'GET'])
def reset():
    print(request.form)
    # return {'status':'success','data':request.json}
    formdata = request.form['email']
    import random
    userotp = random.randint(1000, 9999)
    response = mailstuff(formdata, userotp)
    print(response)
    if response == True:
        session['resetemail'] = formdata
        session['otp'] = str(userotp)
        return {'status': 'success'}
    else:
        return {'status': 'failure'}


@app.route("/login", methods=['POST'])
def login():
    res = Checklogin(request.form)
    if res == True:
        session['logged_in'] = True
    else:
        session['resetemail'] = ''
        session['logged_in'] = False
        session['fname'] = ""
        flash(res)
    return redirect("/")


@app.route("/SignUp")
def SignUp():
    return render_template('SignUp.html')


@app.route("/signup", methods=['POST'])
def signup():
    data = (request.form)
    listforinsert = [data['email'], data['firstname'],
                     data['lastname'], pwd_context.encrypt(data['password'])]
    # print(data)
    success = userInsert(listforinsert)
    if success == 1:
        session['logged_in'] = False
        return redirect("/")
    else:
        flash("Already Registered Please Login")
        return redirect("/")
    # print(RegisteredUser.query.all())
    # return home()


@app.route("/LogOut")
def logout():
    session['logged_in'] = False
    return redirect("/")


def mailstuff(email, otp):
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    import smtplib
    # from flask_mail import Mail
    try:
        host = "smtp.gmail.com"
        port = 587
        username = "shelterappdev@gmail.com"
        password = "hijsosdcrlqoosvo"
        to = email
        # try:
        email_conn = smtplib.SMTP(host, port)
        email_conn.ehlo()
        email_conn.starttls()
        email_conn.login(username, password)
        import random
        message = """\
Subject: Reset Password OTP

This message is sent from ShelterApp Volunteer Portal for Resetting your password. Your Otp is """ + str(otp) + """\n\nThanks,\nShelterApp Team\nshelterappinfo@gmail.com"""
        email_conn.sendmail(username, to, message)
        return True
    except:
        return False


if __name__ == "__main__":
    # mailstuff()
    email = init()
    app.secret_key = "12345678"
    app.run(host='0.0.0.0', debug=True, port=80)
