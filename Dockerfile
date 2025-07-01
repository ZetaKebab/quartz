FROM python:latest AS convert
WORKDIR /usr/src/app
COPY content/ ./
COPY custom/convert-furigana/program/convert-furigana.py ./
COPY custom/convert-usage/program/convert-usage.py ./
ENV PIP_ROOT_USER_ACTION=ignore
RUN python -m pip install --upgrade pip
RUN python -m pip install beautifulsoup4
RUN python convert-furigana.py .
RUN python convert-usage.py .

FROM node:22-slim AS builder
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
RUN npm ci

FROM node:22-slim AS quartz
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .
COPY --from=convert /usr/src/app/ /usr/src/app/content/
RUN npx quartz build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=quartz /usr/src/app/public/ /usr/share/nginx/html/
WORKDIR /etc/nginx/
COPY custom/nginx/default.conf /etc/nginx/conf.d/