const qs = require('qs');
const fetch = require('react-native-cancelable-fetch');

function getPredictionList(searchQuery, key) {
  const queryString = qs.stringify({
    input: searchQuery,
    language: 'id',
    components: 'country:id',
    key
  });
  const uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${queryString}`;
  return fetch(uri, null, 'prediction').then(response => response.json());
}

function getPlaceDetails(placeId, key) {
  const queryString = qs.stringify({
    placeid: placeId,
    key
  });
  const uri = `https://maps.googleapis.com/maps/api/place/details/json?${queryString}`;

  return fetch(uri, null, 'placeDetail').then(response => response.json());
}

export function getPredictionWithDetail(searchQuery, key) {
  fetch.abort('prediction');
  fetch.abort('placeDetail');
  return getPredictionList(searchQuery, key)
    .then(result => {
      console.log(result);
      const predictions = result.predictions;
      const predictionsPromise = predictions.map(prediction =>
        getPlaceDetails(prediction.place_id, key)
      );
      return Promise.all(predictionsPromise);
    })
    .then(data => {
      const predictionDetails = data.map(predictionItem => ({
        name: predictionItem.result.name,
        formatted_address: predictionItem.result.formatted_address,
        geometry: predictionItem.result.geometry,
        placeId: predictionItem.result.place_id
      }));
      return predictionDetails;
    })
    .catch(err => {
      console.log(err.toString());
      return err;
    });
}

export function buildDirections(startCoordString, finishCoordString, key) {
  const queryString = qs.stringify({
    origin: startCoordString,
    destination: finishCoordString,
    mode: 'driving',
    key
  });
  const uri = `https://maps.googleapis.com/maps/api/directions/json?${queryString}`;
  return fetch(uri, null, 'placeDirections')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coordinates = decode(data.routes[0].overview_polyline.points);
      return coordinates;
    })
    .catch(err => console.log(err));
}

function decode(t, e) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function(t) {
    return { latitude: t[0], longitude: t[1] };
  }));
}
