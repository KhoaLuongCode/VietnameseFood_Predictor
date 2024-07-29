# Vietnamese Food Predictor

## Overview
Vietnamese Food Predictor is a web application that uses machine learning to suggest Vietnamese dishes based on user preferences. This project is developed with React for the frontend, and FastAPI for the backend. It utilizes Decision Trees to predict food choices and is containerized using Docker. Deployed to Heroku.

## View Demo
Check out the live demo of the application here: [View Demo](https://viet-predict-b1cd9fc22225.herokuapp.com)

## Languages and Technologies
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626.svg?&style=for-the-badge&logo=Jupyter&logoColor=white)

## Getting Started
Follow these steps to set up the project on your local machine.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Python](https://www.python.org/downloads/)

### Clone the Repository
```bash
git clone https://github.com/KhoaLuongCode/Vietnamese_Food_Predictor.git
cd VietnameseFood_Predictor
```

### Build and Run the Docker Container
```bash
docker build -t vietfood-predictor .
docker run -p 8000:8000 vietfood-predictor
```
Docker scripts are included if you want to deploy your application to Heroku.

### Install Dependencies
```bash
npm install
```
### Start the Application
```bash
npm start
```
Have fun building! 


