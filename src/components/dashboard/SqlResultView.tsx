"use client"

import { useState } from "react"
import { MessageSquare, Expand, Maximize, Minimize, Trash, X } from "lucide-react"
import type { Message } from "./models"
import * as Dialog from "@radix-ui/react-dialog"
import { AnswerContent } from "./dadaResultViews/AnswerContent"
import { TabNavigation } from "./dadaResultViews/TabNavigation"
import { TabContent } from "./dadaResultViews/TabContent"
import { ActionButtons } from "./dadaResultViews/ActionButtons"
import { DatabaseSelector } from "./dadaResultViews/DatabaseSelector"

interface SqlResultViewProps {
  message: Message
  index: number
  toggleMinimizeMessage: (index: number) => void
  handleDeleteMessage: (index: number) => void
  answer?: Message
}

const SqlResultView = ({ message, index, toggleMinimizeMessage, handleDeleteMessage }: SqlResultViewProps) => {
  const [activeTab, setActiveTab] = useState("table")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDatabase, setSelectedDatabase] = useState("SQL")

  const handleDatabaseChange = (database: string) => {
    setSelectedDatabase(database)
  }

  if (message.type === "query") {
    return (
      <div className="m-0 border border-gray-200 rounded-md overflow-hidden">
        <div className="p-2 border-b border-gray-200 flex justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-500" />
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="flex items-center space-x-1">
          {/* <DatabaseSelector onDatabaseChange={handleDatabaseChange} /> */}
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Dialog.Trigger asChild>
                <button className="text-gray-400 hover:text-gray-600" aria-label="Expand to full view">
                  <Expand size={16} />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] max-w-6xl overflow-auto p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={20} className="text-blue-500" />
                        <h2 className="text-xl font-semibold">{message.content}</h2>
                      </div>
                      <Dialog.Close asChild>
                        <button className="rounded-full p-1 hover:bg-gray-100">
                          <X size={20} />
                        </button>
                      </Dialog.Close>
                    </div>
                    <div className="mt-6">
                      {/* <h3 className="text-lg font-medium mb-4">Answer</h3> */}
                      <AnswerContent size="default" showDatabaseSelector={true} />
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <button
              onClick={() => toggleMinimizeMessage(index + 1)}
              className="text-gray-400 hover:text-gray-600"
              aria-label={message.minimized ? "Maximize" : "Minimize"}
            >
              {message.minimized ? <Maximize size={16} /> : <Minimize size={16} />}
            </button>
            <button
              onClick={() => handleDeleteMessage(index)}
              className="text-gray-400 hover:text-red-500"
              aria-label="Delete"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="m-0 border border-gray-200 rounded-md overflow-hidden">
        {!message.minimized && (
          <div>
            <div className="flex items-center justify-between px-2 py-1 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm text-gray-600">Answer</h3>
              <DatabaseSelector onDatabaseChange={handleDatabaseChange} />
            </div>
            <div className="tabs-container border-b border-gray-200">
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} size="small" />
            </div>

            {/* <TabContent activeTab={activeTab} size="small" /> */}
            <TabContent activeTab={activeTab} size="small" database={selectedDatabase} />
            <ActionButtons size="small" />
          </div>
        )}
        {message.minimized && (
          <div className="flex items-center justify-between px-2 py-1 bg-gray-50 rounded">
            <span className="text-xs text-gray-500">[Answer minimized]</span>
            <button
              onClick={() => toggleMinimizeMessage(index)}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Maximize"
            >
              <Maximize size={14} />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default SqlResultView


// "use client"

// import { useState } from "react"
// import {
//   Table,
//   BarChart,
//   Code,
//   Share,
//   Download,
//   Edit,
//   ThumbsUp,
//   ThumbsDown,
//   Copy,
//   Maximize,
//   Minimize,
//   Trash,
//   MessageSquare,
//   Expand,
// } from "lucide-react"
// import type { Message } from "./models"
// import * as Dialog from "@radix-ui/react-dialog"
// import { X } from "lucide-react"

// interface SqlResultViewProps {
//   message: Message
//   index: number
//   toggleMinimizeMessage: (index: number) => void
//   handleDeleteMessage: (index: number) => void
//   answer?: Message // Add this to receive the associated answer
// }

// const SqlResultView = ({ message, index, toggleMinimizeMessage, handleDeleteMessage, answer }: SqlResultViewProps) => {
//   const [activeTab, setActiveTab] = useState("table")
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   // Content for the dialog popup
//   const AnswerContent = () => (
//     <div>
//       <div className="tabs-container border-b border-gray-200 mb-4">
//         <div className="flex p-2 bg-gray-50">
//           <button
//             className={`px-3 py-1.5 ${activeTab === "table" ? "bg-white border-t border-l border-r border-gray-200 rounded-t-md -mb-px" : "text-gray-500"}`}
//             onClick={() => setActiveTab("table")}
//           >
//             <div className="flex items-center">
//               <Table size={14} className="mr-1.5" />
//               <span>Table</span>
//             </div>
//           </button>
//           <button
//             className={`px-3 py-1.5 ${activeTab === "chart" ? "bg-white border-t border-l border-r border-gray-200 rounded-t-md -mb-px" : "text-gray-500"}`}
//             onClick={() => setActiveTab("chart")}
//           >
//             <div className="flex items-center">
//               <BarChart size={14} className="mr-1.5" />
//               <span>Chart</span>
//             </div>
//           </button>
//           <button
//             className={`px-3 py-1.5 ${activeTab === "sql" ? "bg-white border-t border-l border-r border-gray-200 rounded-t-md -mb-px" : "text-gray-500"}`}
//             onClick={() => setActiveTab("sql")}
//           >
//             <div className="flex items-center">
//               <Code size={14} className="mr-1.5" />
//               <span>SQL</span>
//             </div>
//           </button>
//         </div>
//       </div>

//       <div className="p-2">
//         {activeTab === "table" && (
//           <div>
//             <table className="min-w-full border border-gray-200 text-sm">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-2 py-1.5 border text-left">Date</th>
//                   <th className="px-2 py-1.5 border text-left">Crypto</th>
//                   <th className="px-2 py-1.5 border text-left">Price</th>
//                   <th className="px-2 py-1.5 border text-left">Change</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-2 py-1.5 border">2023-11-01</td>
//                   <td className="px-2 py-1.5 border">Bitcoin (BTC)</td>
//                   <td className="px-2 py-1.5 border">$90,245</td>
//                   <td className="px-2 py-1.5 border text-green-600">+12.5%</td>
//                 </tr>
//                 {/* ... other rows ... */}
//                 <tr className="bg-gray-50">
//                         <td className="px-2 py-1 border">2023-11-01</td>
//                         <td className="px-2 py-1 border">Ethereum (ETH)</td>
//                         <td className="px-2 py-1 border">$3,245</td>
//                         <td className="px-2 py-1 border text-green-600">+8.2%</td>
//                       </tr>
//                       <tr>
//                         <td className="px-2 py-1 border">2023-11-01</td>
//                         <td className="px-2 py-1 border">Cardano (ADA)</td>
//                         <td className="px-2 py-1 border">$0.89</td>
//                         <td className="px-2 py-1 border text-green-600">+62.4%</td>
//                       </tr>
//                       <tr className="bg-gray-50">
//                         <td className="px-2 py-1 border">2023-11-01</td>
//                         <td className="px-2 py-1 border">XRP</td>
//                         <td className="px-2 py-1 border">$1.23</td>
//                         <td className="px-2 py-1 border text-green-600">+28.7%</td>
//                       </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         {activeTab === "chart" && (
//           <div className="h-64 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
//             <p className="text-gray-500">Chart visualization would be rendered here</p>
//           </div>
//         )}

//         {activeTab === "sql" && (
//           <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
//            <pre>
//                     {`SELECT c.name, p.price, p.date, 
//   ((p.price - LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) / LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) * 100 as percent_change
// FROM cryptocurrencies c
// JOIN prices p ON c.id = p.crypto_id
// WHERE p.date >= '2023-10-25' AND p.date <= '2023-11-01'
//   AND c.name IN ('Bitcoin', 'Ethereum', 'Cardano', 'XRP')
// ORDER BY c.name, p.date DESC;`}
//                   </pre>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between items-center p-2 bg-gray-50">
//         <div className="flex space-x-2">
//           <button className="flex items-center text-gray-500 hover:text-gray-700">
//             <Share size={14} className="mr-1" />
//             <span className="text-xs">Share</span>
//           </button>
//           <button className="flex items-center text-gray-500 hover:text-gray-700">
//             <Download size={14} className="mr-1" />
//             <span className="text-xs">Export</span>
//           </button>
//           <button className="flex items-center text-gray-500 hover:text-gray-700">
//             <Edit size={14} className="mr-1" />
//             <span className="text-xs">Rewrite</span>
//           </button>
//         </div>

//         <div className="flex items-center space-x-2">
//           <button className="text-gray-400 hover:text-gray-600">
//             <ThumbsUp size={14} />
//           </button>
//           <button className="text-gray-400 hover:text-gray-600">
//             <ThumbsDown size={14} />
//           </button>
//           <button className="text-gray-400 hover:text-gray-600">
//             <Copy size={14} />
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   if (message.type === "query") {
//     return (
//       <div className="mb-3 border border-gray-200 rounded-md overflow-hidden">
//         <div className="p-2 border-b border-gray-200 flex justify-between">
//           <div className="flex items-center gap-2">
//             <MessageSquare size={18} className="text-blue-500" />
//             <p className="text-sm">{message.content}</p>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//               <Dialog.Trigger asChild>
//                 <button className="text-gray-400 hover:text-gray-600" aria-label="Expand to full view">
//                   <Expand size={16} />
//                 </button>
//               </Dialog.Trigger>
//               <Dialog.Portal>
//                 <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
//                 <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
//                   <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] max-w-6xl overflow-auto p-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <div className="flex items-center gap-2">
//                         <MessageSquare size={20} className="text-blue-500" />
//                         <h2 className="text-xl font-semibold">{message.content}</h2>
//                       </div>
//                       <Dialog.Close asChild>
//                         <button className="rounded-full p-1 hover:bg-gray-100">
//                           <X size={20} />
//                         </button>
//                       </Dialog.Close>
//                     </div>
//                     <div className="mt-6">
//                       <h3 className="text-lg font-medium mb-4">Answer</h3>
//                       <AnswerContent />
//                     </div>
//                   </div>
//                 </Dialog.Content>
//               </Dialog.Portal>
//             </Dialog.Root>
//             <button
//               onClick={() => toggleMinimizeMessage(index + 1)}
//               className="text-gray-400 hover:text-gray-600"
//               aria-label={message.minimized ? "Maximize" : "Minimize"}
//             >
//               {message.minimized ? <Maximize size={16} /> : <Minimize size={16} />}
//             </button>
//             <button
//               onClick={() => handleDeleteMessage(index)}
//               className="text-gray-400 hover:text-red-500"
//               aria-label="Delete"
//             >
//               <Trash size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <div className="mb-3 border border-gray-200 rounded-md overflow-hidden">
//         {!message.minimized && (
//           <div>
//             <div className="flex items-center justify-between px-2 py-1 border-b border-gray-200 bg-gray-50">
//               <h3 className="text-sm text-gray-600">Answer</h3>
//             </div>
//             <div className="tabs-container border-b border-gray-200">
//               <div className="flex p-1 bg-gray-50">
//                 <button
//                   className={`px-2 py-1 text-xs ${activeTab === "table" ? "bg-white border-t border-l border-r border-gray-200 rounded-t-md -mb-px" : "text-gray-500"}`}
//                   onClick={() => setActiveTab("table")}
//                 >
//                   <div className="flex items-center">
//                     <Table size={14} className="mr-1" />
//                     <span>Table</span>
//                   </div>
//                 </button>
//                 <button
//                   className={`px-2 py-1 text-xs ${activeTab === "chart" ? "bg-white border-t border-l border-r border-gray-200 rounded-t-md -mb-px" : "text-gray-500"}`}
//                   onClick={() => setActiveTab("chart")}
//                 >
//                   <div className="flex items-center">
//                     <BarChart size={14} className="mr-1" />
//                     <span>Chart</span>
//                   </div>
//                 </button>
//                 <button
//                   className={`px-2 py-1 text-xs ${activeTab === "sql" ? "bg-white border-t border-l border-r border-gray-200 rounded-t-md -mb-px" : "text-gray-500"}`}
//                   onClick={() => setActiveTab("sql")}
//                 >
//                   <div className="flex items-center">
//                     <Code size={14} className="mr-1" />
//                     <span>SQL</span>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             <div className="p-2">
//               {activeTab === "table" && (
//                 <div>
//                   <table className="min-w-full border border-gray-200 text-xs">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="px-2 py-1 border text-left">Date</th>
//                         <th className="px-2 py-1 border text-left">Crypto</th>
//                         <th className="px-2 py-1 border text-left">Price</th>
//                         <th className="px-2 py-1 border text-left">Change</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className="px-2 py-1 border">2023-11-01</td>
//                         <td className="px-2 py-1 border">Bitcoin (BTC)</td>
//                         <td className="px-2 py-1 border">$90,245</td>
//                         <td className="px-2 py-1 border text-green-600">+12.5%</td>
//                       </tr>
//                       <tr className="bg-gray-50">
//                         <td className="px-2 py-1 border">2023-11-01</td>
//                         <td className="px-2 py-1 border">Ethereum (ETH)</td>
//                         <td className="px-2 py-1 border">$3,245</td>
//                         <td className="px-2 py-1 border text-green-600">+8.2%</td>
//                       </tr>
//                       <tr>
//                         <td className="px-2 py-1 border">2023-11-01</td>
//                         <td className="px-2 py-1 border">Cardano (ADA)</td>
//                         <td className="px-2 py-1 border">$0.89</td>
//                         <td className="px-2 py-1 border text-green-600">+62.4%</td>
//                       </tr>
//                       <tr className="bg-gray-50">
//                         <td className="px-2 py-1 border">2023-11-01</td>
//                         <td className="px-2 py-1 border">XRP</td>
//                         <td className="px-2 py-1 border">$1.23</td>
//                         <td className="px-2 py-1 border text-green-600">+28.7%</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {activeTab === "chart" && (
//                 <div className="h-40 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
//                   <p className="text-gray-500 text-xs">Chart visualization would be rendered here</p>
//                 </div>
//               )}

//               {activeTab === "sql" && (
//                 <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-xs overflow-x-auto">
//                   <pre>
//                     {`SELECT c.name, p.price, p.date, 
//   ((p.price - LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) / LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) * 100 as percent_change
// FROM cryptocurrencies c
// JOIN prices p ON c.id = p.crypto_id
// WHERE p.date >= '2023-10-25' AND p.date <= '2023-11-01'
//   AND c.name IN ('Bitcoin', 'Ethereum', 'Cardano', 'XRP')
// ORDER BY c.name, p.date DESC;`}
//                   </pre>
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-between items-center p-1.5 bg-gray-50">
//               <div className="flex space-x-2">
//                 <button className="flex items-center text-gray-500 hover:text-gray-700">
//                   <Share size={12} className="mr-1" />
//                   <span className="text-xs">Share</span>
//                 </button>
//                 <button className="flex items-center text-gray-500 hover:text-gray-700">
//                   <Download size={12} className="mr-1" />
//                   <span className="text-xs">Export</span>
//                 </button>
//                 <button className="flex items-center text-gray-500 hover:text-gray-700">
//                   <Edit size={12} className="mr-1" />
//                   <span className="text-xs">Rewrite</span>
//                 </button>
//               </div>

//               <div className="flex items-center space-x-1.5">
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <ThumbsUp size={12} />
//                 </button>
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <ThumbsDown size={12} />
//                 </button>
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <Copy size={12} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {message.minimized && (
//           <div className="flex items-center justify-between px-2 py-1 bg-gray-50 rounded">
//             <span className="text-xs text-gray-500">[Answer minimized]</span>
//             <button
//               onClick={() => toggleMinimizeMessage(index)}
//               className="p-1 text-gray-400 hover:text-gray-600"
//               aria-label="Maximize"
//             >
//               <Maximize size={14} />
//             </button>
//           </div>
//         )}
//       </div>
//     )
//   }
// }

// export default SqlResultView
