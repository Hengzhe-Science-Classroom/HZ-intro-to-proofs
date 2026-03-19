// === Chapter 3: Direct Proof ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Direct Proof',
    subtitle: 'Assume P, derive Q',
    sections: [
        // ======================== Section 1: Motivation ========================
        {
            id: 'sec-motivation',
            title: 'Why Direct Proof?',
            content: `
<div class="env-block env-intuition">
<div class="env-header">From Logic to Proof</div>
<div class="env-body">
<p>In the previous chapters, we built up the language of logic: propositions, connectives, conditionals, quantifiers, and negation. We now begin the central activity of mathematics: <em>proving theorems</em>. A theorem is simply a statement that has been established as true by a logical argument. A <strong>proof</strong> is that argument.</p>
</div>
</div>

<h2>The Goal of Proof</h2>

<p>Most mathematical theorems take the form of a conditional statement:</p>
\\[\\text{If } P, \\text{ then } Q.\\]
<p>Here \\(P\\) is the <strong>hypothesis</strong> (what we assume) and \\(Q\\) is the <strong>conclusion</strong> (what we must show). A proof is a chain of logical steps that starts from \\(P\\) and arrives at \\(Q\\), where each step follows from the previous ones by accepted rules of logic or previously established results.</p>

<p>The most natural way to prove "If \\(P\\), then \\(Q\\)" is the <strong>direct proof</strong>: assume \\(P\\) is true, then use definitions, algebra, and logic to derive \\(Q\\). This is the method we study in this chapter.</p>

<div class="env-block env-intuition">
<div class="env-header">Analogy</div>
<div class="env-body">
<p>Think of a direct proof as giving someone directions from point A to point B. You start at A (the hypothesis), follow a sequence of well-defined steps (logical deductions), and arrive at B (the conclusion). Each step must be justified, and the route must be connected, with no gaps.</p>
</div>
</div>

<h2>Definitions Are the Starting Point</h2>

<p>In a direct proof, the first thing you do after assuming the hypothesis is <strong>unpack the definitions</strong>. Definitions translate English-language conditions into precise mathematical statements that you can manipulate algebraically.</p>

<div class="env-block env-example">
<div class="env-header">Example 3.1</div>
<div class="env-body">
<p>Suppose we want to prove: "If \\(n\\) is even, then \\(n^2\\) is even." The first step is to write down what "even" means: an integer \\(n\\) is even if \\(n = 2k\\) for some integer \\(k\\). This gives us something concrete to work with.</p>
</div>
</div>

<p>This chapter introduces the direct proof technique through three major families of problems: proofs about even and odd numbers, proofs about divisibility, and proofs about inequalities. Along the way, we will develop the skill of writing clear, rigorous proofs.</p>
`,
            exercises: [],
            visualizations: []
        },
        // ======================== Section 2: Structure of a Direct Proof ========================
        {
            id: 'sec-structure',
            title: 'Structure of a Direct Proof',
            content: `
<h2>Structure of a Direct Proof</h2>

<p>Every direct proof of "If \\(P\\), then \\(Q\\)" follows the same blueprint:</p>

<div class="env-block env-definition">
<div class="env-header">Template: Direct Proof of "If \\(P\\), then \\(Q\\)"</div>
<div class="env-body">
<ol>
<li><strong>Assume</strong> \\(P\\) is true.</li>
<li><strong>Unpack definitions</strong>: translate \\(P\\) into a precise mathematical statement.</li>
<li><strong>Chain of implications</strong>: use algebra, logic, and known results to deduce intermediate facts.</li>
<li><strong>Arrive at \\(Q\\)</strong>: show that the conclusion follows.</li>
</ol>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-proof-structure"></div>

<p>The crucial point is that each step in the chain must be <em>justified</em>. You cannot skip steps or appeal to intuition alone. Every deduction must follow from a definition, an axiom, an algebraic manipulation, or a previously proven theorem.</p>

<div class="env-block env-example">
<div class="env-header">Example 3.2</div>
<div class="env-body">
<p><strong>Theorem.</strong> If \\(n\\) is an odd integer, then \\(n + 1\\) is even.</p>
<p><strong>Proof.</strong></p>
<ol>
<li><em>Assume</em> \\(n\\) is an odd integer.</li>
<li><em>By definition</em>, this means \\(n = 2k + 1\\) for some integer \\(k\\).</li>
<li><em>Then</em> \\(n + 1 = (2k + 1) + 1 = 2k + 2 = 2(k + 1)\\).</li>
<li><em>Since</em> \\(k + 1\\) is an integer, \\(n + 1 = 2(k+1)\\), which means \\(n + 1\\) is even by definition. \\(\\square\\)</li>
</ol>
</div>
</div>

<p>Notice how each step is explicit. We said <em>why</em> we could write \\(n = 2k+1\\) (by definition of odd), we showed the algebra, and we concluded by matching the form of the definition of even.</p>

<h2>The Chain of Implications</h2>

<p>A direct proof is essentially a chain of implications:</p>
\\[P \\Rightarrow S_1 \\Rightarrow S_2 \\Rightarrow \\cdots \\Rightarrow S_n \\Rightarrow Q.\\]
<p>Each arrow represents a justified logical step. The transitivity of implication guarantees that if every link in the chain holds, then \\(P \\Rightarrow Q\\).</p>

<div class="env-block env-warning">
<div class="env-header">Common Mistake: Working Backwards</div>
<div class="env-body">
<p>A direct proof must proceed <em>forward</em> from \\(P\\) to \\(Q\\). A common error is to start with \\(Q\\) and work backwards to \\(P\\). This proves \\(Q \\Rightarrow P\\) (the converse), not \\(P \\Rightarrow Q\\). Sometimes working backwards on scratch paper helps you discover the proof, but the final write-up must flow from hypothesis to conclusion.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-proof-builder"></div>

<div class="env-block env-example">
<div class="env-header">Example 3.3</div>
<div class="env-body">
<p><strong>Theorem.</strong> If \\(a\\) and \\(b\\) are both odd integers, then \\(a + b\\) is even.</p>
<p><strong>Proof.</strong> Assume \\(a\\) and \\(b\\) are odd. By definition, \\(a = 2m + 1\\) and \\(b = 2n + 1\\) for some integers \\(m\\) and \\(n\\). Then</p>
\\[a + b = (2m + 1) + (2n + 1) = 2m + 2n + 2 = 2(m + n + 1).\\]
<p>Since \\(m + n + 1\\) is an integer, \\(a + b\\) is even. \\(\\square\\)</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'Outline the structure of a direct proof for: "If \\(n\\) is even, then \\(3n\\) is even." Identify the hypothesis, the conclusion, and the key definition you need.',
                    hint: 'The hypothesis is "\\(n\\) is even," which means \\(n = 2k\\). The conclusion is "\\(3n\\) is even," which means \\(3n = 2(\\text{some integer})\\).',
                    solution: '<p><strong>Hypothesis:</strong> \\(n\\) is even, so \\(n = 2k\\) for some integer \\(k\\).</p><p><strong>Conclusion:</strong> \\(3n\\) is even.</p><p><strong>Proof.</strong> Assume \\(n\\) is even, so \\(n = 2k\\) for some integer \\(k\\). Then \\(3n = 3(2k) = 2(3k)\\). Since \\(3k\\) is an integer, \\(3n\\) is even. \\(\\square\\)</p>'
                }
            ],
            visualizations: [
                {
                    id: 'viz-proof-structure',
                    title: 'Anatomy of a Direct Proof',
                    description: 'A flowchart showing the logical flow from hypothesis to conclusion. Each box represents a step in the proof; arrows show deduction.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0, width: 700, height: 380 });
                        var ctx = viz.ctx;

                        function drawBox(x, y, w, h, text, color, textColor) {
                            ctx.fillStyle = color + '33';
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.roundRect(x, y, w, h, 8);
                            ctx.fill();
                            ctx.stroke();
                            ctx.fillStyle = textColor || viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var lines = text.split('\n');
                            for (var i = 0; i < lines.length; i++) {
                                ctx.fillText(lines[i], x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * 18);
                            }
                        }

                        function drawArrow(x1, y1, x2, y2, color) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.stroke();
                            var angle = Math.atan2(y2 - y1, x2 - x1);
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.moveTo(x2, y2);
                            ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
                            ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
                            ctx.closePath();
                            ctx.fill();
                        }

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, 700, 380);

                            var boxW = 180, boxH = 52;
                            var startX = 260, gap = 70;

                            // Step 0: Assume P
                            drawBox(startX, 15, boxW, boxH, 'Assume P\n(Hypothesis)', viz.colors.blue);
                            drawArrow(startX + boxW / 2, 15 + boxH, startX + boxW / 2, 15 + boxH + gap - boxH, viz.colors.text);

                            // Step 1: Unpack Definitions
                            drawBox(startX, 15 + gap, boxW, boxH, 'Unpack Definitions\n(Translate to math)', viz.colors.teal);
                            drawArrow(startX + boxW / 2, 15 + gap + boxH, startX + boxW / 2, 15 + 2 * gap, viz.colors.text);

                            // Step 2: Algebra / Logic
                            drawBox(startX, 15 + 2 * gap, boxW, boxH, 'Algebra & Logic\n(Derive new facts)', viz.colors.purple);
                            drawArrow(startX + boxW / 2, 15 + 2 * gap + boxH, startX + boxW / 2, 15 + 3 * gap, viz.colors.text);

                            // Step 3: More steps (optional)
                            drawBox(startX, 15 + 3 * gap, boxW, boxH, 'Further Deductions\n(Chain continues)', viz.colors.orange);
                            drawArrow(startX + boxW / 2, 15 + 3 * gap + boxH, startX + boxW / 2, 15 + 4 * gap, viz.colors.text);

                            // Step 4: Conclude Q
                            drawBox(startX, 15 + 4 * gap, boxW, boxH, 'Conclude Q\n(Match definition)', viz.colors.green);

                            // Labels on the side
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Step 1', startX - 15, 15 + boxH / 2);
                            ctx.fillText('Step 2', startX - 15, 15 + gap + boxH / 2);
                            ctx.fillText('Step 3', startX - 15, 15 + 2 * gap + boxH / 2);
                            ctx.fillText('Step 4', startX - 15, 15 + 3 * gap + boxH / 2);
                            ctx.fillText('Step 5', startX - 15, 15 + 4 * gap + boxH / 2);

                            // Right side: justifications
                            ctx.textAlign = 'left';
                            ctx.font = 'italic 11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('"Suppose P..."', startX + boxW + 15, 15 + boxH / 2);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('"By definition..."', startX + boxW + 15, 15 + gap + boxH / 2);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('"Then... Therefore..."', startX + boxW + 15, 15 + 2 * gap + boxH / 2);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('"Since... it follows..."', startX + boxW + 15, 15 + 3 * gap + boxH / 2);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('"Hence Q. \u25A1"', startX + boxW + 15, 15 + 4 * gap + boxH / 2);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-proof-builder',
                    title: 'Proof Builder: Arrange the Steps',
                    description: 'Click the proof steps in the correct order to build a valid proof that "if n is odd, then n + 1 is even."',
                    setup: function(container, controls) {
                        var wrapper = document.createElement('div');
                        wrapper.style.cssText = 'font-family:-apple-system,sans-serif;color:#c9d1d9;padding:12px;';

                        var steps = [
                            { text: 'Assume n is an odd integer.', order: 0 },
                            { text: 'By definition, n = 2k + 1 for some integer k.', order: 1 },
                            { text: 'Then n + 1 = (2k + 1) + 1 = 2k + 2 = 2(k + 1).', order: 2 },
                            { text: 'Since k + 1 is an integer, n + 1 is even by definition. \u25A1', order: 3 }
                        ];

                        var shuffled = steps.slice().sort(function() { return Math.random() - 0.5; });
                        var chosen = [];
                        var done = false;

                        var bankDiv = document.createElement('div');
                        bankDiv.style.cssText = 'margin-bottom:16px;';
                        var bankLabel = document.createElement('div');
                        bankLabel.textContent = 'Available steps (click in order):';
                        bankLabel.style.cssText = 'font-size:13px;color:#8b949e;margin-bottom:8px;';
                        bankDiv.appendChild(bankLabel);

                        var proofDiv = document.createElement('div');
                        proofDiv.style.cssText = 'border:1px solid #30363d;border-radius:6px;padding:12px;min-height:60px;background:#0d1117;';
                        var proofLabel = document.createElement('div');
                        proofLabel.textContent = 'Your proof:';
                        proofLabel.style.cssText = 'font-size:13px;color:#8b949e;margin-bottom:8px;';

                        var feedbackDiv = document.createElement('div');
                        feedbackDiv.style.cssText = 'margin-top:12px;font-size:14px;min-height:24px;';

                        function render() {
                            bankDiv.querySelectorAll('.step-btn').forEach(function(b) { b.remove(); });
                            proofDiv.querySelectorAll('.proof-step').forEach(function(b) { b.remove(); });

                            shuffled.forEach(function(step, i) {
                                if (chosen.indexOf(step) !== -1) return;
                                var btn = document.createElement('button');
                                btn.className = 'step-btn';
                                btn.textContent = step.text;
                                btn.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 12px;margin:4px 0;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:13px;cursor:pointer;';
                                btn.addEventListener('click', function() {
                                    if (done) return;
                                    var expectedOrder = chosen.length;
                                    if (step.order === expectedOrder) {
                                        chosen.push(step);
                                        feedbackDiv.textContent = '';
                                        feedbackDiv.style.color = '#3fb950';
                                        if (chosen.length === steps.length) {
                                            done = true;
                                            feedbackDiv.textContent = 'Correct! You built a valid direct proof.';
                                        }
                                    } else {
                                        feedbackDiv.style.color = '#f85149';
                                        feedbackDiv.textContent = 'Not quite. Think about what should come at step ' + (expectedOrder + 1) + '.';
                                    }
                                    render();
                                });
                                bankDiv.appendChild(btn);
                            });

                            chosen.forEach(function(step, i) {
                                var p = document.createElement('div');
                                p.className = 'proof-step';
                                p.style.cssText = 'padding:6px 10px;margin:3px 0;background:#1a3a2a;border-left:3px solid #3fb950;border-radius:3px;font-size:13px;';
                                p.textContent = (i + 1) + '. ' + step.text;
                                proofDiv.appendChild(p);
                            });
                        }

                        var resetBtn = document.createElement('button');
                        resetBtn.textContent = 'Reset';
                        resetBtn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:12px;cursor:pointer;margin-top:8px;';
                        resetBtn.addEventListener('click', function() {
                            chosen = [];
                            done = false;
                            shuffled = steps.slice().sort(function() { return Math.random() - 0.5; });
                            feedbackDiv.textContent = '';
                            render();
                        });

                        wrapper.appendChild(bankDiv);
                        wrapper.appendChild(proofLabel);
                        wrapper.appendChild(proofDiv);
                        wrapper.appendChild(feedbackDiv);
                        wrapper.appendChild(resetBtn);
                        container.appendChild(wrapper);
                        render();
                        return null;
                    }
                }
            ]
        },
        // ======================== Section 3: Even and Odd ========================
        {
            id: 'sec-even-odd',
            title: 'Proofs About Even & Odd',
            content: `
<h2>Proofs About Even and Odd Numbers</h2>

<p>The integers fall into two classes: even and odd. These form the simplest and most accessible setting for practicing direct proofs, because the definitions translate immediately into algebra.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 3.1 — Even and Odd</div>
<div class="env-body">
<p>An integer \\(n\\) is <strong>even</strong> if \\(n = 2k\\) for some integer \\(k\\).</p>
<p>An integer \\(n\\) is <strong>odd</strong> if \\(n = 2k + 1\\) for some integer \\(k\\).</p>
</div>
</div>

<p>The key insight: every proof about even/odd numbers begins by translating "even" into "\\(= 2k\\)" or "odd" into "\\(= 2k+1\\)." After substitution, algebra does the rest.</p>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.1</div>
<div class="env-body">
<p>If \\(n\\) is even, then \\(n^2\\) is even.</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(n\\) is even. By definition, \\(n = 2k\\) for some integer \\(k\\). Then</p>
\\[n^2 = (2k)^2 = 4k^2 = 2(2k^2).\\]
<p>Since \\(2k^2\\) is an integer, \\(n^2 = 2(2k^2)\\) is even. \\(\\square\\)</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-even-odd-proof"></div>

<div class="env-block env-warning">
<div class="env-header">Use Different Variable Names</div>
<div class="env-body">
<p>When a proof involves two even or two odd numbers, you must use <em>different</em> variables for each. If \\(a\\) and \\(b\\) are both even, write \\(a = 2j\\) and \\(b = 2k\\), not \\(a = 2k\\) and \\(b = 2k\\). Writing \\(a = 2k\\) and \\(b = 2k\\) asserts that \\(a = b\\), which is not given.</p>
</div>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.2</div>
<div class="env-body">
<p>If \\(a\\) is even and \\(b\\) is odd, then \\(a + b\\) is odd.</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(a\\) is even and \\(b\\) is odd. Then \\(a = 2j\\) and \\(b = 2k + 1\\) for some integers \\(j\\) and \\(k\\). Then</p>
\\[a + b = 2j + 2k + 1 = 2(j + k) + 1.\\]
<p>Since \\(j + k\\) is an integer, \\(a + b\\) is odd. \\(\\square\\)</p>
</div>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.3</div>
<div class="env-body">
<p>If \\(a\\) and \\(b\\) are both odd, then \\(ab\\) is odd.</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(a\\) and \\(b\\) are odd. Then \\(a = 2m + 1\\) and \\(b = 2n + 1\\) for integers \\(m\\) and \\(n\\). Then</p>
\\[ab = (2m+1)(2n+1) = 4mn + 2m + 2n + 1 = 2(2mn + m + n) + 1.\\]
<p>Since \\(2mn + m + n\\) is an integer, \\(ab\\) is odd. \\(\\square\\)</p>
</div>
</div>

<p>The pattern is always the same: assume the hypothesis, apply the definition, do algebra, and match the conclusion's definition.</p>
`,
            exercises: [
                {
                    question: 'Prove: If \\(n\\) is odd, then \\(n^2\\) is odd.',
                    hint: 'Write \\(n = 2k + 1\\) and expand \\(n^2\\). Factor out a 2 from the non-remainder terms.',
                    solution: '<p><strong>Proof.</strong> Assume \\(n\\) is odd. Then \\(n = 2k + 1\\) for some integer \\(k\\). Then \\(n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1\\). Since \\(2k^2 + 2k\\) is an integer, \\(n^2\\) is odd. \\(\\square\\)</p>'
                },
                {
                    question: 'Prove: If \\(a\\) and \\(b\\) are both even, then \\(a + b\\) is even.',
                    hint: 'Write \\(a = 2j\\) and \\(b = 2k\\) and add them.',
                    solution: '<p><strong>Proof.</strong> Assume \\(a = 2j\\) and \\(b = 2k\\) for integers \\(j, k\\). Then \\(a + b = 2j + 2k = 2(j + k)\\). Since \\(j + k\\) is an integer, \\(a + b\\) is even. \\(\\square\\)</p>'
                },
                {
                    question: 'Prove: If \\(n\\) is even, then \\(n^3\\) is even.',
                    hint: 'Use \\(n = 2k\\) and compute \\(n^3\\).',
                    solution: '<p><strong>Proof.</strong> Assume \\(n = 2k\\). Then \\(n^3 = (2k)^3 = 8k^3 = 2(4k^3)\\). Since \\(4k^3\\) is an integer, \\(n^3\\) is even. \\(\\square\\)</p>'
                }
            ],
            visualizations: [
                {
                    id: 'viz-even-odd-proof',
                    title: 'Step-by-Step: If n Is Even, Then n\u00B2 Is Even',
                    description: 'Click "Next Step" to walk through the proof one deduction at a time.',
                    setup: function(container, controls) {
                        var wrapper = document.createElement('div');
                        wrapper.style.cssText = 'font-family:-apple-system,sans-serif;color:#c9d1d9;padding:12px;';

                        var proofSteps = [
                            { label: 'Hypothesis', text: 'Assume n is even.', color: '#58a6ff' },
                            { label: 'Definition', text: 'Then n = 2k for some integer k.', color: '#3fb9a0' },
                            { label: 'Algebra', text: 'Compute: n\u00B2 = (2k)\u00B2 = 4k\u00B2 = 2(2k\u00B2).', color: '#bc8cff' },
                            { label: 'Closure', text: 'Since k is an integer, 2k\u00B2 is an integer.', color: '#f0883e' },
                            { label: 'Conclusion', text: 'So n\u00B2 = 2(2k\u00B2) is even by definition. \u25A1', color: '#3fb950' }
                        ];

                        var currentStep = -1;
                        var stepsDiv = document.createElement('div');
                        stepsDiv.style.cssText = 'min-height:180px;';

                        var feedback = document.createElement('div');
                        feedback.style.cssText = 'margin-top:8px;font-size:12px;color:#8b949e;';

                        function render() {
                            stepsDiv.innerHTML = '';
                            for (var i = 0; i <= currentStep && i < proofSteps.length; i++) {
                                var s = proofSteps[i];
                                var row = document.createElement('div');
                                row.style.cssText = 'padding:8px 12px;margin:4px 0;border-left:3px solid ' + s.color + ';background:' + s.color + '11;border-radius:3px;font-size:13px;opacity:0;transition:opacity 0.4s;';
                                row.innerHTML = '<span style="color:' + s.color + ';font-weight:bold;">' + s.label + ':</span> ' + s.text;
                                stepsDiv.appendChild(row);
                                // trigger reflow for animation
                                row.offsetHeight;
                                row.style.opacity = '1';
                            }
                            if (currentStep >= proofSteps.length - 1) {
                                feedback.textContent = 'Proof complete! Each step follows logically from the previous one.';
                                feedback.style.color = '#3fb950';
                            } else {
                                feedback.textContent = 'Step ' + (currentStep + 2) + ' of ' + proofSteps.length;
                                feedback.style.color = '#8b949e';
                            }
                        }

                        var nextBtn = document.createElement('button');
                        nextBtn.textContent = 'Next Step';
                        nextBtn.style.cssText = 'padding:6px 16px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:13px;cursor:pointer;margin-right:8px;';
                        nextBtn.addEventListener('click', function() {
                            if (currentStep < proofSteps.length - 1) {
                                currentStep++;
                                render();
                            }
                        });

                        var resetBtn = document.createElement('button');
                        resetBtn.textContent = 'Reset';
                        resetBtn.style.cssText = 'padding:6px 16px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:13px;cursor:pointer;';
                        resetBtn.addEventListener('click', function() {
                            currentStep = -1;
                            render();
                        });

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'margin-top:12px;';
                        btnRow.appendChild(nextBtn);
                        btnRow.appendChild(resetBtn);

                        wrapper.appendChild(stepsDiv);
                        wrapper.appendChild(feedback);
                        wrapper.appendChild(btnRow);
                        container.appendChild(wrapper);
                        render();
                        return null;
                    }
                }
            ]
        },
        // ======================== Section 4: Divisibility ========================
        {
            id: 'sec-divisibility',
            title: 'Proofs About Divisibility',
            content: `
<h2>Proofs About Divisibility</h2>

<p>Divisibility provides a richer setting for direct proofs. Like even/odd, divisibility has a clean algebraic definition that we can substitute and manipulate.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 3.2 — Divisibility</div>
<div class="env-body">
<p>Let \\(a\\) and \\(b\\) be integers with \\(a \\neq 0\\). We say \\(a\\) <strong>divides</strong> \\(b\\), written \\(a \\mid b\\), if there exists an integer \\(k\\) such that \\(b = ak\\).</p>
<p>Equivalently: \\(a \\mid b\\) means \\(b\\) is a multiple of \\(a\\).</p>
</div>
</div>

<p>Notice that "even" is just a special case of divisibility: \\(n\\) is even if and only if \\(2 \\mid n\\).</p>

<div class="env-block env-example">
<div class="env-header">Example 3.4</div>
<div class="env-body">
<p>We have \\(3 \\mid 12\\) because \\(12 = 3 \\cdot 4\\). We have \\(5 \\mid 0\\) because \\(0 = 5 \\cdot 0\\). But \\(3 \\nmid 7\\), since there is no integer \\(k\\) with \\(7 = 3k\\).</p>
</div>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.4 — Transitivity of Divisibility</div>
<div class="env-body">
<p>If \\(a \\mid b\\) and \\(b \\mid c\\), then \\(a \\mid c\\).</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(a \\mid b\\) and \\(b \\mid c\\). By definition, \\(b = aj\\) and \\(c = bk\\) for some integers \\(j\\) and \\(k\\). Substituting:</p>
\\[c = bk = (aj)k = a(jk).\\]
<p>Since \\(jk\\) is an integer, \\(a \\mid c\\). \\(\\square\\)</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-divisibility-chain"></div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.5</div>
<div class="env-body">
<p>If \\(a \\mid b\\) and \\(a \\mid c\\), then \\(a \\mid (b + c)\\).</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(a \\mid b\\) and \\(a \\mid c\\). Then \\(b = aj\\) and \\(c = ak\\) for integers \\(j\\) and \\(k\\). So</p>
\\[b + c = aj + ak = a(j + k).\\]
<p>Since \\(j + k\\) is an integer, \\(a \\mid (b + c)\\). \\(\\square\\)</p>
</div>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.6</div>
<div class="env-body">
<p>If \\(a \\mid b\\), then \\(a \\mid (bc)\\) for every integer \\(c\\).</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(a \\mid b\\). Then \\(b = ak\\) for some integer \\(k\\). So \\(bc = (ak)c = a(kc)\\). Since \\(kc\\) is an integer, \\(a \\mid (bc)\\). \\(\\square\\)</p>
</div>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.7 — Linear Combination</div>
<div class="env-body">
<p>If \\(a \\mid b\\) and \\(a \\mid c\\), then \\(a \\mid (bx + cy)\\) for all integers \\(x\\) and \\(y\\).</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(a \\mid b\\) and \\(a \\mid c\\). Then \\(b = aj\\) and \\(c = ak\\) for integers \\(j, k\\). So</p>
\\[bx + cy = (aj)x + (ak)y = a(jx + ky).\\]
<p>Since \\(jx + ky\\) is an integer, \\(a \\mid (bx + cy)\\). \\(\\square\\)</p>
</div>
</div>

<p>Notice how every divisibility proof follows the same pattern: translate "divides" into "equals \\(a\\) times something," do algebra, and show the result equals \\(a\\) times an integer.</p>
`,
            exercises: [
                {
                    question: 'Prove: If \\(6 \\mid n\\), then \\(3 \\mid n\\).',
                    hint: 'If \\(n = 6k\\), can you write \\(n\\) as \\(3 \\cdot (\\text{something})\\)?',
                    solution: '<p><strong>Proof.</strong> Assume \\(6 \\mid n\\). Then \\(n = 6k\\) for some integer \\(k\\). So \\(n = 3(2k)\\). Since \\(2k\\) is an integer, \\(3 \\mid n\\). \\(\\square\\)</p>'
                },
                {
                    question: 'Prove: If \\(a \\mid b\\) and \\(a \\mid c\\), then \\(a \\mid (b - c)\\).',
                    hint: 'Similar to Theorem 3.5, but with subtraction.',
                    solution: '<p><strong>Proof.</strong> Assume \\(a \\mid b\\) and \\(a \\mid c\\). Then \\(b = aj\\) and \\(c = ak\\) for integers \\(j, k\\). So \\(b - c = aj - ak = a(j - k)\\). Since \\(j - k\\) is an integer, \\(a \\mid (b - c)\\). \\(\\square\\)</p>'
                }
            ],
            visualizations: [
                {
                    id: 'viz-divisibility-chain',
                    title: 'Transitivity of Divisibility: a | b and b | c implies a | c',
                    description: 'An animated chain showing how divisibility composes. Choose values of a, b, c and watch the substitution unfold.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0, width: 700, height: 340 });
                        var ctx = viz.ctx;

                        var state = { a: 3, j: 2, k: 4, phase: 0, t: 0 };
                        // b = a*j, c = b*k

                        function getB() { return state.a * state.j; }
                        function getC() { return getB() * state.k; }

                        function drawRoundedRect(x, y, w, h, r, fill, stroke) {
                            ctx.beginPath();
                            ctx.roundRect(x, y, w, h, r);
                            if (fill) { ctx.fillStyle = fill; ctx.fill(); }
                            if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
                        }

                        function drawArrowH(x1, y, x2, color) {
                            ctx.strokeStyle = color; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2 - 8, y); ctx.stroke();
                            ctx.fillStyle = color; ctx.beginPath();
                            ctx.moveTo(x2, y);
                            ctx.lineTo(x2 - 10, y - 5);
                            ctx.lineTo(x2 - 10, y + 5);
                            ctx.closePath(); ctx.fill();
                        }

                        var phases = [
                            'Given: a | b and b | c',
                            'By definition: b = a \u00B7 j',
                            'By definition: c = b \u00B7 k',
                            'Substitute: c = (a \u00B7 j) \u00B7 k = a \u00B7 (jk)',
                            'Therefore: a | c  \u25A1'
                        ];

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, 700, 340);

                            var b = getB(), c = getC();
                            var centerY = 100;

                            // Three value boxes
                            var boxW = 110, boxH = 50, gap = 100;
                            var x0 = 80, x1 = x0 + boxW + gap, x2 = x1 + boxW + gap;

                            drawRoundedRect(x0, centerY, boxW, boxH, 8, viz.colors.blue + '33', viz.colors.blue);
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('a = ' + state.a, x0 + boxW / 2, centerY + boxH / 2);

                            drawRoundedRect(x1, centerY, boxW, boxH, 8, viz.colors.teal + '33', viz.colors.teal);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('b = ' + b, x1 + boxW / 2, centerY + boxH / 2);

                            drawRoundedRect(x2, centerY, boxW, boxH, 8, viz.colors.orange + '33', viz.colors.orange);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('c = ' + c, x2 + boxW / 2, centerY + boxH / 2);

                            // Arrows between boxes
                            drawArrowH(x0 + boxW, centerY + boxH / 2, x1, viz.colors.purple);
                            ctx.fillStyle = viz.colors.purple; ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('\u00D7' + state.j, (x0 + boxW + x1) / 2, centerY + boxH / 2 - 14);
                            ctx.fillText('a | b', (x0 + boxW + x1) / 2, centerY + boxH / 2 + 16);

                            drawArrowH(x1 + boxW, centerY + boxH / 2, x2, viz.colors.purple);
                            ctx.fillText('\u00D7' + state.k, (x1 + boxW + x2) / 2, centerY + boxH / 2 - 14);
                            ctx.fillText('b | c', (x1 + boxW + x2) / 2, centerY + boxH / 2 + 16);

                            // The chain arrow (a | c) at bottom
                            if (state.phase >= 3) {
                                var alpha = Math.min(1, (state.phase - 3) + 0.5);
                                ctx.globalAlpha = alpha;
                                var ay = centerY + boxH + 30;
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(x0 + boxW / 2, centerY + boxH);
                                ctx.quadraticCurveTo(x0 + boxW / 2, ay + 20, (x0 + x2 + boxW) / 2, ay + 20);
                                ctx.quadraticCurveTo(x2 + boxW / 2, ay + 20, x2 + boxW / 2, centerY + boxH);
                                ctx.stroke();
                                // arrowhead
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.moveTo(x2 + boxW / 2, centerY + boxH);
                                ctx.lineTo(x2 + boxW / 2 - 5, centerY + boxH + 10);
                                ctx.lineTo(x2 + boxW / 2 + 5, centerY + boxH + 10);
                                ctx.closePath(); ctx.fill();

                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('\u00D7' + (state.j * state.k) + '  (a | c)', (x0 + x2 + boxW) / 2, ay + 40);
                                ctx.globalAlpha = 1;
                            }

                            // Phase text
                            var phaseText = phases[state.phase];
                            ctx.fillStyle = viz.colors.white; ctx.font = '15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(phaseText, 350, 30);

                            // Detailed substitution
                            if (state.phase >= 1) {
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.teal; ctx.textAlign = 'left';
                                ctx.fillText('b = ' + state.a + ' \u00B7 ' + state.j + ' = ' + b, 50, 250);
                            }
                            if (state.phase >= 2) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('c = ' + b + ' \u00B7 ' + state.k + ' = ' + c, 50, 275);
                            }
                            if (state.phase >= 3) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('c = (' + state.a + ' \u00B7 ' + state.j + ') \u00B7 ' + state.k + ' = ' + state.a + ' \u00B7 (' + state.j + ' \u00B7 ' + state.k + ') = ' + state.a + ' \u00B7 ' + (state.j * state.k) + ' = ' + c, 50, 300);
                            }
                            if (state.phase >= 4) {
                                ctx.fillStyle = viz.colors.green; ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('Therefore ' + state.a + ' | ' + c + '  \u25A1', 50, 325);
                            }
                        }

                        draw();

                        VizEngine.createButton(controls, 'Next Step', function() {
                            if (state.phase < phases.length - 1) {
                                state.phase++;
                                draw();
                            }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            state.phase = 0;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'a', 2, 7, state.a, 1, function(v) {
                            state.a = Math.round(v);
                            state.phase = 0;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'j', 1, 5, state.j, 1, function(v) {
                            state.j = Math.round(v);
                            state.phase = 0;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'k', 1, 5, state.k, 1, function(v) {
                            state.k = Math.round(v);
                            state.phase = 0;
                            draw();
                        });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 5: Inequalities ========================
        {
            id: 'sec-inequalities',
            title: 'Proofs About Inequalities',
            content: `
<h2>Proofs About Inequalities</h2>

<p>Direct proofs about inequalities follow the same assume-then-derive pattern, but the algebraic moves are different: instead of factoring to match a definition, we typically add, multiply, or apply known inequalities to build up a chain \\(\\leq\\) or \\(<\\).</p>

<h3>Basic Properties</h3>

<p>Recall the ordering properties of the real numbers that we use freely in proofs:</p>
<ul>
<li>If \\(a < b\\) and \\(c > 0\\), then \\(ac < bc\\).</li>
<li>If \\(a < b\\) and \\(c < 0\\), then \\(ac > bc\\) (the inequality flips).</li>
<li>If \\(a < b\\) and \\(b < c\\), then \\(a < c\\) (transitivity).</li>
<li>For all real \\(x\\), \\(x^2 \\geq 0\\).</li>
</ul>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.8</div>
<div class="env-body">
<p>If \\(0 < a < b\\), then \\(a^2 < b^2\\).</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>Assume \\(0 < a < b\\). Since \\(a > 0\\), multiplying both sides of \\(a < b\\) by \\(a\\) gives \\(a^2 < ab\\). Since \\(b > 0\\), multiplying both sides of \\(a < b\\) by \\(b\\) gives \\(ab < b^2\\). By transitivity, \\(a^2 < ab < b^2\\), so \\(a^2 < b^2\\). \\(\\square\\)</p>
</div>
</div>

<h3>The AM-GM Inequality</h3>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.9 — AM-GM Inequality (Two Variables)</div>
<div class="env-body">
<p>For all non-negative real numbers \\(a\\) and \\(b\\),</p>
\\[\\frac{a + b}{2} \\geq \\sqrt{ab},\\]
<p>with equality if and only if \\(a = b\\).</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>We need to show \\(\\frac{a+b}{2} \\geq \\sqrt{ab}\\). Since both sides are non-negative, this is equivalent to showing \\(\\left(\\frac{a+b}{2}\\right)^2 \\geq ab\\), i.e.,</p>
\\[(a+b)^2 \\geq 4ab.\\]
<p>Expanding: \\((a+b)^2 - 4ab = a^2 + 2ab + b^2 - 4ab = a^2 - 2ab + b^2 = (a-b)^2\\).</p>
<p>Since \\((a-b)^2 \\geq 0\\) for all real numbers, we have \\((a+b)^2 \\geq 4ab\\), which gives \\(\\frac{a+b}{2} \\geq \\sqrt{ab}\\). Equality holds when \\((a-b)^2 = 0\\), i.e., \\(a = b\\). \\(\\square\\)</p>
</div>
</div>

<p>The key technique here is a common inequality trick: express the difference between the two sides as a perfect square, which is automatically non-negative.</p>

<h3>The Triangle Inequality</h3>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.10 — Triangle Inequality</div>
<div class="env-body">
<p>For all real numbers \\(a\\) and \\(b\\),</p>
\\[|a + b| \\leq |a| + |b|.\\]
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>It suffices to show \\((a+b)^2 \\leq (|a| + |b|)^2\\), since both sides are non-negative. Now</p>
\\[(a+b)^2 = a^2 + 2ab + b^2\\]
<p>and</p>
\\[(|a|+|b|)^2 = a^2 + 2|a||b| + b^2.\\]
<p>Since \\(ab \\leq |a||b|\\) (this holds because \\(|ab| = |a||b|\\) and \\(ab \\leq |ab|\\)), we get</p>
\\[a^2 + 2ab + b^2 \\leq a^2 + 2|a||b| + b^2,\\]
<p>i.e., \\((a+b)^2 \\leq (|a|+|b|)^2\\). Taking square roots (preserving the inequality since both sides are non-negative) gives \\(|a+b| \\leq |a| + |b|\\). \\(\\square\\)</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Geometric Meaning</div>
<div class="env-body">
<p>The triangle inequality says that the length of one side of a triangle is at most the sum of the other two sides. If \\(a\\) and \\(b\\) have the same sign, you get equality; if they have opposite signs, \\(|a+b|\\) is strictly less because the contributions partially cancel.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'Prove: If \\(x > 0\\) and \\(y > 0\\), then \\(\\frac{x+y}{2} \\geq \\sqrt{xy}\\) directly by starting from \\((\\sqrt{x} - \\sqrt{y})^2 \\geq 0\\).',
                    hint: 'Expand \\((\\sqrt{x} - \\sqrt{y})^2\\) and rearrange.',
                    solution: '<p><strong>Proof.</strong> Since \\(x, y > 0\\), the square roots exist. We have \\((\\sqrt{x} - \\sqrt{y})^2 \\geq 0\\). Expanding: \\(x - 2\\sqrt{xy} + y \\geq 0\\). Rearranging: \\(x + y \\geq 2\\sqrt{xy}\\), so \\(\\frac{x+y}{2} \\geq \\sqrt{xy}\\). \\(\\square\\)</p>'
                }
            ],
            visualizations: []
        },
        // ======================== Section 6: Writing Good Proofs ========================
        {
            id: 'sec-writing',
            title: 'Writing Good Proofs',
            content: `
<h2>Writing Good Proofs</h2>

<p>A proof is not just a sequence of true statements. It is a piece of <em>writing</em> that must be clear, complete, and logically airtight. This section collects practical advice for writing proofs well.</p>

<h3>Clarity</h3>

<div class="env-block env-intuition">
<div class="env-header">Principle 1: Write in Complete Sentences</div>
<div class="env-body">
<p>A proof is a prose argument, not a pile of equations. Each equation should be introduced by words explaining what you are doing and why. Compare:</p>
<p><em>Bad:</em> \\(n = 2k\\). \\(n^2 = 4k^2 = 2(2k^2)\\). Even.</p>
<p><em>Good:</em> Since \\(n\\) is even, we can write \\(n = 2k\\) for some integer \\(k\\). Then \\(n^2 = (2k)^2 = 4k^2 = 2(2k^2)\\). Since \\(2k^2\\) is an integer, \\(n^2\\) is even.</p>
</div>
</div>

<h3>Rigor</h3>

<div class="env-block env-intuition">
<div class="env-header">Principle 2: Justify Every Step</div>
<div class="env-body">
<p>Every claim in a proof must have a reason. The reason can be a definition, an axiom, a computation, or a previously proven result. If a step is not obvious, say why it holds. If it is obvious, a brief phrase ("since \\(k\\) is an integer") suffices.</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Principle 3: State What You Are Proving</div>
<div class="env-body">
<p>Begin a proof by stating the theorem (or at least summarizing it). The reader should know what you are trying to prove before you prove it. Then clearly indicate the start and end of the proof with "Proof." and "\\(\\square\\)" (the Halmos tombstone).</p>
</div>
</div>

<h3>Common Mistakes</h3>

<div class="viz-placeholder" data-viz="viz-common-mistakes"></div>

<div class="env-block env-warning">
<div class="env-header">Mistake 1: Assuming What You Want to Prove</div>
<div class="env-body">
<p>The most serious error: starting with \\(Q\\) and deriving something true. This is circular reasoning. You must start from \\(P\\) and arrive at \\(Q\\), never the other way around.</p>
</div>
</div>

<div class="env-block env-warning">
<div class="env-header">Mistake 2: Using the Same Variable for Different Quantities</div>
<div class="env-body">
<p>If \\(a\\) and \\(b\\) are both even, writing \\(a = 2k\\) and \\(b = 2k\\) secretly assumes \\(a = b\\). Use different variables: \\(a = 2j\\) and \\(b = 2k\\).</p>
</div>
</div>

<div class="env-block env-warning">
<div class="env-header">Mistake 3: Using Examples Instead of Proof</div>
<div class="env-body">
<p>Checking a few cases is not a proof (unless the theorem is about finitely many cases). "It works for \\(n = 1, 2, 3\\)" does not prove it works for all \\(n\\). A proof must handle every possible case at once, usually by working with a general variable.</p>
</div>
</div>

<div class="env-block env-warning">
<div class="env-header">Mistake 4: Notation Abuse</div>
<div class="env-body">
<p>Define your variables before using them. Do not write "Let \\(n^2 = 4k^2\\)" out of nowhere. Instead: "Since \\(n\\) is even, \\(n = 2k\\) for some integer \\(k\\). Then \\(n^2 = (2k)^2 = 4k^2\\)."</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-proof-template"></div>
`,
            exercises: [
                {
                    question: 'Find the error in the following "proof" that if \\(a\\) and \\(b\\) are even, then \\(a + b\\) is even: "Proof. Let \\(a = 2k\\) and \\(b = 2k\\). Then \\(a + b = 4k = 2(2k)\\), which is even. \\(\\square\\)"',
                    hint: 'What hidden assumption is introduced by using the same variable \\(k\\) for both \\(a\\) and \\(b\\)?',
                    solution: '<p>The error is using the same variable \\(k\\) for both \\(a\\) and \\(b\\), which silently assumes \\(a = b\\). The correct proof uses different variables: \\(a = 2j\\) and \\(b = 2k\\), giving \\(a + b = 2(j + k)\\).</p>'
                },
                {
                    question: 'Find the error in this "proof" that if \\(n^2\\) is even then \\(n\\) is even: "Proof. Assume \\(n\\) is even, so \\(n = 2k\\). Then \\(n^2 = 4k^2 = 2(2k^2)\\), which is even. \\(\\square\\)"',
                    hint: 'Compare what was assumed to what was supposed to be proved. What is the hypothesis and what is the conclusion?',
                    solution: '<p>The "proof" assumes \\(n\\) is even and derives that \\(n^2\\) is even. But the theorem states "if \\(n^2\\) is even, then \\(n\\) is even," which has the hypothesis "\\(n^2\\) is even" and conclusion "\\(n\\) is even." The proof proved the converse! (This theorem actually requires a contrapositive or contradiction proof.)</p>'
                }
            ],
            visualizations: [
                {
                    id: 'viz-common-mistakes',
                    title: 'Spot the Error: Gallery of Bad Proofs',
                    description: 'Read each "proof" and click the button to reveal the error. Can you find it before looking?',
                    setup: function(container, controls) {
                        var wrapper = document.createElement('div');
                        wrapper.style.cssText = 'font-family:-apple-system,sans-serif;color:#c9d1d9;padding:12px;';

                        var badProofs = [
                            {
                                claim: 'If a and b are odd, then a + b is odd.',
                                proof: '"Proof. Let a = 2k+1 and b = 2k+1. Then a + b = 4k+2 = 2(2k+1), which is even. So a+b is odd. \u25A1"',
                                error: 'Two errors: (1) Same variable k for both a and b (assumes a = b). (2) The algebra actually shows a+b is EVEN, not odd, contradicting the (false) claim. The statement itself is false: the sum of two odd numbers is always even.'
                            },
                            {
                                claim: 'If n is an integer, then n\u00B2 \u2265 n.',
                                proof: '"Proof. We need n\u00B2 \u2265 n, i.e., n\u00B2 - n \u2265 0, i.e., n(n-1) \u2265 0. This is true. \u25A1"',
                                error: 'The claim is false (try n = 0.5, though n is restricted to integers, try n = 0: 0 \u2265 0 holds; but for a "proof," saying "this is true" is not a justification. Also n(n-1) \u2265 0 is not always true for integers: it fails for n = 0 (gives 0, OK) but the proof gives no reasoning for WHY it holds. A valid proof must argue by cases or note n(n-1) is a product of consecutive integers hence non-negative.'
                            },
                            {
                                claim: 'For all integers n, if 4 | n then 2 | n.',
                                proof: '"Proof. Let n = 12. Then 4 | 12 since 12 = 4(3), and 2 | 12 since 12 = 2(6). \u25A1"',
                                error: 'Checking one example (n = 12) does not constitute a proof for ALL integers. The proof must use a general n: if n = 4k, then n = 2(2k), so 2 | n.'
                            }
                        ];

                        badProofs.forEach(function(bp, i) {
                            var card = document.createElement('div');
                            card.style.cssText = 'border:1px solid #30363d;border-radius:6px;padding:12px;margin-bottom:12px;background:#0d1117;';

                            var claimEl = document.createElement('div');
                            claimEl.style.cssText = 'font-weight:bold;margin-bottom:6px;font-size:13px;color:#f0883e;';
                            claimEl.textContent = 'Claim: ' + bp.claim;
                            card.appendChild(claimEl);

                            var proofEl = document.createElement('div');
                            proofEl.style.cssText = 'font-size:13px;margin-bottom:8px;color:#c9d1d9;font-style:italic;';
                            proofEl.textContent = bp.proof;
                            card.appendChild(proofEl);

                            var btn = document.createElement('button');
                            btn.textContent = 'Reveal Error';
                            btn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:12px;cursor:pointer;';

                            var errorEl = document.createElement('div');
                            errorEl.style.cssText = 'margin-top:8px;padding:8px;border-left:3px solid #f85149;background:#f8514911;border-radius:3px;font-size:12px;display:none;';
                            errorEl.textContent = bp.error;

                            btn.addEventListener('click', function() {
                                if (errorEl.style.display === 'none') {
                                    errorEl.style.display = 'block';
                                    btn.textContent = 'Hide Error';
                                } else {
                                    errorEl.style.display = 'none';
                                    btn.textContent = 'Reveal Error';
                                }
                            });

                            card.appendChild(btn);
                            card.appendChild(errorEl);
                            wrapper.appendChild(card);
                        });

                        container.appendChild(wrapper);
                        return null;
                    }
                },
                {
                    id: 'viz-proof-template',
                    title: 'Fill-in-the-Blank Proof Template',
                    description: 'Complete the proof by filling in the blanks. Theorem: If n is even, then 5n + 3 is odd.',
                    setup: function(container, controls) {
                        var wrapper = document.createElement('div');
                        wrapper.style.cssText = 'font-family:-apple-system,sans-serif;color:#c9d1d9;padding:12px;';

                        var blanks = [
                            { prompt: 'Assume n is _____.', answer: 'even', id: 'b0' },
                            { prompt: 'By definition, n = _____ for some integer k.', answer: '2k', id: 'b1' },
                            { prompt: 'Then 5n + 3 = 5(2k) + 3 = _____ + 3 = _____.', answer: '10k', answer2: '10k + 3', id: 'b2' },
                            { prompt: 'We rewrite: 10k + 3 = 2(_____) + 1.', answer: '5k + 1', id: 'b3' },
                            { prompt: 'Since 5k + 1 is an integer, 5n + 3 is _____.', answer: 'odd', id: 'b4' }
                        ];

                        var feedbackDiv = document.createElement('div');
                        feedbackDiv.style.cssText = 'margin-top:12px;font-size:14px;min-height:24px;';

                        var formDiv = document.createElement('div');

                        blanks.forEach(function(b) {
                            var row = document.createElement('div');
                            row.style.cssText = 'margin:8px 0;font-size:13px;';
                            var label = document.createElement('span');
                            label.textContent = b.prompt.split('_____')[0];
                            var input = document.createElement('input');
                            input.type = 'text';
                            input.id = b.id;
                            input.style.cssText = 'width:80px;padding:3px 6px;border:1px solid #30363d;border-radius:3px;background:#0d1117;color:#c9d1d9;font-size:13px;margin:0 4px;';
                            var after = document.createElement('span');
                            var parts = b.prompt.split('_____');
                            after.textContent = parts.length > 1 ? parts.slice(1).join('_____') : '';
                            row.appendChild(label);
                            row.appendChild(input);
                            row.appendChild(after);
                            formDiv.appendChild(row);
                        });

                        var checkBtn = document.createElement('button');
                        checkBtn.textContent = 'Check Answers';
                        checkBtn.style.cssText = 'padding:6px 16px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:13px;cursor:pointer;margin-top:8px;';

                        checkBtn.addEventListener('click', function() {
                            var correct = 0;
                            var total = blanks.length;
                            blanks.forEach(function(b) {
                                var input = document.getElementById(b.id);
                                var val = input.value.trim().toLowerCase().replace(/\s+/g, '');
                                var ans = b.answer.toLowerCase().replace(/\s+/g, '');
                                var ans2 = b.answer2 ? b.answer2.toLowerCase().replace(/\s+/g, '') : null;
                                if (val === ans || (ans2 && val === ans2)) {
                                    input.style.borderColor = '#3fb950';
                                    correct++;
                                } else {
                                    input.style.borderColor = '#f85149';
                                }
                            });
                            if (correct === total) {
                                feedbackDiv.textContent = 'All correct! You completed the proof template.';
                                feedbackDiv.style.color = '#3fb950';
                            } else {
                                feedbackDiv.textContent = correct + '/' + total + ' correct. Try again!';
                                feedbackDiv.style.color = '#f0883e';
                            }
                        });

                        var revealBtn = document.createElement('button');
                        revealBtn.textContent = 'Show Answers';
                        revealBtn.style.cssText = 'padding:6px 16px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:13px;cursor:pointer;margin-top:8px;margin-left:8px;';
                        revealBtn.addEventListener('click', function() {
                            blanks.forEach(function(b) {
                                var input = document.getElementById(b.id);
                                input.value = b.answer;
                                input.style.borderColor = '#3fb950';
                            });
                            feedbackDiv.textContent = 'Answers revealed.';
                            feedbackDiv.style.color = '#8b949e';
                        });

                        wrapper.appendChild(formDiv);
                        var btnRow = document.createElement('div');
                        btnRow.appendChild(checkBtn);
                        btnRow.appendChild(revealBtn);
                        wrapper.appendChild(btnRow);
                        wrapper.appendChild(feedbackDiv);
                        container.appendChild(wrapper);
                        return null;
                    }
                }
            ]
        },
        // ======================== Section 7: Bridge ========================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>What We Learned</h2>

<p>In this chapter, we learned the most fundamental proof technique in mathematics: the <strong>direct proof</strong>. The strategy is simple but powerful:</p>

<ol>
<li><strong>Assume</strong> the hypothesis \\(P\\).</li>
<li><strong>Unpack definitions</strong> to translate \\(P\\) into algebra.</li>
<li><strong>Derive</strong> the conclusion \\(Q\\) through a chain of justified steps.</li>
</ol>

<p>We applied this strategy to three families of results:</p>
<ul>
<li><strong>Even and odd numbers:</strong> translate "even" to \\(2k\\) and "odd" to \\(2k+1\\), then compute.</li>
<li><strong>Divisibility:</strong> translate \\(a \\mid b\\) to \\(b = ak\\), then manipulate.</li>
<li><strong>Inequalities:</strong> use ordering properties, known inequalities, and the fact that squares are non-negative.</li>
</ul>

<p>We also discussed how to write proofs clearly: use complete sentences, justify every step, define variables before using them, and avoid the common pitfalls of assuming the conclusion, reusing variable names, or substituting examples for proof.</p>

<h2>Limitations of Direct Proof</h2>

<p>Direct proof is not always the best (or even a feasible) approach. Sometimes the conclusion \\(Q\\) does not lend itself to a clean derivation from \\(P\\). Consider:</p>

<div class="env-block env-example">
<div class="env-header">A Difficult Direct Proof</div>
<div class="env-body">
<p>Prove: If \\(n^2\\) is even, then \\(n\\) is even.</p>
<p>Attempting a direct proof, we assume \\(n^2\\) is even, so \\(n^2 = 2k\\). But how do we extract information about \\(n\\) from this? Taking a square root gives \\(n = \\sqrt{2k}\\), which is not obviously an integer times 2. The direct route is blocked.</p>
</div>
</div>

<p>For such theorems, we need other strategies. In the next chapter, we introduce the <strong>contrapositive proof</strong>: instead of proving "if \\(P\\) then \\(Q\\)," we prove the logically equivalent statement "if not \\(Q\\), then not \\(P\\)." This is often easier because the negation of \\(Q\\) gives us a concrete starting point.</p>

<div class="env-block env-intuition">
<div class="env-header">Preview: Contrapositive Proof</div>
<div class="env-body">
<p>To prove "if \\(n^2\\) is even, then \\(n\\) is even," we can instead prove the contrapositive: "if \\(n\\) is odd, then \\(n^2\\) is odd." This is a direct proof, and we already know how to do it (Theorem 3.1 from this chapter, adapted). The contrapositive approach will open up a whole new class of theorems.</p>
</div>
</div>

<p>Direct proof remains the workhorse of mathematics. Master it thoroughly; every other proof technique either reduces to it or builds upon it.</p>
`,
            exercises: [
                {
                    question: 'Prove directly: If \\(m\\) and \\(n\\) are both even, then \\(mn\\) is divisible by 4.',
                    hint: 'Write \\(m = 2j\\) and \\(n = 2k\\) and multiply.',
                    solution: '<p><strong>Proof.</strong> Assume \\(m\\) and \\(n\\) are even. Then \\(m = 2j\\) and \\(n = 2k\\) for integers \\(j, k\\). So \\(mn = (2j)(2k) = 4jk\\). Since \\(jk\\) is an integer, \\(4 \\mid mn\\). \\(\\square\\)</p>'
                },
                {
                    question: 'Prove: If \\(a \\mid b\\) and \\(b \\mid a\\) with \\(a, b > 0\\), then \\(a = b\\).',
                    hint: 'Write \\(b = aj\\) and \\(a = bk\\), substitute, and use the fact that \\(a > 0\\).',
                    solution: '<p><strong>Proof.</strong> Assume \\(a \\mid b\\) and \\(b \\mid a\\) with \\(a, b > 0\\). Then \\(b = aj\\) and \\(a = bk\\) for positive integers \\(j, k\\). Substituting: \\(a = (aj)k = a(jk)\\). Since \\(a > 0\\), we can divide both sides by \\(a\\) to get \\(1 = jk\\). Since \\(j\\) and \\(k\\) are positive integers whose product is 1, we must have \\(j = k = 1\\). Hence \\(b = a(1) = a\\). \\(\\square\\)</p>'
                },
                {
                    question: 'Prove: For all integers \\(n\\), \\(n^2 + n\\) is even.',
                    hint: 'Factor: \\(n^2 + n = n(n+1)\\). What can you say about consecutive integers?',
                    solution: '<p><strong>Proof.</strong> Let \\(n\\) be an integer. Then \\(n^2 + n = n(n+1)\\). Since \\(n\\) and \\(n+1\\) are consecutive integers, one of them is even. Say the even one equals \\(2k\\). Then \\(n(n+1) = 2k \\cdot (\\text{the other})\\), which is divisible by 2. Hence \\(n^2 + n\\) is even. \\(\\square\\)</p>'
                },
                {
                    question: 'Explain why the following is NOT a valid direct proof of "if \\(n\\) is even, then \\(n + 2\\) is even": "Proof. \\(n + 2\\) is even because \\(4 = 2 + 2\\) is even, \\(6 = 4 + 2\\) is even, \\(8 = 6 + 2\\) is even. \\(\\square\\)"',
                    hint: 'Does checking specific cases prove a universal statement?',
                    solution: '<p>This is proof by example, not a valid proof. Checking \\(n = 2, 4, 6\\) does not establish the result for all even \\(n\\). A valid proof: assume \\(n = 2k\\), then \\(n + 2 = 2k + 2 = 2(k+1)\\), which is even.</p>'
                }
            ],
            visualizations: []
        }
    ]
});
