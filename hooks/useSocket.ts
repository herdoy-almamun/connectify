import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

let socket: Socket;

export default function useSocket() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket = io("https://connectify-socket-server.onrender.com");
    socket.on("users", (users: User[]) => {
      setUsers(users);
    });

    // Clean up on component unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // Emit message to the server
  const sendUser = (user: User) => {
    if (socket) socket.emit("user", user);
  };

  return { users, sendUser };
}
