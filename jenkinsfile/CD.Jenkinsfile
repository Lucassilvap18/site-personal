pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "lucasdev18/site-personal:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                // Garante que o repositório inteiro está no workspace
                checkout scm
            }
        }

        stage('Pull Image') {
            steps {
                sh 'docker pull $DOCKER_IMAGE || true'
            }
        }

        stage('Check nginx.conf') {
            steps {
                // Confirma que o arquivo existe no workspace
                sh '''
                if [ ! -f "$WORKSPACE/CD/nginx/nginx.conf" ]; then
                  echo "Erro: nginx.conf não encontrado!"
                  exit 1
                fi
                ls -l "$WORKSPACE/CD/nginx/nginx.conf"
                '''
            }
        }

        stage('Prepare SSL') {
            steps {
                // Opcional: garante que certificados estão no workspace se Jenkins não tiver acesso direto
                sh '''
                if [ ! -f "$WORKSPACE/CD/fullchain.pem" ] || [ ! -f "$WORKSPACE/CD/privkey.pem" ]; then
                  echo "Copiando certificados para o workspace..."
                  cp -v /etc/letsencrypt/live/landing.profissionallucassilva.shop/fullchain.pem $WORKSPACE/CD/fullchain.pem
                  cp -v /etc/letsencrypt/live/landing.profissionallucassilva.shop/privkey.pem $WORKSPACE/CD/privkey.pem
                fi
                ls -l $WORKSPACE/CD/*.pem
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # Remove containers antigos
                docker rm -f frontend_site || true
                docker rm -f nginx_proxy || true

                # Build da imagem local (opcional se estiver usando imagem do Docker Hub)
                docker compose build

                # Deploy com docker-compose
                docker-compose up -d --force-recreate
                '''
            }
        }

    }
}