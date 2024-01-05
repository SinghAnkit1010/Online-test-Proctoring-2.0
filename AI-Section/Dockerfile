FROM python:3.10
RUN apt-get update \
    && apt-get install -y libgl1-mesa-glx
WORKDIR /app
COPY requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /app
EXPOSE 9000
CMD ["python", "app.py"]
