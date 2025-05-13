// GLOBAL VARIABLES
const canvas = document.querySelector('canvas'),
    toolBtns = document.querySelectorAll('.tool')

// VARIABLE
let ctx = canvas.getContext('2d'),
    isDrawing = false,
    brushWidth = 5,
    selectedTool = 'brush',
    prevMouseX,
    prevMouseY,
    snapshot

// SET CANVAS WIDTH AND HEIGHT
window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

// START DRAWING
const startDraw = e => {
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

// DRAW RECTANGLE
const drawRectangle = e => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

// DRAWING
const drawing = (e) => {
    if(!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    switch(selectedTool){
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break
        case 'rectangle':
            drawRectangle(e)
            break
        default:
            break
    }
}

// TOOLS BTN AND SET TO VARIABLES SELECTED TOOL
toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id
        console.log(`Selected tool ${selectedTool}`)
    })
})

// STOP DRAWING
const stopDraw = () => {
    isDrawing = false
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)