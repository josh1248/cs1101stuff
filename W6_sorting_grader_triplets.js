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


//To accomodate our counting, we need to:
//attribute a tag to every element in the list. This tag is the 
//number of elements smaller than it in the subsequent list.
//We should do so by modifying our list so that every element in the list is a pair.
//The head element of the pair is the element itself, 
//and the tail element of the pair is the tag.
const entry = tagged_pair => head(pair);
const tag = tagged_pair => tail(pair);

//inputs: element, tagged list.
//returns: tag of that element.
function get_tag(element, tagged_lst) {
    function get_tag_iter(count, element, input_lst){
        return is_null(lst) 
               ? 0
               : element > entry(head(input_lst))
               ? tag_iter(count + 1, element, tail(input_lst))
               : tag_iter(count, element, tail(input_lst));
    }
    return tag_iter(0, element, tagged_lst);
}

//inputs: untagged list.
//returns: tagged list.
