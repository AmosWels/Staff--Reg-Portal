class Animal:
    def __init__(self,name, age):
        self.name= name
        self.age=age
    
    def bark(self):
        return 'woof woof'

    def eat(self):
        return 'eating'
    
    def info(self):
        return f'name: {self.name}, age: {self.age}'

class Cat(Animal):
    def speak(self):
        return 'meow meow'


print('Cat>', Cat('Cat',10).speak())
print('Dog>', Animal('Dog',4).info())

def sum(a,b):
    return a+b

def reverse_string(s):
    return s[::-1]

def reverse_list(l):
    return l[::-1]

def reverse_list1(l):
    return list(reversed(l))

def reverse_list2(l):
    for i in range(len(l)):
        l.insert(i, l.pop())
    return l
        

def reverse_dict(d):
    return {v:k for k,v in d.items()}

def input_sum():
    a = int(input('Enter a number: '))
    b = int(input('Enter a number: '))
    return a+b

def fizzbuzz(n):
    for i in range(1,n+1):
        if i%3 == 0 and i%5 == 0:
            print('fizzbuzz')
        elif i%3 == 0:
            print('fizz')
        elif i%5 == 0:
            print('buzz')
        else:
            print(i)

def palindrome(s):
    s_r = s[::-1]
    if s == s_r:
        return True
    else:
        return False

def longest_word(s):
    s = s.split()
    # print('\n', s)
    max_len = 0
    for i in s:
        if len(i) > max_len:
            max_len = len(i)
            word = i
    return word

def binary_search(l, item):
    low = 0
    high = len(l) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = l[mid]
        if guess == item:
            return l[mid]
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return 'Not found'

def rotated(l, n):
    # return l[::-1]
    # return l[::-1]
    return l[-n:] + l[:-n]
    # return l[n:] + l[:n]

def two_sum(ll, target):
    list1 = list()
    # for l in range(len(ll)):
    #     for j in range(l+1, len(ll)):
    #         if ll[l] + ll[j] == target:
    #             list1.append((ll[l], ll[j]))
    # for i in ll:
    #     if target - i in ll:
    #         list1.append((i, target-i))
    
    for i in range(len(ll)):
        diff = target - ll[i]
        if diff in ll and ll.index(diff) != i:
            if (ll[i], diff) not in list1 and (diff, ll[i]) not in list1:
                list1.append((ll[i], diff))
    return list1 if list1 else 'Not found'

def missing_num(pp):
    list1 = list()
    pp.sort()
    for i in range(len(pp)-1):
        if pp[i+1] - pp[i] != 1:
            list1.append(pp[i] + 1)
    return list1

print('sum', sum(1,2))
print('reverse string', reverse_string('hello'))
print('reverse array', reverse_list([2,4,1,2,3,4,5]))
print('reverse array', reverse_list1([2,4,1,2,3,4,5]))
print('reverse array', reverse_list2([2,4,1,2,3,4,5]))
print('reverse array', reverse_dict({'a':1, 'b':2, 'c':3}))
# print('>>', input_sum())
# print('>>', fizzbuzz(10))
print('>>', palindrome('madasm'))
print('>>', longest_word('"The quick brown fox jumped over the lazy dog"'))
print('>>', binary_search([1,2,3,4,5], 9))
print('>>', rotated('madasmxxxl', 1))
print('>>', two_sum([2, 5, 7, 9, 6], 11))

def missing_num2(pp):
    list1 = list()
    for i in range(len(pp)-1):
        if pp[i+1] - pp[i] !=1:
            list1.append(pp[i]+1)
    return list1 

print('>>', missing_num2([1, 2, 4, 6, 7, 8, 10]))
print('>>', missing_num([1, 2, 4, 6, 7, 8]))

    