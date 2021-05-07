from django import template
register = template.Library()


#自定义过滤器：用于将字符串以空格分开，类似于str.split(' ')

@register.filter        #利用装饰器 @register.filter 自定义过滤器
def blank_split(v1,v2):
    try:
        v2 = int(eval(v2))
        strls = v1.split(' ')
        return strls[v2]
    except Exception as E:
        return '未知错误！'

@register.filter        #利用装饰器 @register.filter 自定义过滤器
def str_eval(v1):
    return eval(v1)