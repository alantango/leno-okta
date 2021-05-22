FROM tomcat:8.0

#MAINTAINER atang

COPY dist/leno-okta/*.*  /usr/local/tomcat/webapps/leno-okta/
