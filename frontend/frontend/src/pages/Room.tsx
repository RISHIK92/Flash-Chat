import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Random } from "../utils/Random";
import { Copy } from "../icons/Copy";

export function Room() {
    const room = useRef<HTMLInputElement | null>(null);
    const user = useRef<HTMLInputElement | null>(null);
    const wsRef = useRef<WebSocket | null>(null); 
    const [generate,setGenerate] = useState(false);
    const [joined, setJoined] = useState(false);
    const navigate = useNavigate();
    const random = Random(6);
    const [randomState, setRandomState] = useState<string>();
    const [copySuccess,setCopySucess] = useState<boolean>(false);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        wsRef.current = ws;
        return () => {
            ws.close();
          };
        }, []);

    const join = () => {
        const roomId = room.current?.value;
        const username = user.current?.value;
        if (roomId && username) {
            setJoined(true);
        }
    }

    useEffect(() => {
        if (joined) {
          navigate("/app", { state: { roomId: room.current?.value, username: user.current?.value } });
        }
      }, [joined, navigate]);

      const generateString = () => {
        setGenerate(true);
        setRandomState(random);
      }

      const copyToClipboard = () => {
        if (randomState) {
          navigator.clipboard.writeText(randomState).then(() => {
          });
        }
        setCopySucess(true);
        setTimeout(() => {
            setCopySucess(false)
        }, 2000);
      };

      return (
        <div className="h-screen w-screen bg-black flex justify-center items-center">
          <div className="bg-gradient-to-br bg-black text-white rounded-lg shadow-xl p-8 w-96 border border-gray-600">
            <h2 className="text-2xl font-bold text-center mb-6">Flash Chat</h2>
            <div className="flex justify-center mb-4 w-fill">
                <button onClick={generateString} className="bg-white text-black hover:bg-gray-200 font-normal text-lg py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg w-full">Create New Room</button>
            </div>
            {generate && <div className="flex justify-center mb-1 bg-neutral-900 p-4 rounded-md">
                <div>
                    <p className="ml-2 text-xs">Room Code</p>
                    <div className="flex justify-center">
                        <p className="mt-2 text-2xl">{randomState}</p>
                        <div className="mt-3 ml-2 cursor-pointer" onClick={copyToClipboard}>
                            <Copy />
                        </div>
                    </div>
                </div>
                </div>}
            <input ref={user} placeholder="Enter Your Name" className="w-full bg-black mt-2 text-white rounded-lg p-3 mb-4 placeholder-gray-400 border border-gray-600 focus:ring-1 focus:ring-white"/>
            <input ref={room} placeholder="Enter Room Code" className="w-full bg-black text-white rounded-lg p-3 mb-4 placeholder-gray-400 border border-gray-600 focus:ring-1 focus:ring-white"/>
            <div className="flex justify-center">
              <button onClick={join} className="bg-white text-black hover:bg-gray-200 font-normal py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">Join Room</button>
            </div>
          </div>
          {copySuccess && (
                <div className="fixed bottom-4 right-4 bg-black border border-gray-300 text-white pr-12 pl-4 pt-4 pb-4 rounded-lg">
                <p className="text-xs">Room Code copied to clipboard!</p>
                </div>
            )}
        </div>
      );
      
}