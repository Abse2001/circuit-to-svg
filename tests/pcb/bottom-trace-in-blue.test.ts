import { test, expect } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "lib"

const soup: any = [
  {
    type: "source_port",
    source_port_id: "source_port_0",
    name: "pin1",
    pin_number: 1,
    port_hints: ["-", "left", "pin1", "1"],
    source_component_id: "source_component_0",
  },
  {
    type: "source_port",
    source_port_id: "source_port_1",
    name: "pin2",
    pin_number: 2,
    port_hints: ["+", "right", "pin2", "2"],
    source_component_id: "source_component_0",
  },
  {
    type: "source_component",
    source_component_id: "source_component_0",
    ftype: "simple_resistor",
    name: "R1",
    resistance: 100000,
  },
  {
    type: "source_port",
    source_port_id: "source_port_2",
    name: "pin1",
    pin_number: 1,
    port_hints: ["anode", "pos", "pin1", "1"],
    source_component_id: "source_component_1",
  },
  {
    type: "source_port",
    source_port_id: "source_port_3",
    name: "pin2",
    pin_number: 2,
    port_hints: ["cathode", "neg", "pin2", "2"],
    source_component_id: "source_component_1",
  },
  {
    type: "source_component",
    source_component_id: "source_component_1",
    ftype: "simple_diode",
    name: "LED1",
  },
  {
    type: "source_trace",
    source_trace_id: "source_trace_0",
    connected_source_port_ids: ["source_port_1", "source_port_2"],
    connected_source_net_ids: [],
  },
  {
    type: "schematic_component",
    schematic_component_id: "schematic_component_0",
    center: {
      x: 0,
      y: 0,
    },
    rotation: 0,
    size: {
      width: 1,
      height: 0.55,
    },
    source_component_id: "source_component_0",
    symbol_name: "boxresistor_right",
  },
  {
    type: "schematic_component",
    schematic_component_id: "schematic_component_1",
    center: {
      x: 0,
      y: 0,
    },
    rotation: 0,
    size: {
      width: 1.0521572000000003,
      height: 0.4594567000000005,
    },
    source_component_id: "source_component_1",
    symbol_name: "led_right",
  },
  {
    type: "schematic_port",
    schematic_port_id: "schematic_port_0",
    schematic_component_id: "schematic_component_0",
    center: {
      x: -0.5,
      y: 0,
    },
    source_port_id: "source_port_0",
    facing_direction: "left",
  },
  {
    type: "schematic_port",
    schematic_port_id: "schematic_port_1",
    schematic_component_id: "schematic_component_0",
    center: {
      x: 0.5,
      y: 0,
    },
    source_port_id: "source_port_1",
    facing_direction: "right",
  },
  {
    type: "schematic_port",
    schematic_port_id: "schematic_port_2",
    schematic_component_id: "schematic_component_1",
    center: {
      x: -0.5366871000000004,
      y: -0.0018268500000008514,
    },
    source_port_id: "source_port_2",
    facing_direction: "left",
  },
  {
    type: "schematic_port",
    schematic_port_id: "schematic_port_3",
    schematic_component_id: "schematic_component_1",
    center: {
      x: 0.5357314999999996,
      y: -0.0013733499999983023,
    },
    source_port_id: "source_port_3",
    facing_direction: "right",
  },
  {
    type: "pcb_component",
    pcb_component_id: "pcb_component_0",
    center: {
      x: -2,
      y: 0,
    },
    width: 1.5999999999999999,
    height: 0.6000000000000001,
    layer: "top",
    rotation: 0,
    source_component_id: "source_component_0",
  },
  {
    type: "pcb_component",
    pcb_component_id: "pcb_component_1",
    center: {
      x: 2,
      y: 0,
    },
    width: 1.5999999999999999,
    height: 0.6000000000000001,
    layer: "top",
    rotation: 0,
    source_component_id: "source_component_1",
  },
  {
    type: "pcb_board",
    pcb_board_id: "pcb_board_0",
    center: {
      x: 0,
      y: 0,
    },
    width: 10,
    height: 12,
  },
  {
    type: "pcb_smtpad",
    pcb_smtpad_id: "pcb_smtpad_0",
    pcb_component_id: "pcb_component_0",
    pcb_port_id: "pcb_port_0",
    layer: "top",
    shape: "rect",
    width: 0.6000000000000001,
    height: 0.6000000000000001,
    port_hints: ["1", "left"],
    x: -2.5,
    y: 0,
  },
  {
    type: "pcb_smtpad",
    pcb_smtpad_id: "pcb_smtpad_1",
    pcb_component_id: "pcb_component_0",
    pcb_port_id: "pcb_port_1",
    layer: "top",
    shape: "rect",
    width: 0.6000000000000001,
    height: 0.6000000000000001,
    port_hints: ["2", "right"],
    x: -1.5,
    y: 0,
  },
  {
    type: "pcb_smtpad",
    pcb_smtpad_id: "pcb_smtpad_2",
    pcb_component_id: "pcb_component_1",
    pcb_port_id: "pcb_port_2",
    layer: "top",
    shape: "rect",
    width: 0.6000000000000001,
    height: 0.6000000000000001,
    port_hints: ["1", "left"],
    x: 1.5,
    y: 0,
  },
  {
    type: "pcb_smtpad",
    pcb_smtpad_id: "pcb_smtpad_3",
    pcb_component_id: "pcb_component_1",
    pcb_port_id: "pcb_port_3",
    layer: "top",
    shape: "rect",
    width: 0.6000000000000001,
    height: 0.6000000000000001,
    port_hints: ["2", "right"],
    x: 2.5,
    y: 0,
  },
  {
    type: "pcb_port",
    pcb_port_id: "pcb_port_0",
    pcb_component_id: "pcb_component_0",
    layers: ["top"],
    x: -2.5,
    y: 0,
    source_port_id: "source_port_0",
  },
  {
    type: "pcb_port",
    pcb_port_id: "pcb_port_1",
    pcb_component_id: "pcb_component_0",
    layers: ["top"],
    x: -1.5,
    y: 0,
    source_port_id: "source_port_1",
  },
  {
    type: "pcb_port",
    pcb_port_id: "pcb_port_2",
    pcb_component_id: "pcb_component_1",
    layers: ["top"],
    x: 1.5,
    y: 0,
    source_port_id: "source_port_2",
  },
  {
    type: "pcb_port",
    pcb_port_id: "pcb_port_3",
    pcb_component_id: "pcb_component_1",
    layers: ["top"],
    x: 2.5,
    y: 0,
    source_port_id: "source_port_3",
  },
  {
    type: "pcb_trace",
    pcb_trace_id: "pcb_trace_0",
    route: [
      {
        route_type: "wire",
        x: -1.5,
        y: 0,
        width: 0.1,
        layer: "top",
      },
      {
        route_type: "wire",
        x: -1.5,
        y: 5,
        width: 0.1,
        layer: "top",
      },
      {
        route_type: "via",
        from_layer: "top",
        to_layer: "bottom",
        x: -1,
        y: 5,
      },
      {
        route_type: "wire",
        x: -1,
        y: 5,
        width: 0.1,
        layer: "top",
      },
      {
        route_type: "wire",
        x: -1,
        y: 5,
        width: 0.1,
        layer: "bottom",
      },
      {
        route_type: "via",
        from_layer: "bottom",
        to_layer: "top",
        x: 1,
        y: 5,
      },
      {
        route_type: "wire",
        x: 1,
        y: 5,
        width: 0.1,
        layer: "bottom",
      },
      {
        route_type: "wire",
        x: 1,
        y: 5,
        width: 0.1,
        layer: "top",
      },
      {
        route_type: "wire",
        x: 1,
        y: 0,
        width: 0.1,
        layer: "top",
      },
      {
        route_type: "wire",
        x: 1.5,
        y: 0,
        width: 0.1,
        layer: "top",
      },
    ],
    source_trace_id: "source_trace_0",
  },
]

test("bottom trace is blue", () => {
  expect(convertCircuitJsonToPcbSvg(soup)).toMatchSvgSnapshot(import.meta.path)
})
