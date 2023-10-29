const my_ston = list( list(1, 2, list(3, 4),5), 6, list(7), 8, 9,
list( list(10), 11, list(12, 13, list(14, 15)) ) );
function smallest(ston) {
return is_pair(head(ston)) ? smallest(head(ston)) : head(ston);
}
smallest(my_ston); // returns 1

function largest(ston) {
return !is_null(tail(ston)) ? largest(tail(ston))
: is_pair(head(ston)) ? largest(head(ston)) : head(ston);
}
largest(my_ston);

function find(ston, x) {
if (is_null(ston)) {
return false;
} else if (is_null(tail(ston))) {
return is_pair(head(ston)) ? find(head(ston), x) : x === head(ston);
} else {
return x > largest(head(ston))
? find(tail(ston), x)
: find(head(ston), x);
}
}
find(my_ston, 12); // returns true
//find(my_ston, 3.5); // returns false