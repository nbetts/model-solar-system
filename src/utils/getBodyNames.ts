import { AstronomicalBodyProps } from "src/data/astronomicalBodyData";

const getBodyName = (bodyNames: string[], body: AstronomicalBodyProps) => {
  bodyNames.push(body.name);

  body.satellites.forEach((satellite) => {
    getBodyName(bodyNames, satellite);
  });
};

const getBodyNames = (body: AstronomicalBodyProps) => {
  const bodyNames: string[] = [];
  getBodyName(bodyNames, body);
  return bodyNames;
};

export default getBodyNames;
