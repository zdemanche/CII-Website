export const hammers = { kind: 'Programmable hydraulic hammers', range: '31.5 kJ to 160 kJ' };

export const presses = [
  { kind: 'Hydraulic press', tons: 2500 },
  { kind: 'Hydraulic press', tons: 1500 },
  { kind: 'Mechanical press', tons: 1300 },
  { kind: 'Cold trim press', tons: 150 },
  { kind: 'Cold trim press', tons: 75 },
  { kind: 'Cold trim press', tons: 60 },
];

/** Max forging weight and plan-view area by material (from the legacy capability table). */
export const limits = [
  { material: 'Carbon, alloy and stainless steels', equipment: 'Hammer', weightLb: 250, areaSqIn: 300 },
  { material: 'Nickel-base alloys and titanium', equipment: 'Hammer', weightLb: 175, areaSqIn: 240 },
  { material: 'Copper-base alloys', equipment: 'Press', weightLb: 150, areaSqIn: 200 },
  { material: 'Aluminum', equipment: 'Press', weightLb: 100, areaSqIn: 250 },
];

export const materials = [
  { family: 'Titanium', grades: ['Commercially pure grades', 'Ti 5Al-2.5Sn', 'Ti 6Al-4V', 'Ti 6-6-2', 'Ti 6-2-4-2', 'Ti 10-2-3'] },
  { family: 'Aluminum', grades: ['2014', '2025', '2219', '2618', '6061', '7049', '7050', '7075'] },
  { family: 'Nickel-base alloys', grades: ['Inconel 600', 'Inconel 625', 'Inconel 718', 'Inconel X-750', 'Hastelloy', 'Waspaloy'] },
  { family: 'Stainless steels', grades: ['A286', '300 series', '400 series', '403 / 403Cb', 'Custom 450', '17-4 PH', '15-5 PH', '13-8 PH', 'Pyrowear'] },
  { family: 'Alloy and carbon steels', grades: ['Carbon steels', 'VAR and VIM/VAR alloy steels', 'Maraging steels', 'HP 9-4-30'] },
  { family: 'Other metals', grades: ['Magnesium', 'Aluminum bronze', 'Manganese bronze', 'Naval brass'] },
];

export const engineering = [
  { title: 'Forging design and redesign', body: 'We help your engineers design new forgings and redesign existing ones.' },
  { title: 'DEFORM process simulation', body: 'Deformation modeling matches the part to a forging process before tooling is cut: equipment selection, stock sizing and preform shape progressions.' },
  { title: 'Metallurgical and metal-flow analysis', body: 'Grain-flow and microstructure studies confirm the forging puts strength where the part is loaded.' },
  { title: 'Laser scanning and 3-D models', body: 'Laser scanning for dimensional analysis of machined parts, and 3-D models built directly for die manufacturing.' },
];

export const finishing = [
  { title: 'Heat treating', nadcap: true, items: ['Anneal', 'Solution treat', 'Age', 'Harden', 'Normalize', 'Temper', 'Air and water quench'] },
  { title: 'Nondestructive testing', nadcap: true, items: ['Fluorescent penetrant inspection', 'Magnetic particle inspection', 'Ultrasonic inspection'] },
  { title: 'Laboratory', nadcap: true, items: ['Room-temperature tensile testing', 'Grain size and microstructure', 'XRF metal chemistry', 'Hardness', 'Electrical conductivity'] },
  { title: 'Cleaning and deburring', nadcap: false, items: ['Vibratory tumbling', 'Grit blasting', 'Titanium chemical milling and etching', 'Aluminum etching', 'Stainless steel pickling'] },
];

/** The forging route, in order. */
export const process = [
  { step: 'Engineer', body: 'Forging design, DEFORM simulation and die models.' },
  { step: 'Forge', body: 'Open and closed die on hydraulic hammers and presses up to 2,500 tons.' },
  { step: 'Trim', body: 'Flash removed on cold trim presses.' },
  { step: 'Heat treat', body: 'NADCAP-accredited heat treating, in house.' },
  { step: 'Inspect and test', body: 'Penetrant, magnetic particle and ultrasonic inspection; tensile, hardness and chemistry in our lab.' },
  { step: 'Clean and ship', body: 'Etch, pickle, blast or tumble, then certify and ship.' },
];
