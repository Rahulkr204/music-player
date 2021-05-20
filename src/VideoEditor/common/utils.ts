export function digitsCount(x: number) {
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}

// s_00000128
// s_00011272
// 00000000
const imgArr = Array(11272).fill("/frames/").map((i, index) => {
    const b = '00000000' + (index+1)
    // b.toString().substring(5, b.length)
    return i + `s_${b.toString().substring(5, b.length)}.jpg`
})

export function getImageName(i: number) {
    const count = digitsCount(i)
    if (count) {
        
    }
    return `s_`
}