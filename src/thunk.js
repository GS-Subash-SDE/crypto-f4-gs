export default async function getCoinDetails(dispatch, getState) {
  try {
    
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    if (!res.ok) {
      throw new Error('Network issue occured!');
    }
    const data = await res.json();
    console.log(data);
    
    dispatch({type:'fetch-data',payload:data});
  } catch (err) {
    console.log(err.message);
  }
}