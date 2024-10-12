import fs from 'fs';

import rosu_102 from 'tosu_rosu';
import rosu_110 from 'current_rosu';
import rosu_200 from 'alpha_rosu';


const file_path = `./1.osu`;

const currentMods = 64;
const currentMode = 0;


function test(rosu_as_param, version) {
  try {
    const bytes = fs.readFileSync(file_path, 'utf8');
    const beatmap = new rosu_as_param.Beatmap(bytes);


    const difficulty = new rosu_as_param.Difficulty({
      mods: currentMods
    }).calculate(beatmap);

    const attributes = new rosu_as_param.BeatmapAttributesBuilder({
      map: beatmap,
      mods: currentMods,
      mode: currentMode
    }).build();

    const current = new rosu_as_param.Performance({
      mods: currentMods,
      misses: 10,
    }).calculate(beatmap);

    const fullCombo = new rosu_as_param.Performance({
      mods: currentMods,
    }).calculate(beatmap);


    console.log(version, { difficulty, attributes, current, fullCombo });
  } catch (error) {
    console.log('\n\n\n\n', version, error);
  };
};


test(rosu_102, 102);
test(rosu_110, 110);
test(rosu_200, 200);