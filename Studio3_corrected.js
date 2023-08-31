import {
heart, blank, square, ribbon, circle,
show, stack, stack_frac, stackn, beside, beside_frac
} from "rune";

//Answers for Reflection 3

/*Q1:
1: f(y => y + 1);
2: const z = 3;
   return (y => y + 1)(z);
3: return (y => y + 1)(3);
4: return 4;*/

//Q2:
function my_sum(n){
    return n === 1
           ? 2
           : n * (n + 1) + my_sum(n - 1);
}

/* Based on math formulae on sums of squares and numbers:
function my_sum(n){
    return n * (n + 1) / 2 + n * (n + 1) * (2n + 1) / 6;
}
*/

//Q3: Recursive process running on big theta (n) order of growth for time and space

//Q4:
function sum(term, a, next, b){
    return a > b
           ? 0
           : term(a) + sum(term, next(a), next, b);
}

function my_sum_2(n) {
    return sum_2(x => x * (x + 1), 1, x => x + 1, n);
}

//Q5:
function sum_2(term, a, next, b){
    return sum_iter(0, term, a, next, b);
}

function sum_iter(sum, term, a, next, b){
    return a > b
           ? sum
           : sum_iter(sum + term(a), term, next(a), next, b);
}

//Q6:
//a: x, f, g, y, h
//b: For within the bracket they are enclosed in. x applies globally
//   , but is overwritten by local variables.
//c: 12 by substitution model
//d: x + 2

