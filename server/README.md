# REST API Notes:

- I will share an .env file here. It is not important so I will share it but it is needed for this server to work.

```dotenv
MONGODB_URL="mongodb://root:root@localhost:27017/forumApiDB"
JWT_SECRET="7nw`f9-HGNGilVDcI>6:1s{r:-7)4.QR£@A.HN~~z6&~dXsx^n"
```

- Here are some differences in between a coupled front and backend vs REST API.

  <img src="pictures/REST-API.png" alt="rest-api" style="width:400px">

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
  };
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
  };
  ```

- **REST API Authentication**: Keep in mind that REST API is stateless. Meaning that there is no session storing like in a NodeJS, EJS app so every request is treated as a standalone request. Server sends a token and it is stored in front end. This stored token is then attached to every request by React client to backend server.

  The token contains JSON Data + Signature = JWT (JSON Web Token)

  Here, signature can only be verified by the server and it is created by the server.

      <img src="pictures/REST-API-Auth.png" alt="rest-api-auth" style="width:400px">

  To create JWT (Json Web Token) an npm package has to be installed and it is named as **jsonwebtoken**. Install it via

  ```bash
  npm i jsonwebtoken
  ```

  - **Login**: First login system has to be established. To do it, jsonwebtoken system is used. The details are shared in userRoutes.js and userController.js.

    userRoutes.js

    ```javascript
    // Authentication-and-Authorization-Backend
    router.post("/login", validateLoginInput, userController.login);
    ```

    userController.js

    ```javascript
    // Authentication-and-Authorization-Backend
    const login = async (req, res, next) => {

    try {
      ............

      const token = jwt.sign(
        {
          _id: foundUser._id.toString(),
          email: foundUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Logged in!",
        token,
        userId: foundUser._id,
        name: foundUser.name,
        status: foundUser.status,
      });
      } catch (err) {
        next(err);
      }
    }
    ```

    As you can see the token is created and **token**, **userId**, **name** and **status** info are sent to the frontend. Especially **token** will be used in future for authorization purposes such as updating and deleting post requests.

  - **Update Post Request**: There are couple of sections for this purpose. Here, validateAuth.js checks if the user is authenticated, then we have postChangeAuthorization.js middleware which ensures the person who wants to update the post is authorized (either owner of the post or an admin), then file upload middleware comes into help which is represented with fileUploadConfig.single("image"), next we have to ensure that the title and details provided by the frontend is properly validated and sanitized. If it passes all the middleware, finally we can move towards updating the post by connecting to database.

    ```javascript
    router.put(
      "/update/:postId",
      validateAuth,
      postChangeAuthorization,
      fileUploadConfig.single("image"),
      validateMessageInput,
      feedController.updatePost
    );
    ```

- **Websockets - Socket.io**: WebSocket protocol initially leverages HTTP during the handshake process to establish the connection between the client and the server. Unlike traditional HTTP requests, WebSocket connections remain open after the initial handshake, allowing for continuous communication without the overhead of repeatedly establishing new connections. This makes WebSockets particularly suitable for real-time applications such as chat applications, online gaming, and live data streaming.

  <img src="pictures/websockets.png" alt="websockets" style="width:400px">

  Install the following packages to server and client apps respectively.

  ```bash
  # Install to the nodejs server
  npm i socket.io
  ```

  There are number of steps to setup this for the backend.

  - **Configuring Server**: Check server.js for **websocket-server-establishment**. The imported file is called socket.js and it also has the socket configuration in it.
