import React, { isValidElement } from "react"

interface DiamondSlabCardProps {
  children: React.ReactNode
  className?: string
}

const DiamondSlabCard: React.FC<DiamondSlabCardProps> = ({ children, className }) => {
  return (
    <div className={`relative rounded-lg shadow-md ${className || ""}`}>
      {React.Children.toArray(children)
        .filter(isValidElement)
        .map((child) => {
          if (child.type === "div") {
            return React.cloneElement(child, {
              className: `p-4 ${child.props.className || ""}`,
            })
          }
          return child
        })}
    </div>
  )
}

export default DiamondSlabCard
