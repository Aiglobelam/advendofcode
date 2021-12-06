var fs = require('fs')

let i = fs.readFileSync('./input.txt')
let it = i.toString('utf-8')
let itl = it.split("\n")

const lines = []
const linesVertical = []
const linesHorizontal = []
const linesOther = []

itl.map(row => {
    const rowSplit = row.split(' -> ')
    const sXY = rowSplit[0].split(',')
    const eXY = rowSplit[1].split(',')
    const x1 = parseInt(sXY[0], 10)
    const x2 = parseInt(eXY[0], 10)
    const y1 = parseInt(sXY[1], 10)
    const y2 = parseInt(eXY[1], 10)
    const isVertical = x1 === x2
    const isHorizontal = y1 === y2
    const isNeitherVerticalOrHorizontal = (x1 !== x2) && (y1 !== y2)
    const l = {
        x1,
        x2,
        y1,
        y2,
        isVertical,
        isHorizontal,
        isNeitherVerticalOrHorizontal
    }

    lines.push(l)
    if(isVertical){
        linesVertical.push(l)
    }
    if(isHorizontal){
        linesHorizontal.push(l)
    }
    if(isNeitherVerticalOrHorizontal){
        linesOther.push(l)
    }
})

console.log('lines', lines.length)
console.log('linesVertical', linesVertical.length)
console.log('linesHorizontal', linesHorizontal.length)
console.log('linesOther', linesOther.length)
console.log('sum V + H + O = ', linesVertical.length + linesHorizontal.length + linesOther.length)

// 1000 x 1000 grid
const theMap = []
for(let x = 0; x< 1000; x++) {
    theMap[x] = []
    for(let y = 0; y< 1000; y++) {
        theMap[x].push(0)
    }
}

console.log(theMap[0].length)
console.log(theMap[999].length)

const printASlice = (grid, rowStart, rowEnd, xStart, xEnd) => {
    console.log('x ==> 012345678|012345678|012345678|012345678|012345678|012345678|012345678|012345678|012345678|012345678|')
    grid.forEach((row, currentY) => {
        if(currentY >= rowStart && currentY <= rowEnd) {
            let rowBit = ''
            for(let i = xStart; i < xEnd; i++){
                const v = row[i]
                if(v === 0) {
                    rowBit += '.'
                } else {
                    rowBit += v
                }
            }
            console.log('y', currentY, rowBit)
        }
    })
}


// 
// --- HORIZONTAL ----
const linesHorizontalSorted = linesHorizontal.sort((a,b) => a.y2 - b.y1)
linesHorizontalSorted.forEach(hl => {
    const yCommon = hl.y1 // y is same for both cords
    const xStart = hl.x1 <= hl.x2 ? hl.x1 : hl.x2
    const xEnd = hl.x1 > hl.x2 ? hl.x1 : hl.x2
    // console.log('HORI y', yCommon, 'x1:', hl.x1, 'x2:', hl.x2, 'length', xEnd - xStart)
    for(let x = xStart; x <= xEnd; x++) {
        theMap[yCommon][x]++
    }
})



// printASlice(theMap, 0, 100, 0, 200)

// VERTICAL
// |
// |
// |
const verticalLinesSorted = linesVertical.sort((a,b) => a.x1 - b.x1)
verticalLinesSorted.forEach((vl, index) => {
    const xCommon = vl.x1 // x is same for both cords
    // crap y1 / y2 might not be in correct order... y1 is not allways smaller than y2
    let yStart = vl.y1 <= vl.y2 ? vl.y1 : vl.y2
    let yEnd = vl.y1 > vl.y2 ? vl.y1 : vl.y2
    // console.log('VERT',index,  xCommon, 'y1', vl.y1, 'y2', vl.y2, 'length', yEnd - yStart)
    for(let y = yStart; y <= yEnd; y++) {
         theMap[y][xCommon]++
    }
})


// printASlice(theMap, 0, 100, 0, 100)


let nbrOfPointWithOverlap = 0
theMap.forEach((row, x) => {
    row.forEach((v, y) => {
        if(v > 1) {
            nbrOfPointWithOverlap++
        }
    })
})

// 1:st GUESS = 1176 WRONG too low (misstake x for y vice verce)
// 2:nd GUESS = 1184 WRONG too low (misstake x for y vice verce)
// 3:d  GUESS = 6208 WRONG too low (misstake in comparison < should have been <=)
// 4:d  GUESS = 6225 CORRECT
console.log('result', nbrOfPointWithOverlap)

// linesOtherPoints = []
// for(let loIndex = 0; loIndex < linesOther.length; loIndex++) {

//     x1 = linesOther[loIndex].x1
//     x2 = linesOther[loIndex].x2
//     const stepsInXDirection = Math.abs(x1-x2)
//     y1 = linesOther[loIndex].y1
//     y2 = linesOther[loIndex].y2
//     const stepsInYDirection = Math.abs(y1-y2)
//     // NICE all lines are exactly 45 degreess...
//     //console.log('stepsInXDirection', stepsInXDirection, 'stepsInYDirection', stepsInYDirection)
    
//     // const xStart = x1 <= x2 ? x1 : x2
//     // const xEnd =   x1 >  x2 ? x1 : x2
//     // console.log('xStart',xStart, xEnd, xEnd - xStart)
//     // const yStart = y1 <= y2 ? y1 : y2
//     // const yEnd =   y1 >  y2 ? y1 : y2
//     // console.log('yStart',yStart, yEnd, yEnd - xStart)
//     // for(let x = xStart; x <= xEnd; x++) {
//     //     for(let y = yStart; y <= yEnd; y++){
//     //         theMap[y][x]++
//     //     }
//     // }


//     const xShouldIncrease = x1 - x2 < 0
//     // console.log('xShouldIncrease', xShouldIncrease, x1, x2, x1 - x2)
//     const yShouldIncrease = y1 - y2 < 0

//     // x
//     //  x
//     //   x
//     //    x  
//     //     x
//     if(xShouldIncrease) {
//         console.log('INC x from', x1, 'to', x1+stepsInXDirection, linesOther[loIndex])
//         let y = y1
//         for(let x = x1; x < stepsInXDirection; x++) {
//             linesOtherPoints.push({ x, y})
//             y--
//         }
//     } 
    
//     //      x
//     //     x
//     //    x
//     //   x  
//     //  x
//     else {
//         console.log('DEC x from', x1, 'to', x1-stepsInXDirection, linesOther[loIndex])
//         for(let x = x1; x > (x1-stepsInXDirection); x--) {
//             if(yShouldIncrease) {
//                 console.log('INC y from', y1, 'to', y1-stepsInXDirection, linesOther[loIndex])
//             } else {
//                 console.log('DEC y from', y1, 'to', y1-stepsInXDirection, linesOther[loIndex])
                
//             }
//         }
//     }
//     break;
    


// }

// console.log('linesOtherPoints', linesOtherPoints)