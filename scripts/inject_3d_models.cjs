const fs = require('fs');
const path = require('path');
const { ARCHETYPE_LIBRARY } = require('./archetypes.cjs');

const issueArchetypeMappings = {
  "2026-08-31.json": {
    archetype: "rotary_actuator",
    title: "Humanoid High-Torque Quasi-Direct Drive (QDD) Actuator",
    subtitle: "Interactive 3D BLDC Motor Stator, Halbach Rotor, Strain-Wave Gear & Cross-Roller Bearing",
    badge: "ROBOTICS HARDWARE // 3D INTERACTIVE LAB",
    contextual_labels: {
      stator_housing: { name: "High-Slot Frameless BLDC Motor Stator", desc: "High-density concentrated copper stator coils delivering 140 Nm peak burst torque." },
      rotor_magnets: { name: "Halbach Permanent Magnet Inner Rotor", desc: "Precision neodymium rotor yielding uniform magnetic flux and 94% electromechanical efficiency." },
      harmonic_gear: { name: "Strain-Wave Harmonic Flexspline Reducer", desc: "Compact 10:1 to 50:1 low-backlash reduction gear with high torsional stiffness." },
      output_flange: { name: "Cross-Roller Output Bearing Hub", desc: "High-rigidity ring bearing supporting simultaneous radial, axial, and moment loads during dynamic locomotion." }
    }
  },
  "2026-09-01.json": {
    archetype: "reactor_vessel",
    title: "Small Modular Reactor (SMR) Pressure Vessel & Nuclear Core",
    subtitle: "Interactive 3D Heavy Forged Steel Vessel, Reactor Core, Control Rods & Primary Coolant Nozzles",
    badge: "NUCLEAR THERMAL // 3D INTERACTIVE LAB",
    contextual_labels: {
      pressure_vessel: { name: "Heavy-Forged Steel Reactor Pressure Vessel", desc: "Integral reactor vessel containing the reactor core and steam generators in a single pressure boundary." },
      fuel_core: { name: "TRISO Ceramic Fuel Assembly Core", desc: "Walkaway-safe fuel pebble/pin core resistant to meltdowns up to 1,600°C." },
      control_rods: { name: "Control Rod Drive Mechanism (CRDM)", desc: "Gravity-actuated boron carbide safety rods designed for passive emergency scram." },
      inlet_nozzles: { name: "Primary Loop Coolant Inlet & Outlet Nozzles", desc: "High-pressure forged nozzles delivering 300°C water to secondary heat exchangers." }
    }
  },
  "2026-09-02.json": {
    archetype: "energy_storage",
    title: "2.88GWh Utility-Scale Battery Energy Storage (BESS) Container",
    subtitle: "Interactive 3D ISO Container Enclosure, LFP Battery Racks, Chiller & High-Voltage DC Switchgear",
    badge: "ENERGY STORAGE // 3D INTERACTIVE LAB",
    contextual_labels: {
      container_shell: { name: "ISO 20-Foot Steel BESS Enclosure", desc: "Thermal-isolated weatherproof container rated for NFPA 855 and UL 9540A fire standards." },
      battery_rack_left: { name: "Tiered LFP Prismatic Battery Rack A", desc: "Long-cycle life LiFePO4 cells configured for 1,500V DC operational voltage." },
      battery_rack_right: { name: "Tiered LFP Prismatic Battery Rack B", desc: "Parallel battery rack featuring internal liquid cold-plates and cell-level thermal sensors." },
      hvac_chiller: { name: "Industrial Liquid Chiller & Dehumidifier", desc: "Precision closed-loop HVAC keeping internal battery gradient within ±2°C." },
      dc_switchgear: { name: "Bi-Directional High-Voltage DC Switchgear", desc: "Ultra-fast contactors and pyrofuses for sub-millisecond islanding protection." }
    }
  },
  "2026-09-03.json": {
    archetype: "server_rack",
    title: "NVL72 132kW Liquid-Cooled AI Supercomputer Rack",
    subtitle: "Interactive 3D 42U Heavy Chassis, Liquid Manifolds, Compute Blades & Copper Busbars",
    badge: "COMPUTE INFRASTRUCTURE // 3D INTERACTIVE LAB",
    contextual_labels: {
      compute_blade_1: { name: "Blackwell GPU Compute Node Tray 1", desc: "Direct-to-chip cold plate tray extracting 1,200W from dual B200 accelerators." },
      compute_blade_2: { name: "Blackwell GPU Compute Node Tray 2", desc: "Mid-tier compute blade linked via 1.8 TB/s NVLink copper switch backplane." },
      tor_switch: { name: "NVLink Spine Switch Fabric (9x Trays)", desc: "High-radix interconnect enabling all 72 GPUs to act as a single unified accelerator." },
      liquid_manifold: { name: "Blind-Mate Liquid Cooling Manifolds", desc: "Stainless steel warm-water distribution tubes circulating 80 liters per minute." },
      power_busbar: { name: "48V / 400V Solid Copper Power Busbar", desc: "Massive solid busbar delivering 3,000 amps across all rack tiers with 99% efficiency." }
    }
  },
  "2026-09-04.json": {
    archetype: "lattice_tower",
    title: "500kV High-Voltage Transmission Pylon & Line Suspension",
    subtitle: "Interactive 3D Galvanized Steel Lattice Mast, Suspension Crossarms & Conductor Bundles",
    badge: "GRID INFRASTRUCTURE // 3D INTERACTIVE LAB",
    contextual_labels: {
      lattice_base: { name: "Heavy-Duty Galvanized Steel Lattice Base", desc: "High-strength angle iron structure engineered for 180 km/h wind shear and seismic resilience." },
      crossarm_truss: { name: "High-Tension Suspension Cross-Arms", desc: "Cantilevered structural steel arms maintaining 6m electrical clearance between phases." },
      conductor_bundles: { name: "Quad-Bundle 500kV ACSR Conductors", desc: "Four-conductor bundle geometry suppressing corona discharge losses below 6 kW/km." },
      insulator_strings: { name: "Toughened Glass Insulator Discs", desc: "High-dielectric suspension strings preventing high-voltage flashovers." }
    }
  },
  "2026-09-05.json": {
    archetype: "semiconductor_die",
    title: "Dedicated Neural KV-Cache Accelerator Core",
    subtitle: "Interactive 3D Compute Die, On-Package SRAM Banks, HBM Stacks & Liquid Heat Spreader",
    badge: "AI SILICON HARDWARE // 3D INTERACTIVE LAB",
    contextual_labels: {
      logic_die: { name: "Tensor Key-Value Cache Engine Die", desc: "Specialized memory-compute tile streaming attention keys and values with sub-nanosecond latency." },
      hbm_stack_1: { name: "HBM3e High-Density Memory Pool A", desc: "High-capacity buffer storing hundreds of gigabytes of conversational context." },
      hbm_stack_2: { name: "HBM3e High-Density Memory Pool B", desc: "Symmetric memory stack eliminating pipeline stalls during 100k-token sequence generation." }
    }
  },
  "2026-09-06.json": {
    archetype: "optical_transceiver",
    title: "3.2Tbps Co-Packaged Optics (CPO) Switch Package",
    subtitle: "Interactive 3D Silicon Photonic PIC, CW Micro-Laser Array & High-Density Fiber Ribbon",
    badge: "PHOTONIC FABRIC // 3D INTERACTIVE LAB",
    contextual_labels: {
      pic_die: { name: "Broadcom Bailly Silicon Photonic PIC", desc: "Monolithic optical transceiver die routing 64 optical channels with integrated Mach-Zehnder modulators." },
      laser_array: { name: "External CW Laser Diode Source", desc: "Remote high-power distributed feedback laser preventing thermal drift inside the switch core." },
      fiber_ferrule: { name: "High-Density MPO Optical Fiber Ribbon", desc: "Single-mode optical ribbon cable conveying 3.2 Terabits per second." },
      electrical_connector: { name: "224G PAM4 Substrate Ball Grid Array", desc: "Sub-millimeter solder balls providing short-reach electrical interconnects with under 1.5pJ/bit." }
    }
  },
  "2026-09-07.json": {
    archetype: "power_transformer",
    title: "750MVA High-Voltage Autotransformer & Substation Intertie",
    subtitle: "Interactive 3D Laminated Magnetic Core, High-Voltage Windings, Bushings & Radiators",
    badge: "GRID THERMODYNAMICS // 3D INTERACTIVE LAB",
    contextual_labels: {
      core_limbs: { name: "Grain-Oriented Laminated Steel Core", desc: "Ultra-low-loss core steel minimizing hysteresis losses across 750MVA throughput." },
      hv_windings_1: { name: "500kV Phase A Transposed Copper Windings", desc: "Heavy copper conductor stack cooled by forced ester dielectric oil." },
      hv_bushings: { name: "765kV RIP Capacitor Bushings", desc: "Resin-impregnated paper high-voltage insulator terminals." },
      cooling_radiators: { name: "Forced-Oil Forced-Air (OFAF) Radiator Bank", desc: "Direct heat dissipation fins shedding 1,200 kW of copper ohmic losses." }
    }
  },
  "2026-09-08.json": {
    archetype: "semiconductor_die",
    title: "2nm Gate-All-Around (GAA) & Backside Power (BSPDN)",
    subtitle: "Interactive 3D Sub-Micron Silicon Die, GAA Channels, HBM Stacks & Backside Power Rails",
    badge: "SEMICONDUCTOR PHYSICS // 3D INTERACTIVE LAB",
    contextual_labels: {
      logic_die: { name: "2nm GAA Silicon Nanosheet Channel Die", desc: "3-stack atomic silicon nanosheets wrapped 360° by high-k metal gate." },
      bspdn_rails: { name: "Backside Power Distribution Rails (BSPDN)", desc: "Subterranean direct-feed power network bypassing 15 signal metal layers." },
      interposer: { name: "Nano-TSV Silicon Interposer Bridge", desc: "Sub-micron through-silicon via bridge routing signals at 224Gbps." },
      hbm_stack_1: { name: "Stacked HBM4 Memory Cube A", desc: "16-high vertical DRAM stack delivering 2.5 TB/s memory bandwidth." },
      hbm_stack_2: { name: "Stacked HBM4 Memory Cube B", desc: "Low-latency memory buffer feeding tens of thousands of compute cores." },
      heat_spreader: { name: "Micro-Vapor Chamber Heat Spreader", desc: "Copper-nickel thermal interface rejecting 450W of dynamic heat." }
    }
  }
};

const issuesDir = path.resolve(__dirname, '../data/issues');
const files = fs.readdirSync(issuesDir).filter(f => f.endsWith('.json'));

let updatedCount = 0;
for (const file of files) {
  const filePath = path.join(issuesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (issueArchetypeMappings[file]) {
    const mapping = issueArchetypeMappings[file];
    const baseArchetype = ARCHETYPE_LIBRARY[mapping.archetype];
    
    data.interactive_model = {
      archetype: mapping.archetype,
      title: mapping.title,
      subtitle: mapping.subtitle,
      badge: mapping.badge,
      camera: baseArchetype.camera,
      contextual_labels: mapping.contextual_labels,
      controls: baseArchetype.controls,
      metrics: baseArchetype.metrics
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`[OK] Updated ${file} with archetype: ${mapping.archetype}`);
    updatedCount++;
  }
}

console.log(`Successfully updated ${updatedCount} issue files with canonical 3D archetypes!`);
