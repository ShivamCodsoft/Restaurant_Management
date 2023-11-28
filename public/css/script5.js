let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 20, lng: 77 },
    zoom: 5,
    // mapTypeId:"satellite"
  });
  new google.maps.Marker({
    position:{lat: 28.7041, lng: 77.1025 },
    map:map,
    // label:"Fusion Bites",
    title:"Fusion Bites",
    animation:google.maps.Animation.Drop

  })

  new google.maps.Marker({
    position:{lat: 19.0760, lng: 72.8777 },
    map:map,
    // label:"Fusion Bites",
    title:"Coastal Cravings",
    animation:google.maps.Animation.Drop
    
  })
  new google.maps.Marker({
    position:{lat:  18.5204, lng:73.8567},
    map:map,
    // label:"Fusion Bites",
    title:"Veggie Vibes Venue",
    animation:google.maps.Animation.Drop
    
  })
  new google.maps.Marker({
    position:{lat: 23.0225, lng: 72.5714 },
    map:map,
    // label:"Fusion Bites",
    title:"VegOut Oasis",
    animation:google.maps.Animation.Drop
    
  })
  new google.maps.Marker({
    position:{lat: 30.7333, lng:  76.7794 },
    map:map,
    // label:"Fusion Bites",
    title:"Homestyle Haven",
    animation:google.maps.Animation.Drop
    
  })
  new google.maps.Marker({
    position:{lat:26.9124, lng: 75.7873 },
    map:map,
    // label:"Fusion Bites",
    title:"Balanced Bites Bistro",
    animation:google.maps.Animation.Drop
    
  })
  new google.maps.Marker({
    position:{lat: 13.0827, lng: 80.2707 },
    map:map,
    // label:"Fusion Bites",
    title:"City Spice Lounge",
    animation:google.maps.Animation.Drop
    
  })
  new google.maps.Marker({
    position:{lat:  12.9716, lng: 77.5946},
    map:map,
    // label:"Fusion Bites",
    title:"Metro Munchery",
    animation:google.maps.Animation.Drop
    
  })
  new google.maps.Marker({
    position:{lat: 22.5726, lng:  88.3639 },
    map:map,
    // label:"Fusion Bites",
    title:"Sea Symphony",
    animation:google.maps.Animation.Drop
    
  })
}

initMap();