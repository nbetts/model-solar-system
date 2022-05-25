/**
 * data: https://nssdc.gsfc.nasa.gov/planetary/factsheet/
 * albedo data: https://en.wikipedia.org/wiki/Albedo
 * textures: https://www.solarsystemscope.com/textures/
 */

export type AstronomicalBodyProps = {
  name: string;
  color: number;
  radius: number; // km
  rotationPeriod: number; // hours
  axialTilt: number; // degrees
  albedo: number;
  textureSrc?: string;
  isLight?: boolean;
  ring?: {
    color: number;
    innerRadius: number; // km
    outerRadius: number; // km
    textureSrc?: string;
  };
  orbit: {
    color: number;
    radius: number; // 10^6 km
    rotationPeriod: number; // days
    inclination: number; // degrees
  };
  satellites: AstronomicalBodyProps[];
};

export const sun: AstronomicalBodyProps = {
  name: "Sun",
  color: 0xfdfbd3,
  albedo: 1,
  radius: 1392700,
  rotationPeriod: 587.3,
  axialTilt: 7.25,
  textureSrc: "/assets/2k_sun.jpeg",
  isLight: true,
  orbit: {
    color: 0xfdfbd3,
    radius: 0,
    rotationPeriod: 0,
    inclination: 0,
  },
  satellites: [
    {
      name: "Mercury",
      color: 0x1a1a1a,
      albedo: 0.142,
      radius: 4879,
      rotationPeriod: 1407.6,
      axialTilt: 0.034,
      textureSrc: "/assets/2k_mercury.jpeg",
      orbit: {
        color: 0xa38f84,
        radius: 57.9,
        rotationPeriod: 88.0,
        inclination: 7.0,
      },
      satellites: [],
    },
    {
      name: "Venus",
      color: 0xe6e6e6,
      albedo: 0.689,
      radius: 12104,
      rotationPeriod: -5832.5,
      axialTilt: 177.4,
      textureSrc: "/assets/2k_venus_atmosphere.jpeg",
      orbit: {
        color: 0x9e8959,
        radius: 108.2,
        rotationPeriod: 224.7,
        inclination: 3.4,
      },
      satellites: [],
    },
    {
      name: "Earth",
      color: 0x2f6a69,
      albedo: 0.434,
      radius: 12756,
      rotationPeriod: 23.9,
      axialTilt: 23.4,
      textureSrc: "/assets/2k_earth.jpeg",
      orbit: {
        color: 0x008545,
        radius: 149.6,
        rotationPeriod: 365.2,
        inclination: 0.0,
      },
      satellites: [
        {
          name: "Moon",
          color: 0x888888,
          albedo: 0.14,
          radius: 3475,
          rotationPeriod: 655.7,
          axialTilt: 6.7,
          textureSrc: "/assets/2k_moon.jpeg",
          orbit: {
            color: 0x666666,
            radius: 0.384,
            rotationPeriod: 27.3,
            inclination: 5.1,
          },
          satellites: [],
        },
      ],
    },
    {
      name: "Mars",
      color: 0x993d00,
      albedo: 0.17,
      radius: 6792,
      rotationPeriod: 24.6,
      axialTilt: 25.2,
      textureSrc: "/assets/2k_mars.jpeg",
      orbit: {
        color: 0x9c3100,
        radius: 228.0,
        rotationPeriod: 687.0,
        inclination: 1.8,
      },
      satellites: [],
    },
    {
      name: "Jupiter",
      color: 0xb07f35,
      albedo: 0.538,
      radius: 142984,
      rotationPeriod: 9.9,
      axialTilt: 3.1,
      textureSrc: "/assets/2k_jupiter.jpeg",
      orbit: {
        color: 0xa15f00,
        radius: 778.5,
        rotationPeriod: 4331,
        inclination: 1.3,
      },
      satellites: [],
    },
    {
      name: "Saturn",
      color: 0xb08f36,
      albedo: 0.499,
      radius: 120536,
      rotationPeriod: 10.7,
      axialTilt: 26.7,
      textureSrc: "/assets/2k_saturn.jpeg",
      ring: {
        color: 0xb08f36,
        innerRadius: 60268,
        outerRadius: 139826,
        textureSrc: "/assets/2k_saturn_ring_alpha.png",
      },
      orbit: {
        color: 0xa1840e,
        radius: 1432.0,
        rotationPeriod: 10747,
        inclination: 2.5,
      },
      satellites: [],
    },
    {
      name: "Uranus",
      color: 0x5580aa,
      albedo: 0.488,
      radius: 51118,
      rotationPeriod: -17.2,
      axialTilt: 97.8,
      textureSrc: "/assets/2k_uranus.jpeg",
      orbit: {
        color: 0x51a6a9,
        radius: 2867.0,
        rotationPeriod: 30589,
        inclination: 0.8,
      },
      satellites: [],
    },
    {
      name: "Neptune",
      color: 0x366896,
      albedo: 0.442,
      radius: 49528,
      rotationPeriod: 16.1,
      axialTilt: 28.3,
      textureSrc: "/assets/2k_neptune.jpeg",
      orbit: {
        color: 0x002d92,
        radius: 4515.0,
        rotationPeriod: 59800,
        inclination: 1.8,
      },
      satellites: [],
    },
    {
      name: "Pluto",
      color: 0xdad7ce,
      albedo: 0.52,
      radius: 2376,
      rotationPeriod: -153.3,
      axialTilt: 122.5,
      textureSrc: "/assets/2k_ceres_fictional.jpeg",
      orbit: {
        color: 0x554535,
        radius: 5906.4,
        rotationPeriod: 90560,
        inclination: 17.2,
      },
      satellites: [],
    },
  ],
};

const normalizeBodyData = (body: AstronomicalBodyProps) => {
  body.rotationPeriod = body.rotationPeriod === 0 ? body.rotationPeriod : 24 / body.rotationPeriod;
  body.axialTilt = (body.axialTilt * Math.PI) / 180;
  body.orbit.rotationPeriod =
    body.orbit.rotationPeriod === 0 ? body.orbit.rotationPeriod : 1 / body.orbit.rotationPeriod;
  body.orbit.radius = body.orbit.radius * 1000000;
  body.orbit.inclination = (body.orbit.inclination * Math.PI) / 180;
  body.albedo = body.albedo * 100;
  body.satellites.forEach((satellite) => normalizeBodyData(satellite));
};

normalizeBodyData(sun);
