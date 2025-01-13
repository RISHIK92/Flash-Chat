import { useState } from "react";
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface RoomUser {
    socket: WebSocket;
    username: string;
}

let allsockets: {[roomId:string]: RoomUser[]} = {};

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        //@ts-ignore
        const parsedData = JSON.parse(message);
        const roomId: string = parsedData.payload.roomId;
        const username: string = parsedData.payload.username;

        if (parsedData.type === "join") {
            if (!allsockets[roomId]) {
                allsockets[roomId] = [];
            }
            allsockets[roomId].push({ socket,username })

            const joinMessage = `${username} has joined the room.`;
            allsockets[roomId].forEach((user) => {
              if (user.socket !== socket && user.socket.readyState === WebSocket.OPEN) {
                user.socket.send(
                  JSON.stringify({
                    type: "chat",
                    status: "received",
                    username: "System",
                    message: joinMessage,
                  })
                );
              }
            })
        }

        // if (parsedData.type === "chat") {
        //     allsockets[roomId].forEach((current) => {
        //         if (current.readyState === WebSocket.OPEN) {
        //             current.send(parsedData.payload.message);
        //         }
        //     })
        // }
        if (parsedData.type === "chat") {
            for (let i=0; i<allsockets[roomId].length; i++) {
                if (allsockets[roomId][i].socket.readyState === WebSocket.OPEN) {
                    if (allsockets[roomId][i].socket === socket) {
                        allsockets[roomId][i].socket.send(JSON.stringify({ status: "sent", username: "me", message: parsedData.payload.message}));
                    }
                    else {
                        allsockets[roomId][i].socket.send(JSON.stringify({ status: "recieved", username, message: parsedData.payload.message}));
                    }
                }
            }
        }
    })
})


//             // for (let i=0; i<allsockets[roomId].length; i++) {
//             //     if (allsockets[roomId][i] === socket && allsockets[roomId][i].readyState === WebSocket.OPEN) {
//             //         allsockets[roomId][i].send(parsedData.payload.message);
//             //     }
//             // }
//     // socket.on("disconnect", () => {
//     //     allsockets = allsockets.filter(x => x != socket);
//     // })