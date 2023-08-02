# Fin' Dining
## Tech Stack
* Front-End: Typescript, React, Sass, Next.js
* Back-End: Python, Django, SQLite
* Icons: Font Awesome

## Prerequisites
* Download Node.js (Recommended Version): https://nodejs.org/en/
* Download Python 9: https://www.python.org/downloads/

## Setup
Follow the below steps and let Jovi know if you have any questions:
1. Clone this repository
2. Open a command prompt and `cd` into the cloned directory
3. Run `pip install django djangorestframework`
4. `cd` into the `frontend` directory
5. Run `npm install` to update dependencies
6. Run `npm run dev`; keep this process running and move onto the next step once you see a `ready` message.
7. Open `localhost:3000` in a browser; you should see "Home" in orange text.
8. `cd` into the `backend` directory
9. Run `python .\manage.py makemigrations`
10. Run `python .\manage.py migrate`
11. Run `python .\manage.py runserver`; keep this process running and move onto the next step once you see the `Quit the server with CTRL-BREAK.` message.
12. Open `localhost:8000/api/hello-world` in a browser; you should see "{"msg": "Hello World (from the backend)!"}"
13. To verify everything is working properly, go to `localhost:3000/hello`; if you see two Hello World messages, setup is complete.

## Workflow
* **Running the Project:** `cd` into the `frontend` directory and run `npm run dev`. `cd` into the `backend` directory and run `python .\manage.py runserver`. Go to `localhost:3000` to see your changes.
* **Static Front-End Development:** Add components (e.g., map icon, popup, etc.) separately in the `components` directory. Follow the `HelloWorld` example. Put your styling in the Sass file and put your HTML in the `return` of your `index.tsx` in the component folder. To see your changes, add the component to a file in the `pages` directory (you can temporarily use the index.tsx file). For example, look how I added `<HelloWorld />` in the `index.tsx` under the `hello` directory (make sure you import HelloWorld at the top).
* **Using an Image:** Add image files under the `public` directory.
* **Using an Icon:** Go to https://fontawesome.com/search?o=r&m=free and look for an icon you like. In your component, import `{FontAwesomeIcon}` from `@fortawesome/react-fontawesome` and `{iconName}` from `@fortawesome/free-solid-svg-icons`. To use the icon, add the following to your HTML: `<FontAwesomeIcon icon={iconName}`. For example, look how I added `<FontAwesomeIcon icon={faGlobeAmericas}` to the HelloWorld component.
* **Back-End Development:** TODO
