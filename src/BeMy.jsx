import React, { useEffect, useState } from 'react';

function BeMy() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [count, setCount] = useState(0);
  const [hoverText, setHoverText] = useState('');
  const [teasingTexts, setTeasingTexts] = useState([]);
  const [teasingEmoticons, setTeasingEmoticons] = useState([]);

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });
    setTeasingTexts(shuffleTexts());
  }, []);

  const shuffleTexts = () => {
    const texts = [
      "Chase me!",
      "Hell no!",
      "Click yes pls",
      "Are you tired aren't you?",
      "You will never chase me, click yes pls",
      "You'll have to do better than that!",
      "Huh?????????????? Ain't no way",
      "Maybe next time!",
      "No is not an option!",
      "Keep dreaming!",
      "You'll need more than luck, Adie",
      "Madulas to boi!",
      "Not today!",
      "Kulit mo rin eh no?",
      "Catch me if you can!",
      "Almost got me! Sike! Just kidding!",
      "Not even close!",
      "Shupi!",
      "Mapagod ka naman"
    ];
    return texts.sort(() => Math.random() - 0.5);
  };

  const teasingEmojis = ["🤡", "😜", "😂", "🤪", "😏"];

  const handleYesClick = () => {
    setShowPopup(true);
    // Redirect to another HTML file
    window.location.href = 'path/to/another/file.html';
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleMouseMove = () => {
    if (teasingTexts.length === 0) {
      setTeasingTexts(shuffleTexts());
    }
    const newText = teasingTexts.pop();
    const newX = Math.random() * (window.innerWidth - 100);
    const newY = Math.random() * (window.innerHeight - 100);
    setPosition({ x: newX, y: newY });
    setHoverText(newText);
    handleCount();
    addTeasingEmoticon({ x: newX, y: newY });
  };

  const addTeasingEmoticon = (position) => {
    const randomEmoji = teasingEmojis[Math.floor(Math.random() * teasingEmojis.length)];
    setTeasingEmoticons([...teasingEmoticons, { ...position, emoji: randomEmoji }]);
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="container">
      <h1>Be my girlfriend?</h1>
      {showPopup && <Popup onClose={handleClosePopup} />}
      <div className="button-container">
        <button className="button yes-button" onClick={handleYesClick}>Yes</button>
        {teasingEmoticons.map((item, index) => (
          <div key={index} className="teasing-emoticon" style={{ left: `${item.x}px`, top: `${item.y}px` }}>
            {item.emoji}
          </div>
        ))}
        <button
          className='dodging-button no-button'
          onMouseEnter={handleMouseMove}
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          No
          {hoverText && <p className="hover-text">{hoverText}</p>}
        </button>
      </div>
    </div>
  );
}

export default BeMy;
