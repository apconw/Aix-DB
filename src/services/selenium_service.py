import json
import logging
import os

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import requests
from bs4 import BeautifulSoup
from selenium_stealth import stealth


def setup_chrome_driver(***REMOVED***:
    """

    :return:
    """
    # 设置 Chrome 选项为无头模式
    chrome_options = Options(***REMOVED***
    chrome_options.add_argument("--headless"***REMOVED***
    chrome_options.add_argument("--disable-gpu"***REMOVED***  # 如果运行在 Windows 上可能需要此参数
    chrome_options.add_argument("start-maximized"***REMOVED***
    chrome_options.add_argument("--disable-extensions"***REMOVED***
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"]***REMOVED***
    chrome_options.add_experimental_option("useAutomationExtension", False***REMOVED***

    # 获取当前脚本的绝对路径
    script_dir = os.path.dirname(os.path.abspath(__file__***REMOVED******REMOVED***
    parent_dir = os.path.dirname(script_dir***REMOVED***
    service = Service(executable_path=os.path.join(parent_dir, "chromedriver"***REMOVED******REMOVED***

    driver = webdriver.Chrome(service=service, options=chrome_options***REMOVED***

    # 使用 selenium-stealth 隐藏自动化特征
    stealth(
        driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
    ***REMOVED***

    return driver


def get_webpage_content(url, driver***REMOVED***:
    """
    获取单个网页的内容。
    :param url: 目标网页的URL。
    :param driver: WebDriver实例。
    :return: 网页的纯文本内容或None。
    """
    try:
        driver.get(url***REMOVED***
        WebDriverWait(driver, 10***REMOVED***  # 等待页面加载

        page_source = driver.page_source
        soup = BeautifulSoup(page_source, "lxml"***REMOVED***
        body = soup.find("body"***REMOVED***

        if body:
            return body.get_text(separator="\n", strip=True***REMOVED***
        else:
            logging.error(f"Body not found in the HTML of {url***REMOVED***."***REMOVED***
            return None
    except Exception as e:
        logging.error(f"Error fetching webpage {url***REMOVED***: {e***REMOVED***"***REMOVED***
        return None


async def get_search_results_links(query, num_links=1***REMOVED***:
    """
    根据查询获取指定数量的搜索结果链接，忽略前两个。
    :param query: 搜索关键词。
    :param num_links: 需要获取的结果链接数量，默认为2（此参数现在表示除了前两个之外还需要几个链接）。
    :return: 从第三个开始的搜索结果链接列表。
    """
    driver = setup_chrome_driver(***REMOVED***
    links = []

    try:
        driver.get("https://www.bing.com/?mkt=zh-CN"***REMOVED***
        search_box = driver.find_element(By.NAME, "q"***REMOVED***
        search_box.send_keys(query***REMOVED***
        search_box.submit(***REMOVED***

        wait = WebDriverWait(driver, 10***REMOVED***
        search_results = wait.until(EC.presence_of_all_elements_located((By.XPATH, '//li[@class="b_algo"]/h2/a'***REMOVED******REMOVED******REMOVED***

        # 忽略前两个链接，收集剩余的链接
        for i in range(2, min(2 + num_links, len(search_results***REMOVED******REMOVED******REMOVED***:
            link = search_results[i].get_attribute("href"***REMOVED***
            links.append(link***REMOVED***

        if links:
            logging.info(f"""获取的网址信息{links***REMOVED***"""***REMOVED***
            return aggregate_webpage_contents(links***REMOVED***
    finally:
        driver.quit(***REMOVED***


def aggregate_webpage_contents(links***REMOVED***:
    """
    聚合多个网页的内容。
    :param links: 网页链接列表。
    :return: 所有网页内容的汇总字符串。
    """
    driver = setup_chrome_driver(***REMOVED***
    aggregated_content = ""

    for link in links:
        content = get_webpage_content(link, driver***REMOVED***
        if content:
            aggregated_content += f"\n{'-' * 80***REMOVED***\n{content***REMOVED***"

    driver.quit(***REMOVED***
    return aggregated_content


async def get_bing_first_href(keyword***REMOVED***:
    """
    获取搜索引擎 <div class="b_attribution"> 标签下的第一个 <cite> 标签中的内容   不稳定
    :param keyword:
    :return:
    """
    try:
        # 构建搜索URL
        url = f"https://www.bing.com/search?q={keyword***REMOVED***&mkt=zh-CN"

        # 设置请求头以模拟浏览器访问
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64***REMOVED*** AppleWebKit/537.36 (KHTML, like Gecko***REMOVED*** Chrome/58.0.3029.110 Safari/537.3"***REMOVED***

        # 发送GET请求
        response = requests.get(url, headers=headers***REMOVED***
        response.raise_for_status(***REMOVED***  # 检查请求是否成功

        # 解析HTML
        soup = BeautifulSoup(response.text, "html.parser"***REMOVED***

        # 查找 <div class="b_attribution"> 标签
        b_attribution_div = soup.find("div", class_="b_attribution"***REMOVED***
        if b_attribution_div:
            # 查找 <div class="b_attribution"> 下的第一个 <cite> 标签
            first_cite = b_attribution_div.find("cite"***REMOVED***
            if first_cite:
                return first_cite.text.strip(***REMOVED***

        return None

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e***REMOVED***"***REMOVED***
        return None
