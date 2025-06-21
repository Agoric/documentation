import * as React from "react"

interface DiamondSlabCardProps {
  children: React.ReactNode
  className?: string
}

const DiamondSlabCard: React.FC<DiamondSlabCardProps> = ({ children, className }) => {
  const validChildren = React.Children.toArray(children).filter((child) => child != null && React.isValidElement(child))

  return (
    <div className={`relative rounded-lg shadow-md ${className || ""}`}>
      {validChildren.map((child) => {
        if (child && typeof child === "object" && "type" in child && child.type && child.type === "div") {
          return React.cloneElement(child, {
            className: `p-4 ${child.props?.className || ""}`,
          })
        }
        return child
      })}
    </div>
  )
}

export default DiamondSlabCard
