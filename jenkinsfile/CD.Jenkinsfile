pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "lucasdev18/site-personal"
    }

    stages {

        stage('Pull Image') {
            steps {
                sh 'docker pull $DOCKER_IMAGE:latest'
            }
        }

        stage('check nginx.conf') {
            steps {
                sh '''
                ls -l $WORKSPACE/CD/nginx/nginx.conf
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker rm -f frontend_site || true
                docker rm -f nginx_proxy || true
                docker compose build
                docker-compose up -d --force-recreate 
                '''
            }
        }

    }
}