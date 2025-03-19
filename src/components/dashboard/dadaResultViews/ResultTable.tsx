interface ResultTableProps {
    size?: "default" | "small"
    database?: string
  }
  
  export const ResultTable = ({ size = "default", database = "SQL" }: ResultTableProps) => {
    const textSize = size === "default" ? "text-sm" : "text-xs"
    const padding = size === "default" ? "px-2 py-1.5" : "px-2 py-1"
  
    return (
      <div>
        <table className={`min-w-full border border-gray-200 ${textSize}`}>
          <thead>
            <tr className="bg-gray-100">
              <th className={`${padding} border text-left`}>Date</th>
              <th className={`${padding} border text-left`}>Crypto</th>
              <th className={`${padding} border text-left`}>Price</th>
              <th className={`${padding} border text-left`}>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${padding} border`}>2023-11-01</td>
              <td className={`${padding} border`}>Bitcoin (BTC)</td>
              <td className={`${padding} border`}>$90,245</td>
              <td className={`${padding} border text-green-600`}>+12.5%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={`${padding} border`}>2023-11-01</td>
              <td className={`${padding} border`}>Ethereum (ETH)</td>
              <td className={`${padding} border`}>$3,245</td>
              <td className={`${padding} border text-green-600`}>+8.2%</td>
            </tr>
            <tr>
              <td className={`${padding} border`}>2023-11-01</td>
              <td className={`${padding} border`}>Cardano (ADA)</td>
              <td className={`${padding} border`}>$0.89</td>
              <td className={`${padding} border text-green-600`}>+62.4%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={`${padding} border`}>2023-11-01</td>
              <td className={`${padding} border`}>XRP</td>
              <td className={`${padding} border`}>$1.23</td>
              <td className={`${padding} border text-green-600`}>+28.7%</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  
  