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

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop frontend_site || true
                docker rm frontend_site || true

                docker run -d \
                --name frontend_site \
                -p 80:80 \
                -p 443:443 \
                $DOCKER_IMAGE:latest
                '''
            }
        }

    }
}
