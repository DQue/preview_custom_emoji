DEBUG = false; DEBUG_n1 = 0;

function $(a) { return document.getElementById(a) }
function ce(a) { return document.createElement(a) }
function ct(a) { return document.createTextNode(a) }
function cl(e) { while (e.firstChild) { e.removeChild(e.firstChild) } }

window.addEventListener("DOMContentLoaded", () => {
    更新();

    $("i_btn").addEventListener("click", プレビュー追加, false);
    $("i_btn_preset").addEventListener("click", プリセットプレビュー追加, false);
    const input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener("change", 更新, false);
    }
}, false)

function 画像URL取得() {
    const e_file = $("u_file");
    const e_url = $("u_file_url");
    let flags = {
        ok: false,
        url: false,
        file: false
    };

    if (e_url.value !== "") {
        flags.ok = true;
        flags.url = true;
    }
    if (e_file.files && e_file.files[0]) {
        flags.ok = true;
        flags.file = true;
    }


    if (flags.ok === false) return null;
    if (flags.file) {
        return URL.createObjectURL(e_file.files[0])
    }
    if (flags.url) {
        return e_url.value;
    }
}

function 要素生成(url, bg, size, ttl) {
    const e = ce("div");
    e.className = "pv_child";

    const title = e.appendChild(ce("h1"));
    title.className = "pv_title";
    if (ttl === undefined) ttl = `${size}px ${bg}`;
    title.appendChild(ct(ttl))

    const container = e.appendChild(ce("span"));
    container.className = "pv_container";
    container.style.backgroundColor = bg;

    const img = container.appendChild(ce("img"));
    img.className = "pv_img";
    img.style.height = size + "px";
    img.src = url;

    return e;
}

function 更新() {
    const ec = $("o_color");
    const es = $("o_size");
    const url = 画像URL取得();

    $("setting").hidden = url === null ? true : false;



    cl(ec);
    cl(es);

    ec.appendChild(ct($("i_color").value));
    es.appendChild(ct($("i_size").value));

    if (DEBUG) if_debug();
}

function プレビュー追加() {
    const url = 画像URL取得();
    if (url === null) return;
    const color = $("i_color").value;
    const size = $("i_size").value;
    const e = 要素生成(url, color, size);
    $("pv_parent").appendChild(e);
}

function プリセットプレビュー追加() {
    const url = 画像URL取得();
    if (url === null) return;
    const list = [
        { title: "Mi Light 本文", bg: "rgb(255,255,255)", size: 29.3906 },
        { title: "Mi Light リアクション欄", bg: "rgb(242,242,242)", size: 18.375 },
        { title: "Mi Light リアクション欄(自分が押した)", bg: "rgb(134,179,0)", size: 18.375 },
        { title: "Mi Light リアクション欄(でかい)", bg: "rgb(242,242,242)", size: 27.5625 },
        { title: "Mi Light リアクション欄(自分が押した)(でかい)", bg: "rgb(134,179,0)", size: 27.5625 },
        { title: "Mi Dark 本文", bg: "rgb(45,45,45)", size: 29.3906 },
        { title: "Mi Dark リアクション欄", bg: "rgb(56,56,56)", size: 18.375 },
        { title: "Mi Dark リアクション欄(自分が押した)", bg: "rgb(134,179,0)", size: 18.375 },
        { title: "Mi Dark リアクション欄(でかい)", bg: "rgb(56,56,56)", size: 27.5625 },
        { title: "Mi Dark リアクション欄(自分が押した)(でかい)", bg: "rgb(134,179,0)", size: 27.5625 },
    ];

    for (let i of list) {
        const bg = i.bg;
        const size = i.size;
        const title = i.title;
        const e = 要素生成(url, bg, size, title);
        $("pv_parent").appendChild(e);
    }
}





function if_debug() {
    $("setting").hidden = false;
    if (DEBUG_n1 > 0) return;

    DEBUG_n1++;
    const e = 要素生成("https://dque.github.io/preview_custom_emoji/sample.png", "#abcdef", 80, "DEBUG");
    $("pv_parent").appendChild(e);
}
