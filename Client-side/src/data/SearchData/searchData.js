import axios from "axios";

export async function fetchSearchData(keyword ,location) {

  // if(!keyword || !location){
  //   throw new Error("No search Term Found, Please search something ")
  // }


  try {
    const response = await axios.get(`http://localhost:5000/api/business/search`, {params:{keyword,location}});
    return response.data;
  } catch (err) {
    const message = err.response.data.message || err.message || `Failed to fetch data`;
    throw new Error(message);
  }
  
}