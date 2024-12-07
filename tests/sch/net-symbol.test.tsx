import { expect, test } from "bun:test"
import type { SchematicNetLabel } from "circuit-json"
import { convertCircuitJsonToSchematicSvg } from "lib/index"

test("schematic net symbol", () => {
  // NOTE: center isn't computed properly where anchor_position is defined but
  // this doesn't affect the implementation, which prefers to use anchor_position.
  // There are some net labels missing anchor_position intentionally to test
  // computing the anchor position
  const circuitJson: SchematicNetLabel[] = [
    {
      type: "schematic_net_label",
      source_net_id: "net1",
      center: { x: 0, y: 3 },
      anchor_position: { x: 0, y: 3 },
      anchor_side: "top",
      text: "VCC",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net2",
      center: { x: 1, y: 3 },
      anchor_position: { x: 1, y: 3 },
      anchor_side: "bottom",
      text: "GND",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net3",
      center: { x: 0, y: 4 },
      anchor_position: { x: 0, y: 4 },
      anchor_side: "left",
      text: "SDA",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net4",
      center: { x: 2, y: 4 },
      anchor_position: { x: 2, y: 4 },
      anchor_side: "right",
      text: "SCL",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net5",
      center: { x: 0, y: 1 },
      anchor_position: { x: 0, y: 1 },
      anchor_side: "left",
      text: "short label",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net6",
      center: { x: 0, y: 0 },
      anchor_position: { x: 0, y: 0 },
      anchor_side: "left",
      text: "WWWWWWWWWW", // W is a wide character
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net5",
      center: { x: 2.5, y: -0.5 },
      anchor_position: { x: 2.5, y: -0.5 },
      anchor_side: "bottom",
      text: "superlong label. This is a long one!",
      symbol_name: "GND",
    },

    {
      type: "schematic_net_label",
      source_net_id: "net5",
      center: { x: 4, y: 1 },
      anchor_side: "left",
      text: "CENTER1",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net5",
      center: { x: 4, y: 2 },
      anchor_side: "right",
      text: "CENTER2",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net5",
      center: { x: 4, y: 3 },
      anchor_side: "top",
      text: "CENTER3",
      symbol_name: "GND",
    },
    {
      type: "schematic_net_label",
      source_net_id: "net5",
      center: { x: 4, y: 4 },
      anchor_side: "bottom",
      text: "CENTER4",
      symbol_name: "GND",
    },
  ]

  expect(
    // @ts-ignore
    convertCircuitJsonToSchematicSvg(circuitJson, {
      grid: {
        cellSize: 1,
        labelCells: true,
      },
      labeledPoints: [
        { x: 0, y: 3, label: "anchor_side=top" },
        { x: 1, y: 3, label: "anchor_side=bottom" },
        { x: 0, y: 4, label: "anchor_side=left" },
        { x: 2, y: 4, label: "anchor_side=right" },
        { x: 4, y: 1, label: "center1" },
        { x: 4, y: 2, label: "center2" },
        { x: 4, y: 3, label: "center3" },
        { x: 4, y: 4, label: "center4" },
      ],
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
