import { Beatmap, Calculator } from "old_rosu";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


let total_processed = 0;
export function calculatePP() {
  const file_path = `./1.osu`;


  try {
    const beatmap = new Beatmap({
      path: file_path,
    });
    const calc = new Calculator({
      mods: 64,
      mode: 0,
    });


    const attr = calc.acc(100).mapAttributes(beatmap);
    const performance_now = calc
      .nMisses(10)
      .performance(beatmap);

    const performance_fc = calc
      .nMisses(0)
      .performance(beatmap);


    const result = {
      stars: +performance_now.difficulty.stars.toFixed(2),
      ar: +attr.ar.toFixed(2),
      od: +attr.od.toFixed(2),
      cs: +attr.cs.toFixed(2),
      hp: +attr.hp.toFixed(2),
      pp: +performance_now.pp.toFixed(2),
      fc: +performance_fc.pp.toFixed(2),
      max_combo: performance_now.difficulty.maxCombo,
    };


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
    if (index > 100) break;
  };


  await sleep(5000);
  main();
};

main('yo');