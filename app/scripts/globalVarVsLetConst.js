window.onerror = function() {
    return true;
};

try {
    let globalLet, globalConst;
} catch (e) {
    console.error('let/const are not supported:', e);
}

var globalVar = 'globally scoped var value';
let globalLet = 'globally scoped let value';
const globalConst = 'globally scoped const value';