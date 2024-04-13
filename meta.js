// Developed by smkz
// https://github.com/smkzdev
const fs = require('fs')
const path = require('path')

// Delete Meta.xml
const actualMeta = path.join(process.cwd(), 'meta.xml')
if (fs.existsSync(actualMeta)) {
    fs.unlinkSync(actualMeta)
    console.log(`[META GENERATOR] Old meta.xml successfully deleted.`)
}

// Extensions filter
const extensionsFilter = {
    'S': 'server', // filenameS.lua
    'Server': 'server', // filenameServer.lua
    'C': 'client', // filenameC.lua
    'Client': 'client', // filenameClient.lua
    'G': 'shared', // filenameG.lua
}

// Mta Extensions
const mtaExtensions = ['.lua', '.luac', '.ttf', '.edf', '.otf', '.txd', '.dff', '.col', '.mp3', '.xml', '.lng', '.fx', '.wav', '.png', '.jpg', '.jpeg', '.svg', '.ogg']

// Search for files
function listFiles(dir, extensions = []) {
    let filesReturned = []
    const itens = fs.readdirSync(dir)

    itens.forEach((item) => {
        const itemPath = path.join(dir, item)

        if (fs.statSync(itemPath).isDirectory()) {
            filesReturned = filesReturned.concat(listFiles(itemPath, extensions))
        } else {
            const ext = path.extname(item)
            if (extensions.length === 0 || extensions.includes(ext)) {
                filesReturned.push(itemPath)
            }
        }
    })

    return filesReturned
}

// Relative Path
function relativePath(actualDir, file) {
    const fullPath = path.relative(actualDir, file)
    return fullPath.replace(/\\/g, '/')
}

// Write XML
function writeMeta(theFiles, diretorioAtual) {
    let sharedScripts = ''
    let otherScripts = ''
    let files = ''

    theFiles.forEach((file) => {
        const thePath = relativePath(diretorioAtual, file)
        const extension = path.extname(file)
        const fileName = path.basename(file, extension)
        let type = ''

        if (extension === '.lua') {
            for (const [fileEnd, fileType] of Object.entries(extensionsFilter)) {
                if (fileName.endsWith(fileEnd)) {
                    type = `type="${fileType}"`
                    break
                }
            }

            if (type === 'type="shared"') {
                sharedScripts += `    <script src="${thePath}" ${type} cache="false" />\n`
                console.log("[META GENERATOR] SCRIPT FILE '"+thePath+"' INSERTED")
            } else {
                otherScripts += `    <script src="${thePath}" ${type} cache="false" />\n`
                console.log("[META GENERATOR] SCRIPT FILE '"+thePath+"' INSERTED")
            }

        } else {
            files += `    <file src="${thePath}" />\n`
            console.log("[META GENERATOR] ASSET FILE '"+thePath+"' INSERTED")
        }
    })

    const xml = `<meta>\n    <min_mta_version server="1.3.5-9.06139"/>\n    <info author="" type=""/>\n\n${sharedScripts}${otherScripts}${files}    <oop>true</oop>\n</meta>`
    return xml
}

// Call the functions
const myDir = process.cwd()
const myFiles = listFiles(myDir, mtaExtensions)
const contentXML = writeMeta(myFiles, myDir)
const pathXML = path.join(myDir, 'meta.xml')
fs.writeFileSync(pathXML, contentXML)
console.log("[META GENERATOR] META FILE GENERATED SUCCESSFULLY!")
