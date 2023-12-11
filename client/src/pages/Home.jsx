import React,{useEffect} from 'react';


const Home = () => {
  useEffect(()=>{
    document.title = "JazzyBurger | HomePage"
  })
  return (
    <main className="container">
      <h1>home</h1>

    </main>
  )
}

export default Home