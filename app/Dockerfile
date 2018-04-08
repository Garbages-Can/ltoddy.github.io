FROM taoliu/gunicorn3

WORKDIR /app

ADD . /app

RUN pip install sanic \
    && pip install jinja2

EXPOSE 8080

CMD gunicorn app:app --bind 0.0.0.0:8080 --worker-class sanic.worker.GunicornWorker