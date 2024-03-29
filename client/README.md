# Front End - React

## Instructions:

For front end to work properly navigate to **./src/store/redux/config/getAPI.js**. From this file, change the backend link which is denoted as **API_LINK** to the backend in production.

## show-image-preview

<img src="./readme-images/image-preview-window.png" style="width: 300px">

It allows us to show selected image preview through file type input. Search for **show-image-preview** keyword for it. It is located at **/src/components/NewPostOverlay.js** (I changed the old way of image preview code from normal to redux based checker). The authentic snippet is given down below.

```javascript
const [imageSrc, setImgSrc] = useState("");

const [imagePreviewMessage, setImagePreviewMessage] = useState(
    "Please choose an image!"
);

..................................

const imageChangeHandler = (e) => {
    const file = e.target.files[0];

    const fileExtension = file.name.split(".").pop();
    const validFileExtensions = ["jpg", "jpeg", "png", "gif"];
    const isImageFile = validFileExtensions.includes(fileExtension);

    if (isImageFile) {
      const fileUrl = URL.createObjectURL(file);
      return setImgSrc(fileUrl);
    }
    setImgSrc("");
    setImagePreviewMessage("Not an image file!");
  };

..................................

<div className={classes["image-preview"]}>
    {!imageSrc && <p>{imagePreviewMessage}</p>}
    {imageSrc && <img src={imageSrc} alt="Wrong file type!" />}
</div>

```

## prevent-scrolling-on-modal-open

The overflow and height property restricts a person to stop scrolling when modal window opens. This is now moved inside redux reducer sections (each window toggle reducer).

```javascript
const quitPostWindow = () => {
  dispatch(postFormValidityActions.resetFormValidity());
  setIsPostWindowOpen(false);

  // prevent-scrolling-on-modal-open
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
};

const openPostWindow = () => {
  setIsPostWindowOpen(true);

  // prevent-scrolling-on-modal-open
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
};
```

## close-mobile-window-if-clicked-outside-navbar

```javascript
const clickRef = useRef(null);

.................

const outsideNavbarClickHandler = useCallback((e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      mobileMenuCtx.closeMenuState(); // close menu with Context api or other state management tool
    }
}, [mobileMenuCtx]);

.................

useEffect(() => {
    document.addEventListener("click", outsideNavbarClickHandler);

    return () =>
      document.removeEventListener("click", outsideNavbarClickHandler);
  }, [outsideNavbarClickHandler]);

return (
  <section ref={clickRef}>
    .................
  </section>

```

## sending-file-from-reactjs-to-nodejs-for-upload

Here, we upload file to backend. In the backend (REST API), multer package is used and it is exactly same as using NodeJS backend and EJS front end. Check that project for more info to set up the backend with multer.

For the ReactJS front end, details are written to **PostOverlay.js**, **updateOnePost.js** and **postOnePost.js**. Alternatively search the keyword inside the file.

Entire idea is to construct the form as **new FormData()**.

```javascript
// sending-file-to-backend
// this is a built-in Javascript object
// which is often used to send data to a server via XMLHttpRequest or the Fetch API,
// especially when dealing with file uploads.
const postData = new FormData();

// sending-file-to-backend
postData.append("title", enteredTitle);
// Keep in mind that actual image object is used here.
postData.append("image", actualImageObj);
postData.append("details", enteredDetails);

// sending-file-to-backend
dispatch(createNewPost(postData));
```

```javascript
try {
  const res = await fetch(getAPI.postOnePost, {
    method: "POST",
    // sending-file-from-reactjs-to-nodejs-for-upload
    body: postDetails,

    // Normally like this but here, we upload file to backend.
    // we use a different scenario
    // body: JSON.stringify(postDetails),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status Code: ${res.status}`);
  }

  const data = await res.json();
  dispatch(successHandler(data));
  dispatch(loadingHandler(false));
  return data;
} catch (err) {
  dispatch(failHandler(err.message));
  dispatch(loadingHandler(false));
}
```

## get-link-params-and-queries

In NodeJS, req.params and req.query are used for link parameters and queries. In React, we use useParams and useSearchParams for this type of requests.

For **localhost:3000/:id** or **localhost:3000/65b3987308526049af2c1b9d** link where you need to get the **id** parameter

```javascript
import { useParams } from "react-router-dom";
const params = useParams();

console.log(params.id);
```

For **localhost:3000/?p=2** link where you need to get the **p** parameter

```javascript
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();
console.log(searchParams.get("p"));
```

## **REST API Authentication**:
  Checkout **Authentication-and-Authorization-Frontend** keyword for more info

  - **Login**: First section should be about login. The info is given in **loginOneUser.js**. Here the login data is sent to backend and after that backend provides a token which is saves to local storage area. The info that is provided backend to frontend is as given.

  ```javascript
  // Backend code
  res.json({
    message: "Logged in!",
    token,
    userId: foundUser._id,
    name: foundUser.name,
    status: foundUser.status,
    expiry: new Date().getTime() + 10 * 60 * 60 * 1000,
  });
  ```
    Here, token, name, status and expiry that are sent from backend are stored in localstorage as token, tokenName, tokenStatus and tokenExpiry. They hold info about the encrypted token, username, user status (e.g admin or regular user) and token expiry in new Date().getTime() + (10 * 60 * 60 * 1000) format. These are used to render pages properly.

  - **Update Post Request**: This section is totally dedicated to updating the post request. First part is about having a custom hook called **use-auth.js**. This file is responsible of tracking the **token** (logged in user token), **name** (logged in username) and **status** (admin or user). It also checks if the token is expired and if it did, it auto deletes the token from local storage. This file also sets a timeout function based on the expiry time which refreshes the app so when the expiry time comes, it will auto logout the user from the app.
  
    Second section is about **updateOnePost.js**. In critical requests like this, our app will send our local storage token to backend as **Authorization: `Bearer ${token}`**, which will be double checked by backend and confirmed or rejected accordingly. As we already know in this project, **updateOnePost.js** is controlled by redux thunk to change states.

## **Websockets - Socket.io**:

WebSocket protocol initially leverages HTTP during the handshake process to establish the connection between the client and the server. Unlike traditional HTTP requests, WebSocket connections remain open after the initial handshake, allowing for continuous communication without the overhead of repeatedly establishing new connections. This makes WebSockets particularly suitable for real-time applications such as chat applications, online gaming, and live data streaming.

  <img src="readme-images/websockets.png" alt="websockets" style="width:400px">

Install the following packages to server and client apps respectively.

```bash
# Install to the ReactJS server
npm i socket.io-client
```

There are number of steps to setup this for the frontend.

- **Configuring Client**: Check server.js for **websocket-client-establishment**.
