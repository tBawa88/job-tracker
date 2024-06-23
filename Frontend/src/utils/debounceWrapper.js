const debounceWrapper = (fn) => {
    let timeoutId;
    return (event) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(event)
        }, 500);
    }
}
export default debounceWrapper;