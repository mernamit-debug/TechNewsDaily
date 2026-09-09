/**
 * CANONICAL 3D ENGINEERING ARCHETYPE LIBRARY
 * 10 General Hardware & Physical Systems Archetypes for Multi-Context Use
 */

const ARCHETYPE_LIBRARY = {
  semiconductor_die: {
    id: "semiconductor_die",
    name: "Silicon Die & Microchip Packaging",
    icon: "🔬",
    category: "Microelectronics & Processors",
    defaultBadge: "SEMICONDUCTOR HARDWARE // 3D INTERACTIVE LAB",
    defaultTitle: "Silicon Die & Advanced Microchip Packaging",
    defaultSubtitle: "Multi-layer flip-chip BGA substrate, high-density silicon die, HBM stacks & thermal spreader",
    camera: { distance: 230, pitch: 0.45, yaw: 0.6 },
    components: [
      { id: "sub_pcb", name: "BGA Organic Substrate Base", shape: "box", dimensions: [140, 6, 140], position: [0, -18, 0], color: "#1e293b", opacity: 0.95, desc: "Multi-layer high-density organic core substrate with micro-BGA solder balls." },
      { id: "bspdn_rails", name: "Backside Power Distribution Rails (BSPDN)", shape: "box", dimensions: [110, 4, 110], position: [0, -13, 0], color: "#ec4899", opacity: 0.9, desc: "Subterranean low-impedance power busbars bypassing signal wiring." },
      { id: "interposer", name: "Silicon Micro-TSV Interposer", shape: "box", dimensions: [100, 4, 100], position: [0, -9, 0], color: "#0284c7", opacity: 0.9, desc: "High-density passive silicon bridge with sub-micron through-silicon vias." },
      { id: "logic_die", name: "Primary Logic / Compute Core Die", shape: "box", dimensions: [56, 8, 56], position: [0, -3, 0], color: "#00f0ff", opacity: 0.95, desc: "Active compute silicon with billions of nanoscale gate-all-around transistors." },
      { id: "hbm_stack_1", name: "High-Bandwidth Memory (HBM) Stack A", shape: "box", dimensions: [26, 10, 32], position: [-36, -2, 0], color: "#a855f7", opacity: 0.95, desc: "Stacked DRAM die delivering terabytes-per-second memory throughput." },
      { id: "hbm_stack_2", name: "High-Bandwidth Memory (HBM) Stack B", shape: "box", dimensions: [26, 10, 32], position: [36, -2, 0], color: "#a855f7", opacity: 0.95, desc: "Symmetric memory stack balanced across the wide high-speed silicon interposer bus." },
      { id: "heat_spreader", name: "Integrated Heat Spreader (IHS) Lid", shape: "box", dimensions: [124, 8, 124], position: [0, 16, 0], color: "#94a3b8", opacity: 0.75, desc: "Nickel-plated copper protective lid conducting heat directly to cooling plates." }
    ],
    controls: [
      { id: "core_vdd", label: "Core Voltage (Vdd)", min: 0.50, max: 1.15, step: 0.05, default: 0.75, unit: "V" },
      { id: "clock_ghz", label: "Core Clock Frequency", min: 1.2, max: 5.5, step: 0.1, default: 3.8, unit: "GHz" },
      { id: "junction_temp", label: "Junction Temp (Tj)", min: 25, max: 105, step: 5, default: 65, unit: "°C" }
    ],
    metrics: [
      { id: "power_density", label: "Power Density", unit: "W/cm²" },
      { id: "ir_drop", label: "Parasitic IR Drop", unit: "mV" },
      { id: "drive_ion", label: "Drive Current (Ion)", unit: "mA/μm" },
      { id: "clock_ceil", label: "Max Clock Ceiling", unit: "GHz" }
    ],
    computeMetrics: (s) => {
      const vdd = parseFloat(s.core_vdd ?? 0.75);
      const clk = parseFloat(s.clock_ghz ?? 3.8);
      const tj = parseFloat(s.junction_temp ?? 65);
      return {
        power_density: (160 * Math.pow(vdd / 0.75, 2) * (clk / 3.8) * (tj / 60)).toFixed(1),
        ir_drop: (vdd * 68 * (tj / 60)).toFixed(1),
        drive_ion: (0.48 * 3 * Math.pow(Math.max(0.1, vdd - 0.25), 1.2) * (1 - (tj - 25) * 0.0015)).toFixed(2),
        clock_ceil: (clk * (vdd / 0.75) / (1 + (tj - 25) * 0.002)).toFixed(2)
      };
    }
  },

  server_rack: {
    id: "server_rack",
    name: "AI Supercomputer & Server Rack",
    icon: "🖥️",
    category: "Datacenter & High-Density Compute",
    defaultBadge: "COMPUTE INFRASTRUCTURE // 3D INTERACTIVE LAB",
    defaultTitle: "High-Density AI Supercomputer Server Rack",
    defaultSubtitle: "42U cold-rolled steel chassis, liquid-cooled compute blades, copper busbar & network fabric",
    camera: { distance: 260, pitch: 0.35, yaw: 0.65 },
    components: [
      { id: "rack_chassis", name: "42U Structural Cold-Rolled Steel Frame", shape: "box", dimensions: [80, 170, 75], position: [0, 0, 0], color: "#1e293b", opacity: 0.35, desc: "Seismic-rated heavy duty rack enclosure housing liquid manifolds and busbars." },
      { id: "compute_blade_1", name: "Lower GPU Compute Node Blade", shape: "box", dimensions: [68, 22, 65], position: [0, -45, 0], color: "#00f0ff", opacity: 0.95, desc: "Dense accelerator tray with liquid cold-plates contacting GPUs and HBM." },
      { id: "compute_blade_2", name: "Mid-Tier GPU Compute Node Blade", shape: "box", dimensions: [68, 22, 65], position: [0, -15, 0], color: "#00e599", opacity: 0.95, desc: "Modular slide-in chassis connected directly to high-speed NVLink switches." },
      { id: "compute_blade_3", name: "Upper GPU Compute Node Blade", shape: "box", dimensions: [68, 22, 65], position: [0, 15, 0], color: "#38bdf8", opacity: 0.95, desc: "High-throughput node handling tensor parallelism and inference caching." },
      { id: "tor_switch", name: "Top-of-Rack High-Radix Network Fabric", shape: "box", dimensions: [68, 16, 65], position: [0, 45, 0], color: "#a855f7", opacity: 0.95, desc: "800G/1.6T non-blocking spine switch interconnecting adjacent cluster racks." },
      { id: "liquid_manifold", name: "Dual-Loop Liquid Quick-Disconnect Manifold", shape: "cylinder", dimensions: [4, 4, 150, 16], position: [32, 0, -28], color: "#00e599", opacity: 0.95, desc: "Warm-water supply and return pipes circulating coolant at 80 LPM." },
      { id: "power_busbar", name: "High-Current 48V/400V Copper Busbar Spine", shape: "box", dimensions: [8, 150, 4], position: [-32, 0, -28], color: "#f5a623", opacity: 0.95, desc: "Solid electrolytic copper bus delivering up to 3,000 Amps with minimal ohmic loss." }
    ],
    controls: [
      { id: "gpu_tdp", label: "Node Power Draw", min: 400, max: 1800, step: 50, default: 1200, unit: "W" },
      { id: "coolant_inlet", label: "Coolant Inlet Temp", min: 15, max: 45, step: 1, default: 24, unit: "°C" },
      { id: "cluster_scale", label: "Active Rack Nodes", min: 16, max: 72, step: 4, default: 72, unit: "nodes" }
    ],
    metrics: [
      { id: "total_kw", label: "Total Rack Power", unit: "kW" },
      { id: "fp8_pflops", label: "AI Compute Throughput", unit: "PFLOPS" },
      { id: "water_flow", label: "Coolant Flow Rate", unit: "LPM" },
      { id: "pue_impact", label: "Cooling PUE Overhead", unit: "PUE" }
    ],
    computeMetrics: (s) => {
      const gpuW = parseFloat(s.gpu_tdp ?? 1200);
      const inlet = parseFloat(s.coolant_inlet ?? 24);
      const scale = parseFloat(s.cluster_scale ?? 72);
      return {
        total_kw: ((gpuW * scale * 1.15) / 1000).toFixed(1),
        fp8_pflops: ((scale * 20) * (gpuW / 1200)).toFixed(1),
        water_flow: ((gpuW * scale * 0.001) * 1.8).toFixed(1),
        pue_impact: (1.025 + (inlet / 100) * 0.05).toFixed(3)
      };
    }
  },

  power_transformer: {
    id: "power_transformer",
    name: "Electromagnetic Transformer & Substation",
    icon: "⚡",
    category: "Power Grid & Transmission",
    defaultBadge: "GRID THERMODYNAMICS // 3D INTERACTIVE LAB",
    defaultTitle: "High-Voltage Power Transformer & Substation Core",
    defaultSubtitle: "Laminated magnetic steel core, high-voltage copper windings, bushings & cooling radiators",
    camera: { distance: 250, pitch: 0.4, yaw: 0.6 },
    components: [
      { id: "core_limbs", name: "Laminated Silicon Steel Magnetic Core", shape: "box", dimensions: [90, 80, 24], position: [0, 0, 0], color: "#475569", opacity: 0.95, desc: "High-permeability grain-oriented electrical steel core providing low-hysteresis magnetic flux paths." },
      { id: "hv_windings_1", name: "Phase A High-Voltage Copper Windings", shape: "cylinder", dimensions: [18, 18, 64, 24], position: [-30, 0, 0], color: "#f5a623", opacity: 0.95, desc: "Continuously transposed copper conductors insulated with thermally upgraded kraft paper." },
      { id: "hv_windings_2", name: "Phase B High-Voltage Copper Windings", shape: "cylinder", dimensions: [18, 18, 64, 24], position: [0, 0, 0], color: "#f5a623", opacity: 0.95, desc: "Central phase winding operating under intense electromagnetic flux concentration." },
      { id: "hv_windings_3", name: "Phase C High-Voltage Copper Windings", shape: "cylinder", dimensions: [18, 18, 64, 24], position: [30, 0, 0], color: "#f5a623", opacity: 0.95, desc: "Outer phase winding connected to high-voltage tap changer for voltage regulation." },
      { id: "hv_bushings", name: "Porcelain High-Voltage Insulator Bushings", shape: "cylinder", dimensions: [5, 8, 48, 16], position: [0, 64, 0], color: "#00f0ff", opacity: 0.9, desc: "Oil-impregnated paper capacitor bushings preventing flashover at 765kV." },
      { id: "conservator_tank", name: "Overhead Oil Expansion Conservator Tank", shape: "cylinder", dimensions: [14, 14, 85, 24], position: [0, 52, -28], rotation: [0, 0, 90], color: "#38bdf8", opacity: 0.9, desc: "Sealed header reservoir with rubber bladder isolating dielectric mineral oil from air." },
      { id: "cooling_radiators", name: "External Radiator Fluted Cooling Fin Banks", shape: "box", dimensions: [110, 60, 14], position: [0, 0, 26], color: "#64748b", opacity: 0.85, desc: "Forced-oil forced-air (OFAF) corrugated radiators rejecting megawatts of ohmic heat." }
    ],
    controls: [
      { id: "mva_load", label: "Apparent MVA Load", min: 150, max: 1000, step: 25, default: 650, unit: "MVA" },
      { id: "oil_cooling", label: "Oil Cooling Stage", min: 1, max: 3, step: 1, default: 2, unit: "stage" },
      { id: "ambient_c", label: "Ambient Temperature", min: 10, max: 50, step: 2, default: 32, unit: "°C" }
    ],
    metrics: [
      { id: "top_oil_temp", label: "Top-Oil Temp", unit: "°C" },
      { id: "winding_hotspot", label: "Winding Hotspot", unit: "°C" },
      { id: "efficiency", label: "Transmission Efficiency", unit: "%" },
      { id: "loss_kw", label: "Transformer Losses", unit: "kW" }
    ],
    computeMetrics: (s) => {
      const mva = parseFloat(s.mva_load ?? 650);
      const cooling = Math.max(1, parseFloat(s.oil_cooling ?? 2));
      const ambient = parseFloat(s.ambient_c ?? 32);
      return {
        top_oil_temp: (ambient + (mva / 750) * (48 / cooling)).toFixed(1),
        winding_hotspot: (ambient + (mva / 750) * (62 / cooling) + 12).toFixed(1),
        efficiency: (99.85 - (mva / 1000) * 0.12).toFixed(3),
        loss_kw: ((mva * 1.8) * (1 + (ambient - 25) * 0.005)).toFixed(1)
      };
    }
  },

  rotary_actuator: {
    id: "rotary_actuator",
    name: "Rotary Actuator, Motor & Turbine",
    icon: "🦾",
    category: "Robotics & Kinetic Turbines",
    defaultBadge: "ROBOTICS HARDWARE // 3D INTERACTIVE LAB",
    defaultTitle: "Quasi-Direct Drive (QDD) Rotary Actuator",
    defaultSubtitle: "Frameless BLDC stator, permanent magnet rotor, strain-wave reduction & cross-roller bearing",
    camera: { distance: 220, pitch: 0.4, yaw: 0.6 },
    components: [
      { id: "stator_housing", name: "Anodized Outer Stator Housing Shell", shape: "cylinder", dimensions: [48, 48, 42, 32], position: [0, 0, 0], color: "#334155", opacity: 0.65, desc: "CNC-machined aerospace 7075-T6 aluminum housing optimized for torsional stiffness." },
      { id: "copper_windings", name: "Concentrated Copper Stator Windings", shape: "torus", dimensions: [36, 6, 16, 32], position: [0, 0, 0], color: "#f5a623", opacity: 0.95, desc: "High-slot-pole neodymium stator with high-temperature copper windings generating peak burst torque." },
      { id: "rotor_magnets", name: "Neodymium Permanent Magnet Inner Rotor", shape: "cylinder", dimensions: [28, 28, 36, 32], position: [0, 0, 0], color: "#00f0ff", opacity: 0.95, desc: "Halbach magnet array rotor delivering uniform flux density and 94% motor efficiency." },
      { id: "harmonic_gear", name: "Harmonic Wave / Planetary Reduction Stage", shape: "cylinder", dimensions: [22, 22, 18, 32], position: [0, 16, 0], color: "#a855f7", opacity: 0.95, desc: "Thin-walled flexible cup gear providing high torque density with near-zero mechanical backlash." },
      { id: "output_flange", name: "Cross-Roller Bearing & Output Flange", shape: "cylinder", dimensions: [42, 42, 8, 32], position: [0, 26, 0], color: "#e2e8f0", opacity: 0.95, desc: "Hardened output flange capable of handling simultaneous dynamic radial and thrust loads." },
      { id: "encoder_cap", name: "Optical/Magnetic Angle Encoder", shape: "cylinder", dimensions: [38, 38, 6, 32], position: [0, -23, 0], color: "#00e599", opacity: 0.95, desc: "20-bit absolute magnetic encoder enabling 10kHz joint position feedback loops." }
    ],
    controls: [
      { id: "torque_req", label: "Commanded Torque", min: 20, max: 160, step: 10, default: 85, unit: "Nm" },
      { id: "gear_ratio", label: "Harmonic Gear Ratio", min: 5, max: 50, step: 5, default: 10, unit: "ratio" },
      { id: "thermal_load", label: "Joint Operating Temp", min: 20, max: 80, step: 2, default: 45, unit: "°C" }
    ],
    metrics: [
      { id: "bandwidth", label: "Torque Loop Bandwidth", unit: "Hz" },
      { id: "power_density", label: "Joint Power Density", unit: "kW/kg" },
      { id: "backlash", label: "Angular Backlash", unit: "arcsec" },
      { id: "p_eff", label: "Electro-Mech Efficiency", unit: "%" }
    ],
    computeMetrics: (s) => {
      const torq = parseFloat(s.torque_req ?? 85);
      const ratio = Math.max(1, parseFloat(s.gear_ratio ?? 10));
      const therm = parseFloat(s.thermal_load ?? 45);
      return {
        bandwidth: Math.round(180 * (10 / ratio) * (1 - (therm - 25) * 0.004)),
        power_density: ((torq * 12) / 100).toFixed(1),
        backlash: (0.35 + (ratio / 10) * 0.12 + (torq / 160) * 0.08).toFixed(2),
        p_eff: (94.5 - (therm - 25) * 0.12 - (torq / 160) * 2.5).toFixed(1)
      };
    }
  },

  reactor_vessel: {
    id: "reactor_vessel",
    name: "Pressure Vessel & Reactor Core",
    icon: "⚛️",
    category: "Nuclear & Advanced Energy",
    defaultBadge: "NUCLEAR THERMAL // 3D INTERACTIVE LAB",
    defaultTitle: "Small Modular Reactor (SMR) Pressure Vessel",
    defaultSubtitle: "Forged pressure vessel hull, central fuel assembly, control rod mechanism & coolant nozzles",
    camera: { distance: 260, pitch: 0.35, yaw: 0.65 },
    components: [
      { id: "pressure_vessel", name: "Heavy-Forged Steel Reactor Pressure Vessel", shape: "cylinder", dimensions: [42, 42, 110, 32], position: [0, 0, 0], color: "#334155", opacity: 0.75, desc: "Seamless forged ring shell designed for 16 MPa operating pressure without longitudinal welds." },
      { id: "vessel_head", name: "Hemispherical Bolted Closure Head & Studs", shape: "sphere", dimensions: [42, 24, 16], position: [0, 55, 0], color: "#475569", opacity: 0.95, desc: "High-integrity forged head penetrations securing the control rod drive mechanisms." },
      { id: "fuel_core", name: "Fuel Assembly & Active Core Basket", shape: "cylinder", dimensions: [28, 28, 55, 32], position: [0, -10, 0], color: "#00f0ff", opacity: 0.95, desc: "Low-enriched uranium dioxide fuel pins arranged in square lattices with zircaloy cladding." },
      { id: "control_rods", name: "Vertical Control Rod Drive Mechanism Rods", shape: "cylinder", dimensions: [8, 8, 70, 16], position: [0, 45, 0], color: "#a855f7", opacity: 0.95, desc: "Neutron-absorbing silver-indium-cadmium rods providing immediate gravity-drop shutdown." },
      { id: "inlet_nozzles", name: "Primary Coolant Loop Nozzles & Flanges", shape: "cylinder", dimensions: [10, 10, 96, 16], position: [0, 20, 0], rotation: [0, 0, 90], color: "#f5a623", opacity: 0.95, desc: "Integral loop piping delivering 300°C pressurized water directly to primary heat exchangers." },
      { id: "containment_skirt", name: "Seismic Support Skirt & Foundation Base", shape: "cylinder", dimensions: [48, 54, 25, 32], position: [0, -62, 0], color: "#1e293b", opacity: 0.95, desc: "Heavy conical skirt transferring structural and seismic deadweight directly to the subterranean vault." }
    ],
    controls: [
      { id: "thermal_mw", label: "Core Thermal Output", min: 100, max: 1000, step: 50, default: 550, unit: "MWth" },
      { id: "core_temp", label: "Moderator Outlet Temp", min: 450, max: 850, step: 10, default: 720, unit: "°C" },
      { id: "coolant_flow", label: "Primary Loop Mass Flow", min: 40, max: 120, step: 5, default: 95, unit: "%" }
    ],
    metrics: [
      { id: "elec_output", label: "Electric Generation", unit: "MWe" },
      { id: "thermal_eff", label: "Thermal Efficiency", unit: "%" },
      { id: "dnbr", label: "DNBR Safety Margin", unit: "DNBR" },
      { id: "co2_avoided", label: "Annual CO2 Avoided", unit: "kt/yr" }
    ],
    computeMetrics: (s) => {
      const mwth = parseFloat(s.thermal_mw ?? 550);
      const temp = parseFloat(s.core_temp ?? 720);
      const flow = parseFloat(s.coolant_flow ?? 95);
      return {
        elec_output: (mwth * (0.38 + (temp - 550) * 0.00028)).toFixed(1),
        thermal_eff: (38.0 + (temp - 550) * 0.024).toFixed(1),
        dnbr: (2.45 * (flow / 95) * (550 / mwth)).toFixed(2),
        co2_avoided: Math.round(mwth * 0.42 * 8.76)
      };
    }
  },

  energy_storage: {
    id: "energy_storage",
    name: "Modular Energy Storage & BESS",
    icon: "🔋",
    category: "Electrochemical Storage",
    defaultBadge: "ENERGY STORAGE // 3D INTERACTIVE LAB",
    defaultTitle: "Modular Battery Energy Storage (BESS) Container",
    defaultSubtitle: "ISO steel enclosure, tiered LFP battery blade racks, liquid chiller & DC switchgear",
    camera: { distance: 260, pitch: 0.4, yaw: 0.6 },
    components: [
      { id: "container_shell", name: "ISO 20ft Weatherproof Steel Enclosure", shape: "box", dimensions: [150, 65, 65], position: [0, 0, 0], color: "#1e293b", opacity: 0.45, desc: "C5-M marine-grade insulated steel container with integrated blast-deflection venting." },
      { id: "battery_rack_left", name: "Tiered LFP Battery Blade Modules - Rack A", shape: "box", dimensions: [130, 46, 18], position: [0, -4, -18], color: "#00f0ff", opacity: 0.95, desc: "Lithium iron phosphate (LiFePO4) blade packs with internal cold-plate liquid cooling." },
      { id: "battery_rack_right", name: "Tiered LFP Battery Blade Modules - Rack B", shape: "box", dimensions: [130, 46, 18], position: [0, -4, 18], color: "#00e599", opacity: 0.95, desc: "Symmetric battery rack feeding a 1,500V DC common bus with cell-level telemetry." },
      { id: "hvac_chiller", name: "Roof-Mounted Industrial Thermal Chiller Unit", shape: "box", dimensions: [42, 18, 55], position: [0, 38, 0], color: "#38bdf8", opacity: 0.95, desc: "Dual-inverter closed-loop glycol chiller maintaining cell temperature delta below 2°C." },
      { id: "dc_switchgear", name: "High-Voltage DC Switchgear & Inverter Cabinet", shape: "box", dimensions: [22, 50, 48], position: [60, -2, 0], color: "#f5a623", opacity: 0.95, desc: "High-speed DC contactors, pyrofuses, and bi-directional power conversion electronics." },
      { id: "fire_manifold", name: "Aerosol & Nitrogen Fire Suppression Manifold", shape: "cylinder", dimensions: [3, 3, 136, 16], position: [0, 26, 0], rotation: [0, 0, 90], color: "#ef4444", opacity: 0.95, desc: "Automated aerosol extinguishant distribution system with off-gas thermal runaway detection." }
    ],
    controls: [
      { id: "c_rate", label: "Discharge C-Rate", min: 0.25, max: 3.0, step: 0.25, default: 1.0, unit: "C" },
      { id: "ambient_temp", label: "Ambient Temperature", min: -10, max: 45, step: 1, default: 28, unit: "°C" },
      { id: "soc_target", label: "Battery State of Charge", min: 10, max: 100, step: 5, default: 80, unit: "%" }
    ],
    metrics: [
      { id: "active_mw", label: "Active Power Output", unit: "MW" },
      { id: "roundtrip_eff", label: "Round-Trip Efficiency", unit: "%" },
      { id: "cell_delta_t", label: "Cell Thermal Delta-T", unit: "°C" },
      { id: "cycle_life", label: "Projected Cycle Life", unit: "cycles" }
    ],
    computeMetrics: (s) => {
      const cRate = parseFloat(s.c_rate ?? 1.0);
      const amb = parseFloat(s.ambient_temp ?? 28);
      const soc = parseFloat(s.soc_target ?? 80);
      return {
        active_mw: (12.5 * cRate * (soc / 80)).toFixed(1),
        roundtrip_eff: (92.5 - (cRate - 0.5) * 3.2 - (amb - 25) * 0.15).toFixed(1),
        cell_delta_t: (2.1 + cRate * 3.4 + (amb - 25) * 0.2).toFixed(1),
        cycle_life: Math.round(6500 - (cRate * 600) - (amb - 25) * 80)
      };
    }
  },

  optical_transceiver: {
    id: "optical_transceiver",
    name: "Photonic Engine & Optical Transceiver",
    icon: "💡",
    category: "Fiber Optics & Photonics",
    defaultBadge: "OPTICAL INTERCONNECT // 3D INTERACTIVE LAB",
    defaultTitle: "Co-Packaged Optics (CPO) Transceiver Package",
    defaultSubtitle: "Die-cast metallic housing, silicon PIC, micro-laser array, fiber ferrule & 224G connector",
    camera: { distance: 220, pitch: 0.45, yaw: 0.6 },
    components: [
      { id: "die_cast_shell", name: "EMI Shielded Die-Cast Metallic Housing", shape: "box", dimensions: [120, 22, 45], position: [0, 0, 0], color: "#475569", opacity: 0.55, desc: "Precision zinc alloy cast shell with thermal fins ensuring RF immunity and heat transfer." },
      { id: "pic_die", name: "Silicon Photonic Integrated Circuit (PIC)", shape: "box", dimensions: [38, 6, 28], position: [-15, 0, 0], color: "#00f0ff", opacity: 0.95, desc: "Silicon-on-insulator photonic chip with integrated Mach-Zehnder modulators and waveguides." },
      { id: "laser_array", name: "Micro-DFB Continuous-Wave Laser Diode Array", shape: "box", dimensions: [18, 8, 14], position: [-40, 2, 0], color: "#ef4444", opacity: 0.95, desc: "External cavity indium phosphide (InP) laser providing coherent 1310nm optical carriers." },
      { id: "fiber_ferrule", name: "MPO/MT Optical Ribbon Ferrule & Strain Boot", shape: "cylinder", dimensions: [6, 6, 40, 16], position: [-58, 0, 0], rotation: [0, 0, 90], color: "#f5a623", opacity: 0.95, desc: "Precision multi-fiber ferrule coupling 16 single-mode fiber cores with sub-micron alignment." },
      { id: "electrical_connector", name: "224G PAM4 High-Speed Gold Edge Connector", shape: "box", dimensions: [26, 3, 36], position: [52, -4, 0], color: "#eab308", opacity: 0.95, desc: "Differential electrical contact fingers mating with the main host switchboard." },
      { id: "micro_heatsink", name: "Top Micro-Fin Heat Dissipation Sink", shape: "box", dimensions: [44, 10, 36], position: [0, 14, 0], color: "#94a3b8", opacity: 0.85, desc: "High-aspect-ratio skived copper microfins shedding optoelectronic heat." }
    ],
    controls: [
      { id: "port_speed", label: "Port Data Rate", min: 50, max: 224, step: 8, default: 106, unit: "Gbps" },
      { id: "laser_power", label: "CW Laser Optical Power", min: 20, max: 120, step: 5, default: 80, unit: "mW" },
      { id: "fiber_length", label: "Optical Link Distance", min: 10, max: 500, step: 10, default: 100, unit: "m" }
    ],
    metrics: [
      { id: "switch_bw", label: "Aggregate Bandwidth", unit: "Tbps" },
      { id: "energy_per_bit", label: "Interconnect Energy", unit: "pJ/bit" },
      { id: "insertion_loss", label: "Total Optical Loss", unit: "dB" },
      { id: "thermal_dissip", label: "Module Heat Dissipation", unit: "W" }
    ],
    computeMetrics: (s) => {
      const portSpeed = parseFloat(s.port_speed ?? 106);
      const laserPower = parseFloat(s.laser_power ?? 80);
      const fiberLen = parseFloat(s.fiber_length ?? 100);
      return {
        switch_bw: ((portSpeed * 512) / 1000).toFixed(1),
        energy_per_bit: (3.2 * (laserPower / 80) * (portSpeed / 106)).toFixed(2),
        insertion_loss: (1.2 + (fiberLen / 100) * 0.35).toFixed(2),
        thermal_dissip: Math.round(620 + (laserPower * 2.2) + (portSpeed * 1.8))
      };
    }
  },

  lattice_tower: {
    id: "lattice_tower",
    name: "Lattice Transmission Pylon",
    icon: "🗼",
    category: "Grid Infrastructure & Masts",
    defaultBadge: "TRANSMISSION HARDWARE // 3D INTERACTIVE LAB",
    defaultTitle: "500kV High-Voltage Lattice Transmission Pylon",
    defaultSubtitle: "4-legged galvanized steel lattice base, waist truss, cantilever cross-arms & ceramic insulators",
    camera: { distance: 260, pitch: 0.35, yaw: 0.65 },
    components: [
      { id: "lattice_base", name: "4-Legged Tapered Steel Lattice Base", shape: "cylinder", dimensions: [14, 38, 80, 4], position: [0, -45, 0], rotation: [0, 45, 0], color: "#64748b", opacity: 0.95, desc: "Hot-dip galvanized structural steel angle lattice anchored to deep reinforced concrete footings." },
      { id: "tower_waist", name: "Structural Middle Truss Waist Column", shape: "cylinder", dimensions: [10, 14, 60, 4], position: [0, 20, 0], rotation: [0, 45, 0], color: "#475569", opacity: 0.95, desc: "Diagonally braced slender pylon section distributing wind shear and torsional wire tensions." },
      { id: "crossarm_truss", name: "Cantilever High-Tension Suspension Cross-Arms", shape: "box", dimensions: [130, 8, 12], position: [0, 38, 0], color: "#38bdf8", opacity: 0.95, desc: "Heavy cantilevered steel cross-arms providing mandatory 6-meter phase-to-phase air clearance." },
      { id: "insulator_strings", name: "Phase Suspended Ceramic Insulator String", shape: "cylinder", dimensions: [4, 4, 35, 12], position: [-55, 18, 0], color: "#00f0ff", opacity: 0.95, desc: "String of toughened disc glass/porcelain insulators preventing 500kV dielectric breakdown." },
      { id: "conductor_bundles", name: "Triple-Phase Bundle Conductor Power Lines", shape: "cylinder", dimensions: [3, 3, 160, 12], position: [0, 0, 0], rotation: [90, 0, 0], color: "#f5a623", opacity: 0.95, desc: "Quad-bundle aluminum conductors steel reinforced (ACSR) carrying gigawatts of bulk electricity." },
      { id: "shield_ground", name: "Apex Optical Ground Shield Wire (OPGW)", shape: "cylinder", dimensions: [2, 2, 160, 12], position: [0, 58, 0], rotation: [90, 0, 0], color: "#a855f7", opacity: 0.95, desc: "Topmost grounded wire containing telecommunication fiber optics and providing lightning shielding." }
    ],
    controls: [
      { id: "line_kv", label: "Line Transmission Voltage", min: 230, max: 765, step: 15, default: 500, unit: "kV" },
      { id: "current_load", label: "Conductor Current Load", min: 500, max: 3000, step: 50, default: 1800, unit: "A" },
      { id: "ambient_wind", label: "Crosswind Velocity", min: 5, max: 120, step: 5, default: 25, unit: "km/h" }
    ],
    metrics: [
      { id: "line_capacity", label: "Line Capacity", unit: "MVA" },
      { id: "corona_loss", label: "Corona Discharge Loss", unit: "kW/km" },
      { id: "thermal_sag", label: "Mid-Span Cable Sag", unit: "m" },
      { id: "fault_margin", label: "Structural Fault Margin", unit: "kA" }
    ],
    computeMetrics: (s) => {
      const kv = parseFloat(s.line_kv ?? 500);
      const amps = parseFloat(s.current_load ?? 1800);
      const wind = Math.max(1, parseFloat(s.ambient_wind ?? 25));
      return {
        line_capacity: ((kv * amps * Math.sqrt(3)) / 1000).toFixed(1),
        corona_loss: ((kv / 500) * 14.5 * (1 / Math.max(1, wind / 10))).toFixed(1),
        thermal_sag: (3.2 + (amps / 2000) * 2.8 - (wind / 30) * 0.8).toFixed(2),
        fault_margin: Math.round(45 + (kv / 500) * 18 - (amps / 1800) * 12)
      };
    }
  },

  fluid_manifold: {
    id: "fluid_manifold",
    name: "Fluid Manifold, Cryogenic Valve & Pipeline",
    icon: "🌊",
    category: "Thermal Management & Cryogenics",
    defaultBadge: "HYDRAULIC ENGINEERING // 3D INTERACTIVE LAB",
    defaultTitle: "Liquid Cooling Manifold & Cryogenic Flow Valve",
    defaultSubtitle: "Flanged fluid conduit, spherical valve body, rotary actuator, bypass ports & sensor collar",
    camera: { distance: 230, pitch: 0.45, yaw: 0.6 },
    components: [
      { id: "main_pipe", name: "Heavy-Wall Industrial Fluid Conduit", shape: "cylinder", dimensions: [20, 20, 140, 32], position: [0, 0, 0], rotation: [0, 0, 90], color: "#334155", opacity: 0.95, desc: "Corrosion-resistant 316L stainless steel pipe engineered for high-velocity dielectric fluid circulation." },
      { id: "valve_body", name: "Spherical High-Pressure Gate Valve Chamber", shape: "sphere", dimensions: [28, 24, 16], position: [0, 0, 0], color: "#475569", opacity: 0.95, desc: "Forged pressure chamber containing the precision-ground ball/gate flow modulation element." },
      { id: "actuator_head", name: "Pneumatic / Electric Rotary Actuator Head", shape: "cylinder", dimensions: [16, 16, 38, 24], position: [0, 36, 0], color: "#00f0ff", opacity: 0.95, desc: "Digital servo actuator delivering sub-millisecond valve throttling and failsafe closure." },
      { id: "branch_ports", name: "Auxiliary High-Flow Bypass Port", shape: "cylinder", dimensions: [10, 10, 50, 24], position: [0, 0, 25], rotation: [90, 0, 0], color: "#f5a623", opacity: 0.95, desc: "Branch takeoff diverting pressurized liquid to secondary heat exchangers and server cold plates." },
      { id: "sensor_collar", name: "Ultrasonic Flow & Pressure Transducer Collar", shape: "torus", dimensions: [24, 4, 16, 32], position: [-45, 0, 0], rotation: [0, 90, 0], color: "#00e599", opacity: 0.95, desc: "Non-intrusive transit-time acoustic ring sampling volumetric flow and cavitation bubbles." },
      { id: "insulation_jacket", name: "Aerogel Thermal Insulation Sleeve", shape: "cylinder", dimensions: [26, 26, 45, 32], position: [45, 0, 0], rotation: [0, 0, 90], color: "#a855f7", opacity: 0.8, desc: "Hydrophobic silica aerogel wrap preventing parasitic ambient heat ingress into chilled fluids." }
    ],
    controls: [
      { id: "flow_rate", label: "Coolant Flow Rate", min: 10, max: 200, step: 5, default: 85, unit: "LPM" },
      { id: "sys_pressure", label: "Operating Pressure", min: 2, max: 30, step: 1, default: 12, unit: "bar" },
      { id: "fluid_temp", label: "Coolant Temperature", min: 5, max: 90, step: 1, default: 38, unit: "°C" }
    ],
    metrics: [
      { id: "delta_p", label: "Hydraulic Pressure Drop", unit: "kPa" },
      { id: "reynolds_no", label: "Reynolds Number", unit: "Re" },
      { id: "heat_transfer", label: "Heat Dissipation Rate", unit: "kW" },
      { id: "valve_cv", label: "Valve Flow Coefficient", unit: "Cv" }
    ],
    computeMetrics: (s) => {
      const flow = parseFloat(s.flow_rate ?? 85);
      const press = parseFloat(s.sys_pressure ?? 12);
      const temp = parseFloat(s.fluid_temp ?? 38);
      return {
        delta_p: ((flow * 0.42) * (press / 10)).toFixed(1),
        reynolds_no: Math.round(flow * 145 * (1 + (temp - 20) * 0.015)),
        heat_transfer: ((flow * 4.184 * 18) / 60).toFixed(1),
        valve_cv: (flow / Math.sqrt(Math.max(0.5, press * 0.8))).toFixed(1)
      };
    }
  },

  satellite_bus: {
    id: "satellite_bus",
    name: "Satellite Bus & Orbital Payload",
    icon: "🛰️",
    category: "Aerospace & Space Systems",
    defaultBadge: "AEROSPACE HARDWARE // 3D INTERACTIVE LAB",
    defaultTitle: "Orbital Spacecraft Bus & Phased-Array Payload",
    defaultSubtitle: "Carbon-composite chassis, dual GaAs solar arrays, steerable AESA antenna & Hall thruster",
    camera: { distance: 240, pitch: 0.4, yaw: 0.6 },
    components: [
      { id: "bus_chassis", name: "Carbon-Composite Monocoque Satellite Bus", shape: "box", dimensions: [45, 55, 45], position: [0, 0, 0], color: "#334155", opacity: 0.95, desc: "Ultra-lightweight honeycomb carbon-fiber chassis enclosing avionics, momentum wheels, and batteries." },
      { id: "solar_wing_left", name: "Articulated GaAs Solar Array Wing - Port", shape: "box", dimensions: [75, 2, 35], position: [-62, 0, 0], color: "#0284c7", opacity: 0.95, desc: "Multi-junction triple-junction gallium arsenide photovoltaic cells delivering 3.5 kW orbital power." },
      { id: "solar_wing_right", name: "Articulated GaAs Solar Array Wing - Starboard", shape: "box", dimensions: [75, 2, 35], position: [62, 0, 0], color: "#0284c7", opacity: 0.95, desc: "Sun-tracking deployment wing with integrated thermal radiator backplanes." },
      { id: "phased_array", name: "Steerable AESA High-Throughput Phased Array", shape: "box", dimensions: [36, 36, 6], position: [0, 0, 25], color: "#00f0ff", opacity: 0.95, desc: "Active electronically scanned array with beam-steering for gigabit Earth downlink." },
      { id: "ion_thruster", name: "Krypton/Xenon Hall-Effect Electric Propulsion Thruster", shape: "cone", dimensions: [12, 18, 24], position: [0, -34, 0], rotation: [180, 0, 0], color: "#a855f7", opacity: 0.95, desc: "High-efficiency plasma thruster producing 180 mN thrust with 2,200s specific impulse." },
      { id: "payload_sensor", name: "Optical Sensor Baffle & Deep-Space Star Tracker", shape: "cylinder", dimensions: [10, 10, 24, 24], position: [0, 35, 0], color: "#f5a623", opacity: 0.95, desc: "Sub-arcsecond autonomous star camera providing precise 3-axis orbital attitude determination." }
    ],
    controls: [
      { id: "solar_angle", label: "Sun Incidence Angle", min: 0, max: 90, step: 5, default: 25, unit: "°" },
      { id: "payload_duty", label: "Payload Transmit Duty", min: 10, max: 100, step: 5, default: 75, unit: "%" },
      { id: "orbit_alt", label: "LEO Orbital Altitude", min: 350, max: 1100, step: 25, default: 550, unit: "km" }
    ],
    metrics: [
      { id: "solar_watts", label: "Solar Generation", unit: "Watts" },
      { id: "rf_eirp", label: "Radiated RF EIRP", unit: "dBW" },
      { id: "aero_drag", label: "Orbital Drag Force", unit: "mN" },
      { id: "battery_dod", label: "Battery Depth of Discharge", unit: "%" }
    ],
    computeMetrics: (s) => {
      const angle = parseFloat(s.solar_angle ?? 25);
      const duty = parseFloat(s.payload_duty ?? 75);
      const alt = parseFloat(s.orbit_alt ?? 550);
      return {
        solar_watts: Math.round(3800 * Math.cos(angle * Math.PI / 180)),
        rf_eirp: (58.5 + (duty / 100) * 8.2).toFixed(1),
        aero_drag: (120 * Math.exp(-(alt - 350) / 120)).toFixed(1),
        battery_dod: Math.round(22 + (duty / 100) * 42)
      };
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ARCHETYPE_LIBRARY };
}
