function stream_pairs(s) { 
    return is_null(s)
           ? null
           : stream_append(
                stream_map(
                    sn => pair(head(s), sn),
                    stream_tail(s)),
                stream_pairs(stream_tail(s)));
}
eval_stream(stream_pairs(stream(1,2,3,4,5)),10);
/*
[ [1, 2],
[ [1, 3],
[ [1, 4],
[[1, 5], [[2, 3], [[2, 4], [[2, 5], [[3, 4], [[3, 5], [[4, 5], null]]]]]]]]]]
*/
//Stream pairs returns a stream of all possible pairings of its elements. 
//Pairings are arranged with the earlier element at the head and the later
//element at the tail. Pairings are sequentially generated, with the earlier
//element going through the elements sequentially.


//Stream pairs will crash
//because stream pairs will be constantly calling itself without ever ending.


function stream_append_pickle(xs, ys) { 
    return is_null(xs)
           ? ys()
           : pair(head(xs),
                  () => stream_append_pickle(stream_tail(xs),
                                             ys));
}

function stream_pairs2(s) { 
    return is_null(s)
           ? null
           : stream_append(
                stream_map(
                    sn => pair(head(s), sn),
                    stream_tail(s)),
                stream_pairs(stream_tail(s)));
}
eval_stream(stream_pairs(stream(1,2,3,4,5)),10);
//Because streampairs2 is lazy, the nullary function at the end is not eval'ed.
//so streampairs2 will not infinitely call itself until prompted to.

//Inappropriate because only pairs with the first element are generated.
//It should generate: sn with second element at tail, then third element at tail
//, so on. Desire: 1,2, 1,3 2,3 1,4 2,4 3,4 1,5 2,5 ...
function shorten_stream(s, k) {
    return k === 0 || is_null(s)
           ? list()
           : pair(head(s), () => shorten_stream(tail(s)(), k - 1));
}


function last_element_of(s) {
    return is_null(s)
           ? null
           : is_null(stream_tail(s))
           ? head(s)
           : last_element_of(stream_tail(s));
}

function stream_pairs3(s, i) {
    return is_null(s)
           ? null
           : stream_append_pickle(
                stream_map(
                    sn => pair(sn, last_element_of(shorten_stream(stream_tail(s), i))),
                    shorten_stream(s, i)),
                () => is_null(stream_tail(s))
                      ? null
                      : stream_pairs3(s, i + 1));
}

function interleave_stream_append(s1, s2) {
    return is_null(s1)
           ? s2
           : pair(head(s1), () => interleave_stream_append(s2,
                                    stream_tail(s1)));
}

function stream_pairs3_alt(s) {
    return (is_null(s) || is_null(stream_tail(s)))
            ? null
            : pair(pair(head(s), head(stream_tail(s))),
                    () => interleave_stream_append(
                                stream_map(x => pair(head(s), x),
                                stream_tail(stream_tail(s))),
                                stream_pairs3_alt(stream_tail(s))));
}
eval_stream(stream_pairs3(integers_from(1), 1), 20);
//eval_stream(stream_pairs3_alt(integers_from(1)), 20);