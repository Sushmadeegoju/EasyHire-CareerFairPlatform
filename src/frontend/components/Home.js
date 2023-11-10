// App.js
import React from "react";
import "../css/App.css";


function Home() {
  return (
    <div class='home'>
      <title>EasyHire</title>
      <main>
          <div class="align-home">
          <div> 
            <br/><br/><br/><br/><br/><br/>
            <h1>From Hello to Hired! </h1><br/>
            <h3>We create meaningful connections between companies and candidates.<br/><br/>
              Whether you need a job or need to fill one, we're your trusted partner.</h3></div>
          {/* <div class= "side-image"></div></div> */}
            <div><img src="/homeimg.jpeg"></img></div>
          </div>
      </main>

      <footer>
      </footer>

    </div>

  );
}
    
export default Home;