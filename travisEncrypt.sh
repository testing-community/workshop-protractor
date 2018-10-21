docker build -t travis-ci https://goo.gl/vS7ep1

docker run -v $(pwd):/usr/src/app -it travis-ci encrypt var=var --add
