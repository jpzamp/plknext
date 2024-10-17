export function redirectToGoogleMaps(
  userLocation: { latitude: number; longitude: number },
  restaurantLocation: { latitude: number; longitude: number },
) {
  const userLat = userLocation?.latitude
  const userLng = userLocation?.longitude
  const restaurantLat = restaurantLocation?.latitude
  const restaurantLng = restaurantLocation?.longitude

  if (restaurantLat && restaurantLng) {
    let url = 'https://www.google.com/maps/dir/?api=1'
    if (userLat && userLng) {
      url += `&origin=${userLat},${userLng}`
    }
    url += `&destination=${restaurantLat},${restaurantLng}`
    window.open(url, '_blank')
  }
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): string {
  const R = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d.toFixed(1).replace('.', ',').concat(' ')
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}
