import pymysql
import os

from pymysql import MySQLError

"""
Mysql 初始化脚本工具类
"""

# 配置信息
MYSQL_ROOT_PASSWORD = "1"  # MySQL root 用户的密码
SQL_FILE = "../docker/init_sql.sql"  # SQL 文件路径
HOST = "localhost"  # MySQL 服务器地址
PORT = 13006  # MySQL 服务器端口


def check_sql_file(file_path***REMOVED***:
    """
    检查 SQL 文件是否存在
    :param file_path:
    :return:
    """
    if not os.path.isfile(file_path***REMOVED***:
        raise FileNotFoundError(f"Error: SQL file {file_path***REMOVED*** not found."***REMOVED***


def execute_sql_file(file_path***REMOVED***:
    """
    执行 SQL 文件
    :param file_path:
    :return:
    """
    try:
        # 创建数据库连接
        connection = pymysql.connect(
            host=HOST, user="root", password=MYSQL_ROOT_PASSWORD, port=PORT, charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor
        ***REMOVED***
        with connection.cursor(***REMOVED*** as cursor:
            print(f"Initializing MySQL with {file_path***REMOVED*** on port {PORT***REMOVED***..."***REMOVED***

            # 读取 SQL 文件
            with open(file_path, "r", encoding="utf-8"***REMOVED*** as file:
                sql_script = file.read(***REMOVED***

            # 分割 SQL 命令并执行
            commands = sql_script.split(";"***REMOVED***
            for command in commands:
                if command.strip(***REMOVED***:  # 忽略空命令
                    cursor.execute(command***REMOVED***

            # 提交事务
            connection.commit(***REMOVED***
            print("MySQL initialization completed successfully."***REMOVED***
    except pymysql.MySQLError as e:
        print(f"Error: {e***REMOVED***"***REMOVED***
    finally:
        if connection.open:
            connection.close(***REMOVED***


def execute_user_qa_record_sql(***REMOVED***:
    """
    使用 pymysql 连接数据库并执行 SQL 语句。
    初始化特殊结构json数据
    """

    sql_insert_data = """
    INSERT INTO chat_db.t_user_qa_record
    (id, user_id, chat_id, question, to2_answer, to4_answer, qa_type,create_time***REMOVED***
    VALUES(%s, %s, %s, %s, %s, %s, %s,%s***REMOVED***;
    """

    data_to_insert = [
        (
            296,
            1,
            "69d55765-27b2-4a1d-a8aa-73d26f4986e6",
            "统计案件数量按分局分组 柱状图",
            '{"data": {"messageType": "continue", "content": "从数据可以看出，诈骗案件数量在各分局间分布不均。徐汇分局的诈骗案件最多，共计10宗；而武侯分局最少，仅有1宗。总体来看，浦东分局、朝阳分局和南山分局的诈骗案件数量较多，分别为7宗、4宗及3宗。福田分局、天河分局、海淀分局、白云分局的案件数也相对较多，均在2至4宗之间。锦江分局和武侯分局的诈骗案件较少，各为2宗及1宗。整体而言，徐汇分局是诈骗案件高发区域。详情如下图:"***REMOVED***, "dataType": "t02"***REMOVED***',
            '{"data": {"chart_type": "柱状图", "template_code": "temp03", "data": [["product", "总数"], ["浦东分局", "7"], ["朝阳分局", "4"], ["天河分局", "4"], ["南山分局", "3"], ["武侯分局", "1"], ["锦江分局", "2"], ["徐汇分局", "10"], ["海淀分局", "4"], ["白云分局", "3"], ["福田分局", "2"]], "note": "数据来源: xxx数据库，以上数据仅供参考，具体情况可能会根据xx进一步调查和统计而有所变化"***REMOVED***, "dataType": "t04"***REMOVED***',
            "DATABASE_QA",
            "2024-11-14 06:09:19",
        ***REMOVED***,
        (
            297,
            1,
            "1073303c-7788-47fb-9736-bb2bd0fdf432",
            "诈骗金额最高的前十条数据",
            '{"data": {"messageType": "continue", "content": "诈骗案件共有9起。观察到诈骗类型主要为冒充公检法和投资理财，其中冒充公检法有3起，涉及上海徐汇区；投资理财有4起，涉及北京、成都及上海浦东新区等地。受害人多为经理或工程师职业，年龄在28至38岁之间。涉案资金从1.2万元至2.1万元不等。引流方式均为电话，且多数看过反诈宣传。登记时间集中在2024年6月至12月间。详情如下图:"***REMOVED***, "dataType": "t02"***REMOVED***',
            '{"data": {"chart_type": "表格", "template_code": "temp01", "data":[{"案发地点": "上海市徐汇区龙阳路", "所属分局": "徐汇分局", "来电类别": "电话报警", "报警人姓名": "黄梅", "性别": "女", "年龄": "38", "文化程度": "本科", "受害人职业": "经理", "手机品牌": "华为", "涉案资金": "21000", "是否电诈": "是", "诈骗类型": "冒充公检法", "引流方式": "电话", "引流地址": "8613700004444", "引流联系时间": "2024-06-03 18:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-06-15 18:30:00"***REMOVED***, {"案发地点": "深圳市福田区福华路", "所属分局": "福田分局", "来电类别": "电话报警", "报警人姓名": "黄梅", "性别": "女", "年龄": "38", "文化程度": "本科", "受害人职业": "经理", "手机品牌": "华为", "涉案资金": "21000", "是否电诈": "是", "诈骗类型": "冒充公检法", "引流方式": "电话", "引流地址": "8613700004444", "引流联系时间": "2024-09-01 18:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-09-05 18:30:00"***REMOVED***, {"案发地点": "上海市徐汇区龙阳路", "所属分局": "徐汇分局", "来电类别": "电话报警", "报警人姓名": "黄梅", "性别": "女", "年龄": "38", "文化程度": "本科", "受害人职业": "经理", "手机品牌": "华为", "涉案资金": "21000", "是否电诈": "是", "诈骗类型": "冒充公检法", "引流方式": "电话", "引流地址": "8613700004444", "引流联系时间": "2024-12-03 18:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-12-15 18:30:00"***REMOVED***, {"案发地点": "北京市海淀区学院路", "所属分局": "海淀分局", "来电类别": "电话报警", "报警人姓名": "周涛", "性别": "男", "年龄": "31", "文化程度": "大专", "受害人职业": "工程师", "手机品牌": "VIVO", "涉案资金": "16000", "是否电诈": "是", "诈骗类型": "投资理财", "引流方式": "电话", "引流地址": "8613700002222", "引流联系时间": "2024-07-04 14:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-07-20 14:30:00"***REMOVED***, {"案发地点": "成都市武侯区武侯祠大街", "所属分局": "武侯分局", "来电类别": "电话报警", "报警人姓名": "周涛", "性别": "男", "年龄": "31", "文化程度": "大专", "受害人职业": "工程师", "手机品牌": "VIVO", "涉案资金": "16000", "是否电诈": "是", "诈骗类型": "投资理财", "引流方式": "电话", "引流地址": "8613700002222", "引流联系时间": "2024-04-02 14:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-04-10 14:30:00"***REMOVED***, {"案发地点": "上海市浦东新区花木路", "所属分局": "浦东分局", "来电类别": "电话报警", "报警人姓名": "周杰", "性别": "男", "年龄": "30", "文化程度": "大专", "受害人职业": "工程师", "手机品牌": "VIVO", "涉案资金": "15000", "是否电诈": "是", "诈骗类型": "投资理财", "引流方式": "电话", "引流地址": "8613700002222", "引流联系时间": "2024-02-02 14:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-02-10 14:30:00"***REMOVED***, {"案发地点": "上海市徐汇区漕溪路", "所属分局": "徐汇分局", "来电类别": "电话报警", "报警人姓名": "张明", "性别": "男", "年龄": "36", "文化程度": "硕士", "受害人职业": "产品经理", "手机品牌": "华为", "涉案资金": "13000", "是否电诈": "是", "诈骗类型": "冒充亲友", "引流方式": "电话", "引流地址": "8613700003333", "引流联系时间": "2024-12-01 16:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-12-05 16:30:00"***REMOVED***, {"案发地点": "广州市白云区金沙洲", "所属分局": "白云分局", "来电类别": "电话报警", "报警人姓名": "张明", "性别": "男", "年龄": "36", "文化程度": "硕士", "受害人职业": "产品经理", "手机品牌": "华为", "涉案资金": "13000", "是否电诈": "是", "诈骗类型": "冒充亲友", "引流方式": "电话", "引流地址": "8613700003333", "引流联系时间": "2024-08-02 16:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-08-10 16:30:00"***REMOVED***, {"案发地点": "上海市徐汇区漕溪路", "所属分局": "徐汇分局", "来电类别": "电话报警", "报警人姓名": "张明", "性别": "男", "年龄": "36", "文化程度": "硕士", "受害人职业": "产品经理", "手机品牌": "华为", "涉案资金": "13000", "是否电诈": "是", "诈骗类型": "冒充亲友", "引流方式": "电话", "引流地址": "8613700003333", "引流联系时间": "2024-06-01 16:00:00", "是否看过反诈宣传": "是", "登记时间": "2024-06-05 16:30:00"***REMOVED***, {"案发地点": "广州市天河区珠江新城", "所属分局": "天河分局", "来电类别": "现场报警", "报警人姓名": "李娜", "性别": "女", "年龄": "28", "文化程度": "硕士", "受害人职业": "设计师", "手机品牌": "苹果", "涉案资金": "12000", "是否电诈": "是", "诈骗类型": "冒充公检法", "引流方式": "电话", "引流地址": "8613800138000", "引流联系时间": "2024-02-04 11:00:00", "是否看过反诈宣传": "否", "登记时间": "2024-02-20 11:30:00"***REMOVED***], "note": "数据来源: xxx数据库，以上数据仅供参考，具体情况可能会根据xx进一步调查和统计而有所变化"***REMOVED***, "dataType": "t04"***REMOVED***',
            "DATABASE_QA",
            "2024-11-14 06:12:20",
        ***REMOVED***,
        (
            298,
            1,
            "469f80fd-b25a-46b2-94bf-d45835bfbd5d",
            "统计案件数量按分局分组 饼图",
            '{"data": {"messageType": "continue", "content": "浦东分局的诈骗案件最多，共7宗；徐汇分局次之，有10宗。整体来看，各分局诈骗案件数量差异较大，其中浦东分局、徐汇分局和朝阳分局较为突出，而武侯分局、锦江分局等则较少。从趋势上看，部分区域如浦东新区、徐汇区可能存在较高的诈骗风险，需加强防范与治理。详情如下图:"***REMOVED***, "dataType": "t02"***REMOVED***',
            '{"data": {"chart_type": "饼图", "template_code": "temp02", "data": [{"name": "浦东分局", "value": "7", "percent": false***REMOVED***, {"name": "朝阳分局", "value": "4", "percent": false***REMOVED***, {"name": "天河分局", "value": "4", "percent": false***REMOVED***, {"name": "南山分局", "value": "3", "percent": false***REMOVED***, {"name": "武侯分局", "value": "1", "percent": false***REMOVED***, {"name": "锦江分局", "value": "2", "percent": false***REMOVED***, {"name": "徐汇分局", "value": "10", "percent": false***REMOVED***, {"name": "海淀分局", "value": "4", "percent": false***REMOVED***, {"name": "白云分局", "value": "3", "percent": false***REMOVED***, {"name": "福田分局", "value": "2", "percent": false***REMOVED***], "note": "数据来源: xxx数据库，以上数据仅供参考，具体情况可能会根据xx进一步调查和统计而有所变化"***REMOVED***, "dataType": "t04"***REMOVED***',
            "DATABASE_QA",
            "2024-11-14 06:10:07",
        ***REMOVED***,
        (
            299,
            1,
            "7951b92c-1a59-4d7c-a2ed-bd2b302d7e33",
            "统计案件数量按月分组 折线图",
            '{"data": {"messageType": "continue", "content": "从数据可以看出，诈骗案件数量在2024年1月至6月呈现下降趋势，7月至12月则有所回升。具体来看，1月至6月的案件数量分别为5、4、3、2、1和5起；而7月至12月则保持在4至5起之间，整体波动不大。详情如下图:"***REMOVED***, "dataType": "t02"***REMOVED***',
            '{"data": {"chart_type": "折线图", "template_code": "temp04", "data":[["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"], ["5", "4", "3", "2", "1", "5", "4", "3", "2", "1", "5", "5"]], "note": "数据来源: xxx数据库，以上数据仅供参考，具体情况可能会根据xx进一步调查和统计而有所变化"***REMOVED***, "dataType": "t04"***REMOVED***',
            "DATABASE_QA",
            "2024-11-15 03:24:17",
        ***REMOVED***,
***REMOVED***

    # 创建数据库连接
    connection = pymysql.connect(
        host=HOST, user="root", password=MYSQL_ROOT_PASSWORD, port=PORT, db="chat_db", charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor
    ***REMOVED***

    try:
        with connection.cursor(***REMOVED*** as cursor:
            # 使用 executemany 方法插入多条数据
            cursor.executemany(sql_insert_data, data_to_insert***REMOVED***
        # 提交事务
        connection.commit(***REMOVED***
    except MySQLError as e:
        print(f"Error executing query: {e***REMOVED***"***REMOVED***
        # 如果出现错误，则回滚事务
        if connection.open:
            connection.rollback(***REMOVED***
    finally:
        # 关闭数据库连接
        connection.close(***REMOVED***


if __name__ == "__main__":
    check_sql_file(SQL_FILE***REMOVED***
    execute_sql_file(SQL_FILE***REMOVED***
    execute_user_qa_record_sql(***REMOVED***
