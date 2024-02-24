import { useState, useEffect } from "react";
import getAPI from "../store/redux/utils/config/getAPI";

import io from "socket.io-client";

const useSocket = () => {
  const [comments, setComments] = useState();

  useEffect(() => {
    const socketIO = io(getAPI.link);
    try {
      socketIO.on("message", (data) => {
        console.log(data);
        setComments(data);
      });
    } catch (err) {
      console.error(err);
    }

    return () => {
      socketIO.disconnect();
    };
  }, []);

  return comments;
};

export default useSocket;
