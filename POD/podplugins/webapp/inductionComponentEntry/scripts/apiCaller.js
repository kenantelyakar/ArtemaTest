jQuery.sap.require("sap.m.MessageBox");
const API_URL = "https://rndbackend.cfapps.us10-001.hana.ondemand.com/";
function apiGET (service , param,  afterMethod) {
    const searchParams = Object.entries(param).map(([key, val]) => `${key}=${val}`).join('&');
    $.ajax({
        url: API_URL + service +  "?" + searchParams,
        type: "GET",
        async: false,
        contentType: "application/json",
        success: function (data) {
            afterMethod(data);
        },
        error: function (error) {
            sap.m.MessageBox.error(error.responseText, {
                title: "Error",
                actions: sap.m.MessageBox.Action.CLOSE
            });
        },
    });
}
function apiPOST (service, param, method, afterMethod) {
    $.ajax({
        url: API_URL + service,
        type: "POST",
        async: false,
        contentType: "application/json",
        data: param,
        success: function (data) {
            afterMethod(data);
        },
        error: function (error) {
            sap.m.MessageBox.error(error.responseText, {
                title: "Error",
                actions: sap.m.MessageBox.Action.CLOSE
            });
        },
    });
}


function standardAPI(param, method, url) {

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            },
        });
    });
}

function customAPIGet   (method, url) {

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: method,
            beforeSend: function (xhr) { },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            },
        });
    });
}