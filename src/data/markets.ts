export interface Market {
  slug: string; name: string; short: string; summary: string; detail: string[]; examples?: string[]; pendingCopy?: boolean;
}

export const markets: Market[] = [
  {
    slug: 'aircraft', name: 'Aircraft and rotorcraft', short: 'Flight-safety and flight-critical forgings',
    summary: 'Flight-safety, flight-critical and primary forgings for fixed-wing aircraft, helicopters and unmanned aircraft — military, commercial and general aviation.',
    detail: ['We forge structural, airframe, landing gear, rotor and wheel components in titanium, aluminum, steel and nickel alloys.'],
    examples: ['Landing gear components', 'Structural and airframe fittings', 'Rotor components, including a UH-60 rotor link', 'Wheel components', 'Nozzle forgings', 'Small steel fittings'],
  },
  {
    slug: 'defense', name: 'Military and defense', short: 'Forgings for ships, aircraft, vehicles and munitions',
    summary: 'Hand, contoured and closed-die forgings for warships, fixed and rotary wing aircraft, armored vehicles and guided munitions.',
    detail: ['Our defense work spans naval, air and ground platforms, supported by NADCAP-accredited heat treat and NDT.'],
    examples: ['Warships', 'Fixed and rotary wing aircraft', 'Armored vehicles', 'Guided munitions'],
  },
  {
    slug: 'turbine-engine', name: 'Turbine engine', short: 'Forgings in nickel-base and titanium alloys',
    summary: 'Forgings for jet engines and power-generation turbines in the nickel-base and titanium alloys these applications demand.',
    detail: ['Materials include Inconel 718, Waspaloy and Ti 6Al‑4V among the grades listed on our materials page.'],
    pendingCopy: true,
  },
  {
    slug: 'industrial', name: 'Industrial and transportation', short: 'Power generation, centrifuges and transportation',
    summary: 'Forgings for power generation, centrifuges, transportation and other industrial and commercial equipment.',
    detail: ['The same equipment, materials and quality system that serve aerospace serve our industrial customers.'],
    pendingCopy: true,
  },
];

export const programs = [
  { group: 'Commercial fixed-wing', items: ['Airbus A320', 'Airbus A350', 'Boeing 737', 'Boeing 747', 'Boeing 757', 'Boeing 767', 'Boeing 777', 'Boeing 787'], legacy: ['Boeing 707', 'Boeing 727', 'DC-10', 'MD-90', 'MD-11'] },
  { group: 'Commercial rotorcraft', items: ['Bell 47', 'Bell 206', 'Bell 222', 'Sikorsky S-61', 'Sikorsky S-76', 'Sikorsky S-92'] },
  { group: 'Military fixed-wing', items: ['B-52', 'C-5', 'C-130', 'E-2C/D', 'F-15', 'F-16', 'F/A-18', 'KC-135', 'P-3'], legacy: ['A-6', 'EA-6B'] },
  { group: 'Military rotorcraft', items: ['UH-60 Black Hawk', 'CH-53K King Stallion', 'CH-53 Super Stallion', 'CH-47 Chinook', 'CH-46', 'AH-64 Apache', 'AH-1 Cobra', 'UH-1 Iroquois', 'OH-58 Kiowa', 'SH-2 Seasprite'] },
];
