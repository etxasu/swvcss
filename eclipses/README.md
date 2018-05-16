# eclipse-web
A generalized Eclipse application for ASU

## Local build

- Make a project folder, e.g. **your_project_folder**, or select a location to keep all required repos:

  ```
  git clone https://github.jpl.nasa.gov/VTAD/pioneer-js.git
  git clone https://github.jpl.nasa.gov/VTAD/pioneer-scripts.git
  git clone https://github.jpl.nasa.gov/VTAD/pioneer-assets.git
  git clone https://github.jpl.nasa.gov/VTAD/eclipse-web.git
  ```
  
- NPM install and build

  ```
  cd pioneer-js
  npm install
  npm run build
  cd ../pioneer-scripts
  npm install
  ```
  
  - You will need to redo `npm install` if there is a change in external node modules of `pioneer-js` and/or `pioneer-scripts`
  - You will need to redo `npm run build` if there is a change in `pioneer-js` codes
  
- Website

  - Run server:
  
    ```
    cd your_project_folder
    python -m SimpleHTTPServer
    ```
    
  - Index:
    - The main page of this project
    - http://localhost:8000/eclipse-web/index.html
  
  - Test:
    - The Mocha test page of this project for functionality tests
    - Since `index.js` starts function calls on page load, we're using `test/indexFunctions.js` instead, which is a copy of functions in `index.js` with simple success/value return.
    - http://localhost:8000/eclipse-web/test.html
