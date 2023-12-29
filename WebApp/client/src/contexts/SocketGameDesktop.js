// import io from 'socket.io-client';

// const [socket, setSocket] = useState(null);
// const [gameStarted, setGameStarted] = useState(false);

// useEffect(() => {
//   const s = io(CONNECTION_URL, { transport: ['websocket'] });
//   setSocket(s);
// }, []);

// for mobile vs desktop
// const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// function handleWindowSizeChange() {
//   setIsMobile(window.innerWidth < 768);
// }
// useEffect(() => {
//   window.addEventListener('resize', handleWindowSizeChange);
//   return () => {
//     window.removeEventListener('resize', handleWindowSizeChange);
//   };
// }, []);
