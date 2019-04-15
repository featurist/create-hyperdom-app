import * as fs from 'fs'

interface Manifest {
  [s: string]: string
}

let manifest: Manifest

export default function loadManifest (): Manifest {
  manifest = manifest || JSON.parse(
    fs.readFileSync(`${process.cwd()}/browser/dist/manifest.json`, {encoding: 'utf-8'})
  )
  return manifest
}
