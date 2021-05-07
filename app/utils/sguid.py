import datetime,random


def same_divide():
    ddt = datetime.datetime.today()
    year = ddt.year % 1000
    month = ddt.month + 10
    day = ddt.day + 10
    return year, month, day

def sguid(repp):  # rep为生成的ID相同时的标志位，相同为True，不同为None
    r_flag1 = 0
    r_flag2 = 0
    y, m, d = same_divide()
    bbsn = y * (10 ** 8) + m * 10000 - 100010 + d
    # 20  5309  1208
    # 20  5309  1207
    r0 = 99
    if repp == True:
        r0 = random.choice((9, 99, 999))
    r1 = random.randint(0, r0)

    if r0 == 999:
        r3 = 9
    elif r0 == 99:
        r3 = 99
    else:
        r3 = 999
    r2 = random.randint(0, r3)

    if r1 < 9:
        r_flag1 = 10
    if r2 < 9:
        r_flag2 = 10

    r1 = (r1 + r_flag1) * (10 ** 6) - 1000000 * r_flag1
    r2 = (r2 + r_flag2) * 100 - 100 * r_flag2

    bbsn = bbsn + r1 + r2 - 943216
    return bbsn

