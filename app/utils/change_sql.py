from app.models import User_Info


userinfo = User_Info()
userinfo.objects.all().delete()