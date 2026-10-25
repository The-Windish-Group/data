const csv = require("csv/sync")
const fs = require("node:fs")
const windish = require("./windish_general")

function getDataFromMultiplePath(paths) {
    let result = csv.parse(fs.readFileSync(paths[0]).toString())

    for (let i = 1; i < paths.length; i++) {
        const path = paths[i]
        console.log(i, path)
        result = result.concat(csv.parse(fs.readFileSync(path).toString()))
    }

    return result
}

const dataPath = ["data/data.csv", "data/data2.csv"]

const data = getDataFromMultiplePath(dataPath)

const result = []
const text = []

for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data.length; j++) {
        const en = data[j][i * 2]
        const wn = data[j][i * 2 + 1]
        
        if (Boolean(wn) && wn != "π" && wn != "κ" && /^[a-zA-Z/(). *]+$/.test(en)){
            const sound = windish.wordToSound(wn)

            text.push(en + "\u0009" +  wn + "\u0009" + sound)
            result.push({
                en: en,
                wn: wn,
                sound: sound
            })
        }
    }
}

fs.writeFileSync("withsound/result.txt", text.join("\n"))
fs.writeFileSync("withsound/result.json", JSON.stringify(result))