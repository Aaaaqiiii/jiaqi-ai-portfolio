import {selectCreators, reconcile, sourceA, sourceB, toCents} from './demo-data.js';

// The browser and Node tests execute these same checks against the public demo functions.
// These checks cover the demo logic, not the proposed RAG or backend services.
export function runProjectChecks(project) {
  const checks = [];
  const check = (name, expected, run) => {
    try {
      const actual = run();
      checks.push({name, expected, actual, passed: actual === expected});
    } catch (error) {
      checks.push({name, expected, actual: error.message, passed: false});
    }
  };
  if (project === 'creators') {
    check('预算 ¥10,000', '乔的厨房', () => selectCreators('', 10000).map(c => c.name).join('、'));
    check('母婴 + 预算 ¥10,000', '0 位候选', () => `${selectCreators('母婴', 10000).length} 位候选`);
    check('厨房 + 产品', '乔的厨房', () => selectCreators('厨房 产品', 20000).map(c => c.name).join('、'));
    check('不存在的搜索词', '0 位候选', () => `${selectCreators('未收录的名称', 50000).length} 位候选`);
  } else if (project === 'finance') {
    const rows = reconcile(sourceA, sourceB);
    check('DEMO-001 的差额', '-3000 分', () => `${rows.find(r => r.id === 'DEMO-001').delta} 分`);
    check('重复编号不计算差额', 'duplicate / null', () => {const row = rows.find(r => r.id === 'DEMO-004'); return `${row.status} / ${row.delta}`;});
    check('只在来源 B 出现的记录', 'missing', () => reconcile([], [{id: 'ONLY-B', amount: '1.00'}])[0].status);
    check('拒绝三位小数', '拒绝', () => {try {toCents('1.001'); return '接受';} catch {return '拒绝';}});
  } else {
    throw new Error('不支持的项目');
  }
  return checks;
}
