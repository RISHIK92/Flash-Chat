import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { Light } from './icons/Light'
import { Dark } from './icons/Dark'
import { Exit } from './icons/Exit'
import { Copy } from './icons/Copy'

function App() {
  const location = useLocation();
  const roomId = location.state?.roomId as string | undefined;
  const username = location.state?.username as string | undefined;
  const [darkMode, setDarkMode] = useState(true);
  const [m, setM] = useState<{ status: string,username: string, message: string }[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null); 
  const navigate = useNavigate();
  const [randomState, setRandomState] = useState<string>();
  const [copySuccess,setCopySucess] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.username && data.message) {
        setM((prevMessages) => [...prevMessages, { status: data.status, username: data.username, message: data.message}]);
      }
    };

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: roomId,
          username: username
        }
      }));
    };
    return () => {
      ws.close();
    };
  }, [roomId, username]);

  const copyToClipboard = () => {
    setRandomState(roomId);
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
    <div className={`h-screen ${darkMode ? 'bg-black' : 'bg-gray-100'} flex flex-col transition-all duration-300`}>
      <div className="flex justify-between items-center p-4">
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Chat Room</h1>
        <div className={`flex ${darkMode ? "bg-black": "text-white"} w-46 mr-[60rem] p-3 rounded-lg border`}>
          <p className={`${darkMode ? "text-white": "text-black"} mr-2`}>Room Code:</p>
          <div className={`${darkMode ? "text-white": "text-black"}`}>{roomId}</div>
          <div className={`${darkMode? "text-neutral-400": "text-black"} ml-2`} onClick={copyToClipboard}>
            <Copy />
          </div>
        </div>
        <div className="flex items-center">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 ${darkMode? 'bg-black border border-neutral-800 hover:bg-neutral-900': 'bg-white hover:bg-neutral-100'} rounded-md transition-all duration-300`}>{darkMode ? <Dark /> : <Light />}</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 m-2">
        {m.map((message,index) => (
            <div key={index} className={`m-2 ${message.status === "sent" ? "flex justify-end" : "flex justify-start"}`}>
              <div>
                <div className={`${message.status === "sent" ? "flex justify-end" : "flex justify-start"}`}>
                  <p className={`text-xs font-medium ${darkMode ? "text-gray-300": "text-gray-600"} mb-1`}>{message.username}</p>
                </div>
                <div className={`rounded-md pr-3 pl-3 pt-1 pb-1 mb-4 max-w-xs w-fit ${message.status === "sent" ? darkMode ? "bg-white text-black border border-white": "bg-black text-white border border-neutral-800": darkMode ? "bg-black text-white border border-neutral-800": "bg-white text-black border border-white"} shadow-lg transition-all duration-300`}>
                  <p className="text-lg">{message.message}</p>
                </div>
              </div>
          </div>
        ))}
      </div>

      <div className={`w-full ${darkMode ? "bg-black" : "bg-gray-100"} flex justify-center items-center p-4`}>
        <div className={`w-full sm:w-2/4 ${darkMode ? "bg-black" : "bg-gray-100"} border ${darkMode ? "border-neutral-600" : "border-neutral-300"} p-4 rounded-lg shadow-lg flex items-center space-x-4`}>
          <input
            ref={inputRef}
            className={`flex-1 ${darkMode ? "bg-black text-white placeholder-neutral-400" : "bg-gray-100 text-black placeholder-neutral-600"} rounded-lg p-3 outline-none border ${darkMode ? "border-neutral-600" : "border-neutral-300"} focus:ring-1 focus:ring-white`}
            type="text"
            placeholder="Type a message..."
          />
          <button
            className={`font-semibold px-4 py-2 rounded-lg ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
            onClick={() => {
              if (inputRef.current && wsRef.current) {
              const mg = inputRef.current?.value;
              wsRef.current?.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    roomId: roomId,
                    message: mg,
                    username: username,
                  },
                })
              );
              inputRef.current.value = ''; 
            }
            }}
          >
            Send
          </button>
      </div>
      </div>
      <div className="fixed bottom-2 right-2">
      <button className={`p-2 rounded-full ${darkMode ? 'text-white' : 'text-black'} transition-all duration-300`} onClick={() => {
        if (wsRef.current) {
          wsRef.current.close();
        }
        navigate("/room")
      }}>
        <Exit />
      </button>
    </div>
    {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-black border border-gray-300 text-white pr-12 pl-4 pt-4 pb-4 rounded-lg">
          <p className="text-xs">Room Code copied to clipboard!</p>
        </div>
    )}
    </div>
  )
}


export default App