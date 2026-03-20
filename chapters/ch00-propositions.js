window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Propositions & Connectives',
    subtitle: 'The building blocks of mathematical reasoning',
    sections: [
        // ================================================================
        // SECTION 1: Why Logic?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Logic?',
            content: `
<h2>Why Logic?</h2>

<div class="env-block intuition">
    <div class="env-title">A Puzzle to Start</div>
    <div class="env-body">
        <p>Consider the following argument:</p>
        <ol>
            <li>All humans are mortal.</li>
            <li>Socrates is a human.</li>
            <li>Therefore, Socrates is mortal.</li>
        </ol>
        <p>Most people agree this argument is valid. But <em>why</em> is it valid? What makes one chain of reasoning airtight and another fallacious? To answer this, we need a precise language for reasoning itself. That language is <strong>logic</strong>.</p>
    </div>
</div>

<p>Mathematics is built on proofs, and proofs are built on logic. Every theorem you have encountered, from the irrationality of \\(\\sqrt{2}\\) to the infinitude of primes, ultimately rests on logical deductions from axioms. Before we can write proofs, we need to understand the atoms from which they are constructed: <strong>propositions</strong> (statements that are true or false) and <strong>connectives</strong> (the logical glue that combines them).</p>

<p>This chapter develops the formal language of <em>propositional logic</em>. We will learn to:</p>
<ul>
    <li>Identify which sentences qualify as propositions.</li>
    <li>Combine propositions using AND, OR, NOT, and implication.</li>
    <li>Analyze compound statements using truth tables.</li>
    <li>Recognize logically equivalent statements and simplify them using identities like De Morgan's laws.</li>
</ul>

<p>These tools are not merely abstract. Every "if...then" statement in a textbook, every proof by contradiction, every case analysis you will encounter in this course relies on propositional logic. Mastering it now will make every subsequent chapter more accessible.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Formal logic traces back to Aristotle's <em>Organon</em> (4th century BCE), which systematized syllogistic reasoning. The modern symbolic approach was pioneered by George Boole in <em>The Laws of Thought</em> (1854) and later refined by Gottlob Frege, Bertrand Russell, and Alfred North Whitehead. The propositional calculus we study here is the simplest layer of mathematical logic, yet it underpins digital circuit design, database queries, and automated theorem proving.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-proposition-sorter',
                    title: 'Proposition Sorter',
                    description: 'Classify each statement as a proposition (has a definite truth value) or not a proposition (question, command, opinion, or paradox). Click to sort each card.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var statements = [
                            { text: '2 + 3 = 5', isProp: true, reason: 'True statement about arithmetic' },
                            { text: 'Close the door.', isProp: false, reason: 'Command, not declarative' },
                            { text: 'Is it raining?', isProp: false, reason: 'Question, not declarative' },
                            { text: 'Pi is irrational.', isProp: true, reason: 'True mathematical claim' },
                            { text: 'This sentence is false.', isProp: false, reason: 'Paradox: no consistent truth value' },
                            { text: 'x + 1 = 3', isProp: false, reason: 'Depends on x; not a proposition until x is fixed' },
                            { text: 'Every even number > 2 is the sum of two primes.', isProp: true, reason: 'Goldbach conjecture: true or false (we just do not know which)' },
                            { text: 'Blue is the best color.', isProp: false, reason: 'Subjective opinion, not objectively true/false' },
                            { text: '1 > 5', isProp: true, reason: 'False, but still a proposition' },
                            { text: 'There exist infinitely many primes.', isProp: true, reason: 'True (Euclid proved it)' }
                        ];

                        var currentIdx = 0;
                        var results = [];
                        var showResult = false;
                        var lastAnswer = null;

                        function shuffleArray(arr) {
                            for (var i = arr.length - 1; i > 0; i--) {
                                var j = Math.floor(Math.random() * (i + 1));
                                var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
                            }
                        }
                        shuffleArray(statements);

                        var propBtn = VizEngine.createButton(controls, 'Proposition', function() {
                            if (currentIdx >= statements.length || showResult) return;
                            checkAnswer(true);
                        });
                        var notPropBtn = VizEngine.createButton(controls, 'Not a Proposition', function() {
                            if (currentIdx >= statements.length || showResult) return;
                            checkAnswer(false);
                        });
                        VizEngine.createButton(controls, 'Next', function() {
                            if (!showResult) return;
                            showResult = false;
                            currentIdx++;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Restart', function() {
                            shuffleArray(statements);
                            currentIdx = 0;
                            results = [];
                            showResult = false;
                            lastAnswer = null;
                            draw();
                        });

                        function checkAnswer(answer) {
                            var correct = (answer === statements[currentIdx].isProp);
                            results.push(correct);
                            lastAnswer = answer;
                            showResult = true;
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Proposition or Not?', viz.width / 2, 24, viz.colors.white, 16);

                            var score = results.filter(function(r) { return r; }).length;
                            viz.screenText('Score: ' + score + '/' + results.length, viz.width - 60, 24, viz.colors.teal, 12);

                            if (currentIdx >= statements.length) {
                                viz.screenText('All done!', viz.width / 2, 160, viz.colors.white, 20);
                                viz.screenText('Final score: ' + score + ' / ' + statements.length, viz.width / 2, 200, viz.colors.teal, 16);
                                return;
                            }

                            var st = statements[currentIdx];

                            // Card
                            var cardX = 40, cardY = 60, cardW = viz.width - 80, cardH = 80;
                            ctx.fillStyle = '#1a1a40';
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.roundRect(cardX, cardY, cardW, cardH, 8);
                            ctx.fill();
                            ctx.stroke();

                            // Statement text (with word wrapping)
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('"' + st.text + '"', viz.width / 2, cardY + cardH / 2);

                            // Progress
                            viz.screenText((currentIdx + 1) + ' / ' + statements.length, viz.width / 2, cardY + cardH + 20, viz.colors.text, 11);

                            if (showResult) {
                                var correct = lastAnswer === st.isProp;
                                var resultY = 200;
                                var color = correct ? viz.colors.green : viz.colors.red;
                                viz.screenText(correct ? 'Correct!' : 'Incorrect', viz.width / 2, resultY, color, 18);

                                var answerLabel = st.isProp ? 'PROPOSITION' : 'NOT A PROPOSITION';
                                viz.screenText('Answer: ' + answerLabel, viz.width / 2, resultY + 30, viz.colors.white, 13);
                                viz.screenText(st.reason, viz.width / 2, resultY + 55, viz.colors.text, 12);
                            }

                            // Show sorted results below
                            var histY = 310;
                            var propCol = 80;
                            var notPropCol = viz.width / 2 + 40;
                            viz.screenText('Propositions', propCol + 60, histY, viz.colors.teal, 11);
                            viz.screenText('Not Propositions', notPropCol + 60, histY, viz.colors.orange, 11);

                            var propCount = 0, notPropCount = 0;
                            for (var i = 0; i < currentIdx + (showResult ? 1 : 0); i++) {
                                if (i >= statements.length) break;
                                var s = statements[i];
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                if (s.isProp) {
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.fillText(s.text, propCol, histY + 18 + propCount * 14);
                                    propCount++;
                                } else {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.fillText(s.text, notPropCol, histY + 18 + notPropCount * 14);
                                    notPropCount++;
                                }
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Which of the following are propositions? (a) \\(3 + 7 = 10\\). (b) \\(x^2 \\geq 0\\). (c) "Do your homework." (d) "Every continuous function is differentiable."',
                    hint: 'A proposition must be a declarative sentence with a definite truth value. Watch out for free variables and commands.',
                    solution: '(a) Proposition (true). (b) Not a proposition as stated, because \\(x\\) is a free variable; however, "for all real \\(x\\), \\(x^2 \\geq 0\\)" is a proposition (true). (c) Not a proposition (command). (d) Proposition (false: \\(|x|\\) is continuous but not differentiable at 0).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Propositions
        // ================================================================
        {
            id: 'sec-propositions',
            title: 'Propositions',
            content: `
<h2>Propositions</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Proposition)</div>
    <div class="env-body">
        <p>A <strong>proposition</strong> (or <strong>statement</strong>) is a declarative sentence that is either <strong>true</strong> (T) or <strong>false</strong> (F), but not both.</p>
    </div>
</div>

<p>We use lowercase letters \\(p, q, r, s, \\ldots\\) to denote propositions. The truth value of a proposition \\(p\\) is the element of \\(\\{T, F\\}\\) that \\(p\\) evaluates to.</p>

<div class="env-block example">
    <div class="env-title">Example: Propositions and Non-Propositions</div>
    <div class="env-body">
        <p><strong>Propositions:</strong></p>
        <ul>
            <li>\\(p\\): "\\(2 + 2 = 4\\)." (True)</li>
            <li>\\(q\\): "\\(\\sqrt{2}\\) is rational." (False)</li>
            <li>\\(r\\): "There are infinitely many twin primes." (Unknown, but still a proposition: it has a definite truth value, we simply do not know it yet.)</li>
        </ul>
        <p><strong>Not propositions:</strong></p>
        <ul>
            <li>"What time is it?" (Question)</li>
            <li>"Let \\(n\\) be a positive integer." (Instruction/convention)</li>
            <li>"\\(x > 3\\)." (Predicate: its truth depends on \\(x\\); it becomes a proposition once \\(x\\) is specified.)</li>
        </ul>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Propositions vs. Predicates</div>
    <div class="env-body">
        <p>A sentence like "\\(n\\) is even" is not a proposition because it contains a <em>free variable</em>. It is a <strong>predicate</strong>, a function from a domain to \\(\\{T, F\\}\\). We write \\(P(n)\\) to mean "\\(n\\) is even." Once \\(n\\) is bound (e.g., \\(n = 4\\)), \\(P(4)\\) becomes a proposition (true). Predicates and quantifiers ("for all," "there exists") are the subject of Chapter 1.</p>
    </div>
</div>

<h3>Compound Propositions</h3>

<p>Simple propositions can be combined into <strong>compound propositions</strong> using logical connectives. For instance, if \\(p\\) is "It is raining" and \\(q\\) is "I carry an umbrella," then "It is raining <em>and</em> I carry an umbrella" is the compound proposition \\(p \\wedge q\\).</p>

<p>The next section introduces the connectives that build compound propositions from simple ones.</p>

<div class="env-block warning">
    <div class="env-title">The Law of Excluded Middle</div>
    <div class="env-body">
        <p>Throughout this course, we adopt <strong>classical logic</strong>, which assumes every proposition is either true or false. There is no "middle ground." This principle, called the <em>law of excluded middle</em>, is rejected in some alternative logics (notably intuitionistic logic), but it is standard in mainstream mathematics.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Classify each sentence as a proposition or not, and if it is a proposition, determine its truth value: (a) "\\(7\\) is prime." (b) "Every square is a rectangle." (c) "Solve for \\(x\\)." (d) "\\(0.999\\ldots = 1\\)." (e) "This sentence is false."',
                    hint: 'Remember: a proposition must be a declarative sentence with a definite truth value. Commands and questions are not propositions. For (e), try assuming it is true and see what happens.',
                    solution: '(a) Proposition, true. (b) Proposition, true (a square satisfies the definition of a rectangle). (c) Not a proposition (command). (d) Proposition, true (this is a well-known fact about real number representations). (e) Not a proposition: if it is true then it asserts itself to be false, a contradiction; if false, it asserts itself to be false, which would make it true. No consistent truth value exists (the <em>liar paradox</em>).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Logical Connectives (AND, OR, NOT)
        // ================================================================
        {
            id: 'sec-connectives',
            title: 'Logical Connectives',
            content: `
<h2>Logical Connectives</h2>

<p>Connectives are the operations of propositional logic. They take one or two propositions as input and produce a new proposition whose truth value is determined entirely by the truth values of the inputs.</p>

<h3>Negation (NOT)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Negation)</div>
    <div class="env-body">
        <p>The <strong>negation</strong> of a proposition \\(p\\), written \\(\\neg p\\) (read "not \\(p\\)"), is the proposition that is true when \\(p\\) is false and false when \\(p\\) is true.</p>
        <table style="width:auto; margin:12px auto; border-collapse:collapse; font-size:0.9em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:6px 20px;">\\(p\\)</th>
                <th style="padding:6px 20px;">\\(\\neg p\\)</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 20px; text-align:center;">T</td>
                <td style="padding:6px 20px; text-align:center;">F</td>
            </tr>
            <tr>
                <td style="padding:6px 20px; text-align:center;">F</td>
                <td style="padding:6px 20px; text-align:center;">T</td>
            </tr>
        </table>
    </div>
</div>

<h3>Conjunction (AND)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Conjunction)</div>
    <div class="env-body">
        <p>The <strong>conjunction</strong> of \\(p\\) and \\(q\\), written \\(p \\wedge q\\) (read "\\(p\\) and \\(q\\)"), is true if and only if <em>both</em> \\(p\\) and \\(q\\) are true.</p>
        <table style="width:auto; margin:12px auto; border-collapse:collapse; font-size:0.9em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:6px 16px;">\\(p\\)</th>
                <th style="padding:6px 16px;">\\(q\\)</th>
                <th style="padding:6px 16px;">\\(p \\wedge q\\)</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td></tr>
        </table>
    </div>
</div>

<h3>Disjunction (OR)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Disjunction)</div>
    <div class="env-body">
        <p>The <strong>disjunction</strong> of \\(p\\) and \\(q\\), written \\(p \\vee q\\) (read "\\(p\\) or \\(q\\)"), is true if and only if <em>at least one</em> of \\(p\\) or \\(q\\) is true.</p>
        <table style="width:auto; margin:12px auto; border-collapse:collapse; font-size:0.9em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:6px 16px;">\\(p\\)</th>
                <th style="padding:6px 16px;">\\(q\\)</th>
                <th style="padding:6px 16px;">\\(p \\vee q\\)</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td></tr>
        </table>
    </div>
</div>

<div class="env-block warning">
    <div class="env-title">Inclusive vs. Exclusive OR</div>
    <div class="env-body">
        <p>In everyday English, "or" is often <em>exclusive</em>: "soup or salad" usually means one but not both. In mathematics, \\(\\vee\\) is always <strong>inclusive</strong>: \\(p \\vee q\\) is true when both are true. The exclusive or (XOR), written \\(p \\oplus q\\), is a separate connective defined as \\((p \\vee q) \\wedge \\neg(p \\wedge q)\\).</p>
    </div>
</div>

<h3>Conditional (IF...THEN)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Conditional)</div>
    <div class="env-body">
        <p>The <strong>conditional</strong> (or <strong>implication</strong>) \\(p \\to q\\) (read "if \\(p\\) then \\(q\\)") is false only when \\(p\\) is true and \\(q\\) is false. In all other cases it is true.</p>
        <table style="width:auto; margin:12px auto; border-collapse:collapse; font-size:0.9em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:6px 16px;">\\(p\\)</th>
                <th style="padding:6px 16px;">\\(q\\)</th>
                <th style="padding:6px 16px;">\\(p \\to q\\)</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td></tr>
        </table>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Why Is \\(F \\to T\\) True?</div>
    <div class="env-body">
        <p>The rows where \\(p\\) is false often confuse beginners. Think of it this way: "If it rains, I will carry an umbrella" is a promise. The promise is broken only if it rains and you do <em>not</em> carry an umbrella (T \\(\\to\\) F). If it does not rain, the promise is <em>vacuously</em> satisfied regardless of umbrella status. A conditional with a false hypothesis makes no testable claim, so it is true by convention.</p>
    </div>
</div>

<h3>Biconditional (IF AND ONLY IF)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Biconditional)</div>
    <div class="env-body">
        <p>The <strong>biconditional</strong> \\(p \\leftrightarrow q\\) (read "\\(p\\) if and only if \\(q\\)") is true when \\(p\\) and \\(q\\) have the <em>same</em> truth value.</p>
        <table style="width:auto; margin:12px auto; border-collapse:collapse; font-size:0.9em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:6px 16px;">\\(p\\)</th>
                <th style="padding:6px 16px;">\\(q\\)</th>
                <th style="padding:6px 16px;">\\(p \\leftrightarrow q\\)</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td></tr>
            <tr style="border-bottom:1px solid var(--border-subtle);"><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td></tr>
        </table>
        <p>Equivalently, \\(p \\leftrightarrow q \\equiv (p \\to q) \\wedge (q \\to p)\\).</p>
    </div>
</div>

<h3>Precedence of Connectives</h3>

<p>To avoid excessive parentheses, we adopt the following precedence (highest to lowest):</p>
<ol>
    <li>\\(\\neg\\) (negation)</li>
    <li>\\(\\wedge\\) (conjunction)</li>
    <li>\\(\\vee\\) (disjunction)</li>
    <li>\\(\\to\\) (conditional)</li>
    <li>\\(\\leftrightarrow\\) (biconditional)</li>
</ol>
<p>So \\(\\neg p \\wedge q \\to r\\) means \\(((\\neg p) \\wedge q) \\to r\\), not \\(\\neg(p \\wedge (q \\to r))\\).</p>

<div class="viz-placeholder" data-viz="viz-connectives-demo"></div>
`,
            visualizations: [
                {
                    id: 'viz-connectives-demo',
                    title: 'Connectives Demo: Toggle Switches',
                    description: 'Set the truth values of p and q using toggle switches and see the result of every connective in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var pVal = true;
                        var qVal = true;

                        VizEngine.createButton(controls, 'Toggle p', function() {
                            pVal = !pVal;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Toggle q', function() {
                            qVal = !qVal;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Logical Connectives', viz.width / 2, 24, viz.colors.white, 16);

                            // Draw toggle switches
                            var switchY = 70;
                            drawSwitch(ctx, 160, switchY, 'p', pVal, viz);
                            drawSwitch(ctx, 400, switchY, 'q', qVal, viz);

                            // Compute all connectives
                            var connectives = [
                                { symbol: '\u00ACp', name: 'NOT p', value: !pVal },
                                { symbol: '\u00ACq', name: 'NOT q', value: !qVal },
                                { symbol: 'p \u2227 q', name: 'AND', value: pVal && qVal },
                                { symbol: 'p \u2228 q', name: 'OR', value: pVal || qVal },
                                { symbol: 'p \u2295 q', name: 'XOR', value: pVal !== qVal },
                                { symbol: 'p \u2192 q', name: 'IF...THEN', value: !pVal || qVal },
                                { symbol: 'p \u2194 q', name: 'IFF', value: pVal === qVal }
                            ];

                            var startY = 130;
                            var rowH = 34;
                            var colSym = 120;
                            var colName = 280;
                            var colVal = 440;

                            // Header
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Formula', colSym, startY - 10);
                            ctx.fillText('Name', colName, startY - 10);
                            ctx.fillText('Value', colVal, startY - 10);

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(60, startY);
                            ctx.lineTo(viz.width - 60, startY);
                            ctx.stroke();

                            for (var i = 0; i < connectives.length; i++) {
                                var c = connectives[i];
                                var y = startY + 10 + i * rowH + rowH / 2;

                                // Alternating row backgrounds
                                if (i % 2 === 0) {
                                    ctx.fillStyle = '#1a1a40';
                                    ctx.fillRect(60, y - rowH / 2, viz.width - 120, rowH);
                                }

                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText(c.symbol, colSym, y);

                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(c.name, colName, y);

                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillStyle = c.value ? viz.colors.green : viz.colors.red;
                                ctx.fillText(c.value ? 'TRUE' : 'FALSE', colVal, y);
                            }
                        }

                        function drawSwitch(ctx, cx, cy, label, val, viz) {
                            // Switch background
                            var sw = 50, sh = 26, sr = 13;
                            ctx.fillStyle = val ? viz.colors.green + 'aa' : viz.colors.red + '66';
                            ctx.beginPath();
                            ctx.roundRect(cx - sw / 2, cy - sh / 2, sw, sh, sr);
                            ctx.fill();

                            // Knob
                            var knobX = val ? cx + sw / 2 - sr - 2 : cx - sw / 2 + sr + 2;
                            ctx.fillStyle = '#ffffff';
                            ctx.beginPath();
                            ctx.arc(knobX, cy, 9, 0, Math.PI * 2);
                            ctx.fill();

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(label + ' = ' + (val ? 'T' : 'F'), cx, cy - 24);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(p\\) be "It is sunny" and \\(q\\) be "I go for a walk." Express the following in symbols: (a) "It is not sunny." (b) "It is sunny and I go for a walk." (c) "If it is sunny, then I go for a walk." (d) "I go for a walk if and only if it is sunny."',
                    hint: 'Match each English phrase to its connective: "not" = \\(\\neg\\), "and" = \\(\\wedge\\), "if...then" = \\(\\to\\), "if and only if" = \\(\\leftrightarrow\\).',
                    solution: '(a) \\(\\neg p\\). (b) \\(p \\wedge q\\). (c) \\(p \\to q\\). (d) \\(q \\leftrightarrow p\\) (equivalently \\(p \\leftrightarrow q\\)).'
                },
                {
                    question: 'Determine the truth value of each compound proposition, given \\(p\\) is true and \\(q\\) is false: (a) \\(p \\vee q\\). (b) \\(p \\wedge \\neg q\\). (c) \\(p \\to q\\). (d) \\(\\neg p \\to q\\).',
                    hint: 'Substitute T for \\(p\\) and F for \\(q\\), then evaluate using the truth table definitions.',
                    solution: '(a) \\(T \\vee F = T\\). (b) \\(T \\wedge \\neg F = T \\wedge T = T\\). (c) \\(T \\to F = F\\). (d) \\(\\neg T \\to F = F \\to F = T\\) (a conditional with false hypothesis is true).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Truth Tables
        // ================================================================
        {
            id: 'sec-truth-tables',
            title: 'Truth Tables',
            content: `
<h2>Truth Tables</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Truth Table)</div>
    <div class="env-body">
        <p>A <strong>truth table</strong> for a compound proposition lists every possible combination of truth values for its component variables and the resulting truth value of the compound proposition. If there are \\(n\\) propositional variables, the table has \\(2^n\\) rows.</p>
    </div>
</div>

<p>Truth tables are the brute-force method for analyzing propositional logic: they are always correct and always terminate, but grow exponentially. For \\(n\\) variables, you must fill \\(2^n\\) rows. This is manageable for \\(n \\leq 4\\) or so; for larger \\(n\\), algebraic simplification or logical equivalences become essential.</p>

<div class="env-block example">
    <div class="env-title">Example: Truth Table for \\(p \\to (q \\vee r)\\)</div>
    <div class="env-body">
        <p>With 3 variables, we need \\(2^3 = 8\\) rows:</p>
        <table style="width:auto; margin:12px auto; border-collapse:collapse; font-size:0.85em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:4px 10px;">\\(p\\)</th><th style="padding:4px 10px;">\\(q\\)</th><th style="padding:4px 10px;">\\(r\\)</th>
                <th style="padding:4px 10px;">\\(q \\vee r\\)</th><th style="padding:4px 10px;">\\(p \\to (q \\vee r)\\)</th>
            </tr>
            <tr><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td></tr>
        </table>
        <p>The only row where \\(p \\to (q \\vee r)\\) is false is when \\(p\\) is true but both \\(q\\) and \\(r\\) are false.</p>
    </div>
</div>

<h3>Tautologies, Contradictions, and Contingencies</h3>

<div class="env-block definition">
    <div class="env-title">Definition</div>
    <div class="env-body">
        <p>A compound proposition is a:</p>
        <ul>
            <li><strong>Tautology</strong> if it is true in every row of its truth table. We write \\(\\top\\) for a generic tautology.</li>
            <li><strong>Contradiction</strong> if it is false in every row. We write \\(\\bot\\) for a generic contradiction.</li>
            <li><strong>Contingency</strong> if it is neither a tautology nor a contradiction (i.e., true in some rows and false in others).</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <ul>
            <li>\\(p \\vee \\neg p\\) is a tautology (law of excluded middle).</li>
            <li>\\(p \\wedge \\neg p\\) is a contradiction.</li>
            <li>\\(p \\to q\\) is a contingency.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-truth-table-builder"></div>
`,
            visualizations: [
                {
                    id: 'viz-truth-table-builder',
                    title: 'Interactive Truth Table Builder',
                    description: 'Enter a logical formula using p, q, r and connectives (& for AND, | for OR, ! for NOT, > for IMPLIES, = for IFF). The truth table is generated automatically. Try "!(p & q)" to see De Morgan in action.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var formula = '!(p & q)';

                        // Input field
                        var inputDiv = document.createElement('div');
                        inputDiv.style.cssText = 'display:flex;gap:8px;align-items:center;margin-bottom:4px;';
                        var label = document.createElement('span');
                        label.textContent = 'Formula: ';
                        label.style.cssText = 'color:#c9d1d9;font-size:0.85rem;';
                        var input = document.createElement('input');
                        input.type = 'text';
                        input.value = formula;
                        input.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#0d1117;color:#c9d1d9;font-family:monospace;font-size:0.85rem;flex:1;';
                        inputDiv.appendChild(label);
                        inputDiv.appendChild(input);
                        controls.appendChild(inputDiv);

                        var helpText = document.createElement('div');
                        helpText.style.cssText = 'color:#8b949e;font-size:0.72rem;margin-bottom:4px;';
                        helpText.textContent = 'Variables: p, q, r  |  Connectives: ! (NOT), & (AND), | (OR), > (IMPLIES), = (IFF)  |  Parentheses: ( )';
                        controls.appendChild(helpText);

                        input.addEventListener('input', function() {
                            formula = input.value;
                            draw();
                        });

                        // Simple formula parser
                        function tokenize(s) {
                            var tokens = [];
                            var i = 0;
                            while (i < s.length) {
                                var ch = s[i];
                                if (ch === ' ') { i++; continue; }
                                if ('pqr'.indexOf(ch) >= 0) { tokens.push({ type: 'var', value: ch }); i++; }
                                else if (ch === '!') { tokens.push({ type: 'not' }); i++; }
                                else if (ch === '&') { tokens.push({ type: 'and' }); i++; }
                                else if (ch === '|') { tokens.push({ type: 'or' }); i++; }
                                else if (ch === '>') { tokens.push({ type: 'implies' }); i++; }
                                else if (ch === '=') { tokens.push({ type: 'iff' }); i++; }
                                else if (ch === '(') { tokens.push({ type: 'lparen' }); i++; }
                                else if (ch === ')') { tokens.push({ type: 'rparen' }); i++; }
                                else if (ch === 'T') { tokens.push({ type: 'const', value: true }); i++; }
                                else if (ch === 'F') { tokens.push({ type: 'const', value: false }); i++; }
                                else { i++; }
                            }
                            return tokens;
                        }

                        // Recursive descent parser
                        function parse(tokens) {
                            var pos = 0;

                            function peek() { return pos < tokens.length ? tokens[pos] : null; }
                            function advance() { return tokens[pos++]; }

                            function parseIff() {
                                var left = parseImplies();
                                while (peek() && peek().type === 'iff') {
                                    advance();
                                    var right = parseImplies();
                                    left = { type: 'iff', left: left, right: right };
                                }
                                return left;
                            }

                            function parseImplies() {
                                var left = parseOr();
                                while (peek() && peek().type === 'implies') {
                                    advance();
                                    var right = parseOr();
                                    left = { type: 'implies', left: left, right: right };
                                }
                                return left;
                            }

                            function parseOr() {
                                var left = parseAnd();
                                while (peek() && peek().type === 'or') {
                                    advance();
                                    var right = parseAnd();
                                    left = { type: 'or', left: left, right: right };
                                }
                                return left;
                            }

                            function parseAnd() {
                                var left = parseNot();
                                while (peek() && peek().type === 'and') {
                                    advance();
                                    var right = parseNot();
                                    left = { type: 'and', left: left, right: right };
                                }
                                return left;
                            }

                            function parseNot() {
                                if (peek() && peek().type === 'not') {
                                    advance();
                                    var operand = parseNot();
                                    return { type: 'not', operand: operand };
                                }
                                return parseAtom();
                            }

                            function parseAtom() {
                                var t = peek();
                                if (!t) return null;
                                if (t.type === 'var') { advance(); return { type: 'var', name: t.value }; }
                                if (t.type === 'const') { advance(); return { type: 'const', value: t.value }; }
                                if (t.type === 'lparen') {
                                    advance();
                                    var expr = parseIff();
                                    if (peek() && peek().type === 'rparen') advance();
                                    return expr;
                                }
                                advance();
                                return null;
                            }

                            return parseIff();
                        }

                        function evaluate(ast, env) {
                            if (!ast) return false;
                            if (ast.type === 'var') return !!env[ast.name];
                            if (ast.type === 'const') return ast.value;
                            if (ast.type === 'not') return !evaluate(ast.operand, env);
                            if (ast.type === 'and') return evaluate(ast.left, env) && evaluate(ast.right, env);
                            if (ast.type === 'or') return evaluate(ast.left, env) || evaluate(ast.right, env);
                            if (ast.type === 'implies') return !evaluate(ast.left, env) || evaluate(ast.right, env);
                            if (ast.type === 'iff') return evaluate(ast.left, env) === evaluate(ast.right, env);
                            return false;
                        }

                        function getVars(ast, vars) {
                            if (!ast) return;
                            if (ast.type === 'var') { if (vars.indexOf(ast.name) < 0) vars.push(ast.name); return; }
                            if (ast.operand) getVars(ast.operand, vars);
                            if (ast.left) getVars(ast.left, vars);
                            if (ast.right) getVars(ast.right, vars);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var tokens, ast;
                            try {
                                tokens = tokenize(formula);
                                ast = parse(tokens);
                            } catch (e) {
                                ast = null;
                            }

                            if (!ast) {
                                viz.screenText('Enter a valid formula above', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            var vars = [];
                            getVars(ast, vars);
                            vars.sort();
                            var nVars = vars.length;
                            var nRows = Math.pow(2, nVars);

                            if (nVars === 0 || nVars > 3) {
                                viz.screenText('Use 1-3 variables (p, q, r)', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            // Draw the truth table
                            var tableTop = 30;
                            var colW = Math.min(80, (viz.width - 40) / (nVars + 1));
                            var rowH = Math.min(32, (viz.height - tableTop - 60) / (nRows + 1));
                            var tableLeft = (viz.width - (nVars + 1) * colW) / 2;

                            // Header
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            for (var vi = 0; vi < nVars; vi++) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText(vars[vi], tableLeft + vi * colW + colW / 2, tableTop + rowH / 2);
                            }
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Result', tableLeft + nVars * colW + colW / 2, tableTop + rowH / 2);

                            // Header line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(tableLeft, tableTop + rowH);
                            ctx.lineTo(tableLeft + (nVars + 1) * colW, tableTop + rowH);
                            ctx.stroke();

                            var allTrue = true;
                            var allFalse = true;

                            for (var row = 0; row < nRows; row++) {
                                var env = {};
                                for (var vi2 = 0; vi2 < nVars; vi2++) {
                                    env[vars[vi2]] = !!(row >> (nVars - 1 - vi2) & 1);
                                }

                                var result = evaluate(ast, env);
                                if (result) allFalse = false;
                                else allTrue = false;

                                var yy = tableTop + (row + 1) * rowH + rowH / 2;

                                // Row background
                                if (row % 2 === 0) {
                                    ctx.fillStyle = '#1a1a40';
                                    ctx.fillRect(tableLeft, yy - rowH / 2, (nVars + 1) * colW, rowH);
                                }

                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var vi3 = 0; vi3 < nVars; vi3++) {
                                    var val = env[vars[vi3]];
                                    ctx.fillStyle = val ? viz.colors.green : viz.colors.red;
                                    ctx.fillText(val ? 'T' : 'F', tableLeft + vi3 * colW + colW / 2, yy);
                                }

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillStyle = result ? viz.colors.green : viz.colors.red;
                                ctx.fillText(result ? 'T' : 'F', tableLeft + nVars * colW + colW / 2, yy);
                            }

                            // Classification
                            var classY = tableTop + (nRows + 2) * rowH + 10;
                            var classification = allTrue ? 'TAUTOLOGY' : (allFalse ? 'CONTRADICTION' : 'CONTINGENCY');
                            var classColor = allTrue ? viz.colors.green : (allFalse ? viz.colors.red : viz.colors.orange);
                            viz.screenText(classification, viz.width / 2, classY, classColor, 16);

                            // Formula display
                            viz.screenText(formula, viz.width / 2, classY + 25, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Construct a truth table for \\((p \\to q) \\wedge (q \\to p)\\) and verify that it is equivalent to \\(p \\leftrightarrow q\\).',
                    hint: 'The truth table should have 4 rows (2 variables). Compare the result column with the biconditional table.',
                    solution: 'Row by row: (T,T): \\((T \\to T) \\wedge (T \\to T) = T \\wedge T = T\\). (T,F): \\((T \\to F) \\wedge (F \\to T) = F \\wedge T = F\\). (F,T): \\((F \\to T) \\wedge (T \\to F) = T \\wedge F = F\\). (F,F): \\((F \\to F) \\wedge (F \\to F) = T \\wedge T = T\\). This matches the truth table for \\(p \\leftrightarrow q\\) exactly, confirming the equivalence.'
                },
                {
                    question: 'Show that \\(p \\to q \\equiv \\neg p \\vee q\\) by constructing both truth tables.',
                    hint: 'Both formulas should produce the same column of truth values across all 4 rows.',
                    solution: '\\(p \\to q\\): (T,T)=T, (T,F)=F, (F,T)=T, (F,F)=T. \\(\\neg p \\vee q\\): (T,T): F\\(\\vee\\)T=T, (T,F): F\\(\\vee\\)F=F, (F,T): T\\(\\vee\\)T=T, (F,F): T\\(\\vee\\)F=T. Identical columns, so \\(p \\to q \\equiv \\neg p \\vee q\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Logical Equivalences
        // ================================================================
        {
            id: 'sec-equivalence',
            title: 'Logical Equivalences',
            content: `
<h2>Logical Equivalences</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Logical Equivalence)</div>
    <div class="env-body">
        <p>Two compound propositions \\(\\alpha\\) and \\(\\beta\\) are <strong>logically equivalent</strong>, written \\(\\alpha \\equiv \\beta\\), if they have the same truth value in every possible assignment of truth values to their variables. Equivalently, \\(\\alpha \\equiv \\beta\\) if and only if \\(\\alpha \\leftrightarrow \\beta\\) is a tautology.</p>
    </div>
</div>

<p>Logical equivalences let us replace complex formulas with simpler ones without changing their meaning. They are the "algebraic rules" of logic.</p>

<h3>Fundamental Equivalences</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.1 (Key Logical Equivalences)</div>
    <div class="env-body">
        <p>For propositions \\(p, q, r\\):</p>
        <table style="width:100%; border-collapse:collapse; margin:12px 0; font-size:0.88em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:6px 8px; text-align:left;">Name</th>
                <th style="padding:6px 8px; text-align:left;">Equivalence</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Double Negation</td>
                <td style="padding:6px 8px;">\\(\\neg(\\neg p) \\equiv p\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">De Morgan's Laws</td>
                <td style="padding:6px 8px;">\\(\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q\\)<br>\\(\\neg(p \\vee q) \\equiv \\neg p \\wedge \\neg q\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Commutativity</td>
                <td style="padding:6px 8px;">\\(p \\wedge q \\equiv q \\wedge p\\), \\(p \\vee q \\equiv q \\vee p\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Associativity</td>
                <td style="padding:6px 8px;">\\((p \\wedge q) \\wedge r \\equiv p \\wedge (q \\wedge r)\\), similarly for \\(\\vee\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Distributivity</td>
                <td style="padding:6px 8px;">\\(p \\wedge (q \\vee r) \\equiv (p \\wedge q) \\vee (p \\wedge r)\\)<br>\\(p \\vee (q \\wedge r) \\equiv (p \\vee q) \\wedge (p \\vee r)\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Idempotence</td>
                <td style="padding:6px 8px;">\\(p \\wedge p \\equiv p\\), \\(p \\vee p \\equiv p\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Identity</td>
                <td style="padding:6px 8px;">\\(p \\wedge \\top \\equiv p\\), \\(p \\vee \\bot \\equiv p\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Domination</td>
                <td style="padding:6px 8px;">\\(p \\vee \\top \\equiv \\top\\), \\(p \\wedge \\bot \\equiv \\bot\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Complement</td>
                <td style="padding:6px 8px;">\\(p \\vee \\neg p \\equiv \\top\\), \\(p \\wedge \\neg p \\equiv \\bot\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 8px;">Conditional</td>
                <td style="padding:6px 8px;">\\(p \\to q \\equiv \\neg p \\vee q\\)</td>
            </tr>
            <tr>
                <td style="padding:6px 8px;">Contrapositive</td>
                <td style="padding:6px 8px;">\\(p \\to q \\equiv \\neg q \\to \\neg p\\)</td>
            </tr>
        </table>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof of De Morgan's Law (\\(\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q\\))</div>
    <div class="env-body">
        <p>We verify by truth table:</p>
        <table style="width:auto; margin:12px auto; border-collapse:collapse; font-size:0.85em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:4px 10px;">\\(p\\)</th><th style="padding:4px 10px;">\\(q\\)</th>
                <th style="padding:4px 10px;">\\(p \\wedge q\\)</th>
                <th style="padding:4px 10px;">\\(\\neg(p \\wedge q)\\)</th>
                <th style="padding:4px 10px;">\\(\\neg p\\)</th>
                <th style="padding:4px 10px;">\\(\\neg q\\)</th>
                <th style="padding:4px 10px;">\\(\\neg p \\vee \\neg q\\)</th>
            </tr>
            <tr><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td></tr>
            <tr><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td></tr>
            <tr><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">F</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td><td style="text-align:center;">T</td></tr>
        </table>
        <p>Columns 4 and 7 are identical, so \\(\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block intuition">
    <div class="env-title">De Morgan in English</div>
    <div class="env-body">
        <p>"It is not the case that (I am tall <em>and</em> I am strong)" means "I am not tall <em>or</em> I am not strong."</p>
        <p>"It is not the case that (it is raining <em>or</em> it is snowing)" means "it is not raining <em>and</em> it is not snowing."</p>
        <p>Negation swaps AND/OR and negates each component. This is one of the most frequently used rules in proof writing.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Simplification Using Equivalences</div>
    <div class="env-body">
        <p>Simplify \\(\\neg(p \\to q)\\):</p>
        <p>\\(\\neg(p \\to q) \\equiv \\neg(\\neg p \\vee q) \\equiv p \\wedge \\neg q\\).</p>
        <p>This makes intuitive sense: the only way "if \\(p\\) then \\(q\\)" fails is when \\(p\\) is true and \\(q\\) is false.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-de-morgan"></div>
<div class="viz-placeholder" data-viz="viz-equivalence-chain"></div>
`,
            visualizations: [
                {
                    id: 'viz-de-morgan',
                    title: "De Morgan's Laws with Venn Diagrams",
                    description: 'Watch how negating an AND becomes an OR of negations (and vice versa). The shaded region represents the set of truth assignments making the formula true. Toggle between the two forms of De Morgan\'s law.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 60
                        });

                        var lawIdx = 0;
                        var animT = 0;
                        var animating = false;

                        VizEngine.createButton(controls, 'Law 1: \u00AC(p\u2227q) = \u00ACp\u2228\u00ACq', function() {
                            lawIdx = 0;
                            animT = 0;
                            animating = true;
                        });
                        VizEngine.createButton(controls, 'Law 2: \u00AC(p\u2228q) = \u00ACp\u2227\u00ACq', function() {
                            lawIdx = 1;
                            animT = 0;
                            animating = true;
                        });

                        var cxA = -1.2, cyA = 0, cxB = 1.2, cyB = 0, radius = 2;

                        function drawVenn(phase) {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Universe rectangle
                            var ux1 = -4.2, uy1 = -2.8, uw = 8.4, uh = 5.6;
                            var s1 = viz.toScreen(ux1, uy1 + uh);
                            var s2 = viz.toScreen(ux1 + uw, uy1);
                            ctx.fillStyle = '#0f0f2a';
                            ctx.fillRect(s1[0], s1[1], s2[0] - s1[0], s2[1] - s1[1]);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(s1[0], s1[1], s2[0] - s1[0], s2[1] - s1[1]);
                            viz.screenText('U', s1[0] + 14, s1[1] + 14, viz.colors.text, 12);

                            // Determine what to shade based on law and phase
                            // phase: 0 = left side, 1 = right side (of the equivalence)
                            // Law 0: NOT(p AND q) = NOT_p OR NOT_q
                            // Law 1: NOT(p OR q) = NOT_p AND NOT_q

                            // We shade using pixel scanning for precise set operations
                            var pw = viz.canvas.width / (window.devicePixelRatio || 1);
                            var ph = viz.canvas.height / (window.devicePixelRatio || 1);

                            for (var py = 0; py < ph; py += 3) {
                                for (var px = 0; px < pw; px += 3) {
                                    var mp = viz.toMath(px, py);
                                    var mx = mp[0], my = mp[1];

                                    // Check if in universe
                                    if (mx < ux1 || mx > ux1 + uw || my < uy1 || my > uy1 + uh) continue;

                                    var inA = ((mx - cxA) * (mx - cxA) + (my - cyA) * (my - cyA)) <= radius * radius;
                                    var inB = ((mx - cxB) * (mx - cxB) + (my - cyB) * (my - cyB)) <= radius * radius;

                                    var shouldShade = false;
                                    if (lawIdx === 0) {
                                        // NOT(p AND q): shade everything except intersection
                                        shouldShade = !(inA && inB);
                                    } else {
                                        // NOT(p OR q): shade outside both circles
                                        shouldShade = !inA && !inB;
                                    }

                                    if (shouldShade) {
                                        ctx.fillStyle = lawIdx === 0 ? viz.colors.teal + '44' : viz.colors.purple + '44';
                                        ctx.fillRect(px, py, 3, 3);
                                    }
                                }
                            }

                            // Draw circles
                            viz.drawCircle(cxA, cyA, radius, null, viz.colors.blue, 2);
                            viz.drawCircle(cxB, cyB, radius, null, viz.colors.orange, 2);

                            // Labels
                            viz.drawText('p', cxA - 1.2, cyA + 1.5, viz.colors.blue, 16);
                            viz.drawText('q', cxB + 1.2, cyB + 1.5, viz.colors.orange, 16);

                            // Formula
                            if (lawIdx === 0) {
                                viz.screenText('\u00AC(p \u2227 q)  \u2261  \u00ACp \u2228 \u00ACq', viz.width / 2, 24, viz.colors.white, 16);
                                viz.screenText('Shaded = NOT (p AND q) = everything except the intersection', viz.width / 2, viz.height - 20, viz.colors.text, 11);
                            } else {
                                viz.screenText('\u00AC(p \u2228 q)  \u2261  \u00ACp \u2227 \u00ACq', viz.width / 2, 24, viz.colors.white, 16);
                                viz.screenText('Shaded = NOT (p OR q) = outside both circles', viz.width / 2, viz.height - 20, viz.colors.text, 11);
                            }
                        }

                        viz.animate(function(t) {
                            if (animating) {
                                animT += 0.02;
                                if (animT >= 1) {
                                    animT = 1;
                                    animating = false;
                                }
                            }
                            drawVenn(animT);
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-equivalence-chain',
                    title: 'Equivalence Chain: Step-by-Step Simplification',
                    description: 'See how a complex formula is simplified step by step using logical equivalences. Each step shows which rule was applied.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var chains = [
                            {
                                title: 'Simplify \u00AC(p \u2192 q)',
                                steps: [
                                    { formula: '\u00AC(p \u2192 q)', rule: 'Start' },
                                    { formula: '\u00AC(\u00ACp \u2228 q)', rule: 'Conditional: p\u2192q \u2261 \u00ACp\u2228q' },
                                    { formula: 'p \u2227 \u00ACq', rule: "De Morgan's Law" }
                                ]
                            },
                            {
                                title: 'Simplify \u00AC(\u00ACp \u2227 (q \u2228 \u00ACq))',
                                steps: [
                                    { formula: '\u00AC(\u00ACp \u2227 (q \u2228 \u00ACq))', rule: 'Start' },
                                    { formula: '\u00AC(\u00ACp \u2227 \u22A4)', rule: 'Complement: q\u2228\u00ACq \u2261 \u22A4' },
                                    { formula: '\u00AC(\u00ACp)', rule: 'Identity: \u00ACp\u2227\u22A4 \u2261 \u00ACp' },
                                    { formula: 'p', rule: 'Double Negation' }
                                ]
                            },
                            {
                                title: 'Contrapositive of p \u2192 q',
                                steps: [
                                    { formula: 'p \u2192 q', rule: 'Start' },
                                    { formula: '\u00ACp \u2228 q', rule: 'Conditional: p\u2192q \u2261 \u00ACp\u2228q' },
                                    { formula: 'q \u2228 \u00ACp', rule: 'Commutativity of \u2228' },
                                    { formula: '\u00AC\u00ACq \u2228 \u00ACp', rule: 'Double Negation on q' },
                                    { formula: '\u00ACq \u2192 \u00ACp', rule: 'Conditional (reverse)' }
                                ]
                            }
                        ];

                        var chainIdx = 0;
                        var stepIdx = 0;
                        var maxStep = chains[0].steps.length - 1;

                        VizEngine.createButton(controls, 'Example 1', function() {
                            chainIdx = 0; stepIdx = 0; maxStep = chains[0].steps.length - 1; draw();
                        });
                        VizEngine.createButton(controls, 'Example 2', function() {
                            chainIdx = 1; stepIdx = 0; maxStep = chains[1].steps.length - 1; draw();
                        });
                        VizEngine.createButton(controls, 'Example 3', function() {
                            chainIdx = 2; stepIdx = 0; maxStep = chains[2].steps.length - 1; draw();
                        });
                        VizEngine.createButton(controls, 'Next Step', function() {
                            if (stepIdx < maxStep) { stepIdx++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            stepIdx = 0; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var chain = chains[chainIdx];

                            viz.screenText(chain.title, viz.width / 2, 30, viz.colors.white, 16);

                            var startY = 70;
                            var rowH = 60;

                            for (var i = 0; i <= stepIdx; i++) {
                                var s = chain.steps[i];
                                var y = startY + i * rowH;

                                // Step number
                                var stepColor = i === stepIdx ? viz.colors.teal : viz.colors.text;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillStyle = stepColor;
                                ctx.fillText('Step ' + (i + 1) + ':', 40, y);

                                // Formula
                                ctx.font = i === stepIdx ? 'bold 18px -apple-system,sans-serif' : '16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillStyle = i === stepIdx ? viz.colors.white : viz.colors.text;
                                ctx.fillText(s.formula, viz.width / 2, y + 22);

                                // Rule applied (shown below formula)
                                if (i > 0) {
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.fillStyle = viz.colors.purple;
                                    ctx.fillText('[ ' + s.rule + ' ]', viz.width / 2, y + 40);
                                }

                                // Arrow to next step
                                if (i < stepIdx) {
                                    var arrowY = y + 50;
                                    ctx.strokeStyle = viz.colors.axis;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.width / 2, arrowY);
                                    ctx.lineTo(viz.width / 2, arrowY + 6);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.axis;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.width / 2 - 4, arrowY + 4);
                                    ctx.lineTo(viz.width / 2 + 4, arrowY + 4);
                                    ctx.lineTo(viz.width / 2, arrowY + 10);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Progress
                            viz.screenText('Step ' + (stepIdx + 1) + ' of ' + chain.steps.length, viz.width / 2, viz.height - 20, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use De Morgan\'s laws to negate the statement "\\(n\\) is even and \\(n > 10\\)."',
                    hint: 'Apply \\(\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q\\).',
                    solution: 'The negation is "\\(n\\) is not even or \\(n \\leq 10\\)," i.e., "\\(n\\) is odd or \\(n \\leq 10\\)." In symbols: \\(\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q\\).'
                },
                {
                    question: 'Simplify \\(\\neg(\\neg p \\vee q) \\vee (p \\wedge q)\\) using logical equivalences.',
                    hint: 'First apply De Morgan to the negated disjunction, then look for a common factor.',
                    solution: '\\(\\neg(\\neg p \\vee q) \\vee (p \\wedge q) \\equiv (p \\wedge \\neg q) \\vee (p \\wedge q) \\equiv p \\wedge (\\neg q \\vee q) \\equiv p \\wedge \\top \\equiv p\\). The entire expression simplifies to \\(p\\).'
                },
                {
                    question: 'Write the contrapositive of "If \\(n^2\\) is even, then \\(n\\) is even." Is the contrapositive true?',
                    hint: 'The contrapositive of \\(p \\to q\\) is \\(\\neg q \\to \\neg p\\). What does "\\(n\\) is not even" mean?',
                    solution: 'Contrapositive: "If \\(n\\) is odd, then \\(n^2\\) is odd." This is true: if \\(n = 2k+1\\), then \\(n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1\\), which is odd. Since the contrapositive is equivalent to the original, both are true.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Chapter 1
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: From Propositions to Proofs</h2>

<p>In this chapter we have built the grammar of mathematical reasoning: propositions, connectives, truth tables, and logical equivalences. Every mathematical statement, no matter how complex, is ultimately a compound proposition. Every proof is a chain of logically valid steps that transforms hypotheses into conclusions.</p>

<h3>What We Have Learned</h3>

<table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:0.92em;">
    <tr style="border-bottom:2px solid var(--border-default);">
        <th style="padding:8px; text-align:left;">Concept</th>
        <th style="padding:8px; text-align:left;">Key Idea</th>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Proposition</td>
        <td style="padding:8px;">A declarative sentence that is true or false</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Connectives</td>
        <td style="padding:8px;">\\(\\neg, \\wedge, \\vee, \\to, \\leftrightarrow\\)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Truth Table</td>
        <td style="padding:8px;">Exhaustive check of all \\(2^n\\) truth assignments</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Tautology</td>
        <td style="padding:8px;">Always true; the backbone of valid arguments</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Logical Equivalence</td>
        <td style="padding:8px;">Same truth value in all cases; allows formula substitution</td>
    </tr>
    <tr>
        <td style="padding:8px;">De Morgan's Laws</td>
        <td style="padding:8px;">Negation distributes over AND/OR, swapping the connective</td>
    </tr>
</table>

<h3>The Road Ahead</h3>

<p>Propositional logic is necessary but not sufficient for mathematics. The statement "for every \\(\\varepsilon > 0\\), there exists \\(\\delta > 0\\) such that..." cannot be captured by propositions alone. We need <strong>predicates</strong> and <strong>quantifiers</strong> (\\(\\forall\\) and \\(\\exists\\)), which are the subject of <strong>Chapter 1</strong>.</p>

<p>With predicates and quantifiers in hand, we will then learn how to construct <strong>proofs</strong>: direct proofs, proofs by contradiction, proofs by contrapositive, and proofs by induction. The logical equivalences from this chapter (especially the contrapositive and De Morgan's laws) will be used constantly.</p>

<div class="env-block remark">
    <div class="env-title">A Preview: Arguments and Validity</div>
    <div class="env-body">
        <p>An <strong>argument</strong> is a sequence of propositions (called <em>premises</em>) followed by a proposition (called the <em>conclusion</em>). The argument is <strong>valid</strong> if the conclusion is true whenever all premises are true. In symbols, the argument \\(p_1, p_2, \\ldots, p_n \\therefore q\\) is valid if and only if \\((p_1 \\wedge p_2 \\wedge \\cdots \\wedge p_n) \\to q\\) is a tautology. This connects truth tables to the notion of a correct proof.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-tautology-checker"></div>
`,
            visualizations: [
                {
                    id: 'viz-tautology-checker',
                    title: 'Tautology Checker',
                    description: 'Enter a formula and check whether it is a tautology (always true), a contradiction (always false), or a contingency. Try classic tautologies like "p | !p" or "((p > q) & p) > q" (modus ponens).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var formula = '((p > q) & p) > q';

                        var inputDiv = document.createElement('div');
                        inputDiv.style.cssText = 'display:flex;gap:8px;align-items:center;margin-bottom:4px;';
                        var label = document.createElement('span');
                        label.textContent = 'Formula: ';
                        label.style.cssText = 'color:#c9d1d9;font-size:0.85rem;';
                        var input = document.createElement('input');
                        input.type = 'text';
                        input.value = formula;
                        input.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#0d1117;color:#c9d1d9;font-family:monospace;font-size:0.85rem;flex:1;';
                        inputDiv.appendChild(label);
                        inputDiv.appendChild(input);
                        controls.appendChild(inputDiv);

                        var presets = document.createElement('div');
                        presets.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        var presetList = [
                            { label: 'Excluded Middle', value: 'p | !p' },
                            { label: 'Modus Ponens', value: '((p > q) & p) > q' },
                            { label: 'Modus Tollens', value: '((p > q) & !q) > !p' },
                            { label: 'Contradiction', value: 'p & !p' },
                            { label: 'Contrapositive', value: '(p > q) = (!q > !p)' },
                            { label: 'De Morgan', value: '!(p & q) = (!p | !q)' }
                        ];
                        presetList.forEach(function(pr) {
                            var btn = document.createElement('button');
                            btn.style.cssText = 'padding:2px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#8b949e;font-size:0.7rem;cursor:pointer;';
                            btn.textContent = pr.label;
                            btn.addEventListener('click', function() {
                                input.value = pr.value;
                                formula = pr.value;
                                draw();
                            });
                            presets.appendChild(btn);
                        });
                        controls.appendChild(presets);

                        input.addEventListener('input', function() {
                            formula = input.value;
                            draw();
                        });

                        // Reuse the same parser from truth-table-builder
                        function tokenize(s) {
                            var tokens = [];
                            var i = 0;
                            while (i < s.length) {
                                var ch = s[i];
                                if (ch === ' ') { i++; continue; }
                                if ('pqr'.indexOf(ch) >= 0) { tokens.push({ type: 'var', value: ch }); i++; }
                                else if (ch === '!') { tokens.push({ type: 'not' }); i++; }
                                else if (ch === '&') { tokens.push({ type: 'and' }); i++; }
                                else if (ch === '|') { tokens.push({ type: 'or' }); i++; }
                                else if (ch === '>') { tokens.push({ type: 'implies' }); i++; }
                                else if (ch === '=') { tokens.push({ type: 'iff' }); i++; }
                                else if (ch === '(') { tokens.push({ type: 'lparen' }); i++; }
                                else if (ch === ')') { tokens.push({ type: 'rparen' }); i++; }
                                else { i++; }
                            }
                            return tokens;
                        }

                        function parse(tokens) {
                            var pos = 0;
                            function peek() { return pos < tokens.length ? tokens[pos] : null; }
                            function advance() { return tokens[pos++]; }
                            function parseIff() {
                                var left = parseImplies();
                                while (peek() && peek().type === 'iff') { advance(); var right = parseImplies(); left = { type: 'iff', left: left, right: right }; }
                                return left;
                            }
                            function parseImplies() {
                                var left = parseOr();
                                while (peek() && peek().type === 'implies') { advance(); var right = parseOr(); left = { type: 'implies', left: left, right: right }; }
                                return left;
                            }
                            function parseOr() {
                                var left = parseAnd();
                                while (peek() && peek().type === 'or') { advance(); var right = parseAnd(); left = { type: 'or', left: left, right: right }; }
                                return left;
                            }
                            function parseAnd() {
                                var left = parseNot();
                                while (peek() && peek().type === 'and') { advance(); var right = parseNot(); left = { type: 'and', left: left, right: right }; }
                                return left;
                            }
                            function parseNot() {
                                if (peek() && peek().type === 'not') { advance(); var operand = parseNot(); return { type: 'not', operand: operand }; }
                                return parseAtom();
                            }
                            function parseAtom() {
                                var t = peek();
                                if (!t) return null;
                                if (t.type === 'var') { advance(); return { type: 'var', name: t.value }; }
                                if (t.type === 'lparen') { advance(); var expr = parseIff(); if (peek() && peek().type === 'rparen') advance(); return expr; }
                                advance(); return null;
                            }
                            return parseIff();
                        }

                        function evaluate(ast, env) {
                            if (!ast) return false;
                            if (ast.type === 'var') return !!env[ast.name];
                            if (ast.type === 'not') return !evaluate(ast.operand, env);
                            if (ast.type === 'and') return evaluate(ast.left, env) && evaluate(ast.right, env);
                            if (ast.type === 'or') return evaluate(ast.left, env) || evaluate(ast.right, env);
                            if (ast.type === 'implies') return !evaluate(ast.left, env) || evaluate(ast.right, env);
                            if (ast.type === 'iff') return evaluate(ast.left, env) === evaluate(ast.right, env);
                            return false;
                        }

                        function getVars(ast, vars) {
                            if (!ast) return;
                            if (ast.type === 'var') { if (vars.indexOf(ast.name) < 0) vars.push(ast.name); return; }
                            if (ast.operand) getVars(ast.operand, vars);
                            if (ast.left) getVars(ast.left, vars);
                            if (ast.right) getVars(ast.right, vars);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var ast;
                            try {
                                var tokens = tokenize(formula);
                                ast = parse(tokens);
                            } catch (e) { ast = null; }

                            if (!ast) {
                                viz.screenText('Enter a valid formula', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            var vars = [];
                            getVars(ast, vars);
                            vars.sort();
                            var nVars = vars.length;
                            if (nVars === 0 || nVars > 3) {
                                viz.screenText('Use 1-3 variables (p, q, r)', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            var nRows = Math.pow(2, nVars);
                            var trueCount = 0;
                            var falseCount = 0;
                            var results = [];

                            for (var row = 0; row < nRows; row++) {
                                var env = {};
                                for (var vi = 0; vi < nVars; vi++) {
                                    env[vars[vi]] = !!(row >> (nVars - 1 - vi) & 1);
                                }
                                var result = evaluate(ast, env);
                                results.push({ env: env, result: result });
                                if (result) trueCount++;
                                else falseCount++;
                            }

                            // Classification
                            var classification, classColor;
                            if (falseCount === 0) { classification = 'TAUTOLOGY'; classColor = viz.colors.green; }
                            else if (trueCount === 0) { classification = 'CONTRADICTION'; classColor = viz.colors.red; }
                            else { classification = 'CONTINGENCY'; classColor = viz.colors.orange; }

                            viz.screenText(classification, viz.width / 2, 40, classColor, 24);
                            viz.screenText(formula, viz.width / 2, 68, viz.colors.white, 14);

                            // Visual: pie-like bar showing T/F ratio
                            var barY = 95;
                            var barH = 28;
                            var barL = 80;
                            var barW = viz.width - 160;
                            var tFrac = trueCount / nRows;

                            ctx.fillStyle = viz.colors.green + 'aa';
                            ctx.fillRect(barL, barY, barW * tFrac, barH);
                            ctx.fillStyle = viz.colors.red + 'aa';
                            ctx.fillRect(barL + barW * tFrac, barY, barW * (1 - tFrac), barH);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(barL, barY, barW, barH);

                            viz.screenText('TRUE: ' + trueCount + '/' + nRows, barL + barW * tFrac * 0.5, barY + barH / 2, viz.colors.white, 11);
                            if (falseCount > 0) {
                                viz.screenText('FALSE: ' + falseCount + '/' + nRows, barL + barW * (tFrac + (1 - tFrac) * 0.5), barY + barH / 2, viz.colors.white, 11);
                            }

                            // Show counterexample or confirm
                            var infoY = barY + barH + 30;
                            if (falseCount === 0) {
                                viz.screenText('True in all ' + nRows + ' rows. This is a valid logical law.', viz.width / 2, infoY, viz.colors.green, 12);
                            } else if (trueCount === 0) {
                                viz.screenText('False in all ' + nRows + ' rows. Always a contradiction.', viz.width / 2, infoY, viz.colors.red, 12);
                            } else {
                                // Show a counterexample (first false row)
                                for (var r = 0; r < results.length; r++) {
                                    if (!results[r].result) {
                                        var ceText = 'Counterexample: ';
                                        for (var vi2 = 0; vi2 < nVars; vi2++) {
                                            if (vi2 > 0) ceText += ', ';
                                            ceText += vars[vi2] + '=' + (results[r].env[vars[vi2]] ? 'T' : 'F');
                                        }
                                        viz.screenText(ceText, viz.width / 2, infoY, viz.colors.orange, 12);
                                        break;
                                    }
                                }
                            }

                            // Compact truth table below
                            var tableTop = infoY + 30;
                            var colW2 = Math.min(70, (viz.width - 40) / (nVars + 1));
                            var rowH2 = Math.min(22, (viz.height - tableTop - 20) / (nRows + 1));
                            var tableLeft = (viz.width - (nVars + 1) * colW2) / 2;

                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            for (var vi3 = 0; vi3 < nVars; vi3++) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText(vars[vi3], tableLeft + vi3 * colW2 + colW2 / 2, tableTop + rowH2 / 2);
                            }
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Result', tableLeft + nVars * colW2 + colW2 / 2, tableTop + rowH2 / 2);

                            for (var row2 = 0; row2 < nRows; row2++) {
                                var yy = tableTop + (row2 + 1) * rowH2 + rowH2 / 2;
                                if (row2 % 2 === 0) {
                                    ctx.fillStyle = '#1a1a40';
                                    ctx.fillRect(tableLeft, yy - rowH2 / 2, (nVars + 1) * colW2, rowH2);
                                }
                                ctx.font = '11px -apple-system,sans-serif';
                                for (var vi4 = 0; vi4 < nVars; vi4++) {
                                    var val = results[row2].env[vars[vi4]];
                                    ctx.fillStyle = val ? viz.colors.green : viz.colors.red;
                                    ctx.textAlign = 'center';
                                    ctx.fillText(val ? 'T' : 'F', tableLeft + vi4 * colW2 + colW2 / 2, yy);
                                }
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.fillStyle = results[row2].result ? viz.colors.green : viz.colors.red;
                                ctx.fillText(results[row2].result ? 'T' : 'F', tableLeft + nVars * colW2 + colW2 / 2, yy);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that modus ponens is a valid argument form: \\((p \\to q) \\wedge p \\to q\\) is a tautology. Then determine: is the converse of a true conditional always true?',
                    hint: 'For modus ponens, construct the truth table (4 rows) and check all rows give T. For the converse, recall that the converse of \\(p \\to q\\) is \\(q \\to p\\); find a concrete counterexample.',
                    solution: 'Modus ponens: Row (T,T): \\((T \\to T) \\wedge T \\to T = T\\). Row (T,F): \\((T \\to F) \\wedge T \\to F = F \\to F = T\\). Row (F,T): \\((F \\to T) \\wedge F \\to T = F \\to T = T\\). Row (F,F): \\((F \\to F) \\wedge F \\to F = F \\to F = T\\). All T, so modus ponens is valid. For the converse: no. "If \\(n\\) is divisible by 4, then \\(n\\) is even" is true, but its converse "If \\(n\\) is even, then \\(n\\) is divisible by 4" is false (\\(n=6\\)). In general \\(p \\to q \\not\\equiv q \\to p\\).'
                }
            ]
        }
    ]
});
