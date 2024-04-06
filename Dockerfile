FROM python:latest as convert
WORKDIR /usr/src/app
COPY content/ ./
COPY custom/convert-furigana/program/convert-furigana.py ./
COPY custom/convert-usage/program/convert-usage.py ./
ENV PIP_ROOT_USER_ACTION=ignore
RUN python -m pip install --upgrade pip
RUN python -m pip install beautifulsoup4
RUN python convert-furigana.py .
RUN python convert-usage.py .

FROM node:20-slim as builder
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
RUN npm ci

FROM node:20-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .
COPY --from=convert /usr/src/app/ /usr/src/app/content/
CMD ["npx", "quartz", "build", "--serve"]
