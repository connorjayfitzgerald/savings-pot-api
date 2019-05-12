node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("connorfitzgerald/savings-pot-api")
    }

    stage('Push') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials') {
            app.push("latest")
        }
    }
}