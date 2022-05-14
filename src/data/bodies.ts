import { ColorRepresentation } from "three/src/utils";

export type BodyType = {
  displayName: string; // name
  textureSrc: string; // texture URL
  isLight?: boolean; // is a light source
  color: ColorRepresentation; // hexadecimal
  orbitColor: ColorRepresentation; // hexadecimal
  diameter: number; // km
  rotationPeriod: number; // hours
  axialTilt: number; // degrees
  distanceFromSun: number; // 10^6 km
  orbitalPeriod: number; // days
  orbitalInclination: number; // degrees
  albedo: number; // shininess of a body
};

const normalizeBodyData = (bodies: BodyType[]) => {
  return bodies.map((body) => ({
    ...body,
    axialTilt: (body.axialTilt * Math.PI) / 180,
    rotationPeriod: 24 / body.rotationPeriod,
    orbitalPeriod: 1 / body.orbitalPeriod,
    orbitalInclination: (body.orbitalInclination * Math.PI) / 180,
    albedo: body.albedo * 100,
  }));
};

/**
 * data: https://nssdc.gsfc.nasa.gov/planetary/factsheet/
 * albedo data: https://en.wikipedia.org/wiki/Albedo
 * textures: https://www.solarsystemscope.com/textures/
 */
export const bodies: BodyType[] = normalizeBodyData([
  {
    displayName: "Sun",
    textureSrc: "/src/assets/2k_sun.jpeg",
    isLight: true,
    color: 0xfdfbd3,
    orbitColor: 0xfdfbd3,
    diameter: 1392700,
    rotationPeriod: 587.3,
    axialTilt: 0,
    distanceFromSun: 0,
    orbitalPeriod: 1,
    orbitalInclination: 0,
    albedo: 1,
  },
  {
    displayName: "Mercury",
    textureSrc: "/src/assets/2k_mercury.jpeg",
    color: 0x1a1a1a,
    orbitColor: 0xf58536,
    diameter: 4879,
    rotationPeriod: 1407.6,
    axialTilt: 0.034,
    distanceFromSun: 57.9,
    orbitalPeriod: 88.0,
    orbitalInclination: 7.0,
    albedo: 0.142,
  },
  {
    displayName: "Venus",
    textureSrc: "/src/assets/2k_venus_atmosphere.jpeg",
    color: 0xe6e6e6,
    orbitColor: 0xc35fed,
    diameter: 12104,
    rotationPeriod: -5832.5,
    axialTilt: 177.4,
    distanceFromSun: 108.2,
    orbitalPeriod: 224.7,
    orbitalInclination: 3.4,
    albedo: 0.689,
  },
  {
    displayName: "Earth",
    textureSrc: "/src/assets/2k_earth.jpeg",
    color: 0x2f6a69,
    orbitColor: 0x1fd137,
    diameter: 12756,
    rotationPeriod: 23.9,
    axialTilt: 23.4,
    distanceFromSun: 149.6,
    orbitalPeriod: 365.2,
    orbitalInclination: 0.0,
    albedo: 0.434,
  },
  {
    displayName: "Mars",
    textureSrc: "/src/assets/2k_mars.jpeg",
    color: 0x993d00,
    orbitColor: 0xe84f25,
    diameter: 6792,
    rotationPeriod: 24.6,
    axialTilt: 25.2,
    distanceFromSun: 228.0,
    orbitalPeriod: 687.0,
    orbitalInclination: 1.8,
    albedo: 0.17,
  },
  {
    displayName: "Jupiter",
    textureSrc: "/src/assets/2k_jupiter.jpeg",
    color: 0xb07f35,
    orbitColor: 0xedab47,
    diameter: 142984,
    rotationPeriod: 9.9,
    axialTilt: 3.1,
    distanceFromSun: 778.5,
    orbitalPeriod: 4331,
    orbitalInclination: 1.3,
    albedo: 0.538,
  },
  {
    displayName: "Saturn",
    textureSrc: "/src/assets/2k_saturn.jpeg",
    color: 0xb08f36,
    orbitColor: 0xedd05a,
    diameter: 120536,
    rotationPeriod: 10.7,
    axialTilt: 26.7,
    distanceFromSun: 1432.0,
    orbitalPeriod: 10747,
    orbitalInclination: 2.5,
    albedo: 0.499,
  },
  {
    displayName: "Uranus",
    textureSrc: "/src/assets/2k_uranus.jpeg",
    color: 0x5580aa,
    orbitColor: 0x9ddcf5,
    diameter: 51118,
    rotationPeriod: -17.2,
    axialTilt: 97.8,
    distanceFromSun: 2867.0,
    orbitalPeriod: 30589,
    orbitalInclination: 0.8,
    albedo: 0.488,
  },
  {
    displayName: "Neptune",
    textureSrc: "/src/assets/2k_neptune.jpeg",
    color: 0x366896,
    orbitColor: 0x3179de,
    diameter: 49528,
    rotationPeriod: 16.1,
    axialTilt: 28.3,
    distanceFromSun: 4515.0,
    orbitalPeriod: 59800,
    orbitalInclination: 1.8,
    albedo: 0.442,
  },
  {
    displayName: "Pluto",
    textureSrc: "/src/assets/2k_ceres_fictional.jpeg",
    color: 0xdad7ce,
    orbitColor: 0xa19181,
    diameter: 2376,
    rotationPeriod: -153.3,
    axialTilt: 122.5,
    distanceFromSun: 5906.4,
    orbitalPeriod: 90560,
    orbitalInclination: 17.2,
    albedo: 0.52,
  },
]);
