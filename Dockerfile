FROM node:14-alpine

RUN apk update \
    && apk add tor supervisor

COPY torrc /etc/tor/torrc
RUN chown -R tor /etc/tor

COPY supervisor.conf /etc/supervisor.conf

WORKDIR /home/tor

COPY package*.json ./
RUN npm install
COPY . .

RUN chown -R tor /home/tor
USER tor
RUN mkdir -p /home/tor/hidden_service \
    && chmod -R 700 /home/tor/hidden_service

ENTRYPOINT ["supervisord"]

CMD ["-c", "/etc/supervisor.conf"]
