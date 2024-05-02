const visibility = {
  visible: 1,
  invisible: 0,
  marked: 2
};

let tiles = [];
let visible = [];
let size = 15;
let tileWidth = 60;

let bombAmount = 20;

let gameOver = false;

function setup() {
  createCanvas(600, 600);
  tileWidth = width / size;
  
  for (let x = 0; x < size; x++) {
    tiles[x] = [];
    for (let y = 0; y < size; y++) {
      tiles[x][y] = 0;
    }
  } 
  
  for (let x = 0; x < size; x++) {
    visible[x] = [];
    for (let y = 0; y < size; y++) {
      visible[x][y] = visibility.invisible;
    }
  } 
  
  placeBombs();
  
  loop();
}

function draw() {
  background(220);
  
  
  for (let x = 0; x < tiles.length; x++) {
    for (let y = 0; y < tiles[x].length; y++) {
      if(visible[x][y] == visibility.invisible){
        fill("gray")
      }
      else if(visible[x][y] == visibility.marked){
        fill("red")
      }else {
        fill(255,255,255)
      }
      square(x * tileWidth,y * tileWidth, tileWidth)
      if(visible[x][y] == visibility.visible) {
        fill(0,0,0)
        if(tiles[x][y] != 0){
          textSize(tileWidth / 2);
          text(tiles[x][y], 
               x * tileWidth + 1/3 * tileWidth,
               y * tileWidth + 2/3 * tileWidth);
        }
      }
    }
  }
}

function mouseClicked() {
  let x = floor(mouseX / tileWidth);
  let y = floor(mouseY / tileWidth);
  
  
  if(mouseButton == LEFT){
    
    if (keyIsPressed && keyCode == CONTROL) {
      if(visible[x][y] != visibility.invisible) return;
      visible[x][y] = visibility.marked;
      return;
    }
    
    if(visible[x][y] == visibility.marked) {
      visible[x][y] = visibility.invisible;
      return;
    }
    
    if(isBomb(x,y)) {
      gameOver = true;
    } else {
      floodfill(x,y);
    }
  }
  
}

function floodfill(x,y) {
  if(isOut(x,y)) return;
  if(visible[x][y] == visibility.visible) return;
  visible[x][y] = visibility.visible;
  if(tiles[x][y] != 0) return;
  floodfill(x + 1,y);
  floodfill(x - 1,y);
  
  floodfill(x + 1,y + 1);
  floodfill(x - 1,y + 1);
  
  floodfill(x + 1,y - 1);
  floodfill(x - 1,y - 1);
  
  floodfill(x,y - 1);
  floodfill(x,y + 1);
}

function placeBombs() {
  for (let i = 0; i < bombAmount; i++) {
    let pos = getRandomBombPos();
    tiles[pos[0]][pos[1]] = -1;
  }
  
  for (let x = 0; x < tiles.length; x++) {
    for (let y = 0; y < tiles[x].length; y++) {
      if(tiles[x][y] != -1){
        tiles[x][y] = getNumber(x,y);
      }
    }
  }
}

function getNumber(x,y) {
  return isBomb(x + 1, y + 1) + 
    isBomb(x, y + 1) + 
    isBomb(x, y - 1) + 
    isBomb(x + 1, y - 1) + 
    isBomb(x - 1, y - 1) + 
    isBomb(x - 1, y + 1) + 
    isBomb(x - 1, y) +
    isBomb(x + 1, y);
}

function isBomb(x,y) {
  if(isOut(x,y)) return false;
  return tiles[x][y] == -1;
}

function isOut(x,y){
  return x < 0 || y < 0 || x >= size || y >= size;
}

function getRandomBombPos() {
  let x = floor(random(0,size))
  let y = floor(random(0,size))
    
  if(tiles[x][y] == -1) {
    return getRandomBombPos();
  }
  return [x,y]
}