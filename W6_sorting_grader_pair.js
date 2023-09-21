// half, rounded downwards
function middle(n) {
    return math_floor(n / 2);
}

// put the first n elements of xs into a list
function take(xs, n) {
    return is_null(xs) || n === 0
           ? null
           : pair(head(xs), take(tail(xs), n - 1));
}

// drop the first n elements from list, return rest
function drop(xs, n) {
    return n === 0 || is_null(xs)
           ? xs
           : drop(tail(xs), n - 1);
}

// modify merge such that it counts swaps done.
// have it return a pair,
// where the sorted list is in the head of the pair, followed by number of swaps at the back.

// constructor functions that abstract this pair construction of merge modified
const sorted_list = merge_modified_pair => head(merge_modified_pair);
const swaps = merge_modified_pair => tail(merge_modified_pair);
    
function merge_modified(xs, ys, xs_length) { 
    if (xs_length === 0) {
        return pair(ys, 0);
    } else if (is_null(ys)) {
        return pair(xs, 0);
    } else {
        const x = head(xs);
        const y = head(ys);
        if (x < y) {
            const next_result = merge_modified(tail(xs), ys, xs_length - 1);
            return pair(pair(x, sorted_list(next_result)),
                        0 + swaps(next_result));
        } else {
            const next_result = merge_modified(xs, tail(ys), xs_length);
            return pair(pair(y, sorted_list(next_result)),
                        xs_length + swaps(next_result));
        }
    }
    
}

merge_modified(list(4,6,7,8), list(1,2,3,5), 4);

/*
function merge_sort_modified(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs; 
    } else {
        const mid = middle(length(xs));
        return merge_modified(merge_sort(take(xs, mid)),
                              merge_sort(drop(xs, mid)));
    } 
}
merge_sort(drop(xs, mid)));
*/
