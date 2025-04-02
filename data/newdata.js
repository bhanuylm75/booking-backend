import dotenv from "dotenv";
dotenv.config();

import axios from "axios"







let destinations1 = [
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

let destinations2 = [
  {
    name: "Taj Mahal",
    latitude: 27.1751,
    longitude: 78.0421,
    description: "Located in Agra, Uttar Pradesh, the Taj Mahal is a UNESCO World Heritage site and one of the Seven Wonders of the World, known for its stunning Mughal architecture and white marble beauty."
  },
  {
    name: "Hampi",
    latitude: 15.3350,
    longitude: 76.4600,
    description: "A UNESCO World Heritage site in Karnataka, Hampi is famous for its ancient Vijayanagara Empire ruins, grand temples, and captivating boulder-strewn landscapes."
  },
  {
    name: "Khajuraho",
    latitude: 24.8520,
    longitude: 79.9198,
    description: "Located in Madhya Pradesh, Khajuraho is known for its exquisite temple carvings that depict various aspects of life, love, and spirituality, making it a UNESCO World Heritage site."
  },
  {
    name: "Jaipur",
    latitude: 26.9124,
    longitude: 75.7873,
    description: "The capital of Rajasthan, Jaipur is famous for its grand palaces, historic forts like Amer Fort, and vibrant culture, earning it the title of 'Pink City.'"
  },
  {
    name: "Mahabalipuram",
    latitude: 12.6213,
    longitude: 80.1947,
    description: "A coastal heritage site in Tamil Nadu, Mahabalipuram is known for its rock-cut temples, the Shore Temple, and intricate stone carvings from the Pallava dynasty."
  },
  {
    name: "Ellora Caves",
    latitude: 20.0268,
    longitude: 75.1793,
    description: "Located in Maharashtra, Ellora Caves feature stunning rock-cut monasteries and temples from Hindu, Buddhist, and Jain traditions, dating back over 1,000 years."
  },
  {
    name: "Konark Sun Temple",
    latitude: 19.8876,
    longitude: 86.0945,
    description: "A 13th-century architectural marvel in Odisha, the Konark Sun Temple is shaped like a colossal chariot and dedicated to the Sun God, Surya."
  },
  {
    name: "Rani ki Vav",
    latitude: 23.8584,
    longitude: 72.1010,
    description: "A stepwell in Gujarat, Rani ki Vav is a UNESCO World Heritage site known for its intricate carvings and impressive water conservation system from the Solanki dynasty."
  },
  {
    name: "Sanchi Stupa",
    latitude: 23.4793,
    longitude: 77.7399,
    description: "One of India's oldest Buddhist monuments, the Sanchi Stupa in Madhya Pradesh is known for its beautifully sculpted gateways and serene spiritual ambiance."
  },
  {
    name: "Fatehpur Sikri",
    latitude: 27.0937,
    longitude: 77.6600,
    description: "Built by Emperor Akbar in Uttar Pradesh, Fatehpur Sikri is an abandoned Mughal city featuring grand palaces, mosques, and the stunning Buland Darwaza."
  },
  {
    name: "Rajasthan Hill Forts",
    latitude: 24.8872,
    longitude: 74.6376,
    description: "A collection of six massive forts across Rajasthan, including Chittorgarh, Kumbhalgarh, and Ranthambore, showcasing Rajput military architecture and history."
  },
  {
    name: "Ajanta Caves",
    latitude: 20.5519,
    longitude: 75.7033,
    description: "A UNESCO-listed site in Maharashtra, Ajanta Caves house stunning Buddhist rock-cut cave paintings and sculptures dating back to the 2nd century BCE."
  },
  {
    name: "Thanjavur Brihadeeswarar Temple",
    latitude: 10.7821,
    longitude: 79.1310,
    description: "A masterpiece of Chola architecture in Tamil Nadu, the Brihadeeswarar Temple is dedicated to Lord Shiva and features an imposing gopuram and intricate carvings."
  },
  {
    name: "Jaisalmer Fort",
    latitude: 26.9124,
    longitude: 70.9126,
    description: "Nicknamed the 'Golden Fort,' Jaisalmer Fort in Rajasthan is one of the largest living forts in the world, housing palaces, temples, and vibrant markets."
  }
];

const destinations3 = [
  {
    name: "Goa",
    latitude: 15.2993,
    longitude: 74.1240,
    description: "India’s most famous beach destination, Goa offers pristine beaches, vibrant nightlife, water sports, and a unique blend of Portuguese and Indian culture."
  },
  {
    name: "Radhanagar Beach",
    latitude: 11.9670,
    longitude: 92.9730,
    description: "Located on Havelock Island in the Andaman and Nicobar Islands, Radhanagar Beach is known for its crystal-clear waters, white sand, and breathtaking sunset views."
  },
  {
    name: "Varkala Beach",
    latitude: 8.7356,
    longitude: 76.7032,
    description: "A scenic beach in Kerala, Varkala is famous for its dramatic cliffs, yoga retreats, and natural mineral springs, offering a perfect blend of relaxation and spirituality."
  },
  {
    name: "Marina Beach",
    latitude: 13.0500,
    longitude: 80.2824,
    description: "Stretching along the Bay of Bengal in Chennai, Marina Beach is one of the longest urban beaches in the world, known for its golden sands and vibrant local culture."
  },
  {
    name: "Kovalam Beach",
    latitude: 8.4021,
    longitude: 76.9787,
    description: "One of Kerala’s most popular beach destinations, Kovalam features crescent-shaped shores, Ayurvedic wellness centers, and a stunning lighthouse."
  },
  {
    name: "Gokarna",
    latitude: 14.5500,
    longitude: 74.3160,
    description: "A serene beach town in Karnataka, Gokarna is famous for its untouched beaches like Om Beach and Kudle Beach, as well as its spiritual significance."
  },
  {
    name: "Puri Beach",
    latitude: 19.8006,
    longitude: 85.8269,
    description: "Located in Odisha, Puri Beach is famous for its golden sands, vibrant beach markets, and proximity to the famous Jagannath Temple."
  },
  {
    name: "Tarkarli Beach",
    latitude: 16.0330,
    longitude: 73.4890,
    description: "A hidden gem in Maharashtra, Tarkarli Beach is known for its pristine waters, scuba diving spots, and scenic backwaters."
  },
  {
    name: "Dhanushkodi Beach",
    latitude: 9.0833,
    longitude: 79.4500,
    description: "Located at the southern tip of Rameswaram in Tamil Nadu, Dhanushkodi Beach is known for its surreal landscape, historical ruins, and mythological significance."
  },
  {
    name: "Kaup Beach",
    latitude: 13.2163,
    longitude: 74.7473,
    description: "A picturesque beach in Karnataka, Kaup Beach is known for its historic lighthouse, stunning sunsets, and less crowded shores."
  },
  {
    name: "Mandarmani Beach",
    latitude: 21.6766,
    longitude: 87.6786,
    description: "One of the longest motorable beaches in India, Mandarmani in West Bengal offers a peaceful retreat with beautiful resorts and adventure activities."
  },
  {
    name: "Muzhappilangad Drive-in Beach",
    latitude: 11.7952,
    longitude: 75.4487,
    description: "Located in Kerala, this is India’s longest drive-in beach, allowing visitors to drive along the scenic coastline with breathtaking views."
  },
  {
    name: "Bangaram Island",
    latitude: 10.9391,
    longitude: 72.2833,
    description: "Part of Lakshadweep, Bangaram Island is a tropical paradise with turquoise waters, coral reefs, and stunning lagoons, perfect for a secluded getaway."
  },
  {
    name: "Ramakrishna Beach",
    latitude: 17.7100,
    longitude: 83.3167,
    description: "A popular beach in Visakhapatnam, Andhra Pradesh, Ramakrishna Beach is known for its scenic beauty, nearby museums, and the iconic Submarine Museum."
  }
];


const destinations4 = [
  {
    name: "Spiti Valley",
    latitude: 32.2461,
    longitude: 78.0322,
    description: "This cold desert mountain valley in Himachal Pradesh is famed for its rugged terrain, ancient monasteries, and breathtaking landscapes."
  },
  {
    name: "Tirthan Valley",
    latitude: 31.6116,
    longitude: 77.4514,
    description: "Tirthan Valley in Himachal Pradesh offers a serene escape with crystal-clear rivers, lush greenery, and a gateway to the Great Himalayan National Park."
  },
  {
    name: "Dholavira",
    latitude: 23.887,
    longitude: 70.2184,
    description: "An ancient Indus Valley Civilization site in Gujarat, Dholavira features fascinating ruins and a glimpse into prehistoric urban planning."
  },
  {
    name: "Hampi",
    latitude: 15.335,
    longitude: 76.4625,
    description: "Hampi in Karnataka is a UNESCO World Heritage Site filled with magnificent temples, boulder-strewn landscapes, and rich historical significance."
  },
  {
    name: "Gurez Valley",
    latitude: 34.6223,
    longitude: 74.9084,
    description: "Nestled in the Himalayas of Jammu and Kashmir, Gurez Valley is known for its stunning meadows, traditional wooden houses, and serene environment."
  },
  {
    name: "Khajjiar",
    latitude: 32.5481,
    longitude: 76.0601,
    description: "Known as the 'Mini Switzerland of India,' Khajjiar in Himachal Pradesh boasts lush green meadows, dense forests, and a beautiful lake."
  },
  {
    name: "Ziro Valley",
    latitude: 27.5886,
    longitude: 93.8245,
    description: "Ziro Valley in Arunachal Pradesh is a scenic paradise known for its lush rice fields, traditional Apatani villages, and music festivals."
  },
  {
    name: "Kanatal",
    latitude: 30.3985,
    longitude: 78.3851,
    description: "A hidden gem in Uttarakhand, Kanatal offers fresh mountain air, apple orchards, and adventure activities like camping and trekking."
  },
  {
    name: "Majuli Island",
    latitude: 26.9445,
    longitude: 94.2179,
    description: "Majuli, the world’s largest river island in Assam, captivates with its serene landscapes, vibrant Assamese culture, and historic monasteries."
  },
  {
    name: "Chopta",
    latitude: 30.343,
    longitude: 79.0334,
    description: "Often called the 'Mini Switzerland of Uttarakhand,' Chopta is a quaint hill station with scenic trekking routes and mesmerizing Himalayan views."
  },
  {
    name: "Mandu",
    latitude: 22.3668,
    longitude: 75.4055,
    description: "Known for its medieval charm, Mandu in Madhya Pradesh is an architectural wonder featuring ancient forts, palaces, and stunning views."
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

  for (const place of destinations4) {
    const photos = await getPlacePhotos(place.name);

    if (photos.length > 0) {
      place.images = photos;  // Modify the current object directly
    }
    
  }

  return destinations4

  //console.log(placesData);
  
}





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





