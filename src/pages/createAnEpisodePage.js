import Header from "../components/commonComponents/Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../components/commonComponents/Input";
import FileInput from "../components/commonComponents/Input/FileInput";
import Button from "../components/commonComponents/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { addDoc, collection, doc } from "firebase/firestore";

function CreateAnEpisode() {
  const [title, setTilte] = useState("");
  const [description, setDescription] = useState("");
  const [audio, setAudio] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  function audioFileHandle(file) {
    setAudio(file);
  }

  async function handleSubmit() {
    setLoading(true);
    if ((audio, description, title)) {
      try {
        const audioRef = ref(
          storage,
          `/podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audio);

        const audioUrl = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: description,
          audiofile: audioUrl,
        };

        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);

        toast.success("Episode Created Successfully");
        setLoading(false);

        navigate(`/podcast/${id}`);

        setAudio("");
        setTilte("");
        setDescription("");
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    } else {
      toast.error("All the detials must be provided");
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1> Create A Episode</h1>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <InputComponent
            type="text"
            state={title}
            setState={setTilte}
            placeholder="Title"
          />

          <InputComponent
            type="text "
            state={description}
            setState={setDescription}
            placeholder="Decription"
          />

          <FileInput
            accept={"audio/*"}
            id="audio-file-input"
            fileHandleFn={audioFileHandle}
            text="Upload Audio File"
          />

          <Button
            text={loading ? "Loading..." : "Create Epiosde"}
            disabled={loading}
            onClick={handleSubmit}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default CreateAnEpisode;
