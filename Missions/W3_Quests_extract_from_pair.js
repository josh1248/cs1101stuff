const pair = (x, y) => f => f(x, y);

/*
Input: p (which equals f => f(arg1, arg2) for an arbitrary pair(arg1, arg2))
Desired output for head: arg1.
Desired output for tails: arg2.

A simplified function that returns only the first argument would look like:
(a, b) => a

Making this function be f in pair yields:
pair(arg1, arg2)((a, b) => b)
(f => f(arg1, arg2))((a, b) => b) (evaluation of pair(arg1, arg2))
((a, b) => b) => f(arg1, arg2) (input of (a, b))
((a, b) => b)(arg1, arg2) (substitution of (a, b))
(arg1, arg2) => arg1 (input of (arg1, arg2))
arg1 (substitution of (arg1, arg2))
mission accomplished!

Lets call (a, b) => a the first_field function, since it 
returns the first item in the data structure.

Then let (a, b) => b be the second_field function.

Then head will be implemented as p => p(first_field)
substituting, p => p((a, b) => a)) is head.
then p => p((a, b) => b) is tails.
*/
const head = p => p((a, b) => a);  // complete lambda expression
const tail = p => p((a, b) => b);  // complete lambda expression

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true