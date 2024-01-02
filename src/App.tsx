import { useEffect, useState } from "react";
import { searchByName } from "./helpers/searchByName";
import { Player } from "./interfaces/data";

const App = () => {
   const [currentPlayer] = useState<string>("Muller");
   const [currentData, setCurrentData] = useState<Player>();

   useEffect(() => {
      searchByName(currentPlayer).then((data) => setCurrentData(data));

      // console.log(currentData);
   }, []);

   return (
      <>
         <h1>{currentPlayer && JSON.stringify(currentData)}</h1>
      </>
   );
};

export default App;
