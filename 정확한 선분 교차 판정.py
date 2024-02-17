
# 정확한 선분 교차 판정 알고리즘 
# - 외적과 많은 조건 분기 이용
# Javscript의 경우 BigInt 큰 수 연산이 느려서 시간 초과가 나는 듯

def line_intersection_check(x1, y1, x2, y2, x3, y3, x4, y4):
    k1 = ccw(x1, y1, x2, y2, x3, y3)
    k2 = ccw(x1, y1, x2, y2, x4, y4)
    k3 = ccw(x3, y3, x4, y4, x1, y1)
    k4 = ccw(x3, y3, x4, y4, x2, y2)
    
    if k1 * k2 == -1 and k3 * k4 == -1:
        return True
    elif k1 * k2 * k3 * k4 == 0 and (k1 * k2 == -1 or k3 * k4 == -1):
        return True
    elif k1 * k2 == 0 and k3 * k4 == 0 and k1 + k2 != 0:
        return True
    elif k1 * k2 == 1 or k3 * k4 == 1:
        return False
    elif k1 * k2 == 0 and k3 * k4 == 0 and k1 + k2 + k3 + k4 == 0:
        if is_straight_line_intersected(x1, y1, x2, y2, x3, y3) or \
           is_straight_line_intersected(x1, y1, x2, y2, x4, y4) or \
           is_straight_line_intersected(x3, y3, x4, y4, x1, y1) or \
           is_straight_line_intersected(x3, y3, x4, y4, x2, y2):
            if straight_line_node(x1, y1, x2, y2, x3, y3, x4, y4):
                return True
            else:
                return True
        else:
            return False

def ccw(x1, y1, x2, y2, x3, y3):
    d = x1 * y2 + x2 * y3 + x3 * y1 - x2 * y1 - x3 * y2 - x1 * y3
    if d < 0:
        return -1
    elif d == 0:
        return 0
    else:
        return 1

def straight_line_node(x1, y1, x2, y2, x3, y3, x4, y4):
    if x1 == x3 and y1 == y3 and (x2 - x1) * (x4 - x1) <= 0 and (y2 - y1) * (y4 - y1) <= 0:
        return True
    elif x1 == x4 and y1 == y4 and (x2 - x1) * (x3 - x1) <= 0 and (y2 - y1) * (y3 - y1) <= 0:
        return True
    elif x2 == x3 and y2 == y3 and (x1 - x2) * (x4 - x2) <= 0 and (y1 - y2) * (y4 - y2) <= 0:
        return True
    elif x2 == x4 and y2 == y4 and (x1 - x2) * (x3 - x2) <= 0 and (y1 - y2) * (y3 - y2) <= 0:
        return True
    else:
        return False

def is_straight_line_intersected(x1, y1, x2, y2, x3, y3):
    min_x = min(x1, x2)
    max_x = max(x1, x2)
    min_y = min(y1, y2)
    max_y = max(y1, y2)
    
    if min_x <= x3 <= max_x and min_y <= y3 <= max_y:
        return True
    else:
        return False