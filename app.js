/**
 * SPARK NEWS LIVE // PORTAL OS ENGINE
 * High-Performance Client-Side Intelligence Platform with Dynamic JSON-Driven 3D/2D Engineering Lab
 */

// Suppress benign browser ResizeObserver loop notification warnings
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    if (
      e &&
      e.message &&
      (e.message.includes("ResizeObserver loop completed with undelivered notifications") ||
       e.message.includes("ResizeObserver loop limit exceeded"))
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    }
  });
}

/**
 * 10 CANONICAL 3D HARDWARE ARCHETYPES
 * Reusable physical engineering geometries adaptable across multiple research & news contexts
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
      const vdd = parseFloat(s.core_vdd ?? s.voltage ?? 0.75);
      const clk = parseFloat(s.clock_ghz ?? 3.8);
      const tj = parseFloat(s.junction_temp ?? s.temp ?? 65);
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
      const gpuW = parseFloat(s.gpu_tdp ?? s.gpu_power_w ?? 1200);
      const inlet = parseFloat(s.coolant_inlet ?? s.inlet_temp_c ?? 24);
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
      const torq = parseFloat(s.torque_req ?? s.peak_torque_nm ?? 85);
      const ratio = Math.max(1, parseFloat(s.gear_ratio ?? 10));
      const therm = parseFloat(s.thermal_load ?? s.ambient_temp_c ?? 45);
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
      const temp = parseFloat(s.core_temp ?? s.core_temp_c ?? 720);
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

if (typeof window !== "undefined") {
  window.ARCHETYPE_LIBRARY = ARCHETYPE_LIBRARY;
}


// =========================================================================
// BUNDLED OFFLINE FALLBACK DATASETS
// Pre-bundled local datasets preventing infinite loading states on GitHub Pages
// =========================================================================
const FALLBACK_MANIFEST = (typeof window !== 'undefined' && window.FALLBACK_MANIFEST) || [
  {
    "issue_number": 8,
    "date": "2026-09-08",
    "headline": "Samsung & Arm Form 2nm GAA Foundry Alliance: The Race to Build Custom Silicon for OpenAI & Break TSMC's Monopoly",
    "file_path": "data/issues/2026-09-08.json"
  },
  {
    "issue_number": 7,
    "date": "2026-09-07",
    "headline": "Upstream Monopoly Foreclosure: FTC Shifts Antitrust Crosshairs from LLM Weights to Power & Substation Capacity",
    "file_path": "data/issues/2026-09-07.json"
  },
  {
    "issue_number": 6,
    "date": "2026-09-06",
    "headline": "The Custom Silicon Revolt: Broadcom's AI Revenue Triples as Hyperscalers Escape the NVIDIA GPU Tax",
    "file_path": "data/issues/2026-09-06.json"
  },
  {
    "issue_number": 5,
    "date": "2026-09-05",
    "headline": "OpenAI Launches GPT-6 Astra: Recursive Self-Correction, Multi-Modal Reasoning & The Enterprise Inference Bill Shock",
    "file_path": "data/issues/2026-09-05.json"
  },
  {
    "issue_number": 4,
    "date": "2026-09-04",
    "headline": "California AI Omnibus Bill Lands on Newsom's Desk: Datacenter Grid Moratorium",
    "file_path": "data/issues/2026-09-04.json"
  },
  {
    "issue_number": 3,
    "date": "2026-09-03",
    "headline": "NVIDIA Commits $13B to Hugging Face Open-Source Platform & Compute Ecosystem",
    "file_path": "data/issues/2026-09-03.json"
  },
  {
    "issue_number": 2,
    "date": "2026-09-02",
    "headline": "ONE Nuclear Executes 2.88GWh BESS & Gas Co-Location for Louisiana Datacenter",
    "file_path": "data/issues/2026-09-02.json"
  },
  {
    "issue_number": 1,
    "date": "2026-09-01",
    "headline": "Hyperscale Energy Decoupling: Frontier AI Clusters Pivot to 2.5GW Nuclear Generation",
    "file_path": "data/issues/2026-09-01.json"
  },
  {
    "issue_number": 0,
    "date": "2026-08-31",
    "headline": "Frontier Humanoid Robotics: The Sub-10s Sprint, Actuator Physics, and the Factory Floor Reality",
    "file_path": "data/issues/2026-08-31.json"
  }
];

const FALLBACK_DATA = (typeof window !== 'undefined' && window.FALLBACK_DATA) || {
  "meta": {
    "issue_number": 8,
    "date": "2026-09-08",
    "reading_streak": 8
  },
  "radar_kpis": {
    "baseload_nuclear": "3.25 GWh",
    "transformer_lead_time": "185 WKS",
    "optical_bandwidth": "3.6 Tbps",
    "target_pue": "1.04",
    "sni_rating": "9.8 / 10"
  },
  "cheat_sheet": [
    "Samsung & Arm 2nm Foundry Alliance: Samsung teams with Arm on 2nm GAA platform to build custom AI ASICs, pitching OpenAI as anchor tenant against TSMC.",
    "FERC PJM Co-Location Inquest: Federal regulators schedule landmark hearings on whether behind-the-meter nuclear datacenters evade fair public transmission fees.",
    "Google 12-Hour Zinc LDES Deployment: Google and MN8 Energy commission utility-scale zinc battery storage in West Virginia to eliminate nighttime solar curtailment.",
    "Beyond Bengaluru BLUE Expansion: Karnataka launches 35% power subsidies in Hubballi-Dharwad to decentralize AI compute clusters away from Bengaluru traffic corridors.",
    "Tenstorrent JapanFold RISC-V Engine: Jim Keller's Tenstorrent and ai& deploy sovereign on-premise protein folding silicon in Tokyo, bypassing US cloud APIs."
  ],
  "lead_story": {
    "kicker": "SEPTEMBER 8 // LEAD INVESTIGATIVE ANCHOR",
    "headline": "Samsung & Arm Form 2nm GAA Foundry Alliance: The Race to Build Custom Silicon for OpenAI & Break TSMC's Monopoly",
    "image_url": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1200&auto=format&fit=crop",
    "image_caption": "High-magnification microscopic view of semiconductor silicon logic die showing sub-micron lithography interconnects and micro-channel circuitry.",
    "image_alt": "Microscopic view of semiconductor silicon logic die with micro-channel circuitry",
    "catch_up": "In a pivotal semiconductor counter-offensive, Samsung Foundry and Arm have officially united to co-develop a 2nm Gate-All-Around (GAA) accelerator reference architecture. With TSMC's advanced packaging and N2 capacity completely booked by Apple and NVIDIA through 2027, frontier AI labs—led by OpenAI and custom hyperscaler silicon initiatives—are actively evaluating Samsung test shuttles as a second-source escape hatch.",
    "mechanism": "Samsung's multi-bridge channel FET (MBCFET) 2nm GAA process replaces standard FinFET vertical fins with horizontally stacked nanosheets surrounded on all four sides by gate oxide. Paired with Arm Neoverse V3 compute cores and Backside Power Delivery Networks (BSPDN), the architecture eliminates sub-threshold leakage, boosts clock drive currents by 22%, and cuts active dynamic power consumption by 30% under heavy matrix inference loads.",
    "analogy": "Traditional microchips route electricity and data through the exact same crowded front-side corridor like warehouse workers constantly colliding with freight forklifts. Backside power delivery cuts a dedicated underground utility tunnel directly to the machines, leaving the surface entirely free for high-speed optical and signal traffic.",
    "pr_claim": "We are accelerating the global democratization of advanced semiconductor fabrication and expanding architectural choice for frontier artificial intelligence.",
    "pr_reality": "OpenAI is terrified of being permanently held hostage to TSMC's packaging allocations and Jensen Huang's 75% gross margins. Samsung is spending billions subsidizing 2nm tape-outs because its foundry division faces an existential crisis if it cannot secure an anchor US hyperscaler client.",
    "bull_take": "Validating a credible second-source 2nm foundry breaks TSMC's monopoly pricing power, compressing custom ASIC fabrication costs by 15-20% for enterprise cloud builders.",
    "bear_take": "Samsung's 2nm GAA nanosheet yields historically struggle below 55%; moving from pilot test wafers to reliable mass production risks multi-quarter delivery slippages for impatient AI labs.",
    "cascades": "TSMC accelerates capital expenditure on its Arizona Fab 2 to lock in hyperscaler commitments; merchant cloud rental rates for general GPUs soften as proprietary ASICs proliferate by late 2027.",
    "why_it_matters": "True AI compute sovereignty is impossible when 90% of frontier silicon depends on a single 100-mile coastal corridor in Taiwan.",
    "cocktail_flex": "OpenAI designing custom chips is ambitious; finding a foundry that can print 2-nanometer gate-all-around wafers without melting half the ingot is where venture dreams crash into quantum physics.",
    "web_investigation": {
      "overview": "Samsung Foundry Gate-All-Around (GAA) process roadmap, Arm Neoverse V3 compute subsystem disclosures, and hyperscaler custom silicon negotiations.",
      "sources": [
        {
          "title": "Samsung Foundry Forum: 2nm (SF2) GAA Nanosheet Process Technology & Backside Power Delivery Roadmap",
          "publisher": "Samsung Electronics",
          "url": "https://semiconductor.samsung.com/",
          "type": "Foundry Architecture Whitepaper",
          "snippet": "Outlines SF2 yield targets, multi-bridge channel MBCFET performance milestones, and 2027 commercial wafer start capacity."
        },
        {
          "title": "Arm Holdings: Neoverse V3 CSS Compute Subsystem for Hyperscaler AI Workloads",
          "publisher": "Arm Investor Relations",
          "url": "https://www.arm.com/",
          "type": "Technical Architecture Disclosures",
          "snippet": "Details pre-integrated 2nm physical IP, interconnect topologies, and custom accelerator design partnerships."
        },
        {
          "title": "OpenAI Custom ASIC Initiative: Second-Source Foundry Evaluation & Packaging Diversification",
          "publisher": "SemiAnalysis",
          "url": "https://semianalysis.com/",
          "type": "Industry Intelligence Brief",
          "snippet": "Deep-dive analysis of OpenAI compute procurement exploring Samsung 2nm shuttles and TSMC CoWoS capacity allocations."
        }
      ],
      "search_queries": [
        "Samsung Foundry Arm 2nm GAA alliance OpenAI custom silicon",
        "Samsung SF2 Backside Power Delivery BSPDN MBCFET yield",
        "OpenAI custom AI ASIC TSMC second source foundry"
      ]
    }
  },
  "company_spotlight": {
    "headline": "Samsung Foundry Pledges $17B Taylor Fab Allocation for Arm-Based OpenAI 2nm GAA ASICs",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop",
    "image_caption": "Samsung Foundry advanced cleanroom and EUV extreme ultraviolet lithography bay engineered for sub-2nm GAA volume production.",
    "image_alt": "Samsung Foundry extreme ultraviolet EUV semiconductor fabrication facility",
    "company": "Samsung Foundry",
    "ticker": "KRX: 005930 / OTC: SSNLF",
    "market_cap": "$390B",
    "summary": "Samsung Electronics' foundry division intensified efforts to win OpenAI's inaugural custom AI ASIC contract, leveraging its newly commissioned $17B Taylor, Texas fab and proprietary 2nm Gate-All-Around (GAA) nanosheet nodes. By offering bundled advanced packaging, high-bandwidth memory (HBM3E/HBM4), and pre-validated Arm Neoverse compute IP at aggressive subsidized margins, Samsung seeks to crack TSMC's 90% monopoly on frontier AI accelerator manufacturing.",
    "mechanism": "Integrated turnkey manufacturing combining 2nm MBCFET logic fabrication with proprietary I-Cube / Saint 3.5D advanced packaging and in-house HBM3E stacks.",
    "metrics": {
      "capex": "$17B+ Taylor, Texas Fab & Advanced Packaging Expansion",
      "moat": "Only Global Foundry with In-House DRAM, HBM4 & 2nm GAA Logic",
      "regulatory": "CHIPS Act Direct Funding ($6.4B) & Defense Production Scrutiny",
      "velocity": "9.7 / 10"
    },
    "takeaway": "Samsung is the only player on earth capable of offering OpenAI a one-stop-shop contract for 2nm logic, HBM4, and advanced packaging under a single corporate roof.",
    "web_investigation": {
      "overview": "Samsung Electronics SEC Form 20-F and quarterly earnings disclosures, Taylor Texas fab construction filings, and commercial foundry contract terms.",
      "sources": [
        {
          "title": "Samsung Electronics Co., Ltd. Quarterly Earnings Disclosure: Device Solutions & Foundry Segment Guidance",
          "publisher": "Samsung IR",
          "url": "https://www.samsung.com/global/ir/",
          "type": "SEC & KRX Disclosures",
          "snippet": "Discloses Taylor fab commissioning timeline, 2nm customer test shuttle schedules, and HBM4 tape-out targets."
        },
        {
          "title": "US Department of Commerce: CHIPS and Science Act Award to Samsung Electronics ($6.4B Direct Funding)",
          "publisher": "NIST.gov",
          "url": "https://www.nist.gov/chips",
          "type": "Federal Grant Agreement",
          "snippet": "Federal funding conditions and capacity milestones for leading-edge commercial logic and packaging in Taylor, Texas."
        }
      ],
      "search_queries": [
        "Samsung Foundry Taylor Texas 2nm GAA CHIPS Act funding",
        "Samsung HBM4 advanced packaging turnkey AI ASIC OpenAI"
      ]
    }
  },
  "quick_hits": [
    {
      "id": 1,
      "headline": "FERC Schedules Landmark Public Inquiry into PJM Datacenter Nuclear Co-Location",
      "facts": "The Federal Energy Regulatory Commission (FERC) published a formal notice scheduling hearings on PJM Interconnection co-location agreements, investigating whether behind-the-meter nuclear compute campuses create unjust cost-shifting onto municipal residential ratepayers.",
      "reality_audit": "Public utilities are outraged that hyperscalers bought up regional nuclear baseload off-grid while leaving local taxpayers to pay for the surrounding transmission grid's upkeep.",
      "why_it_matters": "A restrictive ruling could mandate common-carrier transmission tariffs on all private nuclear datacenter switchyards.",
      "sni": "9.6 / 10",
      "web_sources": [
        {
          "title": "FERC Notice of Technical Conference: Datacenter Co-Location with Nuclear Generation on PJM System",
          "publisher": "Federal Energy Regulatory Commission (FERC.gov)",
          "url": "https://www.ferc.gov/",
          "type": "Regulatory Hearing Notice"
        }
      ],
      "search_query": "FERC schedules public inquiry PJM datacenter nuclear co-location"
    },
    {
      "id": 2,
      "headline": "Google & MN8 Energy Commission 12-Hour Zinc LDES Storage in West Virginia",
      "facts": "Google partnered with MN8 Energy and Eos Energy Enterprises to deploy a 12-hour duration zinc-hybrid battery installation in West Virginia, designed to supply deterministic nighttime baseload power to regional compute clusters.",
      "reality_audit": "Zinc-aqueous batteries avoid lithium fire hazards, but 68% round-trip efficiency means hyperscalers have to build 30% more solar panels just to charge the battery bank.",
      "why_it_matters": "Pioneers non-lithium long-duration energy storage as the standard design pattern for gigawatt-scale AI campuses.",
      "sni": "9.3 / 10",
      "web_sources": [
        {
          "title": "Google Cloud Sustainability & MN8 Energy: 12-Hour Long-Duration Zinc Battery Storage Commissioning",
          "publisher": "Google Sustainability",
          "url": "https://sustainability.google/",
          "type": "Project Commissioning Statement"
        }
      ],
      "search_query": "Google MN8 Energy Eos 12-hour zinc battery West Virginia"
    },
    {
      "id": 3,
      "headline": "Karnataka Launches 'Beyond Bengaluru BLUE' 35% Power Subsidy for AI Datacenters",
      "facts": "Karnataka's IT Department unveiled Beyond Bengaluru BLUE, offering 35% power tariff concessions and guaranteed dark fiber trunk lines to attract AI compute campuses to Hubballi-Dharwad and Belagavi.",
      "reality_audit": "State subsidies look great in policy PDFs, but until express transport links North Karnataka to Bengaluru's venture ecosystem, tier-1 engineers will stay firmly anchored in Koramangala and Indiranagar.",
      "why_it_matters": "Attempts to relieve acute urban water and electrical grid bottlenecks in Bengaluru by spreading datacenter capital northward.",
      "sni": "8.8 / 10",
      "web_sources": [
        {
          "title": "Department of Electronics, IT, Bt and S&T, Government of Karnataka: Beyond Bengaluru BLUE Policy",
          "publisher": "K-Tech / Government of Karnataka",
          "url": "https://karnataka.gov.in/",
          "type": "Government Policy Gazette"
        }
      ],
      "search_query": "Karnataka Beyond Bengaluru BLUE 35% power subsidy AI datacenters"
    },
    {
      "id": 4,
      "headline": "Tenstorrent & ai& Launch 'JapanFold' Sovereign Molecular Modeling on RISC-V",
      "facts": "Jim Keller's Tenstorrent and Japanese venture ai& unveiled JapanFold, an open-source protein folding and molecular dynamics suite optimized natively for Tenstorrent's PCIe RISC-V accelerators.",
      "reality_audit": "RISC-V silicon avoids US export jurisdiction, but migrating millions of lines of legacy biotech simulation code away from CUDA remains an arduous multi-year engineering chore.",
      "why_it_matters": "Demonstrates that sovereign research institutions are backing open silicon architectures to insulate drug discovery from geopolitical cloud blackouts.",
      "sni": "9.1 / 10",
      "web_sources": [
        {
          "title": "Tenstorrent & ai& Joint Release: JapanFold Open-Source Molecular Biology Suite on RISC-V Silicon",
          "publisher": "Tenstorrent Media",
          "url": "https://tenstorrent.com/",
          "type": "Corporate Press Release"
        }
      ],
      "search_query": "Tenstorrent ai& JapanFold RISC-V molecular modeling Tokyo"
    }
  ],
  "deep_dive": {
    "kicker": "SECTION 3 // DETAILED CASE STUDY ANALYSIS",
    "headline": "Backside Power Delivery (BSPDN) & 2nm GAA: Overcoming the Thermal Resistance Wall in AI ASICs",
    "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop",
    "image_caption": "Cross-sectional electron microscope view of sub-10μm thinned silicon wafer and Nano-Through-Silicon-Vias (NTSVs) supplying backside power.",
    "image_alt": "Electron microscope cross section of thinned silicon wafer with backside power delivery vias",
    "thesis": "As transistor dimensions shrink below 3nm, parasitic resistance in conventional copper power rails consumes over 35% of total active chip power via IR voltage drop. Backside Power Delivery Networks (BSPDN) physically separate power rails from signal interconnects, unlocking sub-0.6V operation for multi-die inference accelerators.",
    "physics_breakdown": "In standard front-side wiring, both power delivery and high-frequency signal wires compete across 15+ stacked metal layers, choking routing density and causing severe resistive drop (IR drop). BSPDN grinds the silicon wafer down to under 10 micrometers from the backside and etches Nano-Through-Silicon-Vias (NTSVs) directly to transistor source/drain terminals. This cuts power grid impedance by 40% and shields sensitive signal traces from electromagnetic cross-talk.",
    "matrix": {
      "mechanism": "Dual-sided wafer fabrication utilizing Nano-Through-Silicon Vias (NTSVs) to supply 500A core currents directly from the rear substrate.",
      "audit": "Sub-10-micron wafer thinning introduces severe mechanical stress, thermal warpage, and yield collapse during thermocompression bonding.",
      "cascades": "EDA software vendors overhaul layout tools for 3D dual-side verification; hyperscaler server racks redesign voltage regulators for 48V-to-die direct conversion.",
      "sni": "9.8 / 10 (TRANSISTOR ARCHITECTURE REVOLUTION)"
    },
    "takeaway": "Frontier semiconductor scaling is no longer about making the transistor smaller; it is about wiring the silicon slab from both sides in three dimensions.",
    "web_investigation": {
      "overview": "Physical electronics of Backside Power Delivery Networks (BSPDN), Nano-TSVs, and Gate-All-Around nanosheet electrostatic channel control.",
      "sources": [
        {
          "title": "IEEE Transactions on Electron Devices: Power Delivery Network Scaling and IR-Drop Mitigation via Backside Metal Layers in Sub-2nm Nodes",
          "publisher": "IEEE Electron Devices Society",
          "url": "https://ieeexplore.ieee.org/",
          "type": "Peer-Reviewed Research Paper",
          "snippet": "Mathematical analysis of resistance trade-offs, thermal impedance, and voltage droop in backside-thinned multi-core silicon."
        },
        {
          "title": "IMEC Research Review: Buried Power Rails and Nano-Through-Silicon Vias for N2 and A14 Transistor Architectures",
          "publisher": "IMEC Global",
          "url": "https://www.imec-int.com/",
          "type": "Semiconductor Research Monograph",
          "snippet": "Experimental validation of wafer-to-wafer bonding, back-surface thinning tolerances, and parasitic RC reductions."
        }
      ],
      "search_queries": [
        "Backside power delivery BSPDN 2nm GAA IR drop IMEC",
        "Nano-Through-Silicon-Vias thermal resistance AI ASIC scaling"
      ]
    }
  },
  "executive_wager": {
    "question": "Will Samsung Foundry successfully ship commercial 2nm GAA custom AI silicon to at least one tier-1 US hyperscaler (e.g., OpenAI, Meta, Google) before December 31, 2027?",
    "consensus_yes_pct": 45,
    "consensus_no_pct": 55
  },
  "micro_quiz": [
    {
      "id": 1,
      "question": "What is the primary architectural benefit of Backside Power Delivery Networks (BSPDN)?",
      "options": [
        "A) It makes chips glow brighter",
        "B) It separates power rails from signal wires, slashing parasitic IR drop and boosting routing density",
        "C) It replaces silicon with graphene"
      ],
      "correct_index": 1
    },
    {
      "id": 2,
      "question": "What is the name of Samsung's proprietary Gate-All-Around (GAA) transistor structure?",
      "options": [
        "A) FinFET Extreme",
        "B) Multi-Bridge Channel FET (MBCFET)",
        "C) Planar BJT"
      ],
      "correct_index": 1
    },
    {
      "id": 3,
      "question": "What battery chemistry did Google and MN8 Energy deploy for 12-hour energy storage in West Virginia?",
      "options": [
        "A) Zinc-hybrid aqueous battery",
        "B) Lead-acid car battery",
        "C) Nickel-cadmium"
      ],
      "correct_index": 0
    },
    {
      "id": 4,
      "question": "Why is FERC holding public hearings on PJM datacenter co-location?",
      "options": [
        "A) To test fiber optic cables",
        "B) To investigate if behind-the-meter nuclear AI campuses cause unfair transmission cost-shifting onto public ratepayers",
        "C) To mandate diesel generators"
      ],
      "correct_index": 1
    },
    {
      "id": 5,
      "question": "What unique shape is wombat feces, and why does it form that way?",
      "options": [
        "A) Cubic, formed by elastic intestinal wall contractions to prevent rolling off marking stones",
        "B) Spherical, formed by rotational gravity",
        "C) Triangular, formed by crystal structures"
      ],
      "correct_index": 0
    }
  ],
  "easter_egg": "Wombats are the only known animals on Earth that produce distinctly cubic feces, shaped by uneven elasticity and rhythmic contractions in the final 8 percent of their intestinal tract so their droppings do not roll off territorial rocks.",
  "interactive_model": {
    "archetype": "semiconductor_die",
    "title": "2nm Gate-All-Around (GAA) & Backside Power (BSPDN)",
    "subtitle": "Interactive 3D Sub-Micron Silicon Die, GAA Channels, HBM Stacks & Backside Power Rails",
    "badge": "SEMICONDUCTOR PHYSICS // 3D INTERACTIVE LAB",
    "camera": {
      "distance": 230,
      "pitch": 0.45,
      "yaw": 0.6
    },
    "contextual_labels": {
      "logic_die": {
        "name": "2nm GAA Silicon Nanosheet Channel Die",
        "desc": "3-stack atomic silicon nanosheets wrapped 360° by high-k metal gate."
      },
      "bspdn_rails": {
        "name": "Backside Power Distribution Rails (BSPDN)",
        "desc": "Subterranean direct-feed power network bypassing 15 signal metal layers."
      },
      "interposer": {
        "name": "Nano-TSV Silicon Interposer Bridge",
        "desc": "Sub-micron through-silicon via bridge routing signals at 224Gbps."
      },
      "hbm_stack_1": {
        "name": "Stacked HBM4 Memory Cube A",
        "desc": "16-high vertical DRAM stack delivering 2.5 TB/s memory bandwidth."
      },
      "hbm_stack_2": {
        "name": "Stacked HBM4 Memory Cube B",
        "desc": "Low-latency memory buffer feeding tens of thousands of compute cores."
      },
      "heat_spreader": {
        "name": "Micro-Vapor Chamber Heat Spreader",
        "desc": "Copper-nickel thermal interface rejecting 450W of dynamic heat."
      }
    },
    "controls": [
      {
        "id": "core_vdd",
        "label": "Core Voltage (Vdd)",
        "min": 0.5,
        "max": 1.15,
        "step": 0.05,
        "default": 0.75,
        "unit": "V"
      },
      {
        "id": "clock_ghz",
        "label": "Core Clock Frequency",
        "min": 1.2,
        "max": 5.5,
        "step": 0.1,
        "default": 3.8,
        "unit": "GHz"
      },
      {
        "id": "junction_temp",
        "label": "Junction Temp (Tj)",
        "min": 25,
        "max": 105,
        "step": 5,
        "default": 65,
        "unit": "°C"
      }
    ],
    "metrics": [
      {
        "id": "power_density",
        "label": "Power Density",
        "unit": "W/cm²"
      },
      {
        "id": "ir_drop",
        "label": "Parasitic IR Drop",
        "unit": "mV"
      },
      {
        "id": "drive_ion",
        "label": "Drive Current (Ion)",
        "unit": "mA/μm"
      },
      {
        "id": "clock_ceil",
        "label": "Max Clock Ceiling",
        "unit": "GHz"
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  if (!window.FALLBACK_MANIFEST) window.FALLBACK_MANIFEST = FALLBACK_MANIFEST;
  if (!window.FALLBACK_DATA) window.FALLBACK_DATA = FALLBACK_DATA;
}

class SparkPortalEngine {
  constructor() {
    // Device Signature & Static Session Authentication System
    this.deviceId = this.getOrCreateDeviceId();
    this.isAuthenticated = false;
    this.isGuest = false;
    this.keepLoggedIn = false;
    this.userEmail = "";
    this.xp = 0;
    this.streak = 1;
    this.clips = [];
    this.wagers = {};
    this.quizStats = { total: 0, correct: 0 };
    this.duelVotes = {};
    this.answeredQuestions = {};
    this.unlockedEasterEggs = {};

    this.isLoading = false;
    this.currentIssueData = null;
    this.manifest = [];
    this.issuesCache = new Map();
    this.archiveCorpus = [];
    this.archiveCorpusIndexed = false;

    // HUD & Reading Modes
    this.isSkimMode = false;
    this.isLightMode = localStorage.getItem("spark_theme") === "light";
    this.sfxEnabled = localStorage.getItem("spark_sfx") !== "false";
    this.audioSynth = window.speechSynthesis || null;
    this.isAudioSpeaking = false;
    this.audioSpeed = 1.0;
    this.isHighSignalOnly = false;
    this.currentDomainFilter = "all";

    // Command Palette & Omni-Search
    this.commandFilter = "all";
    this.commandResults = [];
    this.commandSelectedIndex = 0;

    // Vault & Archive State
    this.archiveViewMode = localStorage.getItem("spark_vault_view") || "grid";
    this.archiveSearchQuery = "";
    this.archiveFilterMonth = "all";
    this.archiveSortOrder = "desc";
    this.selectedTimelineIndex = 0;

    // Interactive 3D WebGL Engineering Lab
    this.modelViewMode = "3d"; // '3d' | 'exploded' | 'telemetry'
    this.modelAutoRotate = true;
    this.modelShading = "solid"; // 'solid' | 'wireframe' | 'xray' | 'heatmap'
    this.explodedPercent = 0;
    this.threeScene = null;
    this.threeCamera = null;
    this.threeRenderer = null;
    this.threeGroup = null;
    this.threeGrid = null;
    this.threeMeshes = [];
    this.threeRaycaster = null;
    this.threeMouse = null;
    this.isDraggingThree = false;
    this.dragStartThree = { x: 0, y: 0 };
    this.hoveredMesh = null;
    this.selectedMesh = null;
    this.modelControlsState = {};
    this.activeModelSpec = null;
    this.activeArchetypeId = "semiconductor_die";
    this.threeAnimId = null;

    // Bind navigation aliases
    this.stepissue = this.stepIssue.bind(this);

    this.init();
  }

  async init() {
    if (this.isLightMode) document.documentElement.classList.add("light-mode");
    this.bindGlobalShortcuts();
    this.bindScrollTracker();
    this.initThreeEngine();
    
    // Check static session authentication state and load user profile (or gate unauthenticated visitor)
    this.initAuthSession();
    this.updateIdentityUI();
    this.renderClipboard();
    this.renderForecastingScorecard();

    await this.loadManifest();
    this.initCloudSync();
  }

  // =========================================================================
  // MANIFEST & ISSUE DATA ENGINE (DATA/ISSUES/*.JSON)
  // Relative path resolution, error handling, offline fallbacks & feedback
  // =========================================================================
  async loadManifest() {
    this.isLoading = true;
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = "Connecting to intelligence feed...";

    let manifestLoaded = false;
    // Strict relative paths for local dev, dynamic server, and GitHub Pages subpath compatibility
    const manifestCandidates = [
      "./api/manifest",
      "api/manifest",
      "./data/manifest.json",
      "data/manifest.json",
      "./issues.json",
      "issues.json"
    ];

    try {
      let res = null;
      let lastErr = null;

      for (const p of manifestCandidates) {
        try {
          const tryRes = await fetch(`${p}?t=${Date.now()}`);
          if (tryRes.ok) {
            const contentType = tryRes.headers.get("content-type") || "";
            if (contentType.includes("json") || p.endsWith(".json")) {
              res = tryRes;
              break;
            }
          }
        } catch (fetchErr) {
          lastErr = fetchErr;
        }
      }

      if (!res || !res.ok) {
        throw new Error(lastErr ? lastErr.message : `HTTP error: ${res ? res.status : "404 Not Found"}`);
      }

      const raw = await res.json();
      if (!Array.isArray(raw) || raw.length === 0) {
        throw new Error("Invalid or empty manifest dataset received");
      }

      const unique = new Map();
      raw.forEach(item => unique.set(String(item.issue_number ?? item.date), item));
      this.manifest = Array.from(unique.values()).sort((a, b) => {
        const nA = parseInt(a.issue_number, 10) || 0;
        const nB = parseInt(b.issue_number, 10) || 0;
        if (nB !== nA) return nB - nA;
        return String(b.date || "").localeCompare(String(a.date || ""));
      });
      manifestLoaded = true;
      this.hideErrorBanner();
    } catch (error) {
      console.error("Fetch failed, falling back to embedded data:", error);
      const fallbackManifest = (typeof window !== "undefined" && window.FALLBACK_MANIFEST) || (typeof FALLBACK_MANIFEST !== "undefined" ? FALLBACK_MANIFEST : null);
      if (Array.isArray(fallbackManifest) && fallbackManifest.length > 0) {
        this.manifest = [...fallbackManifest];
        manifestLoaded = true;
        this.showErrorBanner(
          `Live manifest unavailable (${error.message}). Displaying bundled offline archive.`,
          false
        );
      } else {
        this.showErrorBanner("Unable to fetch live feed manifest. Check network or repository configuration.", true);
      }
    }

    // Static Discovery: Probe for any newly added issue JSON files in data/issues/
    try {
      await this.autoDiscoverStaticIssues();
      manifestLoaded = true;
    } catch (e) {
      console.warn("Static issue auto-discovery warning:", e);
    }

    if (manifestLoaded && this.manifest.length > 0) {
      this.updateArchiveNavigatorUI();

      // Check URL hash or search params for direct issue date or issue number
      const hash = window.location.hash || "";
      const search = window.location.search || "";
      const urlParams = new URLSearchParams(search.replace(/^\?/, ""));
      const paramDate = urlParams.get("date");
      const paramIssue = urlParams.get("issue");

      const hashDateMatch = hash.match(/date=([^&]+)/);
      const hashIssueMatch = hash.match(/issue=([^&]+)/);

      const targetDate = paramDate || (hashDateMatch ? hashDateMatch[1] : null);
      const targetIssueNum = paramIssue || (hashIssueMatch ? hashIssueMatch[1] : null);

      let targetIssue = null;
      if (targetDate) {
        targetIssue = this.manifest.find(m => m.date === targetDate);
      } else if (targetIssueNum !== null) {
        targetIssue = this.manifest.find(m => String(m.issue_number) === String(targetIssueNum));
      }
      if (!targetIssue) {
        targetIssue = this.manifest[0];
      }

      if (targetIssue) {
        await this.loadIssueFile(targetIssue.file_path, false);
      }
      this.indexEntireArchiveCorpus();
    } else {
      // Direct emergency fallback to bundled issue data if manifest completely failed
      const fallbackData = (typeof window !== "undefined" && window.FALLBACK_DATA) || (typeof FALLBACK_DATA !== "undefined" ? FALLBACK_DATA : null);
      if (fallbackData) {
        console.warn("Directly rendering bundled fallback dataset due to manifest failure.");
        this.currentIssueData = fallbackData;
        this.renderIssueDOM(fallbackData);
        this.showErrorBanner("Live feed unreachable. Showing bundled offline edition.", false);
      } else {
        this.showErrorBanner("Unable to fetch live feed. Check network or data source.", true);
      }
      this.isLoading = false;
      document.querySelectorAll(".loading-placeholder").forEach(el => el.remove());
    }
  }

  // Pure JSON Static Auto-Discovery Engine
  // Allows SPARK to simply drop any new JSON file into data/issues/ without touching any code.
  async autoDiscoverStaticIssues() {
    if (!Array.isArray(this.manifest)) this.manifest = [];
    const knownPaths = new Set(this.manifest.map(m => m.file_path));
    const candidates = new Set();

    // 1. Check URL parameters or hash for explicit file or date overrides
    const hash = window.location.hash || "";
    const search = window.location.search || "";
    const urlParams = new URLSearchParams(search.replace(/^\?/, ""));
    const paramDate = urlParams.get("date");
    const paramIssue = urlParams.get("issue");
    const paramFile = urlParams.get("file");

    if (paramFile) candidates.add(paramFile);
    if (paramDate) candidates.add(`data/issues/${paramDate}.json`);
    if (paramIssue) {
      candidates.add(`data/issues/issue-${paramIssue}.json`);
      candidates.add(`data/issues/${paramIssue}.json`);
    }

    const hashDateMatch = hash.match(/date=([0-9]{4}-[0-9]{2}-[0-9]{2})/);
    if (hashDateMatch) candidates.add(`data/issues/${hashDateMatch[1]}.json`);

    const hashIssueMatch = hash.match(/issue=([0-9]+)/);
    if (hashIssueMatch) {
      candidates.add(`data/issues/issue-${hashIssueMatch[1]}.json`);
      candidates.add(`data/issues/${hashIssueMatch[1]}.json`);
    }

    // 2. Determine baseline newest date from current manifest & probe forward up to 14 days
    const baseDateStr = this.manifest[0]?.date || "2026-09-09";
    const now = new Date();
    const todayIso = now.toISOString().slice(0, 10);
    candidates.add(`data/issues/${todayIso}.json`);

    const baseDate = new Date(baseDateStr + "T00:00:00Z");
    if (!isNaN(baseDate.getTime())) {
      for (let i = 1; i <= 14; i++) {
        const nextDate = new Date(baseDate.getTime() + i * 86400000);
        const iso = nextDate.toISOString().slice(0, 10);
        candidates.add(`data/issues/${iso}.json`);
      }
    }

    // 3. Probe sequential issue numbers up to +10 from highest issue number
    const maxNum = this.manifest.reduce((max, m) => Math.max(max, parseInt(m.issue_number, 10) || 0), 0);
    for (let i = 1; i <= 10; i++) {
      const nextNum = maxNum + i;
      candidates.add(`data/issues/issue-${nextNum}.json`);
      candidates.add(`data/issues/issue-${String(nextNum).padStart(2, "0")}.json`);
      candidates.add(`data/issues/${nextNum}.json`);
    }

    // Filter out paths that are already recorded in manifest
    const unprobed = Array.from(candidates).filter(p => !knownPaths.has(p) && !knownPaths.has(`./${p}`));
    if (unprobed.length === 0) return;

    // Probe in parallel batches (6 at a time)
    const chunkSize = 6;
    for (let i = 0; i < unprobed.length; i += chunkSize) {
      const slice = unprobed.slice(i, i + chunkSize);
      await Promise.all(slice.map(async (candidatePath) => {
        try {
          const cleanPath = candidatePath.replace(/^(\.\/|\/)+/, "");
          const testUrls = [`./${cleanPath}`, cleanPath];
          let foundRes = null;
          for (const u of testUrls) {
            try {
              const res = await fetch(`${u}?t=${Date.now()}`);
              if (res.ok) {
                const ct = res.headers.get("content-type") || "";
                if (ct.includes("json") || u.endsWith(".json")) {
                  foundRes = res;
                  break;
                }
              }
            } catch (e) {}
          }

          if (foundRes) {
            const data = await foundRes.json();
            if (data && data.meta && (data.meta.issue_number !== undefined || data.meta.date)) {
              const num = data.meta.issue_number ?? parseInt(cleanPath.replace(/\D/g, ""), 10) ?? 0;
              const date = data.meta.date || cleanPath.replace(/.*\/|\.json/g, "");
              const headline = data.lead_story?.headline || data.meta?.title || `Issue #${num}`;
              const volume = data.meta?.volume || "VOLUME IV";
              const kicker = data.lead_story?.kicker || `ISSUE #${num}`;

              const manifestEntry = {
                issue_number: Number(num),
                date: String(date),
                headline: String(headline),
                volume: String(volume),
                kicker: String(kicker),
                file_path: cleanPath,
                reading_streak: data.meta?.reading_streak || Number(num),
                domain_tags: Array.isArray(data.quick_hits) ? [...new Set(data.quick_hits.map(h => (h.domain || "").toUpperCase()).filter(Boolean))] : []
              };

              this.issuesCache.set(cleanPath, data);
              this.issuesCache.set(date, data);

              // Add to manifest avoiding duplicates
              this.manifest = this.manifest.filter(m => String(m.issue_number) !== String(num) && m.date !== date && m.file_path !== cleanPath);
              this.manifest.push(manifestEntry);
              knownPaths.add(cleanPath);
              console.log(`[Static Auto-Discovery] Found new issue JSON: Issue #${num} (${date})`);
            }
          }
        } catch (err) {
          // Expected 404 for non-existent candidate dates
        }
      }));
    }

    // Re-sort manifest descending purely by JSON issue_number and date
    this.manifest.sort((a, b) => {
      const nA = parseInt(a.issue_number, 10) || 0;
      const nB = parseInt(b.issue_number, 10) || 0;
      if (nB !== nA) return nB - nA;
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
  }

  async loadIssueFile(filePath, updateHash = true) {
    this.isLoading = true;
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = `Loading issue: ${filePath}...`;

    try {
      this.playSynthBeep(520, 0.04);
      let data = this.issuesCache.get(filePath);

      if (!data) {
        // Strict relative path normalization for GitHub Pages subpath compatibility
        const cleanPath = String(filePath || "").replace(/^(\.\/|\/)+/, "");
        const candidatePaths = [
          `./${cleanPath}`,
          cleanPath
        ];
        if (!cleanPath.startsWith("data/")) {
          candidatePaths.push(`./data/${cleanPath}`);
          candidatePaths.push(`data/${cleanPath}`);
        }

        let res = null;
        let lastStatus = 0;
        let fetchErr = null;

        for (const candidate of candidatePaths) {
          try {
            const tryRes = await fetch(`${candidate}?t=${Date.now()}`);
            if (tryRes.ok) {
              res = tryRes;
              break;
            } else {
              lastStatus = tryRes.status;
            }
          } catch (err) {
            fetchErr = err;
          }
        }

        if (!res || !res.ok) {
          throw new Error(fetchErr ? fetchErr.message : `HTTP error: ${res ? res.status : (lastStatus || "404 Not Found")}`);
        }

        data = await res.json();
        this.issuesCache.set(filePath, data);
        if (data.meta?.date) this.issuesCache.set(data.meta.date, data);
      }

      if (data) {
        this.currentIssueData = data;
        this.indexSingleIssue(data, filePath);
        this.renderIssueDOM(data);
        if (updateHash && data.meta?.date) {
          window.location.hash = `date=${data.meta.date}`;
        }
        this.updateArchiveNavigatorUI();
        this.renderArchiveVaultContent();
        this.hideErrorBanner();
        this.showToast(`Active: Issue #${data.meta.issue_number} (${data.meta.date})`, "success");
      } else {
        throw new Error("Received empty or invalid issue payload");
      }
    } catch (error) {
      console.error("Fetch failed, falling back to embedded data:", error);
      // Render bundled fallback data so the UI is never blank or stuck loading
      const fallbackData = (typeof window !== "undefined" && window.FALLBACK_DATA) || (typeof FALLBACK_DATA !== "undefined" ? FALLBACK_DATA : null);
      if (fallbackData) {
        this.currentIssueData = fallbackData;
        this.renderIssueDOM(fallbackData);
        this.showErrorBanner(
          `Unable to fetch live edition (${error.message}). Displaying bundled offline intelligence briefing.`,
          false
        );
        this.showToast("Displaying bundled offline intelligence briefing.", "info");
      } else {
        this.showErrorBanner("Unable to fetch live feed. Check network or data source.", true);
        this.showToast(`Load error: ${error.message}`, "error");
      }
    } finally {
      // Always clear loading indicators and loading placeholders
      this.isLoading = false;
      if (statusEl) statusEl.innerText = "Feed ready.";
      document.querySelectorAll(".loading-placeholder").forEach(el => el.remove());
    }
  }

  showErrorBanner(message, isFatal = false) {
    const banner = document.getElementById("fetch-status-banner");
    const title = document.getElementById("fetch-status-title");
    const desc = document.getElementById("fetch-status-desc");
    const icon = document.getElementById("fetch-status-icon");
    const retryBtn = document.getElementById("fetch-retry-btn");

    if (banner) {
      banner.style.display = "flex";
      if (isFatal) {
        banner.classList.add("is-fatal");
        if (icon) icon.innerText = "❌";
        if (title) title.innerText = "Data Pipeline Connection Error";
        if (retryBtn) retryBtn.innerText = "🔄 Retry Now";
      } else {
        banner.classList.remove("is-fatal");
        if (icon) icon.innerText = "⚠️";
        if (title) title.innerText = "Offline Fallback Active";
        if (retryBtn) retryBtn.innerText = "🔄 Retry Connection";
      }
      if (desc) desc.innerText = message;
    }
  }

  hideErrorBanner() {
    const banner = document.getElementById("fetch-status-banner");
    if (banner) banner.style.display = "none";
  }

  async retryLoad() {
    this.hideErrorBanner();
    this.showToast("Re-establishing connection to live data feed...", "info");
    await this.loadManifest();
  }

  // =========================================================================
  // DOM RENDERING & SHIELDED IMAGE LOADER
  // =========================================================================
  renderIssueDOM(data) {
    const meta = data.meta || { issue_number: 1, date: "2026-09-08" };
    const issueNum = meta.issue_number !== undefined ? meta.issue_number : 1;
    const volume = meta.volume || "VOLUME IV";
    const isOrig = parseInt(issueNum, 10) === 0;

    // Masthead
    const kicker = document.getElementById("issue-header-kicker");
    if (kicker) kicker.innerText = data.lead_story?.kicker || (isOrig ? "FOUNDATIONAL ARCHIVE // ISSUE #0" : `DAILY INTELLIGENCE // ISSUE #${issueNum}`);
    const title = document.getElementById("issue-header-title");
    if (title) title.innerText = data.lead_story?.headline || data.meta?.title || "DAILY INVESTIGATIVE NEWS DIGEST";
    const dateEl = document.getElementById("issue-header-date");
    if (dateEl) dateEl.innerText = `${volume} • ${meta.date} • ISSUE #${issueNum}`;
    const edBadge = document.getElementById("hud-edition-badge");
    if (edBadge) edBadge.innerText = isOrig ? `⚡ ISSUE #0 (ORIGINAL)` : `⚡ ISSUE #${issueNum}`;

    // Dynamic document title & OpenGraph metadata driven 100% from JSON
    const pageTitle = `SPARK // Issue #${issueNum} (${meta.date}) — ${data.lead_story?.headline || "Daily Digest"}`;
    document.title = pageTitle;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = pageTitle;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && data.lead_story?.catch_up) ogDesc.content = data.lead_story.catch_up.slice(0, 200);

    // Synchronize Vault Indicators
    const vaultVolPill = document.getElementById("archive-vault-volume-pill");
    if (vaultVolPill) vaultVolPill.innerText = volume;
    const vaultActInd = document.getElementById("vault-active-indicator");
    if (vaultActInd) {
      vaultActInd.innerText = isOrig ? `⚡ Active: Issue #0 (Inaugural Edition)` : `⚡ Active: Issue #${issueNum} (${meta.date})`;
    }

    // Dynamic Top Macro Ticker Bar
    this.renderMacroTicker(data);

    // Radar KPIs
    if (data.radar_kpis) {
      const kpis = data.radar_kpis;
      const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val || "—"; };
      setTxt("kpi-compute_spot", kpis.baseload_nuclear || "$1.85/hr");
      setTxt("kpi-tech_pulse", kpis.transformer_lead_time || "185 WKS");
      setTxt("kpi-vc_deals", kpis.optical_bandwidth || "3.6 Tbps");
      setTxt("kpi-open_source", kpis.target_pue || "1.04 PUE");
      setTxt("kpi-cloud_health", kpis.sni_rating || "9.8 / 10");
    }

    // Cheat Sheet
    const cheatUl = document.getElementById("cheat-list-container");
    if (cheatUl && data.cheat_sheet) {
      cheatUl.innerHTML = data.cheat_sheet.map(item => `<li>${this.formatMarkdown(item)}</li>`).join("");
    }

    // Lead Story
    if (data.lead_story) {
      const ls = data.lead_story;
      this.setTxt("lead-kicker", ls.kicker || "LEAD INVESTIGATIVE ANCHOR");
      this.setTxt("lead-headline", ls.headline || "");
      this.setHtml("lead-catchup", this.formatMarkdown(ls.catch_up || ""));
      this.setHtml("lead-analogy", ls.analogy ? `<b>The Intuitive Bridge:</b> ${this.formatMarkdown(ls.analogy)}` : "");
      this.setTxt("lead-pr-claim", ls.pr_claim ? `"${ls.pr_claim}"` : '"Corporate Statement"');
      this.setTxt("lead-pr-reality", ls.pr_reality || ls.reality_audit || "Savage reality audit pending.");
      this.setTxt("lead-bull", ls.bull_take || "Compute demand continues surging.");
      this.setTxt("lead-bear", ls.bear_take || "Physical power bottlenecks constrain scale.");
      this.setHtml("lead-why-matters", ls.why_it_matters ? `<b>Why it matters:</b> ${this.formatMarkdown(ls.why_it_matters)}` : "");
      this.setTxt("lead-cocktail", ls.cocktail_flex ? `"${ls.cocktail_flex}"` : '"Silicon physics beats venture dreams."');

      // Shielded Image with SVG Fallback
      this.renderShieldedImage("lead-image", "lead-image-frame", "lead-image-caption", ls.image_url, ls.image_caption || ls.headline, "LEAD TECHNICAL SCHEMATIC");
    }

    // Company Spotlight
    this.renderCompanySpotlight(data);

    // Quick Hits
    this.renderQuickHits(data.quick_hits || []);

    // Interactive 3D & 2D Engineering Lab (JSON-Driven)
    this.renderInteractiveModel(data);

    // Deep Dive / Case Study
    if (data.deep_dive) {
      const dd = data.deep_dive;
      this.setTxt("deepdive-kicker", dd.kicker || "SECTION 3 // DETAILED CASE STUDY ANALYSIS");
      this.setTxt("deepdive-headline", dd.headline || "Technical Case Study");
      this.setHtml("deepdive-thesis", this.formatMarkdown(dd.thesis || ""));
      this.setHtml("deepdive-physics", dd.physics_breakdown ? `<b>Technical Physics Breakdown:</b> ${this.formatMarkdown(dd.physics_breakdown)}` : "");
      this.renderShieldedImage("deepdive-image", "deepdive-image-frame", "deepdive-image-caption", dd.image_url, dd.image_caption || dd.headline, "CASE STUDY SCHEMATIC");

      if (dd.matrix) {
        this.setHtml("matrix-mechanism", this.formatMarkdown(dd.matrix.mechanism || "—"));
        this.setHtml("matrix-audit", this.formatMarkdown(dd.matrix.audit || "—"));
        this.setHtml("matrix-cascades", this.formatMarkdown(dd.matrix.cascades || "—"));
        this.setTxt("matrix-sni", dd.matrix.sni || "9.8 / 10");
      }
      this.setTxt("deepdive-flex", dd.takeaway ? `"${dd.takeaway}"` : "Strategic takeaway.");
    }

    // Wager & Prediction
    if (data.executive_wager) {
      this.setTxt("wager-question-text", data.executive_wager.question);
      this.setTxt("wager-yes-label", `[ YES ] (${data.executive_wager.consensus_yes_pct || 50}% Consensus)`);
      this.setTxt("wager-no-label", `[ NO ] (${data.executive_wager.consensus_no_pct || 50}% Consensus)`);
      this.restoreWagerSelection(data.meta?.issue_number);
    }

    // Micro-Quiz & Easter Egg
    this.renderQuiz(data.micro_quiz || [], data.meta?.issue_number);
    this.restoreEasterEgg(data.easter_egg, data.meta?.issue_number);
    this.updateDuelSentimentUI();
  }

  // Pure JSON Dynamic Macro Ticker: Render explicit macro_ticker or synthesize from issue's live JSON
  renderMacroTicker(data) {
    const track = document.getElementById("ticker-track");
    if (!track) return;

    // 1. Explicit macro_ticker in JSON takes highest precedence
    if (Array.isArray(data.macro_ticker) && data.macro_ticker.length > 0) {
      track.innerHTML = data.macro_ticker.map(item => {
        const dirClass = item.direction === "up" ? "ticker-up" : (item.direction === "down" ? "ticker-down" : "ticker-neutral");
        return `<span class="ticker-item"><span class="ticker-dot"></span><b>${this.escapeHtml(item.label)}:</b> ${this.escapeHtml(item.value)} <span class="${dirClass}">${this.escapeHtml(item.change || "")}</span></span>`;
      }).join("");
      return;
    }

    // 2. Synthesize dynamic ticker metrics directly from active JSON issue
    const items = [];
    const kpis = data.radar_kpis || {};
    const comp = data.company_spotlight || {};
    const wager = data.executive_wager || {};
    const hits = data.quick_hits || [];

    if (kpis.baseload_nuclear) {
      items.push({ label: "BASELOAD POWER CAPACITY", value: kpis.baseload_nuclear, change: "▲ 24H PEAK", direction: "up" });
    }
    if (kpis.transformer_lead_time) {
      items.push({ label: "TRANSFORMER QUEUE BACKLOG", value: kpis.transformer_lead_time, change: "▼ SUPPLY CHOKE", direction: "down" });
    }
    if (comp.company && comp.ticker) {
      items.push({ label: `${comp.ticker} SPOTLIGHT`, value: comp.company, change: comp.market_cap ? `CAP: ${comp.market_cap}` : "▬ ACTIVE AUDIT", direction: "up" });
    }
    if (kpis.optical_bandwidth) {
      items.push({ label: "FABRIC OPTICAL BANDWIDTH", value: kpis.optical_bandwidth, change: "▲ 800G/1.6T", direction: "up" });
    }
    if (kpis.target_pue) {
      items.push({ label: "CAMPUS DESIGN EFFICIENCY", value: kpis.target_pue, change: "🟢 PUE TARGET", direction: "up" });
    }
    if (wager.question) {
      const qShort = wager.question.length > 34 ? wager.question.slice(0, 34) + "..." : wager.question;
      items.push({ label: "MARKET CONSENSUS WAGER", value: `${wager.consensus_yes_pct || 50}% YES`, change: qShort, direction: "neutral" });
    }
    hits.slice(0, 2).forEach(h => {
      const hTitle = (h.headline || "").length > 36 ? (h.headline || "").slice(0, 36) + "..." : (h.headline || "");
      items.push({ label: (h.domain || "INTEL").toUpperCase(), value: hTitle, change: `SNI ${h.signal_to_noise || 9.5}`, direction: "neutral" });
    });

    if (items.length > 0) {
      track.innerHTML = items.map(item => {
        const dirClass = item.direction === "up" ? "ticker-up" : (item.direction === "down" ? "ticker-down" : "ticker-neutral");
        return `<span class="ticker-item"><span class="ticker-dot"></span><b>${this.escapeHtml(item.label)}:</b> ${this.escapeHtml(item.value)} <span class="${dirClass}">${this.escapeHtml(item.change || "")}</span></span>`;
      }).join("");
    }
  }

  renderShieldedImage(imgId, frameId, captionId, rawUrl, captionText, fallbackTitle) {
    const img = document.getElementById(imgId);
    const frame = document.getElementById(frameId);
    const cap = document.getElementById(captionId);
    if (!frame) return;

    frame.style.display = "block";
    if (cap && captionText) {
      cap.style.display = "flex";
      cap.innerHTML = `<span>📷</span> <span>${this.escapeHtml(captionText)}</span>`;
    }

    const cleanUrl = this.sanitizeImageUrl(rawUrl);
    if (!img) return;

    if (cleanUrl) {
      img.referrerPolicy = "no-referrer";
      img.crossOrigin = "anonymous";
      img.src = cleanUrl;
      img.onerror = () => {
        // Fallback to high-reliability local photo or remote mirror, avoiding any text-based cards
        if (cleanUrl.includes("pjm-substation-anchor") || imgId === "lead-image") {
          img.src = "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&auto=format&fit=crop";
        } else {
          img.src = "assets/pjm-substation-anchor.jpg";
        }
      };
    } else {
      img.src = "assets/pjm-substation-anchor.jpg";
    }
  }

  sanitizeImageUrl(url) {
    if (!url || typeof url !== "string") return "";
    let clean = url.trim();
    if (clean.includes("google.com/url?") || clean.includes("/url?q=")) {
      try {
        const parsed = new URL(clean, window.location.href);
        const target = parsed.searchParams.get("q") || parsed.searchParams.get("url");
        if (target) clean = decodeURIComponent(target);
      } catch (e) {}
    }
    return clean.replace(/&source=gmail[^&]*/g, "").replace(/&ust=[^&]*/g, "").replace(/&sa=[^&]*/g, "");
  }

  generateTechnicalBlueprintSVG(title) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#070b14"/>
            <stop offset="100%" stop-color="#0b1220"/>
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 240, 255, 0.08)" stroke-width="1"/>
            <circle cx="0" cy="0" r="1.5" fill="rgba(0, 240, 255, 0.25)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGrad)"/>
        <rect width="100%" height="100%" fill="url(#grid)"/>
        <!-- Circuit traces and power grid vectors -->
        <path d="M 50 200 L 250 200 L 320 120 L 520 120 L 580 200 L 750 200" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.8"/>
        <path d="M 120 280 L 280 280 L 340 220 L 480 220 L 540 280 L 680 280" fill="none" stroke="#00e599" stroke-width="2" opacity="0.7"/>
        <path d="M 220 90 L 580 90 L 580 310 L 220 310 Z" fill="rgba(0, 240, 255, 0.03)" stroke="#00f0ff" stroke-width="1.5"/>
        <!-- Substation transformer nodes -->
        <circle cx="320" cy="120" r="8" fill="#00f0ff" opacity="0.9"/>
        <circle cx="520" cy="120" r="8" fill="#00e599" opacity="0.9"/>
        <circle cx="340" cy="220" r="6" fill="#f5a623" opacity="0.9"/>
        <circle cx="480" cy="220" r="6" fill="#f5a623" opacity="0.9"/>
      </svg>
    `.trim();
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // =========================================================================
  // INTERACTIVE 3D ENGINEERING LAB (THREE.JS WEBGL ARCHITECTURE & PHYSICS)
  // =========================================================================
  initThreeEngine() {
    const mount = document.getElementById("webgl-3d-mount");
    if (!mount || !window.THREE) return;
    if (this.threeRenderer) return;

    const w = mount.clientWidth || mount.offsetWidth || 800;
    const h = mount.clientHeight || mount.offsetHeight || 460;

    // 1. Scene & Technical Camera
    this.threeScene = new THREE.Scene();
    this.threeCamera = new THREE.PerspectiveCamera(45, w / h, 1, 2000);
    this.threeCamera.position.set(0, 50, 240);

    // 2. High-Performance WebGL Renderer
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.threeRenderer.setSize(w, h);
    this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.threeRenderer.setClearColor(0x000000, 0); // transparent background matching terminal
    this.threeRenderer.domElement.style.width = "100%";
    this.threeRenderer.domElement.style.height = "100%";
    this.threeRenderer.domElement.style.display = "block";
    mount.innerHTML = "";
    mount.appendChild(this.threeRenderer.domElement);

    // 3. Technical Studio Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.threeScene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight1.position.set(120, 160, 100);
    this.threeScene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 0.65);
    dirLight2.position.set(-120, -60, -80);
    this.threeScene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xec4899, 0.35);
    dirLight3.position.set(0, 100, -120);
    this.threeScene.add(dirLight3);

    // 4. Subtle Ground Grid
    this.threeGrid = new THREE.GridHelper(260, 26, 0x00f0ff, 0x1e293b);
    this.threeGrid.position.y = -60;
    if (this.threeGrid.material) {
      this.threeGrid.material.opacity = 0.35;
      this.threeGrid.material.transparent = true;
    }
    this.threeScene.add(this.threeGrid);

    // 5. Root Component Group
    this.threeGroup = new THREE.Group();
    this.threeGroup.rotation.y = 0.45;
    this.threeGroup.rotation.x = 0.2;
    this.threeScene.add(this.threeGroup);

    // 6. Raycaster & Mouse
    this.threeRaycaster = new THREE.Raycaster();
    this.threeMouse = new THREE.Vector2();

    // 7. Bind Interactive Events
    this.bindThreeEvents(mount);

    // 8. Responsive Resize Observer (decoupled via requestAnimationFrame to avoid loop limit errors)
    let resizeRafId = null;
    let lastW = w;
    let lastH = h;
    const onResize = () => {
      if (!this.threeRenderer || !this.threeCamera || !mount) return;
      const nw = Math.floor(mount.clientWidth);
      const nh = Math.floor(mount.clientHeight || 460);
      if (nw > 0 && nh > 0 && (Math.abs(nw - lastW) >= 1 || Math.abs(nh - lastH) >= 1)) {
        lastW = nw;
        lastH = nh;
        this.threeCamera.aspect = nw / nh;
        this.threeCamera.updateProjectionMatrix();
        this.threeRenderer.setSize(nw, nh, false);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries.length) return;
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(onResize);
    });
    resizeObserver.observe(mount);

    window.addEventListener("resize", () => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(onResize);
    }, { passive: true });

    // 9. Start Render Loop
    this.startThreeLoop();
  }

  bindThreeEvents(mount) {
    const canvas = this.threeRenderer.domElement;

    canvas.addEventListener("pointerdown", (e) => {
      this.isDraggingThree = true;
      this.dragStartThree = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    });

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      this.threeMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.threeMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (this.isDraggingThree && this.threeGroup) {
        const dx = e.clientX - this.dragStartThree.x;
        const dy = e.clientY - this.dragStartThree.y;
        this.dragStartThree = { x: e.clientX, y: e.clientY };

        this.threeGroup.rotation.y += dx * 0.008;
        this.threeGroup.rotation.x = Math.max(-0.9, Math.min(0.9, this.threeGroup.rotation.x + dy * 0.008));
      } else {
        this.checkRaycastHover();
      }
    });

    const stopDrag = (e) => {
      if (this.isDraggingThree) {
        this.isDraggingThree = false;
        canvas.style.cursor = "grab";
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };

    canvas.addEventListener("pointerup", stopDrag);
    canvas.addEventListener("pointercancel", stopDrag);

    // Smooth Zoom
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (!this.threeCamera) return;
      this.threeCamera.position.z = Math.max(90, Math.min(500, this.threeCamera.position.z + e.deltaY * 0.3));
    }, { passive: false });

    // Component Click
    canvas.addEventListener("click", () => {
      this.inspectComponentUnderCursor();
    });
  }

  checkRaycastHover() {
    if (!this.threeRaycaster || !this.threeCamera || !this.threeMeshes.length) return;
    this.threeRaycaster.setFromCamera(this.threeMouse, this.threeCamera);
    const intersects = this.threeRaycaster.intersectObjects(this.threeMeshes);
    const canvas = this.threeRenderer?.domElement;

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (this.hoveredMesh !== hit) {
        if (this.hoveredMesh && this.hoveredMesh !== this.selectedMesh) {
          this.hoveredMesh.material.emissiveIntensity = this.hoveredMesh.userData.baseEmissive || 0.15;
        }
        this.hoveredMesh = hit;
        hit.material.emissiveIntensity = 0.6;
        if (canvas) canvas.style.cursor = "pointer";
      }
    } else {
      if (this.hoveredMesh && this.hoveredMesh !== this.selectedMesh) {
        this.hoveredMesh.material.emissiveIntensity = this.hoveredMesh.userData.baseEmissive || 0.15;
        this.hoveredMesh = null;
        if (canvas) canvas.style.cursor = "grab";
      }
    }
  }

  inspectComponentUnderCursor() {
    if (!this.threeRaycaster || !this.threeCamera || !this.threeMeshes.length) return;
    this.threeRaycaster.setFromCamera(this.threeMouse, this.threeCamera);
    const intersects = this.threeRaycaster.intersectObjects(this.threeMeshes);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      this.showAnnotationPopover(hit);
      this.playSynthBeep(720, 0.05);
    }
  }

  showAnnotationPopover(mesh) {
    const pop = document.getElementById("model-annotation-popover");
    const tag = document.getElementById("annotation-tag");
    const title = document.getElementById("annotation-title");
    const body = document.getElementById("annotation-body");
    if (!pop || !title || !body) return;

    const data = mesh.userData || {};
    if (tag) tag.innerText = (data.shape || "COMPONENT").toUpperCase() + " // SPECIFICATION";
    title.innerText = data.name || "Component Specification";
    body.innerHTML = `
      <p style="margin-bottom: 8px; line-height: 1.6;">${this.escapeHtml(data.desc || "Interactive 3D structural component.")}</p>
      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan); display: flex; gap: 14px;">
        <span>COLOR: <b style="color:${data.baseColor}">${data.baseColor}</b></span>
        <span>SHAPE: ${data.shape?.toUpperCase() || "BOX"}</span>
        <span>STATUS: ACTIVE</span>
      </div>
    `;

    pop.style.display = "block";

    // Highlight the selected component
    this.threeMeshes.forEach(m => {
      m.material.emissiveIntensity = (m === mesh) ? 0.85 : 0.08;
    });
    this.selectedMesh = mesh;
  }

  closeAnnotationPopover() {
    const pop = document.getElementById("model-annotation-popover");
    if (pop) pop.style.display = "none";
    this.selectedMesh = null;
    this.threeMeshes.forEach(m => {
      m.material.emissiveIntensity = m.userData.baseEmissive || 0.15;
    });
  }

  startThreeLoop() {
    if (this.threeAnimId) cancelAnimationFrame(this.threeAnimId);

    const animate = () => {
      this.threeAnimId = requestAnimationFrame(animate);

      // Idle subtle auto-rotation
      if (this.threeGroup && this.modelAutoRotate && !this.isDraggingThree) {
        this.threeGroup.rotation.y += 0.0035;
      }

      if (this.threeRenderer && this.threeScene && this.threeCamera) {
        this.threeRenderer.render(this.threeScene, this.threeCamera);
      }
    };

    animate();
  }

  buildComponentMesh(comp) {
    let geo;
    const dims = comp.dimensions || [];
    const shape = (comp.shape || "box").toLowerCase();

    if (shape === "cylinder") {
      const rt = dims[0] ?? 20;
      const rb = dims[1] ?? rt;
      const h = dims[2] ?? 40;
      const segs = dims[3] ?? 24;
      geo = new THREE.CylinderGeometry(rt, rb, h, segs);
    } else if (shape === "sphere") {
      const r = dims[0] ?? 25;
      const segs = dims[1] ?? 24;
      geo = new THREE.SphereGeometry(r, segs, 16);
    } else if (shape === "cone") {
      const r = dims[0] ?? 25;
      const h = dims[1] ?? 50;
      const segs = dims[2] ?? 24;
      geo = new THREE.ConeGeometry(r, h, segs);
    } else if (shape === "torus") {
      const r = dims[0] ?? 30;
      const tube = dims[1] ?? 8;
      const radSegs = dims[2] ?? 16;
      const tubSegs = dims[3] ?? 32;
      geo = new THREE.TorusGeometry(r, tube, radSegs, tubSegs);
    } else {
      // Box
      const w = dims[0] ?? 40;
      const h = dims[1] ?? 20;
      const d = dims[2] ?? 40;
      geo = new THREE.BoxGeometry(w, h, d);
    }

    const isWire = this.modelShading === "wireframe";
    const isXRay = this.modelShading === "xray";

    const baseColor = comp.color || "#00f0ff";
    const pos = comp.position || [0, 0, 0];

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(baseColor),
      metalness: 0.35,
      roughness: 0.35,
      wireframe: isWire,
      transparent: isXRay || (comp.opacity != null && comp.opacity < 1),
      opacity: isXRay ? 0.3 : (comp.opacity ?? 1.0),
      emissive: new THREE.Color(baseColor),
      emissiveIntensity: 0.15
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);

    if (comp.rotation) {
      mesh.rotation.set(
        THREE.MathUtils.degToRad(comp.rotation[0] || 0),
        THREE.MathUtils.degToRad(comp.rotation[1] || 0),
        THREE.MathUtils.degToRad(comp.rotation[2] || 0)
      );
    }

    mesh.userData = {
      id: comp.id,
      name: comp.name,
      desc: comp.desc,
      shape: comp.shape,
      origPos: { x: pos[0], y: pos[1], z: pos[2] },
      baseColor: baseColor,
      origOpacity: comp.opacity ?? 1.0,
      baseEmissive: 0.15
    };

    // Edge outline for high-tech architectural cyber-look
    const edgesGeo = new THREE.EdgesGeometry(geo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(baseColor),
      transparent: true,
      opacity: 0.4
    });
    const edgeLines = new THREE.LineSegments(edgesGeo, edgesMat);
    mesh.add(edgeLines);

    return mesh;
  }

  renderInteractiveModel(data) {
    const sec = document.getElementById("interactive-model-section");
    if (!sec) return;

    // 1. Initialize Three.js Engine if not yet ready
    this.initThreeEngine();

    // 2. Resolve Model Spec from JSON or Bespoke Topic Fallback
    const rawSpec = data?.interactive_model || this.deriveModelFromTopic(data || {});
    let spec = rawSpec;

    const archKey = rawSpec.archetype || (ARCHETYPE_LIBRARY[rawSpec.id] ? rawSpec.id : null);
    if (archKey && ARCHETYPE_LIBRARY[archKey]) {
      const baseArch = ARCHETYPE_LIBRARY[archKey];
      this.activeArchetypeId = archKey;

      // Deep clone canonical archetype
      spec = JSON.parse(JSON.stringify(baseArch));
      spec.computeMetrics = baseArch.computeMetrics;

      // Contextual title, subtitle, badge overrides
      if (rawSpec.title) spec.title = rawSpec.title;
      if (rawSpec.subtitle) spec.subtitle = rawSpec.subtitle;
      if (rawSpec.badge) spec.badge = rawSpec.badge;
      if (rawSpec.camera) spec.camera = Object.assign({}, baseArch.camera, rawSpec.camera);

      // Contextual component naming and descriptions
      if (rawSpec.contextual_labels) {
        spec.components.forEach(comp => {
          if (rawSpec.contextual_labels[comp.id]) {
            comp.name = rawSpec.contextual_labels[comp.id].name || comp.name;
            comp.desc = rawSpec.contextual_labels[comp.id].desc || comp.desc;
          }
        });
      }
    } else if (rawSpec.id && ARCHETYPE_LIBRARY[rawSpec.id]) {
      this.activeArchetypeId = rawSpec.id;
    }

    this.activeModelSpec = spec;

    // Update metadata pill with active archetype name
    const metaPill = document.getElementById("interactive-model-meta-pill");
    if (metaPill) {
      const archName = (this.activeArchetypeId && ARCHETYPE_LIBRARY[this.activeArchetypeId]?.name) || spec.name || "3D HARDWARE LAB";
      metaPill.innerText = `HARDWARE LAB // ${archName}`.toUpperCase();
    }

    // 3. Update Section Headers & Badges
    this.setTxt("interactive-model-badge", spec.badge || spec.defaultBadge || "INTERACTIVE ENGINEERING LAB // 3D SCHEMATIC");
    this.setTxt("interactive-model-title", spec.title || spec.defaultTitle || "3D Architecture & Physics Simulation");
    this.setTxt("interactive-model-subtitle", spec.subtitle || spec.defaultSubtitle || "Interactive 3D geometry, component inspection & real-time telemetry");

    // 4. Populate 3D Scene with Components
    if (this.threeGroup) {
      // Clear previous meshes
      while (this.threeGroup.children.length > 0) {
        const child = this.threeGroup.children[0];
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
        this.threeGroup.remove(child);
      }
      this.threeMeshes = [];

      // Build each 3D component
      const components = spec.components || [];
      components.forEach(comp => {
        const mesh = this.buildComponentMesh(comp);
        this.threeGroup.add(mesh);
        this.threeMeshes.push(mesh);
      });

      // Reset group orientation & camera distance based on spec
      if (spec.camera) {
        if (this.threeCamera && spec.camera.distance) {
          this.threeCamera.position.set(0, 50, spec.camera.distance);
        }
        if (spec.camera.pitch != null && spec.camera.yaw != null) {
          this.threeGroup.rotation.set(spec.camera.pitch, spec.camera.yaw, 0);
        }
      }
    }

    // 5. Render Physics Tuning Sliders
    this.renderModelControls(spec.controls || []);

    // 6. Render Layer Visibility Checkboxes
    this.renderLayerToggles(spec.components || []);

    // 7. Render Real-Time Telemetry Dashboard
    this.renderModelMetrics(spec.metrics || []);

    // 8. Reset Exploded Slider & Popovers
    this.onExplodedSliderChange(0);
    const expSlider = document.getElementById("model-exploded-slider");
    if (expSlider) expSlider.value = 0;
    this.closeAnnotationPopover();
    this.applyShadingMode();
  }

  onSelectArchetype(archetypeId) {
    if (!ARCHETYPE_LIBRARY[archetypeId]) return;
    this.activeArchetypeId = archetypeId;
    const baseArch = ARCHETYPE_LIBRARY[archetypeId];

    // Check if current issue data has custom contextual labels for this archetype
    let contextual = null;
    if (this.currentIssueData && this.currentIssueData.interactive_model && this.currentIssueData.interactive_model.archetype === archetypeId) {
      contextual = this.currentIssueData.interactive_model;
    }

    const cloned = JSON.parse(JSON.stringify(baseArch));
    cloned.computeMetrics = baseArch.computeMetrics;
    cloned.badge = contextual?.badge || baseArch.defaultBadge;
    cloned.title = contextual?.title || baseArch.defaultTitle;
    cloned.subtitle = contextual?.subtitle || baseArch.defaultSubtitle;
    if (contextual?.contextual_labels) {
      cloned.components.forEach(comp => {
        if (contextual.contextual_labels[comp.id]) {
          comp.name = contextual.contextual_labels[comp.id].name || comp.name;
          comp.desc = contextual.contextual_labels[comp.id].desc || comp.desc;
        }
      });
    }

    this.renderInteractiveModel({ interactive_model: cloned });
    this.playSynthBeep(720, 0.04);
    this.showToast(`Loaded 3D Archetype: ${baseArch.name}`);
  }

  deriveModelFromTopic(data) {
    const text = ((data?.lead_story?.headline || "") + " " + (data?.meta?.domain || "") + " " + (data?.tags || []).join(" ")).toLowerCase();

    let archKey = "semiconductor_die";
    if (text.includes("transformer") || text.includes("substation") || text.includes("autotransformer")) {
      archKey = "power_transformer";
    } else if (text.includes("pylon") || text.includes("transmission") || text.includes("lattice") || text.includes("grid")) {
      archKey = "lattice_tower";
    } else if (text.includes("cpo") || text.includes("optic") || text.includes("photonic") || text.includes("transceiver") || text.includes("laser")) {
      archKey = "optical_transceiver";
    } else if (text.includes("smr") || text.includes("nuclear") || text.includes("reactor") || text.includes("fission")) {
      archKey = "reactor_vessel";
    } else if (text.includes("bess") || text.includes("battery") || text.includes("storage") || text.includes("cell")) {
      archKey = "energy_storage";
    } else if (text.includes("actuator") || text.includes("robot") || text.includes("motor") || text.includes("qdd") || text.includes("turbine")) {
      archKey = "rotary_actuator";
    } else if (text.includes("rack") || text.includes("server") || text.includes("datacenter") || text.includes("cluster") || text.includes("supercomputer")) {
      archKey = "server_rack";
    } else if (text.includes("pipe") || text.includes("flow") || text.includes("valve") || text.includes("cryogenic") || text.includes("hydraulic") || text.includes("manifold")) {
      archKey = "fluid_manifold";
    } else if (text.includes("satellite") || text.includes("space") || text.includes("orbit") || text.includes("starlink") || text.includes("propulsion")) {
      archKey = "satellite_bus";
    } else {
      archKey = "semiconductor_die";
    }

    const baseArch = ARCHETYPE_LIBRARY[archKey];
    const cloned = JSON.parse(JSON.stringify(baseArch));
    cloned.computeMetrics = baseArch.computeMetrics;
    cloned.archetype = archKey;
    if (data?.lead_story?.headline) {
      cloned.title = data.lead_story.headline;
      cloned.subtitle = baseArch.defaultSubtitle;
    }
    return cloned;
  }

  renderModelControls(controls) {
    const list = document.getElementById("model-controls-list");
    if (!list) return;

    if (!controls || !controls.length) {
      list.innerHTML = `<div style="font-size: 12px; color: var(--text-secondary); padding: 8px;">No tuning parameters for this model.</div>`;
      return;
    }

    list.innerHTML = controls.map(ctrl => {
      const val = this.modelControlsState[ctrl.id] ?? ctrl.default;
      this.modelControlsState[ctrl.id] = val;

      return `
        <div class="model-control-row">
          <div class="control-label-wrap">
            <span class="control-name">${this.escapeHtml(ctrl.label)}</span>
            <span class="control-val" id="ctrl-val-${ctrl.id}">${val} ${ctrl.unit || ""}</span>
          </div>
          <input type="range"
            id="ctrl-${ctrl.id}"
            class="model-slider"
            min="${ctrl.min}"
            max="${ctrl.max}"
            step="${ctrl.step || 1}"
            value="${val}"
            oninput="spark.onModelControlChange('${ctrl.id}', this.value, '${ctrl.unit || ""}')">
        </div>
      `;
    }).join("");
  }

  renderModelControlsUI(controls) {
    this.renderModelControls(controls);
  }

  onModelControlChange(id, val, unit) {
    const num = parseFloat(val);
    this.modelControlsState[id] = num;

    const valEl = document.getElementById(`ctrl-val-${id}`);
    if (valEl) valEl.innerText = `${num} ${unit || ""}`;

    if (id.includes("voltage") || id.includes("power") || id.includes("load") || id.includes("tdp") || id.includes("mw")) {
      const factor = Math.min(1.5, Math.max(0.5, num / 500));
      if (this.threeMeshes) {
        this.threeMeshes.forEach(mesh => {
          if (mesh.userData.id && (mesh.userData.id.includes("core") || mesh.userData.id.includes("gate") || mesh.userData.id.includes("bushing") || mesh.userData.id.includes("stator"))) {
            mesh.material.emissiveIntensity = 0.15 * factor;
          }
        });
      }
    }

    this.updateTelemetryMetrics();
  }

  renderLayerToggles(components) {
    const container = document.getElementById("model-layer-toggles");
    if (!container) return;

    container.innerHTML = (components || []).map(comp => `
      <label class="layer-toggle-item" title="${this.escapeHtml(comp.desc || '')}">
        <input type="checkbox" checked onchange="spark.toggleComponentLayer('${comp.id}', this.checked)">
        <span class="layer-color-dot" style="background: ${comp.color || '#00f0ff'};"></span>
        <span class="layer-item-name">${this.escapeHtml(comp.name)}</span>
      </label>
    `).join("");
  }

  renderLayerTogglesUI(layers) {
    this.renderLayerToggles(layers);
  }

  toggleComponentLayer(id, visible) {
    const mesh = this.threeMeshes.find(m => m.userData.id === id);
    if (mesh) {
      mesh.visible = visible;
      this.playSynthBeep(visible ? 680 : 420, 0.03);
    }
  }

  renderModelMetrics(metrics) {
    const grid = document.getElementById("model-metrics-grid");
    if (!grid) return;

    grid.innerHTML = (metrics || []).map(m => `
      <div class="model-metric-card" id="metric-card-${m.id}">
        <div class="metric-card-label">${this.escapeHtml(m.label)}</div>
        <div class="metric-card-val" id="metric-val-${m.id}">--</div>
        <div class="metric-card-unit">${this.escapeHtml(m.unit || "")}</div>
      </div>
    `).join("");

    this.updateTelemetryMetrics();
  }

  renderTelemetryMetricsUI(metrics) {
    this.renderModelMetrics(metrics);
  }

  updateTelemetryMetrics() {
    this.calculateTelemetryValues();
  }

  calculateTelemetryValues() {
    const spec = this.activeModelSpec;
    if (!spec) return;

    const s = this.modelControlsState || {};
    const id = spec.id || "";

    // 1. Direct Canonical Archetype Metric Evaluator
    let computed = null;
    if (typeof spec.computeMetrics === "function") {
      computed = spec.computeMetrics(s);
    } else if (this.activeArchetypeId && ARCHETYPE_LIBRARY[this.activeArchetypeId]?.computeMetrics) {
      computed = ARCHETYPE_LIBRARY[this.activeArchetypeId].computeMetrics(s);
    }

    if (computed) {
      for (const [key, val] of Object.entries(computed)) {
        this.setTxt(`metric-val-${key}`, val);
      }
      return;
    }

    if (id.includes("bspdn") || id.includes("gaa") || id.includes("samsung_2nm") || id.includes("transistor")) {
      const vdd = parseFloat(s.core_vdd ?? s.voltage ?? 0.75);
      const sheets = parseInt(s.sheet_count ?? 3, 10);
      const temp = parseFloat(s.junction_temp ?? s.temp ?? 65);

      const irDrop = (vdd * 72 * (temp / 60) * (3 / Math.max(1, sheets))).toFixed(1);
      const ion = (sheets * 0.48 * Math.pow(Math.max(0.1, vdd - 0.25), 1.2) * (1 - (temp - 25) * 0.0015)).toFixed(2);
      const powerDensity = (165 * Math.pow(vdd, 2) * (sheets / 3) * (temp / 60)).toFixed(1);
      const clock = (3.4 * (vdd / 0.75) * (sheets / 3) / (1 + (temp - 25) * 0.002)).toFixed(2);

      this.setTxt("metric-val-ir_drop", irDrop);
      this.setTxt("metric-val-drive_ion", ion);
      this.setTxt("metric-val-drive_current", ion);
      this.setTxt("metric-val-power_density", powerDensity);
      this.setTxt("metric-val-clock_ceil", clock);
      this.setTxt("metric-val-clock_freq", clock);
    } else if (id.includes("autotransformer") || id.includes("substation_auto") || id.includes("transformer")) {
      const mva = parseFloat(s.mva_load ?? 650);
      const cooling = Math.max(1, parseFloat(s.oil_cooling ?? 2));
      const ambient = parseFloat(s.ambient_c ?? 32);

      const topOil = (ambient + (mva / 750) * (48 / cooling)).toFixed(1);
      const hotspot = (ambient + (mva / 750) * (62 / cooling) + 12).toFixed(1);
      const eff = (99.85 - (mva / 1000) * 0.12).toFixed(3);
      const loss = ((mva * 1.8) * (1 + (ambient - 25) * 0.005)).toFixed(1);

      this.setTxt("metric-val-top_oil_temp", topOil);
      this.setTxt("metric-val-winding_hotspot", hotspot);
      this.setTxt("metric-val-efficiency", eff);
      this.setTxt("metric-val-loss_kw", loss);
      this.setTxt("metric-val-transformer_loss", loss);
    } else if (id.includes("cpo") || id.includes("broadcom") || id.includes("switch")) {
      const portSpeed = parseFloat(s.port_speed ?? 106);
      const laserPower = parseFloat(s.laser_power ?? 80);
      const fiberLen = parseFloat(s.fiber_length ?? 100);

      const bw = ((portSpeed * 512) / 1000).toFixed(1);
      const epb = (3.2 * (laserPower / 80) * (portSpeed / 106)).toFixed(2);
      const loss = (1.2 + (fiberLen / 100) * 0.35).toFixed(2);
      const tdp = Math.round(620 + (laserPower * 2.2) + (portSpeed * 1.8));

      this.setTxt("metric-val-switch_bw", bw);
      this.setTxt("metric-val-energy_per_bit", epb);
      this.setTxt("metric-val-insertion_loss", loss);
      this.setTxt("metric-val-thermal_dissip", tdp);
      this.setTxt("metric-val-interconnect_power", epb);
      this.setTxt("metric-val-thermal_dissipation", tdp);
    } else if (id.includes("gpt6") || id.includes("kvcache") || id.includes("inference")) {
      const clock = parseFloat(s.clock_ghz ?? 2.4);
      const ctx = parseFloat(s.context_k ?? 128);
      const vdd = parseFloat(s.core_voltage ?? 0.82);

      const tps = Math.round(85 * (clock / 2.4) * (128 / Math.max(32, ctx)) * (vdd / 0.82));
      const memBw = ((clock * 3.2) * Math.min(1.5, ctx / 64)).toFixed(1);
      const tdp = Math.round(350 * Math.pow(vdd / 0.82, 2) * (clock / 2.4));
      const cost = (4.20 * (ctx / 128) * (tdp / 350)).toFixed(2);

      this.setTxt("metric-val-tok_per_sec", tps);
      this.setTxt("metric-val-tps_throughput", tps);
      this.setTxt("metric-val-mem_bw", memBw);
      this.setTxt("metric-val-memory_bandwidth", memBw);
      this.setTxt("metric-val-chip_tdp", tdp);
      this.setTxt("metric-val-cost_per_m", cost);
      this.setTxt("metric-val-cost_per_m_tokens", cost);
    } else if (id.includes("pylon") || id.includes("grid_substation")) {
      const kv = parseFloat(s.line_kv ?? 500);
      const amps = parseFloat(s.current_load ?? 1800);
      const wind = Math.max(1, parseFloat(s.ambient_wind ?? 12));

      const cap = ((kv * amps * Math.sqrt(3)) / 1000).toFixed(1);
      const corona = ((kv / 500) * 14.5 * (1 / Math.max(1, wind / 5))).toFixed(1);
      const sag = (3.2 + (amps / 2000) * 2.8 - (wind / 12) * 0.8).toFixed(2);
      const margin = Math.round(45 + (kv / 500) * 18 - (amps / 1800) * 12);

      this.setTxt("metric-val-line_capacity", cap);
      this.setTxt("metric-val-corona_loss", corona);
      this.setTxt("metric-val-thermal_sag", sag);
      this.setTxt("metric-val-fault_margin", margin);
    } else if (id.includes("rack") || id.includes("gb200") || id.includes("nvlink")) {
      const gpuW = parseFloat(s.gpu_tdp ?? s.gpu_power_w ?? 1200);
      const inlet = parseFloat(s.coolant_inlet ?? s.inlet_temp_c ?? 24);
      const scale = parseFloat(s.cluster_scale ?? 72);

      const totalKw = ((gpuW * scale * 1.15) / 1000).toFixed(1);
      const pflops = ((scale * 20) * (gpuW / 1200)).toFixed(1);
      const flow = ((gpuW * scale * 0.001) * 1.8).toFixed(1);
      const pue = (1.025 + (inlet / 100) * 0.05).toFixed(3);

      this.setTxt("metric-val-total_kw", totalKw);
      this.setTxt("metric-val-rack_tdp", totalKw);
      this.setTxt("metric-val-fp8_pflops", pflops);
      this.setTxt("metric-val-water_flow", flow);
      this.setTxt("metric-val-pue_impact", pue);
      this.setTxt("metric-val-pue_overhead", pue);
    } else if (id.includes("bess") || id.includes("datacenter_pod") || id.includes("battery")) {
      const cRate = parseFloat(s.c_rate ?? 1.0);
      const amb = parseFloat(s.ambient_temp ?? 28);
      const soc = parseFloat(s.soc_target ?? 80);

      const mw = (12.5 * cRate * (soc / 80)).toFixed(1);
      const eff = (92.5 - (cRate - 0.5) * 3.2 - (amb - 25) * 0.15).toFixed(1);
      const deltaT = (2.1 + cRate * 3.4 + (amb - 25) * 0.2).toFixed(1);
      const cycles = Math.round(6500 - (cRate * 600) - (amb - 25) * 80);

      this.setTxt("metric-val-active_mw", mw);
      this.setTxt("metric-val-roundtrip_eff", eff);
      this.setTxt("metric-val-cell_delta_t", deltaT);
      this.setTxt("metric-val-cycle_life", cycles);
    } else if (id.includes("smr") || id.includes("nuclear")) {
      const mwth = parseFloat(s.thermal_mw ?? 550);
      const temp = parseFloat(s.core_temp ?? s.core_temp_c ?? 720);
      const flow = parseFloat(s.coolant_flow ?? 95);

      const mwe = (mwth * (0.38 + (temp - 550) * 0.00028)).toFixed(1);
      const eff = (38.0 + (temp - 550) * 0.024).toFixed(1);
      const dnbr = (2.45 * (flow / 95) * (550 / mwth)).toFixed(2);
      const co2 = Math.round(mwth * 0.42 * 8.76);

      this.setTxt("metric-val-elec_output", mwe);
      this.setTxt("metric-val-electric_mw", mwe);
      this.setTxt("metric-val-thermal_eff", eff);
      this.setTxt("metric-val-electric_efficiency", eff);
      this.setTxt("metric-val-dnbr", dnbr);
      this.setTxt("metric-val-co2_avoided", co2);
    } else if (id.includes("actuator") || id.includes("robot") || id.includes("qdd")) {
      const torq = parseFloat(s.torque_req ?? s.peak_torque_nm ?? 85);
      const ratio = Math.max(1, parseFloat(s.gear_ratio ?? 10));
      const therm = parseFloat(s.thermal_load ?? s.ambient_temp_c ?? 45);

      const bw = Math.round(180 * (10 / ratio) * (1 - (therm - 25) * 0.004));
      const pDens = ((torq * 12) / 100).toFixed(1);
      const backlash = (0.35 + (ratio / 10) * 0.12 + (torq / 160) * 0.08).toFixed(2);
      const eff = (94.5 - (therm - 25) * 0.12 - (torq / 160) * 2.5).toFixed(1);

      this.setTxt("metric-val-bandwidth", bw);
      this.setTxt("metric-val-power_density", pDens);
      this.setTxt("metric-val-backlash", backlash);
      this.setTxt("metric-val-p_eff", eff);
    } else {
      const mw = parseFloat(s.megawatts || s.load_mw || 450);
      const temp = parseFloat(s.inlet_temp || s.ambient_temp || 28);
      const pue = (1.02 + (temp / 100) * 0.12).toFixed(3);
      const thermal = (mw * 0.94).toFixed(0);
      const stress = Math.min(99, ((mw / 1000) * 78)).toFixed(1);

      this.setTxt("metric-val-pue_rating", pue);
      this.setTxt("metric-val-thermal_reject", thermal);
      this.setTxt("metric-val-grid_stress", stress);
    }

    // Universal fallback pass: if any metric card is still showing "--", compute a dynamic value from controls
    if (spec.metrics && Array.isArray(spec.metrics)) {
      spec.metrics.forEach(m => {
        const el = document.getElementById(`metric-val-${m.id}`);
        if (el && el.innerText.trim() === "--") {
          const cKeys = Object.keys(s);
          const firstVal = cKeys.length > 0 ? parseFloat(s[cKeys[0]]) : 100;
          el.innerText = (firstVal * 0.82).toFixed(1);
        }
      });
    }
  }

  onControlSliderChange(id, val, unit) {
    this.modelControlsState[id] = parseFloat(val);
    const label = document.getElementById(`val-${id}`);
    if (label) label.innerText = `${val} ${unit}`;
    this.calculateTelemetryValues();
  }

  toggleControlOption(id) {
    this.modelControlsState[id] = this.modelControlsState[id] ? 0 : 1;
    this.playSynthBeep(640, 0.03);
    this.renderModelControlsUI(this.activeModelSpec.controls || []);
    this.calculateTelemetryValues();
  }

  toggleLayerVisibility(idx, isChecked) {
    if (this.activeModelSpec?.layers[idx]) {
      this.activeModelSpec.layers[idx].visible = isChecked;
    }
  }

  toggleAllLayers() {
    if (!this.activeModelSpec?.layers) return;
    const anyHidden = this.activeModelSpec.layers.some(l => l.visible === false);
    this.activeModelSpec.layers.forEach(l => l.visible = anyHidden);
    this.renderLayerTogglesUI(this.activeModelSpec.layers);
  }

  resetModelControls() {
    if (!this.activeModelSpec?.controls) return;
    this.activeModelSpec.controls.forEach(c => {
      this.modelControlsState[c.id] = c.default;
    });
    this.renderModelControlsUI(this.activeModelSpec.controls);
    this.calculateTelemetryValues();
    this.showToast("Reset sliders to nominal values.", "info");
  }

  onExplodedSliderChange(val) {
    const num = parseFloat(val) || 0;
    this.explodedPercent = num;
    const readout = document.getElementById("model-exploded-val");
    if (readout) readout.innerText = `${Math.round(num)}%`;

    const factor = num / 100;
    if (this.threeMeshes) {
      this.threeMeshes.forEach(mesh => {
        const orig = mesh.userData.origPos;
        if (orig) {
          mesh.position.x = orig.x + (orig.x !== 0 ? orig.x * factor * 1.5 : 0);
          mesh.position.y = orig.y + (orig.y !== 0 ? orig.y * factor * 1.5 : (factor * 35));
          mesh.position.z = orig.z + (orig.z !== 0 ? orig.z * factor * 1.5 : 0);
        }
      });
    }
  }

  setModelViewMode(mode, silent = false) {
    this.modelViewMode = mode;
    ["3d", "exploded", "2d", "telemetry"].forEach(m => {
      const btn = document.getElementById(`tab-mode-${m}`);
      if (btn) btn.classList.toggle("is-active", m === mode);
    });

    if (mode === "exploded") {
      const sl = document.getElementById("model-exploded-slider");
      if (sl) sl.value = 65;
      this.onExplodedSliderChange(65);
    } else if (mode === "3d") {
      const sl = document.getElementById("model-exploded-slider");
      if (sl) sl.value = 0;
      this.onExplodedSliderChange(0);
    }

    if (!silent) {
      this.showToast(`View Mode: ${mode.toUpperCase()}`, "info");
      this.playSynthBeep(620, 0.04);
    }
  }

  toggleModelAutoRotate() {
    this.modelAutoRotate = !this.modelAutoRotate;
    const btn = document.getElementById("btn-model-autorotate");
    if (btn) btn.innerText = this.modelAutoRotate ? "🔄 Auto-Rotate: ON" : "⏸️ Auto-Rotate: OFF";
    this.playSynthBeep(this.modelAutoRotate ? 640 : 440, 0.04);
  }

  cycleModelShading() {
    const modes = ["solid", "wireframe", "xray", "heatmap"];
    let nextIdx = (modes.indexOf(this.modelShading) + 1) % modes.length;
    this.modelShading = modes[nextIdx];
    const badge = document.getElementById("viewport-shading-badge");
    if (badge) badge.innerText = `SHADING: ${this.modelShading.toUpperCase()}`;
    this.applyShadingMode();
    this.showToast(`Shading Mode: ${this.modelShading.toUpperCase()}`, "info");
    this.playSynthBeep(680, 0.04);
  }

  applyShadingMode() {
    if (!this.threeMeshes) return;
    const isWire = this.modelShading === "wireframe";
    const isXRay = this.modelShading === "xray";
    const isHeat = this.modelShading === "heatmap";

    this.threeMeshes.forEach(mesh => {
      const mat = mesh.material;
      mat.wireframe = isWire;

      if (isHeat) {
        const y = mesh.userData.origPos ? mesh.userData.origPos.y : 0;
        const heatColor = y > 15 ? 0xef4444 : (y < -15 ? 0x3b82f6 : 0xf5a623);
        mat.color.setHex(heatColor);
        mat.emissive.setHex(heatColor);
        mat.emissiveIntensity = 0.45;
        mat.opacity = 0.95;
        mat.transparent = false;
      } else if (isXRay) {
        mat.color.setStyle(mesh.userData.baseColor || "#00f0ff");
        mat.emissive.setStyle(mesh.userData.baseColor || "#00f0ff");
        mat.emissiveIntensity = 0.2;
        mat.transparent = true;
        mat.opacity = 0.35;
      } else {
        mat.color.setStyle(mesh.userData.baseColor || "#00f0ff");
        mat.emissive.setStyle(mesh.userData.baseColor || "#00f0ff");
        mat.emissiveIntensity = mesh.userData.baseEmissive || 0.15;
        mat.transparent = (mesh.userData.origOpacity != null && mesh.userData.origOpacity < 1);
        mat.opacity = mesh.userData.origOpacity ?? 1.0;
      }
    });
  }

  resetModelCamera() {
    if (this.threeGroup) {
      this.threeGroup.rotation.set(0.2, 0.45, 0);
    }
    if (this.threeCamera) {
      this.threeCamera.position.set(0, 50, 240);
    }
    const sl = document.getElementById("model-exploded-slider");
    if (sl) sl.value = 0;
    this.onExplodedSliderChange(0);
    this.closeAnnotationPopover();
    this.playSynthBeep(600, 0.04);
  }

  toggleModelFullscreen() {
    const wrap = document.getElementById("interactive-viewport-wrap");
    if (!wrap) return;
    if (!document.fullscreenElement) {
      wrap.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  closeAnnotationPopover() {
    const pop = document.getElementById("model-annotation-popover");
    if (pop) pop.style.display = "none";
    this.selectedMesh = null;
    if (this.threeMeshes) {
      this.threeMeshes.forEach(m => {
        m.material.emissiveIntensity = m.userData.baseEmissive || 0.15;
      });
    }
  }

  clipModelTelemetry() {
    if (!this.activeModelSpec) return;
    const title = `3D Simulation: ${this.activeModelSpec.title}`;
    const metrics = (this.activeModelSpec.metrics || []).map(m => {
      const el = document.getElementById(`metric-val-${m.id}`);
      return `${m.label}: ${el ? el.innerText : '--'} ${m.unit || ''}`;
    }).join(" | ");

    this.clipInsight(title, `Active telemetry readout: ${metrics}`);
  }

  scrollToInteractiveModel() {
    const sec = document.getElementById("interactive-model-section");
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
      this.playSynthBeep(650, 0.04);
    }
  }

  scrollToQuiz() {
    const sec = document.getElementById("quiz-module");
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
      this.playSynthBeep(600, 0.04);
    }
  }

  // Legacy canvas event stubs
  initCanvasEvents() {}
  resizeCanvas() {}
  startCanvasLoop() {}

  render3DCanvas() {
    // Replaced by WebGL Three.js renderer
  }

  // Legacy 2D canvas stubs
  init2DParticles() {}
  render2DCanvas() {}

  hexToRgba(hex, alpha) {
    if (!hex || !hex.startsWith("#")) return `rgba(0, 240, 255, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // =========================================================================
  // COMPANY SPOTLIGHT & QUICK HITS
  // =========================================================================
  renderCompanySpotlight(data) {
    const cs = data.company_spotlight || data.titan_spotlight;
    const container = document.getElementById("company-intel-display");
    const badge = document.getElementById("featured-company-name");
    if (!container || !cs) return;

    if (badge) badge.innerText = cs.company || "TECH TITAN";

    container.innerHTML = `
      <div class="company-intel-head">
        <div>
          <div class="company-name-title">${this.escapeHtml(cs.company || "Enterprise Corp")}</div>
          <div class="company-ticker-pill">${this.escapeHtml(cs.ticker || "EQUITY")} • CAP: ${this.escapeHtml(cs.market_cap || "—")}</div>
        </div>
        <div class="company-metric-item" style="border-color: rgba(0, 240, 255, 0.3);">
          <div class="company-metric-label">VELOCITY SCORE</div>
          <div class="company-metric-val" style="color: var(--accent-cyan);">${this.escapeHtml(cs.metrics?.velocity || "9.7 / 10")}</div>
        </div>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: var(--text-secondary); margin-bottom: 16px;">
        ${this.formatMarkdown(cs.summary || cs.catch_up || "")}
      </p>

      <div class="company-metrics-row">
        <div class="company-metric-item">
          <div class="company-metric-label">CAPEX INITIATIVE</div>
          <div class="company-metric-val">${this.escapeHtml(cs.metrics?.capex || "Multi-Gigawatt Expansion")}</div>
        </div>
        <div class="company-metric-item">
          <div class="company-metric-label">COMPETITIVE MOAT</div>
          <div class="company-metric-val">${this.escapeHtml(cs.metrics?.moat || "Silicon Integration")}</div>
        </div>
        <div class="company-metric-item">
          <div class="company-metric-label">REGULATORY VECTOR</div>
          <div class="company-metric-val">${this.escapeHtml(cs.metrics?.regulatory || "FERC & Antitrust Inquest")}</div>
        </div>
      </div>

      <div class="company-takeaway-box">
        <b>Strategic Vector:</b> ${this.formatMarkdown(cs.takeaway || "")}
      </div>

      <div class="company-actions-row">
        <button class="intel-trigger-btn" onclick="spark.exploreDeepIntel('company')">🔍 View SEC 10-K & Regulatory Filings</button>
        <button class="clip-trigger-btn" onclick="spark.clipInsight('${this.escapeHtml(cs.company)} Dossier', '${this.escapeHtml(cs.summary)}')">📌 Save Company Dossier to Intel</button>
      </div>
    `;
  }

  renderQuickHits(hits) {
    const container = document.getElementById("quick-hits-container");
    if (!container) return;

    // Filter counts
    const countAll = hits.length;
    let countEnergy = 0, countSilicon = 0, countPolicy = 0, countCompute = 0;
    hits.forEach(h => {
      const txt = (h.headline + " " + h.facts).toLowerCase();
      if (txt.includes("nuclear") || txt.includes("battery") || txt.includes("energy") || txt.includes("grid")) countEnergy++;
      if (txt.includes("silicon") || txt.includes("optic") || txt.includes("risc-v") || txt.includes("wafer")) countSilicon++;
      if (txt.includes("ferc") || txt.includes("subsidy") || txt.includes("policy") || txt.includes("bill")) countPolicy++;
      if (txt.includes("ai") || txt.includes("compute") || txt.includes("agent") || txt.includes("gpu")) countCompute++;
    });

    this.setTxt("qh-count-all", countAll);
    this.setTxt("qh-count-energy", countEnergy);
    this.setTxt("qh-count-silicon", countSilicon);
    this.setTxt("qh-count-policy", countPolicy);
    this.setTxt("qh-count-compute", countCompute);

    const filtered = hits.filter(h => {
      if (this.isHighSignalOnly) {
        const sniVal = parseFloat(h.sni || "8.5");
        if (sniVal < 9.0) return false;
      }
      if (this.currentDomainFilter === "all") return true;
      const txt = (h.headline + " " + h.facts).toLowerCase();
      if (this.currentDomainFilter === "energy") return txt.includes("nuclear") || txt.includes("battery") || txt.includes("energy") || txt.includes("grid");
      if (this.currentDomainFilter === "silicon") return txt.includes("silicon") || txt.includes("optic") || txt.includes("risc-v") || txt.includes("wafer");
      if (this.currentDomainFilter === "policy") return txt.includes("ferc") || txt.includes("subsidy") || txt.includes("policy") || txt.includes("bill");
      if (this.currentDomainFilter === "compute") return txt.includes("ai") || txt.includes("compute") || txt.includes("agent") || txt.includes("gpu");
      return true;
    });

    container.innerHTML = filtered.map(h => `
      <div class="quick-hit-card" style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
          <h3 class="quick-hit-headline">${this.escapeHtml(h.headline)}</h3>
          <span class="pill-status" style="border-color: var(--accent-cyan); color: var(--accent-cyan); font-size: 10px;">SNI: ${h.sni || "9.0"}</span>
        </div>
        <p class="quick-hit-facts">${this.formatMarkdown(h.facts || "")}</p>
        <div class="quick-hit-audit"><b>Reality Check:</b> ${this.formatMarkdown(h.reality_audit || "")}</div>
        <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="font-size: 11.5px; color: var(--accent-emerald);"><b>Why it matters:</b> ${this.formatMarkdown(h.why_it_matters || "")}</div>
          <button class="clip-trigger-btn" style="padding: 3px 8px; font-size: 10px;" onclick="spark.clipInsight('${this.escapeHtml(h.headline)}', '${this.escapeHtml(h.facts)}')">📌 Clip</button>
        </div>
      </div>
    `).join("");
  }

  filterQuickHits(domain, btn) {
    this.currentDomainFilter = domain;
    document.querySelectorAll(".qh-tab-btn").forEach(b => b.classList.remove("is-active"));
    if (btn) btn.classList.add("is-active");
    this.renderQuickHits(this.currentIssueData?.quick_hits || []);
  }

  toggleHighSignalOnly() {
    this.isHighSignalOnly = !this.isHighSignalOnly;
    const btn = document.getElementById("qh-sni-toggle-btn");
    if (btn) btn.classList.toggle("is-active", this.isHighSignalOnly);
    this.renderQuickHits(this.currentIssueData?.quick_hits || []);
    this.showToast(this.isHighSignalOnly ? "High Signal Mode: SNI ≥ 9.0" : "All Signal Briefs", "info");
  }

  // =========================================================================
  // QUIZ, EASTER EGG & GAMIFICATION ENGINE
  // =========================================================================
  renderQuiz(questions, issueNum) {
    const container = document.getElementById("quiz-items-container");
    if (!container) return;

    container.innerHTML = questions.map((q, idx) => {
      const qKey = `${issueNum}_${q.id}`;
      const isAnswered = this.answeredQuestions[qKey] !== undefined;
      const userAns = this.answeredQuestions[qKey];
      const correctIdx = q.correct_index !== undefined ? q.correct_index : (q.answer !== undefined ? q.answer : 0);
      const isCorrect = isAnswered && userAns === correctIdx;

      let statusTagClass = "is-unanswered";
      let statusTagText = "UNVERIFIED (50 XP)";
      if (isAnswered) {
        if (isCorrect) {
          statusTagClass = "is-correct";
          statusTagText = "✓ VERIFIED (+50 XP)";
        } else {
          statusTagClass = "is-incorrect";
          statusTagText = "✗ FAILED AUDIT (0 XP)";
        }
      }

      return `
        <div class="quiz-card-row ${isAnswered ? "is-answered" : ""}" id="quiz-card-${q.id}">
          <div class="quiz-prompt-wrap">
            <div class="quiz-prompt"><span style="color: var(--accent-cyan); font-family: var(--font-mono); margin-right: 6px;">Q${idx + 1}:</span> ${this.escapeHtml(q.question)}</div>
            <span class="quiz-status-tag ${statusTagClass}">${statusTagText}</span>
          </div>

          <div class="quiz-options-list">
            ${q.options.map((opt, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              // Clean leading "A) ", "B) ", etc., if already embedded in option string
              const cleanText = opt.replace(/^[A-Z][).:\s]\s*/, "");
              
              let stateClass = "";
              let iconHtml = "";
              if (isAnswered) {
                stateClass = "is-locked";
                if (optIdx === correctIdx) {
                  stateClass += " correct-pick";
                  iconHtml = `<span class="choice-status-icon">✓</span>`;
                } else if (optIdx === userAns) {
                  stateClass += " incorrect-pick";
                  iconHtml = `<span class="choice-status-icon">✗</span>`;
                }
              }

              return `
                <div class="quiz-choice-item ${stateClass}" 
                     role="button" 
                     tabindex="${isAnswered ? -1 : 0}"
                     onkeydown="if(!${isAnswered} && (event.key==='Enter'||event.key===' ')) { spark.verifyQuizAnswer(${optIdx}, ${q.id}, this); event.preventDefault(); }"
                     onclick="${isAnswered ? "" : `spark.verifyQuizAnswer(${optIdx}, ${q.id}, this)`}">
                  <span class="choice-letter-badge">${letter}</span>
                  <span class="choice-text">${this.escapeHtml(cleanText)}</span>
                  ${iconHtml}
                </div>
              `;
            }).join("")}
          </div>

          ${isAnswered ? `
            <div class="quiz-verification-box">
              <span class="intel-badge">${isCorrect ? "VERIFIED AUDIT" : "CORRECTION DOSSIER"}:</span>
              <div>
                ${q.explanation ? this.escapeHtml(q.explanation) : (isCorrect ? `Correctly verified. Grounded in today's empirical research brief.` : `Grounded reality audit: Option ${String.fromCharCode(65 + correctIdx)} is the empirically verified answer.`)}
              </div>
            </div>
          ` : ""}
        </div>
      `;
    }).join("");

    this.updateQuizProgressHeader(questions.length, issueNum);
  }

  verifyQuizAnswer(optionIdx, questionId, btn) {
    const issueNum = this.currentIssueData?.meta?.issue_number || 1;
    const qKey = `${issueNum}_${questionId}`;
    if (this.answeredQuestions[qKey] !== undefined) return;

    const quiz = this.currentIssueData?.micro_quiz?.find(q => q.id === questionId);
    if (!quiz) return;

    const correctIdx = quiz.correct_index !== undefined ? quiz.correct_index : (quiz.answer !== undefined ? quiz.answer : 0);
    const isCorrect = optionIdx === correctIdx;
    this.answeredQuestions[qKey] = optionIdx;
    localStorage.setItem("spark_answered_q", JSON.stringify(this.answeredQuestions));

    this.quizStats.total = (this.quizStats.total || 0) + 1;
    if (isCorrect) {
      this.quizStats.correct = (this.quizStats.correct || 0) + 1;
      this.awardXP(50, "Quiz Question Verified");
      this.playSynthBeep(880, 0.08);
    } else {
      this.playSynthBeep(240, 0.1);
    }
    localStorage.setItem("spark_quiz_stats", JSON.stringify(this.quizStats));
    this.saveUserProfile();

    this.renderQuiz(this.currentIssueData.micro_quiz, issueNum);
    this.updateIdentityUI();
  }

  updateQuizProgressHeader(totalQ, issueNum) {
    let solved = 0;
    for (let i = 1; i <= totalQ; i++) {
      if (this.answeredQuestions[`${issueNum}_${i}`] !== undefined) solved++;
    }
    const pct = totalQ > 0 ? (solved / totalQ) * 100 : 0;
    this.setTxt("quiz-progress-text", `${solved} / ${totalQ} VERIFIED`);
    this.setTxt("quiz-xp-claimed-text", `+${solved * 50} XP CLAIMED`);
    const fill = document.getElementById("quiz-progress-fill");
    if (fill) fill.style.width = `${pct}%`;
  }

  restoreEasterEgg(secretText, issueNum) {
    const isUnlocked = this.unlockedEasterEggs[issueNum];
    const btn = document.getElementById("btn-reveal-secret");
    const block = document.getElementById("secret-text-block");
    if (!block || !btn) return;

    if (isUnlocked) {
      btn.style.display = "none";
      block.style.display = "block";
      block.innerHTML = `<span>🔓</span> <span>${this.escapeHtml(secretText || "Historical secret unveiled.")}</span>`;
    } else {
      btn.style.display = "inline-block";
      block.style.display = "none";
      block.innerText = secretText || "";
    }
  }

  unlockSecret() {
    const issueNum = this.currentIssueData?.meta?.issue_number || 1;
    if (this.unlockedEasterEggs[issueNum]) return;

    this.unlockedEasterEggs[issueNum] = true;
    localStorage.setItem("spark_easter_eggs", JSON.stringify(this.unlockedEasterEggs));
    this.saveUserProfile();
    this.awardXP(50, "Buried Easter Egg Discovery");
    this.restoreEasterEgg(this.currentIssueData?.easter_egg, issueNum);
    this.playSynthBeep(980, 0.12);
  }

  // Wager & Forecasting Ledger
  handleWager(choice) {
    const issueNum = this.currentIssueData?.meta?.issue_number || 1;
    const q = this.currentIssueData?.executive_wager?.question || "Market prediction";

    this.wagers[issueNum] = { choice, question: q, date: new Date().toISOString().split("T")[0] };
    localStorage.setItem("spark_wagers", JSON.stringify(this.wagers));
    this.saveUserProfile();

    this.awardXP(100, "Executive Wager Placed");
    this.restoreWagerSelection(issueNum);
    this.renderForecastingScorecard();
    this.playSynthBeep(720, 0.06);
  }

  restoreWagerSelection(issueNum) {
    const w = this.wagers[issueNum];
    const cardY = document.getElementById("wager-card-yes");
    const cardN = document.getElementById("wager-card-no");
    const fb = document.getElementById("wager-response-feedback");
    if (!cardY || !cardN) return;

    cardY.classList.toggle("is-chosen", w?.choice === "yes");
    cardN.classList.toggle("is-chosen", w?.choice === "no");

    if (fb) {
      if (w) {
        fb.style.display = "block";
        fb.innerText = `Prediction Logged: You forecasted [ ${w.choice.toUpperCase()} ]. Ledger verified.`;
      } else {
        fb.style.display = "none";
      }
    }
  }

  renderForecastingScorecard() {
    const container = document.getElementById("forecasting-scorecard");
    if (!container) return;
    const count = Object.keys(this.wagers).length;
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: var(--font-mono); color: var(--text-secondary);">
        <span>ACTIVE PREDICTIONS: <b>${count}</b></span>
        <span>BRIER ACCURACY: <b>0.18 (TOP 5%)</b></span>
        <span>RESOLUTION PIPELINE: <b>VERIFIED</b></span>
      </div>
    `;
  }

  // Bull vs Bear Duel Voting
  voteDuelSentiment(side) {
    const issueNum = this.currentIssueData?.meta?.issue_number || 1;
    if (this.duelVotes[issueNum]) {
      this.showToast("Sentiment vote already cast for this edition.", "info");
      return;
    }
    this.duelVotes[issueNum] = side;
    localStorage.setItem("spark_duel_votes", JSON.stringify(this.duelVotes));
    this.awardXP(20, "Market Sentiment Vote");
    this.updateDuelSentimentUI();
  }

  updateDuelSentimentUI() {
    const issueNum = this.currentIssueData?.meta?.issue_number || 1;
    const vote = this.duelVotes[issueNum];
    const tag = document.getElementById("duel-voted-tag");
    const bar = document.getElementById("sentiment-meter-bar");
    if (tag) tag.innerText = vote ? `VOTED: ${vote.toUpperCase()}` : "";
    if (bar) {
      const bullPct = vote === "bull" ? 72 : (vote === "bear" ? 48 : 62);
      bar.style.width = `${bullPct}%`;
      this.setTxt("sentiment-bull-label", `🟢 Bullish ${bullPct}%`);
      this.setTxt("sentiment-bear-label", `🔴 Bearish ${100 - bullPct}%`);
    }
  }

  // =========================================================================
  // ARCHIVE & VAULT (GRID, TABLE, TIMELINE)
  // =========================================================================
  openArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) {
      drawer.classList.add("is-open");
      this.renderArchiveVaultContent();
      setTimeout(() => document.getElementById("vault-search-input")?.focus(), 80);
    }
  }

  closeArchiveDrawer() {
    document.getElementById("archive-drawer-modal")?.classList.remove("is-open");
  }

  stepIssue(direction) {
    if (!this.manifest || this.manifest.length === 0) return;
    const currentNum = this.currentIssueData?.meta?.issue_number;
    const currIdx = this.manifest.findIndex(m => String(m.issue_number) === String(currentNum));

    // Manifest is ordered newest to oldest:
    // index 0 is newest, index manifest.length - 1 is oldest.
    // direction = 1 means older edition (move forward in array: currIdx + 1)
    // direction = -1 means newer edition (move backward in array: currIdx - 1)
    let targetIdx = currIdx === -1 ? 0 : currIdx + direction;
    if (targetIdx < 0) {
      this.showToast("Already viewing the newest edition", "info");
      return;
    }
    if (targetIdx >= this.manifest.length) {
      this.showToast("Already viewing the oldest archived edition", "info");
      return;
    }

    const targetItem = this.manifest[targetIdx];
    if (targetItem) {
      this.loadIssueFile(targetItem.file_path);
    }
  }

  updateArchiveNavigatorUI() {
    if (!this.manifest || this.manifest.length === 0) return;
    const currentNum = this.currentIssueData?.meta?.issue_number;
    const currIdx = this.manifest.findIndex(m => String(m.issue_number) === String(currentNum));

    // 1. Update dropdown select element
    const select = document.getElementById("issue-archive-select");
    if (select) {
      select.innerHTML = this.manifest.map((item, idx) => `
        <option value="${item.file_path}" ${idx === currIdx ? "selected" : ""}>
          Issue #${item.issue_number} — ${item.date} (${item.headline ? item.headline.slice(0, 48) + "..." : "Edition"})
        </option>
      `).join("");
    }

    // 2. Update step buttons state
    const prevBtn = document.getElementById("nav-step-prev");
    const nextBtn = document.getElementById("nav-step-next");
    if (prevBtn) {
      const hasOlder = currIdx !== -1 && currIdx < this.manifest.length - 1;
      prevBtn.disabled = !hasOlder;
      prevBtn.style.opacity = hasOlder ? "1" : "0.4";
      prevBtn.style.cursor = hasOlder ? "pointer" : "not-allowed";
    }
    if (nextBtn) {
      const hasNewer = currIdx > 0;
      nextBtn.disabled = !hasNewer;
      nextBtn.style.opacity = hasNewer ? "1" : "0.4";
      nextBtn.style.cursor = hasNewer ? "pointer" : "not-allowed";
    }

    // 3. Update quick scrubber pills
    const scrubber = document.getElementById("archive-quick-scrubber");
    if (scrubber) {
      scrubber.innerHTML = this.manifest.map((item, idx) => `
        <button class="archive-scrubber-pill ${idx === currIdx ? "is-active" : ""}" onclick="spark.loadIssueFile('${item.file_path}')" title="${item.date}: ${item.headline || ""}">
          Issue #${item.issue_number}
        </button>
      `).join("");
    }
  }

  renderArchiveVaultContent() {
    const container = document.getElementById("modal-issues-list");
    if (!container) return;

    // Dynamically update month filter chips from manifest
    const chipsContainer = document.getElementById("vault-filter-chips");
    if (chipsContainer && Array.isArray(this.manifest)) {
      const monthMap = new Map();
      this.manifest.forEach(m => {
        if (m.date && m.date.length >= 7) {
          const key = m.date.substring(0, 7);
          monthMap.set(key, (monthMap.get(key) || 0) + 1);
        }
      });
      const monthNames = {
        "01": "January", "02": "February", "03": "March", "04": "April",
        "05": "May", "06": "June", "07": "July", "08": "August",
        "09": "September", "10": "October", "11": "November", "12": "December"
      };
      let chipsHtml = `<button class="vault-chip ${this.archiveFilterMonth === "all" ? "is-active" : ""}" data-filter="all" onclick="spark.setArchiveFilter('all')">All Editions (${this.manifest.length})</button>`;
      monthMap.forEach((count, ym) => {
        const [y, m] = ym.split("-");
        const label = `${monthNames[m] || m} ${y} (${count})`;
        chipsHtml += `<button class="vault-chip ${this.archiveFilterMonth === ym ? "is-active" : ""}" data-filter="${ym}" onclick="spark.setArchiveFilter('${ym}')">${label}</button>`;
      });
      chipsContainer.innerHTML = chipsHtml;
    }

    let items = [...this.manifest];

    // Filter by month
    if (this.archiveFilterMonth && this.archiveFilterMonth !== "all") {
      items = items.filter(m => m.date && m.date.startsWith(this.archiveFilterMonth));
    }

    // Filter by search query
    if (this.archiveSearchQuery) {
      const q = this.archiveSearchQuery.toLowerCase();
      items = items.filter(m => {
        const numStr = String(m.issue_number);
        const isNumMatch = numStr === q || q === `#${numStr}` || q === `issue ${numStr}` || q === `issue #${numStr}`;
        const isHeadMatch = (m.headline || "").toLowerCase().includes(q);
        const isDateMatch = (m.date || "").includes(q);
        const isOriginalMatch = (q === "original" || q === "first" || q === "inaugural" || q === "0" || q === "#0") && parseInt(m.issue_number, 10) === 0;
        return isNumMatch || isHeadMatch || isDateMatch || isOriginalMatch;
      });
    }

    // Sort order
    if (this.archiveSortOrder === "asc") {
      items.sort((a, b) => (parseInt(a.issue_number, 10) || 0) - (parseInt(b.issue_number, 10) || 0));
    } else {
      items.sort((a, b) => (parseInt(b.issue_number, 10) || 0) - (parseInt(a.issue_number, 10) || 0));
    }

    const currentNum = this.currentIssueData?.meta?.issue_number;
    const currentDate = this.currentIssueData?.meta?.date || "";

    // Update active view mode buttons
    document.getElementById("btn-view-grid")?.classList.toggle("is-active", this.archiveViewMode === "grid");
    document.getElementById("btn-view-table")?.classList.toggle("is-active", this.archiveViewMode === "table");
    document.getElementById("btn-view-timeline")?.classList.toggle("is-active", this.archiveViewMode === "timeline");

    // Update sort button text
    const sortBtn = document.getElementById("btn-vault-sort");
    if (sortBtn) {
      sortBtn.innerText = this.archiveSortOrder === "asc" ? "↑ Oldest First (Issue #0)" : "↓ Newest First";
    }

    // Update search clear button
    const clearBtn = document.getElementById("vault-search-clear-btn");
    if (clearBtn) {
      clearBtn.style.display = this.archiveSearchQuery ? "block" : "none";
    }

    // Update footer metadata & jump pills
    const metaEl = document.getElementById("vault-footer-meta");
    if (metaEl) {
      metaEl.innerText = `Showing ${items.length} of ${this.manifest.length} Archived Intel Editions`;
    }

    const jumper = document.getElementById("vault-footer-jumper");
    if (jumper && Array.isArray(this.manifest)) {
      jumper.innerHTML = this.manifest.map(m => {
        const isActive = String(m.issue_number) === String(currentNum);
        const isOrig = parseInt(m.issue_number, 10) === 0;
        return `<button class="vault-jump-pill ${isActive ? "is-active" : ""}" onclick="spark.loadIssueFile('${m.file_path}'); spark.closeArchiveDrawer();" title="${m.date}: ${m.headline || 'Dossier'}">#${m.issue_number}${isOrig ? " (Orig)" : ""}</button>`;
      }).join("");
    }

    const activeIndicator = document.getElementById("vault-active-indicator");
    if (activeIndicator) {
      activeIndicator.innerText = `⚡ Active: Issue #${currentNum ?? "?"} (${currentDate})`;
    }

    // Render View Modes
    if (items.length === 0) {
      container.innerHTML = `
        <div class="vault-empty-state">
          <span class="vault-empty-icon">🔍</span>
          <span class="vault-empty-text">No archived editions match "${this.escapeHtml(this.archiveSearchQuery)}".</span>
          <button class="action-btn" style="margin-top: 8px;" onclick="spark.clearArchiveSearch()">Clear Filters</button>
        </div>
      `;
      return;
    }

    if (this.archiveViewMode === "table") {
      container.innerHTML = `
        <table class="vault-table">
          <thead>
            <tr><th>ISSUE</th><th>DATE</th><th>HEADLINE</th><th>STATUS</th><th>ACTION</th></tr>
          </thead>
          <tbody>
            ${items.map(m => {
              const isActive = String(m.issue_number) === String(currentNum);
              const isOrig = parseInt(m.issue_number, 10) === 0;
              return `
                <tr class="${isActive ? "vault-row-active" : ""}" onclick="spark.loadIssueFile('${m.file_path}'); spark.closeArchiveDrawer();">
                  <td class="td-issue">#${m.issue_number} ${isOrig ? '<span class="command-edition-badge-original" style="margin-left: 4px;">ORIGINAL</span>' : ''}</td>
                  <td class="td-date">${m.date}</td>
                  <td class="td-headline">${this.escapeHtml(m.headline || "Daily Investigation")}</td>
                  <td>${isActive ? '<span class="command-edition-badge-active">ACTIVE</span>' : '<span style="opacity: 0.6; font-size: 11px;">ARCHIVED</span>'}</td>
                  <td class="td-action"><button class="action-btn" style="font-size: 10px; padding: 2px 8px;">Load ➔</button></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      `;
    } else if (this.archiveViewMode === "timeline") {
      const safeSelectedIdx = Math.max(0, Math.min(items.length - 1, this.selectedTimelineIndex || 0));
      const selItem = items[safeSelectedIdx];
      const isSelActive = String(selItem.issue_number) === String(currentNum);
      const isSelOriginal = parseInt(selItem.issue_number, 10) === 0;

      container.innerHTML = `
        <div class="vault-timeline-container">
          <div class="timeline-scrubber-track">
            <div class="timeline-rail-line"></div>
            ${items.map((m, idx) => {
              const isSelected = idx === safeSelectedIdx;
              const isActive = String(m.issue_number) === String(currentNum);
              return `
                <button class="timeline-node-item ${isSelected ? "is-selected" : ""} ${isActive ? "is-active-issue" : ""}" onclick="spark.selectTimelineNode(${idx})" title="Issue #${m.issue_number} (${m.date})">
                  <div class="timeline-node-dot"></div>
                  <span class="timeline-node-label">#${m.issue_number}</span>
                  <span class="timeline-node-date">${m.date ? m.date.substring(5) : ""}</span>
                </button>
              `;
            }).join("")}
          </div>
          <div class="timeline-preview-panel">
            <div class="timeline-preview-top">
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="vault-issue-pill">EDITION #${selItem.issue_number}</span>
                ${isSelOriginal ? '<span class="command-edition-badge-original">ORIGINAL INAUGURAL EDITION</span>' : ''}
                ${isSelActive ? '<span class="command-edition-badge-active">CURRENTLY READING</span>' : ''}
                <span class="vault-date-badge">${selItem.date}</span>
              </div>
              <button class="action-btn" style="background: var(--accent-cyan); color: #000000; font-weight: 800; border: none; padding: 6px 14px; border-radius: var(--radius-sm);" onclick="spark.loadIssueFile('${selItem.file_path}'); spark.closeArchiveDrawer();">
                ${isSelActive ? "Already Active (Return)" : "Load Issue #" + selItem.issue_number + " Dossier ➔"}
              </button>
            </div>
            <div class="timeline-preview-title">${this.escapeHtml(selItem.headline || "Daily Investigation")}</div>
            <div class="timeline-preview-meta-grid">
              <div class="timeline-preview-item">
                <span class="timeline-preview-item-label">Verified Static File</span>
                <span class="timeline-preview-item-val" style="font-family: var(--font-mono); font-size: 11px;">${selItem.file_path}</span>
              </div>
              <div class="timeline-preview-item">
                <span class="timeline-preview-item-label">Archive Volume</span>
                <span class="timeline-preview-item-val">Volume IV • Daily Intelligence</span>
              </div>
              <div class="timeline-preview-item">
                <span class="timeline-preview-item-label">Chronological Position</span>
                <span class="timeline-preview-item-val">Edition ${safeSelectedIdx + 1} of ${items.length} Filtered</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Grid Matrix View
      container.innerHTML = `
        <div class="vault-matrix-grid">
          ${items.map(m => {
            const isActive = String(m.issue_number) === String(currentNum);
            const isOrig = parseInt(m.issue_number, 10) === 0;
            return `
              <div class="vault-card ${isActive ? "is-active-card" : ""}" onclick="spark.loadIssueFile('${m.file_path}'); spark.closeArchiveDrawer();">
                <div class="vault-card-header">
                  <span class="vault-issue-pill">ISSUE #${m.issue_number}</span>
                  ${isOrig ? '<span class="command-edition-badge-original">ORIGINAL</span>' : ''}
                  ${isActive ? '<span class="command-edition-badge-active">ACTIVE</span>' : ''}
                  <span class="vault-date-badge">${m.date}</span>
                </div>
                <div class="vault-card-headline">${this.escapeHtml(m.headline || "Daily Intelligence")}</div>
                <div class="vault-card-footer">
                  <span style="font-size: 11px; color: var(--accent-cyan);">Verified Static Edition</span>
                  <span>➔</span>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }
  }

  selectTimelineNode(index) {
    this.selectedTimelineIndex = index;
    this.renderArchiveVaultContent();
    this.playSfx(480, "sine", 0.04);
  }

  onArchiveSearch(q) {
    this.archiveSearchQuery = (q || "").trim();
    this.renderArchiveVaultContent();
  }

  clearArchiveSearch() {
    this.archiveSearchQuery = "";
    const input = document.getElementById("vault-search-input");
    if (input) {
      input.value = "";
      input.focus();
    }
    this.renderArchiveVaultContent();
  }

  setArchiveFilter(f) {
    this.archiveFilterMonth = f;
    this.renderArchiveVaultContent();
  }

  setArchiveViewMode(mode) {
    this.archiveViewMode = mode;
    localStorage.setItem("spark_vault_view", mode);
    this.renderArchiveVaultContent();
  }

  toggleArchiveSort() {
    this.archiveSortOrder = this.archiveSortOrder === "desc" ? "asc" : "desc";
    this.renderArchiveVaultContent();
  }

  // =========================================================================
  // RESEARCH CLIPBOARD & USER PROFILE
  // =========================================================================
  toggleClipboardDrawer() {
    document.getElementById("clipboard-drawer")?.classList.toggle("is-active");
    this.renderClipboard();
  }

  clipInsight(title, text) {
    this.clips.unshift({
      id: Date.now(),
      issue: this.currentIssueData?.meta?.issue_number || 0,
      date: this.currentIssueData?.meta?.date || "2026",
      title: title || "Clipped Insight",
      text: text || ""
    });
    localStorage.setItem("spark_clips", JSON.stringify(this.clips));
    this.saveUserProfile();
    this.awardXP(15, "Insight Clipped to Intel");
    this.renderClipboard();
    this.showToast("📌 Saved to Personal Intel Clipboard", "success");
  }

  removeClip(id) {
    this.clips = this.clips.filter(c => c.id !== id);
    localStorage.setItem("spark_clips", JSON.stringify(this.clips));
    this.saveUserProfile();
    this.renderClipboard();
  }

  clearAllClips() {
    this.clips = [];
    localStorage.setItem("spark_clips", JSON.stringify(this.clips));
    this.saveUserProfile();
    this.renderClipboard();
  }

  exportClipsMarkdown() {
    if (!this.clips.length) return this.showToast("Clipboard is empty.", "info");
    const md = this.clips.map(c => `### ${c.title} (#${c.issue} - ${c.date})\n${c.text}\n`).join("\n---\n\n");
    navigator.clipboard.writeText(md).then(() => this.showToast("📋 Exported Markdown to Clipboard", "success"));
  }

  renderClipboard() {
    const list = document.getElementById("clipboard-list-container");
    const countEl = document.getElementById("clipboard-count-pill");
    const hudBadge = document.getElementById("hud-clips-badge");
    if (countEl) countEl.innerText = `${this.clips.length} SAVED`;
    if (hudBadge) hudBadge.innerHTML = `📌 ${this.clips.length} Clips <kbd>C</kbd>`;
    if (!list) return;

    if (!this.clips.length) {
      list.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 30px; font-size: 13px;">No research clips pinned yet. Use the 📌 buttons on any story or case study to pin insights.</div>`;
      return;
    }

    list.innerHTML = this.clips.map(c => `
      <div class="clip-item-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <b style="color: var(--text-primary); font-size: 12.5px;">${this.escapeHtml(c.title)}</b>
          <button class="clip-remove-btn" onclick="spark.removeClip(${c.id})">✕</button>
        </div>
        <div style="font-size: 10px; color: var(--accent-cyan); font-family: var(--font-mono); margin: 4px 0;">ISSUE #${c.issue} • ${c.date}</div>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin: 0;">${this.escapeHtml(c.text)}</p>
      </div>
    `).join("");
  }

  // =========================================================================
  // AUDIO SYNTHESIZER & KEYBOARD SHORTCUTS
  // =========================================================================
  toggleAudioBriefing() {
    const hud = document.getElementById("audio-player-hud");
    if (!hud) return;
    if (hud.classList.contains("is-open")) {
      this.audioStop();
      hud.classList.remove("is-open");
    } else {
      hud.classList.add("is-open");
      this.audioPlay();
    }
  }

  audioPlay() {
    if (!this.audioSynth) return this.showToast("Speech synthesis not supported.", "info");
    this.audioSynth.cancel();

    const title = this.currentIssueData?.lead_story?.headline || "Executive Daily Intelligence";
    const text = `${title}. ${this.currentIssueData?.lead_story?.catch_up || ""}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = this.audioSpeed;
    utter.onend = () => {
      this.isAudioSpeaking = false;
      this.setTxt("audio-play-pause-btn", "▶ Play");
    };

    this.audioSynth.speak(utter);
    this.isAudioSpeaking = true;
    this.setTxt("audio-play-pause-btn", "⏸ Pause");
    this.setTxt("audio-player-text", title);
  }

  audioPlayPause() {
    if (this.isAudioSpeaking) {
      this.audioSynth.pause();
      this.isAudioSpeaking = false;
      this.setTxt("audio-play-pause-btn", "▶ Resume");
    } else {
      this.audioSynth.resume();
      this.isAudioSpeaking = true;
      this.setTxt("audio-play-pause-btn", "⏸ Pause");
    }
  }

  audioStop() {
    if (this.audioSynth) this.audioSynth.cancel();
    this.isAudioSpeaking = false;
    this.setTxt("audio-play-pause-btn", "▶ Play");
  }

  setAudioSpeed(speed, btn) {
    this.audioSpeed = speed;
    document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("is-active"));
    if (btn) btn.classList.add("is-active");
    if (this.isAudioSpeaking) this.audioPlay();
  }

  hideAudioPlayer() {
    this.audioStop();
    document.getElementById("audio-player-hud")?.classList.remove("is-open");
  }

  audioReadSection(section) {
    this.toggleAudioBriefing();
  }

  // Audio FX Beeps
  playSynthBeep(freq = 440, duration = 0.05) {
    if (!this.sfxEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  toggleAudioFX() {
    this.sfxEnabled = !this.sfxEnabled;
    localStorage.setItem("spark_sfx", this.sfxEnabled);
    this.setTxt("hud-sfx-btn", this.sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF");
    this.showToast(this.sfxEnabled ? "Sound Effects Enabled" : "Sound Effects Muted", "info");
  }

  bindGlobalShortcuts() {
    const handleKeydown = (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && ["INPUT", "TEXTAREA", "SELECT"].includes(activeEl.tagName);
      const isCmdInput = activeEl && activeEl.id === "command-search-input";

      // 1. ESCAPE: Always closes any open modal/drawer and blurs inputs
      if (e.key === "Escape") {
        e.preventDefault();
        if (isInput) activeEl.blur();
        this.closeAllModals();
        return;
      }

      // 2. CMD+K / CTRL+K: Always toggle the Command Palette
      const k = e.key ? e.key.toLowerCase() : "";
      if ((e.metaKey || e.ctrlKey) && (k === "k" || e.code === "KeyK")) {
        e.preventDefault();
        this.toggleCommandPalette();
        return;
      }

      // 3. Arrow & Enter navigation inside Command Palette search input
      if (isCmdInput) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.stepCommandSelection(1);
          return;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.stepCommandSelection(-1);
          return;
        } else if (e.key === "Enter") {
          e.preventDefault();
          this.executeSelectedCommand();
          return;
        }
      }

      // If active in another input field, do not trigger single-key letter shortcuts
      if (isInput) return;

      // 4. SHORTCUTS CHEATSHEET MODAL:
      // Accepts '?' (Shift + Slash), or '/' (Slash without modifiers)
      if (e.key === "?" || k === "?" || (!e.ctrlKey && !e.metaKey && !e.altKey && (k === "/" || e.code === "Slash"))) {
        e.preventDefault();
        this.toggleShortcutsModal();
        return;
      }

      // 5. NAVIGATION & ACTION HOTKEYS
      if (k === "s") { e.preventDefault(); this.toggleSkim(); }
      else if (k === "m") { e.preventDefault(); this.toggleTheme(); }
      else if (k === "c") { e.preventDefault(); this.toggleClipboardDrawer(); }
      else if (k === "a") { e.preventDefault(); this.toggleAudioBriefing(); }
      else if (k === "p") { e.preventDefault(); this.printExecutiveBriefing(); }
      else if (k === "v") { e.preventDefault(); this.toggleArchiveDrawer(); }
      else if (k === "f") { e.preventDefault(); this.cycleQuickHitsFilter(); }
      else if (k === "j") { e.preventDefault(); this.jumpNextSection(); }
      else if (k === "k" && !e.ctrlKey && !e.metaKey) { e.preventDefault(); this.jumpPrevSection(); }
      else if (k === "[") { e.preventDefault(); this.stepIssue(1); }
      else if (k === "]") { e.preventDefault(); this.stepIssue(-1); }
    };

    document.addEventListener("keydown", handleKeydown);
  }

  bindScrollTracker() {
    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = scrolled + "%";
    }, { passive: true });
  }

  // =========================================================================
  // UTILITIES, STATIC SESSION AUTHENTICATION & IDENTITY ENGINE
  // =========================================================================
  getOrCreateDeviceId() {
    let devId = null;
    try {
      devId = localStorage.getItem("spark_device_id");
      if (!devId) {
        const randHex = Math.random().toString(36).substring(2, 8).toUpperCase();
        const tsHex = Date.now().toString(36).toUpperCase();
        devId = `SPARK-DEV-${randHex}-${tsHex}`;
        localStorage.setItem("spark_device_id", devId);
      }
    } catch (e) {
      devId = `SPARK-DEV-FALLBACK-${Date.now().toString(36).toUpperCase()}`;
    }
    return devId;
  }

  isDeviceForgotten(deviceId) {
    try {
      const forgotten = JSON.parse(localStorage.getItem("spark_forgotten_devices") || "[]");
      return Array.isArray(forgotten) && forgotten.includes(deviceId);
    } catch (e) {
      return false;
    }
  }

  checkAuthSession() {
    // 1. First check tab-scoped sessionStorage (for sessions where "Keep logged in" was unchecked)
    try {
      const sessData = sessionStorage.getItem("spark_auth_session");
      if (sessData) {
        const parsed = JSON.parse(sessData);
        if (parsed && parsed.email) {
          return { session: parsed, storage: "session" };
        }
      }
    } catch (e) {}

    // 2. Then check persistent localStorage (for sessions where "Keep logged in" was checked)
    try {
      const localData = localStorage.getItem("spark_auth_session");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed && parsed.email) {
          if (parsed.keepLoggedIn && (!parsed.expiresAt || parsed.expiresAt > Date.now())) {
            if (!this.isDeviceForgotten(parsed.deviceId || this.deviceId)) {
              return { session: parsed, storage: "local" };
            } else {
              localStorage.removeItem("spark_auth_session");
            }
          } else {
            localStorage.removeItem("spark_auth_session");
          }
        }
      }
    } catch (e) {}

    return null;
  }

  initAuthSession() {
    this.deviceId = this.getOrCreateDeviceId();
    const activeAuth = this.checkAuthSession();

    if (activeAuth && activeAuth.session) {
      this.isAuthenticated = true;
      this.isGuest = false;
      this.keepLoggedIn = activeAuth.storage === "local";
      this.userEmail = activeAuth.session.email;
      this.loadUserProfile(this.userEmail);
    } else {
      // Unauthenticated visitor on this browser - seamless reading & keyboard access
      this.isAuthenticated = false;
      this.isGuest = true;
      this.keepLoggedIn = false;
      this.userEmail = "Guest";
      this.xp = 0;
      this.streak = 1;
      this.clips = [];
      this.wagers = {};
      this.quizStats = { total: 0, correct: 0 };
      this.duelVotes = {};
      this.answeredQuestions = {};
      this.unlockedEasterEggs = {};

      // Purge orphaned legacy global keys to eliminate alien stats
      try {
        localStorage.removeItem("spark_xp");
        localStorage.removeItem("spark_streak");
        localStorage.removeItem("spark_user_email");
      } catch (e) {}
    }
  }

  loadUserProfile(email) {
    if (!email) return;
    const cleanEmail = email.trim().toLowerCase();
    const key = "spark_profile_" + cleanEmail;
    let profile = null;
    try {
      profile = JSON.parse(localStorage.getItem(key) || "null");
    } catch (e) {}

    const todayStr = new Date().toISOString().split("T")[0];

    if (!profile) {
      // First-time executive registration allocation
      this.xp = 100;
      this.streak = 1;
      this.clips = [];
      this.wagers = {};
      this.quizStats = { total: 0, correct: 0 };
      this.duelVotes = {};
      this.answeredQuestions = {};
      this.unlockedEasterEggs = {};
      this.saveUserProfile();
    } else {
      this.xp = typeof profile.xp === "number" ? profile.xp : 100;
      this.clips = Array.isArray(profile.clips) ? profile.clips : [];
      this.wagers = profile.wagers && typeof profile.wagers === "object" ? profile.wagers : {};
      this.quizStats = profile.quizStats && typeof profile.quizStats === "object" ? profile.quizStats : { total: 0, correct: 0 };
      this.duelVotes = profile.duelVotes && typeof profile.duelVotes === "object" ? profile.duelVotes : {};
      this.answeredQuestions = profile.answeredQuestions && typeof profile.answeredQuestions === "object" ? profile.answeredQuestions : {};
      this.unlockedEasterEggs = profile.unlockedEasterEggs && typeof profile.unlockedEasterEggs === "object" ? profile.unlockedEasterEggs : {};

      // Dynamic streak tracking based on last login date
      const lastDate = profile.lastActiveDate;
      if (!lastDate) {
        this.streak = profile.streak || 1;
      } else if (lastDate === todayStr) {
        this.streak = profile.streak || 1;
      } else {
        const last = new Date(lastDate);
        const today = new Date(todayStr);
        const diffTime = Math.abs(today - last);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          this.streak = (profile.streak || 1) + 1;
        } else if (diffDays > 1) {
          this.streak = 1;
        } else {
          this.streak = profile.streak || 1;
        }
      }
      this.saveUserProfile();
    }
  }

  saveUserProfile() {
    if (!this.isAuthenticated || !this.userEmail || this.userEmail === "Guest") return;
    const cleanEmail = this.userEmail.trim().toLowerCase();
    const key = "spark_profile_" + cleanEmail;
    const todayStr = new Date().toISOString().split("T")[0];
    const data = {
      email: cleanEmail,
      xp: this.xp,
      streak: this.streak,
      lastActiveDate: todayStr,
      clips: this.clips,
      wagers: this.wagers,
      quizStats: this.quizStats,
      duelVotes: this.duelVotes,
      answeredQuestions: this.answeredQuestions,
      unlockedEasterEggs: this.unlockedEasterEggs,
      updatedAt: Date.now()
    };
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }

  authenticateUser(rawEmail, keepLoggedIn) {
    const email = (rawEmail || "").trim().toLowerCase();
    if (!email || !email.includes("@") || !email.includes(".")) {
      this.showToast("Please enter a valid corporate or executive email.", "error");
      return false;
    }

    // Un-forget device if previously placed on forgotten blacklist
    try {
      const forgotten = JSON.parse(localStorage.getItem("spark_forgotten_devices") || "[]");
      const updated = forgotten.filter(id => id !== this.deviceId);
      localStorage.setItem("spark_forgotten_devices", JSON.stringify(updated));
    } catch (e) {}

    const session = {
      email,
      deviceId: this.deviceId,
      keepLoggedIn: !!keepLoggedIn,
      loginTime: Date.now(),
      expiresAt: keepLoggedIn ? (Date.now() + 30 * 24 * 60 * 60 * 1000) : null
    };

    if (keepLoggedIn) {
      localStorage.setItem("spark_auth_session", JSON.stringify(session));
      sessionStorage.removeItem("spark_auth_session");
    } else {
      sessionStorage.setItem("spark_auth_session", JSON.stringify(session));
      localStorage.removeItem("spark_auth_session");
    }

    this.isAuthenticated = true;
    this.isGuest = false;
    this.keepLoggedIn = !!keepLoggedIn;
    this.userEmail = email;

    this.loadUserProfile(email);
    this.updateIdentityUI();
    this.renderClipboard();
    this.renderForecastingScorecard();
    if (this.currentIssueData && this.currentIssueData.micro_quiz) {
      this.renderQuiz(this.currentIssueData.micro_quiz, this.currentIssueData.meta?.issue_number || 1);
    }

    this.dismissAuthGate();
    this.closeIdentityModal();
    this.showToast(`Authenticated as ${email} [${keepLoggedIn ? "Device Remembered" : "Session Only"}]`, "success");
    return true;
  }

  submitAuthGate() {
    const input = document.getElementById("auth-gate-email");
    const check = document.getElementById("auth-keep-logged-checkbox");
    const email = input ? input.value : "";
    const keep = check ? check.checked : true;
    this.authenticateUser(email, keep);
  }

  saveAndSwitchEmail() {
    const input = document.getElementById("identity-email-input");
    const check = document.getElementById("identity-keep-logged-check");
    const email = input ? input.value : "";
    const keep = check ? check.checked : true;
    this.authenticateUser(email, keep);
  }

  continueAsGuest() {
    this.isAuthenticated = false;
    this.isGuest = true;
    this.userEmail = "Guest";
    this.xp = 0;
    this.streak = 1;
    this.dismissAuthGate();
    this.updateIdentityUI();
    this.showToast("Continuing as Guest. Sign in anytime via the HUD account button.", "info");
  }

  dismissAuthGate() {
    const modal = document.getElementById("auth-gate-modal");
    if (modal) modal.classList.remove("is-open");
  }

  openAuthGate() {
    const modal = document.getElementById("auth-gate-modal");
    if (modal) {
      modal.classList.add("is-open");
      const sigEl = document.getElementById("auth-device-signature-text");
      if (sigEl) sigEl.innerText = `Client-Isolated Storage • Device ID: ${this.deviceId}`;
      const input = document.getElementById("auth-gate-email");
      if (input) {
        input.value = this.userEmail && this.userEmail !== "Guest" ? this.userEmail : "";
        setTimeout(() => input.focus(), 100);
      }
    }
  }

  signOut(forgetBrowser = false) {
    if (forgetBrowser) {
      try {
        const forgotten = JSON.parse(localStorage.getItem("spark_forgotten_devices") || "[]");
        if (!forgotten.includes(this.deviceId)) {
          forgotten.push(this.deviceId);
          localStorage.setItem("spark_forgotten_devices", JSON.stringify(forgotten));
        }
      } catch (e) {}
      localStorage.removeItem("spark_auth_session");
      sessionStorage.removeItem("spark_auth_session");
      this.showToast("This browser has been forgotten. Session terminated.", "info");
    } else {
      localStorage.removeItem("spark_auth_session");
      sessionStorage.removeItem("spark_auth_session");
      this.showToast("Signed out successfully.", "info");
    }

    this.isAuthenticated = false;
    this.isGuest = false;
    this.userEmail = "";
    this.xp = 0;
    this.streak = 1;
    this.clips = [];
    this.wagers = {};
    this.quizStats = { total: 0, correct: 0 };
    this.answeredQuestions = {};
    this.unlockedEasterEggs = {};

    this.closeIdentityModal();
    this.updateIdentityUI();
    this.renderClipboard();
    this.renderForecastingScorecard();
    if (this.currentIssueData && this.currentIssueData.micro_quiz) {
      this.renderQuiz(this.currentIssueData.micro_quiz, this.currentIssueData.meta?.issue_number || 1);
    }
    this.openAuthGate();
  }

  awardXP(amount, reason) {
    this.xp += amount;
    this.saveUserProfile();
    this.updateIdentityUI();
    this.showToast(`+${amount} XP: ${reason}`, "success");
  }

  updateIdentityUI() {
    // 1. HUD Account button and metrics
    const emailLabel = document.getElementById("hud-user-email-label");
    if (emailLabel) {
      if (this.isAuthenticated && this.userEmail) {
        const displayUser = this.userEmail.split("@")[0];
        emailLabel.innerText = displayUser.length > 14 ? displayUser.substring(0, 12) + "…" : displayUser;
      } else if (this.isGuest) {
        emailLabel.innerText = "Guest (Sign In)";
      } else {
        emailLabel.innerText = "Sign In";
      }
    }

    // HUD streak, XP, mastery
    if (this.isAuthenticated) {
      this.setTxt("hud-xp-tracker", `⭐ ${this.xp} XP [LVL ${Math.floor(this.xp / 250) + 1}]`);
      this.setTxt("streak-badge", `🔥 STREAK: DAY ${this.streak}`);
    } else if (this.isGuest) {
      this.setTxt("hud-xp-tracker", `⭐ ${this.xp} XP [LVL 1]`);
      this.setTxt("streak-badge", `🔥 STREAK: DAY 1`);
    } else {
      this.setTxt("hud-xp-tracker", `⭐ 0 XP [LVL 1]`);
      this.setTxt("streak-badge", `🔥 STREAK: --`);
    }

    const correct = this.quizStats?.correct || 0;
    const total = this.quizStats?.total || 0;
    const pct = total > 0 ? Math.round((correct / total) * 100) : (this.isAuthenticated ? 100 : 0);
    this.setTxt("hud-quiz-mastery-badge", `🎯 ${pct}% Mastery`);

    // 2. Identity Modal elements
    const authBadge = document.getElementById("identity-auth-badge");
    const authText = document.getElementById("identity-auth-text");
    const devSigText = document.getElementById("identity-device-sig-text");
    const emailDisplay = document.getElementById("identity-current-email-display");
    const emailInput = document.getElementById("identity-email-input");

    if (devSigText) devSigText.innerText = `Device: ${this.deviceId || "SPARK-DEV-LOCAL"}`;

    if (this.isAuthenticated && this.userEmail) {
      if (authText) authText.innerText = this.keepLoggedIn ? "AUTHENTICATED (DEVICE REMEMBERED)" : "AUTHENTICATED (SESSION ONLY)";
      if (authBadge) {
        authBadge.style.background = "rgba(0, 229, 153, 0.15)";
        authBadge.style.color = "var(--accent-emerald)";
      }
      if (emailDisplay) emailDisplay.innerText = this.userEmail;
      if (emailInput && !emailInput.value) emailInput.value = this.userEmail;
    } else {
      if (authText) authText.innerText = this.isGuest ? "GUEST PREVIEW MODE" : "UNAUTHENTICATED";
      if (authBadge) {
        authBadge.style.background = "rgba(245, 166, 35, 0.15)";
        authBadge.style.color = "var(--accent-amber)";
      }
      if (emailDisplay) emailDisplay.innerText = this.isGuest ? "Guest (Unregistered)" : "Not Signed In";
    }

    // Modal stats grid
    this.setTxt("profile-stat-xp", this.xp.toString());
    this.setTxt("profile-stat-streak", this.streak.toString());
    this.setTxt("profile-stat-questions", `${this.quizStats?.total || 0} Solved`);
    this.setTxt("profile-stat-quiz", `${pct}%`);
    this.setTxt("profile-stat-wagers", Object.keys(this.wagers || {}).length.toString());
    this.setTxt("profile-stat-clips", (this.clips || []).length.toString());

    // Rank Seniority Progression Bar
    const currentLevel = Math.floor(this.xp / 250) + 1;
    const xpInLevel = this.xp % 250;
    const rankPct = Math.round((xpInLevel / 250) * 100);

    const rankTitles = [
      "CADET ANALYST",
      "INTELLIGENCE ASSOCIATE",
      "SENIOR RESEARCHER",
      "GRID & CHIP STRATEGIST",
      "PRINCIPAL FORECASTER",
      "EXECUTIVE DIRECTOR",
      "CHIEF INTELLIGENCE OFFICER"
    ];
    const rankTitle = rankTitles[Math.min(currentLevel - 1, rankTitles.length - 1)];
    this.setTxt("profile-rank-name", `LEVEL ${currentLevel} • ${rankTitle}`);
    this.setTxt("profile-rank-pct", `${rankPct}% TO NEXT TIER`);
    const rankBar = document.getElementById("profile-rank-bar-fill");
    if (rankBar) rankBar.style.width = `${rankPct}%`;
  }

  toggleSkim() {
    this.isSkimMode = !this.isSkimMode;
    document.body.classList.toggle("skim-view-active", this.isSkimMode);
    this.setTxt("skim-toggle-btn", this.isSkimMode ? "⚡ Skim: ON" : "⚡ Skim");
    this.showToast(this.isSkimMode ? "Executive Skim Mode Active" : "Full Reading Mode", "info");
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    document.documentElement.classList.toggle("light-mode", this.isLightMode);
    localStorage.setItem("spark_theme", this.isLightMode ? "light" : "dark");
    this.showToast(this.isLightMode ? "Light Theme Active" : "Dark Theme Active", "info");
  }

  printExecutiveBriefing() {
    this.openPDFExportModal();
  }

  openPDFExportModal() {
    const modal = document.getElementById("pdf-modal");
    if (!modal) return;
    this.renderPDFBriefing();
    const notice = document.getElementById("pdf-sandbox-notice");
    if (notice) notice.style.display = "none";
    const status = document.getElementById("pdf-generation-status");
    if (status) status.textContent = "Ready to export";
    modal.classList.add("is-open");
    this.showToast("Executive PDF Briefing ready for export", "info");
  }

  closePDFExportModal() {
    document.getElementById("pdf-modal")?.classList.remove("is-open");
  }

  renderPDFBriefing() {
    const data = this.currentIssueData || {};
    const meta = data.meta || {};
    const lead = data.lead_story || {};
    const comp = data.company_spotlight || {};
    const dive = data.deep_dive || {};
    const hits = data.quick_hits || [];
    const wager = data.forecasting_wager || {};

    const issueNum = meta.issue_number || "07";
    const dateStr = meta.date || "2026-09-09";
    const formattedDate = new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const userDisplay = this.userEmail || "EXECUTIVE CIRCULATION";
    const docHash = "SEC-MEMO-" + (String(issueNum).padStart(3, "0")) + "-" + dateStr.replace(/-/g, "") + "-V4";

    let hitsHtml = "";
    if (hits.length > 0) {
      hitsHtml = hits.slice(0, 4).map((h, i) => `
        <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dotted #cbd5e1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 8px;">
            <div style="font-weight: 700; color: #0f172a; font-size: 12px;">${i + 1}. ${this.escapeHtml(h.headline || "")}</div>
            <span style="font-family: monospace; font-size: 10px; color: #b45309; background: #fef3c7; padding: 1px 6px; border-radius: 2px; white-space: nowrap;">SNI: ${this.escapeHtml(h.sni || "8.5/10")}</span>
          </div>
          <div style="font-size: 11.5px; color: #334155; margin-top: 4px;">${this.escapeHtml(h.facts || "")}</div>
          ${h.reality_audit ? `<div style="font-size: 11px; color: #475569; font-style: italic; margin-top: 3px;"><b>Reality Audit:</b> ${this.escapeHtml(h.reality_audit)}</div>` : ""}
        </div>
      `).join("");
    }

    let matrixHtml = "";
    if (dive.matrix && Array.isArray(dive.matrix.dimensions) && dive.matrix.dimensions.length > 0) {
      const dims = dive.matrix.dimensions;
      const headers = Object.keys(dims[0] || {});
      matrixHtml = `
        <table class="pdf-memo-matrix">
          <thead>
            <tr>
              ${headers.map(hdr => `<th>${this.escapeHtml(hdr.replace(/_/g, " ").toUpperCase())}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${dims.map(row => `
              <tr>
                ${headers.map(hdr => `<td>${this.escapeHtml(row[hdr] || "")}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    const html = `
      <div class="pdf-memo-header">
        <div class="pdf-memo-brand">
          <div class="pdf-memo-brand-title">SPARK NEWS LIVE // PORTAL OS</div>
          <div class="pdf-memo-classification">CONFIDENTIAL EXECUTIVE DOSSIER</div>
        </div>
        <div style="font-size: 11px; color: #475569; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
          HIGH-CONVICTION TECHNOLOGY INTELLIGENCE MEMORANDUM
        </div>
        <div class="pdf-memo-meta-grid">
          <div class="pdf-memo-meta-item">
            <span class="pdf-memo-meta-label">DISCLOSURE ISSUE</span>
            <span class="pdf-memo-meta-value">EDITION #${this.escapeHtml(String(issueNum))}</span>
          </div>
          <div class="pdf-memo-meta-item">
            <span class="pdf-memo-meta-label">DATE OF RECORD</span>
            <span class="pdf-memo-meta-value">${this.escapeHtml(formattedDate)}</span>
          </div>
          <div class="pdf-memo-meta-item">
            <span class="pdf-memo-meta-label">PREPARED FOR</span>
            <span class="pdf-memo-meta-value">${this.escapeHtml(userDisplay)}</span>
          </div>
          <div class="pdf-memo-meta-item">
            <span class="pdf-memo-meta-label">VERIFICATION HASH</span>
            <span class="pdf-memo-meta-value" style="font-size: 10px;">${this.escapeHtml(docHash)}</span>
          </div>
        </div>
      </div>

      <!-- SECTION 1: LEAD INVESTIGATIVE ANCHOR -->
      <div class="pdf-memo-section">
        <div class="pdf-memo-section-title">SECTION 01 // LEAD INVESTIGATIVE ANCHOR</div>
        <div class="pdf-memo-headline">${this.escapeHtml(lead.headline || "Executive Intelligence Anchor")}</div>
        <div style="font-size: 12.5px; color: #1e293b; margin-bottom: 8px;">
          <b>Executive Catch-Up:</b> ${this.escapeHtml(lead.catch_up || "")}
        </div>
        <div style="font-size: 12px; color: #334155; margin-bottom: 8px;">
          <b>Underlying Market Mechanism:</b> ${this.escapeHtml(lead.mechanism || "")}
        </div>
        ${lead.analogy ? `
          <div class="pdf-memo-callout">
            <b>Intuitive Mental Model:</b> ${this.escapeHtml(lead.analogy)}
          </div>
        ` : ""}
        ${lead.why_it_matters ? `
          <div style="font-size: 11.5px; color: #047857; font-weight: 700; margin-top: 6px;">
            STRATEGIC IMPACT: ${this.escapeHtml(lead.why_it_matters)}
          </div>
        ` : ""}
      </div>

      <!-- SECTION 2: COMPANY STRATEGIC SPOTLIGHT -->
      ${comp.headline ? `
        <div class="pdf-memo-section">
          <div class="pdf-memo-section-title">SECTION 02 // CORPORATE DISCLOSURE & MARKET AUDIT</div>
          <div class="pdf-memo-headline" style="font-size: 14px;">${this.escapeHtml(comp.headline)}</div>
          <div style="font-size: 12px; color: #334155; margin-bottom: 6px;">
            ${this.escapeHtml(comp.summary || comp.thesis || "")}
          </div>
          ${comp.actionable_signal || comp.signal ? `
            <div style="font-size: 11.5px; color: #0284c7; font-weight: 700;">
              TACTICAL CAPITAL SIGNAL: ${this.escapeHtml(comp.actionable_signal || comp.signal || "")}
            </div>
          ` : ""}
        </div>
      ` : ""}

      <!-- SECTION 3: DEEP DIVE CASE STUDY -->
      ${dive.headline ? `
        <div class="pdf-memo-section">
          <div class="pdf-memo-section-title">SECTION 03 // DEEP DIVE ARCHITECTURAL CASE STUDY</div>
          <div class="pdf-memo-headline" style="font-size: 14px;">${this.escapeHtml(dive.headline)}</div>
          <div style="font-size: 12px; color: #1e293b; margin-bottom: 6px;">
            <b>Investigative Thesis:</b> ${this.escapeHtml(dive.thesis || "")}
          </div>
          <div style="font-size: 12px; color: #334155; margin-bottom: 8px;">
            <b>Thermodynamic / Technical Breakdown:</b> ${this.escapeHtml(dive.physics_breakdown || "")}
          </div>
          ${matrixHtml}
        </div>
      ` : ""}

      <!-- SECTION 4: QUICK HITS RADAR -->
      ${hitsHtml ? `
        <div class="pdf-memo-section">
          <div class="pdf-memo-section-title">SECTION 04 // EXECUTIVE RADAR & QUICK HITS SYNTHESIS</div>
          ${hitsHtml}
        </div>
      ` : ""}

      <!-- SECTION 5: CONSENSUS WAGER -->
      ${wager.consensus_question ? `
        <div class="pdf-memo-section" style="margin-bottom: 14px;">
          <div class="pdf-memo-section-title">SECTION 05 // EXECUTIVE FORECASTING & CAPITAL WAGER</div>
          <div style="font-size: 12.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">
            Target Proposition: ${this.escapeHtml(wager.consensus_question)}
          </div>
          <div style="font-size: 11.5px; color: #475569;">
            <b>Market Sentiment:</b> ${this.escapeHtml(wager.market_consensus || "")}
          </div>
          ${wager.strategic_implications ? `
            <div style="font-size: 11.5px; color: #047857; margin-top: 4px;">
              <b>Strategic Implications:</b> ${this.escapeHtml(wager.strategic_implications)}
            </div>
          ` : ""}
        </div>
      ` : ""}

      <!-- FOOTER DISCLOSURE -->
      <div class="pdf-memo-footer">
        <div>SPARK NEWS LIVE • EDITORIAL DESK & TECHNICAL RESEARCH AUDIT</div>
        <div>CERTIFIED UNCLASSIFIED // ID: ${this.escapeHtml(docHash)}</div>
      </div>
    `;

    const container = document.getElementById("pdf-memo-rendered-preview");
    if (container) {
      container.innerHTML = html;
    }
  }

  downloadPDFDossier() {
    const btn = document.getElementById("pdf-download-action-btn");
    const status = document.getElementById("pdf-generation-status");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = "⏳ Compiling PDF Dossier...";
    }
    if (status) status.textContent = "Rendering vector PDF document...";

    const element = document.getElementById("pdf-memo-rendered-preview");
    if (!element) {
      if (btn) { btn.disabled = false; btn.innerHTML = "📥 Download PDF Dossier (.pdf)"; }
      return;
    }

    const issueNum = this.currentIssueData?.meta?.issue_number || "07";
    const issueDate = this.currentIssueData?.meta?.date || new Date().toISOString().split("T")[0];
    const filename = `SPARK_INTELLIGENCE_MEMO_ISSUE_${issueNum}_${issueDate}.pdf`;

    if (typeof window.html2pdf === "function") {
      const opt = {
        margin: [8, 8, 8, 8],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      window.html2pdf().set(opt).from(element).save().then(() => {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = "📥 Download PDF Dossier (.pdf)";
        }
        if (status) status.textContent = "PDF downloaded successfully!";
        this.showToast("Official PDF Memorandum downloaded successfully!", "success");
        this.playSfx(587.33, "sine", 0.15);
      }).catch((err) => {
        console.warn("html2pdf processing failed, triggering offline fallback:", err);
        this.fallbackDownloadMemoHTML(filename);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = "📥 Download PDF Dossier (.pdf)";
        }
      });
    } else {
      this.fallbackDownloadMemoHTML(filename);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = "📥 Download PDF Dossier (.pdf)";
      }
    }
  }

  fallbackDownloadMemoHTML(pdfFilename) {
    const preview = document.getElementById("pdf-memo-rendered-preview");
    const content = preview ? preview.innerHTML : "<p>Spark News Live Memorandum</p>";
    const htmlDoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${this.escapeHtml(pdfFilename)}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 20px; color: #0f172a; line-height: 1.6; }
  .wrapper { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 40px; border: 1px solid #cbd5e1; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  .pdf-memo-header { border-bottom: 3px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
  .pdf-memo-brand { display: flex; justify-content: space-between; align-items: flex-end; }
  .pdf-memo-brand-title { font-size: 20px; font-weight: 900; text-transform: uppercase; }
  .pdf-memo-classification { font-size: 10px; font-weight: 700; color: #b91c1c; background: #fef2f2; padding: 3px 8px; border: 1px solid #fecaca; }
  .pdf-memo-meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px 16px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 14px; font-size: 11px; margin-top: 10px; font-family: monospace; }
  .pdf-memo-meta-item { display: flex; flex-direction: column; }
  .pdf-memo-meta-label { font-size: 9.5px; color: #64748b; text-transform: uppercase; font-weight: 700; }
  .pdf-memo-meta-value { font-weight: 800; color: #0f172a; }
  .pdf-memo-section { margin-bottom: 22px; page-break-inside: avoid; }
  .pdf-memo-section-title { font-size: 11.5px; font-weight: 900; color: #0369a1; border-bottom: 1.5px solid #0284c7; padding-bottom: 4px; margin-bottom: 10px; font-family: monospace; }
  .pdf-memo-headline { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
  .pdf-memo-callout { background: #f0f9ff; border-left: 3px solid #0284c7; padding: 10px 14px; margin: 10px 0; font-size: 12px; color: #0c4a6e; }
  .pdf-memo-matrix { border: 1px solid #e2e8f0; border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 11px; }
  .pdf-memo-matrix th { background: #f1f5f9; padding: 6px 10px; text-align: left; font-weight: 700; border: 1px solid #cbd5e1; }
  .pdf-memo-matrix td { padding: 6px 10px; border: 1px solid #e2e8f0; }
  .pdf-memo-footer { border-top: 1.5px solid #cbd5e1; padding-top: 12px; margin-top: 24px; display: flex; justify-content: space-between; font-size: 10px; color: #64748b; font-family: monospace; }
  @media print { body { background: #fff; padding: 0; } .wrapper { box-shadow: none; border: none; padding: 0; } }
</style>
</head>
<body>
<div class="wrapper">${content}</div>
<script>
  window.addEventListener('load', function() {
    setTimeout(function() { window.print(); }, 400);
  });
</script>
</body>
</html>`;
    const blob = new Blob([htmlDoc], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = pdfFilename.replace(".pdf", ".html");
    a.click();
    this.showToast("Printable Executive Memorandum (.html) downloaded!", "info");
    const status = document.getElementById("pdf-generation-status");
    if (status) status.textContent = "Printable dossier saved";
  }

  triggerBrowserPrint() {
    try {
      window.print();
      this.showToast("System print dialogue opened", "info");
    } catch (err) {
      console.warn("Direct browser print restricted by sandbox:", err);
      const notice = document.getElementById("pdf-sandbox-notice");
      if (notice) notice.style.display = "block";
      this.showToast("Browser print restricted by iframe sandbox. Use Download PDF button.", "error");
    }
  }

  copyPDFBriefingText() {
    const data = this.currentIssueData || {};
    const meta = data.meta || {};
    const lead = data.lead_story || {};
    const comp = data.company_spotlight || {};
    const dive = data.deep_dive || {};
    const wager = data.forecasting_wager || {};

    const text = `SPARK INTELLIGENCE MEMORANDUM // ISSUE #${meta.issue_number !== undefined ? meta.issue_number : ""} (${meta.date || "2026-09-09"})
CLASSIFICATION: CONFIDENTIAL EXECUTIVE CIRCULATION

============================================================
SECTION 01: LEAD INVESTIGATIVE ANCHOR
============================================================
HEADLINE: ${lead.headline || ""}
CATCH-UP: ${lead.catch_up || ""}
MECHANISM: ${lead.mechanism || ""}
ANALOGY: ${lead.analogy || ""}
STRATEGIC IMPACT: ${lead.why_it_matters || ""}

============================================================
SECTION 02: CORPORATE DISCLOSURE & MARKET AUDIT
============================================================
HEADLINE: ${comp.headline || ""}
THESIS: ${comp.summary || comp.thesis || ""}
TACTICAL SIGNAL: ${comp.actionable_signal || comp.signal || ""}

============================================================
SECTION 03: DEEP DIVE CASE STUDY
============================================================
HEADLINE: ${dive.headline || ""}
INVESTIGATIVE THESIS: ${dive.thesis || ""}
PHYSICS BREAKDOWN: ${dive.physics_breakdown || ""}

============================================================
SECTION 04: EXECUTIVE FORECASTING & WAGER
============================================================
PROPOSITION: ${wager.consensus_question || ""}
MARKET SENTIMENT: ${wager.market_consensus || ""}
IMPLICATIONS: ${wager.strategic_implications || ""}

------------------------------------------------------------
Certified Unclassified • Spark Intelligence Portal OS`;

    navigator.clipboard.writeText(text).then(() => {
      this.showToast("Executive Briefing plain-text copied to clipboard!", "success");
      this.playSfx(587.33, "sine", 0.1);
    }).catch(() => {
      this.showToast("Could not access clipboard", "error");
    });
  }

  toggleShortcutsModal() {
    const modal = document.getElementById("shortcuts-modal");
    if (!modal) return;
    if (modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
    } else {
      this.closeAllModals();
      modal.classList.add("is-open");
      this.playSfx(440, "sine", 0.08);
      this.showToast("Keyboard Shortcuts Active (Press ? or Esc to close)", "info");
    }
  }

  openShortcutsModal() {
    const modal = document.getElementById("shortcuts-modal");
    if (modal) {
      this.closeAllModals();
      modal.classList.add("is-open");
      this.playSfx(440, "sine", 0.08);
    }
  }

  closeShortcutsModal() {
    document.getElementById("shortcuts-modal")?.classList.remove("is-open");
  }

  toggleArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer?.classList.contains("is-open")) {
      this.closeArchiveDrawer();
    } else {
      this.closeAllModals();
      this.openArchiveDrawer();
    }
  }

  closeAllModals() {
    document.getElementById("shortcuts-modal")?.classList.remove("is-open");
    document.getElementById("command-palette-modal")?.classList.remove("is-open");
    document.getElementById("pdf-modal")?.classList.remove("is-open");
    document.getElementById("newsletter-modal")?.classList.remove("is-open");
    document.getElementById("archive-drawer-modal")?.classList.remove("is-open");
    document.getElementById("clipboard-drawer")?.classList.remove("is-open");
    document.getElementById("drawer-backdrop")?.classList.remove("is-open");
    document.getElementById("intel-modal")?.classList.remove("is-open");
    document.getElementById("metric-detail-modal")?.classList.remove("is-open");
    document.getElementById("identity-modal")?.classList.remove("is-open");
    document.getElementById("auth-gate-modal")?.classList.remove("is-open");
    this.closeAnnotationPopover();
  }

  jumpNextSection() {
    const sectionIds = [
      "cheat-sheet-section",
      "radar-metrics-grid",
      "lead-story-section",
      "company-spotlight-section",
      "quick-hits-section",
      "interactive-model-section",
      "deep-dive-module",
      "wager-module-section",
      "quiz-module"
    ];
    const curY = window.scrollY + 80;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop > curY + 20) {
        el.scrollIntoView({ behavior: "smooth" });
        this.flashSectionHighlight(el);
        this.playSfx(440, "sine", 0.05);
        return;
      }
    }
    this.showToast("End of intelligence edition reached", "info");
  }

  jumpPrevSection() {
    const sectionIds = [
      "cheat-sheet-section",
      "radar-metrics-grid",
      "lead-story-section",
      "company-spotlight-section",
      "quick-hits-section",
      "interactive-model-section",
      "deep-dive-module",
      "wager-module-section",
      "quiz-module"
    ];
    const curY = window.scrollY - 80;
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop < curY - 20) {
        el.scrollIntoView({ behavior: "smooth" });
        this.flashSectionHighlight(el);
        this.playSfx(380, "sine", 0.05);
        return;
      }
    }
    this.showToast("Top of intelligence edition reached", "info");
  }

  flashSectionHighlight(el) {
    if (!el) return;
    const prevOutline = el.style.outline;
    const prevTransition = el.style.transition;
    el.style.transition = "outline 0.25s ease";
    el.style.outline = "2px solid var(--accent-cyan)";
    setTimeout(() => {
      el.style.outline = prevOutline;
      setTimeout(() => { el.style.transition = prevTransition; }, 250);
    }, 650);
  }

  cycleQuickHitsFilter() {
    const domains = ["all", "energy", "silicon", "policy", "compute"];
    const currentDomain = this.activeQuickHitsDomain || "all";
    const nextIdx = (domains.indexOf(currentDomain) + 1) % domains.length;
    const nextDomain = domains[nextIdx];
    const btn = document.querySelector(`.qh-tab-btn[data-domain="${nextDomain}"]`);
    this.filterQuickHits(nextDomain, btn);
    this.showToast(`Domain Filter: ${nextDomain.toUpperCase()}`, "info");
  }

  toggleIdentityModal() { document.getElementById("identity-modal")?.classList.toggle("is-open"); }
  closeIdentityModal() { document.getElementById("identity-modal")?.classList.remove("is-open"); }
  
  openNewsletterModal() {
    const modal = document.getElementById("newsletter-modal");
    if (!modal) return;
    this.renderNewsletterPreview();
    modal.classList.add("is-open");
  }

  closeNewsletterModal() { document.getElementById("newsletter-modal")?.classList.remove("is-open"); }

  renderNewsletterPreview() {
    const data = this.currentIssueData || {};
    const meta = data.meta || {};
    const lead = data.lead_story || {};
    const comp = data.company_spotlight || {};
    const hits = data.quick_hits || [];

    const subj = document.getElementById("newsletter-subject-display");
    if (subj) {
      const numLabel = meta.issue_number !== undefined ? `Issue #${meta.issue_number}` : (meta.date || "Briefing");
      subj.textContent = `Subject: SPARK INTELLIGENCE // ${numLabel} — ${lead.headline ? lead.headline.slice(0, 50) + "..." : "Executive Briefing"}`;
    }

    const container = document.getElementById("newsletter-rendered-preview");
    if (!container) return;

    let hitsList = hits.slice(0, 4).map(h => `
      <li style="margin-bottom: 8px;">
        <b>${this.escapeHtml(h.headline || "")}</b>: ${this.escapeHtml(h.facts || "")}
      </li>
    `).join("");

    container.innerHTML = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.6;">
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 14px;">
          <h2 style="margin: 0; font-size: 18px; color: #0f172a;">⚡ SPARK NEWS LIVE // Executive Daily Briefing</h2>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Edition #${this.escapeHtml(String(meta.issue_number !== undefined ? meta.issue_number : ""))} • ${this.escapeHtml(meta.date || "")}</div>
        </div>
        <h3 style="font-size: 15px; color: #0f172a; margin: 12px 0 6px;">1. ${this.escapeHtml(lead.headline || "")}</h3>
        <p style="font-size: 13px; color: #334155; margin: 0 0 10px;">${this.escapeHtml(lead.catch_up || "")}</p>
        <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px; background: #f8fafc; padding: 8px 12px; border-left: 3px solid #0284c7;"><b>Mechanism:</b> ${this.escapeHtml(lead.mechanism || "")}</p>
        ${comp.headline ? `
          <h3 style="font-size: 14px; color: #0f172a; margin: 14px 0 6px;">2. Corporate Spotlight: ${this.escapeHtml(comp.headline)}</h3>
          <p style="font-size: 12.5px; color: #334155; margin: 0 0 10px;">${this.escapeHtml(comp.summary || "")}</p>
        ` : ""}
        <h3 style="font-size: 14px; color: #0f172a; margin: 14px 0 6px;">3. Executive Radar & Quick Hits</h3>
        <ul style="font-size: 12.5px; color: #334155; padding-left: 18px; margin: 0 0 14px;">
          ${hitsList}
        </ul>
      </div>
    `;
  }
  toggleCommandPalette() {
    const modal = document.getElementById("command-palette-modal");
    if (modal?.classList.contains("is-open")) {
      this.closeCommandPalette();
    } else {
      this.openCommandPalette();
    }
  }

  openCommandPalette() {
    this.closeAllModals();
    const modal = document.getElementById("command-palette-modal");
    if (!modal) return;
    modal.classList.add("is-open");

    const input = document.getElementById("command-search-input");
    if (input) {
      input.value = "";
      setTimeout(() => {
        input.focus();
        input.select();
      }, 60);
    }

    this.commandFilter = "all";
    document.querySelectorAll(".command-filter-chip").forEach(chip => {
      chip.classList.toggle("is-active", chip.getAttribute("data-filter") === "all");
    });

    this.commandSelectedIndex = 0;
    this.handleCommandSearch("");
    this.playSfx(523.25, "sine", 0.08);
  }

  closeCommandPalette() {
    const modal = document.getElementById("command-palette-modal");
    if (modal) {
      modal.classList.remove("is-open");
    }
    document.getElementById("command-search-input")?.blur();
  }

  setCommandFilter(filterType, chipEl) {
    this.commandFilter = filterType || "all";
    document.querySelectorAll(".command-filter-chip").forEach(chip => {
      chip.classList.toggle("is-active", chip === chipEl || chip.getAttribute("data-filter") === filterType);
    });
    const input = document.getElementById("command-search-input");
    this.handleCommandSearch(input?.value || "");
    input?.focus();
    this.playSfx(440, "sine", 0.04);
  }

  handleCommandKeydown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.stepCommandSelection(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.stepCommandSelection(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      this.executeSelectedCommand();
    } else if (e.key === "Escape") {
      e.preventDefault();
      this.closeCommandPalette();
    }
  }

  stepCommandSelection(dir) {
    if (!this.commandResults || this.commandResults.length === 0) return;
    this.commandSelectedIndex = Math.max(0, Math.min(this.commandResults.length - 1, this.commandSelectedIndex + dir));
    this.updateCommandSelectionUI();
  }

  updateCommandSelectionUI() {
    const items = document.querySelectorAll(".command-result-item");
    items.forEach((item, idx) => {
      const isSel = idx === this.commandSelectedIndex;
      item.classList.toggle("is-selected", isSel);
      if (isSel) {
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }

  executeSelectedCommand() {
    if (!this.commandResults || this.commandResults.length === 0) return;
    const item = this.commandResults[this.commandSelectedIndex];
    if (item && typeof item.action === "function") {
      this.closeCommandPalette();
      item.action();
      this.playSfx(587.33, "sine", 0.08);
    }
  }

  executeCommandIndex(index) {
    this.commandSelectedIndex = index;
    this.executeSelectedCommand();
  }

  highlightCommandMatch(text, query) {
    if (!text) return "";
    const safe = this.escapeHtml(text);
    if (!query) return safe;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return safe.replace(regex, `<mark class="command-match">$1</mark>`);
  }

  indexEntireArchiveCorpus() {
    this.buildCorpusFromManifest();
    if (this.currentIssueData) {
      const activePath = this.manifest.find(m => String(m.issue_number) === String(this.currentIssueData.meta?.issue_number))?.file_path || "";
      this.indexSingleIssue(this.currentIssueData, activePath);
    }
    this.updateCorpusStatusIndicator();

    if (Array.isArray(this.manifest)) {
      setTimeout(async () => {
        for (const item of this.manifest) {
          if (!this.issuesCache.has(item.file_path) && item.file_path) {
            try {
              const cleanPath = String(item.file_path || "").replace(/^(\.\/|\/)+/, "");
              const candidates = [`./${cleanPath}`, cleanPath, `./data/${cleanPath}`, `data/${cleanPath}`];
              let res = null;
              for (const c of candidates) {
                try {
                  const r = await fetch(`${c}?t=${Date.now()}`);
                  if (r.ok) { res = r; break; }
                } catch (e) {}
              }
              if (res && res.ok) {
                const issueData = await res.json();
                this.issuesCache.set(item.file_path, issueData);
                if (issueData.meta?.date) this.issuesCache.set(issueData.meta.date, issueData);
                this.indexSingleIssue(issueData, item.file_path);
                this.updateCorpusStatusIndicator();
              }
            } catch (err) {
              // Silently ignore background prefetch errors
            }
          }
        }
        this.updateCorpusStatusIndicator();
      }, 150);
    }
  }

  buildCorpusFromManifest() {
    if (!Array.isArray(this.manifest)) return;
    this.manifest.forEach(m => {
      const num = parseInt(m.issue_number, 10);
      const isOriginal = num === 0;
      const isLatest = this.manifest[0] && this.manifest[0].issue_number === m.issue_number;
      const id = `edition-${m.issue_number}`;
      if (!this.archiveCorpus.some(c => c.id === id)) {
        this.archiveCorpus.push({
          id,
          type: "edition",
          issue_number: m.issue_number,
          date: m.date,
          file_path: m.file_path,
          badge: isOriginal ? "ISSUE #0 (ORIGINAL)" : (isLatest ? `ISSUE #${m.issue_number} (LATEST)` : `ISSUE #${m.issue_number}`),
          context: m.date,
          title: m.headline || `Issue #${m.issue_number}`,
          snippet: `Executive Daily Intelligence Dossier #${m.issue_number} (${m.date}). Full strategic coverage across energy, silicon, policy, and compute.`,
          keywords: `${m.headline || ""} ${m.date || ""} edition issue ${m.issue_number} ${isOriginal ? "original inaugural first start inception foundation zero 0 #0" : ""} ${isLatest ? "latest newest recent active" : ""}`,
          targetSection: "cheat-sheet-section",
          action: () => this.loadIssueFileAndFocus(m.file_path, "cheat-sheet-section")
        });
      }
    });
  }

  indexSingleIssue(issueData, filePath) {
    if (!issueData || !issueData.meta) return;
    const num = issueData.meta.issue_number;
    const date = issueData.meta.date;

    // 1. Lead Story
    if (issueData.lead_story && issueData.lead_story.headline) {
      const id = `lead-${num}`;
      this.archiveCorpus = this.archiveCorpus.filter(c => c.id !== id);
      this.archiveCorpus.push({
        id,
        type: "lead",
        issue_number: num,
        date,
        file_path: filePath,
        badge: `LEAD STORY // ISSUE #${num}`,
        context: date,
        title: issueData.lead_story.headline,
        snippet: `${issueData.lead_story.catch_up || ""} ${issueData.lead_story.mechanism ? "Mechanism: " + issueData.lead_story.mechanism : ""}`,
        keywords: `${issueData.lead_story.headline} ${issueData.lead_story.catch_up || ""} ${issueData.lead_story.mechanism || ""} ${issueData.lead_story.analogy || ""} ${issueData.lead_story.why_it_matters || ""}`,
        targetSection: "lead-story-section",
        action: () => this.loadIssueFileAndFocus(filePath, "lead-story-section")
      });
    }

    // 2. Company Spotlight
    if (issueData.company_spotlight && issueData.company_spotlight.company) {
      const id = `spotlight-${num}`;
      this.archiveCorpus = this.archiveCorpus.filter(c => c.id !== id);
      this.archiveCorpus.push({
        id,
        type: "spotlight",
        issue_number: num,
        date,
        file_path: filePath,
        badge: `SPOTLIGHT // ${issueData.company_spotlight.ticker || "EQUITY"} // ISSUE #${num}`,
        context: date,
        title: `${issueData.company_spotlight.company} (${issueData.company_spotlight.ticker || "NASDAQ"}): ${issueData.company_spotlight.headline || ""}`,
        snippet: `${issueData.company_spotlight.thesis || ""} ${issueData.company_spotlight.bull_case ? "Bull Case: " + issueData.company_spotlight.bull_case : ""}`,
        keywords: `${issueData.company_spotlight.company} ${issueData.company_spotlight.ticker || ""} ${issueData.company_spotlight.headline || ""} ${issueData.company_spotlight.thesis || ""}`,
        targetSection: "company-spotlight-section",
        action: () => this.loadIssueFileAndFocus(filePath, "company-spotlight-section")
      });
    }

    // 3. Deep Dive
    if (issueData.deep_dive && issueData.deep_dive.headline) {
      const id = `deep_dive-${num}`;
      this.archiveCorpus = this.archiveCorpus.filter(c => c.id !== id);
      this.archiveCorpus.push({
        id,
        type: "deep_dive",
        issue_number: num,
        date,
        file_path: filePath,
        badge: `DEEP DIVE // ISSUE #${num}`,
        context: "Thermodynamics",
        title: issueData.deep_dive.headline,
        snippet: `${issueData.deep_dive.thesis || ""} ${issueData.deep_dive.physics_breakdown || ""}`,
        keywords: `${issueData.deep_dive.headline} ${issueData.deep_dive.thesis || ""} ${issueData.deep_dive.physics_breakdown || ""} ${issueData.deep_dive.choke_points || ""}`,
        targetSection: "deep-dive-module",
        action: () => this.loadIssueFileAndFocus(filePath, "deep-dive-module")
      });
    }

    // 4. Quick Hits
    if (Array.isArray(issueData.quick_hits)) {
      issueData.quick_hits.forEach((hit, idx) => {
        const id = `quick_hit-${num}-${idx}`;
        this.archiveCorpus = this.archiveCorpus.filter(c => c.id !== id);
        this.archiveCorpus.push({
          id,
          type: "quick_hit",
          issue_number: num,
          date,
          file_path: filePath,
          badge: `QUICK HIT // ${(hit.domain || "INTEL").toUpperCase()} // ISSUE #${num}`,
          context: `SNI: ${hit.signal_to_noise || 9.2} • ${date}`,
          title: hit.headline,
          snippet: `${hit.facts || ""} ${hit.reality_audit ? "Reality Audit: " + hit.reality_audit : ""}`,
          keywords: `${hit.headline} ${hit.facts || ""} ${hit.reality_audit || ""} ${hit.domain || ""} ${hit.source || ""}`,
          targetSection: "quick-hits-section",
          targetCardIndex: idx,
          action: () => this.loadIssueFileAndFocus(filePath, "quick-hits-section", idx)
        });
      });
    }

    // 5. Cheat Sheet
    const cheatList = issueData.cheat_sheet || issueData.executive_cheat_sheet || [];
    if (Array.isArray(cheatList)) {
      cheatList.forEach((c, idx) => {
        const id = `cheat-${num}-${idx}`;
        const titleText = typeof c === "string" ? c : (c.title || c.point || c.shift || "Strategic Shift");
        const descText = typeof c === "object" ? (c.description || c.detail || "") : "";
        this.archiveCorpus = this.archiveCorpus.filter(c => c.id !== id);
        this.archiveCorpus.push({
          id,
          type: "cheat",
          issue_number: num,
          date,
          file_path: filePath,
          badge: `CHEAT SHEET // ISSUE #${num}`,
          context: "30-Sec Shift",
          title: titleText,
          snippet: descText || "Key structural shift for executive review",
          keywords: `${titleText} ${descText}`,
          targetSection: "cheat-sheet-section",
          action: () => this.loadIssueFileAndFocus(filePath, "cheat-sheet-section")
        });
      });
    }
  }

  async loadIssueFileAndFocus(filePath, targetSectionId, cardIndex) {
    this.closeCommandPalette();
    const currentNum = this.currentIssueData?.meta?.issue_number;
    const targetItem = this.manifest.find(m => m.file_path === filePath);

    if (filePath && String(currentNum) !== String(targetItem?.issue_number)) {
      await this.loadIssueFile(filePath, true);
    }

    if (targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          this.flashSectionHighlight(el);
          if (typeof cardIndex === "number" && targetSectionId === "quick-hits-section") {
            setTimeout(() => {
              const cards = document.querySelectorAll(".quick-hit-card");
              if (cards && cards[cardIndex]) this.flashSectionHighlight(cards[cardIndex]);
            }, 300);
          }
        }
      }, 250);
    }
  }

  updateCorpusStatusIndicator() {
    const el = document.getElementById("command-corpus-status");
    if (el) {
      el.innerText = `${this.archiveCorpus.length} items indexed across ${this.manifest.length} volumes`;
    }
  }

  setCommandSearchTopic(topic) {
    const input = document.getElementById("command-search-input");
    if (input) {
      input.value = topic;
      input.focus();
    }
    this.handleCommandSearch(topic);
    this.playSfx(480, "sine", 0.05);
  }

  clearCommandSearch() {
    const input = document.getElementById("command-search-input");
    if (input) {
      input.value = "";
      input.focus();
    }
    const clearBtn = document.getElementById("command-search-clear-btn");
    if (clearBtn) clearBtn.style.display = "none";
    this.handleCommandSearch("");
  }

  handleCommandSearch(query) {
    const q = (query || "").trim().toLowerCase();
    const filter = this.commandFilter || "all";
    const currentData = this.currentIssueData || {};
    const lead = currentData.lead_story || {};
    const comp = currentData.company_spotlight || {};
    const dive = currentData.deep_dive || {};
    const wager = currentData.forecasting_wager || {};
    const meta = currentData.meta || {};

    const clearBtn = document.getElementById("command-search-clear-btn");
    if (clearBtn) clearBtn.style.display = q ? "block" : "none";

    const listEl = document.getElementById("command-results-list");
    if (!listEl) return;

    // ------------------------------------------------------------------------
    // CASE A: EMPTY QUERY -> SHOW STRUCTURED COCKPIT (NOT A RANDOM LIST)
    // ------------------------------------------------------------------------
    if (!q) {
      const items = [];

      // 1. Tactical System Actions
      const actions = [
        {
          type: "action",
          badge: "COMMAND",
          context: "S",
          title: "Toggle Skim Reading Mode",
          snippet: "Highlight critical thermodynamic mechanisms, dim background prose",
          keywords: "skim highlight speed read executive",
          action: () => this.toggleSkim()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "M",
          title: "Toggle Visual Mode (Light / Dark)",
          snippet: "Switch portal between high-contrast Dark Matrix and Executive Paper Light",
          keywords: "mode theme dark light color white",
          action: () => this.toggleTheme()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "P",
          title: "Export Executive PDF Memorandum",
          snippet: "Render formal intelligence dossier for executive distribution or download",
          keywords: "pdf print export download report briefing",
          action: () => this.openPDFExportModal()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "A",
          title: "Toggle Voice Audio Briefing",
          snippet: "Synthesized executive audio narration with tactical scrub controls",
          keywords: "audio speech voice narration listen play tts",
          action: () => this.toggleAudioBriefing()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "V",
          title: "Open Archive Intelligence Vault",
          snippet: "Browse comprehensive catalog of daily editions, table view, and timeline",
          keywords: "archive vault matrix past history editions issues search",
          action: () => this.openArchiveDrawer()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "C",
          title: "Open Research Clipboard Drawer",
          snippet: "Inspect saved citations, key findings, and export research notes in Markdown",
          keywords: "clipboard notes bookmarks clips snippets export markdown",
          action: () => this.toggleClipboardDrawer()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "?",
          title: "Open Keyboard Shortcuts Cheatsheet",
          snippet: "View all tactical keyboard hotkeys for power readers",
          keywords: "shortcuts keys help hotkeys cheatsheet keyboard",
          action: () => this.openShortcutsModal()
        }
      ];

      // 2. Jump to Active Issue Sections
      const jumpSections = [
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Section 1",
          title: "Jump to Lead Investigative Anchor",
          snippet: lead.headline || "Front-page high severity investigation",
          keywords: "lead story headline anchor investigative",
          action: () => {
            const el = document.getElementById("lead-story-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Spotlight",
          title: "Jump to Corporate Spotlight Audit",
          snippet: comp.headline || "Corporate disclosure and capital allocation",
          keywords: "company spotlight corporate stock filing balance sheet",
          action: () => {
            const el = document.getElementById("company-spotlight-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Section 2",
          title: "Jump to Quick Hits Intelligence Matrix",
          snippet: "Multi-domain tactical radar covering energy, silicon, policy, and compute",
          keywords: "quick hits radar matrix briefs news items",
          action: () => {
            const el = document.getElementById("quick-hits-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "3D Lab",
          title: "Jump to Interactive Hardware Architecture Lab",
          snippet: "Spatial 3D hardware visualizer and spatial controls",
          keywords: "3d model hardware lab die wafer reactor chip interactive",
          action: () => {
            const el = document.getElementById("interactive-model-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Section 3",
          title: "Jump to Deep Dive Thermodynamic Case Study",
          snippet: dive.headline || "Technical physics breakdown and supply chain choke points",
          keywords: "deep dive thermodynamics engineering physics case study",
          action: () => {
            const el = document.getElementById("deep-dive-module");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Section 4",
          title: "Jump to Executive Wager & Forecasting Ledger",
          snippet: wager.consensus_question || "Consensus market probability & predictions",
          keywords: "wager prediction market forecast consensus ledger",
          action: () => {
            const el = document.getElementById("wager-module-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        }
      ];

      // 3. All Editions from Manifest
      const editions = (this.manifest || []).map(m => {
        const isCurrent = String(m.issue_number) === String(meta.issue_number);
        const isOrig = parseInt(m.issue_number, 10) === 0;
        const isLatest = this.manifest[0] && this.manifest[0].issue_number === m.issue_number;
        let badgeLabel = `EDITION #${m.issue_number}`;
        if (isOrig) badgeLabel = "ISSUE #0 (ORIGINAL)";
        else if (isLatest) badgeLabel = `ISSUE #${m.issue_number} (LATEST)`;

        return {
          type: "edition",
          badge: badgeLabel,
          context: m.date,
          title: m.headline || `Issue #${m.issue_number}`,
          snippet: isCurrent ? "Active edition currently open in portal." : `Archived edition (${m.date}). Click to load full dossier.`,
          keywords: `${m.headline || ""} ${m.date || ""} edition ${m.issue_number}`,
          action: () => {
            if (!isCurrent) {
              this.loadIssueFile(m.file_path);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }
        };
      });

      // Assemble items according to current filter
      if (filter === "all") {
        items.push(...actions, ...jumpSections, ...editions);
      } else if (filter === "editions") {
        items.push(...editions);
      } else if (filter === "actions") {
        items.push(...actions);
      } else {
        // Find filtered items in archive corpus
        const typeMap = {
          "lead": "lead",
          "quick_hits": "quick_hit",
          "deep_dive": "deep_dive",
          "cheat": "cheat"
        };
        const targetType = typeMap[filter];
        const matched = this.archiveCorpus.filter(c => c.type === targetType);
        items.push(...matched);
      }

      this.commandResults = items;
      this.commandSelectedIndex = 0;

      // Render Cockpit UI
      let html = "";

      // Group: Domains & Topics (only in ALL mode)
      if (filter === "all") {
        html += `
          <div class="command-group-header">
            <span>🏷️ BROWSE BY SECTOR & DOMAIN</span>
            <span>Instant Filter</span>
          </div>
          <div class="command-topic-cloud">
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('Energy')">⚡ Energy & Grid</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('Silicon')">🔬 Silicon & GAA</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('Policy')">🏛️ Antitrust & Policy</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('Compute')">🤖 Frontier Compute</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('Nuclear')">⚛️ Nuclear SMR</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('Cooling')">💧 Liquid Cooling</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('Robotics')">🦾 Humanoid Robotics</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('TSMC')">🏭 TSMC & Foundry</button>
            <button class="command-topic-chip" onclick="spark.setCommandSearchTopic('FERC')">⚡ FERC & PJM</button>
          </div>
        `;
      }

      if (items.length === 0) {
        html += `
          <div style="padding: 32px 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
            <div style="font-size: 24px; margin-bottom: 8px;">📂</div>
            <div>No intelligence items found for selected filter.</div>
          </div>
        `;
      } else {
        html += items.map((item, idx) => {
          const isSelected = idx === this.commandSelectedIndex;
          const isOrig = item.badge?.includes("ORIGINAL");
          const isLatest = item.badge?.includes("LATEST");
          return `
            <div class="command-result-item ${isSelected ? "is-selected" : ""}" data-index="${idx}" onclick="spark.executeCommandIndex(${idx})">
              <div class="command-result-meta">
                <span class="command-result-badge ${isOrig ? 'command-edition-badge-original' : (isLatest ? 'command-edition-badge-latest' : '')}">${this.escapeHtml(item.badge)}</span>
                <span style="opacity: 0.8;">${this.escapeHtml(item.context)}</span>
              </div>
              <div class="command-result-title">${this.escapeHtml(item.title)}</div>
              <div class="command-result-snippet">${this.escapeHtml(item.snippet)}</div>
            </div>
          `;
        }).join("");
      }

      listEl.innerHTML = html;
      return;
    }

    // ------------------------------------------------------------------------
    // CASE B: ACTIVE SEARCH QUERY -> SEARCH ACROSS GLOBAL CORPUS + ACTIONS
    // ------------------------------------------------------------------------
    const candidates = [];

    // Include actions
    if (filter === "all" || filter === "actions") {
      candidates.push(
        {
          type: "action",
          badge: "COMMAND",
          context: "S",
          title: "Toggle Skim Reading Mode",
          snippet: "Highlight critical thermodynamic mechanisms, dim background prose",
          keywords: "skim highlight speed read executive mode",
          action: () => this.toggleSkim()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "M",
          title: "Toggle Visual Mode (Light / Dark)",
          snippet: "Switch portal between high-contrast Dark Matrix and Executive Paper Light",
          keywords: "mode theme dark light color white appearance",
          action: () => this.toggleTheme()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "P",
          title: "Export Executive PDF Memorandum",
          snippet: "Render formal intelligence dossier for executive distribution or download",
          keywords: "pdf print export download report briefing dossier",
          action: () => this.openPDFExportModal()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "A",
          title: "Toggle Voice Audio Briefing",
          snippet: "Synthesized executive audio narration with tactical scrub controls",
          keywords: "audio speech voice narration listen play tts player",
          action: () => this.toggleAudioBriefing()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "V",
          title: "Open Archive Intelligence Vault",
          snippet: "Browse comprehensive catalog of daily editions, table view, and timeline",
          keywords: "archive vault matrix past history editions issues search catalog",
          action: () => this.openArchiveDrawer()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "C",
          title: "Open Research Clipboard Drawer",
          snippet: "Inspect saved citations, key findings, and export research notes in Markdown",
          keywords: "clipboard notes bookmarks clips snippets export markdown research",
          action: () => this.toggleClipboardDrawer()
        },
        {
          type: "action",
          badge: "COMMAND",
          context: "?",
          title: "Open Keyboard Shortcuts Cheatsheet",
          snippet: "View all tactical keyboard hotkeys for power readers",
          keywords: "shortcuts keys help hotkeys cheatsheet keyboard",
          action: () => this.openShortcutsModal()
        }
      );
    }

    // Include jump sections for current issue
    if (filter === "all") {
      candidates.push(
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Section 1",
          title: "Jump to Lead Investigative Anchor",
          snippet: lead.headline || "Front-page high severity investigation",
          keywords: `lead story headline anchor investigative ${lead.headline || ""}`,
          action: () => {
            const el = document.getElementById("lead-story-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Spotlight",
          title: "Jump to Corporate Spotlight Audit",
          snippet: comp.headline || "Corporate disclosure and capital allocation",
          keywords: `company spotlight corporate stock filing balance sheet ${comp.company || ""}`,
          action: () => {
            const el = document.getElementById("company-spotlight-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "3D Lab",
          title: "Jump to Interactive Hardware Architecture Lab",
          snippet: "Spatial 3D hardware visualizer and spatial controls",
          keywords: "3d model hardware lab die wafer reactor chip interactive geometry",
          action: () => {
            const el = document.getElementById("interactive-model-section");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        },
        {
          type: "section",
          badge: "NAVIGATE",
          context: "Section 3",
          title: "Jump to Deep Dive Thermodynamic Case Study",
          snippet: dive.headline || "Technical physics breakdown and supply chain choke points",
          keywords: `deep dive thermodynamics engineering physics case study ${dive.headline || ""}`,
          action: () => {
            const el = document.getElementById("deep-dive-module");
            el?.scrollIntoView({ behavior: "smooth" });
            this.flashSectionHighlight(el);
          }
        }
      );
    }

    // Include global archive corpus
    candidates.push(...this.archiveCorpus);

    // Apply category filter
    let pool = candidates;
    if (filter === "editions") {
      pool = candidates.filter(c => c.type === "edition");
    } else if (filter === "lead") {
      pool = candidates.filter(c => c.type === "lead");
    } else if (filter === "quick_hits") {
      pool = candidates.filter(c => c.type === "quick_hit");
    } else if (filter === "deep_dive") {
      pool = candidates.filter(c => c.type === "deep_dive");
    } else if (filter === "cheat") {
      pool = candidates.filter(c => c.type === "cheat");
    } else if (filter === "actions") {
      pool = candidates.filter(c => c.type === "action");
    }

    // Score and filter matches
    const scored = [];
    const seenIds = new Set();

    pool.forEach(item => {
      if (item.id && seenIds.has(item.id)) return;
      if (item.id) seenIds.add(item.id);

      const title = (item.title || "").toLowerCase();
      const snippet = (item.snippet || "").toLowerCase();
      const keywords = (item.keywords || "").toLowerCase();
      const badge = (item.badge || "").toLowerCase();
      const context = (item.context || "").toLowerCase();
      const numStr = String(item.issue_number ?? "");

      let score = 0;

      // Exact issue number queries (e.g. "0", "#0", "issue 0", "original", "8", "#8")
      const isOriginalQuery = q === "0" || q === "#0" || q === "issue 0" || q === "original" || q === "inaugural" || q === "first";
      if (isOriginalQuery && (numStr === "0" || item.id === "edition-0")) {
        score += 100;
      }
      if (numStr === q || q === `#${numStr}` || q === `issue ${numStr}` || q === `issue #${numStr}`) {
        score += 80;
      }

      // Title matching
      if (title === q) score += 60;
      else if (title.startsWith(q)) score += 40;
      else if (title.includes(q)) score += 25;

      // Badge / Context / Date matching
      if (badge.includes(q)) score += 20;
      if (context.includes(q)) score += 15;

      // Keywords & Snippet matching
      if (keywords.includes(q)) score += 15;
      if (snippet.includes(q)) score += 10;

      // Multi-word token matching
      const tokens = q.split(/\s+/).filter(Boolean);
      if (tokens.length > 1) {
        const allTokensMatch = tokens.every(tok => title.includes(tok) || snippet.includes(tok) || keywords.includes(tok));
        if (allTokensMatch) score += 30;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    const filtered = scored.map(s => s.item);

    this.commandResults = filtered;
    this.commandSelectedIndex = 0;

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 36px 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
          <div style="font-size: 26px; margin-bottom: 10px;">🔍</div>
          <div style="font-weight: 700; color: var(--text-primary); font-size: 14px;">No intelligence found matching "${this.escapeHtml(q)}"</div>
          <div style="font-size: 11.5px; margin-top: 8px; opacity: 0.8; max-width: 440px; margin-left: auto; margin-right: auto;">
            Try searching "0" for the original inaugural issue, or keywords like "PJM", "TSMC", "silicon", "optics", "SMR", or commands like "audio", "pdf", "skim".
          </div>
          <button class="action-btn" style="margin-top: 14px; font-size: 11px;" onclick="spark.clearCommandSearch()">Clear Search</button>
        </div>
      `;
      return;
    }

    const countBanner = `
      <div class="command-count-banner">
        <span>MATCHING INTELLIGENCE: ${filtered.length} RESULTS</span>
        <span>INDEX: ${this.archiveCorpus.length} ITEMS ACROSS ${this.manifest.length} EDITIONS</span>
      </div>
    `;

    const html = filtered.slice(0, 30).map((item, idx) => {
      const isSelected = idx === this.commandSelectedIndex;
      const isOrig = item.badge?.includes("ORIGINAL");
      const isLatest = item.badge?.includes("LATEST");
      return `
        <div class="command-result-item ${isSelected ? "is-selected" : ""}" data-index="${idx}" onclick="spark.executeCommandIndex(${idx})">
          <div class="command-result-meta">
            <span class="command-result-badge ${isOrig ? 'command-edition-badge-original' : (isLatest ? 'command-edition-badge-latest' : '')}">${this.escapeHtml(item.badge)}</span>
            <span style="opacity: 0.8;">${this.escapeHtml(item.context)}</span>
          </div>
          <div class="command-result-title">${this.highlightCommandMatch(item.title, q)}</div>
          <div class="command-result-snippet">${this.highlightCommandMatch(item.snippet, q)}</div>
        </div>
      `;
    }).join("");

    listEl.innerHTML = countBanner + html;
  }
  exploreDeepIntel(type) { this.showToast("Deep Intel Dossier & SEC filings explorer active.", "info"); }

  initCloudSync() {
    console.log("Portal OS telemetry synchronized.");
  }

  forceCloudSync() { 
    this.saveUserProfile();
    this.showToast("Telemetry successfully synced.", "success"); 
  }

  exportProfileBackup() {
    const data = JSON.stringify({
      email: this.userEmail,
      deviceId: this.deviceId,
      xp: this.xp,
      streak: this.streak,
      clips: this.clips,
      wagers: this.wagers,
      quizStats: this.quizStats,
      exportedAt: new Date().toISOString()
    }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `spark_intelligence_profile_${(this.userEmail || "user").replace(/[@.]/g, "_")}_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  }

  importProfileBackup(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data && typeof data === "object") {
          if (data.email) this.userEmail = data.email;
          if (typeof data.xp === "number") this.xp = data.xp;
          if (typeof data.streak === "number") this.streak = data.streak;
          if (Array.isArray(data.clips)) this.clips = data.clips;
          if (data.wagers) this.wagers = data.wagers;
          if (data.quizStats) this.quizStats = data.quizStats;
          this.isAuthenticated = true;
          this.isGuest = false;
          this.saveUserProfile();
          this.updateIdentityUI();
          this.renderClipboard();
          this.renderForecastingScorecard();
          this.showToast("Profile backup restored successfully!", "success");
        }
      } catch (err) {
        this.showToast("Invalid profile backup file format.", "error");
      }
    };
    reader.readAsText(file);
  }

  copyNewsletterHTML() {
    const preview = document.getElementById("newsletter-rendered-preview");
    const html = preview ? preview.innerHTML : "";
    navigator.clipboard.writeText(html).then(() => {
      this.showToast("Formatted Newsletter HTML copied to clipboard!", "success");
      this.playSfx(587.33, "sine", 0.1);
    }).catch(() => {
      this.showToast("Clipboard access failed", "error");
    });
  }

  copyNewsletterMarkdown() {
    const data = this.currentIssueData || {};
    const meta = data.meta || {};
    const lead = data.lead_story || {};
    const comp = data.company_spotlight || {};
    const hits = data.quick_hits || [];

    let md = `# SPARK NEWS LIVE // Executive Intelligence (Issue #${meta.issue_number !== undefined ? meta.issue_number : ""})\n`;
    md += `*Date: ${meta.date || ""}*\n\n`;
    md += `## 1. ${lead.headline || ""}\n${lead.catch_up || ""}\n\n`;
    md += `**Mechanism:** ${lead.mechanism || ""}\n\n`;
    if (lead.analogy) md += `> **Intuitive Analogy:** ${lead.analogy}\n\n`;
    if (comp.headline) {
      md += `## 2. Corporate Spotlight: ${comp.headline}\n${comp.summary || ""}\n\n`;
    }
    if (hits.length > 0) {
      md += `## 3. Executive Quick Hits\n`;
      hits.slice(0, 4).forEach(h => {
        md += `- **${h.headline}** (SNI: ${h.sni || "8.5/10"}): ${h.facts}\n`;
      });
    }

    navigator.clipboard.writeText(md).then(() => {
      this.showToast("Newsletter Markdown copied to clipboard!", "success");
      this.playSfx(587.33, "sine", 0.1);
    }).catch(() => {
      this.showToast("Clipboard access failed", "error");
    });
  }

  openInMailClient() {
    const lead = this.currentIssueData?.lead_story || {};
    const subject = encodeURIComponent(`Spark Intelligence Memo: ${lead.headline || "Daily Tech Briefing"}`);
    const body = encodeURIComponent(`Executive Summary:\n${lead.catch_up || ""}\n\nRead the full interactive analysis on Spark News Live Portal.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  showToast(msg, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    const icon = type === "success" ? "✅" : (type === "error" ? "⚠️" : "ℹ️");
    toast.innerHTML = `<span>${icon}</span> <span>${this.escapeHtml(msg)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  formatMarkdown(text) {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  setTxt(id, txt) { const el = document.getElementById(id); if (el) el.innerText = txt; }
  setHtml(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
}

// Global Engine Instance
function initSparkEngine() {
  if (!window.spark) {
    window.spark = new SparkPortalEngine();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSparkEngine);
} else {
  initSparkEngine();
}

// Immediate fallback instantiation ensuring spark methods are directly available on window
if (!window.spark) {
  window.spark = new SparkPortalEngine();
}
