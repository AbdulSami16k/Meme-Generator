import React  from "react";
export default function Memes(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
      });
      const [allMemes, setAllMemes] = React.useState([]);
    
      React.useEffect(() => {
        async function fetchMemes() {
          const res = await fetch("https://api.imgflip.com/get_memes");
          const data = await res.json();
          setAllMemes(data.data.memes);
        }
        fetchMemes();
      }, []);
    
      function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme((prevMeme) => ({
          ...prevMeme,
          randomImage: url,
        }));
      }
    
      function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevMeme) => ({
          ...prevMeme,
          [name]: value,
        }));
      }
    
      function handleDownload() {
        const canvas = document.createElement("canvas");
        canvas.width = 600; // Set the width of the canvas as needed
        canvas.height = 600; // Set the height of the canvas as needed
    
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous"; // To avoid CORS issues
        img.src = meme.randomImage;
    
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
          ctx.font = "40px Impact";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(meme.topText, canvas.width / 2, 10);
    
          ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 60);
    
          // Create a download link
          const downloadLink = document.createElement("a");
          downloadLink.download = "meme.png";
          downloadLink.href = canvas.toDataURL("image/png");
    
          // Simulate a click on the link to trigger the download
          downloadLink.click();
        };
      }
    
      return (
        <main>
          <div className="form">
            <input
              type="text"
              placeholder="Top text"
              className="form--input"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Bottom text"
              className="form--input"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
            <button className="form--button" onClick={getMemeImage}>
              Get a new meme image 
            </button>
            <button className="form--button" onClick={handleDownload}>
              Download Meme
            </button>
          </div>
          <div className="meme">
            <img src={meme.randomImage} className="meme--image" alt="Meme" />
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
          </div>
        </main>
      );
    }
    
