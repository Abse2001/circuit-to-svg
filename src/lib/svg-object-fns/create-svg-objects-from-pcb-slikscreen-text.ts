import type { PcbSilkscreenText } from "@tscircuit/soup"
import type { INode as SvgObject } from "svgson"
import {
  type Matrix,
  applyToPoint,
  compose,
  rotate,
  translate,
} from "transformation-matrix"

export function createSvgObjectsFromPcbSilkscreenText(
  PcbSilkscreenText: PcbSilkscreenText,
  transform: Matrix,
): SvgObject[] {
  const {
    anchor_position,
    text,
    font_size = 1,
    layer = "top",
  } = PcbSilkscreenText

  if (
    !anchor_position ||
    typeof anchor_position.x !== "number" ||
    typeof anchor_position.y !== "number"
  ) {
    console.error("Invalid anchor_position:", anchor_position)
    return []
  }

  const [transformedX, transformedY] = applyToPoint(transform, [
    anchor_position.x,
    anchor_position.y,
  ])
  const transformedFontSize = font_size * Math.abs(transform.a)

  // Remove ${} from text value and handle undefined text
  const cleanedText = (text || "").replace(/\$\{|\}/g, "")
  if (!cleanedText) {
    return []
  }

  // Create a composite transformation
  const textTransform = compose(
    translate(transformedX, transformedY),
    rotate(Math.PI / 180), // Convert degrees to radians
  )

  const svgObject: SvgObject = {
    name: "text",
    type: "element",
    attributes: {
      x: "0",
      y: "0",
      "font-family": "Arial, sans-serif",
      "font-size": transformedFontSize.toString(),
      "text-anchor": "middle",
      "dominant-baseline": "central",
      transform: `matrix(${textTransform.a} ${textTransform.b} ${textTransform.c} ${textTransform.d} ${textTransform.e} ${textTransform.f})`,
      class: `pcb-silkscreen-text pcb-silkscreen-${layer}`,
      "data-pcb-silkscreen-text-id": PcbSilkscreenText.pcb_component_id,
    },
    children: [
      {
        type: "text",
        value: cleanedText,
        name: "",
        attributes: {},
        children: [],
      },
    ],
    value: "",
  }

  return [svgObject]
}