//Q1 to obtain elements only
function flatten_list(LoL) {
    return accumulate(append, null, LoL);
}

/* good way to name your accumulator functions is
    (x, acc) => ...
   then you know "acc" is the abstraction of "the rest of the list".
   i.e. (x, acc) => append(x, acc)
*/


const LoL = list(list(1, 2), list(3, 4, 5, 6), null, list(7, 8, 9));
flatten_list(LoL); // Returns list(1, 2, 3, 4, 5, 6, 7, 8, 9)

//Q2 to get sum of elements regardless of data structure.
function tree_sum(tree) {
    if (is_null(tree)) {
        return 0;
    } else if (is_list(head(tree))) {
       return tree_sum(head(tree)) + tree_sum(tail(tree));
    } else {
        return head(tree) + tree_sum(tail(tree));
    }
}

const my_tree = list(1, list(2, list(3, 4), 5), list(6, 7));
tree_sum(my_tree); //Returns 28

/*
function traverse(xs) {
    // Modify this function to work on trees.
    if (is_null(xs)) {
        return null;
    } else if (is_list(head(xs))) {
        traverse(head(xs));
        return traverse(tail(xs));
    } else {
        display(head(xs));
        return traverse(tail(xs));
    }
}
*/

//Q3
/*
function accumulate(op, initial, xs) {
    return is_null(xs)
           ? initial
           : op(head(xs), accumulate(op, initial, tail(xs)));
}
*/

function accumulate_tree(f, op, initial, tree) {
    return accumulate((x, acc) => 
                        !is_list(x)
                            ? op(f(x), acc)
                            : op(accumulate_tree(f, op, initial, x), acc),
                      initial,
                      tree);
}

function flatten(tree) {
return accumulate_tree(x => list(x), append, null , tree); }
flatten(LoL);
