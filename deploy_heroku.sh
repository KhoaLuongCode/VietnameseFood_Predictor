set -e

# Run this in shell script
# export APP_NAME=viet-predict
# export HEROKU_API_KEY=5faa771a-0639-4ba7-8443-5a8ee68932d7
# export HEROKU_ID=kml148@case.edu

# Login to Heroku container registry
echo "Logging in to Heroku Container Registry..."
echo "$HEROKU_API_KEY" | docker login -u "$HEROKU_ID" \
--password-stdin registry.heroku.com

# Build containers
echo "Building containers..."
docker build -t registry.heroku.com/$APP_NAME/web .

# Push containers into Heroku container registry
echo "Pushing containers into Heroku Container Registry..."
docker push registry.heroku.com/$APP_NAME/web

# Release containers
echo "Releasing containers..."
heroku container:release web --app $APP_NAME

echo "Deployment completed"