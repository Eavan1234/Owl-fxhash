let RAND = Math.random(0,1); // Random number between 0 and 1
let mult; // The transformation coefficient obtained from RAND
let COLS;  // Colors array
let Cols; // The colors code

//Determine coefficients(mult) & colors(COLS) according to random numbers from fxrand()(RAND)
if(RAND < 0.1) {
  mult = RAND+0.3; // Make sure the mult is not too small to draw
  COLS = ['#fe938c','#f7c548','#7b9e87','#a0c1d1','#5d576b'];// NFT cannot make any network request, so colors needs to be defined
}
else if (RAND >= 0.1 && RAND <= 0.2) {
  mult = RAND*5;
  COLS = ['#f4f1de','#e07a5f','#3d405b','#81b29a','#f2cc8f'];
}
else if (RAND >= 0.2 && RAND <= 0.3) {
  mult = RAND*3;
  COLS = ['#8ecae6','#219ebc','#023047','#ffb703','#fb8500'];
}
else if (RAND >= 0.3 && RAND <= 0.6) {
  mult = RAND;
  COLS = ['#e63946','#f1faee','#a8dadc','#457b9d','#1d3557'];
}
else {
  mult = RAND;
  COLS = ['#4f454f','#696172','#807689','#ca91a9','#ddb8c7'];
}

Cols = COLS.toString(); // Convert the colors array to string for display in the sandbox/html

function setup(){
  const s = min(windowWidth, windowHeight); // Respond to window size (ie adapt itself to any screen size)
  createCanvas(s, s); // "resize" event of the "window"
  frameRate(0.75); // Color change time
}

function draw(){
  COLS = shuffle(COLS); // Scramble the color array
  
  clear(); // Clear the canvas
  background(RAND*255); // The canvas background color
  
  //Draw boundary line
  noFill(); 
  stroke(255);
  rect(30,30,width-60,height-60);
  
  const u = min(width , height) * 0.15 * mult; // Determine a unit size based on screen width and height
  const cx = width * 0.55; // The center point x-coordinate
  const cy = height * 0.7; // The center point y-coordinate
  const x = cx - u; // The upper left x-coordinate of the owl, used for relative position after translate
  const y = cy - u*3/2; // The upper left y-coordinate of the owl, used for relative position after translate
  const treeLen = width * 0.6; // The width of the trees
  
  // Draw the tree
  noStroke();
  fill(0);
  rect(cx - treeLen * 0.5, cy, treeLen*0.8, 20);

  // Draw the owl
  push();
  translate(x, y);
  owl(u);
  pop();
  }

// The function used for drawing the owl
function owl(u)
{
  ellipseMode(CENTER); // Draw ellipses from the center
  rectMode(CORNER); // Draw rects from the corner(the top left)
  noStroke(); // Cancel the stroke
  push();
  
  // Draw wings
  fill(COLS[2]);
  arc(u * 1.5, -u * 0.7, u * 2.2, u * 2.2, radians(65), PI);
  fill(COLS[4]);
  arc(-u * 0.5, -u * 0.7, u * 2.2, u * 2.2, 0, radians(115));
  
  // Draw the body with random function
  fill(COLS[3]);
  drawRectTile(-u * 0.5 , -u * 1.5 , u , u);
  fill(COLS[2]);
  drawRectTile( u * 0.5 , -u * 1.5 , u , u);
  fill(COLS[1]);
  drawRectTile(-u * 0.5 , -u * 0.5 , u , u);
  fill(COLS[4]);
  drawRectTile( u * 0.5 , -u * 0.5 , u , u);
  fill(COLS[2]);
  drawArcUnit ( u * 0.5 ,  u * 0.5 , u * 2 , u * 2 , 0 , PI);
  fill(COLS[3]);
  drawArcUnit ( u * 0.5 ,  u * 0.5 , u * 2 , u * 2 , 0 , PI * 0.5);
  push();
  pop();
  
  // Draw the tail
  fill(COLS[3]);
  triangle(u * 0.5, u * 1.5 , 0, u * 2 , u, u * 2);

  // Draw eyes
  // Circles of different diameters are superimposed to form whites of the eyes, pupils, etc
  fill(255);
  ellipse(u * 0.1, -u * 1.5, u * 0.8, u * 0.8);
  ellipse(u * 0.9, -u * 1.5, u * 0.8, u * 0.8);
  fill(20);
  ellipse(u * 0.1, -u * 1.5, u * 0.6, u * 0.6);
  ellipse(u * 0.9, -u * 1.5, u * 0.6, u * 0.6);
  fill(255);
  ellipse(u * 0.3, -u * 1.5, u * 0.2, u * 0.2);
  ellipse(u * 0.7, -u * 1.5, u * 0.2, u * 0.2);
  
  // Draw the hair
  fill(COLS[1]);
  triangle(u * 0.5, -u * 1.8 , -u * 0.5, -u * 2.2 , u * 1.5, -u * 2.2);
  
  // Draw eyebrows
  fill(20);
  rect(-u * 0.2, -u * 2, u * 0.6, u * 0.1);
  rect( u * 0.6, -u * 2, u * 0.6, u * 0.1);
  
  // Draw the mouth
  fill(255);
  triangle(u * 0.5, -u * 1.1 , u * 0.4, -u * 0.8 , u * 0.6, -u * 0.8);
  
  pop();
}

// The arc unit is drawn for the body arc parts
function drawArcUnit(cx, cy, w, h, sr, er) { // cx:the center x-coordinate; cy:the center y-coordinate; w:width of arc; h:height of arc; sr:start; er:end
  const cArr = shuffle(COLS); // Scramble the color array
  ellipseMode(CENTER); // Draw ellipses from the center
  push();

  translate(cx, cy);
  noStroke();
  fill(cArr[int(RAND*4)]); // Choose color with random numbers
  arc(0, 0, w, h, sr, er);
  push();

  drawingContext.clip();

  const rn = mult;

  if (rn > 0.6) {
    for (let i = 0; i < 3; i++) {
      fill(cArr[i]);
      ellipse(0, 0, w / 3 * (3 - i), h / 3 * (3 - i));
    }
  } else {
    const iMult = mult > 0.5 ? true : false; // Determine a Boolean value based on mult
    for (let i = 0; i < 6; i++) {
      fill(cArr[i % cArr.length]);
      if(iMult) {
        rect(-w / 2, -h / 2 + h / 6 * i, w, h / 6 + 1);
      }
      else {
        rect(-w / 2 + w / 6 * i, -h / 2, w / 6 + 1, h);
      }
    }
  }
  pop();
  pop();
}

// Rect unit drawing with 4 modes
const UNITFUNCS = [checkPattern, triPattern, curvePattern, stripePattern];

// Random 4 modes
function drawRectTile(x, y, w, h) {
  // const UNITFUNCS = [checkPattern];  UNITFUNCS[0](x, y, w, h, shuffle(COLS));
  // const UNITFUNCS = [triPattern];    UNITFUNCS[0](x, y, w, h, shuffle(COLS));
  // const UNITFUNCS = [curvePattern];  UNITFUNCS[0](x, y, w, h, shuffle(COLS));
  // const UNITFUNCS = [stripePattern]; UNITFUNCS[0](x, y, w, h, shuffle(COLS));
  
  // Open the individual schema comment and close the following code comment to see what the different schemas look like
   const fn = int(RAND * UNITFUNCS.length); // The mode is determined according to RAND
   UNITFUNCS[fn](x, y, w, h, shuffle(COLS)); // x:the top left x-coordinate; y:the top left y-coordinate; w:width of rectangle; h:height of rectangle; shuffle(COLS):scramble the color array
}

// Check pattern(checkerboard)
function checkPattern(x, y, w, h, cArr) {
  const span = w / 5;
  noStroke();
  push();

  translate(x, y); // Center of change
  fill(cArr[int(RAND*4)]); // Choose color with random numbers
  rect(0, 0, w, h); // Draw basis unit
  push();

  drawingContext.clip();

  const xSpan = w / 3;
  const ySpan = h / 3;

  let c = 0;
  for(let y = 0; y < h; y += ySpan) {
    const cOff = c % 2 == 0 ? 0 : 1;
    for(let x = 0; x < w; x += xSpan) {
      fill(cArr[0 + cOff]);
      rect(x, y, xSpan / 2, ySpan);
      fill(cArr[1 - cOff]);
      rect(x + xSpan / 2, y, xSpan / 2, ySpan);
    }
    c++;
  }
  pop();
  pop();
}

// Tri pattern(triangle)
function triPattern(x, y, w, h, cArr)
{
  const span = w / 5;
  noStroke();
  push();

  translate(x, y);// Center of change
  fill(cArr[int(RAND*2)]);// Choose color with random numbers
  rect(0, 0, w, h);// Draw basis unit
  push();

  drawingContext.clip();
  const xSpan = w / 3;
  const ySpan = h / int((RAND*2)+1);
  let c = 0;
  for(let y = 0; y < h; y += ySpan)
  {
    const xOff = c % 2 == 0 ? 0 : xSpan / 2 * 0;
    for(let x = 0; x < w; x += xSpan)
    {
      fill(cArr[int((RAND*2)+2)]);
      triangle(x + xOff, y, x + xSpan + xOff , y, x + xSpan / 2 + xOff , y + ySpan);
    }
    c++;
  }
  pop();
  pop();
}

// CurveRect pattern
function curvePattern(x, y, w, h, cArr) {
  const r = min(w, h) / 2;
  fill(cArr[int(RAND*2)]); // Choose color with random numbers
  rect(x, y, w, h);
  push();

  drawingContext.clip();

  translate(x + int(mult*2) * w, y);
  fill(cArr[int((RAND*2)+2)]); // Choose color with random numbers
  circle(0, 0, min(w, h) * 2);
  pop();
}

// Stripe pattern
function stripePattern(x, y, w, h, cArr) {
  const iMult = mult > 0.5 ? true : false; // Determine a Boolean value based on mult

  for(let i = 0; i < 3; i++) { 
    fill(cArr[i]); // Choose color

    // Draw based on the value of iMult
    if(iMult) {
      rect(x, y + h / 3 * i, w, h / 3 + 1);
    }
    else {
      rect(x + w / 3 * i, y, w / 3 + 1, h);
    }
  }
}
