// STUDIO S2 (T07B): Burger Joint

const upgrade = 4; // Common 

//Q1: takes in a regular combo and returns a biggie-sized version
function biggie_size(num) {
    return num + upgrade;
}

//Q2: takes in a biggie-size combo and returns the regular version
function unbiggie_size(n){
    return n - upgrade;
}

//Q3: checks if a combo is a biggie-size combo
function is_biggie_size(num) {
    return num > 4;
}

display(is_biggie_size(6));

//Q4: returns price of a combo
function combo_price (num) {
    const base = 1.17;
    const extra = 0.50;
    //return is_biggie_size(num) ? base * (num % 4) + extra : base * (num % 4);
    return base * (num % 4) + (is_biggie_size(num) ? extra : 0);
}
display(combo_price(8));

//Q5: returns an empty order
function empty_order() {
    return 0;
}


//Q6: add a new combo to an order
function add_to_order(order, num) {
    return order * 10 + num;
}


//Q7: returns last combo in an order
function last_combo(order) {
    return order % 10;
}
/*
function last_combo(order){
    return order-(math_trunc(order/10))*10;
}*/


//Q8: removes last combo from an order


function other_combos(order){
    return math_floor(order / 10);
}

// Hello world! Test ground
display(other_combos(375));
display(is_biggie_size(6));
//math_trunc(321/10); //but not a function lol
