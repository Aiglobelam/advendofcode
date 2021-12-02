var fs = require('fs')

let i = fs.readFileSync('input.txt')
let it = i.toString('utf-8')
let itl = it.split("\n")
const commands = itl

const isForward = (c) => c.indexOf('forward') > -1
const isUp = (c) => c.indexOf('up') > -1
const isDown = (c) => c.indexOf('down') > -1
const getUnit = (c) => parseInt(c.split(' ')[1], 10)

const getCommandAndDirection = (c) => {
    if(isForward(c)) {
        return {
            c: 'f',
            u: getUnit(c)
        }
    } else if(isUp(c)) {
        return {
            c: 'u',
            u: getUnit(c)
        }
    } else if (isDown(c)) {
        return {
            c: 'd',
            u: getUnit(c)
        }
    }
}


let xHorizontal = 0
let yDepth = 0

const changeCoordsBasedOnCommand = (command) => {
    const cad = getCommandAndDirection(command)
    const { c, u } = cad
    // FORWARD
    if(c === 'f') {
        if(u >= 0) {
            xHorizontal += u
        } else {
            xHorizontal -= u
        }
        console.log('FORWARD', u, `xHorizontal:${xHorizontal}, yDepth:${yDepth}`)
    }
    // UP
    else if(c === 'u') {
        if(u >= 0) {
            yDepth -= u
        } else {
            yDepth += u
        }
        console.log('UP', u, `xHorizontal:${xHorizontal}, yDepth:${yDepth}`)
    }
    // DOWN
    else if(c === 'd') {
        if(u >= 0) {
            yDepth += u
        } else {
            yDepth -= u
        }
        console.log('DOWN', u, `xHorizontal:${xHorizontal}, yDepth:${yDepth}`)
    }
}

commands.forEach(c => changeCoordsBasedOnCommand(c))

console.log('--------------------------------------------------')
console.log('RESULT part 1: ', `xHorizontal:${xHorizontal} * yDepth:${yDepth} = `, xHorizontal * yDepth)
console.log('--------------------------------------------------')

// --- Part Two ---
xHorizontal = 0
yDepth = 0
let aim = 0


const changeCoordsBasedOnCommandv2 = (command) => {
    const cad = getCommandAndDirection(command)
    const { c, u } = cad
    // FORWARD
    if(c === 'f') {
        if(u >= 0) {
            xHorizontal += u
            yDepth += aim * u
        } else {
            xHorizontal -= u
            yDepth -= aim * u
        }
        console.log('FORWARD', u, `xHorizontal:${xHorizontal}, yDepth:${yDepth}, aim:${aim}`)
    }
    // UP
    else if(c === 'u') {
        if(u >= 0) {
            //yDepth -= u
            aim -= u
        } else {
            //yDepth += u
            aim += u
        }
        console.log('UP', u, `xHorizontal:${xHorizontal}, yDepth:${yDepth}, aim:${aim}`)
    }
    // DOWN
    else if(c === 'd') {
        if(u >= 0) {
            // yDepth += u
            aim += u
        } else {
            // yDepth -= u
            aim -= u
        }
        console.log('DOWN', u, `xHorizontal:${xHorizontal}, yDepth:${yDepth}, aim:${aim}`)
    }
}

commands.forEach(c => changeCoordsBasedOnCommandv2(c))

// FIRST GUESS 1743717659
// SECOND GUESS CORRECT 1741971043

console.log('--------------------------------------------------')
console.log('RESULT part 2: ', `xHorizontal:${xHorizontal} * yDepth:${yDepth} = `, xHorizontal * yDepth)
console.log('--------------------------------------------------')
