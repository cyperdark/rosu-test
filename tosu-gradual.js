import fs from 'fs';
import alpha_rosu from "alpha_rosu";


/**
 * 
 * @param {import('alpha_rosu')} rosu 
 */
function calculate_results(rosu) {
  try {
    const bytes = fs.readFileSync('./3.osu', 'utf8');
    const beatmap = new rosu.Beatmap(bytes);


    const scoreParams = {
      combo: 2875,
      mods: 16,
      misses: 4,
      n50: 3,
      n100: 58,
      n300: 3334,
      nKatu: 31,
      nGeki: 450,
      lazer: true
    };


    const curPerformance = new rosu.Performance(scoreParams).calculate(beatmap);
    const fcPerformance = new rosu.Performance({
      lazer: true,
      mods: 16,
      misses: 0,
      accuracy: 98.67
    }).calculate(curPerformance);


    console.log('calculate_results', curPerformance.pp, fcPerformance.pp);

  } catch (error) {
    console.log('calculate_results', error);
  };
};

/**
 * 
 * @param {import('alpha_rosu')} rosu 
 */
function calculate_gradual(rosu) {
  try {
    const bytes = fs.readFileSync('./3.osu', 'utf8');
    const beatmap = new rosu.Beatmap(bytes);


    const difficulty = new rosu.Difficulty({
      lazer: true,
      mods: 16,
    });
    const GradualPerformance = new rosu.GradualPerformance(difficulty, beatmap);

    const scoreParams = {
      maxCombo: 2875,
      mods: 16,
      misses: 4,
      n50: 3,
      n100: 58,
      n300: 3334,
      nKatu: 31,
      nGeki: 450,
    };

    const passedObjects = calculatePassedObjects(0,
      scoreParams.n300,
      scoreParams.n100,
      scoreParams.n50,
      scoreParams.misses,
      scoreParams.nKatu,
      scoreParams.nGeki
    );


    const currPerformance = GradualPerformance.nth(scoreParams, passedObjects - 1);
    const fcPerformance = new rosu.Performance({
      lazer: true,
      mods: 16,
      misses: 0,
      accuracy: 98.67
    }).calculate(beatmap);


    console.log('calculate_gradual', currPerformance.pp, fcPerformance.pp);

  } catch (error) {
    console.log('calculate_gradual', error);
  };
};


/**
 *
 * @param mode gamemode number
 * @param H300 number
 * @param H100 number
 * @param H50 number
 * @param H0 number
 * @param katu number
 * @param geki number
 * @returns Total passed objects
 */
export const calculatePassedObjects = (
  mode,
  H300,
  H100,
  H50,
  H0,
  katu,
  geki
) => {
  switch (mode) {
    case 0:
      return H300 + H100 + H50 + H0;
    case 1:
      return H300 + H100 + H0;
    case 2:
      return H300 + H100 + H50 + H0 + katu;
    case 3:
      return H300 + H100 + H50 + H0 + katu + geki;
    default:
      return 0;
  }
};




calculate_results(alpha_rosu);
calculate_gradual(alpha_rosu);