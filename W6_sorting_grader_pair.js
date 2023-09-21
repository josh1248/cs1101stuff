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

// modify the merging of two sorted lists into one sorted list, such that it counts swaps done.
// have it return a pair,
// where the sorted list is in the head of the pair, followed by number of swaps at the back.

// constructor functions that abstract this away
function sorted_list(merge_modified_pair) {
    
}
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
            const sorted_list_next = head(next_result);
            const swaps_next = tail(next_result);
            return pair(pair(x, sorted_list_next),
                        0 + swaps_next);
        } else {
            const next_result = merge_modified(xs, tail(ys), xs_length);
            const sorted_list_next = head(next_result);
            const swaps_next = tail(next_result);
            return pair(pair(y, sorted_list_next),
                        xs_length + swaps_next);
        }
    }
    
}

merge_modified(list(1,2,4,8), list(3,7), 4);


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
