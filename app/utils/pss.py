
#自制加密算法

import random

    
def eninstall(strr):
        list1 = ''.join(list(map(chr,random.sample(range(65,91),5))))
        list2 = ''.join(list(map(chr,random.sample(range(65,91),5))))
        str3 =[]
        for st in str(strr):
            str3.append(chr(eval(st)+80))
        str3 = ''.join(str3)    
        return list1+str3+list2

def uninstall(strr):
        strr = strr[5:-5]
        value = []
        for st in strr:
            value.append(str(ord(st)-80))
        value = ''.join(value)
        value = eval(value)
        return value

