FROM amancevice/pandas:0.23.4-python3

COPY ./app app
WORKDIR /app

EXPOSE 5000

RUN pip install -r requirements.txt

ENTRYPOINT [ "python" ]
CMD [ "main.py" ]