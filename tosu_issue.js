import fs from 'fs';

import rosu_102 from 'tosu_rosu';
import rosu_110 from 'current_rosu';
// import rosu_200 from 'alpha_rosu';



const currentMode = 0;


function test(rosu_as_param, version, mods, file_path) {
  try {
    const bytes = fs.readFileSync(file_path, 'utf8');
    const beatmap = new rosu_as_param.Beatmap(bytes);


    const difficulty = new rosu_as_param.Difficulty({
      mods: mods
    }).calculate(beatmap);

    const attributes = new rosu_as_param.BeatmapAttributesBuilder({
      map: beatmap,
      mods: mods,
      mode: currentMode
    }).build();

    const current = new rosu_as_param.Performance({
      mods: mods,
      misses: 10,
    }).calculate(beatmap);

    const fullCombo = new rosu_as_param.Performance({
      mods: mods,
    }).calculate(current);


    beatmap.free();
    
    // console.log(version, { difficulty, attributes, current, fullCombo });
  } catch (error) {
    console.log('\n\n\n\n', version, error);
  };
};


test(rosu_102, 102, 64, '1.osu');
test(rosu_110, 110, 64, '1.osu');

setTimeout(() => {
  test(rosu_110, 200, 0, '2.osu');
}, 100);

setTimeout(() => {
  test(rosu_110, 200, 8, '1.osu');
}, 200);

setTimeout(() => {
  test(rosu_110, 200, 8, '2.osu');
}, 300);