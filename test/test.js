import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import assert from 'assert'
import Fisheye from '../index.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const fixture = path.join(__dirname, '../input.jpg')
const tmpImage = path.join(os.tmpdir(), 'fisheye-test-input.jpg')
const outputDir = path.join(__dirname, 'tmp')

describe('Fisheye', function () {
  this.timeout(10000)

  before(async () => {
    await fs.remove(outputDir)
    await fs.ensureDir(outputDir)
  })

  beforeEach(async () => {
    await fs.copy(fixture, tmpImage)
  })

  const uniqueName = (base) => `${base}_${Date.now()}`

  it('creates tiny-planet output', async () => {
    const name = uniqueName('output_tiny_planet')
    const fisheye = new Fisheye({
      image: tmpImage,
      directory: outputDir,
      name,
      view: 'tiny-planet',
    })
    const result = await fisheye.create()
    assert.strictEqual(result.command, 'tiny-planet')
    assert.ok(result.output.endsWith(`${name}_tiny-planet.jpg`))
    assert.strictEqual(result.code, 0)
    assert.ok(await fs.pathExists(result.output))
  })

  it('creates big-sky output', async () => {
    const name = uniqueName('output_big_sky')
    const fisheye = new Fisheye({
      image: tmpImage,
      directory: outputDir,
      name,
      view: 'big-sky',
    })
    const result = await fisheye.create()
    assert.strictEqual(result.command, 'big-sky')
    assert.ok(result.output.endsWith(`${name}_big-sky.jpg`))
    assert.strictEqual(result.code, 0)
    assert.ok(await fs.pathExists(result.output))
  })

  it('uses default random view when invalid', async () => {
    const name = uniqueName('output_random_view')
    const fisheye = new Fisheye({
      image: tmpImage,
      directory: outputDir,
      name,
      view: 'invalid-view',
    })
    const result = await fisheye.create()
    assert.ok(['tiny-planet', 'big-sky'].includes(result.command))
    assert.strictEqual(result.code, 0)
    assert.ok(await fs.pathExists(result.output))
  })

  it('defaults name to input basename when empty', async () => {
    const name = '' // empty to test default naming behavior
    const fisheye = new Fisheye({
      image: tmpImage,
      directory: outputDir,
      name,
      view: 'big-sky',
    })
    const result = await fisheye.create()
    assert.ok(result.output.includes(path.parse(tmpImage).name))
    assert.strictEqual(result.code, 0)
    assert.ok(await fs.pathExists(result.output))
  })
})
