/*
Idea: tag each element in the list with the number of elements that are smaller
than it subsequently in the list.

Then, suppose we have list(input, ..., x, ...). x is tagged to n, the number of
elements that are smaller than x.

if input > x, then n out or order triplets can be formed that involves input as 
the head element and x as the middle element.
So we can increase our out of order triplets counter by n, the number tied to the element!

We go through every element in the rest of the list, adding up their tag to the
out of order triplets whenever our input is bigger than it. there are n-1 other elements
that are not input. Hence, if we have already solved a problem of size n-1, accomodating
an additional element takes O(n) time. d(steps)/dn is linear, so steps is a quadratic,
O(n^2) solution!
*/

/*
To accomodate our counting, we need to attribute a tag to every element in the list. 
This tag is the number of elements smaller than it in the subsequent list.

We should do so by pairing every element in the list with their tag, whereby the 
head of the pair is the element, and the tail of the pair is the tag.

Then, wrap the modified list with a counter that indicates the number of out
of order triplets in the original list of elements.

Let's call this a modified pair: the head contains the modified list and the tail
contains the number of out of order triplets in the original list of elements.
*/

const head_entry_of = modified_list => head(head(modified_list));
const head_tag_of = modified_list => tail(head(modified_list));

//Input: input element, modified list.
//Output: tag that accompanies input element.
function generate_tag_of(input, modified_list) {
    return is_null(modified_list) 
           ? 0 
           : input <= head_entry_of(modified_list)
           ? generate_tag_of(input, tail(modified_list))
           : 1 + generate_tag_of(input, tail(modified_list));
}

//Input: input element, modified list.
//Output: number of out of order 
//        triplets involving input element in the original list of elements
function triplets_with_element(input_element, modified_list) {
    if (is_null(modified_list)) {
        return 0;
    } else if (input_element <= head_entry_of(modified_list)) {
        return triplets_with_element(input_element, tail(modified_list));
    } else {
        return head_tag_of(modified_list) +
               triplets_with_element(input_element, tail(modified_list));
    }
}

//Input: list of elements.
//Output: modified pair.
function generate_modified_pair_of(xs) {
    if (is_null(xs)) {
        //base case. make the starting modified pair.
        return pair(null, 0);
    } else {
        //Wishful thinking step
        const recur_result = generate_modified_pair_of(tail(xs));
        const recur_modified_list = head(recur_result);
        const recur_counter = tail(recur_result);
        
        const incoming_element = head(xs);
        const tagged_incoming_element = 
            pair(incoming_element, 
                 generate_tag_of(incoming_element, recur_modified_list));

        return pair(pair(tagged_incoming_element,
                         recur_modified_list),
                    triplets_with_element(incoming_element, recur_modified_list) + 
                    recur_counter
                );
    }
}

function graderVer2(arr) {
    return counter_of(generate_modified_pair_of(arr));
}

// test your program!
graderVer2(list(5, 2, 3, 1, 4)); // should return 2