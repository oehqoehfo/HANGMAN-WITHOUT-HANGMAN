async function callJSON(){
    const fetchJSON = await fetch('word.json');
    const fetchedResult = await fetchJSON.json();
    await pickWord(fetchedResult);
}