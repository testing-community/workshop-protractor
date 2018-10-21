FROM ruby

RUN apt-get update && \
  gem install travis -v 1.8.9 --no-rdoc --no-ri

WORKDIR /usr/src/app

ENTRYPOINT ["travis"]
