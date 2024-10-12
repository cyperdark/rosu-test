import fs from 'fs';
import rosu from "current_rosu";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


let total_processed = 0;
export function calculatePP() {
  const file_path = `./1.osu`;


  try {
    const bytes = fs.readFileSync(file_path, 'utf8');
    const beatmap = new rosu.Beatmap(bytes);


    const current = new rosu.Performance({
      mods: 64,
      misses: 10,
    }).calculate(beatmap);

    const fullCombo = new rosu.Performance({
      mods: 64,
    }).calculate(current);


    const result = {
      stars: +current.difficulty.stars.toFixed(2),
      ar: +beatmap.ar.toFixed(2),
      od: +beatmap.od.toFixed(2),
      cs: +beatmap.cs.toFixed(2),
      hp: +beatmap.hp.toFixed(2),
      pp: +current.pp.toFixed(2),
      fc: +fullCombo.pp.toFixed(2),
      max_combo: current.difficulty.maxCombo,
    };

    beatmap.free();
    current.free();
    fullCombo.free();

    total_processed++;
    return result;
  } catch (error) {
    console.log(error);
  };
};


async function main(param) {
  if (param == 'yo') await sleep(5000);


  let index = 0;
  while (true) {
    const result = calculatePP();
    index++;


    if (index % 100 == 0) console.log(total_processed, index, result);
    if (index > 5000) break;
  };


  await sleep(5000);
  main();
};

main('yo');