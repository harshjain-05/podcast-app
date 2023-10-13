import Header from "../components/commonComponents/Header"
import CreateAPodacstForm from "../components/startAPodcast/CreateAPodcastForm"

function CreateAPodcast(){


    return(
          <div>
            <Header/>
            <div className="input-wrapper1">
              <h1>Create A Podcast</h1>
              <CreateAPodacstForm/>
            </div>
          </div>
    )

}

export default CreateAPodcast