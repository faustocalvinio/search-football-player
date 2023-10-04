import { useRef, useState } from "react"
import { testPlayerData } from './mocks/player';
import messiMockImage from './mocks/messi-thumb.jpg';
import Modal from 'react-modal';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
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

  console.log(playerData.player[0].strFanart1);

  const onSearchSubmit = (e)=>{
    e.preventDefault()
    console.log("submit")
    try {
      fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue.current.value}`)
      .then(res => res.json())
      .then(data => setPlayerData(data))
      console.log(playerData);

    } catch (error) {
      console.log(error);
    }
    
    inputValue.current.value='';
  }

  // const textShort = playerData.player !== null || playerData.player[0].strSport === 'Soccer' ?  playerData.player[0].strDescriptionEN.slice(0,400) : ''
  return (
    <>
    {/* <ThemeSwitcher /> */}
    <div className="flex flex-col max-w-[1300px] mx-auto">
      <div className="flex flex-row justify-between w-[600px] mx-auto">
        <h1 className="text-red-700 text-5xl text-center">Player Data</h1>
        <ThemeSwitcher />
      </div>
      <form onSubmit={onSearchSubmit} className="flex gap-2 w-[600px] mx-auto py-7">
      <input ref={inputValue} type="text" placeholder="Search player" className="p-2 rounded-lg border-2 w-[80%]" />
      <button type="submit" className="bg-red-700 text-white p-2 rounded-lg w-[20%]">Search</button>
      </form>
      {
        playerData.player===null || playerData.player[0].strSport !== 'Soccer' ? <h1 className="text-5xl font-extrabold dark:text-white">No results found</h1> : (
          <main className="relative bg-gray-500 flex flex-col p-4 rounded-lg mt-9 mb-8 shadow-lg text-white text-center w-full max-w-[600px] mx-auto border-2 border-red-700/50">
       
        <h1 className="text-5xl font-extrabold dark:text-white">{ JSON.stringify(playerData.player[0].strPlayer)  }</h1>

        
        <h4 className="text-2xl underline underline-offset-3 decoration-2 decoration-blue-600 dark:decoration-blue-100">{playerData.player[0].strPosition}</h4>
        {/* <h4 className="absolute left-[-40px] top-[-60px] rotate-[-45deg] text-[80px]">{playerData.player[0].strNumber}</h4> */}
        {/* <h4 className="absolute right-[-40px] top-[-60px] rotate-[45deg] text-[80px]">{playerData.player[0].strNumber}</h4> */}
        <p className="text-lg">{ playerData.player[0].strStatus==="Active" ? 'Active ✅' : 'Retired ❌' }</p>
        <p><strong>Nationality:</strong> {playerData.player[0].strNationality}</p>
        <p><strong>Place and date of birth:</strong> {playerData.player[0].strBirthLocation}📍 , {playerData.player[0].dateBorn} 📅</p>
        {
          playerData.player[0].strStatus === "Active" 
          ? <p>Currently Playing for {playerData.player[0].strTeam} ⚽</p>
          : "Retired soccer"
        }
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-5xl text-orange-300 mx-0">{playerData.player[0].strNumber}</h3>
          <img src={playerData.player[0].strThumb} className="w-[350px] mx-0" alt="" />
          <h3 className="text-5xl text-orange-300 mx-0">{playerData.player[0].strNumber}</h3>
        </div>
        <button className="bg-red-600 border-2 w-fit mx-auto" onClick={toggleGalleryModal}>View more images</button>
        <Modal isOpen={galleryModalStatus}>
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
        <p>{playerData.player[0].strDescriptionEN.slice(0,400)}</p>
        {/* <p>{textShort}</p> */}
        <button className="bg-red-600 border-2 w-fit mx-auto" onClick={toggleTextModal}>read more</button>
        <Modal
          isOpen={textModalStatus}
          className="max-w-[600px] px-10 mx-auto bg-red-200 h-screen"
          > 
          <button onClick={toggleTextModal}>close</button>
          <p>{playerData.player[0].strDescriptionEN}</p>
        </Modal>
      </main>

        )
      }
      
    </div>
    </>
  )
}

export default App
