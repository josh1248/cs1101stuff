function bubblesort_list(L) {
    if (is_null(L) || is_null(tail(L))) {
        return L;
    }
    
    let list_end = L;
    //initialisation for list end to be at last element
    while (!is_null(list_end)) {
        list_end = tail(list_end);
    }
    
    let prev_index = L;
    let next_index = tail(L);
    while (list_end !== L) {
        while (next_index !== list_end) {
            if (head(prev_index) > head(next_index)) {
                const temp = head(next_index);
                set_head(next_index, head(prev_index));
                set_head(prev_index, temp);
            }
            
            //move pair of iterators forward in the list
            prev_index = next_index;
            next_index = tail(next_index);
        }
        //advance list end forward
        list_end = prev_index;
        
        //reset pair of iterators to start of list
        prev_index = L;
        next_index = tail(L);
    }
}

const LL = list(3, 5, 2, 4, 1); 
bubblesort_list(LL);
LL;