import { useEffect, useRef, useState } from "react"
import { testPlayerData } from './mocks/player';
import messiMockImage from './mocks/messi-thumb.jpg';
import Modal from 'react-modal';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { MainCard } from "./components/MainCard";
import { data } from "autoprefixer";
const images2=[
  {original:'./mocks/fanart-1.png',thumbnail:'./mocks/fanart-1.png'},
  {original:'./mocks/fanart-2.png',thumbnail:'./mocks/fanart-2.png'},
  {original:'./mocks/fanart-3.png',thumbnail:'./mocks/fanart-3.png'},
  {original:'./mocks/fanart-4.png',thumbnail:'./mocks/fanart-4.png'},
  {original:'./mocks/fanart-5.png',thumbnail:'./mocks/fanart-5.png'},
  
]
const images23 = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
Modal.setAppElement('#root');

function App() {
  const [textModalStatus, setTextModalStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const [images, setImages] = useState(images23)
  const [galleryModalStatus, setGalleryModalStatus] = useState(false)
  const inputValue = useRef();
  const toggleTextModal = ()=>{
    setTextModalStatus(!textModalStatus)
  
  }

  const toggleGalleryModal=()=>{
    setGalleryModalStatus(!galleryModalStatus)
  }
  const [playerData, setPlayerData] = useState(testPlayerData)

  // console.log(playerData.player[0].strFanart1);

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
      })
      // .then(()=>setIsLoading(false))
      
      console.log(playerData);

    } catch (error) {
      console.log(error);
    }
    
    inputValue.current.value='';
  }

  useEffect(() => {
    
  }, [playerData])
  
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading])
  

  // const textShort = playerData.player !== null || playerData.player[0].strSport === 'Soccer' ?  playerData.player[0].strDescriptionEN.slice(0,400) : ''
  return (
    <>
    {/* <ThemeSwitcher /> */}
    <div className="flex flex-col max-w-[1300px] mx-auto py-10">
      <div className="flex flex-row justify-between w-[600px] mx-auto max-md:w-[90%]">
        <h1 className="text-red-700 text-3xl text-center dark:text-white ">Football Player/Manager Data</h1>
        <ThemeSwitcher />
      </div>
      <form onSubmit={onSearchSubmit} className="flex gap-2 w-[600px] mx-auto py-2 max-md:w-[90%]">
      <input ref={inputValue} type="text" placeholder="Search player" className="py-2 px-4 rounded-lg border-2 w-[80%] dark:bg-gray-200 dark:text-black dark:placeholder:text-black" />
      <button type="submit" className="bg-blue-700 text-white p-2 rounded-lg w-[20%] dark:bg-blue-900 dark:hover:bg-blue-800"  >Search</button>
      </form>
      {
        playerData.player===null || playerData.player[0].strSport !== 'Soccer'  
        ? <h1 className="text-5xl font-extrabold dark:text-white">No results found</h1> 
        : 
       

          
          <main className="bg-gray-400 dark:bg-gray-800 relative flex flex-col p-4 rounded-lg mt-2 mb-8 shadow-lg text-white text-center w-full max-w-[600px] mx-auto border-2 border-red-700/50 gap-3 max-md:w-[90%]">
       {isLoading ? <h1 className="text-white">Loading</h1> : <h2 className="text-white">Loaded</h2>}
        <h1 className="text-5xl font-extrabold dark:text-white">{ JSON.stringify(playerData.player[0].strPlayer)  }</h1>

        
        <h4 className="text-2xl underline underline-offset-3 decoration-2 decoration-blue-600 dark:decoration-blue-300">{playerData.player[0].strPosition}</h4>
        
        <p className="text-lg">{ playerData.player[0].strStatus==="Active" ? 'Active ✅' : 'Retired ❌' }</p>
        <p><strong>Nationality:</strong> {playerData.player[0].strNationality}</p>
        <p><strong>Place and date of birth:</strong> {playerData.player[0].strBirthLocation}📍 , {playerData.player[0].dateBorn} 📅</p>
        {
          playerData.player[0].strStatus === "Active" 
          ? <p>Currently {playerData.player[0].strPosition==='Manager' ? 'coaching' : 'playing for'} {playerData.player[0].strTeam} ⚽</p>
          : "Retired soccer"
        }
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-5xl text-white mx-0 max-[570px]:hidden">{playerData.player[0].strNumber}</h3>
          <img src={playerData.player[0].strThumb} className="w-[350px] mx-0 max-[570px]:w-full" alt="" />
          <h3 className="text-5xl text-white mx-0 max-[570px]:hidden">{playerData.player[0].strNumber}</h3>
        </div>
        <button className={`${playerData.player[0].strFanart1 === null ? 'hidden' : 'bg-red-600 border-0 py-2 px-4 w-fit mx-auto dark:bg-blue-700 dark:hover:bg-blue-600'}`} disabled={playerData.player[0].strFanart1 === null ? true : false} onClick={toggleGalleryModal}>View fanarts images</button>
        <Modal  isOpen={galleryModalStatus}>
          <button  onClick={toggleGalleryModal}>X</button>
          <ImageGallery items={[{
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
        <button className="bg-red-600 border-0 py-2 px-4 w-fit mx-auto dark:bg-blue-700 dark:hover:bg-blue-600" onClick={toggleTextModal}>Read More</button>
        <Modal
          isOpen={textModalStatus}
          className="max-w-[600px] px-10 mx-auto bg-gray-700 flex flex-col items-center justify-center"
          > 
          <button onClick={toggleTextModal}>close</button>
          <p>{playerData.player[0].strDescriptionEN}</p>
        </Modal>
      </main>
      
        
      }
      
      <footer className=""> <p className="text-center dark:text-white">Made with React and  <a href="https://www.thesportsdb.com/" target="_blank" rel="noreferrer" className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">TheSportsDB</a>. Source code of this project <a href="https://github.com/faustocalvinio/search-football-player" target="_blank" rel="noreferrer"  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">here</a>.</p>  </footer>
    </div>
    </>
  )
}

export default App
