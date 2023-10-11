/*
function make_withdraw(balance, password_real) {
    //lock if 3 wrong passwords in a row.
    let remaining_attempts = 3;
    
    function withdraw(amount, password_attempt) {
        if (remaining_attempts <= 0) {
            return "Account disabled";
        } else if (password_attempt !== password_real) {
            remaining_attempts = remaining_attempts - 1;
            return "Wrong password, no withdraw";
        } else if (balance < amount) {
            return "Insufficient funds";
        } else {
            balance = balance - amount;
            return balance;
        }
    }
    return withdraw;
}
const acc = make_withdraw(100, "my_password");
*/
let commission = 25; // my commission in dollars 

// return a calculator for total price
// total price = (commission + cost) * (1 + tax_rate)

function make_price_calculator(tax_rate) { 
    function calculator(cost) {
        return (commission + cost) * (1 + tax_rate);
    }
    return calculator;
}
const calc = make_price_calculator(0.07);
commission = 125;
calc(75);