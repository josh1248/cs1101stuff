//Consider the following implementation of the insertion sort algorithm:
/*
function insert_cmp(x, xs, cmp) { 
    return is_null(xs)
           ? list(x)
           : cmp(x, head(xs))
           ? pair(x, xs)
           : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}

function insertion_sort_cmp(xs, cmp) {
    return is_null(xs)
           ? xs
           : insert_cmp(head(xs),
                        insertion_sort_cmp(tail(xs), cmp),
                        cmp);
}
*/
//Given a list of numbers, xs, as input, for each of the following, how would you call
//insertion_sort to get the required result?
//We shall use the following list xs as the example input:
//const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7);

//(a) The numbers in the result list are in ascending order. For example,
     insertion_sort_cmp(xs, (x, y) => x < y);
     // Result: list(1, 2, 3, 4, 5, 6, 6, 7, 8, 9)
     
//(b) The numbers in the result list are in descending order. For example,
     insertion_sort_cmp(xs, (x, y) => x > y);
     // Result: list(9, 8, 7, 6, 6, 5, 4, 3, 2, 1)
     
//(c) The result list is the reverse of the input list. For example,
     insertion_sort_cmp(xs, (x, y) => false);
     // Result: list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6)
     
//(d) In the result list, all the even numbers are placed before the odd numbers, 
//      and the even numbers are in ascending order,
//      whereas the odd numbers are in descending order. For example,
        insertion_sort_cmp(xs, (x, y) => x % 2 === 0
                                         ? x < y // does not work if x is even 
                                                //and y is a bigger odd number
                                         : y % 2 === 1
                                         ? x > y
                                         : false

                            );
        // Result: list(2, 4, 6, 6, 8, 9, 7, 5, 3, 1)

//even, even => ascending
//even, odd => true
//odd, even => false
//odd, odd => descending

//2. Regarding merge sort:
//(a) Use big-O, Θ or Ω notation to characterize the running time of function merge,
//for the input lists xs and ys of the same length n.
    //O(n), omega(n), theta(n).

//(b) Given the running time of the functions middle, take and drop have the 
//following orders of growth:
//middle — Θ(1)
//take — Θ(n), where n is the value of the argument n
//drop — Θ(n), where n is the value of the argument n
//Characterize the running time of merge_sort, using the big-O, Θ or Ω notation.
    /* Suppose merge sort of size 100 takes x steps.
       Then a merge sort of size 200 takes 3x steps.
       then a merge sort of size 400 takes 9x steps
       problem size increasing by n times increases steps taken by
       3^log_2(n) times
       using this rate equation, we get x*log(x) in big O time
    */
    
    /* Better way to think about it is the O(n) time taken for each "layer" 
    of take and drop.
    For example, take and drop of 8 elements, then 4 elements, then 2, then 1
    Each layer takes about n steps
    There are 2 * log_2(n) layers, 
    thus the total is 2*log_2(n)*n steps
    log_2(n) = log_n(x) / log_n(2), denominator is constant. throw away the
    constants to get general O / theta / omega class nlogn.
    
    */


