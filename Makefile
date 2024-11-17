# 导入子模块web的 Makefile
include web/Makefile

# 服务端项目名称
SERVER_PROJECT_NAME = sanic-web

# 服务端 Docker 镜像标签
SERVER_DOCKER_IMAGE = apconw/$(SERVER_PROJECT_NAME***REMOVED***:1.0


# 构建 Vue 3 前端项目镜像
web-build:
	$(MAKE***REMOVED*** -C web docker-build

# 构建服务端镜像(!!根目录.env文件EVN的值修改成test!!***REMOVED***
service-build:
		docker build --no-cache -t $(SERVER_DOCKER_IMAGE***REMOVED*** -f ./docker/Dockerfile .


.PHONY: web-build service-build