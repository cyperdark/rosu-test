import fs from 'fs';
import tosu_rosu from "tosu_rosu";
import pre_fix_rosu from "pre_fix_rosu";
import current_rosu from "current_rosu";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


const cached = new Map();
let total_processed = 0;
let beatmap;
export function calculatePP(rosu, mapID) {
  const file_path = `./${mapID}.osu`;
  try {
    if (beatmap) {
      beatmap.free();
    };


    const bytes = cached.has(file_path) ? cached.get(file_path) : fs.readFileSync(file_path, 'utf8');
    if (!cached.has(file_path)) cached.set(file_path, bytes);
    beatmap = new rosu.Beatmap(bytes);


    const attributes = new rosu.BeatmapAttributesBuilder({
      map: beatmap,
      mods: 64,
      mode: 0
    }).build();

    const fcPerformance = new rosu.Performance({
      mods: 64
    }).calculate(beatmap);

    const ppAcc = {};
    for (const acc of [100, 99, 98, 97, 96, 95]) {
      const calculate = new rosu.Performance({
        mods: 64,
        accuracy: acc
      }).calculate(fcPerformance);
      ppAcc[acc] = calculate.pp;

      calculate.free();
    }


    attributes.free();
    fcPerformance.free();

    total_processed++;
    return ppAcc;
  } catch (error) {
    console.log(error);
  };
};


async function main(param) {
  if (param == 'yo') await sleep(1000);


  let index = 0;
  while (true) {
    const mapID = getRandomInt(1, 3);
    const result = calculatePP(tosu_rosu, mapID);
    index++;

    if (index % 100 == 0) console.log(total_processed, index, result);
    if (index > 5000) break;
  };


  await sleep(5000);
  main();
};

main('yo');