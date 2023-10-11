
const increment_repeater =
    repeater => (f => x => f(repeater(f)(x)));    // complete the
                        // lambda expression

const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);

const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT"
                        // three times in orange
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T"
                        // four times in orange
                        // (the REPL will display
                        // "A L E R T"a fifth time
                        // [in white] as the value
                        // returned by bigwarn)
                        
/*
Let the base function be called base, where base equals arg => base(arg).
Let me try to figure out how the repeater applies base twice by the stepper

Let base be fed into repeater. 
For sanity's sake, let it be the twice repeater.

By the substitution model, it will run as:
(f => x => f(f(x)))(arg => base(arg))
((arg => base(arg)) => x => f(f(x))) (input of base definition into repeater)
x => ((arg => base(arg))(arg => base(arg))((x))) (substitution of base definition into repeater function)
x => ((arg => base(arg))(x => base(arg))) (input of x into 1st base application)
x => (arg => base(arg)(base(x)) (substitution of x into 1st base application) 
x => (base(x) => base(arg)) (input of base(x) into 2nd base application)
x => base(base(x)) (substitution of base(x) into 2nd base application)

Nice! To implement the increment_repeater, let's think about inputting
the twice repeater and getting back the thrice repeater.

Input : repeater ( which equals f => x => f(f(x)) )
Output : f => x => f(f(f(x)))

The inner f(f(x)) expression should be attainable from the original
repeater function. Lets try to whack it out of the repeater function.

(f => x => f(f(x)))(base) will give (x => base(base(x))).

I directly want the double application result. Simply throw an input in!
Therefore, (f => x => f(f(x)))(base)(arg) 
evaluates to (x => base(base(x)))(arg)
evaluates to base(base(arg)).

Thus, i can rephrase output as f => x => f(repeater(f)(x)).

Thus, increment_repeater must be repeater => (f => x => f(repeater(f)(x))).
*/

