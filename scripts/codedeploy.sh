aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 289850138235.dkr.ecr.ap-northeast-2.amazonaws.com
docker rm -f hwp
docker rmi 289850138235.dkr.ecr.ap-northeast-2.amazonaws.com/hwp:latest
docker pull 289850138235.dkr.ecr.ap-northeast-2.amazonaws.com/hwp:latest
docker run -d --name hwp -p 8080:8080 289850138235.dkr.ecr.ap-northeast-2.amazonaws.com/hwp:latest