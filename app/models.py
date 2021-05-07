from django.db import models

# Create your models here.

#用户注册信息数据结构
class User_Info(models.Model):
    Name = models.CharField(max_length=10)      #用户姓名
    StudentNumber = models.CharField(max_length=10)  #学号
    UserEmail = models.EmailField()                 #邮箱
    UserName = models.CharField(max_length=16,unique=True,null=True)      #用户名
    UserBbsn = models.CharField(null=True,max_length=16)   #论坛号
    UserPassword = models.CharField(max_length=16)  #用户密码
    SignTime = models.DateField(auto_now_add=True)  #注册时间

#用户文章信息数据结构
class User_Article(models.Model):
    Title = models.CharField(max_length = 50,null=True) #文章标题
    Collect = models.IntegerField(null=True)            #收藏数
    Praise = models.IntegerField(null=True)             #获赞数
    #UserName = models.CharField(max_length = 16,null=True)       #发布人用户名称
    UserName = models.ForeignKey(User_Info, on_delete=models.CASCADE, to_field='UserName',null=True)  #与User_Info创建一对多关联关系
    Content = models.TextField(null=True)    #文章内容
    Comment = models.TextField(null=True)    #文章评论，是由字典转换而来的字符串{‘用户名’：'评论内容',,,}
    IssueTime = models.DateTimeField(auto_now = True,null=True,max_length=19)           #发布时间

    class Meta:                     #使用Meta类，
        ordering = ['id']      #使数据表按照id降序排列（最新的在后面）


#文章交互信息结构，用来存放所有与文章有关的索引、评论、收藏、点赞数等。
class Article_Interaction(models.Model):
    Index = models.CharField(max_length=64,null=True)   #字符型索引
    IssuePlate = models.CharField(max_length=8,null=True)   #文章所发布的板块
    IssueClassify = models.CharField(max_length=8,null=True)    #文章所发布的分类
    Title = models.CharField(max_length=50, null=True)  # 文章标题
    UserName = models.CharField(max_length=16, null=True)  # 发布人用户名称
    Nid = models.OneToOneField(User_Article,on_delete=models.CASCADE,null=True)  #与User_Article创建一对一关联关系
    IssueTime = models.DateTimeField(auto_now = True,null=True,max_length=19)           #发布时间
    Popularity = models.IntegerField(null=False,default=0)  #帖子人气， default参数用来设置此字段的默认值

    class Meta:                     #使用Meta类，
        ordering = ['-IssueTime']      #使数据表按照时间降序排列（最新的在前面）



 #  on_delete，设置删除处理方法的参数。当为models.CASCADE时，删除级联，父表删除时，子表也删除。
 #  to_field，设置所关联对象的关联字段的参数。默认为关联对象的主键（id）字段
 #  related_name，设置从关联对象到自身的关系的名称的参数。若值为‘+’，则关联对象与自身无逆向关系