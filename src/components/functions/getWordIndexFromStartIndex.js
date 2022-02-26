export const getWordIndexFromStartIndex = (string, startIndex) => {
    let [spacesCounter, lettersCounter] = [0,0]
    while(lettersCounter < string.length){
        if(string[lettersCounter] === " ") spacesCounter++
        if(lettersCounter === startIndex) return spacesCounter
        lettersCounter++
    }
}