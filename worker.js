importScripts("js/d3.js");

onmessage = function(event) {
    var nodes = event.data.nodes,
        links = event.data.links;

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-630))
        .force("link", d3.forceLink(links).distance(200).strength(2).iterations(10))
        .force("center", d3.forceCenter(event.data.width / 2, event.data.height / 2))
        .stop();
    var num= Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
    console.log(num);
    for (var i = 0, n =num; i < n; ++i) {
        postMessage({type: "tick", progress: i / n});
        simulation.tick();
    }

    postMessage({type: "end", nodes: nodes, links: links});
};