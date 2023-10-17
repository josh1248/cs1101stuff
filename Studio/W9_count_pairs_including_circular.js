function count_pairs(xs) {
    //once we visit a pair, note their "location" in this array
    let pairs_encountered_locations = [];
    let pairs_encountered_count = 0;
    
    //returns boolean value if pair has been seen before.
    //if not seen before, conveniently adds pair location into array.
    function seen_before(pair) {
        for (let i = 0; i < pairs_encountered_count; i = i + 1){
            if (pair === pairs_encountered_locations[i]) {
                return true;
            }
        }
        //to reach this point, pair must not equal any previous location
        pairs_encountered_locations[pairs_encountered_count] = pair;
        pairs_encountered_count = pairs_encountered_count + 1;
        return false;
    }

    //function that generates pairs encountered array
    function generate_pair_locations(L) {
        if (!is_pair(L) || seen_before(L)) {
            //nothing
        } else {
            //pair has not been seen before.
            //seen_before generates pair into locations array.
            generate_pair_locations(head(L));
            generate_pair_locations(tail(L));
        }
    }
    
    generate_pair_locations(xs);
    return pairs_encountered_count;
}
const test = list(1,2,3);
set_head(test,tail(test));
count_pairs(test);