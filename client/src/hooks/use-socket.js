import { useState, useEffect } from "react";
import getAPI from "../store/redux/utils/config/getAPI";

import io from "socket.io-client";

const useSocket = (postId) => {
  const [comments, setComments] = useState();

  useEffect(() => {
    const socketIO = io(getAPI.link);
    try {
      socketIO.on(`comments${postId}`, (data) => {
        setComments(data);
      });
    } catch (err) {
      console.error(err);
    }

    return () => {
      socketIO.disconnect();
    };
  }, [postId]);

  return comments;
};

export default useSocket;
