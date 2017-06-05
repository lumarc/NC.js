# NC.js


### Setting up a development environment

  1. Download and build STEPNode

  ```
  > git clone https://github.com/steptools/STEPNode.git
  > cd STEPNode
  > npm install
  ```

  ------------------------------------------------------------------------------
  2. Clone NC.js into the same directory that contains the STEPNode
      directory, E.G.:

  ```
  > cd ..
  > git clone https://github.com/steptools/STEPNode.git
  > ls
  STEPNode      NC.js
  ```

  ------------------------------------------------------------------------------
  3. Setting up which model to use

  In config.js put the path of the .stpnc file you want to use in the file object
  under the dir key
 
  ```
  "file" : {"dir": "path_to_.stpnc_file"} 
  ```
 ------------------------------------------------------------------------------
  4. Install Glyphicons

  ```
  > cd src/client
  > cp ~Downloads/fonts ./fonts
  ```

  ------------------------------------------------------------------------------
  5. Install nodejs packages

  ```
  > npm install
  ```
 ------------------------------------------------------------------------------
  6. Making a server

  Making a server will build and then start the server

  ```
  > npm run make
  ```

  or, to minimize the file sizes

  ```
  > npm run make-release
  ```
  ------------------------------------------------------------------------------
  7. Start a server

  If a server doesn't need to be rebuilt, this will be faster than making everytime. 

  ```
  > npm start
  ```

  or to use a specific model and overload the config.js
  
   ```
  > npm start -- -f "path_to_.stpnc_file"
  ```
  ------------------------------------------------------------------------------
  8. Open Client
  
  With the server running, point a web browser to
  
  ```
  http://localhost:8080/
  ```
