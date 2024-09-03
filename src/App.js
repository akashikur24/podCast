import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { setUser } from "./Slices/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";
import PrivateRoutes from "./Components/common/PrivateRoutes";
import CreateAProdcast from "./Pages/CreateAProdcast";
import PodcastsPage from "./Pages/Podcasts";
import PodcastDetails from "./Pages/PodcastDetails";
import CreateEpisode from "./Pages/CreateEpisode";
function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    document.body.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    document.body.addEventListener("mousedown", function (e) {
      cursor.style.height = "2rem";
      cursor.style.width = "2rem";
      cursor.style.display = "block";
    });

    document.body.addEventListener("mouseup", function (e) {
      cursor.style.height = "0.5rem";
      cursor.style.width = "0.5rem";
      cursor.style.display = "none";
    });
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          //trigger when ever something changes in the function
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data(); //return all the data as an obj
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);
  return (
    <div className="App">
      <div className="cursor-pointer" ref={cursorRef} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/createaprodcast" element={<CreateAProdcast />}></Route>
          <Route path="/podcasts" element={<PodcastsPage />}></Route>
          <Route path="/podcast/:id" element={<PodcastDetails />}></Route>
          <Route
            path="/podcast/:id/create-episode"
            element={<CreateEpisode />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
