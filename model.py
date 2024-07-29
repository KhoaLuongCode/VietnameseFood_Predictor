#!/usr/bin/env python
# coding: utf-8

# In[28]:

import os
import joblib
import pandas as pd
from matplotlib import pyplot as plt
from sklearn import tree
from sklearn.preprocessing import LabelEncoder

print(os.getcwd())

df = pd.read_csv("viet-food-final.csv")
df.head()

# In[30]:

df.dropna(inplace=True)

inputs = df.drop('Class', axis='columns')
target = df['Class']

# In[31]:


target

# In[32]:


# convert rows into numbers 

# In[33]:


le_ingredients = LabelEncoder()
le_flavor = LabelEncoder()
le_dish = LabelEncoder()
le_meal = LabelEncoder()
le_spicy = LabelEncoder()
le_vegetarian = LabelEncoder()

# In[34]:


inputs['ingredients_n'] = le_ingredients.fit_transform(inputs['MainIngredient'])
inputs['flavor_n'] = le_flavor.fit_transform(inputs['Flavor'])
inputs['dish_n'] = le_dish.fit_transform(inputs['DishType'])
inputs['meal_n'] = le_meal.fit_transform(inputs['MealTime'])
inputs['spicy_n'] = le_spicy.fit_transform(inputs['Spicy'])
inputs['vegetarian_n'] = le_vegetarian.fit_transform(inputs['Vegetarian'])
inputs.head()

# In[35]:


inputs_n = inputs.drop(['MainIngredient', 'Flavor', 'DishType', 'MealTime', 'Spicy', 'Vegetarian'], axis='columns')
inputs_n

# In[36]:


# In[37]:


model = tree.DecisionTreeClassifier()

# In[38]:


model.fit(inputs_n, target)

# In[39]:


model.score(inputs_n, target)

# In[40]:
joblib.dump(model, 'decision_tree.pkl')
joblib.dump(le_ingredients, 'le_ingredients.pkl')
joblib.dump(le_flavor, 'le_flavor.pkl')
joblib.dump(le_dish, 'le_dish.pkl')
joblib.dump(le_meal, 'le_meal.pkl')
joblib.dump(le_spicy, 'le_spicy.pkl')
joblib.dump(le_vegetarian, 'le_vegetarian.pkl')

new_sample = pd.DataFrame([[7, 1, 11, 0, 0, 1]], columns=inputs_n.columns)

# Make a prediction with the new sample
prediction = model.predict(new_sample)
print(f"Predicted Class: {prediction[0]}")

model.predict([[7, 1, 11, 0, 0, 1]])
print(f"Training Accuracy: {model.score(inputs_n, target)}")

# In[ ]:

plt.figure(figsize=(30, 20))

tree.plot_tree(model,
               feature_names=inputs_n.columns,
               class_names=target.unique(),
               filled=True,
               rounded=True,
               impurity=False,
               label='none')

plt.title("Vietnamese Food Tree Visualization")
plt.savefig('vietnamese_food_tree.png')
plt.show()
