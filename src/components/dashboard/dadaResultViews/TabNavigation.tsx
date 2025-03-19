"use client"

import { Table, BarChart, Code } from "lucide-react"
import { TabButton } from "./TabButton"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  size?: "default" | "small"
}

export const TabNavigation = ({ activeTab, setActiveTab, size = "default" }: TabNavigationProps) => {
  return (
    <div className="flex p-1 bg-gray-50">
      <TabButton
        isActive={activeTab === "table"}
        onClick={() => setActiveTab("table")}
        icon={Table}
        label="Table"
        size={size}
      />
      <TabButton
        isActive={activeTab === "chart"}
        onClick={() => setActiveTab("chart")}
        icon={BarChart}
        label="Chart"
        size={size}
      />
      <TabButton
        isActive={activeTab === "sql"}
        onClick={() => setActiveTab("sql")}
        icon={Code}
        label="SQL"
        size={size}
      />
    </div>
  )
}

