import { useRef, useState } from "react"
import { testPlayerData } from './mocks/player';
import messiMockImage from './mocks/messi-thumb.jpg';
import Modal from 'react-modal';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ThemeSwitcher } from "./components/themeSwitcher";
const images2=[
  {original:'./mocks/fanart-1.png',thumbnail:'./mocks/fanart-1.png'},
  {original:'./mocks/fanart-2.png',thumbnail:'./mocks/fanart-2.png'},
  {original:'./mocks/fanart-3.png',thumbnail:'./mocks/fanart-3.png'},
  {original:'./mocks/fanart-4.png',thumbnail:'./mocks/fanart-4.png'},
  {original:'./mocks/fanart-5.png',thumbnail:'./mocks/fanart-5.png'},
  
]
const images = [
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
  const [galleryModalStatus, setGalleryModalStatus] = useState(false)
  const inputValue = useRef();
  const toggleTextModal = ()=>{
    setTextModalStatus(!textModalStatus)
  
  }

  const toggleGalleryModal=()=>{
    setGalleryModalStatus(!galleryModalStatus)
  }
  const [playerData, setPlayerData] = useState(testPlayerData)

  

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
  }

  const textShort=  playerData.player[0].strDescriptionEN.slice(0,400)
  return (
    <>
    <ThemeSwitcher />
    <div className="flex flex-col max-w-[1300px] mx-auto">
      <h1 className="text-red-700 text-5xl text-center">Player Data</h1>
      
      <form onSubmit={onSearchSubmit} className="flex gap-2 w-[600px] mx-auto py-7">
      <input ref={inputValue} type="text" placeholder="Search player" className="p-2 rounded-lg border-2 w-[80%]" />
      <button type="submit" className="bg-red-700 text-white p-2 rounded-lg w-[20%]">Search</button>
      </form>
      <main className="relative bg-gray-500 flex flex-col p-4 rounded-lg mt-9 mb-8 shadow-lg text-white text-center w-full max-w-[600px] mx-auto border-2 border-red-700/50">
       
        <h2>{ JSON.stringify(playerData.player[0].strPlayer)  }</h2>
        <h4>{playerData.player[0].strPosition}</h4>
        <h4 className="absolute left-[-40px] top-[-60px] rotate-[-45deg] text-[80px]">{playerData.player[0].strNumber}</h4>
        <h4 className="absolute right-[-40px] top-[-60px] rotate-[45deg] text-[80px]">{playerData.player[0].strNumber}</h4>
        <p className="text-custom">status: { playerData.player[0].strStatus==="Active" ? 'Active ✅' : 'Retired ❌' }</p>
        <p><strong>Nationality:</strong> {playerData.player[0].strNationality}</p>
        <p><strong>Place and date of birth:</strong> {playerData.player[0].strBirthLocation}📍 , {playerData.player[0].dateBorn} 📅</p>
        {
          playerData.player[0].strStatus === "Active" 
          ? <p>Currently Playing for {playerData.player[0].strTeam} ⚽</p>
          : "Retired soccer"
        }
        <img src={playerData.player[0].strThumb} className="w-[350px] mx-auto" alt="" />
        <button className="bg-red-600 border-2 w-fit mx-auto" onClick={toggleGalleryModal}>View more images</button>
        <Modal isOpen={galleryModalStatus}>
          <button  onClick={toggleGalleryModal}>X</button>
          <ImageGallery items={images} />

        </Modal>
        {/* <p>{playerData.player[0].strDescriptionEN}</p> */}
        <p>{textShort}</p>
        <button className="bg-red-600 border-2 w-fit mx-auto" onClick={toggleTextModal}>read more</button>
        <Modal
          isOpen={textModalStatus}
          className="max-w-[1300px] mx-auto bg-red-200 h-screen"
          > 
          <button onClick={toggleTextModal}>close</button>
          <p>{playerData.player[0].strDescriptionEN}</p>
        </Modal>
      </main>

    </div>
    </>
  )
}

export default App
