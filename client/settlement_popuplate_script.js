var Firebase = require('firebase');
var _        = require('lodash');

var settlements = {
  legacy_village: {
    name: "Legacy Village",
    water: 0,
    food: 0,
    power: 0,
    population: 0,
    members: {},
    assist: 3,
    defense: 1,
    buildings: {
      production: [
        {
          name: "Water Treatment",
          water: 3,
          food: 0,
          beds: 0,
          power: 0,
          requirements: {
            water: 0,
            food: 0,
            power: 0,
            population: 1  
          }         
        },
        {
          name: "Greenhouse",
          water: 0,
          food: 3,
          beds: 0,       
          requirements: {
            water: 1,
            food: 0,
            power: 0,
            population: 1
          }
        }
      ],
      shelter: [
        {
          name: "Apartement",
          water: 0,
          food: 0,
          power: 0,
          beds: 2,
        }
      ],
    },
    addons: {
      walls: [
        {
          name: "Picket Fence",
          defence: 1,
          assist: 0,
          health: 4,
          effect: "none"
        },
      ],
      armaments: [
        {
          name: "Fixed Gun Emplacement",
          defence: 0,
          assist: 3,
          health: 3,
          effect: "none"
        }
      ],
      shops: [
        {
          name: "General Store",
          inventory: {
            usable: [{
              name: "Bandage",
              value: 5,
              key: "health",
              buy_value: 10
            }]
          }
        }
      ]
    },
    people_in_town: {},
    people_count: 0,
    nw_corner: {lat: 41.762973, lon: -111.826359},
    se_corner: {lat: 41.761851, lon: -111.823925},
  }
}

// legacy
// nw_corner: {lat: 41.762973, lon: -111.826359},
// se_corner: {lat: 41.761851, lon: -111.823925},

    // nw_corner: {lat: 40.603214, lon: -112.020049},
    // se_corner: {lat: 40.599043, lon: -112.012839},
var firebaseSettlementsRef = new Firebase("https://settlement.firebaseio.com/settlements/legacy_village");
firebaseSettlementsRef.set(settlements.legacy_village, function(error){
  console.log(error);
  console.log("finished");
});



