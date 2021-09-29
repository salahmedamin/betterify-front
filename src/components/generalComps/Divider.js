import React from 'react'
import { colors } from '../../colors'

export default function Divider({
    color,
    showCondition,
    width,
    height,
}) {
    return (
        <div
        style={{
          width,
          height,
          borderTop: width ? "1px solid "+(color||colors.gray) : undefined,
          borderLeft: height ? "1px solid "+(color||colors.gray) : undefined,
          transition: ".3s ease all",
          visibility: showCondition ? "hidden":"visible",
          opacity: showCondition ? 0:1
        }}
      />
    )
}
