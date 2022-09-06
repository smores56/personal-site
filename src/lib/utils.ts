import { readFileSync } from 'fs'
import { parse, join } from 'path'
import { readdir, stat, watch } from 'fs/promises'
import { Accessor, createSignal } from 'solid-js'
import YAML from 'yaml'
import { ZodType } from 'zod'

export async function fileNamesInDirectory(
  directory: string
): Promise<string[]> {
  if (directory.endsWith('.yml')) {
    return [directory]
  } else if (
    parse(directory).base.startsWith('.') ||
    (await stat(directory)).isFile()
  ) {
    return []
  }

  const children = []
  for await (const child of await readdir(directory)) {
    children.push(...(await fileNamesInDirectory(join(directory, child))))
  }

  return children
}

export function loadYamlFile(filename: string): any {
  const content = readFileSync(filename, { encoding: 'utf8' })
  return YAML.parse(content)
}

export async function watchDirectory<T extends ZodType>(
  directory: string,
  type: T
): Promise<Accessor<T['_output'][]>> {
  const [fileNames, setFileNames] = createSignal<T['_output'][]>([])

  const updateFiles = async () => {
    const updatedFiles = await fileNamesInDirectory(directory)
    const fileContents = []
    for (const filename in updatedFiles) {
      try {
        const data = loadYamlFile(filename)
        const value = await type.parseAsync(data)
        fileContents.push(value)
      } catch {
        // ignore missing or malformed files
      }
    }

    setFileNames(fileContents)
  }

  await updateFiles()

    ; (async () => {
      try {
        const watcher = watch(directory, { recursive: true })
        for await (const _ of watcher) {
          await updateFiles()
        }
      } catch (err) {
        return
      }
    })()

  return fileNames
}
