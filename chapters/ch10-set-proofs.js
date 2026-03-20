// === Chapter 10: Proving Set Identities ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Proving Set Identities',
    subtitle: 'How to prove A = B for sets',
    sections: [
        // ===== SECTION 1: Motivation =====
        {
            id: 'sec-motivation',
            title: 'Why Set Proofs?',
            content: `
<h2>Why Set Proofs?</h2>

<div class="env-block intuition">
<div class="env-title">Sets Meet Proof</div>
<div class="env-body">
<p>In Chapter 9 we learned the language of sets: unions, intersections, complements, differences. We drew Venn diagrams and saw that certain identities <em>look</em> true. For instance, shading \\(A \\cap (B \\cup C)\\) and \\((A \\cap B) \\cup (A \\cap C)\\) on separate diagrams gives the same shaded region. But a picture is not a proof.</p>
<p>Venn diagrams with two or three sets can be suggestive, but they cannot verify an identity that must hold for <em>all</em> sets, in <em>all</em> universes, with <em>any</em> number of elements. This chapter develops the standard technique for proving that two sets are equal, and applies it to the classical identities of set algebra.</p>
</div>
</div>

<p>The core challenge: how do we rigorously show that two sets \\(A\\) and \\(B\\) are the same? We cannot just list their elements; the sets may be defined abstractly (e.g., "\\(A \\cap (B \\cup C)\\)") with no concrete elements at all. We need a strategy that works in full generality.</p>

<div class="env-block definition">
<div class="env-title">Definition 10.1 — Set Equality</div>
<p>Two sets \\(A\\) and \\(B\\) are <strong>equal</strong>, written \\(A = B\\), if and only if they have exactly the same elements:</p>
\\[A = B \\iff (\\forall x,\\; x \\in A \\leftrightarrow x \\in B).\\]
</div>

<p>This definition translates directly into a proof strategy: to show \\(A = B\\), show that every element of \\(A\\) is in \\(B\\) and every element of \\(B\\) is in \\(A\\). In other words, prove <strong>two subset inclusions</strong>:</p>

\\[A = B \\iff (A \\subseteq B) \\text{ and } (B \\subseteq A).\\]

<p>This is the <strong>element method</strong>, sometimes called the "double inclusion" or "mutual containment" method. It is the workhorse technique for set identity proofs. Before we formalize it, let us see the big picture of what we will cover in this chapter:</p>

<ul>
<li><strong>The Element Method</strong>: the standard template for proving \\(A = B\\).</li>
<li><strong>De Morgan's Laws</strong>: the interplay between complements, unions, and intersections.</li>
<li><strong>Distributive Laws</strong>: how \\(\\cap\\) distributes over \\(\\cup\\) and vice versa.</li>
<li><strong>Complement Properties</strong>: double complement, complement of the universe and empty set.</li>
</ul>

<p>Each identity will be proved by the element method, and verified visually with Venn diagrams.</p>
`,
            exercises: []
        },
        // ===== SECTION 2: The Element Method =====
        {
            id: 'sec-element',
            title: 'The Element Method',
            content: `
<h2>The Element Method</h2>

<div class="env-block definition">
<div class="env-title">Definition 10.2 — Subset</div>
<p>We say \\(A \\subseteq B\\) (\\(A\\) is a <strong>subset</strong> of \\(B\\)) if every element of \\(A\\) is also an element of \\(B\\):</p>
\\[A \\subseteq B \\iff (\\forall x,\\; x \\in A \\implies x \\in B).\\]
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 10.1 — Double Inclusion Principle</div>
<p>For any sets \\(A\\) and \\(B\\),</p>
\\[A = B \\iff (A \\subseteq B) \\text{ and } (B \\subseteq A).\\]
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<p><strong>(\\(\\Rightarrow\\))</strong> If \\(A = B\\), then every element of \\(A\\) is in \\(B\\) (so \\(A \\subseteq B\\)) and every element of \\(B\\) is in \\(A\\) (so \\(B \\subseteq A\\)).</p>
<p><strong>(\\(\\Leftarrow\\))</strong> If \\(A \\subseteq B\\) and \\(B \\subseteq A\\), then for any \\(x\\): \\(x \\in A \\implies x \\in B\\) and \\(x \\in B \\implies x \\in A\\). So \\(x \\in A \\iff x \\in B\\), hence \\(A = B\\). \\(\\square\\)</p>
</div>

<p>This gives us a universal <strong>proof template</strong> for set equality:</p>

<div class="env-block example">
<div class="env-title">Template: Proving \\(A = B\\)</div>
<p><strong>Part 1 (\\(A \\subseteq B\\)):</strong> Let \\(x \\in A\\). [Use definitions to show \\(x \\in B\\).] Therefore \\(A \\subseteq B\\).</p>
<p><strong>Part 2 (\\(B \\subseteq A\\)):</strong> Let \\(x \\in B\\). [Use definitions to show \\(x \\in A\\).] Therefore \\(B \\subseteq A\\).</p>
<p>Since \\(A \\subseteq B\\) and \\(B \\subseteq A\\), we conclude \\(A = B\\). \\(\\square\\)</p>
</div>

<p>The next visualization animates this process: we pick a generic element \\(x\\) in one set and trace, step by step, through the definitions to show it lands in the other set.</p>

<div class="viz-placeholder" data-viz="viz-element-method"></div>

<div class="env-block example">
<div class="env-title">Example 10.1</div>
<p>Prove that \\(A \\cap B = B \\cap A\\).</p>
<p><strong>Proof.</strong></p>
<p><strong>(\\(\\subseteq\\)):</strong> Let \\(x \\in A \\cap B\\). By definition, \\(x \\in A\\) and \\(x \\in B\\). Since \\(x \\in B\\) and \\(x \\in A\\), we have \\(x \\in B \\cap A\\).</p>
<p><strong>(\\(\\supseteq\\)):</strong> Let \\(x \\in B \\cap A\\). By definition, \\(x \\in B\\) and \\(x \\in A\\). Since \\(x \\in A\\) and \\(x \\in B\\), we have \\(x \\in A \\cap B\\).</p>
<p>Therefore \\(A \\cap B = B \\cap A\\). \\(\\square\\)</p>
</div>

<div class="env-block example">
<div class="env-title">Example 10.2</div>
<p>Prove that \\(A \\cup (A \\cap B) = A\\). (This is an <em>absorption law</em>.)</p>
<p><strong>Proof.</strong></p>
<p><strong>(\\(\\subseteq\\)):</strong> Let \\(x \\in A \\cup (A \\cap B)\\). Then \\(x \\in A\\) or \\(x \\in A \\cap B\\).</p>
<ul>
<li>Case 1: \\(x \\in A\\). Then \\(x \\in A\\).</li>
<li>Case 2: \\(x \\in A \\cap B\\). Then \\(x \\in A\\) and \\(x \\in B\\), so in particular \\(x \\in A\\).</li>
</ul>
<p>In both cases, \\(x \\in A\\). So \\(A \\cup (A \\cap B) \\subseteq A\\).</p>
<p><strong>(\\(\\supseteq\\)):</strong> Let \\(x \\in A\\). Then \\(x \\in A \\cup (A \\cap B)\\) (since \\(x\\) is in the first component of the union).</p>
<p>Therefore \\(A \\cup (A \\cap B) = A\\). \\(\\square\\)</p>
</div>

<div class="viz-placeholder" data-viz="viz-set-proof-builder"></div>
`,
            visualizations: [
                {
                    id: 'viz-element-method',
                    title: 'The Element Method Animated',
                    description: 'Watch how a generic element \\(x\\) is traced through definitions to prove set equality. Click "Next Step" to advance.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const W = viz.width, H = viz.height;
                        const ctx = viz.ctx;

                        // We'll prove A ∩ (B ∪ C) ⊆ (A ∩ B) ∪ (A ∩ C) step by step
                        const steps = [
                            { text: 'Goal: Show A ∩ (B ∪ C) ⊆ (A ∩ B) ∪ (A ∩ C)', highlight: 'none', xIn: null },
                            { text: 'Let x ∈ A ∩ (B ∪ C).', highlight: 'lhs', xIn: ['A','B∪C'] },
                            { text: 'By definition of ∩: x ∈ A  AND  x ∈ B ∪ C.', highlight: 'split', xIn: ['A','B∪C'] },
                            { text: 'By definition of ∪: x ∈ B  OR  x ∈ C.', highlight: 'cases', xIn: ['A','B or C'] },
                            { text: 'Case 1: x ∈ B. Combined with x ∈ A, so x ∈ A ∩ B.', highlight: 'case1', xIn: ['A∩B'] },
                            { text: 'Case 2: x ∈ C. Combined with x ∈ A, so x ∈ A ∩ C.', highlight: 'case2', xIn: ['A∩C'] },
                            { text: 'Either way, x ∈ (A ∩ B) ∪ (A ∩ C).  ✓', highlight: 'rhs', xIn: ['(A∩B)∪(A∩C)'] },
                        ];

                        let step = 0;

                        const stepLabel = document.createElement('div');
                        stepLabel.style.cssText = 'color:#c9d1d9;font-size:0.82rem;margin-top:8px;min-height:40px;line-height:1.6;font-family:monospace;';
                        body.appendChild(stepLabel);

                        VizEngine.createButton(controls, 'Next Step', () => {
                            step = Math.min(step + 1, steps.length - 1);
                        });
                        VizEngine.createButton(controls, 'Reset', () => { step = 0; });

                        // Venn diagram centers (in pixels)
                        const cA = { x: W * 0.33, y: H * 0.45, r: 90 };
                        const cB = { x: W * 0.53, y: H * 0.35, r: 80 };
                        const cC = { x: W * 0.53, y: H * 0.55, r: 80 };

                        function drawVenn(highlightRegion) {
                            // Draw universe
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(W * 0.1, H * 0.08, W * 0.6, H * 0.8);
                            ctx.fillStyle = viz.colors.text + '44';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('U', W * 0.11, H * 0.16);

                            // Highlight region
                            if (highlightRegion === 'lhs' || highlightRegion === 'split') {
                                // Shade A ∩ (B ∪ C)
                                shadeIntersection(cA, [cB, cC], viz.colors.blue + '33');
                            } else if (highlightRegion === 'case1') {
                                shadeIntersection2(cA, cB, viz.colors.green + '44');
                            } else if (highlightRegion === 'case2') {
                                shadeIntersection2(cA, cC, viz.colors.orange + '44');
                            } else if (highlightRegion === 'rhs') {
                                shadeIntersection2(cA, cB, viz.colors.green + '33');
                                shadeIntersection2(cA, cC, viz.colors.orange + '33');
                            }

                            // Draw circles
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(cA.x, cA.y, cA.r, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cB.x, cB.y, cB.r, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(cC.x, cC.y, cC.r, 0, Math.PI * 2); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.blue; ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('A', cA.x - 55, cA.y);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('B', cB.x + 55, cB.y - 20);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('C', cC.x + 55, cC.y + 20);

                            // Draw the element x moving through regions
                            if (highlightRegion !== 'none') {
                                let xPos, yPos;
                                if (highlightRegion === 'lhs' || highlightRegion === 'split' || highlightRegion === 'cases') {
                                    xPos = (cA.x + cB.x) / 2 - 5;
                                    yPos = cA.y;
                                } else if (highlightRegion === 'case1') {
                                    xPos = (cA.x + cB.x) / 2;
                                    yPos = (cA.y + cB.y) / 2;
                                } else if (highlightRegion === 'case2') {
                                    xPos = (cA.x + cC.x) / 2;
                                    yPos = (cA.y + cC.y) / 2;
                                } else {
                                    xPos = (cA.x + cB.x) / 2;
                                    yPos = cA.y;
                                }
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(xPos, yPos, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.yellow; ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillText('x', xPos, yPos - 12);
                            }
                        }

                        function shadeIntersection(circle, others, color) {
                            // Approximate: pixelwise shading for A ∩ (B ∪ C)
                            ctx.fillStyle = color;
                            for (let py = 0; py < H; py += 3) {
                                for (let px = 0; px < W; px += 3) {
                                    const inA = (px - circle.x) ** 2 + (py - circle.y) ** 2 <= circle.r ** 2;
                                    let inUnion = false;
                                    for (const o of others) {
                                        if ((px - o.x) ** 2 + (py - o.y) ** 2 <= o.r ** 2) { inUnion = true; break; }
                                    }
                                    if (inA && inUnion) ctx.fillRect(px, py, 3, 3);
                                }
                            }
                        }

                        function shadeIntersection2(c1, c2, color) {
                            ctx.fillStyle = color;
                            for (let py = 0; py < H; py += 3) {
                                for (let px = 0; px < W; px += 3) {
                                    const in1 = (px - c1.x) ** 2 + (py - c1.y) ** 2 <= c1.r ** 2;
                                    const in2 = (px - c2.x) ** 2 + (py - c2.y) ** 2 <= c2.r ** 2;
                                    if (in1 && in2) ctx.fillRect(px, py, 3, 3);
                                }
                            }
                        }

                        function draw() {
                            viz.clear();
                            const s = steps[step];
                            drawVenn(s.highlight);

                            // Step indicator
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Step ' + (step + 1) + '/' + steps.length, W - 16, H - 12);

                            stepLabel.textContent = s.text;
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-set-proof-builder',
                    title: 'Set Proof Builder',
                    description: 'Construct a set identity proof step by step. Choose a goal, then select valid logical steps.',
                    setup(body, controls) {
                        const container = document.createElement('div');
                        container.style.cssText = 'color:#c9d1d9;font-size:0.85rem;line-height:1.8;padding:8px;';
                        body.appendChild(container);

                        const proofGoals = [
                            {
                                name: 'A \\cap B = B \\cap A',
                                steps: [
                                    { prompt: 'Start Part 1: Show A ∩ B ⊆ B ∩ A', options: ['Let x ∈ A ∩ B', 'Let x ∈ B ∩ A', 'Assume A = B'], correct: 0 },
                                    { prompt: 'What does x ∈ A ∩ B mean?', options: ['x ∈ A or x ∈ B', 'x ∈ A and x ∈ B', 'x ∉ A and x ∉ B'], correct: 1 },
                                    { prompt: 'So x ∈ A and x ∈ B. Reorder:', options: ['x ∈ B and x ∈ A', 'x ∈ A or x ∈ B', 'x ∉ A'], correct: 0 },
                                    { prompt: 'Therefore:', options: ['x ∈ B ∩ A  ✓', 'x ∈ B ∪ A', 'x ∉ A ∩ B'], correct: 0 },
                                ]
                            },
                            {
                                name: 'A \\cup \\varnothing = A',
                                steps: [
                                    { prompt: 'Start Part 1: Show A ∪ ∅ ⊆ A', options: ['Let x ∈ A ∪ ∅', 'Let x ∈ A', 'Let x ∈ ∅'], correct: 0 },
                                    { prompt: 'x ∈ A ∪ ∅ means:', options: ['x ∈ A and x ∈ ∅', 'x ∈ A or x ∈ ∅', 'x ∉ A'], correct: 1 },
                                    { prompt: 'Can x ∈ ∅?', options: ['Yes, always', 'No, ∅ has no elements', 'Only if x = 0'], correct: 1 },
                                    { prompt: 'So x ∈ A. For Part 2: Let x ∈ A. Then:', options: ['x ∈ A ∪ ∅ since x ∈ A  ✓', 'x ∈ ∅', 'x ∉ A ∪ ∅'], correct: 0 },
                                ]
                            },
                        ];

                        let goalIdx = 0;
                        let stepIdx = 0;
                        let proofLog = [];

                        function render() {
                            const goal = proofGoals[goalIdx];
                            let html = '<div style="margin-bottom:10px;"><strong>Goal:</strong> Prove ' + goal.name + '</div>';
                            html += '<div style="border-left:2px solid #30363d;padding-left:12px;margin-bottom:10px;">';
                            for (const line of proofLog) {
                                html += '<div style="color:' + (line.ok ? '#3fb950' : '#f85149') + ';">' + (line.ok ? '✓ ' : '✗ ') + line.text + '</div>';
                            }
                            html += '</div>';

                            if (stepIdx < goal.steps.length) {
                                const s = goal.steps[stepIdx];
                                html += '<div style="margin-bottom:8px;"><em>' + s.prompt + '</em></div>';
                                s.options.forEach((opt, i) => {
                                    html += '<button class="proof-opt" data-i="' + i + '" style="display:block;margin:4px 0;padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;cursor:pointer;font-size:0.82rem;">' + opt + '</button>';
                                });
                            } else {
                                html += '<div style="color:#3fb950;font-weight:bold;margin-top:8px;">Proof complete! ■</div>';
                            }
                            container.innerHTML = html;

                            container.querySelectorAll('.proof-opt').forEach(btn => {
                                btn.addEventListener('click', () => {
                                    const i = parseInt(btn.getAttribute('data-i'));
                                    const s = goal.steps[stepIdx];
                                    const ok = i === s.correct;
                                    proofLog.push({ text: s.options[i], ok });
                                    if (ok) stepIdx++;
                                    render();
                                });
                            });
                        }

                        // Goal selector
                        const sel = document.createElement('select');
                        sel.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;margin-right:8px;';
                        proofGoals.forEach((g, i) => {
                            const opt = document.createElement('option');
                            opt.value = i;
                            opt.textContent = g.name.replace(/\\varnothing/g, '∅').replace(/\\cap/g, '∩').replace(/\\cup/g, '∪');
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', () => {
                            goalIdx = parseInt(sel.value);
                            stepIdx = 0;
                            proofLog = [];
                            render();
                        });
                        controls.appendChild(sel);

                        VizEngine.createButton(controls, 'Reset', () => {
                            stepIdx = 0;
                            proofLog = [];
                            render();
                        });

                        render();
                        return null;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(A \\cup B = B \\cup A\\) using the element method.',
                    hint: 'Follow the same template as the proof of \\(A \\cap B = B \\cap A\\), but use "or" instead of "and".',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in A \\cup B\\). Then \\(x \\in A\\) or \\(x \\in B\\). So \\(x \\in B\\) or \\(x \\in A\\), i.e., \\(x \\in B \\cup A\\). <em>(\\(\\supseteq\\))</em>: Symmetric argument. \\(\\square\\)'
                },
                {
                    question: 'Prove that \\(A \\cap \\varnothing = \\varnothing\\).',
                    hint: 'One direction is trivially true since \\(\\varnothing \\subseteq X\\) for any set \\(X\\). For the other, if \\(x \\in A \\cap \\varnothing\\), then \\(x \\in \\varnothing\\), which is a contradiction.',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in A \\cap \\varnothing\\). Then \\(x \\in A\\) and \\(x \\in \\varnothing\\). But \\(\\varnothing\\) has no elements, contradiction. So \\(A \\cap \\varnothing = \\varnothing\\) vacuously. <em>(\\(\\supseteq\\))</em>: \\(\\varnothing \\subseteq A \\cap \\varnothing\\) because the empty set is a subset of every set. \\(\\square\\)'
                },
                {
                    question: 'Prove that if \\(A \\subseteq B\\), then \\(A \\cup B = B\\).',
                    hint: 'One direction: every element of \\(B\\) is in \\(A \\cup B\\). Other direction: if \\(x \\in A \\cup B\\), consider two cases.',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in A \\cup B\\). Case 1: \\(x \\in A\\). Since \\(A \\subseteq B\\), \\(x \\in B\\). Case 2: \\(x \\in B\\). Either way \\(x \\in B\\). <em>(\\(\\supseteq\\))</em>: Let \\(x \\in B\\). Then \\(x \\in A \\cup B\\). \\(\\square\\)'
                }
            ]
        },
        // ===== SECTION 3: De Morgan's Laws =====
        {
            id: 'sec-de-morgan',
            title: "De Morgan's Laws for Sets",
            content: `
<h2>De Morgan's Laws for Sets</h2>

<div class="env-block intuition">
<div class="env-title">Negating Unions and Intersections</div>
<div class="env-body">
<p>In Chapter 0, we met De Morgan's laws for logic: \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\) and \\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\). These have exact parallels for sets, where "\\(\\neg\\)" becomes complement, "\\(\\land\\)" becomes \\(\\cap\\), and "\\(\\lor\\)" becomes \\(\\cup\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 10.2 — De Morgan's Laws for Sets</div>
<p>Let \\(A\\) and \\(B\\) be subsets of a universal set \\(U\\). Then:</p>
<ol>
<li>\\(\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}\\)</li>
<li>\\(\\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}\\)</li>
</ol>
</div>

<p>Let us prove the first law in full detail. This proof is a model that you should study carefully; every set identity proof follows the same rhythm.</p>

<div class="env-block proof">
<div class="env-title">Proof of (1): \\(\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}\\)</div>
<p><strong>Part 1 (\\(\\subseteq\\)):</strong> Let \\(x \\in \\overline{A \\cup B}\\).</p>
<p>By definition of complement, \\(x \\notin A \\cup B\\).</p>
<p>By definition of union, it is <em>not</em> the case that (\\(x \\in A\\) or \\(x \\in B\\)).</p>
<p>By De Morgan's law for logic, \\(x \\notin A\\) <em>and</em> \\(x \\notin B\\).</p>
<p>By definition of complement, \\(x \\in \\bar{A}\\) and \\(x \\in \\bar{B}\\).</p>
<p>By definition of intersection, \\(x \\in \\bar{A} \\cap \\bar{B}\\).</p>
<p><strong>Part 2 (\\(\\supseteq\\)):</strong> Let \\(x \\in \\bar{A} \\cap \\bar{B}\\).</p>
<p>By definition of intersection, \\(x \\in \\bar{A}\\) and \\(x \\in \\bar{B}\\).</p>
<p>By definition of complement, \\(x \\notin A\\) and \\(x \\notin B\\).</p>
<p>By De Morgan's law for logic, it is not the case that (\\(x \\in A\\) or \\(x \\in B\\)).</p>
<p>By definition of union, \\(x \\notin A \\cup B\\).</p>
<p>By definition of complement, \\(x \\in \\overline{A \\cup B}\\).</p>
<p>Since both inclusions hold, \\(\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}\\). \\(\\square\\)</p>
</div>

<div class="viz-placeholder" data-viz="viz-de-morgan-proof"></div>

<div class="env-block remark">
<div class="env-title">Observation</div>
<p>Notice how each line of the proof applies exactly one definition. This is the key discipline: <strong>unpack one definition at a time</strong>. The logical connectives (and, or, not) form a bridge between set operations (\\(\\cap, \\cup, \\overline{\\phantom{X}}\\)) and propositional logic.</p>
</div>

<div class="env-block example">
<div class="env-title">Example 10.3 — Proof of (2): \\(\\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}\\)</div>
<p><strong>(\\(\\subseteq\\)):</strong> Let \\(x \\in \\overline{A \\cap B}\\). Then \\(x \\notin A \\cap B\\), so it is not the case that (\\(x \\in A\\) and \\(x \\in B\\)). By De Morgan for logic, \\(x \\notin A\\) or \\(x \\notin B\\). So \\(x \\in \\bar{A}\\) or \\(x \\in \\bar{B}\\), hence \\(x \\in \\bar{A} \\cup \\bar{B}\\).</p>
<p><strong>(\\(\\supseteq\\)):</strong> Let \\(x \\in \\bar{A} \\cup \\bar{B}\\). Then \\(x \\in \\bar{A}\\) or \\(x \\in \\bar{B}\\), so \\(x \\notin A\\) or \\(x \\notin B\\). Hence not (\\(x \\in A\\) and \\(x \\in B\\)), so \\(x \\notin A \\cap B\\), i.e., \\(x \\in \\overline{A \\cap B}\\). \\(\\square\\)</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-de-morgan-proof',
                    title: "De Morgan's Law: Step-by-Step",
                    description: 'Follow the proof that \\(\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}\\). Each step highlights the corresponding region on the Venn diagram.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const W = viz.width, H = viz.height;
                        const ctx = viz.ctx;

                        const cA = { x: W * 0.32, y: H * 0.48, r: 95 };
                        const cB = { x: W * 0.52, y: H * 0.48, r: 95 };
                        const uRect = { x: W * 0.08, y: H * 0.08, w: W * 0.64, h: H * 0.84 };

                        const steps = [
                            { text: 'LHS: Complement of A ∪ B', shade: 'comp-union' },
                            { text: 'x ∉ A ∪ B means: x ∉ A and x ∉ B', shade: 'comp-union' },
                            { text: 'x ∉ A means x ∈ A\u0305 (complement of A)', shade: 'comp-A' },
                            { text: 'x ∉ B means x ∈ B\u0305 (complement of B)', shade: 'comp-B' },
                            { text: 'RHS: A\u0305 ∩ B\u0305 = elements in BOTH complements', shade: 'comp-A-inter-comp-B' },
                            { text: 'The shaded regions match! ✓', shade: 'comp-union' },
                        ];

                        let step = 0;

                        const stepLabel = document.createElement('div');
                        stepLabel.style.cssText = 'color:#c9d1d9;font-size:0.82rem;margin-top:8px;min-height:30px;line-height:1.6;font-family:monospace;';
                        body.appendChild(stepLabel);

                        VizEngine.createButton(controls, 'Prev', () => { step = Math.max(0, step - 1); });
                        VizEngine.createButton(controls, 'Next', () => { step = Math.min(steps.length - 1, step + 1); });

                        function inCircle(px, py, c) {
                            return (px - c.x) ** 2 + (py - c.y) ** 2 <= c.r ** 2;
                        }
                        function inU(px, py) {
                            return px >= uRect.x && px <= uRect.x + uRect.w && py >= uRect.y && py <= uRect.y + uRect.h;
                        }

                        function shadeRegion(test, color) {
                            ctx.fillStyle = color;
                            for (let py = 0; py < H; py += 3) {
                                for (let px = 0; px < W; px += 3) {
                                    if (test(px, py)) ctx.fillRect(px, py, 3, 3);
                                }
                            }
                        }

                        function draw() {
                            viz.clear();
                            const s = steps[step];

                            // Shade region based on step
                            if (s.shade === 'comp-union') {
                                shadeRegion((px, py) => inU(px, py) && !inCircle(px, py, cA) && !inCircle(px, py, cB), viz.colors.purple + '44');
                            } else if (s.shade === 'comp-A') {
                                shadeRegion((px, py) => inU(px, py) && !inCircle(px, py, cA), viz.colors.blue + '33');
                            } else if (s.shade === 'comp-B') {
                                shadeRegion((px, py) => inU(px, py) && !inCircle(px, py, cB), viz.colors.teal + '33');
                            } else if (s.shade === 'comp-A-inter-comp-B') {
                                shadeRegion((px, py) => inU(px, py) && !inCircle(px, py, cA) && !inCircle(px, py, cB), viz.colors.green + '55');
                            }

                            // Universe box
                            ctx.strokeStyle = viz.colors.text + '66'; ctx.lineWidth = 1.5;
                            ctx.strokeRect(uRect.x, uRect.y, uRect.w, uRect.h);
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('U', uRect.x + 4, uRect.y + 14);

                            // Circles
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(cA.x, cA.y, cA.r, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cB.x, cB.y, cB.r, 0, Math.PI * 2); ctx.stroke();

                            ctx.fillStyle = viz.colors.blue; ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('A', cA.x - 60, cA.y);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('B', cB.x + 60, cB.y);

                            // Step counter
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Step ' + (step + 1) + '/' + steps.length, W - 16, H - 12);

                            stepLabel.textContent = s.text;
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(\\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}\\) by the element method. (Write out both inclusions in full.)',
                    hint: 'Start with "Let \\(x \\in \\overline{A \\cap B}\\)." Then \\(x \\notin A \\cap B\\), meaning it is not the case that (\\(x \\in A\\) and \\(x \\in B\\)).',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in \\overline{A \\cap B}\\). Then \\(x \\notin A \\cap B\\), so \\(\\neg(x \\in A \\land x \\in B)\\). By De Morgan for logic, \\(x \\notin A\\) or \\(x \\notin B\\). So \\(x \\in \\bar{A}\\) or \\(x \\in \\bar{B}\\), hence \\(x \\in \\bar{A} \\cup \\bar{B}\\). <em>(\\(\\supseteq\\))</em>: Let \\(x \\in \\bar{A} \\cup \\bar{B}\\). Then \\(x \\notin A\\) or \\(x \\notin B\\), so \\(\\neg(x \\in A \\land x \\in B)\\), meaning \\(x \\notin A \\cap B\\), i.e., \\(x \\in \\overline{A \\cap B}\\). \\(\\square\\)'
                },
                {
                    question: 'Using De Morgan\'s laws, simplify \\(\\overline{\\bar{A} \\cup B}\\).',
                    hint: 'Apply De Morgan: complement of a union becomes intersection of complements. What is \\(\\overline{\\bar{A}}\\)?',
                    solution: 'By De Morgan: \\(\\overline{\\bar{A} \\cup B} = \\overline{\\bar{A}} \\cap \\bar{B} = A \\cap \\bar{B}\\). (The double complement \\(\\overline{\\bar{A}} = A\\) by Theorem 10.4.)'
                }
            ]
        },
        // ===== SECTION 4: Distributive Laws =====
        {
            id: 'sec-distributive',
            title: 'Distributive Laws',
            content: `
<h2>Distributive Laws</h2>

<div class="env-block intuition">
<div class="env-title">Distributing \\(\\cap\\) over \\(\\cup\\) and Vice Versa</div>
<div class="env-body">
<p>In arithmetic, multiplication distributes over addition: \\(a \\cdot (b + c) = ab + ac\\). Set operations satisfy analogous distributive laws, but with a twist: <em>both</em> \\(\\cap\\) and \\(\\cup\\) distribute over each other. (In contrast, addition does not distribute over multiplication.)</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 10.3 — Distributive Laws</div>
<p>For any sets \\(A, B, C\\):</p>
<ol>
<li>\\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\)</li>
<li>\\(A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)\\)</li>
</ol>
</div>

<div class="env-block proof">
<div class="env-title">Proof of (1): \\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\)</div>
<p><strong>(\\(\\subseteq\\)):</strong> Let \\(x \\in A \\cap (B \\cup C)\\). Then \\(x \\in A\\) and \\(x \\in B \\cup C\\).</p>
<p>Since \\(x \\in B \\cup C\\), either \\(x \\in B\\) or \\(x \\in C\\).</p>
<p><strong>Case 1:</strong> \\(x \\in B\\). Since \\(x \\in A\\) and \\(x \\in B\\), we get \\(x \\in A \\cap B\\), so \\(x \\in (A \\cap B) \\cup (A \\cap C)\\).</p>
<p><strong>Case 2:</strong> \\(x \\in C\\). Since \\(x \\in A\\) and \\(x \\in C\\), we get \\(x \\in A \\cap C\\), so \\(x \\in (A \\cap B) \\cup (A \\cap C)\\).</p>
<p><strong>(\\(\\supseteq\\)):</strong> Let \\(x \\in (A \\cap B) \\cup (A \\cap C)\\). Then \\(x \\in A \\cap B\\) or \\(x \\in A \\cap C\\).</p>
<p><strong>Case 1:</strong> \\(x \\in A \\cap B\\). Then \\(x \\in A\\) and \\(x \\in B\\). Since \\(x \\in B\\), we have \\(x \\in B \\cup C\\). So \\(x \\in A \\cap (B \\cup C)\\).</p>
<p><strong>Case 2:</strong> \\(x \\in A \\cap C\\). Then \\(x \\in A\\) and \\(x \\in C\\). Since \\(x \\in C\\), we have \\(x \\in B \\cup C\\). So \\(x \\in A \\cap (B \\cup C)\\).</p>
<p>Therefore \\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\). \\(\\square\\)</p>
</div>

<div class="viz-placeholder" data-viz="viz-distributive-proof"></div>

<div class="env-block remark">
<div class="env-title">Pattern Recognition</div>
<p>Notice the proof structure: the \\(\\subseteq\\) direction requires a <strong>case split</strong> because the LHS contains a union (\\(B \\cup C\\)). The \\(\\supseteq\\) direction also splits into cases because the RHS is a union. This is a recurring theme: <strong>unions produce case splits</strong>; <strong>intersections give you both facts simultaneously</strong>.</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-distributive-proof',
                    title: 'Distributive Law Visualization',
                    description: 'Step through the proof that \\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\). The Venn diagram shades each side so you can see they match.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const W = viz.width, H = viz.height;
                        const ctx = viz.ctx;

                        const cA = { x: W * 0.28, y: H * 0.48, r: 100 };
                        const cB = { x: W * 0.48, y: H * 0.35, r: 82 };
                        const cC = { x: W * 0.48, y: H * 0.61, r: 82 };

                        const views = [
                            { label: 'LHS: A ∩ (B ∪ C)', test: (px, py) => inC(px, py, cA) && (inC(px, py, cB) || inC(px, py, cC)), color: viz.colors.blue },
                            { label: 'A ∩ B', test: (px, py) => inC(px, py, cA) && inC(px, py, cB), color: viz.colors.green },
                            { label: 'A ∩ C', test: (px, py) => inC(px, py, cA) && inC(px, py, cC), color: viz.colors.orange },
                            { label: 'RHS: (A ∩ B) ∪ (A ∩ C)', test: (px, py) => (inC(px, py, cA) && inC(px, py, cB)) || (inC(px, py, cA) && inC(px, py, cC)), color: viz.colors.purple },
                        ];

                        let viewIdx = 0;

                        function inC(px, py, c) { return (px - c.x) ** 2 + (py - c.y) ** 2 <= c.r ** 2; }

                        VizEngine.createButton(controls, 'LHS', () => { viewIdx = 0; });
                        VizEngine.createButton(controls, 'A∩B', () => { viewIdx = 1; });
                        VizEngine.createButton(controls, 'A∩C', () => { viewIdx = 2; });
                        VizEngine.createButton(controls, 'RHS', () => { viewIdx = 3; });

                        function draw() {
                            viz.clear();
                            const v = views[viewIdx];

                            // Shade
                            ctx.fillStyle = v.color + '44';
                            for (let py = 0; py < H; py += 3) {
                                for (let px = 0; px < W; px += 3) {
                                    if (v.test(px, py)) ctx.fillRect(px, py, 3, 3);
                                }
                            }

                            // Circles
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(cA.x, cA.y, cA.r, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cB.x, cB.y, cB.r, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(cC.x, cC.y, cC.r, 0, Math.PI * 2); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.blue; ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('A', cA.x - 65, cA.y);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('B', cB.x + 55, cB.y - 25);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('C', cC.x + 55, cC.y + 25);

                            // Current view label
                            ctx.fillStyle = v.color; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(v.label, W / 2, H - 16);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the second distributive law: \\(A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)\\).',
                    hint: 'For \\(\\subseteq\\): let \\(x \\in A \\cup (B \\cap C)\\). Case 1: \\(x \\in A\\). Then \\(x \\in A \\cup B\\) and \\(x \\in A \\cup C\\). Case 2: \\(x \\in B \\cap C\\). Then \\(x \\in B\\) and \\(x \\in C\\), so \\(x \\in A \\cup B\\) and \\(x \\in A \\cup C\\).',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in A \\cup (B \\cap C)\\). Case 1: \\(x \\in A\\). Then \\(x \\in A \\cup B\\) and \\(x \\in A \\cup C\\), so \\(x \\in (A \\cup B) \\cap (A \\cup C)\\). Case 2: \\(x \\in B \\cap C\\). Then \\(x \\in B\\) and \\(x \\in C\\). So \\(x \\in A \\cup B\\) and \\(x \\in A \\cup C\\), hence \\(x \\in (A \\cup B) \\cap (A \\cup C)\\). <em>(\\(\\supseteq\\))</em>: Let \\(x \\in (A \\cup B) \\cap (A \\cup C)\\). Then \\(x \\in A \\cup B\\) and \\(x \\in A \\cup C\\). If \\(x \\in A\\), done. If \\(x \\notin A\\), then from \\(x \\in A \\cup B\\) we get \\(x \\in B\\), and from \\(x \\in A \\cup C\\) we get \\(x \\in C\\). So \\(x \\in B \\cap C\\), hence \\(x \\in A \\cup (B \\cap C)\\). \\(\\square\\)'
                },
                {
                    question: 'Does \\(\\cup\\) distribute over set difference? That is, does \\(A \\cup (B \\setminus C) = (A \\cup B) \\setminus (A \\cup C)\\) hold in general?',
                    hint: 'Try a counterexample. Let \\(A = \\{1\\}, B = \\{1, 2\\}, C = \\{1\\}\\).',
                    solution: 'No. Counterexample: \\(A = \\{1\\}, B = \\{1,2\\}, C = \\{1\\}\\). LHS: \\(A \\cup (B \\setminus C) = \\{1\\} \\cup \\{2\\} = \\{1,2\\}\\). RHS: \\((A \\cup B) \\setminus (A \\cup C) = \\{1,2\\} \\setminus \\{1\\} = \\{2\\}\\). Since \\(\\{1,2\\} \\neq \\{2\\}\\), the identity fails.'
                }
            ]
        },
        // ===== SECTION 5: Complement Properties =====
        {
            id: 'sec-complement',
            title: 'Complement Properties',
            content: `
<h2>Complement Properties</h2>

<p>The complement operation interacts cleanly with the universal set \\(U\\) and the empty set \\(\\varnothing\\). These identities round out the algebraic toolkit for set proofs.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 10.4 — Complement Properties</div>
<p>Let \\(A\\) be a subset of a universal set \\(U\\). Then:</p>
<ol>
<li>\\(\\overline{\\bar{A}} = A\\) (double complement)</li>
<li>\\(A \\cup \\bar{A} = U\\) (complement law for union)</li>
<li>\\(A \\cap \\bar{A} = \\varnothing\\) (complement law for intersection)</li>
<li>\\(\\bar{U} = \\varnothing\\) and \\(\\bar{\\varnothing} = U\\)</li>
</ol>
</div>

<div class="env-block proof">
<div class="env-title">Proof of (1): \\(\\overline{\\bar{A}} = A\\)</div>
<p><strong>(\\(\\subseteq\\)):</strong> Let \\(x \\in \\overline{\\bar{A}}\\). By definition, \\(x \\notin \\bar{A}\\). By definition of \\(\\bar{A}\\), it is <em>not</em> the case that \\(x \\notin A\\). In other words, \\(x \\in A\\).</p>
<p><strong>(\\(\\supseteq\\)):</strong> Let \\(x \\in A\\). Then \\(x \\notin \\bar{A}\\) (since \\(\\bar{A}\\) consists of elements <em>not</em> in \\(A\\)). By definition, \\(x \\in \\overline{\\bar{A}}\\).</p>
<p>So \\(\\overline{\\bar{A}} = A\\). \\(\\square\\)</p>
</div>

<div class="env-block proof">
<div class="env-title">Proof of (2): \\(A \\cup \\bar{A} = U\\)</div>
<p><strong>(\\(\\subseteq\\)):</strong> Every element of \\(A \\cup \\bar{A}\\) is an element of \\(U\\) (since \\(A \\subseteq U\\) and \\(\\bar{A} \\subseteq U\\)).</p>
<p><strong>(\\(\\supseteq\\)):</strong> Let \\(x \\in U\\). Either \\(x \\in A\\) or \\(x \\notin A\\). If \\(x \\notin A\\), then \\(x \\in \\bar{A}\\). Either way, \\(x \\in A \\cup \\bar{A}\\). \\(\\square\\)</p>
</div>

<div class="env-block proof">
<div class="env-title">Proof of (3): \\(A \\cap \\bar{A} = \\varnothing\\)</div>
<p>Suppose for contradiction that \\(x \\in A \\cap \\bar{A}\\). Then \\(x \\in A\\) and \\(x \\in \\bar{A}\\). But \\(x \\in \\bar{A}\\) means \\(x \\notin A\\). This is a contradiction, so no such \\(x\\) exists. Therefore \\(A \\cap \\bar{A} = \\varnothing\\). \\(\\square\\)</p>
</div>

<div class="viz-placeholder" data-viz="viz-venn-verification"></div>

<div class="env-block theorem">
<div class="env-title">Theorem 10.5 — Set Algebra Summary</div>
<p>For subsets \\(A, B, C\\) of a universal set \\(U\\):</p>
<table style="width:100%;border-collapse:collapse;color:#c9d1d9;font-size:0.9rem;">
<tr><th style="text-align:left;padding:4px 8px;border-bottom:1px solid #30363d;">Law</th><th style="text-align:left;padding:4px 8px;border-bottom:1px solid #30363d;">Identity</th></tr>
<tr><td style="padding:4px 8px;">Commutative</td><td style="padding:4px 8px;">\\(A \\cup B = B \\cup A\\), \\(A \\cap B = B \\cap A\\)</td></tr>
<tr><td style="padding:4px 8px;">Associative</td><td style="padding:4px 8px;">\\(A \\cup (B \\cup C) = (A \\cup B) \\cup C\\), \\(A \\cap (B \\cap C) = (A \\cap B) \\cap C\\)</td></tr>
<tr><td style="padding:4px 8px;">Distributive</td><td style="padding:4px 8px;">\\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\), \\(A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)\\)</td></tr>
<tr><td style="padding:4px 8px;">Identity</td><td style="padding:4px 8px;">\\(A \\cup \\varnothing = A\\), \\(A \\cap U = A\\)</td></tr>
<tr><td style="padding:4px 8px;">Complement</td><td style="padding:4px 8px;">\\(A \\cup \\bar{A} = U\\), \\(A \\cap \\bar{A} = \\varnothing\\)</td></tr>
<tr><td style="padding:4px 8px;">De Morgan</td><td style="padding:4px 8px;">\\(\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}\\), \\(\\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}\\)</td></tr>
<tr><td style="padding:4px 8px;">Absorption</td><td style="padding:4px 8px;">\\(A \\cup (A \\cap B) = A\\), \\(A \\cap (A \\cup B) = A\\)</td></tr>
<tr><td style="padding:4px 8px;">Double Complement</td><td style="padding:4px 8px;">\\(\\overline{\\bar{A}} = A\\)</td></tr>
</table>
</div>
`,
            visualizations: [
                {
                    id: 'viz-venn-verification',
                    title: 'Venn Diagram Verification',
                    description: 'Select a set identity and see both sides shaded on Venn diagrams. The matching regions confirm (but do not prove!) the identity.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const W = viz.width, H = viz.height;
                        const ctx = viz.ctx;

                        // Two-set Venn for most identities
                        const cA = { x: W * 0.30, y: H * 0.5, r: 88 };
                        const cB = { x: W * 0.50, y: H * 0.5, r: 88 };
                        const uRect = { x: W * 0.06, y: H * 0.08, w: W * 0.68, h: H * 0.84 };

                        function inC(px, py, c) { return (px - c.x) ** 2 + (py - c.y) ** 2 <= c.r ** 2; }
                        function inU(px, py) { return px >= uRect.x && px <= uRect.x + uRect.w && py >= uRect.y && py <= uRect.y + uRect.h; }

                        const identities = [
                            {
                                name: 'De Morgan 1',
                                lhs: 'Comp(A ∪ B)',
                                rhs: 'Comp(A) ∩ Comp(B)',
                                lhsTest: (px, py) => inU(px, py) && !inC(px, py, cA) && !inC(px, py, cB),
                                rhsTest: (px, py) => inU(px, py) && !inC(px, py, cA) && !inC(px, py, cB),
                            },
                            {
                                name: 'De Morgan 2',
                                lhs: 'Comp(A ∩ B)',
                                rhs: 'Comp(A) ∪ Comp(B)',
                                lhsTest: (px, py) => inU(px, py) && !(inC(px, py, cA) && inC(px, py, cB)),
                                rhsTest: (px, py) => inU(px, py) && (!inC(px, py, cA) || !inC(px, py, cB)),
                            },
                            {
                                name: 'Double Complement',
                                lhs: 'Comp(Comp(A))',
                                rhs: 'A',
                                lhsTest: (px, py) => inC(px, py, cA),
                                rhsTest: (px, py) => inC(px, py, cA),
                            },
                            {
                                name: 'A ∪ Comp(A) = U',
                                lhs: 'A ∪ Comp(A)',
                                rhs: 'U',
                                lhsTest: (px, py) => inU(px, py),
                                rhsTest: (px, py) => inU(px, py),
                            },
                            {
                                name: 'A ∩ Comp(A) = ∅',
                                lhs: 'A ∩ Comp(A)',
                                rhs: '∅',
                                lhsTest: () => false,
                                rhsTest: () => false,
                            },
                            {
                                name: 'Absorption',
                                lhs: 'A ∪ (A ∩ B)',
                                rhs: 'A',
                                lhsTest: (px, py) => inC(px, py, cA),
                                rhsTest: (px, py) => inC(px, py, cA),
                            },
                        ];

                        let idIdx = 0;
                        let showSide = 'lhs'; // 'lhs' or 'rhs'

                        const sel = document.createElement('select');
                        sel.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;margin-right:8px;';
                        identities.forEach((id, i) => {
                            const opt = document.createElement('option');
                            opt.value = i; opt.textContent = id.name;
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', () => { idIdx = parseInt(sel.value); });
                        controls.appendChild(sel);

                        VizEngine.createButton(controls, 'LHS', () => { showSide = 'lhs'; });
                        VizEngine.createButton(controls, 'RHS', () => { showSide = 'rhs'; });
                        VizEngine.createButton(controls, 'Both', () => { showSide = 'both'; });

                        function draw() {
                            viz.clear();
                            const id = identities[idIdx];
                            const test = showSide === 'rhs' ? id.rhsTest : id.lhsTest;
                            const color = showSide === 'rhs' ? viz.colors.teal : viz.colors.blue;

                            if (showSide === 'both') {
                                // Shade LHS in blue, RHS in teal; overlap = both
                                ctx.fillStyle = viz.colors.blue + '33';
                                for (let py = 0; py < H; py += 3) {
                                    for (let px = 0; px < W; px += 3) {
                                        if (id.lhsTest(px, py)) ctx.fillRect(px, py, 3, 3);
                                    }
                                }
                                ctx.fillStyle = viz.colors.teal + '33';
                                for (let py = 0; py < H; py += 3) {
                                    for (let px = 0; px < W; px += 3) {
                                        if (id.rhsTest(px, py)) ctx.fillRect(px, py, 3, 3);
                                    }
                                }
                            } else {
                                ctx.fillStyle = color + '44';
                                for (let py = 0; py < H; py += 3) {
                                    for (let px = 0; px < W; px += 3) {
                                        if (test(px, py)) ctx.fillRect(px, py, 3, 3);
                                    }
                                }
                            }

                            // Universe
                            ctx.strokeStyle = viz.colors.text + '66'; ctx.lineWidth = 1.5;
                            ctx.strokeRect(uRect.x, uRect.y, uRect.w, uRect.h);
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('U', uRect.x + 4, uRect.y + 14);

                            // Circles
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(cA.x, cA.y, cA.r, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cB.x, cB.y, cB.r, 0, Math.PI * 2); ctx.stroke();

                            ctx.fillStyle = viz.colors.blue; ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('A', cA.x - 55, cA.y);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('B', cB.x + 55, cB.y);

                            // Identity label
                            const sideLabel = showSide === 'both' ? 'Both sides' : (showSide === 'lhs' ? id.lhs : id.rhs);
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(id.name + ': ' + sideLabel, W / 2, H - 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the second absorption law: \\(A \\cap (A \\cup B) = A\\).',
                    hint: 'For \\(\\subseteq\\): if \\(x \\in A \\cap (A \\cup B)\\), then \\(x \\in A\\). For \\(\\supseteq\\): if \\(x \\in A\\), then \\(x \\in A \\cup B\\), so \\(x \\in A \\cap (A \\cup B)\\).',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in A \\cap (A \\cup B)\\). Then \\(x \\in A\\) and \\(x \\in A \\cup B\\). In particular, \\(x \\in A\\). <em>(\\(\\supseteq\\))</em>: Let \\(x \\in A\\). Then \\(x \\in A \\cup B\\) (since \\(x\\) is in the first component). So \\(x \\in A\\) and \\(x \\in A \\cup B\\), hence \\(x \\in A \\cap (A \\cup B)\\). \\(\\square\\)'
                },
                {
                    question: 'Prove that \\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\) using the associative and commutative laws only (i.e., give an algebraic proof using the table of identities, not the element method).',
                    hint: 'This is actually a challenge: the distributive law is typically taken as an axiom of set algebra, not derived from commutativity and associativity alone. You cannot derive it from those alone.',
                    solution: 'This is a trick question. The distributive law is <em>independent</em> of commutativity and associativity. It must be proved directly (by the element method) or assumed as an axiom. Boolean algebra requires distributivity as a separate axiom, unlike the ring axioms where one distributive law suffices.'
                },
                {
                    question: 'Prove that \\(A \\setminus (B \\cup C) = (A \\setminus B) \\cap (A \\setminus C)\\).',
                    hint: 'Recall \\(A \\setminus X = A \\cap \\bar{X}\\). So \\(A \\setminus (B \\cup C) = A \\cap \\overline{B \\cup C}\\). Now apply De Morgan.',
                    solution: '<strong>Proof.</strong> \\(A \\setminus (B \\cup C) = A \\cap \\overline{B \\cup C} = A \\cap (\\bar{B} \\cap \\bar{C})\\) (De Morgan). By associativity and idempotence: \\(= (A \\cap \\bar{B}) \\cap (A \\cap \\bar{C})\\)... Actually, let us do this by element method. Let \\(x \\in A \\setminus (B \\cup C)\\). Then \\(x \\in A\\) and \\(x \\notin B \\cup C\\), so \\(x \\notin B\\) and \\(x \\notin C\\). Hence \\(x \\in A \\setminus B\\) and \\(x \\in A \\setminus C\\), so \\(x \\in (A \\setminus B) \\cap (A \\setminus C)\\). The reverse is identical. \\(\\square\\)'
                }
            ]
        },
        // ===== SECTION 6: Bridge =====
        {
            id: 'sec-bridge',
            title: 'Looking Ahead: Relations and Functions',
            content: `
<h2>Looking Ahead: Relations and Functions</h2>

<div class="env-block intuition">
<div class="env-title">From Sets to Structure</div>
<div class="env-body">
<p>We now have a complete toolkit for reasoning about sets: definitions (\\(\\in, \\subseteq, =\\)), operations (\\(\\cup, \\cap, \\overline{\\phantom{X}}, \\setminus\\)), the element method for proofs, and a library of identities (commutativity, associativity, distributivity, De Morgan's laws, complement properties).</p>
<p>But sets alone are static. Mathematics becomes interesting when we relate elements of one set to elements of another. The next chapter introduces <strong>relations</strong>: subsets of \\(A \\times B\\) that encode "\\(a\\) is related to \\(b\\)." Functions are special relations, and later we will prove that two sets have the "same size" by exhibiting a bijection between them.</p>
</div>
</div>

<p>The proof techniques from this chapter transfer directly:</p>

<ul>
<li><strong>Relations</strong> (Chapter 11): To show a relation \\(R\\) is symmetric, you prove "if \\((a, b) \\in R\\) then \\((b, a) \\in R\\)" by the element method.</li>
<li><strong>Functions</strong> (Chapter 12): To show \\(f(A \\cup B) = f(A) \\cup f(B)\\), you use the same double-inclusion template.</li>
<li><strong>Cardinality</strong> (Chapter 14): To show \\(|A| = |B|\\), you construct a bijection, which requires proving two set-theoretic properties (injectivity and surjectivity).</li>
</ul>

<div class="viz-placeholder" data-viz="viz-proof-gallery"></div>

<div class="env-block remark">
<div class="env-title">The Element Method is Universal</div>
<p>Every set identity we proved in this chapter followed the same template: assume \\(x\\) belongs to one side, unpack definitions, and show \\(x\\) belongs to the other side. This uniformity is both the method's strength and its limitation. For more complex set identities, we can sometimes use algebraic manipulations (applying previously proved identities like algebra rules), which can be faster. But the element method always works, and it always teaches you <em>why</em> the identity holds.</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-proof-gallery',
                    title: 'Gallery of Set Proofs',
                    description: 'Browse several set identity proofs. Each proof is displayed with its logical structure highlighted.',
                    setup(body, controls) {
                        const container = document.createElement('div');
                        container.style.cssText = 'color:#c9d1d9;font-size:0.82rem;line-height:1.8;padding:8px;max-height:420px;overflow-y:auto;';
                        body.appendChild(container);

                        const proofs = [
                            {
                                title: 'A ∩ B = B ∩ A  (Commutativity)',
                                structure: 'element-method',
                                lines: [
                                    { type: 'goal', text: 'Prove A ∩ B = B ∩ A.' },
                                    { type: 'direction', text: '(⊆) Let x ∈ A ∩ B.' },
                                    { type: 'defn', text: 'Then x ∈ A and x ∈ B.  [def of ∩]' },
                                    { type: 'logic', text: 'So x ∈ B and x ∈ A.  [commutativity of "and"]' },
                                    { type: 'defn', text: 'Hence x ∈ B ∩ A.  [def of ∩]' },
                                    { type: 'direction', text: '(⊇) Let x ∈ B ∩ A.' },
                                    { type: 'defn', text: 'Then x ∈ B and x ∈ A, so x ∈ A and x ∈ B, i.e., x ∈ A ∩ B.' },
                                    { type: 'qed', text: 'Therefore A ∩ B = B ∩ A.  ■' },
                                ]
                            },
                            {
                                title: 'A ∪ (A ∩ B) = A  (Absorption)',
                                structure: 'element-method + cases',
                                lines: [
                                    { type: 'goal', text: 'Prove A ∪ (A ∩ B) = A.' },
                                    { type: 'direction', text: '(⊆) Let x ∈ A ∪ (A ∩ B).' },
                                    { type: 'defn', text: 'x ∈ A  or  x ∈ A ∩ B.  [def of ∪]' },
                                    { type: 'logic', text: 'Case 1: x ∈ A. Done.' },
                                    { type: 'logic', text: 'Case 2: x ∈ A ∩ B, so x ∈ A. Done.' },
                                    { type: 'direction', text: '(⊇) Let x ∈ A.' },
                                    { type: 'defn', text: 'Then x ∈ A ∪ (A ∩ B).  [x in first component of ∪]' },
                                    { type: 'qed', text: 'Therefore A ∪ (A ∩ B) = A.  ■' },
                                ]
                            },
                            {
                                title: 'Comp(A ∪ B) = Comp(A) ∩ Comp(B)  (De Morgan)',
                                structure: 'element-method + logic bridge',
                                lines: [
                                    { type: 'goal', text: 'Prove Comp(A ∪ B) = Comp(A) ∩ Comp(B).' },
                                    { type: 'direction', text: '(⊆) Let x ∈ Comp(A ∪ B).' },
                                    { type: 'defn', text: 'x ∉ A ∪ B.  [def of complement]' },
                                    { type: 'defn', text: '¬(x ∈ A ∨ x ∈ B).  [def of ∪]' },
                                    { type: 'logic', text: 'x ∉ A ∧ x ∉ B.  [De Morgan for logic]' },
                                    { type: 'defn', text: 'x ∈ Comp(A) ∧ x ∈ Comp(B).  [def of complement]' },
                                    { type: 'defn', text: 'x ∈ Comp(A) ∩ Comp(B).  [def of ∩]' },
                                    { type: 'direction', text: '(⊇) Reverse each step.' },
                                    { type: 'qed', text: 'Therefore Comp(A ∪ B) = Comp(A) ∩ Comp(B).  ■' },
                                ]
                            },
                            {
                                title: 'A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C)',
                                structure: 'element-method + De Morgan',
                                lines: [
                                    { type: 'goal', text: 'Prove A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C).' },
                                    { type: 'direction', text: '(⊆) Let x ∈ A \\ (B ∪ C).' },
                                    { type: 'defn', text: 'x ∈ A and x ∉ B ∪ C.  [def of \\]' },
                                    { type: 'logic', text: 'x ∉ B and x ∉ C.  [negation of ∪]' },
                                    { type: 'defn', text: 'x ∈ A \\ B and x ∈ A \\ C.' },
                                    { type: 'defn', text: 'x ∈ (A \\ B) ∩ (A \\ C).' },
                                    { type: 'direction', text: '(⊇) Reverse each step.' },
                                    { type: 'qed', text: 'Therefore A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C).  ■' },
                                ]
                            },
                        ];

                        let proofIdx = 0;

                        const typeColors = {
                            goal: '#f0883e',
                            direction: '#58a6ff',
                            defn: '#3fb950',
                            logic: '#bc8cff',
                            qed: '#f0f6fc',
                        };
                        const typeLabels = {
                            goal: 'GOAL',
                            direction: 'DIRECTION',
                            defn: 'DEFINITION',
                            logic: 'LOGIC',
                            qed: 'QED',
                        };

                        function render() {
                            const p = proofs[proofIdx];
                            let html = '<div style="margin-bottom:8px;font-weight:bold;font-size:0.95rem;">' + p.title + '</div>';
                            html += '<div style="margin-bottom:8px;color:#8b949e;font-size:0.75rem;">Structure: ' + p.structure + '</div>';
                            for (const line of p.lines) {
                                const color = typeColors[line.type] || '#c9d1d9';
                                const label = typeLabels[line.type] || '';
                                html += '<div style="display:flex;gap:8px;margin:3px 0;">';
                                html += '<span style="color:' + color + ';font-size:0.7rem;min-width:70px;text-align:right;padding-top:2px;">' + label + '</span>';
                                html += '<span style="color:' + color + ';">' + line.text + '</span>';
                                html += '</div>';
                            }
                            container.innerHTML = html;
                        }

                        const sel = document.createElement('select');
                        sel.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;margin-right:8px;';
                        proofs.forEach((p, i) => {
                            const opt = document.createElement('option');
                            opt.value = i; opt.textContent = p.title;
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', () => { proofIdx = parseInt(sel.value); render(); });
                        controls.appendChild(sel);

                        render();
                        return null;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(A \\setminus B = A \\cap \\bar{B}\\).',
                    hint: 'Use the definitions: \\(x \\in A \\setminus B\\) iff \\(x \\in A\\) and \\(x \\notin B\\). And \\(x \\in A \\cap \\bar{B}\\) iff \\(x \\in A\\) and \\(x \\in \\bar{B}\\), which means \\(x \\notin B\\).',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in A \\setminus B\\). Then \\(x \\in A\\) and \\(x \\notin B\\). Since \\(x \\notin B\\), we have \\(x \\in \\bar{B}\\). So \\(x \\in A\\) and \\(x \\in \\bar{B}\\), hence \\(x \\in A \\cap \\bar{B}\\). <em>(\\(\\supseteq\\))</em>: Let \\(x \\in A \\cap \\bar{B}\\). Then \\(x \\in A\\) and \\(x \\in \\bar{B}\\), so \\(x \\in A\\) and \\(x \\notin B\\), hence \\(x \\in A \\setminus B\\). \\(\\square\\)'
                },
                {
                    question: 'Prove the <em>symmetric difference</em> identity: \\(A \\bigtriangleup B = (A \\setminus B) \\cup (B \\setminus A)\\), where \\(A \\bigtriangleup B = (A \\cup B) \\setminus (A \\cap B)\\).',
                    hint: 'Let \\(x \\in (A \\cup B) \\setminus (A \\cap B)\\). Then \\(x \\in A \\cup B\\) and \\(x \\notin A \\cap B\\). Consider two cases: \\(x \\in A\\) or \\(x \\in B\\). In each case, use \\(x \\notin A \\cap B\\) to exclude one set.',
                    solution: '<strong>Proof.</strong> <em>(\\(\\subseteq\\))</em>: Let \\(x \\in (A \\cup B) \\setminus (A \\cap B)\\). Then \\(x \\in A \\cup B\\) and \\(x \\notin A \\cap B\\). Case 1: \\(x \\in A\\). Since \\(x \\notin A \\cap B\\), we have \\(x \\notin B\\), so \\(x \\in A \\setminus B\\). Case 2: \\(x \\in B\\). Since \\(x \\notin A \\cap B\\), we have \\(x \\notin A\\), so \\(x \\in B \\setminus A\\). Either way \\(x \\in (A \\setminus B) \\cup (B \\setminus A)\\). <em>(\\(\\supseteq\\))</em>: Let \\(x \\in (A \\setminus B) \\cup (B \\setminus A)\\). If \\(x \\in A \\setminus B\\), then \\(x \\in A, x \\notin B\\), so \\(x \\in A \\cup B\\) and \\(x \\notin A \\cap B\\). Similarly for the other case. \\(\\square\\)'
                }
            ]
        }
    ]
});
