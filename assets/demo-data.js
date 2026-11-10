// All records below are invented for the public interactive samples.
export const creators=[
 {id:'creator-01',name:'林间日记',initial:'林',style:'生活记录 · 母婴',price:12000,source:'合作样例 C-01',reason:'亲子日常，生活化叙事',color:'#dce4db'},
 {id:'creator-02',name:'乔的厨房',initial:'乔',style:'美食 · 家居',price:8500,source:'合作样例 C-02',reason:'厨房场景，产品使用演示',color:'#eee2d4'},
 {id:'creator-03',name:'许小野',initial:'许',style:'生活记录 · 户外',price:18000,source:'合作样例 C-03',reason:'户外实拍，生活方式内容',color:'#dde3e9'},
 {id:'creator-04',name:'周末研究所',initial:'周',style:'数码 · 测评',price:28000,source:'合作样例 C-04',reason:'参数说明，产品对比',color:'#e2dfe9'}
];
export function selectCreators(query = '', budget = 20000) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  // Budget and every search term must match the same candidate.
  return creators.filter(creator => {
    const searchable = `${creator.name} ${creator.style} ${creator.reason}`.toLowerCase();
    return creator.price <= budget && terms.every(term => searchable.includes(term));
  });
}
export const sourceA=[{id:'DEMO-001',amount:'1280.00'},{id:'DEMO-002',amount:'860.50'},{id:'DEMO-003',amount:'2400.00'},{id:'DEMO-004',amount:'680.00'},{id:'DEMO-005',amount:'320.20'}];
export const sourceB=[{id:'DEMO-001',amount:'1250.00'},{id:'DEMO-002',amount:'860.50'},{id:'DEMO-004',amount:'680.00'},{id:'DEMO-004',amount:'680.00'},{id:'DEMO-005',amount:'320.20'}];
export function toCents(value) {
  if (typeof value !== 'string' || !/^[-+]?\d+(?:\.\d{1,2})?$/.test(value)) {
    throw new Error('金额必须为最多两位小数的文本');
  }
  const negative = value[0] === '-';
  const [whole, decimal = ''] = value.replace(/^[-+]/, '').split('.');
  const amount = Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
  if (!Number.isSafeInteger(amount)) throw new Error('金额超出安全范围');
  return negative ? -amount : amount;
}

export function money(cents) {
  if (cents === null) return '—';
  const sign = cents < 0 ? '−' : '';
  const absolute = Math.abs(cents);
  return sign + Math.floor(absolute / 100).toLocaleString('en-US')
    + '.' + String(absolute % 100).padStart(2, '0');
}

export function reconcile(a, b) {
  const group = rows => {
    const byId = new Map();
    for (const row of rows) {
      const amounts = byId.get(row.id) || [];
      amounts.push(toCents(row.amount));
      byId.set(row.id, amounts);
    }
    return byId;
  };
  const left = group(a);
  const right = group(b);
  const ids = [...new Set([...left.keys(), ...right.keys()])].sort();
  return ids.map(id => {
    const x = left.get(id) || [];
    const y = right.get(id) || [];
    const duplicate = x.length > 1 || y.length > 1;
    const missing = x.length === 0 || y.length === 0;
    // Keep duplicates visible; summing them would hide a source-data problem.
    const av = x.length === 1 ? x[0] : null;
    const bv = y.length === 1 ? y[0] : null;
    const delta = !duplicate && !missing ? bv - av : null;
    const status = duplicate ? 'duplicate' : missing ? 'missing'
      : delta !== 0 ? 'difference' : 'matched';
    return {id, a: av, b: bv, delta, status, aCount: x.length, bCount: y.length};
  });
}
