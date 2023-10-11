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