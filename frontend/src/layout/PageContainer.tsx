import React from "react"

export const PageContainer: React.FC = ({ children }) => {
  return (
    <div className="App">
      <header className="App-header">{children}</header>
    </div>
  )
}
