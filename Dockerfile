FROM tiangolo/uwsgi-nginx:python3.6

MAINTAINER Jonatan Dellagostin <jdellagostin@gmail.com>

# By default, allow unlimited file sizes, modify it to limit the file sizes
# To have a maximum of 1 MB (Nginx's default) change the line to:
# ENV NGINX_MAX_UPLOAD 1m
ENV NGINX_MAX_UPLOAD 0
# Which uWSGI .ini file should be used, to make it customizable
ENV UWSGI_INI /app/uwsgi.ini
# URL under which static (not modified by Python) files will be requested
# They will be served by Nginx directly, without being handled by uWSGI
ENV STATIC_URL /static
# Absolute path in where the static files wil be
ENV STATIC_PATH /app/static
# If STATIC_INDEX is 1, serve / with /static/index.html directly (or the static URL configured)
# ENV STATIC_INDEX 1
ENV STATIC_INDEX 0
ENTRYPOINT ["/entrypoint.sh"]
# Copy the entrypoint that will generate Nginx additional configs
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Add demo app
WORKDIR /app
CMD ["/usr/bin/supervisord"]
RUN mkdir /etc/nginx/ssl
COPY docker/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY docker/nginx.crt docker/nginx.key /etc/nginx/ssl/
COPY docker/uwsgi.ini /app/uwsgi.ini
COPY docker/uwsgi.ini /etc/uwsgi/uwsgi.ini
COPY ./app /app
RUN pip install -r requirements.txt


