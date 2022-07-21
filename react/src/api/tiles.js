import { api, BASE_API_URL } from "./base";
import store from '../reducers';
import axios from "axios";

export const listTiles = (success, failed) => {
    api
        .get("image/tile/list")
        .then(function (response) {
            success(response);
        })
        .catch(function (error) {
            failed(error);
        });
};

export const alignTilesApi = (rows, method, callback) => {

    const formData = new FormData();
    formData.append("method", method);
    formData.append("row", rows);
    api
        .post("image/tile/align_tiles_naive", formData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data"
            }
        })
        .then(function (response) {
            console.log("align success callback");
            if (callback) {
                callback(response, true);
            }
        })
        .catch(function (error) {
            console.log("align failed callback");
            if (callback) {
                callback(error, false);
            }
        });
};

export const uploadImageTiles = (files) => {
    const state = store.getState();
    const formData = new FormData();
    for (let i in files) {
        let f = files[i];
        formData.append("files", f);
    }

    return api.post("image/tile/upload_image_tiles", formData, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            "Content-Type": "multipart/form-data",
            "Authorization": state.auth.tokenType + " " + state.auth.token,
            "Content-Type": "application/json"
        }
    });
};

export const exportTiles = (success, fail) => {
    // axios({
    //   url: BASE_API_URL + "tiles/export/",
    //   method: "GET",
    //   responseType: "blob",
    //   headers: {
    //     Authorization: "Token " + sessionStorage.getItem("authToken")
    //   }
    // })
    //   .then(response => {
    //     success(response);
    //   })
    //   .catch(function(error) {
    //     console.log("export failed callback");
    //     console.log(error);
    //     if (fail) {
    //       fail(error);
    //     }
    //   });
};
