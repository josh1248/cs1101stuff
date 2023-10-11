function get_dtmf_frequencies(number) {
    function mapper(x) {
        return x === 0
               ? pair(3, 1)
               : x < 10
               ? pair(math_floor((x - 1)/ 3), (x - 1) % 3)
               : x === 10
               ? pair(3, 0)
               : x === 11
               ? pair(3, 2)
               : pair(x - 12, 3);
    }
    
    const row_headers = list(697, 770, 852, 941);
    const column_headers = list(1209, 1336, 1477, 1633);
    
    /*First pass of map: Pre-calculate results when feeding x into mapper
      as x varies from 0 to 15, storing them in a list where index = input
      into mapper and value at index = output of mapper. */
    const matrix_index = map(mapper, enum_list(0, 15));
    
    /*Second pass of map: Convert matrix index to the values of the row 
      and column headers they represent.*/
    const index_to_freq = 
        index => pair(list_ref(row_headers, head(index)),
                      list_ref(column_headers, tail(index)));
                            
    const num_to_freqs = map(index_to_freq, matrix_index);
    
    return list_ref(num_to_freqs, number);
}

function make_dtmf_tone(frequency_pair) {
    return simultaneously(list(sine_sound(head(frequency_pair), 0.5),
                               sine_sound(tail(frequency_pair), 0.5))
                         );
}

/* Base case: if list of digits is nothing, return silence.
Else, -get head element of list with head()
      -convert the head element to a tone with num_to_tone()
      -end the tone off with 0.1s of silence with consecutively()

Then, by wishful thinking, recursively apply dial to
the tail of the list of digits.
*/
function dial(list_of_digits) {
    //separated to reduce mess of return function
    const num_to_tone = num => make_dtmf_tone(get_dtmf_frequencies(num));
    return is_null(list_of_digits)
           ? silence_sound(0)
           : consecutively(
               list(consecutively(list(num_to_tone(head(list_of_digits)),
                                       silence_sound(0.1))
                                 ),
                    dial(tail(list_of_digits)))
             );
}

/*if list is empty, do nothing. -> This seems to mean a 0-duration silence
  rather than null so that list of sounds is not polluted by a null value.
      Otherwise:
      Check if head element corresponds to evil number with digits_to_num().
        - If so, ignore this element and dial "the rest" of the numbers
      Else, number is safe to call.
        - convert number to sound with dial()
        - add sound of "#" to number with consecutively()
        - After dialling this number, dial "the rest" of the numbers,
          with consecutively().
*/
const evil_num = 18005211980;
const end_sound = make_dtmf_tone(get_dtmf_frequencies(11));
function dial_all(list_of_numbers) {
    function digits_to_num(numlist) {
        /*The operation (a,b) => a+10*b will convert a pair of
          integers between 0 and 9 into a representative number with
          the constituent digits, whereby
          argument index 0 takes digit value 10^0 and 
          argument index 1 takes digit value 10^1.
         
          We can use accumulate to generalise this notion,
          converting an entire list of numbers between 0 and 9
          to their representative number, whereby
          list element n takes digit value 10^n.
          
          Simulate left-to-right accumulate via reverse().*/
        return accumulate((a, b) => a + 10 * b, 0, reverse(numlist));
    }
    
    if (is_null(list_of_numbers)){
        return silence_sound(0);
    } else if (digits_to_num(head(list_of_numbers)) === evil_num) {
        return dial_all(tail(list_of_numbers));
    } else {
        const first_num = consecutively(list(
                                dial(head(list_of_numbers)),
                                end_sound
                            ));
        return consecutively(list(
                    first_num,
                    dial_all(tail(list_of_numbers))
                ));
    }
}

// Test
play(dial_all(
       list(
         list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
         list(6,2,3,5,8,5,7,7),
         list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
        ));