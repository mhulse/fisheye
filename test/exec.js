import exec from 'await-exec'
import { commands } from '../lib/index.js'

try {
  const check = await exec(commands['check for system dep']('exiftool'))
  console.log(check.stdout.toString().trim())
} catch (err) {
  console.error(err)
}
