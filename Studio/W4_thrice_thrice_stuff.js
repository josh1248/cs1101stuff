//Zhihao
function z_pascal(row,position){
    return row===position || position===0
    ? 1
    : z_pascal(row-1,position-1) + z_pascal(row-1,position);
}
z_pascal(4,3);

// Fai Yew
// OFF BY ONE BUG WHERE INDEX STARTS FROM 1
function faiyew_pascal(row, position) {
    if (position === 0) {
        return 0;
        // TBA
    } else if (row === 1 || row === position) {
        return 1;
    } else {
        return faiyew_pascal(row - 1, position - 1) + faiyew_pascal(row - 1, position);
    }
}
faiyew_pascal(4, 2); 



// Josh
function josh_pascal(row, position) {
    return position === 0 || position === row
           ? 1
           : josh_pascal(row - 1, position - 1) +
             josh_pascal(row - 1, position);
}



//Hanming
function hanming_pascal(row, position){
    return row === 0 || position === 0 || position === row
    ? 1
    : hanming_pascal(row-1, position) + hanming_pascal(row-1, position-1);
}





// Casie
function casie_pascal (row ,position){
    return row <= 1 || position <= 1 || row === position
            ? 1
            : position === 2 
            ? row
            : casie_pascal (row-1, position) + casie_pascal (row-1, position-1);
}
display(casie_pascal(4, 3));


// Jalil
function jalil_pascal(row,position){
    return position === 1 || position===row
           ? 1
           : jalil_pascal(row-1,position-1) + jalil_pascal(row-1,position);
}
display(jalil_pascal(4,3));


//MT
function mt_pascal(row, position) {
    return position <= 1 || position === row
    ? 1
    : mt_pascal (row-1, position -1) + mt_pascal(row-1, position);
}



//kenji
function kenji_pascal(r, c) {
    if (r <= 1 || c === 0 || r === c) {
        return 1;
    } else { 
        return kenji_pascal(r - 1, c - 1) + kenji_pascal(r - 1, c);
    }
}

kenji_pascal(4, 3);



const pascal = (row, pos) => 
                  (pos === 0 || pos  === row) 
                  ? 1
                  : pascal(row - 1, pos) + pascal(row - 1, pos - 1);


// in-class SHEET

// Jalil
// function compose(f,g){
//     return x => f(g(x));
// }
// compose(math_sqrt,math_log)(math_E);
/* Q1: (a) 1
   Q1: (b) 1
   Q2: 2
   Q3: 9
   Q4: a) Applies thrice function 3 times and then applies it to add1 function,
          so we get 6+9=15 as a output.
       b) if we note x=>x as function f, then it's f^9(compose) = compose as f = x=> x;
       c) Similarly, takes square of 1 9 times which is 1.
       d) Takes square of 2 9 times which is 2^9 = 512.


*/
// Casie 
/* Q1 :1,1
   Q2: 2
   Q3: 27
   Q4: (a) 27 + 6 = 33
       (b) compose
       (c) 1
       (d) (2^2)^27


// Josh
/* Q1: both are 1
   Q2: 2
   Q3: 27
   Q4: let's eval thrice(thrice)
       thrice(thrice) 
       is (f => x => f(f(f(x))))(thrice)
       which evaluates to x => thrice(thrice(thrice(x)))
       if u feed in add1, i.e. (x => thrice(thrice(thrice(x))))(add1)
       u get thrice(thrice(thrice(add1)))
       this becomes thrice(thrice(add3)),
       evaluating gives thrice(add9)
       finally, evaluating this gives add27
       this shows that add1 (and hence any other function)
       is composed on itself 27 times
       THUS output is x => f^27(x)
        a. f^27(add1)(6) = (add27)(6) = 33
        b. f^27(identity)(compose) = (identity)(compose) = compose
        c. 1^x = 1 no matter how big x is
        d. f^27(square)(2)= square^27(2) = (x^2)^27(2) = x^(2^27)(2)
           = 2^(2^27)
*/

// ====================================================
/* 
Fai Yew
1a) 1
1b) 1
2) 2 because sqrt(sqrt(sqrt(256)))
3) ded
*/
function faiyew_repeated(f, n) {
    return n === 0
        ? x => x
        : compose(f, repeated(f, n - 1));
}
const faiyew_thrice = wts_is_happening => faiyew_repeated(some_math_fn, 3);
// ====================================================

const square = x => x * x;
const add1   = x => x + 1;

const repeated = (f, g) => ( x => f(g(x)) );

// can you use repeated to create thrice?
thrice(thrice(thrice))(add1)(0);


//kenji
/* Q1 : 1, 1
   Q2 : 2
   Q3 : 27
   Q4 : (a) 33
        (b) compose
        (c) 1
        (d) 2^2^27
   
   */
   
const thrice = f => repeated(f, 3);
const twice = f => repeated(f, 2);
//TESTCASES:
//(thrice(thrice))(add1)(6) 27 + 6 
// (thrice(thrice))(x => x)(compose);
// (thrice(thrice))(square)(1);
// (thrice(thrcie))(square)(2);
// (twice(thrice))(square)(2);





