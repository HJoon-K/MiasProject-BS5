from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import csv
a = 1

data_center = []
data_center2 = []

while a <= 15 :
    URL = 'https://xn--c79a92lprl6ye3tam7eitm.com/30'

    chrome_options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    driver.get(url=URL)

    keyword = driver.find_element(By.XPATH, f"/html/body/div[5]/main/div/div[2]/div/div/div/div/div/ul/li[{a}]/a")  # 검색 속성 찾기


    keyword.send_keys("\ue007")  # 검색후 enter키 입력

    div1 = driver.find_element(By.XPATH, "/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/nav/ul")
    res1 = len(div1.find_elements(By.TAG_NAME, 'li'))
    res1 = (res1)

    j = 2
    while j <= res1:

        div1 = driver.find_element(By.XPATH,
                                   "/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/nav/ul")
        res1 = len(div1.find_elements(By.TAG_NAME, 'li'))
        res1 = (res1)

        div2 = driver.find_element(By.XPATH, "/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]")
        res2 = len(div2.find_elements(By.TAG_NAME, 'input'))
        res2 = (res2 / 2)  # 정비소 숫자 카운트 최대 10

        i = 1
        while i <= res2:
            #gugun = driver.find_element(By.XPATH,
            #                            f"/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/div{[i]}/div/a[1]")
            center = driver.find_element(By.XPATH,
                                         f"/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/div{[i]}/div/a[2]/div/div")
            addr = driver.find_element(By.XPATH,
                                       f"/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/div{[i]}/div/div[1]/p[1]")
            phone = driver.find_element(By.XPATH,
                                        f"/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/div{[i]}/div/div[1]/p[2]/a")

            test = phone.text.split('\n')

            data_center = [f"{center.text},{addr.text},{test[0]}"]
            data_center2.append(data_center)

            i = i + 1

        j = j + 1
        if i < 11:break
        elif a == 9 and res1 ==7 and 11 <=i  : break
        elif j == (res1) and res1 != 7 and 11 <=i  : break
        else:
            num = driver.find_element(By.XPATH,
                                      f"/html/body/div[5]/main/div[3]/div[1]/div/div/div/div[2]/div[1]/div[2]/nav/ul/li{[j]}/a")
            num.send_keys("\ue007")

        if j == 7: j = 2



    a =  a + 1

with open('center.csv', 'w', newline='', encoding="UTF-8") as f:
    write = csv.writer(f)

    write.writerows(data_center2)
f.close()
data_center.clear()
data_center2.clear()
