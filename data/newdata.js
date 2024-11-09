import dotenv from "dotenv";
dotenv.config();

import axios from "axios"

const destinations = [
  {
    name: "Varanasi",
    latitude: 25.3176,
    longitude: 82.9739,
    description: "Varanasi, located in Uttar Pradesh, is one of the oldest cities in the world and a major pilgrimage site for Hindus. It is known for its sacred Ganges River, where devotees perform rituals and seek spiritual purification. The Kashi Vishwanath Temple and the Ganga Aarti are key attractions."
  },
  {
    name: "Rameswaram",
    latitude: 9.2881,
    longitude: 79.3129,
    description: "Rameswaram, located in Tamil Nadu, is one of the holiest sites in Hinduism. It is famous for the Ramanathaswamy Temple, dedicated to Lord Shiva, and is considered one of the Char Dham pilgrimage destinations. The temple is known for its long corridors and sacred water tanks."
  },
  {
    name: "Haridwar",
    latitude: 29.9457,
    longitude: 78.1642,
    description: "Haridwar, located in Uttarakhand, is a major pilgrimage site where the Ganges River emerges from the Himalayas. The city hosts the Kumbh Mela, attracting millions of pilgrims. Key spots include Har Ki Pauri, Chandi Devi Temple, and Mansa Devi Temple."
  },
  {
    name: "Tirupati",
    latitude: 13.6288,
    longitude: 79.4192,
    description: "Tirupati, in Andhra Pradesh, is one of the richest and most visited pilgrimage destinations in India. The Tirumala Venkateswara Temple, dedicated to Lord Venkateswara, is situated on the Tirumala Hills. Devotees come from across the globe to seek blessings and offer prayers."
  },
  {
    name: "Amritsar",
    latitude: 31.6340,
    longitude: 74.8723,
    description: "Amritsar, located in Punjab, is the spiritual center of Sikhism. The Golden Temple (Harmandir Sahib) is the most revered shrine for Sikhs. Known for its stunning architecture and serene atmosphere, the temple complex also houses the holy Sikh scripture, Guru Granth Sahib."
  },
  {
    name: "Vaishno Devi",
    latitude: 33.0290,
    longitude: 74.9490,
    description: "The Vaishno Devi Temple in Jammu and Kashmir is one of the most visited pilgrimage sites in India. Located in the Trikuta Mountains, devotees undertake a trek to the cave temple, where they seek blessings from the goddess Vaishno Devi, believed to fulfill wishes."
  },
  {
    name: "Shirdi",
    latitude: 19.7667,
    longitude: 74.4774,
    description: "Shirdi, located in Maharashtra, is the holy town associated with Sai Baba, a revered saint known for his teachings of love, unity, and compassion. The Shirdi Sai Baba Temple attracts millions of devotees who come to seek blessings and pay homage to the saint."
  },
  {
    name: "Bodh Gaya",
    latitude: 24.6953,
    longitude: 84.9917,
    description: "Bodh Gaya in Bihar is the most important pilgrimage site for Buddhists. It is the place where Gautama Buddha attained enlightenment under the Bodhi Tree. The Mahabodhi Temple, a UNESCO World Heritage Site, is a significant attraction for visitors from around the world."
  },
  {
    name: "Puri",
    latitude: 19.8135,
    longitude: 85.8312,
    description: "Puri, located in Odisha, is famous for the Jagannath Temple, dedicated to Lord Jagannath. It is one of the Char Dham pilgrimage sites. The annual Rath Yatra, where the deities are carried in massive chariots, draws huge crowds of devotees from across the globe."
  },
  {
    name: "Ajmer",
    latitude: 26.4499,
    longitude: 74.6399,
    description: "Ajmer, located in Rajasthan, is home to the Ajmer Sharif Dargah, the shrine of the Sufi saint Moinuddin Chishti. It is a popular pilgrimage site for both Muslims and people of other faiths. The dargah is known for its spiritual ambiance and annual Urs festival."
  },
  {
    name: "Dwarka",
    latitude: 22.2465,
    longitude: 68.9685,
    description: "Dwarka, in Gujarat, is one of the Char Dham pilgrimage sites and is associated with Lord Krishna. The Dwarkadhish Temple, situated on the banks of the Gomti River, is the main attraction, along with the ancient temple architecture and the scenic coastal surroundings."
  },
  {
    name: "Kedarnath",
    latitude: 30.7346,
    longitude: 79.0669,
    description: "Kedarnath, located in Uttarakhand, is one of the most important Shiva temples in India and is part of the Char Dham pilgrimage. The Kedarnath Temple is situated at a high altitude in the Himalayas and is visited by thousands of devotees, despite its challenging trek."
  },
  {
    name: "Somnath",
    latitude: 20.8880,
    longitude: 70.4017,
    description: "Somnath, located in Gujarat, is one of the twelve Jyotirlinga shrines dedicated to Lord Shiva. The Somnath Temple, on the shores of the Arabian Sea, has been rebuilt several times and is known for its grandeur and significance in Hindu mythology."
  },
  {
    name: "Rishikesh",
    latitude: 30.0869,
    longitude: 78.2676,
    description: "Rishikesh, located in Uttarakhand, is known as the 'Yoga Capital of the World' and is a major pilgrimage site on the banks of the Ganges River. The town is also famous for its ashrams, yoga centers, and temples like the Triveni Ghat and Neelkanth Mahadev Temple."
  },
  {
    name: "Mathura",
    latitude: 27.4924,
    longitude: 77.6737,
    description: "Mathura, in Uttar Pradesh, is believed to be the birthplace of Lord Krishna and is one of the most important pilgrimage sites for Hindus. The Krishna Janmabhoomi Temple, dedicated to the deity, and the vibrant celebrations of Janmashtami are key attractions."
  },
  {
    name: "Kashi Vishwanath Temple",
    latitude: 25.3109,
    longitude: 82.9732,
    description: "Located in Varanasi, Uttar Pradesh, Kashi Vishwanath Temple is one of the twelve Jyotirlingas of Lord Shiva. It is a highly revered site for Hindus, and millions of devotees visit the temple annually to offer prayers and perform rituals by the Ganges."
  },
  {
    name: "Sabarimala",
    latitude: 9.4420,
    longitude: 77.0707,
    description: "Sabarimala, located in Kerala, is one of the most visited pilgrimage sites in India, dedicated to Lord Ayyappa. Pilgrims undertake a rigorous journey through the dense forests to reach the hilltop temple, following strict spiritual practices and customs."
  },
  {
    name: "Kanchipuram",
    latitude: 12.8352,
    longitude: 79.7036,
    description: "Kanchipuram, located in Tamil Nadu, is one of the seven sacred cities of Hinduism. It is renowned for its ancient temples, such as the Ekambareswarar and Kailasanathar Temples, and is an important pilgrimage site for devotees of Lord Shiva and Lord Vishnu."
  },
  {
    name: "Hemkund Sahib",
    latitude: 30.6860,
    longitude: 79.6160,
    description: "Hemkund Sahib, in Uttarakhand, is a sacred pilgrimage site for Sikhs. Located at a high altitude in the Himalayas, the gurudwara is situated near a glacial lake. Devotees make a challenging trek to reach the site, which offers spiritual solace amidst stunning natural beauty."
  },
  {
    name: "Palitana",
    latitude: 21.5250,
    longitude: 71.8239,
    description: "Palitana, in Gujarat, is a major pilgrimage site for Jains. The Shatrunjaya Hill is home to over 900 beautifully carved Jain temples, making it one of the most sacred sites for the Jain community. Pilgrims undertake a long climb to visit the temples and seek blessings."
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
  //console.log(latitude,longitude)
 
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





