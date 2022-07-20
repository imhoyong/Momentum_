function randomBackground(){
    const num = Math.floor(Math.random() * 6) + 1; 
  
document.body.style.background = `url('images/${num}.jpg')`; 
document.body.style.backgroundSize = "cover";
}

randomBackground();
