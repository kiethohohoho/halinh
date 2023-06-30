pipeline {
    agent { label 'h02-102' }
    
    stages {
        stage('build') {
          steps {
            sh 'docker compose build'
            }
          }
        stage('deploy') {
          steps {
            sh 'docker compose up -d'
            }
          }
        }
}
