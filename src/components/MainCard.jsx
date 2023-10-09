import { useEffect, useState } from "react";

export const MainCard = ( allData ) => {
    // console.log(allData);
    // console.log(position);
    const [data, setData] = useState()
    const  { player } = allData;
    console.log(player);
    useEffect(() => {
        if(allData[0] === undefined){
          return;
        }
        setData(allData)
      console.log(data);
    }, [])
    
    console.log(allData);
    return (
    <main className="bg-gray-400 dark:bg-gray-800 relative flex flex-col p-4 rounded-lg mt-9 mb-8 shadow-lg text-white text-center w-full max-w-[600px] mx-auto border-2 border-red-700/50 gap-3">
       
        {/* <h1 className="text-5xl font-extrabold dark:text-white">{ JSON.stringify(playerData.player[0].strPlayer)  }</h1> */}

        <h1 className="text-white text-5xl">{name}</h1>
        <h4 className="text-2xl underline underline-offset-3 decoration-2 decoration-blue-600 dark:decoration-blue-300">{allData.strPosition}</h4>
        
        <p className="text-lg">{ status==="Active" ? 'Active ✅' : 'Retired ❌' }</p>
        <p><strong>Nationality:</strong> {allData.strNationality}</p>
        <p><strong>Place and date of birth:</strong> {allData.strBirthLocation}📍 , {allData.dateBorn} 📅</p>
        {
          status === "Active" 
          ? <p>Currently {allData.strPosition==='Manager' ? 'coaching' : 'playing for'} {allData.strTeam} ⚽</p>
          : "Retired soccer"
        }
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-5xl text-white mx-0">{allData.strNumber}</h3>
          <img src={allData.strThumb} className="w-[350px] mx-0" alt="" />
          <h3 className="text-5xl text-white mx-0">{allData.strNumber}</h3>
        </div>
        {/* <button className="bg-red-600 border-0 py-2 px-4 w-fit mx-auto dark:bg-blue-700 dark:hover:bg-blue-600" disabled={playerData.player[0].strFanart1 === null ? true : false} onClick={toggleGalleryModal}>View fanarts images</button> */}
        {/* <Modal  isOpen={galleryModalStatus}>
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

        </Modal> */}
        {/* <p>{description.slice(0,400)} ...</p>         */}
        {/* <button className="bg-red-600 border-0 py-2 px-4 w-fit mx-auto dark:bg-blue-700 dark:hover:bg-blue-600" onClick={toggleTextModal}>Read More</button> */}
        {/* <Modal
          isOpen={textModalStatus}
          className="max-w-[600px] px-10 mx-auto bg-gray-700 flex flex-col items-center justify-center"
          > 
          <button onClick={toggleTextModal}>close</button>
          <p>{playerData.player[0].strDescriptionEN}</p>
        </Modal> */}
      </main>
  )
}
