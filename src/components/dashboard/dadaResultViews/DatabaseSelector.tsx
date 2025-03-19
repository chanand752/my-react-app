"use client"

import { useState } from "react"
import { Database } from "lucide-react"

interface DatabaseSelectorProps {
  onDatabaseChange: (database: string) => void
}

export const DatabaseSelector = ({ onDatabaseChange }: DatabaseSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDb, setSelectedDb] = useState("SQL")

  const databases = ["SQL", "PostgreSQL", "Oracle", "Pinecone", "MongoDB"]

  const handleSelect = (db: string) => {
    setSelectedDb(db)
    onDatabaseChange(db)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded px-2 py-1"
      >
        <Database size={12} className="mr-1" />
        <span>{selectedDb}</span>
        <svg
          className="w-3 h-3 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded shadow-lg z-10">
          <ul className="py-1">
            {databases.map((db) => (
              <li key={db}>
                <button
                  onClick={() => handleSelect(db)}
                  className={`block w-full text-left px-3 py-1.5 text-xs ${
                    selectedDb === db ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                  }`}
                >
                  {db}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

