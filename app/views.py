from django.shortcuts import render,HttpResponse,redirect
from app.models import User_Info,User_Article,Article_Interaction
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from app.utils import email_auth_code, sguid, pss
import datetime,base64,json

#from django_redis import get_redis_connection
# Create your views here.

#服务器业务处理所需数据定义区
CookiesFlag = {'CookiesFlag': False}        #用于判断用户是否处在登录状态
SessionFlag = {'SessionFlag': False}

UserData = {'SessionUserName': '',
            'lis': {},
            'liu':{}
            }

data1 = {                                     #用于注册验证注册信息
         "username2": "initial",              #用户名状态  username2 = {initial:初始值，correct:正确，error:错误，blank:含空格}
         "password2": "initial",              #密码状态  password2 = {initial:初始值，correct:正确，error:错误，beyond:超过长度，unlikeness:两次密码不相同，blank:含空格}
         "State": 'unsuccessful',             #请求跳转至主页状态  State = {unsuccessful:不成功，succeed:成功}
         "mail2":'initial'                    #邮箱状态  mail2 = {initial:初始值，correct:正确，error:错误}
}

data2 = {
    'username2': 'initial',
    'password2': 'initial',
    'State': 'unsuccessful'
}

data3 = {

    "mail2":'initial',  #邮箱状态  mail2 = {initial:初始值，correct:正确，error:错误}
    "State":'unsuccessful'
}

auth = {            #用来暂存用户邮箱地址和验证码
    'authcode2':'',
    "mailsite2":''
}
#---------------------------------#

#cookie校验函数，用来判断用户是否满足了登陆条件
def cookie_verify(Cookie,CookiesFlag):
    try:
        if Cookie == 'succeed':
            CookiesFlag['CookiesFlag'] = True
        else:
            CookiesFlag['CookiesFlag'] = False
    except Exception as E:
        CookiesFlag['CookiesFlag'] = False
    return CookiesFlag


#session校验函数，用来判断用户是否处在登录状态
def session_verify(SessionKey,SessionFlag):
    if SessionKey != None:
        SessionFlag['SessionFlag'] = True
    else:
        SessionFlag['SessionFlag'] = False
    return SessionFlag

#首页重定向
def index_redirect(request):
    return redirect("/index")

#首页界面加载函数
def index(request):
    LogoutFlag = False
    if request.method == 'POST':
        DATA = request.POST
        Logout = eval(request.body.decode('utf-8')).get('logout')
        if Logout == 'True':
            request.session.flush()
            LogoutFlag = True
        return HttpResponse(json.dumps(LogoutFlag))
    else:
        # Cookie = request.get_signed_cookie('State',salt='f7sg*/8i(4h)+#@8p2z$5d6r%0h',default='')
        session_name = request.session.get('UserName',None)
        SF = session_verify(session_name,SessionFlag)
        # CF = cookie_verify(Cookie,CookiesFlag)
        return render(request, 'index.html',SF)

# 公告模块
def notice(request):
    if request.method == 'GET':
        return render(request, 'notice.html')


# 个人中心模块，用来显示用户信息
def personal(request):
    RSUN = request.session.get('UserName',None)  # 取出session中的用户名信息，若存在则返回
    if request.method == 'POST':
        DATA = eval(request.body.decode('utf-8'))
        index = DATA.get('index',None)
        item = DATA.get('item',None)
        Request_Flag = 'no'
        if RSUN != None and index != None and item != None:
            UI = User_Info.objects.filter(Q(UserName=RSUN) | Q(UserBbsn=RSUN))
            UA = User_Article.objects.filter(UserName=UI[0].UserName, id=pss.uninstall(index))
            #AI = Article_Interaction.objects.filter(Q(UserName = RSUN) | Q(UserBbsn = RSUN), Index=index)
            if item == 'delete':            #Q(Index=index) & (Q(UserName = RSUN) | Q(UserBbsn = RSUN))
                UA.delete()
                #AI.delete()
                Request_Flag = 'yes'
            elif item == 'addlock':
                pass
                Request_Flag = 'yes'
            else:
                Request_Flag = 'no'
        return HttpResponse(Request_Flag)
    else:
        if RSUN != None:
            UserData['SessionUserName'] = RSUN
            ARG = request.GET.dict()
            TAG = eval(ARG.get('tag','1'))
            liu = User_Info.objects.filter(Q(UserName=RSUN) | Q(UserBbsn=RSUN))
            if TAG == 1:
                LUN = str(liu[0].UserName)
                lis = Article_Interaction.objects.filter(UserName = LUN)
                lis = lis.values()
                UserData['lis'] = lis
            else:
                UserData['lis'] = ''
            UserData['liu'] = liu.values()[0]
        else:
            UserData.clear()
        return render(request,'personal.html',UserData)


#登录模块
def login(RequestData,data2):     #登录校验
    CompleteFlag = False
    data2['State'] = 'unsuccessful'
    username1 = RequestData.get('username1', None)
    password1 = RequestData.get('password1', None)
    username2 = (base64.b64decode(username1)).decode('utf-8')
    password2 = (base64.b64decode(password1)).decode('utf-8')

    UNB = User_Info.objects.filter(Q(UserName = username2) | Q(UserBbsn=username2))
    UNBP = User_Info.objects.filter(Q(UserName = username2) | Q(UserBbsn = username2),UserPassword=password2)

    if UNBP:
        data2['State'] = 'succeed'
        data2['username2'] = 'correct'
        data2['password2'] = 'correct'
        username2 = UNBP.values()[0]['UserName']  #将用户名赋值给username2，以便返回给session
        CompleteFlag = True
    else:
        username2 = None
        if UNB:
            data2['username2'] = 'correct'
            data2['password2'] = 'error'
        else:
            data2['username2'] = 'error'
            data2['password2'] = 'initial'
    return CompleteFlag,data2,username2



#注册模块
def sign(RequestData,Flag,data1,data3,auth):      #注册并将注册数据导入数据库
    data1['State'] = 'unsuccessful'     #每次访问注册页面都将主页登录状态设置为不成功状态，防止未满足登录条件也会跳转
    username1 = RequestData.get('username1', None)
    CompleteFlag = False    #注册完成标志
    if Flag =='authcode':
        msg,random = email_auth_code.read_mail()
        auth['authcode2'] = str(random[0])
        auth['mailsite2'] = RequestData.get('mail1', None)
        if email_auth_code.send_mail(auth['mailsite2'], msg) == True:
            data3['mail2'] = 'correct'
        else:
            data3['mail2'] = 'error'
        return CompleteFlag,data3,username1
    elif Flag == 'username':    #处理用户名验证
        UNB = User_Info.objects.filter(Q(UserName=username1) | Q(UserBbsn=username1)).first() #在数据库中寻找用户名，有则返回用户名值，无则返回None
        if (UNB == None) and (username1 != '') and ( ' ' not in username1):    #判断输入的用户名是否为空、是否已被注册、是否和论坛号相同
            data1['username2'] = 'correct'        #验证通过返回“correct”
        elif(username1 in ' '):
            data1['username2'] = 'blank'
        else:
            data1['username2'] = 'error'    #验证不通过返回“error”
        return CompleteFlag,data1,username1
    else:           #处理注册
        if data1['username2'] == "correct":   #若用户名经验证后符合规范则允许注册
            #开始注册操作
            SP = RequestData.get("password1",None)
            SUN = username1
            SAP = RequestData.get("affirmpassword1",None)
            SM = RequestData.get("mail1",None)
            SAC = RequestData.get("authcode1",None)
            UNB = User_Info.objects.filter(Q(UserName=SUN) | Q(UserBbsn=SUN)).first()
            # 保证两次输入的密码相同且邮箱为合法邮箱时，开始导入注册数据至数据库
            if ((SP == SAP) and ((9<=len(SP)<=16) and (' ' not in SP))):
                data1['password2'] = 'correct'  # 验证通过返回密码符合规范
                if (data3['mail2'] == 'correct') and (SM == auth['mailsite2']) and (SAC == auth['authcode2']):
                    data1['State'] = 'succeed'
                    data1['mail2'] = 'correct'
                    if UNB == None:
                        userinfo_dict = {'Name': RequestData["name1"],
                                         'StudentNumber': RequestData["studentnumber1"],
                                         'UserEmail': RequestData["mail1"],
                                         'UserName': RequestData["username1"],
                                         'UserPassword': SP,
                                         'UserBbsn':''
                        }
                        UB = str(sguid.sguid(None))
                        while True:
                            ddt = datetime.datetime.today()
                            BBSN = User_Info.objects.filter(SignTime__year=ddt.year,SignTime__month=ddt.month,SignTime__day=ddt.day,UserBbsn=UB).first()
                            if BBSN == None:
                                userinfo_dict['UserBbsn'] = UB
                                User_Info.objects.create(**userinfo_dict)  # 将用户信息存入数据库
                                CompleteFlag = True  # 注册完成标志设置为True标志注册完成
                                break
                            else:
                                UB = str(sguid.sguid(True))
                    auth['authcode2'] = ''
                    auth['mailsite2'] = ''
                else:
                    data1['mail2'] = 'error'
            else:
                if((9<=len(SP)<=16) == False):     #判断密码长度是否符合规范
                    if len(SP) == 0:
                        data1['password2'] = 'error'
                    else:
                        data1['password2'] = 'beyond'
                elif((' ' not in SP) == False):  #判断密码是否含有空格
                    data1['password2'] = 'blank'
                else:   #若两次输入密码不一样，则返回两次密码不一样错误内容
                    data1['password2'] = 'unlikeness'
        return CompleteFlag,data1,username1





 #注册-登录函数 负责综合处理用户注册/登录业务
def login_sign(request):
    if request.method =='POST':
        RequestData = request.POST
        Flag = RequestData.get('flag1', None)       #获取JS中发送的请求，用来判断是登录还是注册
        # request.session.set_expiry(0) #设置session的cookies失效时间，为0则关闭浏览器失效，为n(整数)则经过n秒后失效
        #                               #session的cookies失效后则浏览器会删除该cookies，而数据表django_session中的数据并不会被删除
        if (Flag == 'username') or (Flag == 'affirmsign') or (Flag == 'authcode'):  #是注册请求，则注册
            CompleteFlag1,data1_1,username1 = sign(RequestData, Flag, data1,data3,auth)
            response = HttpResponse(json.dumps(data1_1))  #创建Response对象，为设置cookies做准备
            # response.set_signed_cookie("State",data1_1['State'],max_age=None,path='/',salt='f7sg*/8i(4h)+#@8p2z$5d6r%0h') #设置cookies   ,max_age=None,path='/'
            if CompleteFlag1 == True:    #当注册完成后生成session
                request.session['UserName'] = username1
                request.session.set_expiry(0)
            # print(request.session)
            return response
        else:               #是登录请求，则登录
            CompleteFlag2,data2_1,username2 = login(RequestData,data2)
            response = HttpResponse(json.dumps(data2_1))
            # response.set_signed_cookie("State", data2_1['State'], max_age=None, path='/',salt='f7sg*/8i(4h)+#@8p2z$5d6r%0h')   #, max_age=None, path='/'
            if CompleteFlag2 == True:  # 登录完成后生成session
                request.session['UserName'] = username2
                request.session.set_expiry(0)
            # print(username2,request.session['UserName'])
            return response
    else:
        return render(request, 'login.html')


#文章处理函数，负责存储、检查待发布的文章
def editor(request):
    if request.method == 'POST':
        DATA = eval(request.body.decode('utf-8'))
        content = DATA.get('content',None)
        title = DATA.get('title', None)
        issueplate = DATA.get('plate',None)
        issueclassify = DATA.get('classify',None)
        index = DATA.get('index',None)
        username = request.session.get('UserName',None)

        if content and title and username and issueplate and issueclassify:
            UI = User_Info.objects.filter(Q(UserName=username) | Q(UserBbsn=username))
            if index !='' and index != None:
                UA = User_Article.objects.filter(id=pss.uninstall(index), UserName=UI[0].UserName)
                AI = Article_Interaction.objects.filter(Index=index, UserName=UI[0].UserName)
                UA.update(Content=content)
                UA.update(Title=title)
                AI.update(Title=title)
                AI.update(IssuePlate=issueplate)
                AI.update(IssueClassify=issueclassify)
            else:
                user_article_dict = {'Title': title,
                                     'UserName': UI[0],
                                     'Content': content,
                                     'Collect': 0,
                                     'Praise': 0
                                }
                UAC = User_Article.objects.create(**user_article_dict)

                index1 = pss.eninstall(User_Article.objects.filter(UserName=UI[0].UserName).last().id)  #加密
                article_interaction_dict = {
                    'Index': index1,
                    'Title':title,
                    'UserName': UI[0].UserName,
                    'Nid': UAC,
                    'IssuePlate': issueplate,
                    'IssueClassify': issueclassify,
                }

                Article_Interaction.objects.create(**article_interaction_dict)

            return HttpResponse("yes")
        else:
            return HttpResponse("no")
    else:
        if eval(request.GET.get('change','0')) == 1:
            index = request.GET.get('index', '0')
            lis = User_Article.objects.filter(id= pss.uninstall(index))
            Button_Value = {"theme":"文章修改",'cancel_issue': '取消修改', "affirm_issue": "确认修改", "save_draft": "保存草稿", "content": lis[0].Content, "title": lis[0].Title}
        else:
            Button_Value = {"theme":"文章发布",'cancel_issue': '取消发布', "affirm_issue": "确认发布", "save_draft": "保存草稿", 'content': ''}
        return render(request, 'editor.html', Button_Value)

#文章发布页数据传递
def editor_data(request):
    if request.method == 'GET':
        EditorData = {'section_list': section_list,'class_list': class_list}
        return HttpResponse(json.dumps(EditorData),content_type='application/json')



#文章回显函数，负责回显文章
@csrf_exempt
def article(request):
    content = {
               'id': None,
               'title': None,
               'collect': None,
               'praise': None,
               'username': None,
               'article_content': None,
               'comment': None,
               'issuetime': None,
               'browse_username': None
    }
    if request.method == 'GET':
        DATA = request.GET.get('ID', None)
        AIFF = Article_Interaction.objects.filter(Index=DATA).first()
        if (DATA and AIFF) != None :
            DATA = pss.uninstall(DATA)
            RSUN = request.session.get('UserName', '')  # 取出session中的用户名信息，若存在则返回
            Article_Data = list(User_Article.objects.filter(id=DATA).values()[0].values())
            Article_Data.append(RSUN)
            # except Exception as E:
            #     ArticleData = ['','','','','','<h3 style="height:500px;line-height:500px;text-align:center;">此文章已删除！</h3>','',''] #当文章被删除时，提示浏览用户
            for i in range(0, len(content)):
                content[list(content.keys())[i]] = Article_Data[i]
            return render(request, 'article.html',content)
        else:
            return redirect('/index/')

#cont = [['dfg','哈哈哈'],[['Tyro dfg','哈哈哈哈'],[]]]
#文章列表显示函数，负责加载帖子列表
section_list = ['话题','活动','校园墙','比赛']
class_list = {
                '1':['全部','学习','闲聊','其他'],
                '2':['全部','公益','文艺','其他'],
                '3':['全部','活动','校园墙','其他'],
                '4':['全部','校内','校外','其他']
}

def special(request):
    if request.method == 'GET':
        try:
            ARG = request.GET.dict()
            Plate = section_list[eval(ARG['section']) - 1]
            lis = Article_Interaction.objects.filter(IssueTime__range=(time_gain(180)), IssuePlate=Plate)

            if (len(ARG) > 1) and (eval(ARG['class']) > 1):
                Class = class_list[ARG['section']][eval(ARG['class']) - 1]
                lis = Article_Interaction.objects.filter(IssueTime__range=(time_gain(180)),IssuePlate=Plate,IssueClassify=Class)
            lis = lis.values()
            return render(request, 'special.html', {'lis': lis})
        except Exception:
            return redirect('/index/')

        # n = lis.count()  0-29   30-59  60-89
        # if n > 30:        lis[30*(pag-1):30*pag-1]
        #     lis = lis[n-30:n]
        # else:
        #     lis = lis[0:n]  #返回0~n区间的数据
        #
    else:
        return redirect('/index/')


# 获取时间段函数，默认获取当前时间-前day天时间段，并返回
def time_gain(day):
    start_time = datetime.datetime.now() + datetime.timedelta(-day)
    stop_time = datetime.datetime.now() #+ datetime.timedelta(hours=24)  #当前时间加上24小时
    return start_time,stop_time

