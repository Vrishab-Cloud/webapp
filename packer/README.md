1) Authenticate: 
  
        gcloud auth login

2) Create Project and set up to use our current login:

        PROJECT_ID=dev-{RANDOM}
        gcloud projects create $PROJECT_ID --set-as-default

        gcloud auth application-default login

3) Associate the billing for the new project 
   
4) Enable required APIs 
   
        gcloud services enable compute.googleapis.com

5) Create a custom service account and Compute Instance Admin & Service Account User roles
  
        gcloud iam service-accounts create packer \
        --project $PROJECT_ID \
        --description="Packer Service Account" \
        --display-name="Packer Service Account"

        gcloud projects add-iam-policy-binding $PROJECT_ID \
        --member=serviceAccount:packer@$PROJECT_ID.iam.gserviceaccount.com \
        --role=roles/compute.instanceAdmin.v1

        gcloud projects add-iam-policy-binding $PROJECT_ID \
        --member=serviceAccount:packer@$PROJECT_ID.iam.gserviceaccount.com \
        --role=roles/iam.serviceAccountUser

6) Validate and Build

        PROJECT_ID=dev-{RANDOM}
        packer validate -var "project_id=$PROJECT_ID" .
        packer build -var "project_id=$PROJECT_ID" .
