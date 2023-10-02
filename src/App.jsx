import { useState } from "react"
import { testPlayerData } from './mocks/player';
import messiMockImage from './mocks/messi-thumb.jpg';


function App() {

    const [playerData, setPlayerData] = useState(testPlayerData)

  const onSearchSubmit = (e)=>{
    e.preventDefault()
    console.log("submit")
  
  }

    const textShort=  playerData.player[0].strDescriptionEN.slice(0,1000)
    return (
      <div className="flex flex-col max-w-[1300px] mx-auto">
        <h1 className="text-red-700 text-5xl text-center">Player Data</h1>
        
        <form onSubmit={onSearchSubmit} className="flex gap-2 mx-auto py-7">
        <input type="text" placeholder="Search player" className="p-2 rounded-lg border-2" />
        <button type="submit" className="bg-red-700 text-white p-2 rounded-lg">search</button>
        </form>
        <main className="bg-gray-500 flex flex-col p-4 rounded-lg mt-4 mb-8 shadow-lg text-white text-center w-full max-w-[800px] mx-auto border-2 border-red-700/50">
          <p>strNationaality str team str team 2 str number str player</p>
          <h2>{ JSON.stringify(playerData.player[0].strPlayer)  }</h2>
          <h4>{playerData.player[0].strPosition}</h4>
          <h4 className="text-5xl">{playerData.player[0].strNumber}</h4>
          <p>status: { playerData.player[0].strStatus }</p>
          <p>Nationality: {playerData.player[0].strNationality}</p>
          <p>Place and date of birth: {playerData.player[0].strBirthLocation} , {playerData.player[0].dateBorn}</p>
          {
            playerData.player[0].strStatus === "Active" 
            ? <p>Currently Playing for {playerData.player[0].strTeam}</p>
            : "Retired soccer"
          }
          <img src={messiMockImage} className="w-[350px] mx-auto" alt="" />
          {/* <p>{playerData.player[0].strDescriptionEN}</p> */}
          <p>{textShort}</p>
        </main>

      </div>
    )
}

export default App
