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

// constructor functions that abstract make the function easier to read and more abstracted
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

merge_modified(list(4,6,7,8), list(1,2,3,5), 4); // returns 15

function merge_sort_modified(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return pair(xs, 0); 
    } else {
        const mid = middle(length(xs));
        const left_result = merge_sort_modified(take(xs, mid));
        const right_result = merge_sort_modified(drop(xs, mid));
        const merge_result = merge_modified(sorted_list(left_result),
                                            sorted_list(right_result),
                                            length(sorted_list(left_result)));
        return pair(sorted_list(merge_result),
                    swaps(left_result) + swaps(right_result) + swaps(merge_result));
    } 
}

function GraderVer1(arr) {
    return swaps(merge_sort_modified(arr));
}

GraderVer1(list(1,2,4,5,3,6,8,7));

/*

Define a swap as interchanging the positions of two elements that are adjacent to one
another. for example, list(1,2,3,4) to list(1,3,2,4) involves a swap between the elements
2 and 3. list(1,2,3,4) to list(4,1,2,3) will involve 3 sequential swaps.

Hypothesis: the minimum number of swaps required to change an out of order list to an
in order list equals the number of out of order pairs. 
Im not sure how to prove this mathematically, but I notice that if 1 swap is done, 
only 1 out of order pair is present, if 2 swaps (that dont cancel each other out)
are done, then 2 out or order pairs form. This equality holds in all the testing I 
have tried, so lets leave it at that.

Therefore, I should create an algorithm that sorts an output list to an input list, but
tracks how many swaps it performs. I need an algorithm better than n^2 for the sorting,
of course. Merge sort seems like it would be the best for counting the number of swaps
as the merge function (discussed later) makes it easy.

while doing the O(n) merge of 2 sorted halves,
if the algorithm notices that it takes from
the right list instead of the left list, it means that the head element of right list
is out of order by the number of elements remaining in the left list 
(which equals number of swaps required to "fix" it in the correct place in the sorted
list). 

Example: There are 7 elements in the left list, and the head element is smaller than
left list.
Then in the sorted list, the right head element takes index position 0
Yet in this merge, the right head element took position 7
Thus the right head element is "off" its correct position by 7

So we need to add the number of out of order pairs by length(right_list).

I wouldn't want to get "the number of elements remaining in the left list" using the
length function, as it is an O(n) function, and I may call it up to n/2 times. This
would result in merge transforming from an O(n) to O(n^2) function, disastrously
causing the modified merge sort to be a O(n^2logn) function.

Instead, we should store the value of length() at the very start, which takes O(n) time. 
Subsequently, perform n/2 times of O(1) arithmetic on the stored value to get length of left list
as the left list decreases its length 1 by 1. Overall, this is an O(n) operation.
Ignoring coefficients, this keeps our modified merge function at a good O(n) spot,
hence keeping the O(nlogn) nature of the merge sort intact in our
modified algorithm (albeit with a much larger leading coefficient)
*//*

Define a swap as interchanging the positions of two elements that are adjacent to one
another. for example, list(1,2,3,4) to list(1,3,2,4) involves a swap between the elements
2 and 3. list(1,2,3,4) to list(4,1,2,3) will involve 3 sequential swaps.

Hypothesis: the minimum number of swaps required to change an out of order list to an
in order list equals the number of out of order pairs. 
Im not sure how to prove this mathematically, but I notice that if 1 swap is done, 
only 1 out of order pair is present, if 2 swaps (that dont cancel each other out)
are done, then 2 out or order pairs form. This equality holds in all the testing I 
have tried, so lets leave it at that.

Therefore, I should create an algorithm that sorts an output list to an input list, but
tracks how many swaps it performs. I need an algorithm better than n^2 for the sorting,
of course. Merge sort seems like it would be the best for counting the number of swaps
as the merge function (discussed later) makes it easy.

while doing the O(n) merge of 2 sorted halves,
if the algorithm notices that it takes from
the right list instead of the left list, it means that the head element of right list
is out of order by the number of elements remaining in the left list 
(which equals number of swaps required to "fix" it in the correct place in the sorted
list). 

Example: There are 7 elements in the left list, and the head element is smaller than
left list.
Then in the sorted list, the right head element takes index position 0
Yet in this merge, the right head element took position 7
Thus the right head element is "off" its correct position by 7

So we need to add the number of out of order pairs by length(right_list).

I wouldn't want to get "the number of elements remaining in the left list" using the
length function, as it is an O(n) function, and I may call it up to n/2 times. This
would result in merge transforming from an O(n) to O(n^2) function, disastrously
causing the modified merge sort to be a O(n^2logn) function.

Instead, we should store the value of length() at the very start, which takes O(n) time. 
Subsequently, perform n/2 times of O(1) arithmetic on the stored value to get length of left list
as the left list decreases its length 1 by 1. Overall, this is an O(n) operation.
Ignoring coefficients, this keeps our modified merge function at a good O(n) spot,
hence keeping the O(nlogn) nature of the merge sort intact in our
modified algorithm (albeit with a much larger leading coefficient)
*/
