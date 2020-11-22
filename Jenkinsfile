node {

	properties([
    	buildDiscarder(logRotator(numToKeepStr:'5'))
  	])
	  
    def ID_BUILD = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
	def STACK_NAME = "SM_BURRY_FRONT_PRD_FRONTEND" 
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
        }
        
    stage('Login registry') {
        withCredentials([	   					
                    string(credentialsId: 'registry_admin', variable: 'REGISTRY_ADMIN')
                ]) {
                    sh "docker login registry.siroz.ovh --username registry_admin --password ${REGISTRY_ADMIN}"
        
                }
    }

    stage('Build') {
        docker.image('node:12.7').inside() {
            sh 'node -v'
            sh 'npm install'
            sh 'npm run build --prod'
        }
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
        * docker build on the command line */
        app = docker.build("registry.siroz.ovh/burry-front")
    }

    switch (env.BRANCH_NAME) {
    case "master":
        stage('Tag image PRD') {
                app.push("latest")
        }		
    } 

    switch (env.BRANCH_NAME) {
		case "master":
			stage('Deploy On Docker PRODUCTION [PI] environment') {
				sh """\
					docker stop burry-front || true && \
				 	docker rm burry-front || true && \
				 	docker pull registry.siroz.ovh/burry-front:latest && \
				 	docker run \
					-d \
					--network=reverse_proxy_gateway \
					--restart=always \
					--name burry-front \
					--label-file ./labels \
					registry.siroz.ovh/burry-front:latest
				 	"""
			}
	}
}
