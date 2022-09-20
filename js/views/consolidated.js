import url from '../lib/url.js';


function render() {
    return `
        <h2>Consolidated Calls</h2>
        <p>
            A single call to the server is a common approach due to its ease of implementation.
            Once the server receives the request, it will perform 2 actions asynchronously: 
            gather the organic search results and request winning ads from the remote auction service.
            When both actions complete, their results are combined and returned to the client.
        </p>
        <p>
            Let's take a look at a simulation for 
            <a href="${url('/consolidated/fast-results')}">fast results</a>.
        </p>
    `;
}


export default {
    title: 'Consolidated Calls',
    render
}