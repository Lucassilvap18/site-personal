pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "Lucassilvap18/site-personal"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Lucassilvap18/site-personal.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -f dockerfiles/Dockerfile.nginx -t $DOCKER_IMAGE:latest .'
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE:latest'
            }
        }
    }
}
