import * as React from "react"

interface DiamondSlabCardProps {
  children: React.ReactNode
  className?: string
}

export function DiamondSlabCard({ children, className }: DiamondSlabCardProps) {
  const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child))

  return (
    <div className={`relative rounded-lg shadow-md ${className ?? ""}`}>
      {validChildren.map((child: any) =>
        child.type === "div"
          ? React.cloneElement(child, {
              className: `p-4 ${child.props?.className ?? ""}`,
            })
          : child,
      )}
    </div>
  )
}

export default DiamondSlabCard
