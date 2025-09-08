import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SinglePost from "./components/SinglePost";
import Post from "./components/Post";
//import Project from "./components/Project";
import Navbar from "./components/Navbar";
const images = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<SinglePost />} />
        <Route path="/post" element={<Post />} />
        <Route path="/about"
              element={
        <About
        firstContent=
        {
          <img
            src="https://res.cloudinary.com/dtbj43yha/image/upload/v1738381859/cat_aojuu7.jpg"
            alt="可愛的貓咪"/>
          }
        secondContent={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              backgroundColor: "#111"
            }}>
            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>喵!</p>
          </div>
        }
        gridSize={12}
        pixelColor='#ffffff'
        animationStepDuration={0.4}
        className="custom-pixel-card"/>
  }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
