const draws = [79,9,13,43,53,51,40,47,56,27,0,14,33,60,61,36,72,48,83,42,10,86,41,75,16,80,15,93,95,45,68,96,84,11,85,63,18,31,35,74,71,91,39,88,55,6,21,12,58,29,69,37,44,98,89,78,17,64,59,76,54,30,65,82,28,50,32,77,66,24,1,70,92,23,8,49,38,73,94,26,22,34,97,25,87,19,57,7,2,3,46,67,90,62,20,5,52,99,81,479,9,13,43,53,51,40,47,56,27,0,14,33,60,61,36,72,48,83,42,10,86,41,75,16,80,15,93,95,45,68,96,84,11,85,63,18,31,35,74,71,91,39,88,55,6,21,12,58,29,69,37,44,98,89,78,17,64,59,76,54,30,65,82,28,50,32,77,66,24,1,70,92,23,8,49,38,73,94,26,22,34,97,25,87,19,57,7,2,3,46,67,90,62,20,5,52,99,81,4]

var fs = require('fs')
let i = fs.readFileSync('./input.txt')
let it = i.toString('utf-8')
let itl = it.split("\n")

const rowToInts = (row) => row.trim().split(' ').map(v => {
    let vt = v.trim()
    if(vt && vt.length > 0){
        return parseInt(vt, 10)
    } 
}).filter(x => (x >= 0))

let currentBord = 0
let currentBoardRow = 0
let allBingoboards = []

let aBingoBoard = { rows: [], rowsMarked: [[],[],[],[],[]]}

itl.forEach(row => {
    const rowAsInts = rowToInts(row)
    //console.log('currentBord', currentBord, 'currentBoardRow', currentBoardRow, row, rowAsInts)
    if(rowAsInts.length !== 0){
        currentBoardRow ++
        aBingoBoard.rows.push(rowAsInts)
    }
    if(currentBoardRow === 5) {
        allBingoboards.push(aBingoBoard)
        currentBoardRow = 0
        currentBord++
        aBingoBoard =  { rows: [], rowsMarked: [[],[],[],[],[]] }
    }
})

allBingoboards.forEach(bb => console.log(bb))



let x = 0
let boardWithBingo = undefined
let currentDrawnNbr = undefined

for(let drawIndex = 0; drawIndex < draws.length; drawIndex++) {
    
    currentDrawnNbr = draws[drawIndex]
    // console.log('========> currentDrawnNbr', currentDrawnNbr)
    x++
    for(let bbIndex = 0; bbIndex < allBingoboards.length; bbIndex++){
        const bb = allBingoboards[bbIndex]
        // console.log('bb at bbIndex',bbIndex, bb)
        x++
        for (let bbri = 0; bbri < 5; bbri++) {
            x++
            if(bb.rows[bbri].includes(currentDrawnNbr)) {
                console.log('BB', bbIndex, 'HIT on row', bbri,'currentDrawnNbr', currentDrawnNbr, bb.rows[bbri])
                bb.rowsMarked[bbri].push(currentDrawnNbr)
                // console.log(`bb ${bbIndex}.rowsMarked[${bbri}]`, bb.rowsMarked[bbri])
                if(bb.rowsMarked[bbri].length === 5){
                    console.log('BINGO on board', bbIndex, 'row', bbri, bb.rowsMarked[bbri], bb)
                    boardWithBingo = bbIndex
                }
                break;
            }
        }
        
        if(boardWithBingo || boardWithBingo === 0) {
            break;
        }
    }

    if(boardWithBingo || boardWithBingo === 0) {
        break;
    }
   
}


console.log('----------------------')
console.log('WINNING NBR', currentDrawnNbr)
let allNonDrawnNbrs = []
// array1 = array1.filter(val => !array2.includes(val)
const bbWin = allBingoboards[boardWithBingo]
console.log(bbWin)
for (let bbri = 0; bbri < 5; bbri++) {
    let r = bbWin.rows[bbri]
    let rm = bbWin.rowsMarked[bbri]
    let rr = r.filter(val => !rm.includes(val))
    console.log('rr', rr)
    allNonDrawnNbrs = [...allNonDrawnNbrs, ...rr]
}
console.log('allNonDrawnNbrs', allNonDrawnNbrs)
const sumofallunmarkednumbersForWinningBoard = allNonDrawnNbrs.reduce((a, b) => a + b, 0)
console.log(`result: ${currentDrawnNbr} * ${sumofallunmarkednumbersForWinningBoard} = `, currentDrawnNbr * sumofallunmarkednumbersForWinningBoard)
console.log('loops', x)