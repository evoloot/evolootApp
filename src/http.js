/**
 * Http wrapper module for handling XMLHTTP requests to the server-side.
 * @author Kino A. Rose
 * @namespace http
 */
export var http;
(function (http) {
    /**
     * Sends a GET request to the specified url for information.
     * Returns a promise.
     * @export
     * @param {string} url
     * @param {RequestInit} info
     * @returns {Promise}
     */
    function get(url, info) {
        const method = { method: 'GET' };
        const request = new Request(url, Object.assign(method, info));
        return fetch(request);
    }
    http.get = get;
    /**
     * Sends a POST request to create a resource at the
     * specifiied url for information.
     * Returns a promise.
     * @export
     * @param {string} url
     * @param {RequestInit} info
     * @returns {Promise}
     */
    function post(url, info) {
        const method = { method: 'POST' };
        const request = new Request(url, Object.assign(method, info));
        return fetch(request);
    }
    http.post = post;
    /**
     * Sends a PUT request to update a resource at the specified url.
     * Returns a promise.
     * @export
     * @param {string} url
     * @param {RequestInit} info
     * @returns {Promise}
     */
    function put(url, info) {
        const method = { method: 'PUT' };
        const request = new Request(url, Object.assign(method, info));
        return fetch(request);
    }
    http.put = put;
    /**
     * Sends a DELETE request to delete a resource at the specified url.
     * Returns a promise.
     * @export
     * @param {string} url
     * @param {RequestInit} info
     * @returns {Promise}
     */
    function del(url, info) {
        const method = { method: 'DELETE' };
        const request = new Request(url, info);
        return fetch(request);
    }
    http.del = del;
})(http || (http = {}));
