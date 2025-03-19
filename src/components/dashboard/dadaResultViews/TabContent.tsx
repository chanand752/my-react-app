import { ResultTable } from "./ResultTable"
import { ResultChart } from "./ResultChart"
import { ResultSql } from "./ResultSql"

interface TabContentProps {
  activeTab: string
  size?: "default" | "small"
  database?: string
}

export const TabContent = ({ activeTab, size = "default", database = "SQL" }: TabContentProps) => {
  return (
    <div className="p-2">
    {activeTab === "table" && <ResultTable size={size} database={database} />}
    {activeTab === "chart" && <ResultChart size={size} database={database} />}
    {activeTab === "sql" && <ResultSql size={size} database={database} />}
  </div>
  )
}

