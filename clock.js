const clock = document.querySelector('#clock')
const ctx = clock.getContext('2d')

let width = clock.width = window.innerWidth
let height = clock.height  = window.innerHeight
let minSide = width > height? height:width 

class Clock{
    constructor(){
        this.h = 0
        this.m = 0
        this.s = 0
        this.ms = 0
        this.hSize = minSide / 2 * .8
        this.mSize = minSide / 2 * .7
        this.sSize = minSide / 2 * .6
        this.timeString = ''
    }
    draw(){
        ctx.clearRect(0,0,clock.width,clock.height)
        ctx.fillStyle = '#A8BF98'
        ctx.textAlign = 'center'
        ctx.font = "bold 60px serif";
        ctx.textBaseline = 'middle'
        ctx.fillText(this.timeString,width/2,height/2)
        
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#9CB38E'
        ctx.arc(width/2, height/2, this.hSize, 0, Math.PI*2)
        ctx.moveTo(width/2 + this.mSize, height/2)
        ctx.arc(width/2, height/2, this.mSize, 0, Math.PI*2)
        ctx.moveTo(width/2 + this.sSize, height/2)
        ctx.arc(width/2, height/2, this.sSize, 0, Math.PI*2)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.lineCap = "round"
        ctx.strokeStyle = 'white'
        ctx.arc(width/2, height/2, this.hSize, - Math.PI/2, Math.PI * 2 * (this.h % 12) / 12 - Math.PI/2)
        ctx.moveTo(width/2, height/2 -this.mSize)
        ctx.arc(width/2, height/2, this.mSize, - Math.PI/2, Math.PI * 2 * this.m/ 60 - Math.PI/2)
        ctx.moveTo(width/2, height/2 -this.sSize)
        ctx.arc(width/2, height/2, this.sSize, - Math.PI/2, Math.PI * 2 * (this.s + this.ms/1000)/ 60 - Math.PI/2)
        ctx.stroke()
    }
    update(){
        let d = new Date()
        this.h = d.getHours()
        this.m = d.getMinutes()
        this.s = d.getSeconds()
        this.ms = d.getMilliseconds()
        this.timeString = ('0'+this.h%12).slice(-2)+'-'+('0'+this.m).slice(-2)+'-'+('0'+this.s).slice(-2)
        if(this.h/12 >= 1) this.timeString += ' PM'
        else this.timeString += ' AM'

    }
}

let myClock = new Clock()

function drawClock(){
    myClock.update()
    myClock.draw()
    requestAnimationFrame(drawClock)
}

drawClock()