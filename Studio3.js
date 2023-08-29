import {
heart, blank, square, ribbon, circle,
show, beside, stack, stack_frac, beside_frac
} from "rune";

/* in-class 
ADD YOUR NAME TO THE RIGHT OF FUNCTION NAME
e.g. moony_2_CH(n)
*/


function moony_1_Josh(bottom_right){
    return stack(beside(circle, blank),
                 beside(square, bottom_right));
}

function moony_2_Josh(n){
    return stack(beside(circle, blank),
                 beside(square, moony_2_Josh(n - 1)));
}

function moony_Josh(n){
    return n === 1
           ? circle
           : stack_frac(1 / n,
                        beside_frac(1 / n, circle, blank),
                        beside_frac(1 / n, square, moony_Josh(n - 1));
}

function moonyJalil(n){
    return n === 1 
           ? circle
           : beside_frac(1/n,
                         stack_frac(1/n, circle, square),
                         stack_frac(1/n, blank, moonyJalil(n-1))
                         );
}

//Man Teng
function moony_1_MT(bottom_right) {
    return stack(beside(circle, blank), beside(square,bottom_right));
}

function moony_2_MT(n) {
    return n === 0
    ? circle
    : beside(stack(circle, square), stack(blank,(moony_2_MT(n-1))));
}


function moony_MT(n) {
    return n === 1
    ? circle
    : beside_frac(1/n, 
        stack_frac(1/n, circle, square), 
        stack_frac(1/n, blank,(moony_MT(n-1))) 
    );
}



//Zhihao
function moony_1(bottom_right) {
    return beside(stack(circle,square),stack(blank,rune));
}
function moony_2(rune,n){
    return n===1
    ?rune
    :moony_1(monny_2(rune,n-1));
}
function moony_nice(rune,n) {
    return n===1
    ?rune
    :beside_frac(
        1/n,
        stack_frac(1/n, circle,square),
        stack_frac(1/n,blank,moony_nice(rune,n-1)));
}
show(moony_nice(circle, 4));
//Hanmming
function moony_1_HM(bottom_right){
    return stack(beside(circle, blank), beside(square, bottom_right));
}

function moony_2_HM(n){
    return n === 0
    ? circle
    : moony_1(moony_2(n-1));
}

function moony_helper_HM(bottom_right, n){
    return stack_frac(1/n,
            beside_frac(1/n, circle, blank),
            beside_frac(1/n, square, bottom_right));
}

function moony_HM(n){
    return n === 0
    ? circle
    : moony_helper_HM(moony(n-1), n);
}
/*
Time: Linear, as n increase in moony(n), the number of moony & moony_helper
calls increase linearly.
Space: Exponential.
Assumptions: Assumed that primitave runes consume same amount of space
and primative operations takes the same amount of time
*/

// Fai Yew
function faiyew_moony_q3(n) {
    return n === 0 
                ? circle 
                : beside_frac(1 / n, stack_frac(1 / n, stack(blank, circle), square), moony(n - 1));
}

faiyew_moony_q3(5);


//Casie 
function moony_1_Casie (rune){
    return stack (beside(circle, blank),beside(square,rune));
}

function moony_2_Casie (n){
    return n === 0
            ? circle
            : beside_frac (1/2, stack (circle,square), 
              stack(blank, moony_2_Casie (n-1)));
}

//kenji
function moony_1_kenji(bottom_right) {
    const stack_circle_square = stack(circle, square);
    return beside(stack(circle, square), stack(blank, bottom_right));
}

show(moony_1_kenji(ribbon));

function moony_2_kenji(n) {
    return n === 1 ? circle
                   : beside(stack(circle, square), 
                            stack(blank, moony_2(n - 1));
}

show(moony_2_kenji(5));

function moony_kenji(n) {
    return n === 1 ? circle
                   : beside_frac(1 / n,
                                 stack_frac(1 / n, circle, square),
                                 stack_frac(1 / n, blank, moony(n - 1)));
}

show(moony_kenji(5));

/* recursive, 