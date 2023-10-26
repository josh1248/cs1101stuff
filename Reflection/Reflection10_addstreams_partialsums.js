function zip_list_of_streams(lst) {
    return pair(head(head(lst)),
                () => zip_list_of_streams(append(tail(lst), list(head(lst)))));
}

function partial_sums_1(s) {
    //Sn = Sn-1 + An.
    function partials(s, prev) {
        return pair(head(s) + prev,
                    () => partials(stream_tail(s), head(s) + prev)
                   );
    }
    
    return partials(s, 0);
}

//implementation using stream sums.
function add_streams(s1, s2) { 
    return is_null(s1)
           ? s2
           : is_null(s2)
           ? s1 
           : pair(head(s1) + head(s2),
                  () => add_streams(stream_tail(s1),
                                    stream_tail(s2)));
}

function partial_sums_2(s) {
    const p_sums = add_streams(s, pair(0, () => stream_tail(p_sums)));
    return p_sums;
}



eval_stream(partial_sums_2(null), 12);