var fs = require('fs')


let i = fs.readFileSync('./input.txt')
let it = i.toString('utf-8')
let itl = it.split("\n")

const diagnosticReport = itl.map((bitstring) => {
    return bitstring.split('').map(v => parseInt(v, 10))
})
// diagnosticReport = [
// [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
// [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
// ...,
// ] 

// columns [
//     { col: 0, numOnes: 0, numZeros: 0 },
//     { col: 1, numOnes: 0, numZeros: 0 },
//     { col: 2, numOnes: 0, numZeros: 0 },
//     { col: 3, numOnes: 0, numZeros: 0 },
//     { col: 4, numOnes: 0, numZeros: 0 },
//     { col: 5, numOnes: 0, numZeros: 0 },
//     { col: 6, numOnes: 0, numZeros: 0 },
//     { col: 7, numOnes: 0, numZeros: 0 },
//     { col: 8, numOnes: 0, numZeros: 0 },
//     { col: 9, numOnes: 0, numZeros: 0 },
//     { col: 10, numOnes: 0, numZeros: 0 },
//     { col: 11, numOnes: 0, numZeros: 0 }
//   ]
let columns = []
diagnosticReport[0].forEach((c, index) => {
    columns[index] = { col: index, numOnes: 0, numZeros: 0}
})

// loop over each row
diagnosticReport.forEach((row) => {
    row.forEach((v, index) => {
        if(v === 0) {
            columns[index].numZeros ++
        } else {
            columns[index].numOnes ++
        }
    })
})

// Get least and most common
// columns [
//     { col: 0, numOnes: 479,  numZeros: 521, mc: 0, lc: 1 },
//     { col: 1, numOnes: 480,  numZeros: 520, mc: 0, lc: 1 },
//     { col: 2, numOnes: 498,  numZeros: 502, mc: 0, lc: 1 },
//     { col: 3, numOnes: 491,  numZeros: 509, mc: 0, lc: 1 },
//     { col: 4, numOnes: 521,  numZeros: 479, mc: 1, lc: 0 },
//     { col: 5, numOnes: 497,  numZeros: 503, mc: 0, lc: 1 },
//     { col: 6, numOnes: 514,  numZeros: 486, mc: 1, lc: 0 },
//     { col: 7, numOnes: 512,  numZeros: 488, mc: 1, lc: 0 },
//     { col: 8, numOnes: 499,  numZeros: 501, mc: 0, lc: 1 },
//     { col: 9, numOnes: 493,  numZeros: 507, mc: 0, lc: 1 },
//     { col: 10, numOnes: 484, numZeros: 516, mc: 0, lc: 1 },
//     { col: 11, numOnes: 509, numZeros: 491, mc: 1, lc: 0 }
//   ]
let gammaRateAsString = ''
let epsilonRateAsString = ''
columns.forEach(c => {
    const mostCom = c.numOnes > c.numZeros ? 1 : 0
    c['mc'] = mostCom
    c['lc'] = mostCom === 1 ? 0 : 1
    gammaRateAsString = `${gammaRateAsString}${c.mc}`
    epsilonRateAsString = `${epsilonRateAsString}${c.lc}`
})



console.log(columns)
console.log('gammaRateAsString', gammaRateAsString)
console.log('epsilonRateAsString', epsilonRateAsString)
let gammaRateAsInt = parseInt( gammaRateAsString, 2 )
let epsilonRateAsInt = parseInt( epsilonRateAsString, 2 )
console.log('gammaRateAsInt', gammaRateAsInt)
console.log('epsilonRateAsInt', epsilonRateAsInt)

let powerConsumption = gammaRateAsInt * epsilonRateAsInt
console.log('powerConsumption', powerConsumption)

// gammaRateAsString 000010110001
// epsilonRateAsString 111101001110
// gammaRateAsInt 177
// epsilonRateAsInt 3918
// powerConsumption 693486

// PART 2

// diagnosticReport = [
// [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
// [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
// ...,
// ] 

const getMostCommonBitAtIndex = (list, index) => {
    let zerosAtIndex = 0
    let onesAtIndex = 0
    list.forEach(row => {
        if(row[index] === 0) {
            zerosAtIndex++
        } else {
            onesAtIndex++
        }
    })
    if(zerosAtIndex === onesAtIndex) {
        return 1
    }
    return zerosAtIndex > onesAtIndex ? 0 : 1
}

const getLeastCommonBitAtIndex = (list,index) => {
    let zerosAtIndex = 0
    let onesAtIndex = 0
    list.forEach(row => {
        if(row[index] === 0) {
            zerosAtIndex++
        } else {
            onesAtIndex++
        }
    })
    if(zerosAtIndex === onesAtIndex) {
        return 0
    }
    return zerosAtIndex < onesAtIndex ? 0 : 1
}
// columns [
//     { col: 0, numOnes: 479,  numZeros: 521, mc: 0, lc: 1 },
//     { col: 1, numOnes: 480,  numZeros: 520, mc: 0, lc: 1 },
//     { col: 2, numOnes: 498,  numZeros: 502, mc: 0, lc: 1 },
//     { col: 3, numOnes: 491,  numZeros: 509, mc: 0, lc: 1 },
//     { col: 4, numOnes: 521,  numZeros: 479, mc: 1, lc: 0 },
//     { col: 5, numOnes: 497,  numZeros: 503, mc: 0, lc: 1 },
//     { col: 6, numOnes: 514,  numZeros: 486, mc: 1, lc: 0 },
//     { col: 7, numOnes: 512,  numZeros: 488, mc: 1, lc: 0 },
//     { col: 8, numOnes: 499,  numZeros: 501, mc: 0, lc: 1 },
//     { col: 9, numOnes: 493,  numZeros: 507, mc: 0, lc: 1 },
//     { col: 10, numOnes: 484, numZeros: 516, mc: 0, lc: 1 },
//     { col: 11, numOnes: 509, numZeros: 491, mc: 1, lc: 0 }
//   ]

const mostLeastComBitPos = []
columns.forEach((c, bitPos) => {
    const mcb = getMostCommonBitAtIndex(diagnosticReport, bitPos)
    const lcb = getLeastCommonBitAtIndex(diagnosticReport, bitPos)
    mostLeastComBitPos[bitPos] = {
        bitPos,
        mostCommonBitAt_bitPos: mcb,
        leastCommonBitAt_botPos: lcb
    }
})
// mostLeastComBitPos[
//     { bitPos: 0, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 1, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 2, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 3, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 4, mostCommonBitAt_bitPos: 1, leastCommonBitAt_botPos: 0 },
//     { bitPos: 5, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 6, mostCommonBitAt_bitPos: 1, leastCommonBitAt_botPos: 0 },
//     { bitPos: 7, mostCommonBitAt_bitPos: 1, leastCommonBitAt_botPos: 0 },
//     { bitPos: 8, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 9, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 10, mostCommonBitAt_bitPos: 0, leastCommonBitAt_botPos: 1 },
//     { bitPos: 11, mostCommonBitAt_bitPos: 1, leastCommonBitAt_botPos: 0 }
//   ]
console.log('TEST RUN diagnosticReport mostLeastComBitPos', mostLeastComBitPos)

const getRowsWithOneOrZeroAtPos = (oneOrZero, pos, list) => {
    return list.filter(row => row[pos] === oneOrZero)
}

// Start with all 1000 rows in diagnosticReport 
// "row 0" = [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0]
// "row 1" = [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]
// "row x" = ...
// first bit is either "row[0]" OR "row[11]"
// next bit is the one to the right => indicates we should start with "row[0]"
const findOxyGenRate = (index, list) => {
    console.log(index,'===> findOxyGenRate at index:', index, 'in list of length:', list.length)
    let currentBitIndex = index
    console.log('currentBitIndex', currentBitIndex)
    const mcb = getMostCommonBitAtIndex(list, currentBitIndex)
    const nextList = getRowsWithOneOrZeroAtPos(mcb, currentBitIndex, list)
    console.log('mcb', mcb, 'nextList.length', nextList.length)
    if(nextList.length === 1) {
        console.log('res', nextList)
        return nextList[0]
    } else {
        const nextBitIndex = currentBitIndex + 1
        return findOxyGenRate(nextBitIndex, nextList)
    }
}

// Start with all 1000 rows in diagnosticReport 
// "row 0" = [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0]
// "row 1" = [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]
// "row x" = ...
// first bit is either "row[0]" OR "row[11]"
// next bit is the one to the right => indicates we should start with "row[0]"
const findCO2scrubRate = (index, list) => {
    console.log('===> findCO2scrubRate at index:', index, 'in list of length:', list.length, list)
    let currentBitIndex = index
    console.log('currentBitIndex', currentBitIndex)
    const lcb = getLeastCommonBitAtIndex(list, currentBitIndex)
    const nextList = getRowsWithOneOrZeroAtPos(lcb, currentBitIndex, list)
    console.log('lcb', lcb, 'nextList.length', nextList.length)
    if(nextList.length === 1) {
        console.log('res', nextList)
        return nextList[0]
    } else {
        const nextBitIndex = currentBitIndex + 1
        return findCO2scrubRate(nextBitIndex, nextList)
    }
}


const oxyBits = findOxyGenRate(0, diagnosticReport)
const oxyBitsString = oxyBits.join('')
const oxyBitsInt = parseInt( oxyBitsString, 2 )

const co2bits = findCO2scrubRate(0, diagnosticReport)
const co2bitsString = co2bits.join('')
const co2bitsAsInt = parseInt( co2bitsString, 2 )

console.log('co2bits', co2bits)
console.log('oxyBits', oxyBits)
console.log('co2bitsString', co2bitsString)
console.log('oxyBitsString', oxyBitsString)
console.log('oxyBitsInt', oxyBitsInt)
console.log('co2bitsAsInt', co2bitsAsInt)

// lifeSupRate = oxygenGeneratorRating * CO2scrubberRating
console.log('FIRST GUESS 933*2751 = 2566683 => WRONG')
console.log('SECOND GUESS 933*3622 = 3379326 => CORRECT') // I was invoking findOxyGenRate inside of findCO2scrubRate =)
console.log('result = ', oxyBitsInt * co2bitsAsInt)