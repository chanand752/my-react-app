interface ResultChartProps {
    size?: "default" | "small"
    database?: string
  }
  
  export const ResultChart = ({ size = "default",database = "SQL"}: ResultChartProps) => {
    const height = size === "default" ? "h-64" : "h-40"
    const textSize = size === "default" ? "text-sm" : "text-xs"
  
    return (
      <div className={`${height} bg-gray-50 rounded border border-gray-200 flex items-center justify-center`}>
        <p className={`text-gray-500 ${textSize}`}>Chart visualization would be rendered here</p>
      </div>
    )
  }
  
  