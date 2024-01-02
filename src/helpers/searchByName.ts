export const searchByName = async (name: string) => {
   const resp = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`
   );

   
   
   const data = await resp.json();
    const player = await data.player[0]

   return player;
};
