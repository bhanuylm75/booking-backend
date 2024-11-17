import dotenv from "dotenv";
dotenv.config();

import axios from "axios"



const destinations = [
  {
    name: "Manali",
    latitude: 32.2432,
    longitude: 77.1892,
    description: "Located in Himachal Pradesh, Manali is known for its scenic valleys, adventure sports, and snow-capped peaks. It's a gateway to the Himalayas, perfect for nature and adventure lovers."
  },
  {
    name: "Shimla",
    latitude: 31.1048,
    longitude: 77.1734,
    description: "The capital of Himachal Pradesh, Shimla is famous for its colonial architecture, vibrant Mall Road, and pleasant climate, making it a popular hill station for families and honeymooners."
  },
  {
    name: "Ooty",
    latitude: 11.4064,
    longitude: 76.6932,
    description: "Nestled in the Nilgiris, Ooty in Tamil Nadu is known for its tea gardens, scenic beauty, and the charming Nilgiri Mountain Railway, a UNESCO World Heritage site."
  },
  {
    name: "Nainital",
    latitude: 29.3803,
    longitude: 79.4636,
    description: "Nainital in Uttarakhand is centered around the picturesque Naini Lake, surrounded by lush hills. It’s a popular destination for boating, trekking, and exploring colonial-era buildings."
  },
  {
    name: "Darjeeling",
    latitude: 27.0360,
    longitude: 88.2627,
    description: "Known as the 'Queen of the Hills,' Darjeeling offers spectacular views of Kanchenjunga, beautiful tea gardens, and the famous Himalayan Railway, drawing travelers from around the world."
  },
  {
    name: "Munnar",
    latitude: 10.0889,
    longitude: 77.0595,
    description: "Munnar in Kerala is renowned for its rolling tea plantations, misty landscapes, and Eravikulam National Park, home to the rare Nilgiri Tahr."
  },
  {
    name: "Gulmarg",
    latitude: 34.0482,
    longitude: 74.3804,
    description: "Located in Jammu and Kashmir, Gulmarg is famous for its skiing and snowboarding opportunities, lush meadows, and breathtaking views of the Himalayas."
  },
  {
    name: "Kodaikanal",
    latitude: 10.2381,
    longitude: 77.4892,
    description: "Kodaikanal, known as the 'Princess of Hill Stations,' offers serene lakes, waterfalls, and forests, making it a charming destination in Tamil Nadu’s Western Ghats."
  },
  {
    name: "Mussoorie",
    latitude: 30.4590,
    longitude: 78.0669,
    description: "Known as the 'Queen of the Hills,' Mussoorie in Uttarakhand offers stunning landscapes, a refreshing climate, and popular sites like Kempty Falls and Gun Hill."
  },
  {
    name: "Coorg",
    latitude: 12.3375,
    longitude: 75.8069,
    description: "Coorg in Karnataka, also known as Kodagu, is famous for its coffee plantations, lush landscapes, and serene environment, perfect for a relaxing getaway."
  },
  {
    name: "Mount Abu",
    latitude: 24.5925,
    longitude: 72.7156,
    description: "Rajasthan’s only hill station, Mount Abu is known for its cool climate, scenic Nakki Lake, and the exquisite Dilwara Jain Temples, making it a unique mountain retreat."
  },
  {
    name: "Panchgani",
    latitude: 17.9245,
    longitude: 73.7928,
    description: "Panchgani in Maharashtra is famous for its scenic viewpoints, strawberry farms, and pleasant weather, offering a tranquil escape in the Western Ghats."
  },
  {
    name: "Tawang",
    latitude: 27.5860,
    longitude: 91.8751,
    description: "Located in Arunachal Pradesh, Tawang is known for its breathtaking mountains, the revered Tawang Monastery, and its unique blend of Tibetan and Monpa culture."
  }
];





const apiKey = process.env.apikey


async function getPlacePhotos(placeName) {
  try {
    // Step 1: Search for the place to get Place ID
    const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&key=${apiKey}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    if (placeSearchData.status !== 'OK' || placeSearchData.candidates.length === 0) {
      console.error(`Place not found for: ${placeName}`);
      return [];
    }

    const placeId = placeSearchData.candidates[0].place_id;

    // Step 2: Get place details to get photo references
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
    const placeDetailsResponse = await fetch(placeDetailsUrl);
    const placeDetailsData = await placeDetailsResponse.json();

    if (placeDetailsData.status !== 'OK' || !placeDetailsData.result.photos) {
      console.error(`Photos not available for: ${placeName}`);
      return [];
    }

    // Step 3: Construct photo URLs
    const photoUrls = placeDetailsData.result.photos.map(photo => {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`;
    });
    //console.log(photoUrls)

    return photoUrls;
  } catch (error) {
    console.error(`Error fetching photos for: ${placeName}`, error);
    return [];
  }
}

// Fetch photos for all places and build data objects
export async function fetchalleleven() {
  //const placesData = [];

  for (const place of destinations) {
    const photos = await getPlacePhotos(place.name);

    if (photos.length > 0) {
      place.images = photos;  // Modify the current object directly
    }
    
  }

  return destinations

  //console.log(placesData);
  
}


export const fetchNearbystays = async (lat, lng,typee,radiuss,keywordd) => {
  console.log(lat,lng)
 
  const radius = radiuss||50000;
  const type = typee||"lodging";
  //const keyword = keywordd||""
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;
  
  try{
    const {data}= await axios.get(url)
    console.log(data)
    return data?.results;
    //console.log(data?.results)

  }
  catch(err){
    console.log(err)

  }

  
};



export const getPlaceDetails = async (placeId) => {
 
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const details = response?.data?.result;
    return details
  } catch (error) {
    console.error('Error fetching place details:', error);
  }
};





