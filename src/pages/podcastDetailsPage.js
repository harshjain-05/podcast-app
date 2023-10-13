import { useEffect, useState } from "react";
import Header from "../components/commonComponents/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { collapseToast, toast } from "react-toastify";
import Button from "../components/commonComponents/Button";
import { auth } from "../firebase";
import EpiosdeDetail from "../components/commonComponents/Podcasts/EpisodeDetails/EpisodeDetail";
import AudioPlayer from "../components/commonComponents/Podcasts/AudioPlayer";

function PodcastDetails() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  useEffect(() => {
    if (id) {
      getdata();
    }
  }, [id]);

  const getdata = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        toast.error("No Such Podcast Exists");
        navigate("/podcasts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const unsuscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });

        setEpisodes(episodesData);
      },
      (error) => {
        console.log("Error fetching Episodes:", error);
      }
    );
    return () => {
      unsuscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "1rem",
              }}
            >
              <h1 style={{ width: "100%", textAlign: "left" }}>
                {podcast.title}
              </h1>

              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  text="Create Episode"
                  width="250px"
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>

            <div className="podcast-banner-image">
              <img src={podcast.bannerImage} />
            </div>
            <p
              className="podcast-description"
              style={{ borderBottom: " 1px solid white", padding: "1rem" }}
            >
              {podcast.description}
            </p>
            <h1 style={{ width: "100%", textAlign: "left" }}>Epiosdes</h1>

            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => (
                  <EpiosdeDetail
                    key={episode.id}
                    index={index + 1}
                    title={episode.title}
                    description={episode.description}
                    audio={episode.audiofile}
                    onclick={(file) => {
                      setPlayingFile(file);
                    }}
                  />
                ))}
              </>
            ) : (
              <p>No Epiosdes</p>
            )}
          </>
        )}
      </div>

      {playingFile && (
        <AudioPlayer audioFile={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
}

export default PodcastDetails;
