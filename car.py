from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager


URL = 'https://www.cyberts.kr/cp/pvr/cpr/readCpPvrCarPrsecResveMainView.do'

#options = Options() # 옵션을 조정하기 위한셋팅
#options.add_argument('--blink-settings=imagesEnabled=false') # 이미지 로딩안하게 옵션셋팅

chrome_options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

#driver.implicitly_wait(time_to_wait=5) # 로딩대기 (암묵적) 최대 5초까지

driver.get(url=URL)
tabs = driver.window_handles
driver.implicitly_wait(time_to_wait=5)


driver.switch_to.window(driver.window_handles[0])
keyword = driver.find_element(By.XPATH,"/html/body/div[1]/div[3]/form/table/tbody/tr[1]/td/ul/li/input") # 검색 속성 찾기
keyword.send_keys("28어2384")  # 검색어 입력

keyword = driver.find_element(By.XPATH,"/html/body/div[1]/div[3]/form/table/tbody/tr[2]/td/ul/li/input") # 검색 속성 찾기
keyword.send_keys("960324")  # 검색어 입력

keyword.send_keys("\ue007") # 검색후 enter키 입력

fdata = driver.find_element(By.XPATH, f"/html/body/div[4]/div/div[2]/div[1]/div/span/span[1]")
edata = driver.find_element(By.XPATH, f"/html/body/div[4]/div/div[2]/div[1]/div/span/span[2]")
pdata = driver.find_element(By.XPATH, f"/html/body/div[4]/div/div[2]/div[1]/div/span/span[3]")

print(fdata.text)
print(edata.text)
print(pdata.text)




