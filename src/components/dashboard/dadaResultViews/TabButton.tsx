"use client"

import type { LucideIcon } from "lucide-react"

interface TabButtonProps {
  isActive: boolean
  onClick: () => void
  icon: LucideIcon
  label: string
  size?: "default" | "small"
}

export const TabButton = ({ isActive, onClick, icon: Icon, label, size = "default" }: TabButtonProps) => {
  const iconSize = size === "default" ? 14 : 14
  const padding = size === "default" ? "px-3 py-1.5" : "px-2 py-1"
  const textSize = size === "default" ? "text-sm" : "text-xs"

  return (
    <button
      className={`${padding} ${textSize} ${isActive ? "bg-white border-t border-l border-r border-gray-200 rounded-t-md -mb-px" : "text-gray-500"}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <Icon size={iconSize} className="mr-1.5" />
        <span>{label}</span>
      </div>
    </button>
  )
}

