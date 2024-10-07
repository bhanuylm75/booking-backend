import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.apiKey
const places = [
  "Goa",
  "Manali",
  "Leh",
  "Araku Valley",
  "Jammu and Kashmir",
  "Udupi",
  "Coorg",
  "Ooty",
  "Kodaikanal",
  "Alleppey",
  "Kasol",
  "Shimla",
  "Nainital",
  "Mussoorie",
  "Chikmagalur",
  "Shillong"
];

const locationsData = {
  "Goa": { description: "Famous for its pristine beaches, vibrant nightlife, Portuguese heritage, and laid-back atmosphere.", latitude: 15.2993, longitude: 74.1240, state: "Goa" },
  "Manali": { description: "A beautiful hill station surrounded by snow-capped mountains, forests, and adventure activities.", latitude: 32.2396, longitude: 77.1887, state: "Himachal Pradesh" },
  "Leh": { description: "A high-altitude desert offering stunning views of the Himalayas, monasteries, and pristine lakes.", latitude: 34.1526, longitude: 77.5770, state: "Ladakh" },
  "Araku Valley": { description: "A beautiful valley in the Eastern Ghats, known for its coffee plantations, tribal culture, and scenic landscapes.", latitude: 18.3333, longitude: 82.8667, state: "Andhra Pradesh" },
  "Jammu and Kashmir": { description: "Known for its breathtaking landscapes, including valleys, lakes, and snow-capped mountains.", latitude: 33.7782, longitude: 76.5764, state: "Jammu and Kashmir" },
  "Udupi": { description: "Famous for its temples, beaches, and the Udupi cuisine.", latitude: 13.3400, longitude: 74.7880, state: "Karnataka" },
  "Coorg": { description: "A picturesque hill station known for its coffee plantations, misty hills, and waterfalls.", latitude: 12.3375, longitude: 75.8069, state: "Karnataka" },
  "Ooty": { description: "Popular for its rolling hills, tea plantations, and the Nilgiri Mountain Railway.", latitude: 11.4064, longitude: 76.6932, state: "Tamil Nadu" },
  "Kodaikanal": { description: "Known for its scenic beauty, including waterfalls, lakes, and pleasant climate.", latitude: 10.2381, longitude: 77.4890, state: "Tamil Nadu" },
  "Alleppey": { description: "Famous for its backwaters, houseboats, and serene landscapes.", latitude: 9.4981, longitude: 76.3384, state: "Kerala" },
  "Kasol": { description: "A picturesque village in Himachal Pradesh, known for its scenic beauty and trekking opportunities.", latitude: 32.0103, longitude: 77.2458, state: "Himachal Pradesh" },
  "Shimla": { description: "A popular hill station with colonial architecture, pleasant weather, and panoramic views.", latitude: 31.1048, longitude: 77.1734, state: "Himachal Pradesh" },
  "Nainital": { description: "Known for its beautiful lake, pleasant weather, and charming hill station atmosphere.", latitude: 29.3919, longitude: 79.4549, state: "Uttarakhand" },
  "Mussoorie": { description: "A hill station known for its pleasant weather, scenic views, and colonial architecture.", latitude: 30.4598, longitude: 78.3844, state: "Uttarakhand" },
  "Chikmagalur": { description: "Known for its coffee plantations, lush green hills, and pleasant climate.", latitude: 13.3188, longitude: 75.7804, state: "Karnataka" },
  "Shillong": { description: "The Scotland of the East, offering beautiful landscapes, waterfalls, and colonial architecture.", latitude: 25.5788, longitude: 91.8933, state: "Meghalaya" }
};

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
export async function fetchAllPlacePhotos() {
  const placesData = [];

  for (const place of places) {
    const photos = await getPlacePhotos(place);
    if (photos.length > 0) {
      placesData.push({
        name: place,
        description: locationsData[place]?.description || "No description available.",
        images: photos,
        latitude: locationsData[place]?.latitude || null,
        longitude: locationsData[place]?.longitude || null,
        state: locationsData[place]?.state || "Unknown"
      });
    }
  }

  //console.log(placesData);
  return placesData;
}



