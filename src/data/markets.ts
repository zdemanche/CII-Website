export interface Market {
  slug: string; name: string; short: string; summary: string; detail: string[]; examples?: string[]; photos: string[]; 
}

export const markets: Market[] = [
  {
    slug: 'aircraft', photos: ['part-uh60-rotor-link', 'part-aluminum-structural', 'part-large-titanium'], name: 'Aircraft and rotorcraft', short: 'Flight-safety and flight-critical forgings',
    summary: 'Flight-safety, flight-critical and primary forgings for fixed-wing aircraft, helicopters and unmanned aircraft — military, commercial and general aviation.',
    detail: ['We forge structural, airframe, landing gear, rotor and wheel components in titanium, aluminum, steel and nickel alloys.'],
    examples: ['Landing gear components', 'Structural and airframe fittings', 'Rotor components, including a UH-60 rotor link', 'Wheel components', 'Nozzle forgings', 'Small steel fittings'],
  },
  {
    slug: 'defense', photos: ['part-missile-aluminum', 'part-medium-steel', 'part-small-steel'], name: 'Military and defense', short: 'Forgings for ships, aircraft, vehicles and munitions',
    summary: 'Hand, contoured and closed-die forgings for warships, fixed- and rotary-wing aircraft, armored vehicles and guided munitions.',
    detail: ['Our defense work spans naval, air and ground platforms, supported by NADCAP-accredited heat treating and NDT.'],
    examples: ['Warships', 'Fixed- and rotary-wing aircraft', 'Armored vehicles', 'Guided munitions'],
  },
  {
    slug: 'turbine-engine', photos: ['part-nozzles', 'part-hastx-nozzle', 'part-vanes-nozzles'], name: 'Turbine engine', short: 'Engine forgings for aircraft and industrial gas turbines',
    summary: 'Custom forgings for engine systems in commercial and military aircraft and in industrial gas turbines.',
    detail: ['We forge turbine engine parts in stainless steel, nickel-base alloys such as Waspaloy, aluminum and titanium.'],
    examples: ['Stainless steel fuel nozzles', 'Waspaloy fittings', 'Aluminum actuators', 'Titanium blades', 'Power-generation vanes and nozzles'],
  },
  {
    slug: 'transportation', photos: ['part-737-attach-bolt', 'part-f15-fuel-injector-valve', 'part-small-aluminum-valves'], name: 'Transportation', short: 'Wheels, impellers, pistons and connecting rods',
    summary: 'Our aircraft-grade forging engineering, combined with the process-improvement discipline the automotive industry demands.',
    detail: ['We specialize in titanium, nickel and aluminum forgings for general automotive, marine and defense transportation.'],
    examples: ['Aircraft wheels', 'Turbocharger impellers', 'High-performance pistons', 'Connecting rods', 'Aluminum valve forgings', 'Engine attach bolts in Inconel 718'],
  },
  {
    slug: 'industrial', photos: ['part-magnesium', 'part-aa03', 'part-large-aluminum-valves'], name: 'Industrial and commercial', short: 'Rings, discs, valve bodies, shafts and flanges',
    summary: 'Cost-effective, highly engineered forgings for refineries, oilfield equipment, pressure vessels and heat exchangers.',
    detail: ['We have the expertise and equipment to forge simple or complex shapes, including power-generation and centrifuge components.'],
    examples: ['Closed-die forged rings', 'Discs', 'Valve bodies', 'Shafts', 'Flanges', 'Fittings', 'Magnesium forgings'],
  },
];

export const programs = [
  { group: 'Commercial fixed-wing', items: ['Airbus A320', 'Airbus A350', 'Boeing 737', 'Boeing 747', 'Boeing 757', 'Boeing 767', 'Boeing 777', 'Boeing 787'], legacy: ['Boeing 707', 'Boeing 727', 'DC-10', 'MD-90', 'MD-11'] },
  { group: 'Commercial rotorcraft', items: ['Bell 47', 'Bell 206', 'Bell 222', 'Sikorsky S-61', 'Sikorsky S-76', 'Sikorsky S-92'] },
  { group: 'Military fixed-wing', items: ['B-52', 'C-5', 'C-130', 'E-2C/D', 'F-15', 'F-16', 'F/A-18', 'KC-135', 'P-3'], legacy: ['A-6', 'EA-6B'] },
  { group: 'Military rotorcraft', items: ['UH-60 Black Hawk', 'CH-53K King Stallion', 'CH-53 Super Stallion', 'CH-47 Chinook', 'CH-46', 'AH-64 Apache', 'AH-1 Cobra', 'UH-1 Iroquois', 'OH-58 Kiowa', 'SH-2 Seasprite'] },
];
