function every_second(items) {
    return is_null(items) || is_null(tail(items))
           ? null
           : pair(list_ref(items, 1),
                  every_second(tail(tail(items)))
                  );
}

every_second(list("a", "x", "b", "y", "c", "z", "d"));

function every_even(items) {
    return is_null(items)
           ? null
           : is_null(tail(items))
           ? pair(list_ref(items, 0),
                  null)
           : pair(list_ref(items, 0),
                  every_even(tail(tail(items)))
                  );
}

every_even(list("a", "x", "b", "y", "c", "z", "d"));

function sums(items) {
    function sum_list(lst) {
        return is_null(lst)
               ? 0
               : head(lst) + sum_list(tail(lst));
    }
    
    return list(sum_list(every_even(items)),
                sum_list(every_second(items)));
}

sums(list(1, 2, 3, 4, 5));