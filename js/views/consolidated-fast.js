// TODO: Update router.js to wrap this output in a fragment if a string 
// or to use a Node/NodeList if that is returned.

function render() {
    return `
        <hgroup>
            <h2>Consolidated Calls</h2>
            <h3>Fast Results</h3>
        </hgroup>
        <p>
            In this scenario, submitting the search form below will <strong>simulate</strong> a single, 
            consolidated call to the server.
            The response will be fast enough for our UX requirements, 
            so we will see search results and winning ads come back together.
        </p>
        
        <hr>
        
        <search-form></search-form>
        <consolidated-fast-search-results></consolidated-fast-search-results>
    `;
}


export default {
    title: 'Consolidated Calls - Fast Results',
    render,
};
