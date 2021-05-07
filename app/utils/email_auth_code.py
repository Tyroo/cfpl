#导入email模块构造邮件
from email.mime.text import MIMEText
import smtplib
import random


def read_mail():
    random_code = random.sample(range(100000,999999),1)
    random_str = str(random.sample(range(1,1000),1))
    #构造并设置邮件内容
    msg = MIMEText("Hello my name is cfpl，欢迎您注册CFPL社区账号，您此次用于注册的验证码为：%s。"%(random_code))
    #设置邮件主题
    msg['subject'] = 'Welcome to register CFPL community account！'
    #设置邮件寄件者
    msg['From'] = 'CFPL社区'+random_str
    # 设置邮件收件者
    msg['TO'] = random_str
    return msg,random_code

def send_mail(User_Address,msg):
    #寄件者账号和密码
    from_addr = 'youzewei@cfpl.onexmail.com'
    password = '123456Yzw'
    # from_addr = "519272478@qq.com"
    # password = 'ghesvxpdfbtfbihb'
    #smtp服务器地址
    # smtp_server = 'smtp.qq.com'

    #收件人地址
    to_addr = User_Address

    try:
        #连接服务器
        server = smtplib.SMTP_SSL(host = 'smtp.exmail.qq.com')
        server.connect(host = 'smtp.exmail.qq.com', port = 465)
        server.ehlo()
        #登陆邮箱
        server.login(from_addr,password)
        server.sendmail(from_addr,to_addr,msg.as_string())
        server.quit()
        SendFlag = True
    except Exception as E:
        SendFlag = False
    return SendFlag

