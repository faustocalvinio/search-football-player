import { useRef, useState } from "react"
import ImageGallery from "react-image-gallery";
import Modal from 'react-modal';

import "react-image-gallery/styles/css/image-gallery.css";

import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { testPlayerData } from './mocks/player';

Modal.setAppElement('#root');

function App() {
  const [textModalStatus, setTextModalStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [galleryModalStatus, setGalleryModalStatus] = useState(false);
  const [playerData, setPlayerData] = useState(testPlayerData);

  const inputValue = useRef();

  const toggleTextModal = ()=>{
    setTextModalStatus(!textModalStatus);  
  };

  const toggleGalleryModal=()=>{
    setGalleryModalStatus(!galleryModalStatus);
  };

  const onSearchSubmit = (e)=>{
    setIsLoading(true)
    e.preventDefault()
    console.log("submit")
    try {
      fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue.current.value}`)
      .then(res => res.json())
      .then(data => {
        setPlayerData(data)
        setIsLoading(false)
      });      
    } catch (error) {
      console.log(error);
    }    
    inputValue.current.value='';
  };
  
 
  
  return (
    <>   
      <div className="flex flex-col max-w-[1300px] mx-auto py-10">
          <div className="flex flex-row justify-between w-[600px] mx-auto max-md:w-[90%]">
            <h1 className="text-black text-3xl text-center dark:text-sky-50 ">Football Player/Manager Data</h1>
            <ThemeSwitcher />
          </div>
        <form onSubmit={onSearchSubmit} className="flex gap-2 w-[600px] mx-auto py-2 max-md:w-[90%]">
          <input ref={inputValue} type="text" placeholder="Search player" className="py-2 px-4 rounded-lg bg-sky-200 border-2 w-[80%]  border-sky-950 dark:placeholder:text-sky-50 placeholder:text-sky-900 dark:text-sky-50 dark:bg-sky-950 dark:border-sky-600" />
          <button type="submit" className="bg-sky-400 text-[#000] dark:text-sky-50 p-2 rounded-lg w-[20%] dark:bg-sky-900 dark:hover:bg-sky-800"  >Search</button>
        </form>
        {
          playerData.player===null || playerData.player[0].strSport !== 'Soccer'  
          ? (<main className="bg-sky-200 border-sky-950 dark:bg-sky-900 relative  flex-col p-4 rounded-lg mt-2 mb-8 shadow-lg text-sky-900 text-center w-full max-w-[600px] min-h-[70vh] flex justify-center items-center mx-auto border-2 dark:border-sky-600 gap-3 max-md:w-[90%] dark:text-sky-50"><h1 className="text-5xl font-extrabold dark:text-sky-50">No results found 😞</h1></main> )
          : 
          <main className="bg-sky-200 border-sky-950 dark:bg-sky-900 relative flex flex-col p-4 rounded-lg mt-2 mb-8 shadow-lg text-sky-900 text-center w-full max-w-[600px] mx-auto border-2 dark:border-sky-600 gap-3 max-md:w-[90%] dark:text-sky-50">

          {isLoading ? <h1 className="text-white">Loading</h1> : <h2 className="text-white">Loaded</h2>}

          <h1 className="text-5xl font-extrabold dark:text-white">{JSON.stringify(playerData.player[0].strPlayer)}</h1>
          <h2 className="text-2xl underline underline-offset-3 decoration-2 decoration-blue-600 dark:decoration-blue-300">{playerData.player[0].strPosition}</h2>          
          <p className="text-lg">{ playerData.player[0].strStatus==="Active" ? 'Active ✅' : 'Retired ❌' }</p>
          <p><strong>Nationality:</strong> {playerData.player[0].strNationality}</p>
          <p><strong>Place and date of birth:</strong> {playerData.player[0].strBirthLocation}📍 , {playerData.player[0].dateBorn} 📅</p>
          {
            playerData.player[0].strStatus === "Active" 
            ? <p>Currently {playerData.player[0].strPosition==='Manager' ? 'coaching' : 'playing for'} {playerData.player[0].strTeam} ⚽</p>
            : "Retired soccer"
          }
          <div className="flex flex-row items-center justify-around">
            <h3 className="text-5xl text-sky-900 mx-0 max-[570px]:hidden dark:text-sky-50">{playerData.player[0].strNumber}</h3>
            <img src={playerData.player[0].strThumb} className="w-[350px] mx-0 max-[570px]:w-full" alt="" />
            <h3 className="text-5xl text-sky-900 mx-0 max-[570px]:hidden dark:text-sky-50">{playerData.player[0].strNumber}</h3>
          </div>
          <button className={`${playerData.player[0].strFanart1 === null ? 'hidden' : 'bg-sky-600 text-sky-50 rounded-lg border-0 py-2 px-4 w-fit mx-auto dark:bg-sky-700 dark:hover:bg-blue-600'}`} onClick={toggleGalleryModal}>View fanarts images
          </button>
            <Modal  isOpen={galleryModalStatus} className="max-w-[80vw] mx-auto max-lg:max-w-[90%] dark:bg-sky-900 h-full">
              <button  onClick={toggleGalleryModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
              <ImageGallery 
              autoPlay
              showIndex
               useBrowserFullscreen
               className="max-w-[600px] mx-auto"
              items={[{
                  original: playerData.player[0].strFanart1,
                  thumbnail: playerData.player[0].strFanart1,
                  },{
                  original: playerData.player[0].strFanart2,
                  thumbnail: playerData.player[0].strFanart2,
                  },{
                  original: playerData.player[0].strFanart3,
                  thumbnail: playerData.player[0].strFanart3,
                  },{
                  original: playerData.player[0].strFanart4,
                  thumbnail: playerData.player[0].strFanart4,
                  },]}
              />
            </Modal>
          <p>{ playerData.player[0].strDescriptionEN===null ? 'no descripption'  : playerData.player[0].strDescriptionEN.slice(0,400)} ...</p>        
          <button className="bg-sky-600 border-0 text-sky-50 rounded-lg py-2 px-4 w-fit mx-auto dark:bg-sky-700 dark:hover:bg-sky-600" onClick={toggleTextModal}>
            Read More
          </button>
            <Modal
              isOpen={textModalStatus}
              className="max-w-[600px] px-10 mx-auto bg-sky-50  flex flex-col items-center justify-center"
              
              > 
              <button onClick={toggleTextModal}>Close</button>
              <p>{playerData.player[0].strDescriptionEN}</p>
            </Modal>
        </main>     
        }        
        <footer className=""> 
        <p className="text-center dark:text-sky-50">Made with React and  <a href="https://www.thesportsdb.com/" target="_blank" rel="noreferrer" className="font-medium text-sky-600 underline dark:text-sky-500 hover:no-underline">TheSportsDB</a>. Source code of this project <a href="https://github.com/faustocalvinio/search-football-player" target="_blank" rel="noreferrer"  className="font-medium text-sky-600 underline dark:text-sky-500 hover:no-underline">here</a>.</p> 
        </footer>        
      </div>
    </>
  )
}
export default App
