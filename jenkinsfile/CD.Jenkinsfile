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

        stage('Deploy') {
            steps {
                sh '''
                docker compose down
                docker rm -f frontend_site || true
                docker compose build
                docker-compose up -d --force-recreate 
                '''
            }
        }

    }
}