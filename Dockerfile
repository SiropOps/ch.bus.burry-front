FROM arm32v7/nginx:1.17.4

LABEL maintainer="SiropOps <Cyril_Boillat@hotmail.com>"

ENV TZ=Europe/Zurich

RUN apt update && apt upgrade -y && \
    apt install -y curl

COPY ./docker/configs/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./dist/burry-front /usr/share/nginx/html

HEALTHCHECK --start-period=5m --interval=30s --timeout=3s --retries=3 CMD curl -v --silent http://localhost:80/actuator/health 2>&1 | grep BurryFront
