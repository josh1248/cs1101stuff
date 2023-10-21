let results = [];
function read(x, y){
    return results[x] === undefined ? undefined : results[x][y];
}

function write(x, y, val){
    if (results[x] === undefined){
        results[x] = [];
    }
    results[x][y] = val;
}

function m_cc(amount, kinds_of_coins) {
    return amount === 0
           ? 1
           : amount < 0 || kinds_of_coins === 0 
           ? 0
           : read(kinds_of_coins, amount) !== undefined
           ? read(kinds_of_coins, amount)
           : m_cc(amount, kinds_of_coins - 1) +
             m_cc(amount - first_denomination(kinds_of_coins),
                kinds_of_coins);
}

function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ? 5 :
           kinds_of_coins === 2 ? 10 :
           kinds_of_coins === 3 ? 20 :
           kinds_of_coins === 4 ? 50 :
           kinds_of_coins === 5 ? 100 : 0;
}

m_cc(15, 5);