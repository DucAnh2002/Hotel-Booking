import React from 'react'

interface StarsProps {
  count: number
}

const Stars: React.FC<StarsProps> = ({ count }) => {
  return (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-sm ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
    </div>
  )
}

export default Stars
