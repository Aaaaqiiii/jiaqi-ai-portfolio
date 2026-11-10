import {test} from 'node:test';
import assert from 'node:assert/strict';
import {runProjectChecks} from '../dist/assets/project-checks.js';

for (const project of ['creators', 'finance']) {
  test(`${project} 的页面检查由实际业务函数计算`, () => {
    const results = runProjectChecks(project);
    assert.equal(results.length, 4);
    for (const result of results) assert.equal(result.passed, true, result.name);
  });
}
