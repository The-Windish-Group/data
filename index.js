const csv = require("csv/sync")
const fs = require("node:fs")

function getDataFromMultiplePath(paths) {
    let result = csv.parse(fs.readFileSync(paths[0]).toString())

    for (let i = 1; i < paths.length; i++) {
        const path = paths[i]
        console.log(i, path)
        result = result.concat(csv.parse(fs.readFileSync(path).toString()))
    }

    // console.log(result)
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
            text.push(en + "\u0009" +  wn)
            result.push({
                en: en,
                wn: wn
            })
        }
    }
}

fs.writeFileSync("result/result.txt", text.join("\n"))
fs.writeFileSync("result/result.json", JSON.stringify(result))