window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Sets & Set Operations',
    subtitle: 'The language of mathematics',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Sets?',
            content: `
<h2>Why Sets?</h2>

<div class="env-block intuition">
    <div class="env-title">The Language Everything Rests On</div>
    <div class="env-body">
        <p>Open any advanced mathematics textbook to its first chapter and you will find the word "set" within the first few lines. Functions are defined as sets of ordered pairs. Probability spaces are sets of outcomes. Groups, rings, and fields are sets with operations. Number systems themselves are built from sets. Set theory is not merely one topic in mathematics; it is the <em>language</em> in which all of mathematics is written.</p>
    </div>
</div>

<p>Georg Cantor introduced the theory of sets in the 1870s with a deceptively simple idea: a <strong>set</strong> is any well-defined collection of distinct objects. "Well-defined" means that for every object in the universe of discourse, we can determine unambiguously whether it belongs to the collection or not. This single idea turned out to be powerful enough to serve as a foundation for virtually all of modern mathematics.</p>

<h3>Why Sets Matter for Proof</h3>

<p>In the preceding chapters we have proved statements about integers, divisibility, and parity. To move forward, we need a richer vocabulary. Consider the following claims:</p>

<ul>
    <li>"Every continuous function on a closed interval attains its maximum."</li>
    <li>"The set of rational numbers is countable."</li>
    <li>"If \\(f\\) is a bijection from \\(A\\) to \\(B\\), then \\(|A| = |B|\\)."</li>
</ul>

<p>Each of these statements involves sets (intervals, number systems, domains, ranges). Without the language of sets, we cannot even <em>state</em> these results precisely, let alone prove them. Mastering set notation and set operations is therefore a prerequisite for everything that follows in this course.</p>

<h3>What This Chapter Covers</h3>

<p>We begin with the basic vocabulary: membership, subsets, the empty set, and the power set. We then develop the algebra of set operations (union, intersection, complement, difference) and visualize them with Venn diagrams. The chapter concludes with Cartesian products, which set the stage for relations and functions in later chapters.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Cantor's work on infinite sets was deeply controversial. Leopold Kronecker called him a "scientific charlatan," and Henri Poincar&eacute; described set theory as a "disease." Instead, set theory became the standard foundation, and David Hilbert famously declared: "No one shall expel us from the paradise that Cantor has created."</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Sets
        // ================================================================
        {
            id: 'sec-basics',
            title: 'Sets',
            content: `
<h2>Sets</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Set)</div>
    <div class="env-body">
        <p>A <strong>set</strong> is an unordered collection of distinct objects, called <strong>elements</strong> (or <strong>members</strong>). We write \\(a \\in A\\) to mean "\\(a\\) is an element of \\(A\\)," and \\(a \\notin A\\) to mean "\\(a\\) is not an element of \\(A\\)."</p>
    </div>
</div>

<p>Two fundamental properties distinguish sets from other collections:</p>
<ol>
    <li><strong>No duplicates:</strong> \\(\\{1, 2, 2, 3\\} = \\{1, 2, 3\\}\\). Listing an element twice does not change the set.</li>
    <li><strong>No order:</strong> \\(\\{1, 2, 3\\} = \\{3, 1, 2\\}\\). The arrangement of elements is irrelevant.</li>
</ol>

<h3>Describing Sets</h3>

<p>There are two standard ways to specify a set:</p>

<div class="env-block definition">
    <div class="env-title">Definition (Roster Notation)</div>
    <div class="env-body">
        <p><strong>Roster notation</strong> lists all elements explicitly:</p>
        \\[A = \\{2, 4, 6, 8, 10\\}.\\]
        <p>For infinite sets with a clear pattern, we use ellipsis: \\(\\mathbb{N} = \\{0, 1, 2, 3, \\ldots\\}\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Set-Builder Notation)</div>
    <div class="env-body">
        <p><strong>Set-builder notation</strong> describes elements by a property:</p>
        \\[A = \\{x \\in \\mathbb{Z} \\mid x \\text{ is even and } 1 \\leq x \\leq 10\\}.\\]
        <p>Read this as "the set of all integers \\(x\\) such that \\(x\\) is even and between 1 and 10." The vertical bar \\(\\mid\\) (or colon :) means "such that."</p>
    </div>
</div>

<h3>Important Number Sets</h3>

<ul>
    <li>\\(\\mathbb{N} = \\{0, 1, 2, 3, \\ldots\\}\\) &mdash; the natural numbers (some authors start at 1)</li>
    <li>\\(\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}\\) &mdash; the integers</li>
    <li>\\(\\mathbb{Q}\\) &mdash; the rational numbers</li>
    <li>\\(\\mathbb{R}\\) &mdash; the real numbers</li>
    <li>\\(\\mathbb{C}\\) &mdash; the complex numbers</li>
</ul>

<h3>Subsets</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Subset)</div>
    <div class="env-body">
        <p>\\(A\\) is a <strong>subset</strong> of \\(B\\), written \\(A \\subseteq B\\), if every element of \\(A\\) is also an element of \\(B\\):</p>
        \\[A \\subseteq B \\iff (\\forall x)(x \\in A \\rightarrow x \\in B).\\]
        <p>If \\(A \\subseteq B\\) and \\(A \\neq B\\), we write \\(A \\subset B\\) and say \\(A\\) is a <strong>proper subset</strong> of \\(B\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.1 (Set Equality)</div>
    <div class="env-body">
        <p>Two sets are equal if and only if each is a subset of the other:</p>
        \\[A = B \\iff (A \\subseteq B \\text{ and } B \\subseteq A).\\]
    </div>
</div>

<p>This is the standard technique for proving two sets are equal: show <strong>mutual inclusion</strong>. We will use this strategy extensively in Chapter 10.</p>

<h3>The Empty Set</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Empty Set)</div>
    <div class="env-body">
        <p>The <strong>empty set</strong>, written \\(\\emptyset\\) or \\(\\{\\}\\), is the set with no elements. For every object \\(x\\), we have \\(x \\notin \\emptyset\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.2</div>
    <div class="env-body">
        <p>The empty set is a subset of every set: for any set \\(A\\), \\(\\emptyset \\subseteq A\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>We must show: for all \\(x\\), if \\(x \\in \\emptyset\\) then \\(x \\in A\\). Since there is no \\(x\\) with \\(x \\in \\emptyset\\), the conditional is <em>vacuously true</em>.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Power Set</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Power Set)</div>
    <div class="env-body">
        <p>The <strong>power set</strong> of \\(A\\), denoted \\(\\mathcal{P}(A)\\), is the set of all subsets of \\(A\\):</p>
        \\[\\mathcal{P}(A) = \\{S \\mid S \\subseteq A\\}.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>If \\(A = \\{1, 2, 3\\}\\), then</p>
        \\[\\mathcal{P}(A) = \\{\\emptyset,\\; \\{1\\},\\; \\{2\\},\\; \\{3\\},\\; \\{1,2\\},\\; \\{1,3\\},\\; \\{2,3\\},\\; \\{1,2,3\\}\\}.\\]
        <p>Note \\(|\\mathcal{P}(A)| = 2^3 = 8\\). In general, if \\(|A| = n\\), then \\(|\\mathcal{P}(A)| = 2^n\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.3</div>
    <div class="env-body">
        <p>If \\(A\\) is a finite set with \\(|A| = n\\), then \\(|\\mathcal{P}(A)| = 2^n\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Each element of \\(A\\) is either included or excluded from a given subset. These are \\(n\\) independent binary choices, giving \\(2^n\\) subsets in total.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="viz-placeholder" data-viz="viz-subset-checker"></div>
<div class="viz-placeholder" data-viz="viz-power-set"></div>
`,
            visualizations: [
                {
                    id: 'viz-subset-checker',
                    title: 'Subset Checker',
                    description: 'Enter two sets A and B. The visualization checks element by element whether \\(A \\subseteq B\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 340,
                            originX: 0, originY: 0, scale: 1
                        });

                        var setA = [1, 3, 5];
                        var setB = [1, 2, 3, 4, 5, 6];

                        var row = document.createElement('div');
                        row.style.cssText = 'display:flex;gap:8px;align-items:center;flex-wrap:wrap;';
                        var lA = document.createElement('span');
                        lA.textContent = 'A:'; lA.style.cssText = 'color:#58a6ff;font-size:0.82rem;';
                        var inpA = document.createElement('input');
                        inpA.type = 'text'; inpA.value = '1, 3, 5';
                        inpA.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;width:140px;';
                        var lB = document.createElement('span');
                        lB.textContent = 'B:'; lB.style.cssText = 'color:#3fb9a0;font-size:0.82rem;';
                        var inpB = document.createElement('input');
                        inpB.type = 'text'; inpB.value = '1, 2, 3, 4, 5, 6';
                        inpB.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;width:160px;';
                        var goBtn = document.createElement('button');
                        goBtn.textContent = 'Check';
                        goBtn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                        goBtn.addEventListener('click', function() {
                            setA = inpA.value.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                            setB = inpB.value.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                            draw();
                        });
                        row.appendChild(lA); row.appendChild(inpA);
                        row.appendChild(lB); row.appendChild(inpB);
                        row.appendChild(goBtn);
                        controls.appendChild(row);

                        function arrStr(arr) {
                            if (arr.length === 0) return '\u2205';
                            return '{' + arr.join(', ') + '}';
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var allSubset = true;

                            viz.screenText('A = ' + arrStr(setA), viz.width * 0.3, 24, viz.colors.blue, 14);
                            viz.screenText('B = ' + arrStr(setB), viz.width * 0.7, 24, viz.colors.teal, 14);

                            var startY = 60;
                            var rowH = 32;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';

                            // Header
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Element', 40, startY);
                            ctx.fillText('\u2208 A?', 180, startY);
                            ctx.fillText('\u2208 B?', 300, startY);
                            ctx.fillText('Status', 420, startY);

                            for (var i = 0; i < setA.length; i++) {
                                var y = startY + (i + 1) * rowH;
                                var elem = setA[i];
                                var inB = setB.indexOf(elem) !== -1;

                                if (!inB) allSubset = false;

                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText(elem, 55, y);

                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('\u2713', 195, y);

                                ctx.fillStyle = inB ? viz.colors.green : viz.colors.red;
                                ctx.fillText(inB ? '\u2713' : '\u2717', 315, y);

                                ctx.fillStyle = inB ? viz.colors.green : viz.colors.red;
                                ctx.fillText(inB ? 'Found in B' : 'NOT in B', 420, y);
                            }

                            // Conclusion
                            var conclusionY = startY + (setA.length + 2) * rowH;
                            ctx.textAlign = 'center';
                            if (setA.length === 0) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.fillText('A = \u2205, so A \u2286 B is vacuously true', viz.width / 2, conclusionY);
                            } else if (allSubset) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.fillText('Every element of A is in B, so A \u2286 B  \u2713', viz.width / 2, conclusionY);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.fillText('Some element of A is not in B, so A \u2288 B  \u2717', viz.width / 2, conclusionY);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-power-set',
                    title: 'Power Set Lattice',
                    description: 'Enter a set and see all its subsets organized as a Hasse diagram. Each level groups subsets by size; lines connect subsets that differ by exactly one element.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var elements = ['a', 'b', 'c'];

                        var inputDiv = document.createElement('div');
                        inputDiv.style.cssText = 'display:flex;gap:8px;align-items:center;';
                        var inp = document.createElement('input');
                        inp.type = 'text'; inp.value = 'a, b, c';
                        inp.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;width:180px;';
                        var btn = document.createElement('button');
                        btn.textContent = 'Update';
                        btn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                        btn.addEventListener('click', function() {
                            var raw = inp.value.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                            var unique = [];
                            for (var i = 0; i < raw.length; i++) {
                                if (unique.indexOf(raw[i]) === -1) unique.push(raw[i]);
                            }
                            if (unique.length > 5) unique = unique.slice(0, 5);
                            elements = unique;
                            draw();
                        });
                        inputDiv.appendChild(inp); inputDiv.appendChild(btn);
                        controls.appendChild(inputDiv);

                        function getSubsets(elems) {
                            var n = elems.length;
                            var total = 1 << n;
                            var result = [];
                            for (var mask = 0; mask < total; mask++) {
                                var sub = [];
                                for (var j = 0; j < n; j++) {
                                    if (mask & (1 << j)) sub.push(elems[j]);
                                }
                                result.push(sub);
                            }
                            return result;
                        }

                        function subsetLabel(sub) {
                            if (sub.length === 0) return '\u2205';
                            return '{' + sub.join(', ') + '}';
                        }

                        function diffByOne(a, b) {
                            if (b.length !== a.length + 1) return false;
                            var count = 0;
                            for (var i = 0; i < b.length; i++) {
                                if (a.indexOf(b[i]) === -1) count++;
                            }
                            return count === 1;
                        }

                        var nodeColors = [viz.colors.purple, viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.orange, viz.colors.yellow];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var n = elements.length;
                            var subs = getSubsets(elements);

                            viz.screenText('\u2118(' + subsetLabel(elements) + ')  =  ' + subs.length + ' subsets', viz.width / 2, 20, viz.colors.white, 14);

                            var levels = [];
                            for (var k = 0; k <= n; k++) levels.push([]);
                            for (var i = 0; i < subs.length; i++) levels[subs[i].length].push(subs[i]);

                            var levelY = [];
                            var gap = Math.min(60, (viz.height - 80) / (n + 1));
                            for (var lv = 0; lv <= n; lv++) {
                                levelY.push(viz.height - 40 - lv * gap);
                            }

                            var nodePos = {};
                            for (var lv = 0; lv <= n; lv++) {
                                var arr = levels[lv];
                                var w = Math.min(100, (viz.width - 60) / Math.max(arr.length, 1));
                                var totalW = arr.length * w;
                                var sx = (viz.width - totalW) / 2 + w / 2;
                                for (var j = 0; j < arr.length; j++) {
                                    var key = arr[j].join(',');
                                    nodePos[key] = { x: sx + j * w, y: levelY[lv], sub: arr[j] };
                                }
                            }

                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                            for (var lv = 0; lv < n; lv++) {
                                for (var a = 0; a < levels[lv].length; a++) {
                                    for (var b = 0; b < levels[lv + 1].length; b++) {
                                        if (diffByOne(levels[lv][a], levels[lv + 1][b])) {
                                            var ka = levels[lv][a].join(',');
                                            var kb = levels[lv + 1][b].join(',');
                                            var pa = nodePos[ka], pb = nodePos[kb];
                                            ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
                                        }
                                    }
                                }
                            }

                            for (var key in nodePos) {
                                var nd = nodePos[key];
                                var col = nodeColors[nd.sub.length % nodeColors.length];
                                ctx.fillStyle = col + '33';
                                ctx.beginPath(); ctx.arc(nd.x, nd.y, 14, 0, Math.PI * 2); ctx.fill();
                                var lbl = subsetLabel(nd.sub);
                                var fs = lbl.length > 10 ? 8 : (lbl.length > 6 ? 9 : 10);
                                ctx.font = fs + 'px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillStyle = col;
                                ctx.fillText(lbl, nd.x, nd.y);
                            }

                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.text;
                            for (var lv = 0; lv <= n; lv++) {
                                ctx.fillText('size ' + lv, 8, levelY[lv]);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(A = \\{1, 2, 3, 4, 5\\}\\). How many subsets does \\(A\\) have? How many <em>proper</em> subsets?',
                    hint: 'A set with \\(n\\) elements has \\(2^n\\) subsets. A proper subset is any subset that is not equal to \\(A\\) itself.',
                    solution: 'Total subsets: \\(2^5 = 32\\). Proper subsets: \\(32 - 1 = 31\\) (excluding \\(A\\) itself).'
                },
                {
                    question: 'True or false: \\(\\{\\emptyset\\} = \\emptyset\\). Justify your answer.',
                    hint: 'Compare the number of elements in each set. What are the elements of \\(\\{\\emptyset\\}\\)?',
                    solution: 'False. \\(\\emptyset\\) has 0 elements, while \\(\\{\\emptyset\\}\\) has 1 element (the empty set itself). Since they have different cardinalities, they cannot be equal.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Set Operations
        // ================================================================
        {
            id: 'sec-operations',
            title: 'Set Operations',
            content: `
<h2>Set Operations</h2>

<p>Just as arithmetic builds complex numbers from simple ones using \\(+, -, \\times, \\div\\), set theory builds complex sets from simpler ones using operations. All operations involving complements are defined relative to a <strong>universal set</strong> \\(U\\) that contains every element under discussion.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Union)</div>
    <div class="env-body">
        <p>The <strong>union</strong> of \\(A\\) and \\(B\\) is the set of elements in \\(A\\) <em>or</em> \\(B\\) (or both):</p>
        \\[A \\cup B = \\{x \\mid x \\in A \\text{ or } x \\in B\\}.\\]
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Intersection)</div>
    <div class="env-body">
        <p>The <strong>intersection</strong> of \\(A\\) and \\(B\\) is the set of elements in <em>both</em> \\(A\\) and \\(B\\):</p>
        \\[A \\cap B = \\{x \\mid x \\in A \\text{ and } x \\in B\\}.\\]
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Complement)</div>
    <div class="env-body">
        <p>The <strong>complement</strong> of \\(A\\) (relative to \\(U\\)) is the set of elements in \\(U\\) but not in \\(A\\):</p>
        \\[\\overline{A} = A^c = U \\setminus A = \\{x \\in U \\mid x \\notin A\\}.\\]
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Set Difference)</div>
    <div class="env-body">
        <p>The <strong>set difference</strong> \\(A \\setminus B\\) (also written \\(A - B\\)) is the set of elements in \\(A\\) but not in \\(B\\):</p>
        \\[A \\setminus B = \\{x \\mid x \\in A \\text{ and } x \\notin B\\} = A \\cap \\overline{B}.\\]
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Symmetric Difference)</div>
    <div class="env-body">
        <p>The <strong>symmetric difference</strong> is the set of elements in exactly one of the two sets:</p>
        \\[A \\triangle B = (A \\setminus B) \\cup (B \\setminus A) = (A \\cup B) \\setminus (A \\cap B).\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Let \\(U = \\{1,2,\\ldots,10\\}\\), \\(A = \\{1,2,3,4,5\\}\\), \\(B = \\{3,4,5,6,7\\}\\). Then:</p>
        <ul>
            <li>\\(A \\cup B = \\{1,2,3,4,5,6,7\\}\\)</li>
            <li>\\(A \\cap B = \\{3,4,5\\}\\)</li>
            <li>\\(A \\setminus B = \\{1,2\\}\\)</li>
            <li>\\(B \\setminus A = \\{6,7\\}\\)</li>
            <li>\\(A \\triangle B = \\{1,2,6,7\\}\\)</li>
            <li>\\(\\overline{A} = \\{6,7,8,9,10\\}\\)</li>
        </ul>
    </div>
</div>

<p>Two sets \\(A\\) and \\(B\\) are <strong>disjoint</strong> if \\(A \\cap B = \\emptyset\\).</p>

<h3>Key Algebraic Properties</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.4 (Set Algebra)</div>
    <div class="env-body">
        <p>For all sets \\(A, B, C\\) (with complements relative to \\(U\\)):</p>
        <ul>
            <li><strong>Commutativity:</strong> \\(A \\cup B = B \\cup A\\), \\(A \\cap B = B \\cap A\\).</li>
            <li><strong>Associativity:</strong> \\(A \\cup (B \\cup C) = (A \\cup B) \\cup C\\), \\(A \\cap (B \\cap C) = (A \\cap B) \\cap C\\).</li>
            <li><strong>Distributivity:</strong> \\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\), \\(A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)\\).</li>
            <li><strong>De Morgan's Laws:</strong> \\(\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}\\), \\(\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}\\).</li>
            <li><strong>Identity:</strong> \\(A \\cup \\emptyset = A\\), \\(A \\cap U = A\\).</li>
            <li><strong>Complement:</strong> \\(A \\cup \\overline{A} = U\\), \\(A \\cap \\overline{A} = \\emptyset\\).</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-set-operations"></div>
`,
            visualizations: [
                {
                    id: 'viz-set-operations',
                    title: 'Set Operations Explorer',
                    description: 'Enter two sets and see union, intersection, difference, and symmetric difference computed instantly.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var setA = [1, 2, 3, 4, 5];
                        var setB = [3, 4, 5, 6, 7];

                        var row = document.createElement('div');
                        row.style.cssText = 'display:flex;gap:8px;align-items:center;flex-wrap:wrap;';
                        var lA = document.createElement('span');
                        lA.textContent = 'A:'; lA.style.cssText = 'color:#58a6ff;font-size:0.82rem;';
                        var inpA = document.createElement('input');
                        inpA.type = 'text'; inpA.value = '1, 2, 3, 4, 5';
                        inpA.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;width:140px;';
                        var lB = document.createElement('span');
                        lB.textContent = 'B:'; lB.style.cssText = 'color:#3fb9a0;font-size:0.82rem;';
                        var inpB = document.createElement('input');
                        inpB.type = 'text'; inpB.value = '3, 4, 5, 6, 7';
                        inpB.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;width:140px;';
                        var goBtn = document.createElement('button');
                        goBtn.textContent = 'Compute';
                        goBtn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                        goBtn.addEventListener('click', function() {
                            setA = inpA.value.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                            setB = inpB.value.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                            draw();
                        });
                        row.appendChild(lA); row.appendChild(inpA);
                        row.appendChild(lB); row.appendChild(inpB);
                        row.appendChild(goBtn);
                        controls.appendChild(row);

                        function arrStr(arr) {
                            if (arr.length === 0) return '\u2205';
                            return '{' + arr.join(', ') + '}';
                        }
                        function setUnion(a, b) {
                            var r = a.slice();
                            for (var i = 0; i < b.length; i++) { if (r.indexOf(b[i]) === -1) r.push(b[i]); }
                            return r;
                        }
                        function setIntersect(a, b) {
                            return a.filter(function(x) { return b.indexOf(x) !== -1; });
                        }
                        function setDiff(a, b) {
                            return a.filter(function(x) { return b.indexOf(x) === -1; });
                        }
                        function setSymDiff(a, b) {
                            return setUnion(setDiff(a, b), setDiff(b, a));
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var results = [
                                { label: 'A \u222A B  (Union)', value: setUnion(setA, setB), color: viz.colors.blue },
                                { label: 'A \u2229 B  (Intersection)', value: setIntersect(setA, setB), color: viz.colors.teal },
                                { label: 'A \u2216 B  (Difference)', value: setDiff(setA, setB), color: viz.colors.orange },
                                { label: 'B \u2216 A  (Difference)', value: setDiff(setB, setA), color: viz.colors.purple },
                                { label: 'A \u25B3 B  (Symmetric Diff)', value: setSymDiff(setA, setB), color: viz.colors.green }
                            ];

                            viz.screenText('A = ' + arrStr(setA), viz.width * 0.3, 22, viz.colors.blue, 13);
                            viz.screenText('B = ' + arrStr(setB), viz.width * 0.7, 22, viz.colors.teal, 13);

                            // Mini Venn
                            var cxA = viz.width * 0.38, cxB = viz.width * 0.62, cy = 120, cr = 65;
                            ctx.globalAlpha = 0.15;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(cxA, cy, cr, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cxB, cy, cr, 0, Math.PI * 2); ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cxA, cy, cr, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cxB, cy, cr, 0, Math.PI * 2); ctx.stroke();

                            var onlyA = setDiff(setA, setB);
                            var onlyB = setDiff(setB, setA);
                            var both = setIntersect(setA, setB);

                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            for (var i = 0; i < onlyA.length; i++) {
                                var ang = (i / Math.max(onlyA.length, 1)) * Math.PI * 2;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText(onlyA[i], cxA - 25 + Math.cos(ang) * 22, cy + Math.sin(ang) * 18);
                            }
                            for (var i = 0; i < onlyB.length; i++) {
                                var ang = (i / Math.max(onlyB.length, 1)) * Math.PI * 2;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText(onlyB[i], cxB + 25 + Math.cos(ang) * 22, cy + Math.sin(ang) * 18);
                            }
                            for (var i = 0; i < both.length; i++) {
                                var midX = (cxA + cxB) / 2;
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText(both[i], midX, cy - (both.length - 1) * 8 + i * 16);
                            }

                            viz.screenText('A', cxA - cr + 14, cy - cr + 14, viz.colors.blue, 13);
                            viz.screenText('B', cxB + cr - 14, cy - cr + 14, viz.colors.teal, 13);

                            // Results table
                            var startY = 200;
                            var rowH = 36;
                            for (var r = 0; r < results.length; r++) {
                                var res = results[r];
                                var ry = startY + r * rowH;
                                ctx.fillStyle = res.color + '22';
                                ctx.fillRect(20, ry - 12, viz.width - 40, rowH - 4);
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                                ctx.fillStyle = res.color;
                                ctx.fillText(res.label, 30, ry + 6);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('= ' + arrStr(res.value), 260, ry + 6);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(A = \\{a, b, c, d\\}\\) and \\(B = \\{c, d, e, f\\}\\). Compute \\(A \\cup B\\), \\(A \\cap B\\), \\(A \\setminus B\\), and \\(A \\triangle B\\).',
                    hint: 'Apply each definition directly. For the symmetric difference, find elements in exactly one of the two sets.',
                    solution: '\\(A \\cup B = \\{a,b,c,d,e,f\\}\\), \\(A \\cap B = \\{c,d\\}\\), \\(A \\setminus B = \\{a,b\\}\\), \\(A \\triangle B = \\{a,b,e,f\\}\\).'
                },
                {
                    question: 'Prove that \\(A \\setminus B = A \\cap \\overline{B}\\) using element-chasing.',
                    hint: 'Show mutual inclusion. Let \\(x \\in A \\setminus B\\) and show \\(x \\in A \\cap \\overline{B}\\), then do the reverse.',
                    solution: '(\\(\\subseteq\\)) Let \\(x \\in A \\setminus B\\). Then \\(x \\in A\\) and \\(x \\notin B\\), so \\(x \\in \\overline{B}\\). Thus \\(x \\in A \\cap \\overline{B}\\). (\\(\\supseteq\\)) Let \\(x \\in A \\cap \\overline{B}\\). Then \\(x \\in A\\) and \\(x \\in \\overline{B}\\), meaning \\(x \\notin B\\). So \\(x \\in A \\setminus B\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Venn Diagrams
        // ================================================================
        {
            id: 'sec-venn',
            title: 'Venn Diagrams',
            content: `
<h2>Venn Diagrams</h2>

<p>A <strong>Venn diagram</strong> represents sets as regions in the plane (typically circles or ellipses) inside a rectangle that denotes the universal set \\(U\\). The spatial overlap of regions corresponds to set intersections, making it easy to visualize relationships between sets.</p>

<div class="env-block remark">
    <div class="env-title">Caution</div>
    <div class="env-body">
        <p>Venn diagrams are excellent for building intuition and verifying identities involving 2 or 3 sets, but they do not constitute formal proofs. A Venn diagram with \\(n\\) sets has \\(2^n\\) distinct regions; for \\(n \\geq 4\\), simple circles can no longer represent all possible intersections, and the diagrams quickly become unwieldy.</p>
    </div>
</div>

<h3>Two-Set Venn Diagrams</h3>

<p>With two sets \\(A\\) and \\(B\\), the universal set is partitioned into four regions:</p>
<ul>
    <li>\\(A \\cap B\\) (the overlap, or "lens")</li>
    <li>\\(A \\setminus B\\) (only in \\(A\\))</li>
    <li>\\(B \\setminus A\\) (only in \\(B\\))</li>
    <li>\\(\\overline{A \\cup B}\\) (outside both)</li>
</ul>

<p>Click on regions in the visualization below to highlight specific set operations.</p>

<div class="viz-placeholder" data-viz="viz-venn-2"></div>

<h3>Three-Set Venn Diagrams</h3>

<p>With three sets, there are \\(2^3 = 8\\) regions. Three-set Venn diagrams are especially useful for visualizing De Morgan's Laws and distributive properties.</p>

<div class="viz-placeholder" data-viz="viz-venn-3"></div>
`,
            visualizations: [
                {
                    id: 'viz-venn-2',
                    title: 'Interactive 2-Set Venn Diagram',
                    description: 'Click buttons to highlight different set operations. The shaded region shows the selected operation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var mode = 'union';
                        var modes = [
                            { key: 'union', label: 'A \u222A B' },
                            { key: 'intersect', label: 'A \u2229 B' },
                            { key: 'diffAB', label: 'A \u2216 B' },
                            { key: 'diffBA', label: 'B \u2216 A' },
                            { key: 'symdiff', label: 'A \u25B3 B' },
                            { key: 'compA', label: '\u0100 (complement)' },
                            { key: 'compUnion', label: '\u0100 \u2229 B\u0304 (De Morgan)' }
                        ];

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';
                        var buttons = [];
                        modes.forEach(function(m) {
                            var b = document.createElement('button');
                            b.textContent = m.label;
                            b.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                mode = m.key;
                                buttons.forEach(function(bb) { bb.style.background = '#1a1a40'; });
                                b.style.background = '#2d2d60';
                                draw();
                            });
                            btnRow.appendChild(b);
                            buttons.push(b);
                        });
                        buttons[0].style.background = '#2d2d60';
                        controls.appendChild(btnRow);

                        var cxA = 220, cxB = 360, cy = 190, cr = 110;

                        function inCircle(px, py, cx, cyy, r) {
                            return (px - cx) * (px - cx) + (py - cyy) * (py - cyy) <= r * r;
                        }

                        function shouldHighlight(px, py) {
                            var inA = inCircle(px, py, cxA, cy, cr);
                            var inB = inCircle(px, py, cxB, cy, cr);
                            if (mode === 'union') return inA || inB;
                            if (mode === 'intersect') return inA && inB;
                            if (mode === 'diffAB') return inA && !inB;
                            if (mode === 'diffBA') return !inA && inB;
                            if (mode === 'symdiff') return (inA && !inB) || (!inA && inB);
                            if (mode === 'compA') return !inA;
                            if (mode === 'compUnion') return !inA && !inB;
                            return false;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw U rectangle
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1;
                            ctx.strokeRect(20, 30, viz.width - 40, viz.height - 60);
                            viz.screenText('U', 35, 45, viz.colors.text, 12);

                            // Pixel-based highlight
                            var imgData = ctx.getImageData(0, 0, viz.width, viz.height);
                            for (var py = 30; py < viz.height - 30; py++) {
                                for (var px = 20; px < viz.width - 20; px++) {
                                    if (shouldHighlight(px, py)) {
                                        var idx = (py * viz.width + px) * 4;
                                        imgData.data[idx] = 88;
                                        imgData.data[idx + 1] = 166;
                                        imgData.data[idx + 2] = 255;
                                        imgData.data[idx + 3] = 60;
                                    }
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            // Draw circle outlines
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.arc(cxA, cy, cr, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cxB, cy, cr, 0, Math.PI * 2); ctx.stroke();

                            // Labels
                            viz.screenText('A', cxA - cr + 20, cy - cr + 20, viz.colors.blue, 16);
                            viz.screenText('B', cxB + cr - 20, cy - cr + 20, viz.colors.teal, 16);

                            // Mode label
                            var modeLabel = modes.find(function(m) { return m.key === mode; });
                            viz.screenText(modeLabel ? modeLabel.label : '', viz.width / 2, viz.height - 15, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-venn-3',
                    title: 'Interactive 3-Set Venn Diagram',
                    description: 'Click buttons to highlight regions for three sets A, B, C. Useful for visualizing De Morgan\'s Laws and distributive properties.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var mode = 'union-all';
                        var modes = [
                            { key: 'union-all', label: 'A\u222AB\u222AC' },
                            { key: 'intersect-all', label: 'A\u2229B\u2229C' },
                            { key: 'only-a', label: 'Only A' },
                            { key: 'only-b', label: 'Only B' },
                            { key: 'only-c', label: 'Only C' },
                            { key: 'ab-not-c', label: 'A\u2229B \u2216 C' },
                            { key: 'demorgan', label: '(A\u222AB)\u1d9c' }
                        ];

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';
                        var buttons = [];
                        modes.forEach(function(m) {
                            var b = document.createElement('button');
                            b.textContent = m.label;
                            b.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                mode = m.key;
                                buttons.forEach(function(bb) { bb.style.background = '#1a1a40'; });
                                b.style.background = '#2d2d60';
                                draw();
                            });
                            btnRow.appendChild(b);
                            buttons.push(b);
                        });
                        buttons[0].style.background = '#2d2d60';
                        controls.appendChild(btnRow);

                        var cx = viz.width / 2, cy = 200;
                        var cr = 95;
                        var offset = 55;
                        var cxA = cx - offset, cyA = cy - 30;
                        var cxB = cx + offset, cyB = cy - 30;
                        var cxC = cx, cyC = cy + 40;

                        function inCircle(px, py, ccx, ccy, r) {
                            return (px - ccx) * (px - ccx) + (py - ccy) * (py - ccy) <= r * r;
                        }

                        function shouldHighlight(px, py) {
                            var inA = inCircle(px, py, cxA, cyA, cr);
                            var inB = inCircle(px, py, cxB, cyB, cr);
                            var inC = inCircle(px, py, cxC, cyC, cr);
                            if (mode === 'union-all') return inA || inB || inC;
                            if (mode === 'intersect-all') return inA && inB && inC;
                            if (mode === 'only-a') return inA && !inB && !inC;
                            if (mode === 'only-b') return !inA && inB && !inC;
                            if (mode === 'only-c') return !inA && !inB && inC;
                            if (mode === 'ab-not-c') return inA && inB && !inC;
                            if (mode === 'demorgan') return !inA && !inB;
                            return false;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1;
                            ctx.strokeRect(20, 30, viz.width - 40, viz.height - 60);
                            viz.screenText('U', 35, 45, viz.colors.text, 12);

                            // Pixel-based highlight
                            var imgData = ctx.getImageData(0, 0, viz.width, viz.height);
                            for (var py = 30; py < viz.height - 30; py++) {
                                for (var px = 20; px < viz.width - 20; px++) {
                                    if (shouldHighlight(px, py)) {
                                        var idx = (py * viz.width + px) * 4;
                                        imgData.data[idx] = 88;
                                        imgData.data[idx + 1] = 166;
                                        imgData.data[idx + 2] = 255;
                                        imgData.data[idx + 3] = 55;
                                    }
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            ctx.lineWidth = 2.5;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(cxA, cyA, cr, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cxB, cyB, cr, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(cxC, cyC, cr, 0, Math.PI * 2); ctx.stroke();

                            viz.screenText('A', cxA - cr + 15, cyA - cr + 15, viz.colors.blue, 16);
                            viz.screenText('B', cxB + cr - 15, cyB - cr + 15, viz.colors.teal, 16);
                            viz.screenText('C', cxC, cyC + cr + 15, viz.colors.orange, 16);

                            var modeLabel = modes.find(function(m) { return m.key === mode; });
                            viz.screenText(modeLabel ? modeLabel.label : '', viz.width / 2, viz.height - 15, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using a Venn diagram with two sets, shade the region representing \\(A \\triangle B\\). How many of the four fundamental regions are shaded?',
                    hint: 'The symmetric difference includes elements in \\(A\\) or \\(B\\) but not both. Which regions are these?',
                    solution: 'The symmetric difference shades exactly 2 of the 4 regions: "only A" (\\(A \\setminus B\\)) and "only B" (\\(B \\setminus A\\)). The intersection and the exterior are not shaded.'
                },
                {
                    question: 'Draw a 3-set Venn diagram and shade \\((A \\cup B) \\cap C\\). Then shade \\((A \\cap C) \\cup (B \\cap C)\\) separately. What do you observe?',
                    hint: 'This is the distributive law in action.',
                    solution: 'Both shadings are identical. This illustrates the distributive law: \\((A \\cup B) \\cap C = (A \\cap C) \\cup (B \\cap C)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Cartesian Products
        // ================================================================
        {
            id: 'sec-cartesian',
            title: 'Cartesian Products',
            content: `
<h2>Cartesian Products</h2>

<p>Sets are unordered, but many mathematical structures require order. The Cartesian product provides a way to form ordered collections from sets.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Ordered Pair)</div>
    <div class="env-body">
        <p>An <strong>ordered pair</strong> \\((a, b)\\) is a pair of objects where the order matters:</p>
        \\[(a, b) = (c, d) \\iff a = c \\text{ and } b = d.\\]
        <p>In particular, \\((a, b) \\neq (b, a)\\) unless \\(a = b\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Cartesian Product)</div>
    <div class="env-body">
        <p>The <strong>Cartesian product</strong> of sets \\(A\\) and \\(B\\) is the set of all ordered pairs:</p>
        \\[A \\times B = \\{(a, b) \\mid a \\in A \\text{ and } b \\in B\\}.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Let \\(A = \\{1, 2, 3\\}\\) and \\(B = \\{x, y\\}\\). Then:</p>
        \\[A \\times B = \\{(1,x), (1,y), (2,x), (2,y), (3,x), (3,y)\\}.\\]
        <p>Note that \\(|A \\times B| = |A| \\cdot |B| = 3 \\cdot 2 = 6\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.5</div>
    <div class="env-body">
        <p>If \\(A\\) and \\(B\\) are finite sets, then \\(|A \\times B| = |A| \\cdot |B|\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>For each of the \\(|A|\\) choices for the first component, there are \\(|B|\\) choices for the second. By the multiplication principle, the total number of ordered pairs is \\(|A| \\cdot |B|\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Remark</div>
    <div class="env-body">
        <p>In general, \\(A \\times B \\neq B \\times A\\). The pairs \\((1, x)\\) and \\((x, 1)\\) are different ordered pairs. However, \\(|A \\times B| = |B \\times A|\\).</p>
    </div>
</div>

<h3>Higher Products</h3>

<p>We can form products of more than two sets. The <strong>\\(n\\)-fold Cartesian product</strong> is:</p>
\\[A_1 \\times A_2 \\times \\cdots \\times A_n = \\{(a_1, a_2, \\ldots, a_n) \\mid a_i \\in A_i \\text{ for all } i\\}.\\]

<p>The familiar Euclidean plane \\(\\mathbb{R}^2 = \\mathbb{R} \\times \\mathbb{R}\\) and 3-space \\(\\mathbb{R}^3 = \\mathbb{R} \\times \\mathbb{R} \\times \\mathbb{R}\\) are Cartesian products. The coordinate system you have used since high school is named after Descartes precisely because it represents points as ordered pairs or triples.</p>

<div class="viz-placeholder" data-viz="viz-cartesian-product"></div>
`,
            visualizations: [
                {
                    id: 'viz-cartesian-product',
                    title: 'Cartesian Product Grid',
                    description: 'Enter two sets A and B. The visualization shows \\(A \\times B\\) as a grid of ordered pairs, with A on the horizontal axis and B on the vertical axis.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var setA = ['1', '2', '3'];
                        var setB = ['x', 'y'];

                        var row = document.createElement('div');
                        row.style.cssText = 'display:flex;gap:8px;align-items:center;flex-wrap:wrap;';
                        var lA = document.createElement('span');
                        lA.textContent = 'A:'; lA.style.cssText = 'color:#58a6ff;font-size:0.82rem;';
                        var inpA = document.createElement('input');
                        inpA.type = 'text'; inpA.value = '1, 2, 3';
                        inpA.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;width:120px;';
                        var lB = document.createElement('span');
                        lB.textContent = 'B:'; lB.style.cssText = 'color:#3fb9a0;font-size:0.82rem;';
                        var inpB = document.createElement('input');
                        inpB.type = 'text'; inpB.value = 'x, y';
                        inpB.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.82rem;width:120px;';
                        var goBtn = document.createElement('button');
                        goBtn.textContent = 'Build';
                        goBtn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                        goBtn.addEventListener('click', function() {
                            setA = inpA.value.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                            setB = inpB.value.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                            if (setA.length > 8) setA = setA.slice(0, 8);
                            if (setB.length > 8) setB = setB.slice(0, 8);
                            draw();
                        });
                        row.appendChild(lA); row.appendChild(inpA);
                        row.appendChild(lB); row.appendChild(inpB);
                        row.appendChild(goBtn);
                        controls.appendChild(row);

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var nA = setA.length, nB = setB.length;
                            if (nA === 0 || nB === 0) {
                                viz.screenText('A \u00D7 B = \u2205 (one set is empty)', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            var marginL = 80, marginT = 60, marginR = 40, marginB = 40;
                            var cellW = Math.min(70, (viz.width - marginL - marginR) / nA);
                            var cellH = Math.min(50, (viz.height - marginT - marginB) / nB);

                            var gridW = nA * cellW, gridH = nB * cellH;
                            var startX = marginL + (viz.width - marginL - marginR - gridW) / 2;
                            var startY = marginT + (viz.height - marginT - marginB - gridH) / 2;

                            // Title
                            viz.screenText('A \u00D7 B  (' + (nA * nB) + ' pairs)', viz.width / 2, 22, viz.colors.white, 14);

                            // A labels (horizontal)
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillStyle = viz.colors.blue;
                            for (var i = 0; i < nA; i++) {
                                ctx.fillText(setA[i], startX + (i + 0.5) * cellW, startY - 6);
                            }

                            // B labels (vertical)
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.teal;
                            for (var j = 0; j < nB; j++) {
                                ctx.fillText(setB[j], startX - 10, startY + (j + 0.5) * cellH);
                            }

                            // Grid and pairs
                            var pairColors = [viz.colors.blue, viz.colors.teal, viz.colors.purple, viz.colors.orange, viz.colors.green, viz.colors.pink, viz.colors.yellow, viz.colors.red];
                            for (var j = 0; j < nB; j++) {
                                for (var i = 0; i < nA; i++) {
                                    var cx = startX + (i + 0.5) * cellW;
                                    var cyy = startY + (j + 0.5) * cellH;

                                    // Cell border
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                                    ctx.strokeRect(startX + i * cellW, startY + j * cellH, cellW, cellH);

                                    // Dot
                                    var col = pairColors[(i + j) % pairColors.length];
                                    ctx.fillStyle = col + '44';
                                    ctx.beginPath(); ctx.arc(cx, cyy, 5, 0, Math.PI * 2); ctx.fill();
                                    ctx.fillStyle = col;
                                    ctx.beginPath(); ctx.arc(cx, cyy, 3, 0, Math.PI * 2); ctx.fill();

                                    // Pair label
                                    var lbl = '(' + setA[i] + ',' + setB[j] + ')';
                                    var fs = lbl.length > 6 ? 8 : 10;
                                    ctx.font = fs + 'px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.fillText(lbl, cx, cyy + 7);
                                }
                            }

                            // Axis labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('A', startX + gridW / 2, startY + gridH + 10);
                            ctx.save();
                            ctx.translate(startX - 35, startY + gridH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('B', 0, 0);
                            ctx.restore();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(A = \\{1, 2\\}\\) and \\(B = \\{a, b, c\\}\\). List all elements of \\(A \\times B\\) and \\(B \\times A\\). Is \\(A \\times B = B \\times A\\)?',
                    hint: 'Form all ordered pairs with the first component from the first set. Remember that \\((1, a) \\neq (a, 1)\\).',
                    solution: '\\(A \\times B = \\{(1,a),(1,b),(1,c),(2,a),(2,b),(2,c)\\}\\). \\(B \\times A = \\{(a,1),(a,2),(b,1),(b,2),(c,1),(c,2)\\}\\). These are not equal since \\((1, a) \\neq (a, 1)\\).'
                },
                {
                    question: 'Prove or disprove: \\(A \\times (B \\cup C) = (A \\times B) \\cup (A \\times C)\\).',
                    hint: 'Use element-chasing: an element of \\(A \\times (B \\cup C)\\) is an ordered pair \\((a, x)\\) where \\(a \\in A\\) and \\(x \\in B \\cup C\\).',
                    solution: 'Proof by mutual inclusion. (\\(\\subseteq\\)) Let \\((a, x) \\in A \\times (B \\cup C)\\). Then \\(a \\in A\\) and \\(x \\in B \\cup C\\), so \\(x \\in B\\) or \\(x \\in C\\). If \\(x \\in B\\), then \\((a,x) \\in A \\times B\\). If \\(x \\in C\\), then \\((a,x) \\in A \\times C\\). Either way, \\((a,x) \\in (A \\times B) \\cup (A \\times C)\\). (\\(\\supseteq\\)) Similar argument in reverse.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead</h2>

<p>This chapter introduced the vocabulary and operations of set theory. We can now name collections precisely, combine them with union and intersection, and form ordered pairs via Cartesian products. Here is a summary of the key ideas:</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0;">
    <thead>
        <tr style="border-bottom:2px solid #30363d;">
            <th style="text-align:left;padding:8px;color:#8b949e;">Concept</th>
            <th style="text-align:left;padding:8px;color:#8b949e;">Notation</th>
            <th style="text-align:left;padding:8px;color:#8b949e;">Meaning</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid #1a1a40;">
            <td style="padding:8px;">Membership</td>
            <td style="padding:8px;">\\(x \\in A\\)</td>
            <td style="padding:8px;">\\(x\\) is an element of \\(A\\)</td>
        </tr>
        <tr style="border-bottom:1px solid #1a1a40;">
            <td style="padding:8px;">Subset</td>
            <td style="padding:8px;">\\(A \\subseteq B\\)</td>
            <td style="padding:8px;">Every element of \\(A\\) is in \\(B\\)</td>
        </tr>
        <tr style="border-bottom:1px solid #1a1a40;">
            <td style="padding:8px;">Union</td>
            <td style="padding:8px;">\\(A \\cup B\\)</td>
            <td style="padding:8px;">Elements in \\(A\\) or \\(B\\)</td>
        </tr>
        <tr style="border-bottom:1px solid #1a1a40;">
            <td style="padding:8px;">Intersection</td>
            <td style="padding:8px;">\\(A \\cap B\\)</td>
            <td style="padding:8px;">Elements in both \\(A\\) and \\(B\\)</td>
        </tr>
        <tr style="border-bottom:1px solid #1a1a40;">
            <td style="padding:8px;">Complement</td>
            <td style="padding:8px;">\\(\\overline{A}\\)</td>
            <td style="padding:8px;">Elements in \\(U\\) but not \\(A\\)</td>
        </tr>
        <tr style="border-bottom:1px solid #1a1a40;">
            <td style="padding:8px;">Difference</td>
            <td style="padding:8px;">\\(A \\setminus B\\)</td>
            <td style="padding:8px;">Elements in \\(A\\) but not \\(B\\)</td>
        </tr>
        <tr style="border-bottom:1px solid #1a1a40;">
            <td style="padding:8px;">Power set</td>
            <td style="padding:8px;">\\(\\mathcal{P}(A)\\)</td>
            <td style="padding:8px;">All subsets of \\(A\\); has \\(2^{|A|}\\) elements</td>
        </tr>
        <tr>
            <td style="padding:8px;">Cartesian product</td>
            <td style="padding:8px;">\\(A \\times B\\)</td>
            <td style="padding:8px;">All ordered pairs \\((a,b)\\)</td>
        </tr>
    </tbody>
</table>

<h3>What Comes Next</h3>

<p>In <strong>Chapter 10</strong>, we will learn how to <em>prove</em> set identities rigorously. The two main techniques are:</p>

<ol>
    <li><strong>Element-chasing</strong> (also called "double inclusion"): to prove \\(A = B\\), show \\(A \\subseteq B\\) and \\(B \\subseteq A\\).</li>
    <li><strong>Algebraic method:</strong> derive one side from the other using the laws of Theorem 9.4 (commutativity, distributivity, De Morgan, etc.).</li>
</ol>

<p>Beyond set identities, the Cartesian product is the gateway to <strong>relations</strong> (Chapter 11) and <strong>functions</strong> (Chapter 12). A relation from \\(A\\) to \\(B\\) is simply a subset of \\(A \\times B\\), and a function is a special kind of relation. The language you learned in this chapter is the scaffolding on which all these structures are built.</p>

<div class="env-block remark">
    <div class="env-title">Looking Further Ahead</div>
    <div class="env-body">
        <p>In Chapters 14 and 15, we will revisit sets to ask a remarkable question: <em>how big is a set?</em> For finite sets, the answer is simply the number of elements. But for infinite sets, Cantor showed that different infinities can have genuinely different sizes. The set of natural numbers is "smaller" than the set of real numbers, even though both are infinite. This discovery, which relies on the set-theoretic tools of this chapter, remains one of the most beautiful results in all of mathematics.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'True or false: \\(A \\times \\emptyset = \\emptyset\\) for any set \\(A\\).',
                    hint: 'What elements would \\(A \\times \\emptyset\\) contain? An ordered pair \\((a, b)\\) requires \\(b \\in \\emptyset\\).',
                    solution: 'True. \\(A \\times \\emptyset = \\{(a, b) \\mid a \\in A, b \\in \\emptyset\\} = \\emptyset\\), because there is no \\(b\\) in \\(\\emptyset\\).'
                },
                {
                    question: 'Let \\(A = \\{1, 2\\}\\). Compute \\(\\mathcal{P}(\\mathcal{P}(A))\\). How many elements does it have?',
                    hint: 'First compute \\(\\mathcal{P}(A)\\), which has \\(2^2 = 4\\) elements. Then \\(\\mathcal{P}(\\mathcal{P}(A))\\) is the power set of a 4-element set.',
                    solution: '\\(\\mathcal{P}(A) = \\{\\emptyset, \\{1\\}, \\{2\\}, \\{1,2\\}\\}\\), which has 4 elements. So \\(|\\mathcal{P}(\\mathcal{P}(A))| = 2^4 = 16\\). We do not need to list all 16 subsets, but they range from \\(\\emptyset\\) to \\(\\mathcal{P}(A)\\) itself.'
                },
                {
                    question: 'Prove: if \\(A \\subseteq B\\), then \\(\\mathcal{P}(A) \\subseteq \\mathcal{P}(B)\\).',
                    hint: 'Let \\(S \\in \\mathcal{P}(A)\\). Then \\(S \\subseteq A\\). Use the fact that \\(A \\subseteq B\\) to conclude \\(S \\subseteq B\\).',
                    solution: 'Let \\(S \\in \\mathcal{P}(A)\\). Then \\(S \\subseteq A\\). Since \\(A \\subseteq B\\), every element of \\(S\\) is in \\(A\\) and hence in \\(B\\), so \\(S \\subseteq B\\). Thus \\(S \\in \\mathcal{P}(B)\\). Since \\(S\\) was arbitrary, \\(\\mathcal{P}(A) \\subseteq \\mathcal{P}(B)\\).'
                },
                {
                    question: 'Does there exist a set \\(A\\) such that \\(A \\in A\\)? Discuss briefly. (This is related to Russell\'s Paradox.)',
                    hint: 'Consider the collection \\(R = \\{x \\mid x \\notin x\\}\\). What happens when you ask whether \\(R \\in R\\)?',
                    solution: 'In naive set theory, assuming sets can contain themselves leads to Russell\'s Paradox: let \\(R = \\{x \\mid x \\notin x\\}\\). If \\(R \\in R\\), then by definition \\(R \\notin R\\), a contradiction. If \\(R \\notin R\\), then \\(R \\in R\\), also a contradiction. Modern axiomatic set theory (ZFC) avoids this by the Axiom of Regularity, which forbids \\(A \\in A\\).'
                }
            ]
        }
    ]
});
