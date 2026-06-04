export const SYNDEMICS_PINK = "#F0325F";
export const SYNDEMICS_CYAN = "#3D9BE9";
export const SYNDEMICS_BLUE = "#003771";

// Using overarching variables so that the transition between percentages and
// proportions can be easier
export const PROPORTION_MIN = 0;
export const PROPORTION_STEP = 0.25;
export const PROPORTION_MAX = 100;

// constraints for sliders on the simulation page
export const DURATION_MIN = 1;
export const DURATION_STEP = 1;
export const DURATION_MAX = 364; // 7 years

export const POPULATION_MIN = 0;
export const POPULATION_STEP = 500;
export const POPULATION_MAX = 300000;

export const CHANGING_POP_MIN = -10000;
export const CHANGING_POP_STEP = 100;
export const CHANGING_POP_MAX = 50000;

export const FATAL_OD_MIN = PROPORTION_MIN;
export const FATAL_OD_STEP = PROPORTION_STEP;
export const FATAL_OD_MAX = PROPORTION_MAX;
