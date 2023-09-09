/* My implementation of the reverse function, taking in a list and reversing the 
order of elements in it. list is defined recursively as null, or a pair where
the tail element is a list.

list(1,2,...,k) equals [1, [2, [..., [k, null]]]]
the desired reverse becomes [k, [k-1, [..., [1, null]]] which equals
[k, reverse(1,2,...,k-1)]
but this is not a desirable recursive definition
as tail(lst) as tail(list) takes O(n) time based on length of list.
tail() would be run n times as well. O(n^2) running time results.

Iterative process seems to give an O(n) answer, whereby we slowly form up
our reversed list, from the innermost layer and going outwards. 

Space complexity should be O(n) as well. only 2 lists with at most n elements
are kept track of per function application.

n entries are kept 

function reverse(lst) {
    return reverse_iter(lst, null);
}

function reverse_iter(input_lst, output_lst){
    return is_null(input_lst)
           ? output_lst
           : reverse_iter(tail(input_lst),
                          pair(head(input_lst),output_lst));
}

*/


reverse(list(1,2,3,4,5));