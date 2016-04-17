import $ from "jquery"

class Http {

    static get = (url) => (
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json"
        })
    );

    static post = (url, data) => (
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: 'text/json',
            dataType: "json"
        })
    );
}

export default Http;