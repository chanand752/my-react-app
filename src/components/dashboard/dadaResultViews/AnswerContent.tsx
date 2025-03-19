import { useState } from "react"
import { TabNavigation } from "./TabNavigation"
import { TabContent } from "./TabContent"
import { ActionButtons } from "./ActionButtons"
import { DatabaseSelector } from "./DatabaseSelector"

interface AnswerContentProps {
  size?: "default" | "small"
  showDatabaseSelector?: boolean
}

export const AnswerContent = ({ size = "default", showDatabaseSelector = true }: AnswerContentProps) => {
  const [activeTab, setActiveTab] = useState("table")
  const [selectedDatabase, setSelectedDatabase] = useState("SQL")

  const handleDatabaseChange = (database: string) => {
    setSelectedDatabase(database)
    // In the future, this could trigger different data loading based on the database
    console.log(`Database changed to: ${database}`)
  }


  return (
    <div>
        {showDatabaseSelector && (
        <div className="flex justify-between items-center px-2 py-1 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm text-gray-600">Answer</h3>
          <DatabaseSelector onDatabaseChange={handleDatabaseChange} />
        </div>
      )}

      <div className="tabs-container border-b border-gray-200 mb-4">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} size={size} />
      </div>

      <TabContent activeTab={activeTab} size={size} />

      <ActionButtons size={size} />
    </div>
  )
}

