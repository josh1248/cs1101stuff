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

We should do so by having our list be the head element be associated with a list
of tags, such that index n in the list of elements has a tag in index n 
in the list of tags.

For a non-loops based solution, it would be good to then associate these lists with a 
counter that indicates how many out of order triplets are already within 
the rest of the elements".

Implementation: list(element_list, tag_list, counter).
call this homemade data structure trio!
*/
const make_trio = (element_list, tag_list, counter)
                    => list(element_list, tag_list, counter);

const elements_of = trio => head(trio);
const tags_of = trio => head(tail(trio));
const counter_of = trio => head(tail(tail(trio)));

//Input: list of elements.
//Output: Trio.
function generate_trio(element_list) {
    if (is_null(element_list)) {
        //base case
        return make_trio(null, null, 0);
    } else if (is_null(tail(element_list)) {
        //base case
        return make_trio(element_list, list(0), 0);
    } else {
        const previous_result = generate_trio(tail(element_list));
    }
}