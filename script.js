let playerState = 'sit';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //zwraca rysunek w canvas
const CANVAS_WIDTH = canvas.width = 600; //szerokość rysunku
const CANVAS_HEIGHT = canvas.height = 600; //wysokość rysunku

const playerImage = new Image(); //tworzy element zdjęcie
playerImage.src = 'shadow_dog.png'; //daje źródło zdjęciu
const spriteWidth = 575; //szerokość pojedyńczego duszka
const spriteHeight = 523; //wysokość pojedyńczego duszka

let gameFrame = 0;
const staggerFrames = 15;
const spriteAnimations = [];
const animationStates = [ //miejscę na mapę canvy
    {
        name: "idle",
        frames: 7
    },
    {
        name: "jump",
        frames: 7
    },
    {
        name: "fall",
        frames: 7
    },
    {
        name: "run",
        frames: 9
    },
    {
        name: "dizzy",
        frames: 11
    },
    {
        name: "sit",
        frames: 5
    },
    {
        name: "roll",
        frames: 7
    },
    {
        name: "bite",
        frames: 7
    },
    {
        name: "ko",
        frames: 12
    },
    {
        name: "gethit",
        frames: 4
    }
];
animationStates.forEach((state, index) => {
    //porusza się pomiędzy obrazkami i tworzy struktury danych (koordynatów)                 
    //state - poszczególny element na płótnie, index - reprezentuje index poszczególnego elementu tablicy
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) { //kalkuluje koordynaty pozycji x i y dla każdego obrazka
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});

function animate() { //funkcja animacyjna
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //usuwa starą farbę z każdej klatki animacji, czyści miejsce animacji
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;; //przesuwa pomiędzy obrazkami
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); s - obszar, który chcemy wyciąć (source), d - obszar, gdzie chcemy rysować (destination)
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    //zdjęcie, które chcemy do animacji, koordynaty, gdzie chcemy żeby narysowało się nasze zdjęcie, wysokość miejsca, szerokość miejsca

    gameFrame++;
    requestAnimationFrame(animate)
}
animate(); 