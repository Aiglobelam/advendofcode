var fs = require('fs')
let i = fs.readFileSync('./input.txt')
let it = i.toString('utf-8')
let list = it.split(',').map(v => parseInt(v, 10))

console.log(list)



// const fish = [3,4,3,1,2]
const fish = list
let lastday = 0
console.log('Initial state',fish.join())
for(let day = 0; day < 80; day++) {
    lastday ++
    for(let findex = 0; findex < fish.length; findex++){
        let f = fish[findex]
        if(f == 0){
            f = 6
            fish.push(9)
        }
        else if(f>0) {
            f--
        }
        fish[findex] = f
    }
    console.log('DAY',day+1,fish.join())
}

console.log('fish day', lastday, fish.length)