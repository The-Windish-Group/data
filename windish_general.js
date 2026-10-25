const letters = [
  ["T", "τ", "d"],
  ["W", "ω", "w"],
  ["M", "m", "f"],
  ["L", "l", "l"],
  ["B", "b", "b"],
  ["P", "p", "p"],
  ["K", "k", "g"],
  ["Θ", "θ", "θ"],
  ["Z", "z", "s"],
  ["S", "s", "ʃ"],
  ["Ā", "ā", "e"],
  ["E", "e", "ε"],
  ["Ē", "ē", "i"],
  ["I", "ι", "ɪ"],
  ["Ī", "ī", "aɪ"],
  ["O", "o", "a"],
  ["Ō", "ō", "o"],
  ["c", "c", "p"],
  ["κ", "κ", "k"],
  ["π", "π", "t"],
  ["ν", "ν", "ʃ"],
  ["Þ", "Þ", ""]
];

const dobuleLetter = [
    ["ωm", "1", "v"],
    ["ll", "2", "j"]
]

function wordToSound(word) {
    const syllable = syllablelize(word)

    const sound = syllable.map(a => {
        const list = letters.concat(dobuleLetter)

        if (list.find(e => e[1] == a) != undefined) {
            return list.find(e => e[1] == a)[2]
        }

        if (!/^[ -/]+$/.test(a)){
            console.log("error word:", syllable.join(""), a)
        } else {
            // console.log("hello")
        }

        return a
    })

    return "/" + sound.join("") +"/"
}

function syllablelize(word) {
    var text = word
    
    letters.forEach(e => [
        text = text.replaceAll(e[0], e[1])
    ])
    
    dobuleLetter.forEach(e => [
        text = text.replace(e[0], e[1])
    ])

    return text.split("")
}

module.exports = { wordToSound, syllablelize }