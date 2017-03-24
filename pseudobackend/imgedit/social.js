import {$, flattened} from "./script";

export const networks = [
    class Facebook {
        static get icon() {
            return "facebook-square";
        }

        static get color() {
            return "#3B5998";
        }

        static onClick() {

        }
    },
    class Twitter {
        static get icon() {
            return "twitter-square";
        }

        static get color() {
            return "#4099FF";
        }

        static onClick() {

        }
    },
    class Imgur {
        static get icon() {
            return "circle";
        }

        static get background() {
            return "#222222";
        }

        static get color() {
            return "#009900";
        }

        static onClick() {
            flattened().toBlob((blob) => {
                const data = new FormData();
                data.append("file", blob, "image.png");

                $.ajax("https://api.imgur.com/3/image", {
                    data: {
                        image: data,
                        type: "base64",
                        name: "image.png"
                    },
                    headers: {
                        Authorization: "224c4872112fea2"
                    },
                    dataType: "image/png",
                    success: function (data) {
                        if (data.data) {
                            location.href = "https://imgur.com/" + data.data.id
                        }
                    }
                });
            }, "image/png");
        }
    }
];


