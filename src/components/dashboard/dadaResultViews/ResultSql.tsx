interface ResultSqlProps {
    size?: "default" | "small"
    database?: string
  }
  
  export const ResultSql = ({ size = "default", database = "SQL" }: ResultSqlProps) => {
    const padding = size === "default" ? "p-3" : "p-2"
    const textSize = size === "default" ? "text-sm" : "text-xs"
  
    // Different SQL syntax based on database type
    const getSqlQuery = () => {
      switch (database) {
        case "PostgreSQL":
          return `SELECT c.name, p.price, p.date, 
    ((p.price - LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) / LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) * 100 as percent_change
  FROM cryptocurrencies c
  JOIN prices p ON c.id = p.crypto_id
  WHERE p.date >= '2023-10-25' AND p.date <= '2023-11-01'
    AND c.name IN ('Bitcoin', 'Ethereum', 'Cardano', 'XRP')
  ORDER BY c.name, p.date DESC;`
        case "Oracle":
          return `SELECT c.name, p.price, p.date, 
    ((p.price - LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) / LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) * 100 as percent_change
  FROM cryptocurrencies c
  JOIN prices p ON c.id = p.crypto_id
  WHERE p.date BETWEEN TO_DATE('2023-10-25', 'YYYY-MM-DD') AND TO_DATE('2023-11-01', 'YYYY-MM-DD')
    AND c.name IN ('Bitcoin', 'Ethereum', 'Cardano', 'XRP')
  ORDER BY c.name, p.date DESC;`
        case "MongoDB":
          return `db.cryptocurrencies.aggregate([
    { $match: { name: { $in: ["Bitcoin", "Ethereum", "Cardano", "XRP"] } } },
    { $lookup: {
        from: "prices",
        localField: "_id",
        foreignField: "crypto_id",
        as: "prices"
    }},
    { $unwind: "$prices" },
    { $match: { 
        "prices.date": { 
          $gte: ISODate("2023-10-25"), 
          $lte: ISODate("2023-11-01") 
        } 
    }},
    { $sort: { name: 1, "prices.date": -1 } }
  ]);`
        case "Pinecone":
          return `// Pinecone is a vector database, not typically used for this type of query
  // This is a placeholder for demonstration purposes
  
  // Assuming vectors represent cryptocurrency data points
  const results = await pineconeIndex.query({
    vector: cryptoEmbedding,
    topK: 10,
    filter: {
      date: { $gte: "2023-10-25", $lte: "2023-11-01" },
      name: { $in: ["Bitcoin", "Ethereum", "Cardano", "XRP"] }
    }
  });`
        default:
          return `SELECT c.name, p.price, p.date, 
    ((p.price - LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) / LAG(p.price) OVER (PARTITION BY c.name ORDER BY p.date)) * 100 as percent_change
  FROM cryptocurrencies c
  JOIN prices p ON c.id = p.crypto_id
  WHERE p.date >= '2023-10-25' AND p.date <= '2023-11-01'
    AND c.name IN ('Bitcoin', 'Ethereum', 'Cardano', 'XRP')
  ORDER BY c.name, p.date DESC;`
      }
    }
  
    return (
      <div className={`bg-gray-900 text-gray-100 ${padding} rounded font-mono ${textSize} overflow-x-auto`}>
        <pre>{getSqlQuery()}</pre>
      </div>
    )
  }