# REST API Notes:

- Here are some differences in between a coupled front and backend vs REST API.

  <img src="pictures/REST-API.png" alt="test" style="width:400px">

- There are 5 different requests in REST API. These are GET, POST, PUT, PATCH and DELETE requests.

  **GET**: Get a resource from the server. <br/>
  **POST**: Create or append a resource in the server. <br/>
  **PUT**: Create or overwrite a resource in the server. <br/>
  **PATCH**: Update parts of an existing resource in the server. <br/>
  **DELETE**: Delete a resource from the server.

- The commented out part is not needed in index.js when you are working with REST API.

  ```javascript
  // REST API deals with JSON data, don't use it.
  // app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json({ limit: "50mb" }));
  ```

- This section prevents CORS error from another website. Here is a CORS middleware. Check corsMiddleware.js for more info.

  ```javascript
  // CORS Error Prevention
  app.use((req, res, next) => {
    // Allow to communicate from any origin
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Allow to send any request
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    // Allow to set a content type with fetch request
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    next();
  });
  ```

- **ERROR HANDLING IN REST API**: For throwing data in nodejs here are the steps.
  - Create the errorMiddleware.js.
  ```javascript
  const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message: message });
  };

  module.exports = errorMiddleware;
  ```

  - Then hook it up to server.js and to the very end of the file
  ```javascript
  .....................
  app.use("/feed", feedRoutes);

  // Always keep error middleware in the end of the app
  app.use(errorMiddleware);

  const SERVER_PORT = 4000;
  .....................
  ```
  - Then for normal req, res, next functions the error handling typically occurs as follows. Here, next(err) will pick up the thrown error and send it to the middleware error function up top. Check validateInputMiddleware.js for more info.
  ```javascript
  const someFunc = (req, res, next) => {
    try {
      someReturn = someOtherFunc();

      if (!someReturn) {
        // this section can be picked by err.message in errorMiddleware.js
        const returnError = new Error("SomeReturn don't have a value!");

        // this section can be picked by err.statusCode in errorMiddleware.js
        // you can give any extension like statusCode, errorList, etc.
        returnError.statusCode = 501;
        throw returnError;
      }
    } catch (err) {
      next(err);
    }
  }
  ```
  - In case you want to propagate the error from someOtherFunc to someFunc, do this. Check feedController.js' "postPost" function and messageSchema.js' "createMessage" function for more info.
  ```javascript
  someOtherFunc = async () => {
    try {
      const createdPost = await this.save();

      if (!createdPost) {
        // this section can be picked by err.message in errorMiddleware.js
        const creationError = new Error("Database failed to save data!");

        // this section can be picked by err.statusCode in errorMiddleware.js
        creationError.statusCode = 501;
        throw creationError;
      }

      return createdPost;
    } catch (err) {
      // rethrow the error in try section to propagate it to the calling code
      throw err;
    }
  };
  ```

  ```javascript
  const someFunc = (req, res, next) => {
    try {
      someReturn = someOtherFunc();
    } catch (err) {
      // This will pick the error thrown inside the someOtherFunc
      next(err);
    }
  }
  ```
