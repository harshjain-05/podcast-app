import { useDispatch, useSelector } from "react-redux";
import Header from "../components/commonComponents/Header";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query } from "firebase/firestore";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/commonComponents/Podcasts/PodcastCard/PodcastCard";
import InputComponent from "../components/commonComponents/Input";

function PodcastsPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search,setSearch]=useState("")
  var filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  useEffect(() => {
    const unsuscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.log("Error fetching Podcasts: ", error);
      }
    );

    return () => {
      unsuscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1 style={{marginBottom:"1rem"}}> Discover podcasts</h1>
        <InputComponent type="text" state={search} setState={setSearch} placeholder="Search Podcasts"/>

        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex">
            {filteredPodcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                displayImage={podcast.displayImage}
              />
            ))}
          </div>
        ) : (
          <p>{search?"Podcast not found":"No podcast on the Platform"}</p>
          
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
