docker build . -t rataid/rata-ui-implant:latest \
&& imageId=$(docker images -q rataid/rata-ui-implant) \
&& docker tag ${imageId} 775410964859.dkr.ecr.ap-southeast-1.amazonaws.com/implant-ui:latest \
&& docker login -u AWS -p $(aws ecr get-login-password --region ap-southeast-1) 775410964859.dkr.ecr.ap-southeast-1.amazonaws.com \
&& docker push 775410964859.dkr.ecr.ap-southeast-1.amazonaws.com/implant-ui:latest