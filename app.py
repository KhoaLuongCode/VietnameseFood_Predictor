import os.path

import uvicorn
from fastapi import FastAPI, HTTPException, Request
import joblib
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from graphviz import Digraph
from fastapi.staticfiles import StaticFiles
from starlette.responses import HTMLResponse
from starlette.templating import Jinja2Templates

app = FastAPI()

model = joblib.load('decision_tree.pkl')
le_ingredients = joblib.load('le_ingredients.pkl')
le_flavor = joblib.load('le_flavor.pkl')
le_dish = joblib.load('le_dish.pkl')
le_meal = joblib.load('le_meal.pkl')
le_spicy = joblib.load('le_spicy.pkl')
le_vegetarian = joblib.load('le_vegetarian.pkl')

g = Digraph(engine='twopi')


class Item(BaseModel):
    MainIngredient: str
    Flavor: str
    DishType: str
    MealTime: str
    Spicy: str
    Vegetarian: str


app.mount("/static", StaticFiles(directory="static"), "static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post('/predict')
def predict(item: Item):
    try:

        item_data = item.dict()


        input_data = pd.DataFrame([item_data])
        input_data['ingredients_n'] = le_ingredients.transform(input_data['MainIngredient'])
        input_data['flavor_n'] = le_flavor.transform(input_data['Flavor'])
        input_data['dish_n'] = le_dish.transform(input_data['DishType'])
        input_data['meal_n'] = le_meal.transform(input_data['MealTime'])
        input_data['spicy_n'] = le_spicy.transform(input_data['Spicy'])
        input_data['vegetarian_n'] = le_vegetarian.transform(input_data['Vegetarian'])

        input_features = input_data[['ingredients_n', 'flavor_n', 'dish_n', 'meal_n', 'spicy_n', 'vegetarian_n']]

        prediction = model.predict(input_features)
        return {"prediction": prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
