import { Share, Download, Edit, ThumbsUp, ThumbsDown, Copy } from "lucide-react"

interface ActionButtonsProps {
  size?: "default" | "small"
}

export const ActionButtons = ({ size = "default" }: ActionButtonsProps) => {
  const iconSize = size === "default" ? 14 : 12
  const textSize = size === "default" ? "text-xs" : "text-xs"
  const padding = size === "default" ? "p-2" : "p-1.5"

  return (
    <div className={`flex justify-between items-center ${padding} bg-gray-50`}>
      <div className="flex space-x-2">
        <button className="flex items-center text-gray-500 hover:text-gray-700">
          <Share size={iconSize} className="mr-1" />
          <span className={textSize}>Share</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-gray-700">
          <Download size={iconSize} className="mr-1" />
          <span className={textSize}>Export</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-gray-700">
          <Edit size={iconSize} className="mr-1" />
          <span className={textSize}>Rewrite</span>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button className="text-gray-400 hover:text-gray-600">
          <ThumbsUp size={iconSize} />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <ThumbsDown size={iconSize} />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <Copy size={iconSize} />
        </button>
      </div>
    </div>
  )
}

