import './App.css'
import SignUpLoginPage from './pages/SignUp-LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/profilePage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoutes from './components/commonComponents/PrivateRoutes';
import { onSnapshot } from 'firebase/firestore';
import { auth, db, storage } from "./firebase"
import { doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import CreateAPodcast from './pages/createAPodcastPage';
import PodcastsPage from './pages/podcastsPage';
import PodcastDetails from './pages/podcastDetailsPage';
import CreateAnEpisode from './pages/createAnEpisodePage';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsuscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsuscribeSnapShot = onSnapshot(doc(db, "users", user.uid), (userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(
              setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid,
                profilePic: userData.profilePic,
              })
            )
          }
        }, (error) => {
          console.log("Error fetching User Data : ", error)
        })

        return () => {
          unsuscribeSnapShot()
        }
      }


    })

    return () => {
      unsuscribeAuth()
    }
  }, [])
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>

          <Route path='/' element={< SignUpLoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path ="/create-a-podcast" element={<CreateAPodcast/>}/>
            <Route path ="/podcasts" element={<PodcastsPage/>}/>
            <Route path ="/podcast/:id" element={<PodcastDetails/>}/>
            <Route path ="/podcast/:id/create-episode" element={<CreateAnEpisode/>}/>
          </Route>

        </Routes>
      </Router>


    </div>
  );
}

export default App;
