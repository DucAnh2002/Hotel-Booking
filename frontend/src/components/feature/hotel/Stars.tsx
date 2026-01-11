import React from 'react'

interface StarsProps {
  count: number
}

const Stars: React.FC<StarsProps> = ({ count }) => {
  const starsArray = []

  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <span key={i} className={`text-[1.1rem] ${i < count ? 'text-[#f5a623]' : 'text-[#ccc]'}`}>
        &#9733;
      </span>
    )
  }

  return <div className="flex gap-1 mb-2.5">{starsArray}</div>
}

export default Stars
