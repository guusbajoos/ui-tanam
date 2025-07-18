pipeline {
    agent any
    stages {
        stage("Build Dependecies") {
            environment {
                AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
                API_URL = "$API_URL"
                GA_TRACKING_CODE = "$GA_TRACKING_CODE"
                GTM_CODE = "$GTM_CODE"
                ANALYZE = "$ANALYZE"
                ENVIRONMENT = "$ENVIRONMENT"
                FBC_ACCESS = "$FBC_ACCESS"
                PIXEL_ID = "$PIXEL_ID"
                SITE_URL = "$SITE_URL"
                SENTRY_DSN = "$SENTRY_DSN"
                SENTRY_AUTH_TOKEN = "$SENTRY_AUTH_TOKEN"
                SENTRY_RELEASE = "$SENTRY_RELEASE"
		DOCKER_RATA_VERSION   = "rataid/rata-ui-implant:latest"
		DOCKER_VERSION 	      = "775410964859.dkr.ecr.ap-southeast-1.amazonaws.com/implant-ui"
		def BUILDVERSION = sh(script: "echo `date +%Y%m%d%H%M%S`", returnStdout: true).trim()
		def myvariables = getBinding().getVariables()
		ZIP_VERSION = "${GIT_BRANCH}-"+"$BUILDVERSION"

            }
            steps {
		sh 'echo \"${ZIP_VERSION}\" > tempver'
		sh "sed 's@.*/@@' tempver > tag"
		sh 'export docker_fullversion="$DOCKER_VERSION":`cat tag` && echo $docker_fullversion > temp_version.txt'
		sh 'docker build -f Dockerfile -t $DOCKER_RATA_VERSION --build-arg NEXT_PUBLIC_GA_TRACKING_CODE=$GA_TRACKING_CODE --build-arg NEXT_PUBLIC_GTM_CODE=$GTM_CODE --build-arg ANALYZE=$ANALYZE --build-arg NEXT_PUBLIC_API_URL=$API_URL --build-arg NEXT_PUBLIC_SENTRY_DSN=$SENTRY_DSN --build-arg NEXT_PUBLIC_SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN --build-arg NEXT_PUBLIC_SENTRY_RELEASE=$SENTRY_RELEASE --build-arg NEXT_PUBLIC_ENVIRONMENT=$ENVIRONMENT --build-arg NEXT_PUBLIC_FB_CONVERSION_ACCESS_TOKEN=$FBC_ACCESS --build-arg NEXT_PUBLIC_FB_CONVERSION_ADS_PIXEL_ID=$PIXEL_ID --build-arg NEXT_PUBLIC_SITE_URL=$SITE_URL .'
		sh 'docker tag $DOCKER_RATA_VERSION `cat temp_version.txt`'
		sh './docker-tagging.sh'
                sh 'aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 775410964859.dkr.ecr.ap-southeast-1.amazonaws.com'
		sh 'docker push `cat temp_version.txt`'
            }
        }
        stage("Prepare ElasticBeanStalk") {
            environment {
                AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
		def BUILDVERSION = sh(script: "echo `date +%Y%m%d%H`", returnStdout: true).trim()
		def FINALVERSION = sh(script: "sed 's@.*/@@' tempver", returnStdout: true).trim()
            }
            steps {
		sh 'zip -r $FINALVERSION.zip Dockerrun.aws.json .ebextensions .platform && aws s3 cp $FINALVERSION.zip s3://$aws_s3_bucket &&  rm -rf $FINALVERSION.zip'
		sh 'aws elasticbeanstalk create-application-version --application-name $aws_eb_app_name --version-label $FINALVERSION --source-bundle S3Bucket="$aws_s3_bucket",S3Key="$FINALVERSION.zip"'
		sh 'aws elasticbeanstalk update-environment --application-name $aws_eb_app_name --environment-name $aws_eb_environment --version-label $FINALVERSION'
		sh 'rm -rf tempver'
            }
        }
    }
}