/**
 * 
 * Menu: Open project
 * Description: Opens a project in code
 * Shortcut: cmd shift .
 * 
 */


async function getProjects(parentDir) {
    const codeDir = await ls(parentDir)
    const choices = []

    for (const dir of codeDir) {
        if (dir.includes('node_modules')) continue

        const fullPath = path.join(parentDir, dir)
        if (await isFile(path.join(fullPath, 'package.json'))) {
            choices.push(fullPath)
        } else {
            choices.push(...(await getProjects(fullPath)))
        }
    }

    return choices
}

const choice = await kitPrompt({
    placeholder: 'which project ?',
    choices: [
        ...(await getProjects('~/code')),
        ...(await getProjects('~/Desktop')),
    ]
})

exec(`code ${choice}`)
