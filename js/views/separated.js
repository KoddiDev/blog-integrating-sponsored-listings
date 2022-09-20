import url from '../lib/url.js';


function render() {
    return `
        <h2>Separated Calls</h2>
        <p>
            Making two separate calls to the server is an alternative approach that decouples the search action
            from the winning ads request. These calls are initiated in parallel from the client.
            One request leads the server to gather and return the organic search results. The other request 
            prompts the server to request the winning ads from the remote auction service and return its results.
            Search results are shown as soon as they are returned. The winning ads are interleaved among the 
            already-rendered search results once received.
        </p>
        <p>
            The first example simulates 
            <a href="${url('/separated/content-shift')}">content shift</a>.
        </p>
    `;
}


export default {
    title: 'Separated Calls',
    render
}