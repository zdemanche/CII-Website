import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

test('build output exists', () => {
  assert.ok(existsSync('dist/index.html'), 'run `npm run build` first');
});
