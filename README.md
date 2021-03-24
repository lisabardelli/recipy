# **Recipy**

### **About Project**

A web application to allow users to filter BBC GoodFood recipes based on single/multiple ingredients and add recipes to favorites.

The user will also be able to listen to music trought Spotify playlists added in the main page of the app.

---
### **Features**

- Access to a large bank of recipes (using WebScraper)
- Display all recipes on one page using infinite scroll
- Filter the recipes based on single/multiple ingredients
- Add Spotify playlist
- *Requires signup/login* - Add recipes to favourites
- *Requires signup/login* - Add all ingredients for a recipe into a shopping cart (using whisk API) - To be implemented

---
### **User Stories**

#### Completed
```
As a user
Because I am obsessed with BBC
I would like to have access to all recipes from BBC Food

As a user
So that I can choose what to eat tonight
I would like to see a list of recipes with titles, images, summary, cook time

As a user
So that the page loads suitably quickly
I would like to be able to scroll infinitely

As a user
So that I can see all the recipe details
I would like to click on a recipe card and see a pop-up of all recipe details (ingredients, instructions etc.)

As a user
So that I can find recipes that use ingredients I have in the cupboard
I want to be able to filter recipes by ingredients

As a user
I can listen to music with my meal
I would like to have a link to a relaxing background music playlist from Spotify
```
#### Future Features
```
As a user
So that I can easily buy the food I need for next week
I would like to add all ingredients from any recipe of my choice to my shopping cart with one click

As a user
To minimise food waste
I do not want the 'add recipe ingredients' button to add ingredients I have already ticked to my shopping cart
```
---
### **Tech Summary**

| Technology    | Use                           |
| ------------- | ----------------------------- |
| Node          | Back-end JavaScript Framework |
| Express       | Web application framework     |
| ReactJS       | Frontend JavaScript Framework |
| Redux         | Managing application state    |
| Puppeteer     | Web Scraping                  |
| Cypress       | Front-end testing             |
| Jasmine       | Back-end testing              |
| MongoDB       | Database                      |
| CSS           | Styling                       |
| Travis        | CI/CD                         |
| Heroku        | Production Environment        |
| ESLint        | Linting                       |

---
## **Getting started:**

Clone this repository

```
git clone https://github.com/lisabardelli/recipy.git
```

Move to the project directory

```
cd recipy
```

Run the package installer

```
npm install
```
---
## **To run tests:**

```
npm test
```
---
## **To run the web app**

In the project directory, run:
```
npm run dev
```
Runs the app in the development mode.

The browser should open the project url in your browser automatically, but if not visit [http://localhost:3000](http://localhost:3000) to view it in the browser.


## **Links to Repositories**

- Recipe Scraper - https://github.com/AJSMonty/scraper
- Recipy - https://github.com/AJSMonty/Recipy


## **Filtering and Infinite Scrolling**
![Filtering and Infinite Scrolling](Filtering_scrolling.png)
## **Login**
![Login](Login.png)
## **Spotify Playlists**
![Spotify Playlists](Spotify.png)
